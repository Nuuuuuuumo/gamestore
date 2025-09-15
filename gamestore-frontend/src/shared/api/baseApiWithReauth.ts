import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {closeSnackbar, enqueueSnackbar} from "notistack";

import type {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";

import {config} from "@/shared/lib/config";
import {ErrorHandle} from "@/shared/types";

// Keep track of active error alerts
let activeErrorAlert: string | number | null = null;

const baseQuery = fetchBaseQuery({
  baseUrl: config.BASE_URL,
  credentials: "include",
  jsonContentType: "application/json",
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Check if the request is an auth request (ME or REFRESH)
  const isAuthRequest = typeof args === "string"
    ? args.includes("auth")
    : (args.url && args.url.includes("auth"));
  
  const result = await baseQuery(args, api, extraOptions);
  
  if (!result.error) return result;
  
  const {status} = result.error;
  
  if (status === 401) {
    const refreshResult = await baseQuery("auth/refresh", api, extraOptions);
    
    if (refreshResult.data) {
      return baseQuery(args, api, extraOptions);
    }
  }
  
  // Get error message
  const errorMessage = (result.error as ErrorHandle).data?.message || (result.error as ErrorHandle).data?.error || "Something went wrong";
  
  // Only show error notification if there isn't already an active auth error
  // or if this isn't an auth request
  if (!activeErrorAlert || !isAuthRequest) {
    // If there's an active alert and we're showing a new one, close the previous one
    if (activeErrorAlert) {
      closeSnackbar(activeErrorAlert);
    }
    
    // Show new alert and store its ID
    activeErrorAlert = enqueueSnackbar(errorMessage, {
      variant: "error",
      onClose: () => {
        activeErrorAlert = null;
      },
      // Auto-dismiss after 3 seconds
      autoHideDuration: 3000,
    });
  }
  
  return result;
};