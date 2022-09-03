import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/configureStore";
import {
  changeQuantityAction,
  deleteShoseAction,
} from "../../redux/reducers/shopReducer";

export default function Cart() {
  const cart = useSelector((state: RootState) => state.shopReducer.cart);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <h3>Cart</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td> {item.name}</td>
              <td>
                <img src={item.image} alt={item.name} style={{ width: 100 }} />
              </td>
              <td>{item.price}</td>
              <td>
                <button
                  className="btn btn-secondary mx-1"
                  onClick={() => {
                    const data = {
                      id: item.id,
                      quantity: 1,
                    };
                    dispatch(changeQuantityAction(data));
                  }}
                >
                  +
                </button>
                {item.quantity}
                <button
                  className="btn btn-secondary mx-1"
                  onClick={() => {
                    const data = {
                      id: item.id,
                      quantity: -1,
                    };
                    dispatch(changeQuantityAction(data));
                  }}
                >
                  -
                </button>
              </td>
              <td>{item.quantity * item.price}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    dispatch(deleteShoseAction(item.id));
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
