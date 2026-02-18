import React from 'react'

const AddProperty = () => {
 return (
  <div className="min-h-screen bg-gray-50 px-6 py-12">
    
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-10">
      
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-10">
        List New Property
      </h2>

      <form className="space-y-10">
        
        {/* Basic Info */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-2">
              Property Title
            </label>
            <input
              type="text"
              placeholder="e.g. Sunny 2BHK with Balcony"
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
          </div>

          {/* Type */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-2">
              Property Type
            </label>
            <select className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition">
              <option>Apartment</option>
              <option>Villa</option>
              <option>Plot</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-2">
              Price (INR)
            </label>
            <input
              type="number"
              placeholder="50,00,000"
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-sm text-gray-600 mb-3 block">
            Upload Images
          </label>

          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:border-black transition cursor-pointer">
            <p className="text-sm text-gray-500">
              Drag and drop images or click to browse
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
          
          <button
            type="button"
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Save Draft
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition"
          >
            Publish Property
          </button>

        </div>
      </form>
    </div>
  </div>
);

}

export default AddProperty