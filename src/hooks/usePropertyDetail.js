import axios from "axios";
import { useEffect, useState } from "react";

export const usePropertyDetail = (id) => {
  const mockProperties = [
    {
      _id: "1",
      title: "Luxury Penthouse",
      price: 85000000,
      purpose: "Buy",
      isFeatured: true,
      images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"],
      address: {
        city: "Mumbai",
        area: "Bandra West",
      },
      features: {
        bedrooms: 3,
        bathrooms: 4,
        areaSize: 2400,
      },
      description:
        "Experience unparalleled luxury in this sprawling penthouse...",
    },
    {
      _id: "2",
      title: "Modern Apartment",
      price: 45000000,
      purpose: "Buy",
      isFeatured: false,
      images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"],
      address: {
        city: "Delhi",
        area: "South Extension",
      },
      features: {
        bedrooms: 2,
        bathrooms: 2,
        areaSize: 1400,
      },
      description: "A beautiful modern apartment in the heart of the city.",
    },
  ];

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    // const fetchProperty=async()=>{
    //     try {
    //         setLoading(true);
    //         const response=await axios.get(`/api/properties/${id}`);
    //         setProperty(response.data)
    //     } catch (error) {
    //         console.error(err);
    //     }finally{
    //         setLoading(false);
    //     }
    // }
    //  fetchProperty();

    setLoading(true);
    const timer = setTimeout(() => {
      const foundProperty = mockProperties.find((item) => item._id === id);

      if (foundProperty) {
        setProperty(foundProperty);
      } else {
        setError("Property not found");
      }

      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  return { property, loading };
};
