import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-full w-screen items-center justify-center">
      <SignUp />
    </div>
  );
}
