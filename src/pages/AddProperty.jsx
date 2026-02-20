import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    category: "Apartment",
    purpose: "Buy",
    price: "",
    area: "",
    city: "",
    areaSize: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    images: [],
  });

  const uploadImagesToCloudinary = async (files) => {
    const uploadPromises = Array.from(files).map(async (file) => {
      const data = new FormData();
      data.append("file", file);
      data.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      );
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        data,
      );
      return response.data.secure_url;
    });
    return Promise.all(uploadPromises);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login first");
    if (selectedFiles.length === 0)
      return alert("Please upload at least one image");

    setLoading(true);
    try {
      const uploadedImageUrls = await uploadImagesToCloudinary(selectedFiles);
      const finalData = { ...formData, images: uploadedImageUrls };
      const res = await axios.post("/api/properties/add", finalData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert("Property Published Successfully!");
      navigate("/search");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error publishing property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-10">
          List New Property
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Row 1: Title and Purpose */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">
                Property Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                type="text"
                placeholder="e.g. Luxury 3BHK Apartment"
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">Purpose</label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              >
                <option value="Buy">Sale</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
          </div>

          {/* Row 2: Category, Price, Area Size */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">
                Property Type
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              >
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">
                BHK (Bedrooms)
              </label>
              <select
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required={formData.category !== "Plot"}
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              >
                <option value="">Select BHK</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
                <option value="5">5+ BHK</option>
                <option value="0">N/A (Plot)</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">Price (INR)</label>
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                type="number"
                placeholder="50,00,000"
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">
                Area Size (sqft)
              </label>
              <input
                name="areaSize"
                value={formData.areaSize}
                onChange={handleChange}
                required
                type="number"
                placeholder="1200"
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>
          </div>

          {/* Row 3: Location */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">
                Area / Locality
              </label>
              <input
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
                type="text"
                placeholder="e.g. Bandra West"
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                type="text"
                placeholder="e.g. Mumbai"
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-2">
              Property Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setSelectedFiles(e.target.files)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
            />
            <p className="mt-2 text-xs text-gray-400">
              Select multiple images of the property.
            </p>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about the property features, amenities, etc."
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-xl bg-black text-white font-bold transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
            >
              {loading ? "Publishing..." : "Publish Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
