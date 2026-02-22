import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.jsx";

const Auth = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("buyer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ name: "", email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let result;

      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role,
        };
        result = await register(userData);
      }

      if (result.success) {
        navigate("/");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            {isLogin ? "Welcome Back" : "Join Us!"}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {isLogin
              ? "Enter your details to access your profile"
              : "Start your property journey today"}
          </p>
        </div>

        {/* Role Selection (Only shown for Register) */}
        {!isLogin && (
          <div className="flex gap-3 mb-6">
            {["buyer", "agent"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-xl border transition capitalize ${
                  role === r
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-700 hover:border-black"
                }`}
              >
                {r === "agent" ? "Agent / Seller" : r}
              </button>
            ))}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name (Only for Register) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="johndoe@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
            />
            {isLogin && (
              <div className="flex justify-end mt-2">
                <Link
                  to="/forgot-password"
                  size="sm"
                  className="text-sm text-gray-500 hover:text-black transition"
                >
                  Forgot Password?
                </Link>
              </div>
            )}
          </div>

          {/* Terms (Only for Register) */}
          {!isLogin && (
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <input type="checkbox" required className="mt-1 accent-black" />
              <p>
                I agree to the{" "}
                <span className="text-black font-medium cursor-pointer hover:underline">
                  Terms
                </span>{" "}
                and{" "}
                <span className="text-black font-medium cursor-pointer hover:underline">
                  Privacy
                </span>
                .
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Footer Toggle */}
        <p className="text-sm text-center text-gray-500 mt-6">
          {isLogin ? "Don’t have an account?" : "Already a member?"}{" "}
          <button
            onClick={toggleMode}
            className="text-black font-medium hover:underline focus:outline-none"
          >
            {isLogin ? "Create Account" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
