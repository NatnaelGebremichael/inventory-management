import DashboardWrapper from "./dashboardWrapper";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}