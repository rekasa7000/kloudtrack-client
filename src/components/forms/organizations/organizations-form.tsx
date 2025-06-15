import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";
import { ChevronLeft, ChevronRight, Minus, Plus, UserRound, XIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { FieldInfo } from "@/utils/field-info";
import { useCreateOrganization } from "@/hooks/mutations/organization-mutations";

interface FormValues {
  name: string;
  description: string;
}

const OrganizationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const [{ files }, { removeFile, openFileDialog, getInputProps }] = useFileUpload({
    accept: "image/*",
  });
  const { mutateAsync: createOrganization } = useCreateOrganization();

  const previewUrl = files[0]?.preview || null;
  const fileName = files[0]?.file.name || null;

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      console.log("=== FRONTEND FORM SUBMISSION ===");
      console.log("Form values:", value);
      console.log("Files array:", files);

      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("description", value.description);
      if (files[0]) {
        if (files[0].file instanceof File) {
          console.log("Adding file to formData:", files[0].file);
          formData.append("displayPicture", files[0].file);
        }
      }

      for (const value of formData.values()) {
        console.log(value);
      }
      await createOrganization(formData);
    },
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getStepValidation = (step: number, formValues: FormValues): boolean => {
    switch (step) {
      case 1:
        const firstNameValid = formValues.name && formValues.name.length >= 2;

        if (firstNameValid) return true;
        return false;

      case 2:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 w-full">
            <div className="mb-6">
              <Label className="text-lg font-semibold">Personal Information</Label>
              <p className="text-sm mt-1">
                Enter the user's essential details such as name, email, and contact information.
              </p>
            </div>
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
                <input {...getInputProps()} className="sr-only" aria-label="Upload image file" />
              </div>
              {fileName && <p className="text-muted-foreground text-xs">{fileName}</p>}
              <p aria-live="polite" role="region" className="text-muted-foreground mt-2 text-xs">
                Upload a profile picture or skip for now.
              </p>
            </div>

            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "Organization name is required"
                    : value.length < 2
                      ? "Organization name must be at least 2 characters"
                      : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    Organization Name
                  </Label>
                  <Input
                    id={field.name}
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter organization name"
                    className={`w-full ${field.state.meta.errors.length ? "border-red-500" : ""}`}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field name="description">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter your last name"
                    className={`w-full ${field.state.meta.errors.length ? "border-red-500" : ""}`}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="mb-6">
              <Label className="text-lg font-semibold">Role and Organization</Label>
              <p className="text-sm mt-1">
                Assign the user's role and link them to an organization to control their access and permissions.
              </p>
            </div>

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
                <p className="text-muted-foreground py-2 text-left text-sm">Admin List</p>
                <div className="*:not-first:mt-2 mb-2">
                  <div className="relative">
                    <Input id="search" className="peer ps-9 pe-9 py-5" placeholder="Search..." type="search" />
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
                <p className="text-muted-foreground py-2 text-left text-sm">User List</p>
                <div className="*:not-first:mt-2 mb-2">
                  <div className="relative">
                    <Input id="search" className="peer ps-9 pe-9 py-5" placeholder="Search..." type="search" />
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
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-between h-full max-w-2xl mx-auto p-6">
      <div className="min-h-[400px]">{renderStepContent()}</div>

      <div className="flex flex-col w-full">
        <div className="flex gap-2 p-4 w-full justify-center">
          <div
            className={`h-2 bg-yellow-400 rounded-full transition-all duration-300 ${
              currentStep === 1 ? "w-5" : "w-2"
            }`}
          ></div>
          <div
            className={`h-2 bg-yellow-400 rounded-full transition-all duration-300 ${
              currentStep === 2 ? "w-5" : "w-2"
            }`}
          ></div>
        </div>

        <div className="flex justify-between w-full">
          <div>
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={handlePrevious} className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
            )}
          </div>

          <div>
            {currentStep < totalSteps ? (
              <form.Subscribe selector={(state) => [state.values]}>
                {([formValues]) => (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!getStepValidation(currentStep, formValues)}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </form.Subscribe>
            ) : (
              <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="button"
                    onClick={() => form.handleSubmit()}
                    disabled={!canSubmit}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? "Creating..." : "Create Account"}
                  </Button>
                )}
              </form.Subscribe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationForm;
