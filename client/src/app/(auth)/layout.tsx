import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="flex justify-between p-5"></header>
      <main>{children}</main>
    </div>
  );
}
