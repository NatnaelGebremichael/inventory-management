import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center p-5 mt-28">
      <SignIn />
    </div>
  );
}
