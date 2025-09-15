import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import "@/shared/base.scss";

import {StrictMode} from "react";
import {Provider} from "react-redux";
import {SnackbarProvider} from "notistack";

import {appRouter} from "@/app/appRouter";
import {appStore} from "@/app/store";
import {ThemeProviderWrapper} from "@/entities/theme/ui/ThemeWraper";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <Provider store={appStore}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={1000}>
        <ThemeProviderWrapper>
          <RouterProvider router={appRouter()}/>
        </ThemeProviderWrapper>
      </SnackbarProvider>
    </Provider>
  </StrictMode>,
);
