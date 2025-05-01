import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tenant } from "@/types/tenant";
import { ArrowRight } from "lucide-react";
import React from "react";

interface TenantListProps {
  items?: Tenant[];
  onSelect: (tenant: Tenant) => void;
}

const TenantList = ({ items, onSelect }: TenantListProps) => {
  return (
    <section className="w-full bg-white">
      <div className="container px-0">
        <div className="flex flex-col max-h-[80vh] overflow-y-auto">
          <Separator />
          {items?.map((item, index) => (
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

                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => onSelect!(item)}
                >
                  <span>View details</span>
                  <ArrowRight className="h-4 w-4" />
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
