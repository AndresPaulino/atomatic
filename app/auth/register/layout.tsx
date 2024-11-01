import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atomatic - Autonamous Algo Trading",
  description: "A no-code trading platform for everyone",
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
