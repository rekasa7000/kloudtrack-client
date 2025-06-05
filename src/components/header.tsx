import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { useState, ReactNode } from "react";

interface HeaderProps {
  title: string;
  description: string;
  tabs?: ReactNode;
}

const Header = ({ title, description, tabs }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex w-full relative gap-2">
      <CollapsibleContent className="flex flex-col gap-2 ease-in-out w-full">
        <div className="flex items-start justify-between w-full group">
          <div className="flex flex-col flex-1 transition-all duration-300 ease-in-out">
            <h1 className="text-2xl font-bold font-inter dark:text-white text-black transition-colors duration-200 group-hover:text-[#404040]">
              {title}
            </h1>
            <p className="mt-2 text-sm font-medium dark:text-gray-200 text-[#545454] font-montserrat transition-colors duration-200 group-hover:text-stone-600">
              {description}
            </p>
          </div>
        </div>
        {tabs}
      </CollapsibleContent>
      {tabs && (
        <Button
          variant="ghost"
          size="icon"
          className="size-8 absolute top-0 right-0"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <ChevronDown className={`h-4 w-4 ${isOpen && "rotate-180"} transition-transform`} />
          <span className="sr-only">Toggle</span>
        </Button>
      )}
    </Collapsible>
  );
};

export default Header;
