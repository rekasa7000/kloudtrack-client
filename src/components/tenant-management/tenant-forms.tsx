import { Button } from "@/components/ui/button";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";
import { useFileUpload } from "@/hooks/use-file-upload";
import { UserRound, XIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const steps = [1, 2];

const TenantForm = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    });

  const previewUrl = files[0]?.preview || null;
  const fileName = files[0]?.file.name || null;

  return (
    <div className="border border-muted rounded-lg w-full py-20 h-fit bg-white">
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

      <form className="max-w-2xl mx-auto flex flex-col gap-4 p-4">
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
            variant="outline"
            className="w-32"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            disabled={currentStep === 1}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            className="w-32"
            onClick={() => setCurrentStep((prev) => prev + 1)}
            disabled={currentStep > steps.length}
          >
            Next
          </Button>
        </div>
      </form>

      <div className="mx-auto max-w-xs space-y-8 text-center">
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
