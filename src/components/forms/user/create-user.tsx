import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronRight, ChevronLeft, AtSign, CircleCheck } from "lucide-react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";
import { FieldInfo } from "@/utils/field-info";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  role: string;
  organization: string;
  password: string;
  confirmPassword: string;
}

const CreateUser = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      phone: "",
      role: "USER",
      organization: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Form Data:", value);
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
        const firstNameValid = formValues.firstName && formValues.firstName.length >= 2;
        const lastNameValid = formValues.lastName && formValues.lastName.length >= 2;
        const emailValid = formValues.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email);
        const usernameValid = formValues.username && formValues.username.length > 0;
        const phoneValid = formValues.phone && formValues.phone.length >= 10;

        if (firstNameValid && lastNameValid && emailValid && usernameValid && phoneValid) return true;
        return false;

      case 2:
        if (formValues.role && formValues.role.length > 0) return true;
        return false;

      case 3:
        const password = formValues.password;
        const confirmPassword = formValues.confirmPassword;

        if (
          password &&
          confirmPassword &&
          password === confirmPassword &&
          password.length >= 8 &&
          /(?=.*[a-z])/.test(password) &&
          /(?=.*[A-Z])/.test(password) &&
          /(?=.*\d)/.test(password) &&
          /(?=.*[!@#$%^&*])/.test(password)
        )
          return true;
        return false;

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

            <form.Field
              name="firstName"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "First name is required"
                    : value.length < 2
                      ? "First name must be at least 2 characters"
                      : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter your first name"
                    className={`w-full ${field.state.meta.errors.length ? "border-red-500" : ""}`}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field
              name="lastName"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "Last name is required"
                    : value.length < 2
                      ? "Last name must be at least 2 characters"
                      : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
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

            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Email is required";
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter your email address"
                    className={`w-full ${field.state.meta.errors.length ? "border-red-500" : ""}`}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field
              name="username"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Username is required";
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <AtSign className="w-5 h-5 text-gray-500" />
                    </span>
                    <Input
                      id="username"
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="Enter your desired username"
                      className={`w-full pl-9 ${field.state.meta.errors.length ? "border-red-500" : ""}`}
                    />
                  </div>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field
              name="phone"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "Phone number is required"
                    : value.length < 10
                      ? "Phone number must be at least 10 digits"
                      : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter your phone number"
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

            <form.Field
              name="role"
              validators={{
                onChange: ({ value }) => (!value ? "Role is required" : undefined),
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium">
                    Role
                  </Label>
                  <RadioGroup.Root
                    value={field.state.value || "USER"}
                    onValueChange={(value) => field.handleChange(value)}
                    className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4"
                  >
                    <RadioGroup.Item
                      key={"SUPERADMIN"}
                      value={"SUPERADMIN"}
                      className={cn(
                        "relative group ring-[1px] ring-gray-300 rounded py-2 px-3 text-start h-20",
                        "data-[state=checked]:ring-2 data-[state=checked]:ring-main data-[state=checked]:bg-gray-800 data-[state=checked]:text-white text-center"
                      )}
                    >
                      <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-main fill-main stroke-white group-data-[state=unchecked]:hidden" />
                      <span className="font-semibold tracking-tight text-center">SUPERADMIN</span>
                    </RadioGroup.Item>
                    <RadioGroup.Item
                      key={"ADMIN"}
                      value={"ADMIN"}
                      className={cn(
                        "relative group ring-[1px] ring-gray-300 rounded py-2 px-3 text-start h-20",
                        "data-[state=checked]:bg-gray-800 data-[state=checked]:text-white data-[state=checked]:ring-2 data-[state=checked]:ring-main text-center"
                      )}
                    >
                      <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-main fill-main stroke-white group-data-[state=unchecked]:hidden" />
                      <span className="font-semibold tracking-tight text-center">ADMIN</span>
                    </RadioGroup.Item>
                    <RadioGroup.Item
                      key={"USER"}
                      value={"USER"}
                      className={cn(
                        "relative group ring-[1px] ring-gray-300 rounded py-2 px-3 text-start h-20",
                        "data-[state=checked]:bg-gray-800 data-[state=checked]:text-white data-[state=checked]:ring-2 data-[state=checked]:ring-main text-center"
                      )}
                    >
                      <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-main fill-main stroke-white group-data-[state=unchecked]:hidden" />
                      <span className="font-semibold tracking-tight text-center">USER</span>
                    </RadioGroup.Item>
                  </RadioGroup.Root>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field name="organization">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-sm font-medium">
                    Organization
                  </Label>
                  <Input
                    id="organization"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter your organization"
                    className={`w-full ${field.state.meta.errors.length ? "border-red-500" : ""}`}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="mb-6">
              <Label className="text-lg font-semibold">Password</Label>
              <p className="text-sm mt-1">Create a secure password for the user to access their account.</p>
            </div>

            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Password is required";
                  if (value.length < 8) return "Password must be at least 8 characters";
                  if (!/(?=.*[a-z])/.test(value)) return "Password must contain at least one lowercase letter";
                  if (!/(?=.*[A-Z])/.test(value)) return "Password must contain at least one uppercase letter";
                  if (!/(?=.*\d)/.test(value)) return "Password must contain at least one number";
                  if (!/(?=.*[!@#$%^&*])/.test(value)) return "Password must contain at least one special character";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter your password"
                    className={`w-full ${field.state.meta.errors.length ? "border-red-500" : ""}`}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field
              name="confirmPassword"
              validators={{
                onChange: ({ value, fieldApi }) => {
                  if (!value) return "Please confirm your password";
                  const password = fieldApi.form.getFieldValue("password");
                  if (value !== password) return "Passwords do not match";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Confirm your password"
                    className={`w-full ${field.state.meta.errors.length ? "border-red-500" : ""}`}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 font-medium mb-2">Password requirements:</p>
              <ul className="text-xs space-y-1">
                <li>• At least 8 characters long</li>
                <li>• Contains uppercase and lowercase letters</li>
                <li>• Contains at least one number</li>
                <li>• Contains at least one special character (!@#$%^&*)</li>
              </ul>
            </div>
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
          <div
            className={`h-2 bg-yellow-400 rounded-full transition-all duration-300 ${
              currentStep === 3 ? "w-5" : "w-2"
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

export default CreateUser;
