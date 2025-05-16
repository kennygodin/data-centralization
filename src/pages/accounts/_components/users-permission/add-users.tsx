import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { UserRoundPlus } from "lucide-react";
import { cn } from "@/lib/utils";

export const AddUserModal = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [permissionGroup, setPermissionGroup] = useState("");

  const handleSubmit = () => {
    // TODO: Replace with actual form submission logic
    console.log({
      fullName,
      email,
      phoneNumber,
      department,
      role,
      permissionGroup,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-2 py-7",
            "hover:bg-[#2CAA5D]/10 hover:text-[#2CAA5D]"
          )}
        >
          <span className={cn("p-2 rounded-md bg-[#2CAA5D] text-white")}>
            <UserRoundPlus size={16} />
          </span>
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#2CAA5D] text-white">
              <UserRoundPlus size={20} />
            </div>
            Add User
          </DialogTitle>
          <DialogDescription>
            Fill in the details to create a new user account
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              className="h-10"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">
                Department <span className="text-rose-500">*</span>
              </Label>
              <Select value={department} onValueChange={setDepartment} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent
                  className="w-full"
                  position="popper"
                  align="start"
                >
                  {[
                    "IT",
                    "Finance",
                    "HR",
                    "Marketing",
                    "Operations",
                    "Sales",
                  ].map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="permissionGroup">
                Permission Group <span className="text-rose-500">*</span>
              </Label>
              <Select
                value={permissionGroup}
                onValueChange={setPermissionGroup}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select permission group" />
                </SelectTrigger>
                <SelectContent
                  className="w-full"
                  position="popper"
                  align="start"
                >
                  {["Admin", "Manager", "Editor", "Viewer", "Custom"].map(
                    (group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">
              Role <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter role"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            className="bg-[#2CAA5D] hover:bg-[#2CAA5D]/90"
          >
            Add User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
