import {AnyAction, combineReducers} from "@reduxjs/toolkit";

import {sessionSlice} from "@/entities/authentification/model/slice";
import {bucketSlice} from "@/entities/bucket/model/slice";
import {baseApi} from "@/shared/api/baseAPI";
import {friendsSlice} from "@/entities/friends/model/slice";
import {modalSlice} from "@/entities/modal/model/slice";
import {themeSlice} from "@/entities/theme/model/slice";

export const rootReducer = combineReducers({
  [sessionSlice.name]: sessionSlice.reducer,
  [bucketSlice.name]: bucketSlice.reducer,
  [friendsSlice.name]: friendsSlice.reducer,
  [modalSlice.name]: modalSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const reducerProxy = (state: any, action: AnyAction) => {
  if (action.type === "logout") {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export default reducerProxy;

