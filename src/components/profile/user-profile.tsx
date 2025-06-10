import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserProfile = () => {
  
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Display Picture Section */}
        <Card className="border rounded-lg shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold">Display Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4 p-6 pt-10">
            <div className="w-56 h-56 bg-gray-300 rounded-full border-4 border-yellow-500 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Display Picture</span>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information Section */}
        <Card className="border rounded-lg shadow-sm">
          <CardHeader className="border-b">
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <p className="border rounded p-2 bg-gray-100">{ "John Doe" }</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <p className="border rounded p-2 bg-gray-100">{ "John Doe" }</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <p className="border rounded p-2 bg-gray-100">{ "@john_doe" }</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <p className="border rounded p-2 bg-gray-100">{ "John Doe" }</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact</label>
              <p className="border rounded p-2 bg-gray-100">{ "John Doe" }</p>
            </div>
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
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <p className="border rounded p-2 bg-gray-100">********</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <p className="border rounded p-2 bg-gray-100">********</p>
            </div>
          </CardContent>
        </Card>

        {/* Organization Section */}
        <Card className="border rounded-lg shadow-sm">
          <CardHeader className="border-b">
            <CardTitle>Organization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="border rounded p-2 bg-gray-100">{ "John Doe" }</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline">Back</Button>
       
      </div>
    </div>
  );
};

export default UserProfile;