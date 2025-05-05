import { SigninForm } from "@/components/auth/signin-form";
import { Layers } from "lucide-react";

export const SigninPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-8">
        <Layers size={45} />
      </div>
      <SigninForm />
    </div>
  );
};
