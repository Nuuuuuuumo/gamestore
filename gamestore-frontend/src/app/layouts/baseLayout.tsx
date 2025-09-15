import React from "react";

import type {ReactNode} from "react";

import {Layout} from "@/shared/ui/layout/Layout";
import {Header} from "@/widgets/Header";


type BaseLayoutProps = {
  children?: ReactNode
}
export const BaseLayout = ({children}: BaseLayoutProps) => (
  <Layout headerSlot={<Header/>}>
    {children ? children : null}
  </Layout>
);