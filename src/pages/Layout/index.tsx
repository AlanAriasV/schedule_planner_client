import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "./components";

export default function Layout() {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
    </>
  );
}
