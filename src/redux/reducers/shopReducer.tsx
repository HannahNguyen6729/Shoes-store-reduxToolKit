//rxslice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Cart {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}
export interface Category {
  id: string;
  category: string;
}
export interface ProductData {
  id: number;
  name: string;
  alias: string;
  price: number;
  description: string;
  size: number[];
  shortDescription: string;
  quantity: number;
  deleted: boolean;
  categories: Category[];
  relatedProducts: number[];
  feature: boolean;
  image: string;
}
export interface DefaultState {
  cart: Cart[];
  productData: ProductData[];
}

const initialState: DefaultState = {
  cart: [
    {
      id: -1,
      name: "poduct 1",
      image: "https://i.pravatar.css?u=1",
      price: 2000,
      quantity: 2,
    },
  ],
  productData: [
    {
      id: 1,
      name: "Adidas Prophere",
      alias: "adidas-prophere",
      price: 350,
      description:
        "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
      size: [36, 37, 38, 39, 40, 41, 42],
      shortDescription:
        "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
      quantity: 995,
      deleted: false,
      categories: [
        { id: "ADIDAS", category: "ADIDAS" },
        { id: "MEN", category: "MEN" },
        { id: "WOMEN", category: "WOMEN" },
      ],
      relatedProducts: [2, 3, 5],
      feature: true,
      image: "https://shop.cyberlearn.vn/images/adidas-prophere.png",
    },
  ],
};

const shopReducer = createSlice({
  name: "shopReducer", //name of the reduce --action name
  initialState, //defautlState of reducer
  reducers: {
    addShoseAction: (state, action) => {
      console.log("action thuong", action);

      const currentShoes = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (currentShoes) {
        currentShoes.quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    deleteShoseAction: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    changeQuantityAction: (state, action) => {
      console.log(action);
      const changedShoes = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (changedShoes) {
        changedShoes.quantity += action.payload.quantity;
        if (changedShoes.quantity < 1) {
          state.cart = state.cart.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
    },
  },
  //   extraReducers: (builder) => {
  //     // Add reducers for additional action types here, and handle loading state as needed
  //     builder.addCase(fetchProductListThunk.fulfilled, (state, action) => {});
  //   },
  extraReducers: (builder) => {
    builder.addCase(fetchProductListThunk.fulfilled, (state, action) => {
      console.log("action thunk", action);
      state.productData = action.payload?.data;
    });
  },
});

export const { addShoseAction, deleteShoseAction, changeQuantityAction } =
  shopReducer.actions;

export default shopReducer.reducer;

//action thunk
export const fetchProductListThunk = createAsyncThunk(
  "productList/fetch",
  async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://shop.cyberlearn.vn/api/Product",
      });
      console.log("action thunk", response.data.content);
      return {
        data: response.data.content,
        status: response.status,
      };
    } catch (err) {
      console.log(err);
    }
  }
);
// export const getAllProductsAPI = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios({
//         method: "GET",
//         url: "https://shop.cyberlearn.vn/api/Product",
//       });
//       //console.log(response.data.content);
//       const action = getAllProductsActionThunk(response.data.content);
//       dispatch(action);
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };
