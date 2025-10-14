import type React from "react";
import Users from "./components/Users";
import Page from "@/components/Page/Page";

const DashBoard: React.FC = () => {
  return (<Page
    label="数据面板"
  >
    <Users />
  </Page>)
}

export default DashBoard
