import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducer from "@/state/globalSlice";
import { baseApi } from "@/state/api/index";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// This creates a no-op storage for server-side rendering
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

// Use web storage on the client, no-op storage on the server
const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global"],
};

// Combine all reducers
const rootReducer = combineReducers({
  global: globalReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

// Wrap the root reducer with redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Function to create the store
export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
  });

  setupListeners(store.dispatch);

  return store;
};

// Type definitions for TypeScript
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];