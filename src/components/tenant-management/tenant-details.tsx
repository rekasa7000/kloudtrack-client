import { User } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

const items = [
  {
    icon: <User />,
    tenantName: "Emily Davis",
    role: "Admin",
    link: "#",
  },
  {
    icon: <User />,
    tenantName: "Michael Chen",
    role: "User",
    link: "#",
  },

  {
    icon: <User />,
    tenantName: "Priya Sharma",
    role: "User",
    link: "#",
  },
  {
    icon: <User />,
    tenantName: "James Wilson",
    role: "User",
    link: "#",
  },
  {
    icon: <User />,
    tenantName: "James Wilson",
    role: "User",
    link: "#",
  },

  {
    icon: <User />,
    tenantName: "James Wilson",
    role: "User",
    link: "#",
  },
  {
    icon: <User />,
    tenantName: "James Wilson",
    role: "User",
    link: "#",
  },
  {
    icon: <User />,
    tenantName: "James Wilson",
    role: "User",
    link: "#",
  },
  {
    icon: <User />,
    tenantName: "James Wilson",
    role: "User",
    link: "#",
  },
  {
    icon: <User />,
    tenantName: "James Wilson",
    role: "User",
    link: "#",
  },
  {
    icon: <User />,
    tenantName: "James Wilson",
    role: "User",
    link: "#",
  },
];

const TenantDetails = () => {
  const status = false;

  return (
    <section className="flex relative px-2 flex-col gap-2 w-full max-h-[80vh] overflow-y-scroll bg-white rounded-md">
      <h1 className="text-xl font-semibold md:text-3xl font-inter">
        Organization Information
      </h1>
      <Separator />
      <div className="flex items-center sticky top-0 bg-white shadow-sm justify-between w-full h-auto border border-muted p-6  rounded-lg">
        <div className="w-full flex items-center gap-2">
          <Avatar className="w-28 h-28 border-3 border-main rounded-full">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <p className="text-lg font-bold font-inter text-c_secondary">
              KloudTech here{" "}
            </p>
            <span className="text-xs text-main font-montserrat">
              UID:23129412038sdas2094dda
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-montserrat">Active</span>
          {status ? (
            <span className="flex w-3 h-3 me-1.5 bg-green-500 rounded-full"></span>
          ) : (
            <span className="flex w-3 h-3 me-1.5 bg-red-500 rounded-full"></span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full h-full bg-white rounded-lg">
        <div className="flex items-center justify-between w-full h-auto border border-muted p-6  rounded-lg">
          <p className="text-base font-montserrat">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            repellendus maiores ratione, molestias veritatis, voluptatum, nihil
            error deserunt maxime minima perferendis eos. Sed porro voluptatum
            quis natus enim animi illum.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 justify-between w-full h-auto border border-muted p-6  rounded-lg">
          <span className="font-inter">create at...</span>
          <h1 className="text-4xl font-montserrat font-bold ">
            January <span className="text-main">28</span>, 2030
          </h1>
        </div>
        <h1 className="text-lg font-semibold font-inter">
          Users in this Organization
        </h1>
        <Separator />
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex w-full  items-center gap-4 justify-between px-5 py-3 bg-muted rounded-md">
              <div className="order-2 flex w-full items-center gap-2 md:order-none justify-between">
                <div className="flex items-center gap-2 md:order-none">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-muted ">
                    {item.icon}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold font-inter">
                      {item.tenantName}
                    </h3>
                  </div>
                </div>
                <p
                  className={`text-sm inline-flex font-montserrat items-center  ${
                    item.role === "Admin" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.role}
                </p>
              </div>
            </div>
          </React.Fragment>
        ))}{" "}
      </div>
    </section>
  );
};

export default TenantDetails;
