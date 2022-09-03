import React from "react";
import { useEffect } from "react";
import Cart from "./Cart";
import ProductItem from "./ProductItem";
import { AppDispatch, RootState } from "../../redux/configureStore";
import { fetchProductListThunk } from "../../redux/reducers/shopReducer";
import { useDispatch } from "react-redux";

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProductListThunk());
  }, []);

  return (
    <div className="container">
      <h1>Shoes Shop</h1>
      <Cart />
      <h1> Product List</h1>
      <div className="row">
        <ProductItem />
      </div>
    </div>
  );
}
