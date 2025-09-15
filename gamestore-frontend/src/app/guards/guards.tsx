import { Navigate } from "react-router-dom";

import type { ReactElement } from "react";

import { useMeQuery } from "@/entities/authentification/api/authApi";
import { selectIsAuth } from "@/entities/authentification/model/slice";
import { useAppSelector } from "@/shared/model/hooks";
import { Loader } from "@/shared/ui/loader/Loader";

type GuardProps = {
  children: ReactElement
}

export const AuthGuard = ({ children }: GuardProps) => {
  const { isFetching } = useMeQuery({});
  const isAuthorized = useAppSelector(selectIsAuth);
  
  if (isFetching) return <Loader/>;
  if (!isAuthorized) return <Navigate to="/"/>;
  
  return children;
};

export const GuestGuard = ({ children }: GuardProps) => {
  const { isFetching } = useMeQuery({});
  const isAuthorized = useAppSelector(selectIsAuth);
  
  if (isFetching) return <Loader/>;
  if (isAuthorized) return <Navigate to="/"/>;
  
  return children;
};