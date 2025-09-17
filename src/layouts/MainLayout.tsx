import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="main-layout">
      {/* <Sidebar /> */}
      <div className="main-layout-content">
        <Outlet />
      </div>
      {/* <Mobilebar /> */}
    </div>
  );
}
