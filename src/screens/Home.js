import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { loadProductList, selectProductList } from "../redux/productListSlice";

const Home = () => {
  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  const dispatch = useDispatch();
  const { productList, loading, error } = useSelector(selectProductList);

  const handleClick = (category) => {
    dispatch(loadProductList(category));
  };

  useEffect(() => {
    console.log(productList);
  }, [productList]);

  return (
    <View style={styles.container}>
      <View style={styles.categories}>
        {categories.map((category, index) => (
          <Pressable
            key={index}
            style={styles.category}
            onPress={() => handleClick(category)}
          >
            <Text style={{ fontSize: 15, height: 50 }}>{category}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.display}>
        {loading ? (
          <ActivityIndicator />
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          productList?.map((product, index) => (
            <Text key={index} style={{ borderWidth: 1 }}>
              {product?.title}
            </Text>
          ))
        )}
      </View>
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 20,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
  },
  category: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: 70,
  },
  display: { flex: 3 },
});
