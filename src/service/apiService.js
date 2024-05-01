const baseUrl = "https://fakestoreapi.com/";

export const fetchProductByID = async (id) => {
  try {
    const url = baseUrl + `products/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error("Can't find product.");
  }
};

export const fetchCategories = async () => {
  try {
    const url = baseUrl + `products/categories`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error("Can't find categories.");
  }
};

export const fetchProductList = async (category) => {
  try {
    const url = baseUrl + `products/category/${category}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error("Can't find product.");
  }
};
