import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type ConnectionType = "vbInstance" | "providerWsURLs" | "providerOptions";

export interface ConnectionState {
  value: null | Record<ConnectionType, any>;
  status: "idle" | "loading" | "failed";
}

const initialState: ConnectionState = {
  value: null,
  status: "idle",
};

export const connectionReducer = createSlice({
  name: "connection",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setConnection: (state, action) => {
      state.value = action.payload;
    },
    updateConnection: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
});

export const { setConnection, updateConnection } = connectionReducer.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getConnection = (state: RootState) => state.connection.value;

export default connectionReducer.reducer;
