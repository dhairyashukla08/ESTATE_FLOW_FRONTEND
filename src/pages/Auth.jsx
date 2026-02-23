import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.jsx";
import { toast } from "react-toastify";

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
        toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
        navigate("/");
      } else {
        setError(result.message);
        toast.error(result.message || "Authentication failed");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      toast.error("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {isLogin ? "Welcome Back" : "Join EstateFlow"}
          </h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            {isLogin
              ? "Enter your details to access your profile"
              : "Start your property journey today"}
          </p>
        </div>

        {/* Role Selection */}
        {!isLogin && (
          <div className="flex gap-3 mb-6">
            {["buyer", "agent"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-3 rounded-xl border-2 text-xs font-black uppercase tracking-widest transition-all ${
                  role === r
                    ? "bg-black text-white border-black shadow-md"
                    : "border-gray-100 text-gray-400 hover:border-gray-200"
                }`}
              >
                {r === "agent" ? "Agent / Seller" : r}
              </button>
            ))}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1.5 ml-1">
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
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-black transition-all outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1.5 ml-1">
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
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-black transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1.5 ml-1">
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
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-black transition-all outline-none"
            />
            {isLogin && (
              <div className="flex justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="text-xs font-bold text-gray-400 hover:text-black transition"
                >
                  Forgot Password?
                </Link>
              </div>
            )}
          </div>

          {!isLogin && (
            <div className="flex items-start gap-3 px-1 text-xs text-gray-500 font-medium">
              <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-black rounded cursor-pointer" />
              <p>
                I agree to the <span className="text-black underline cursor-pointer">Terms</span> and <span className="text-black underline cursor-pointer">Privacy Policy</span>.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-black text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Authenticating..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Footer Toggle */}
        <p className="text-xs text-center font-bold text-gray-400 mt-8 uppercase tracking-widest">
          {isLogin ? "New to EstateFlow?" : "Already have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-black hover:underline focus:outline-none ml-1"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;