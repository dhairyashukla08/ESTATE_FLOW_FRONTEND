import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-black text-gray-900 mb-8 tracking-tighter">
        Redefining the way you find <span className="text-gray-400">home.</span>
      </h1>
      <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
        <p>
          Founded in 2026, EstateFlow was built on a simple premise: Real estate
          should be transparent, digital, and professional. We connect thousands
          of buyers and renters with verified agents across the country.
        </p>
        <div className="grid md:grid-cols-2 gap-10 py-10">
          <div className="border-l-4 border-black pl-6">
            <h3 className="font-bold text-gray-900 text-xl">Our Mission</h3>
            <p className="text-sm mt-2">
              To provide a seamless property search experience powered by the
              latest MERN technology.
            </p>
          </div>
          <div className="border-l-4 border-black pl-6">
            <h3 className="font-bold text-gray-900 text-xl">Our Vision</h3>
            <p className="text-sm mt-2">
              Becoming the #1 trusted real estate ecosystem for developers,
              agents, and individuals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
