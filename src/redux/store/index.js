import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import userReducer from "../reducers/userReducer";
import fetchReducer from "../reducers/FetchReducer";
import utilReducer from "../reducers/utilReducer";

const persistConfig = {
  // 3
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "react",
    }),
  ],
  whitelist: ['user']
};

const mergedReducers = combineReducers({
  user: userReducer,
  fetch: fetchReducer,
  util: utilReducer
});

const persistedReducer = persistReducer(persistConfig, mergedReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
