import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Reference = () => {
  return (
    <div className="container mx-auto p-4 max-h-[80vh] overflow-y-auto">
      <Card className="border rounded-lg shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-semibold">All</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 py-6">
          {/* Minimal Section */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-md font-medium">Minimal</h3>
              <p className="text-sm text-gray-600 mt-1">
                Wear sunglasses on bright days. In winter, reflection off snow can nearly double UV strength. If you burn easily, cover up and use sunscreen.
              </p>
            </div>
            <span className="bg-purple-200 text-purple-800 text-xs font-medium px-2 py-1 rounded">UV Index</span>
          </div>
          <div className="bg-gray-100 h-4 rounded"></div>
          <p className="text-sm text-gray-600">Threshold: 1-2</p>

          {/* Moderate Section */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-md font-medium">Moderate</h3>
              <p className="text-sm text-gray-600 mt-1">
                Take precautions, such as covering and using sunscreen, if you will be outside. Stay in shade near midday when the sun is strongest.
              </p>
            </div>
            <span className="bg-purple-200 text-purple-800 text-xs font-medium px-2 py-1 rounded">UV Index</span>
          </div>
          <div className="bg-gray-100 h-4 rounded"></div>
          <p className="text-sm text-gray-600">Threshold: 3-5</p>

          {/* High Section */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-md font-medium">High</h3>
              <p className="text-sm text-gray-600 mt-1">
                Protection against sunburn is needed. Reduce time in the sun between 11 a.m. and 4 p.m. Cover up, wear a hat and sunglasses, and use sunscreen.
              </p>
            </div>
            <span className="bg-purple-200 text-purple-800 text-xs font-medium px-2 py-1 rounded">UV Index</span>
          </div>
          <div className="bg-gray-100 h-4 rounded"></div>
          <p className="text-sm text-gray-600">Threshold: 6-7</p>

          {/* Very High Section */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-md font-medium">Very High</h3>
              <p className="text-sm text-gray-600 mt-1">
                Take extra precautions. Unprotected skin will be damaged and can burn quickly. Try to avoid the sun between 11 a.m. and 4 p.m. Otherwise, seek shade, cover up, wear a hat and sunglasses, and use sunscreen.
              </p>
              <p className="text-sm text-blue-600 mt-2 cursor-pointer">See More</p>
            </div>
            <span className="bg-purple-200 text-purple-800 text-xs font-medium px-2 py-1 rounded">UV Index</span>
          </div>
          <div className="bg-gray-100 h-4 rounded"></div>
          <p className="text-sm text-gray-600">Threshold: 8-10</p>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default Reference;