import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Header } from "./header";
import { useNavigate } from "react-router-dom";

export const SigninForm = () => {
  const navigate = useNavigate();
  return (
    <Card className="w-[400px] border-none shadow-none">
      <CardHeader>
        <Header label="Instant access to all your work data, information and all metrics." />
      </CardHeader>
      <CardContent>
        <form>
          <div className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input placeholder="example@ics.com" className="h-12" id="name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input placeholder="******" className="h-12" id="name" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => navigate("/accounts/dashboard")}
          className="w-full h-12 cursor-pointer bg-emerald-600 hover:bg-emerald-700"
        >
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
};
