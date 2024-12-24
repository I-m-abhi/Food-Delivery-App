import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    onYourMind: [],
    topRestaurantList: [],
    restaurantList: [],
  },
  reducers: {
    setOnYourMind: (state, action)=> {
      state.onYourMind = action.payload;
    },
    setTopRestaurantList: (state, action)=> {
      state.topRestaurantList = action.payload;
    },
    setRestaurantList: (state, action)=> {
      state.restaurantList = action.payload;
    },
  }
});

export const {setOnYourMind, setTopRestaurantList, setRestaurantList} = restaurantSlice.actions;

export default restaurantSlice.reducer;