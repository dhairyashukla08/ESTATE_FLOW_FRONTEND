import axios from "axios";
import API from "../api/axios.js";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthContext.jsx";
import { useNavigate,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { usePropertyContext } from "../hooks/PropertyContext.jsx";


const AddProperty = () => {
  const location = useLocation();
  const editData = location.state?.editData;
  const { user } = useAuth();
  const navigate = useNavigate();
  const { fetchFeatured, fetchCategoryData, fetchProperties } = usePropertyContext();
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("Residential");

  const [formData, setFormData] = useState({
    title: editData?.title||"",
    category: editData?.category||"Apartment", 
    propertyType: editData?.propertyType|| "Office", 
    purpose: editData?.purpose||"Buy",
    price: editData?.price|| "",
    area: editData?.area||"",
    city: editData?.city||"",
    areaSize: editData?.areaSize||"", 
    carpetArea: editData?.carpetArea|| "", 
    plotArea: editData?.plotArea||"", 
    bedrooms: editData?.bedrooms|| "",
    bathrooms: editData?.bathrooms||"",
    description: editData?.description||"",
    parking: editData?.parking||"Available",
    maintenance: editData?.maintenance||"",
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData(prev => ({
      ...prev,
      propertyType: tab === "Plot" ? "Residential" : tab === "Commercial" ? "Office" : ""
    }));
  };

  const uploadImagesToCloudinary = async (files) => {
    const uploadPromises = Array.from(files).map(async (file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        data
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
 if (!user) {
      toast.error("Please login first"); 
      return;
    }

  setLoading(true);
  const toastId = toast.loading(editData ? "Updating property..." : "Uploading property details...");
  try {
    
    let uploadedImageUrls = editData?.images || [];

    if (selectedFiles.length > 0) {
      uploadedImageUrls = await uploadImagesToCloudinary(selectedFiles);
    }

    if (uploadedImageUrls.length === 0) {
      setLoading(false);
      toast.update(toastId, { render: "Please upload at least one image", type: "error", isLoading: false, autoClose: 3000 });
      return ;
    }

    let baseUrl = "/api/properties";
    if (activeTab === "Commercial") baseUrl = "/api/commercial";
    if (activeTab === "Plot") baseUrl = "/api/plots";

    const endpoint = editData 
      ? `${baseUrl}/update/${editData._id}` 
      : `${baseUrl}/add`;
    
    const method = editData ? "put" : "post";

    let finalPayload;
    if (activeTab === "Commercial") {
      finalPayload = {
        title: formData.title,
        description: formData.description,
        purpose: formData.purpose === "Buy" ? "Sale" : "Rent",
        propertyType: formData.propertyType,
        price: Number(formData.price),
        images: uploadedImageUrls,
        address: { area: formData.area, city: formData.city },
        carpetArea: Number(formData.carpetArea),
        bathrooms: Number(formData.bathrooms || 0),
        parking: formData.parking,
        maintenance: Number(formData.maintenance || 0)
      };
    } else if (activeTab === "Plot") {
      finalPayload = {
        title: formData.title,
        description: formData.description,
        purpose: "Sale",
        propertyType: formData.propertyType,
        price: Number(formData.price),
        images: uploadedImageUrls,
        address: { area: formData.area, city: formData.city },
        plotArea: Number(formData.plotArea)
      };
    } else {
      finalPayload = { ...formData, images: uploadedImageUrls };
    }
    await API[method](endpoint, finalPayload, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    await Promise.all([
      fetchFeatured(), 
      fetchCategoryData(), 
      fetchProperties()
    ]);

    toast.update(toastId, { 
        render: `${activeTab} ${editData ? "Updated" : "Published"} Successfully!`, 
        type: "success", 
        isLoading: false, 
        autoClose: 3000 
      });
    navigate("/agent/manage");
  } catch (err) {
    console.error(err);
    toast.update(toastId, { 
        render: err.response?.data?.message || "Error saving property", 
        type: "error", 
        isLoading: false, 
        autoClose: 3000 
      });
  } finally {
    setLoading(false);
  }
};

useEffect(()=>{
  if (editData) {
    if (editData.category === "Plot") setActiveTab("Plot");
    else if (editData.category === "Commercial") setActiveTab("Commercial");
    else setActiveTab("Residential");
  }
},[editData]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-10">
        
        <div className="flex border-b border-gray-100 mb-10">
          {["Residential", "Commercial", "Plot"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabChange(tab)}
              className={`pb-4 px-6 text-sm font-bold transition-all ${activeTab === tab ? "border-b-2 border-black text-black" : "text-gray-400 hover:text-gray-600"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-10">{editData ? `Edit ${activeTab}` : `List New ${activeTab}`}</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title & Purpose */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">Title</label>
              <input name="title" value={formData.title} onChange={handleChange} required type="text" className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">Purpose</label>
              <select name="purpose" value={formData.purpose} onChange={handleChange} className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition">
                <option value="Buy">Sale</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
          </div>

          {/* Dynamic Row: Type, Area, Price */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">Type</label>
              <select 
                name={activeTab === "Residential" ? "category" : "propertyType"} 
                value={activeTab === "Residential" ? formData.category : formData.propertyType}
                onChange={handleChange} 
                className="px-4 py-3 rounded-xl border border-gray-300"
              >
                {activeTab === "Residential" && (<><option value="Apartment">Apartment</option><option value="Villa">Villa</option></>)}
                {activeTab === "Commercial" && (<><option value="Office">Office</option><option value="Shop">Shop</option><option value="Warehouse">Warehouse</option></>)}
                {activeTab === "Plot" && (<><option value="Residential">Residential Plot</option><option value="Agricultural">Agricultural</option><option value="Industrial">Industrial</option></>)}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">
                {activeTab === "Residential" ? "Area Size (sqft)" : activeTab === "Commercial" ? "Carpet Area (sqft)" : "Plot Area (sqft)"}
              </label>
              <input 
                name={activeTab === "Residential" ? "areaSize" : activeTab === "Commercial" ? "carpetArea" : "plotArea"} 
                value={activeTab === "Residential" ? formData.areaSize : activeTab === "Commercial" ? formData.carpetArea : formData.plotArea}
                onChange={handleChange} required type="number" className="px-4 py-3 rounded-xl border border-gray-300" 
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">Price (INR)</label>
              <input name="price" value={formData.price} onChange={handleChange} required type="number" className="px-4 py-3 rounded-xl border border-gray-300" />
            </div>
          </div>

          {/* Specific sections for Res/Comm... */}
          {activeTab === "Residential" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">BHK</label>
                <select name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="px-4 py-3 rounded-xl border border-gray-300">
                  <option value="">Select BHK</option>
                  {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} BHK</option>)}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Bathrooms</label>
                <input name="bathrooms" value={formData.bathrooms} type="number" onChange={handleChange} className="px-4 py-3 rounded-xl border border-gray-300" />
              </div>
            </div>
          )}

          {activeTab === "Commercial" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Maintenance</label>
                <input name="maintenance" value={formData.maintenance} type="number" onChange={handleChange} className="px-4 py-3 rounded-xl border border-gray-300" />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Parking</label>
                <select name="parking" value={formData.parking} onChange={handleChange} className="px-4 py-3 rounded-xl border border-gray-300">
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>
            </div>
          )}

          {/* Location & Images & Description (Keep your existing code for these) */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">Area / Locality</label>
              <input name="area" value={formData.area} onChange={handleChange} required type="text" className="px-4 py-3 rounded-xl border border-gray-300" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">City</label>
              <input name="city" value={formData.city} onChange={handleChange} required type="text" className="px-4 py-3 rounded-xl border border-gray-300" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-2">Property Images</label>
            <input type="file" multiple accept="image/*" onChange={(e) => setSelectedFiles(e.target.files)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"></textarea>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <button type="button" onClick={() => navigate(-1)} className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition">Cancel</button>
            <button type="submit" disabled={loading} className={`px-8 py-3 rounded-xl bg-black text-white font-bold transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}>
              {loading ? "Publishing..." : `Publish ${activeTab}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;