const dedupe = (arr) => [...new Set(arr.filter(Boolean))];

export const getResidentialTags = (property, filters) => {
  const tags = [];
  if (filters.category?.length) tags.push(property.category);
  if (filters.bedrooms?.length) {
    const bhk = property.features?.bedrooms;
    if (bhk) tags.push(`${bhk} BHK`);
  }
  if (filters.furnishing?.length && property.features?.furnishedStatus) {
    tags.push(property.features.furnishedStatus);
  }
  if (filters.bathrooms && property.features?.bathrooms) {
    tags.push(`${property.features.bathrooms} Bath`);
  }
  if ((filters.minPrice || filters.maxPrice) && property.price) {
    tags.push(`₹${property.price.toLocaleString("en-IN")}`);
  }
  if ((filters.minArea || filters.maxArea) && property.features?.areaSize) {
    tags.push(`${property.features.areaSize} sq.ft`);
  }
  if (filters.city && property.address?.city) tags.push(property.address.city);
  return dedupe(tags);
};

export const getCommercialTags = (property, filters) => {
  const tags = [];
  if (filters.propertyType?.length) tags.push(property.propertyType);
  if (filters.purpose) tags.push(property.purpose === "Sale" ? "Buy" : property.purpose);
  if ((filters.minPrice || filters.maxPrice) && property.price) {
    tags.push(`₹${property.price.toLocaleString("en-IN")}`);
  }
  if ((filters.minArea || filters.maxArea) && property.features?.carpetArea) {
    tags.push(`${property.features.carpetArea} sq.ft`);
  }
  if (filters.city && property.address?.city) tags.push(property.address.city);
  return dedupe(tags);
};

export const getPlotTags = (plot, filters) => {
  const tags = [];
  if (filters.propertyType?.length) tags.push(plot.propertyType);
  if ((filters.minPrice || filters.maxPrice) && plot.price) {
    tags.push(`₹${plot.price.toLocaleString("en-IN")}`);
  }
  if ((filters.minArea || filters.maxArea) && plot.features?.plotArea) {
    tags.push(`${plot.features.plotArea} sq.ft`);
  }
  if (filters.city && plot.address?.city) tags.push(plot.address.city);
  return dedupe(tags);
};