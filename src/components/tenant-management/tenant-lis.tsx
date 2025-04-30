import { ArrowRight, Building, User } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ListItem {
  icon: React.ReactNode;
  tenantName: string;
  status: "Active" | "Inactive";
  link: string;
}

interface TenantListProps {
  heading?: string;
  items?: ListItem[];
}

const TenantList = ({
  items = [
    {
      icon: <Building />,
      tenantName: "John Doe",
      status: "Active",
      link: "#",
    },
    {
      icon: <Building />,
      tenantName: "Jane Smith",
      status: "Inactive",
      link: "#",
    },
    {
      icon: <Building />,
      tenantName: "Acme Corp",
      status: "Active",
      link: "#",
    },
    {
      icon: <Building />,
      tenantName: "Global Inc",
      status: "Active",
      link: "#",
    },
    {
      icon: <Building />,
      tenantName: "Sarah Johnson",
      status: "Inactive",
      link: "#",
    },
    {
      icon: <Building />,
      tenantName: "Tech Solutions",
      status: "Active",
      link: "#",
    },
    {
      icon: <Building />,
      tenantName: "Tech Solutions",
      status: "Active",
      link: "#",
    },
    {
      icon: <Building />,
      tenantName: "Tech Solutions",
      status: "Active",
      link: "#",
    },
    {
      icon: <Building />,
      tenantName: "Tech Solutions",
      status: "Active",
      link: "#",
    },
    {
      icon: <Building />,
      tenantName: "Tech Solutions",
      status: "Active",
      link: "#",
    },
    {
      icon: <Building />,
      tenantName: "Tech Solutions",
      status: "Active",
      link: "#",
    },
    {
      icon: <Building />,
      tenantName: "Tech Solutions",
      status: "Active",
      link: "#",
    },
    {
      icon: <Building />,
      tenantName: "Tech Solutions",
      status: "Active",
      link: "#",
    },
    {
      icon: <Building />,
      tenantName: "Tech Solutions",
      status: "Active",
      link: "#",
    },
    {
      icon: <Building />,
      tenantName: "Tech Solutions",
      status: "Active",
      link: "#",
    },
    {
      icon: <Building />,
      tenantName: "Tech Solutions",
      status: "Active",
      link: "#",
    },
  ],
}: TenantListProps) => {
  return (
    <section className="w-full sticky bg-white">
      <div className="container px-0">
        <div className="flex flex-col max-h-[80vh] overflow-y-auto">
          <Separator />
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex w-full items-center gap-4 justify-between px-4 py-5">
                <div className="order-2 flex items-center gap-2 md:order-none">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-muted ">
                    {item.icon}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold font-inter">
                      {item.tenantName}
                    </h3>
                    <p className="text-sm inline-flex font-montserrat  items-center text-muted-foreground">
                      {item.status === "Active" ? (
                        <span className="flex w-3 h-3 me-1.5 bg-green-500 rounded-full"></span>
                      ) : (
                        <span className="flex w-3 h-3 me-1.5 bg-red-500 rounded-full"></span>
                      )}

                      {item.status}
                    </p>
                  </div>
                </div>

                <Button variant="outline" asChild>
                  <a
                    className="order-3 ml-auto w-fit gap-2 md:order-none"
                    href={item.link}
                  >
                    <span>View details</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <Separator />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TenantList;
