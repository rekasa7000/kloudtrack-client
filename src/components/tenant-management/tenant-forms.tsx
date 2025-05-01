import { Button } from "@/components/ui/button";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Minus, Plus, UserRound, XIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightIcon, SearchIcon } from "lucide-react";

const steps = [1, 2];

const TenantForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    });

  const previewUrl = files[0]?.preview || null;
  const fileName = files[0]?.file.name || null;

  return (
    <div className="border border-muted rounded-lg w-full py-20 gap-4 min-h-svh flex flex-col items-center justify-center bg-white shadow-sm mt-2">
      {currentStep === 1 ? (
        <React.Fragment>
          <div className="flex flex-col items-center gap-2">
            <div className="relative inline-flex">
              <Button
                variant="outline"
                className="relative size-50 rounded-full border-5 border-main overflow-hidden p-0 shadow-none"
                onClick={openFileDialog}
                aria-label={previewUrl ? "Change image" : "Upload image"}
              >
                {previewUrl ? (
                  <img
                    className="size-full object-cover"
                    src={previewUrl}
                    alt="Preview of uploaded image"
                    width={64}
                    height={64}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div aria-hidden="true">
                    <UserRound className="size-25 opacity-60" />
                  </div>
                )}
              </Button>
              {previewUrl && (
                <Button
                  onClick={() => removeFile(files[0]?.id)}
                  size="icon"
                  className="border-background focus-visible:border-background absolute top-5 right-3 size-6 rounded-full border-2 shadow-none"
                  aria-label="Remove image"
                >
                  <XIcon className="size-3.5" />
                </Button>
              )}
              <input
                {...getInputProps()}
                className="sr-only"
                aria-label="Upload image file"
              />
            </div>
            {fileName && (
              <p className="text-muted-foreground text-xs">{fileName}</p>
            )}
            <p
              aria-live="polite"
              role="region"
              className="text-muted-foreground mt-2 text-xs"
            >
              Upload a profile picture or skip for now.
            </p>
          </div>

          <form className=" mx-auto w-full max-w-xl flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-2">
              <Label>Organization Name</Label>
              <Input placeholder="KloudTech" />
            </div>
            <div className="flex flex-col gap-2 ">
              <Label>Organization Description</Label>
              <Textarea placeholder="Write here" className="min-h-36 h-full" />
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                className="w-32 bg-white border border-main hover:bg-main shadow-none transition ease-in text-black"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                disabled={currentStep > steps.length}
              >
                Next
              </Button>
            </div>
          </form>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <form className="max-w-2xl mx-auto  flex flex-col items-stretch w-full gap-4 p-4">
            <h1 className="font-inter font-medium text-lg">
              Role and Organization
            </h1>
            <p className="text-muted-foreground text-sm font-montserrat -mt-4 text-nowrap">
              Assign the user's role and link them to an Organization to control
              their access and permissions
            </p>

            <Tabs className="w-full " defaultValue="tab-1">
              <TabsList className="flex w-full gap-2 bg-transparent">
                <TabsTrigger
                  value="tab-1"
                  className="group data-[state=active]:bg-muted-foreground border border-muted data-[state=active]:text-white flex-1 flex-col py-5 text-sm data-[state=active]:shadow-none "
                >
                  Admin
                </TabsTrigger>

                <TabsTrigger
                  value="tab-2"
                  className="group data-[state=active]:bg-muted-foreground border border-muted data-[state=active]:text-white flex-1 flex-col py-5 text-sm data-[state=active]:shadow-none"
                >
                  User
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab-1">
                <p className="text-muted-foreground py-2 text-left text-sm">
                  Admin List
                </p>
                <div className="*:not-first:mt-2 mb-2">
                  <div className="relative">
                    <Input
                      id="search"
                      className="peer ps-9 pe-9 py-5"
                      placeholder="Search..."
                      type="search"
                    />
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                      <SearchIcon size={16} />
                    </div>
                    <button
                      className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Submit search"
                      type="submit"
                    >
                      <ArrowRightIcon size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="flex w-full  items-center gap-4 justify-between px-5 py-3 bg-muted rounded-md">
                  <div className="order-2 flex w-full items-center gap-2 md:order-none justify-between">
                    <div className="flex items-center gap-2 md:order-none">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-medium text-sm font-inter">Name</h3>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 flex items-center gap-1 md:order-none">
                    <Button className="order-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted bg-white text-muted-foreground shadow-none transition-colors hover:bg-main hover:text-white focus-visible:ring-ring/50 data-[state=active]:bg-main data-[state=active]:text-white">
                      <Plus />
                    </Button>
                    <Button className="order-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted shadow-none transition-colors bg-red-500 hover:bg-red-700 text-white focus-visible:ring-ring/50 ">
                      <Minus />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tab-2">
                <p className="text-muted-foreground py-2 text-left text-sm">
                  User List
                </p>
                <div className="*:not-first:mt-2 mb-2">
                  <div className="relative">
                    <Input
                      id="search"
                      className="peer ps-9 pe-9 py-5"
                      placeholder="Search..."
                      type="search"
                    />
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                      <SearchIcon size={16} />
                    </div>
                    <button
                      className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Submit search"
                      type="submit"
                    >
                      <ArrowRightIcon size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="flex w-full  items-center gap-4 justify-between px-5 py-3 bg-muted rounded-md">
                  <div className="order-2 flex w-full items-center gap-2 md:order-none justify-between">
                    <div className="flex items-center gap-2 md:order-none">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-medium text-sm font-inter">Name</h3>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 flex items-center gap-1 md:order-none">
                    <Button className="order-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted bg-white text-muted-foreground shadow-none transition-colors hover:bg-main hover:text-white focus-visible:ring-ring/50 data-[state=active]:bg-main data-[state=active]:text-white">
                      <Plus />
                    </Button>
                    <Button className="order-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted shadow-none transition-colors bg-red-500 hover:bg-red-700 text-white focus-visible:ring-ring/50 ">
                      <Minus />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                className="w-32"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              <Button
                className="w-32 bg-white border border-main hover:bg-main shadow-none transition ease-in text-black"
                disabled={currentStep > steps.length}
              >
                Submit
              </Button>
            </div>
          </form>
        </React.Fragment>
      )}

      <div className="mx-auto max-w-xs w-full space-y-8 text-center">
        <Stepper value={currentStep} onValueChange={setCurrentStep}>
          {steps.map((step) => (
            <StepperItem key={step} step={step} className="not-last:flex-1">
              <StepperTrigger asChild>
                <StepperIndicator />
              </StepperTrigger>
              {step < steps.length && <StepperSeparator />}
            </StepperItem>
          ))}
        </Stepper>
      </div>
    </div>
  );
};

export default TenantForm;
