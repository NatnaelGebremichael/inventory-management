import DashboardWrrapper from "./dashboardWrapper";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardWrrapper>{children}</DashboardWrrapper>;
}
