const baseUrl = "https://fakestoreapi.com/";

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
    return data.map((item) => ({ id: item.id, title: item.title }));
  } catch (e) {
    throw new Error("Can't find product.");
  }
};
