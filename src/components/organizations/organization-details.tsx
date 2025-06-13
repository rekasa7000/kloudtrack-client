import { UserDetails } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import React from "react";
import { formatRelativeTime, getInitials, getRoleColor } from "@/lib/utils";

interface OrganizationDetailsProps {
  users: UserDetails[];
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
}

const OrganizationDetails = ({ users, name, description, isActive, createdAt }: OrganizationDetailsProps) => {
  return (
    <section className="flex relative px-2 flex-col gap-2 w-full max-h-[80vh] overflow-y-scroll rounded-md">
      <h1 className="text-xl font-semibold md:text-3xl font-inter">Organization Information</h1>
      <Separator />
      <div className="flex items-center sticky top-0 shadow-sm justify-between w-full h-auto border border-muted p-6  rounded-lg">
        <div className="w-full flex items-center gap-2">
          <Avatar className="w-28 h-28 border-3 border-main rounded-full">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <p className="text-lg font-bold font-inter text-c_secondary">{name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-montserrat">Active</span>
          {isActive ? (
            <span className="flex w-3 h-3 me-1.5 bg-green-500 rounded-full"></span>
          ) : (
            <span className="flex w-3 h-3 me-1.5 bg-red-500 rounded-full"></span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full h-full rounded-lg">
        <div className="flex items-center justify-between w-full h-auto border border-muted p-6  rounded-lg">
          <p className="text-base font-montserrat">s{description}</p>
        </div>
        <div className="flex flex-col items-center gap-2 justify-between w-full h-auto border border-muted p-6  rounded-lg">
          <span className="font-inter">create at...</span>
          <h3 className="text-4xl font-montserrat font-bold ">{formatRelativeTime(createdAt)}</h3>
        </div>
        <h1 className="text-lg font-semibold font-inter">Users in this Organization</h1>
        <Separator />
        {users.map((user, index) => (
          <React.Fragment key={index}>
            <div className="flex w-full items-center gap-4 justify-between px-5 py-3 bg-muted rounded-md">
              <div className="order-2 flex w-full items-center gap-2 md:order-none justify-between">
                <div className="flex items-center gap-2 md:order-none">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-muted bg-background">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={`${user.firstName || user.userName}'s profile`}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium text-muted-foreground">
                        {getInitials(user.firstName, user.lastName)}
                      </span>
                    )}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold font-inter">{user.firstName || user.userName}</h3>
                  </div>
                </div>
                <p className={`text-sm inline-flex font-montserrat items-center ${getRoleColor(user.role)}`}>
                  {user.role}
                </p>
              </div>
            </div>
          </React.Fragment>
        ))}{" "}
      </div>
    </section>
  );
};

export default OrganizationDetails;
