import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Organization } from "@/types/organizations";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

interface OrganizationListProps {
  items?: Organization[];
  onSelect: (organization: Organization) => void;
}

const OrgnizationList = ({ items, onSelect }: OrganizationListProps) => {
  return (
    <section className="w-full">
      <div className="container px-0">
        <div className="flex flex-col max-h-[80vh] overflow-y-auto">
          <Separator />
          {items?.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex w-full items-center gap-4 justify-between px-4 py-5">
                <div className="order-2 flex items-center gap-4 md:order-none">
                  <Avatar className="h-12 w-12">
                    {item.displayPicture && <AvatarImage src={item.displayPicture} />}
                    <AvatarImage src="https://github.com/shadcn.png" className="h-12 w-12" />
                    <AvatarFallback>KT</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold font-inter">{item.organizationName}</h3>
                    <p className="text-sm inline-flex font-montserrat  items-center text-muted-foreground">
                      {item.isActive ? (
                        <span className="flex w-3 h-3 me-1.5 bg-green-500 rounded-full"></span>
                      ) : (
                        <span className="flex w-3 h-3 me-1.5 bg-red-500 rounded-full"></span>
                      )}

                      {item.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>

                <Button variant="outline" className="cursor-pointer" onClick={() => onSelect!(item)}>
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

export default OrgnizationList;
