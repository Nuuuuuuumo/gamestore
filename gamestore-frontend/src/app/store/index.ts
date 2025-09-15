import { configureStore } from "@reduxjs/toolkit";

import reducerProxy from "@/app/rootReducer";
import { baseApi } from "@/shared/api/baseAPI";

export function makeStore() {
  return configureStore({
    reducer: reducerProxy,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),
  });
}

export const appStore = makeStore();

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch