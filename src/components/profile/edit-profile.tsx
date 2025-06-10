import React from 'react';
import { useForm } from '@tanstack/react-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldInfo } from "@/utils/field-info";
import { Label } from '../ui/label';

const EditProfile = () => {
  const form = useForm({
    defaultValues: {
      firstName: "John Doe",
      lastName: "John Doe",
      email: "@john_doe",
      username: "John Doe",
      contact: "John Doe",
      organization: "John Doe",
      password: "John Doe",
      confirmPassword: "John Doe",
    },
    onSubmit: async ({ value }) => {
      console.log("Updated Profile Data:", value);
    
    },
  });

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Display Picture Section */}
        <Card className="border rounded-lg shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold">Display Picture</CardTitle>
            <p className="text-yellow-600 text-sm flex items-center">
              <span className="mr-1">⚠</span> Please make sure to inform the user before changing their display picture.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4 pt-10">
            <div className="w-56 h-56 bg-gray-300 rounded-full border-4 border-yellow-500 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Display Picture</span>
            </div>
            <Button variant="secondary" className="w-72 bg-gray-600 text-white hover:bg-gray-700">
              Change Display Picture
            </Button>
          </CardContent>
        </Card>

        {/* Personal Information Section */}
        <Card className="border rounded-lg shadow-sm">
          <CardHeader className="border-b">
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form.Field
              name="firstName"
              validators={{
                onChange: ({ value }) =>
                  !value || value.length < 2 ? "First name must be at least 2 characters" : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="block text-sm font-medium mb-1">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
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
                  !value || value.length < 2 ? "Last name must be at least 2 characters" : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="block text-sm font-medium mb-1">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={`w-full ${field.state.meta.errors.length ? "border-red-500" : ""}`}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Please enter a valid email" : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={`w-full ${field.state.meta.errors.length ? "border-red-500" : ""}`}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field
              name="username"
              validators={{
                onChange: ({ value }) => (!value ? "Username is required" : undefined),
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="username" className="block text-sm font-medium mb-1">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={`w-full ${field.state.meta.errors.length ? "border-red-500" : ""}`}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field
              name="contact"
              validators={{
                onChange: ({ value }) =>
                  !value || value.length < 10 ? "Contact must be at least 10 digits" : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="contact" className="block text-sm font-medium mb-1">
                    Contact
                  </Label>
                  <Input
                    id="contact"
                    type="tel"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={`w-full ${field.state.meta.errors.length ? "border-red-500" : ""}`}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </CardContent>
        </Card>

        {/* Password Section */}
        <Card className="border rounded-lg shadow-sm">
          <CardHeader className="border-b">
            <CardTitle>Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-yellow-600 text-sm">
              Changing a user's password will immediately update their login credentials. Make sure to inform them.
            </p>
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => (value && value.length < 8 ? "Password must be at least 8 characters" : undefined),
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={`w-full ${field.state.meta.errors.length ? "border-red-500" : ""}`}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field
              name="confirmPassword"
              validators={{
                onChange: ({ value, fieldApi }) =>
                  value && fieldApi.form.getFieldValue("password") && value !== fieldApi.form.getFieldValue("password")
                    ? "Passwords do not match"
                    : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={`w-full ${field.state.meta.errors.length ? "border-red-500" : ""}`}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </CardContent>
        </Card>

        {/* Organization Section */}
        <Card className="border rounded-lg shadow-sm">
          <CardHeader className="border-b">
            <CardTitle>Organization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form.Field name="organization">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="organization" className="block text-sm font-medium mb-1">
                    Organization
                  </Label>
                  <Input
                    id="organization"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={`w-full ${field.state.meta.errors.length ? "border-red-500" : ""}`}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end mr-5 space-x-4">
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <>
              <Button variant="outline" type="button">Cancel</Button>
              <Button
                type="button"
                onClick={() => form.handleSubmit()}
                disabled={!canSubmit}
                className="bg-yellow-500 text-white hover:bg-yellow-600"
              >
                {isSubmitting ? "Saving..." : "Update"}
              </Button>
            </>
          )}
        </form.Subscribe>
      </div>
    </div>
  );
};

export default EditProfile;