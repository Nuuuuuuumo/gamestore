import {createBrowserRouter} from "react-router-dom";

import {App} from "@/app/App";
import {AuthGuard} from "@/app/guards";
import {GuestGuard} from "@/app/guards/guards";
import {BaseLayout} from "@/app/layouts";
import {ErrorPage} from "@/pages/404";
import {AddGamePage} from "@/pages/add-game/AddGame";
import {GamePage} from "@/pages/game/GamePage";
import {GamesPage} from "@/pages/games";
import {LoginPage} from "@/pages/login";
import {MainPage} from "@/pages/main/ui/MainPage";
import {ProfilePage} from "@/pages/profile";
import {RegistrationPage} from "@/pages/registration/ui/RegistrationPage";

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <App/>,
      errorElement: (
        <BaseLayout>
          <ErrorPage/>
        </BaseLayout>
      ),
      children: [
        {
          path: "/login",
          element: (
            <GuestGuard>
              <LoginPage/>
            </GuestGuard>
          ),
        },
        {
          path: "/register",
          element: (
            <GuestGuard>
              <RegistrationPage/>
            </GuestGuard>
          ),
        },
        {
          path: "/",
          element: (
            <MainPage/>
          ),
        },
        {
          path: "/games",
          element: (
            <GuestGuard>
              <GamesPage/>
            </GuestGuard>
          ),
        },
        {
          path: "/profile",
          element: (
            <AuthGuard>
              <ProfilePage/>
            </AuthGuard>
          ),
        },
        {
          path: "/addGame",
          element: (
            <AuthGuard>
              <AddGamePage/>
            </AuthGuard>
          ),
        },
        {
          path: "/games/:id",
          element: (
            <GuestGuard>
              <GamePage/>
            </GuestGuard>
          ),
        },
      ],
    },
  ]);
