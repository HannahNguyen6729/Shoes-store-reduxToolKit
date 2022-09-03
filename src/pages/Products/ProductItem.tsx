import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/configureStore";
import { addShoseAction } from "../../redux/reducers/shopReducer";

export default function ProductItem() {
  const productData = useSelector(
    (state: RootState) => state.shopReducer.productData
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      {productData.map((product, index) => (
        <div key={product.id} className="col-3 my-3">
          <div className="card">
            <img src={product.image} alt={product.name} />
            <div className="card-body">
              <h6>{product.name}</h6>
              <p>{product.price} $</p>
              <button
                className="btn btn-dark"
                onClick={() => {
                  product = { ...product, quantity: 1 };
                  dispatch(addShoseAction(product));
                }}
              >
                Add to card
                <i className="fa fa-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
