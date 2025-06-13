import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMatchRoute, useLocation } from "@tanstack/react-router";
import { AiOutlineSun, AiOutlineCloud, AiOutlineWarning, AiOutlineDown } from 'react-icons/ai';

// Define the shape of each reference item
interface ReferenceItem {
  title: string;
  description: string;
  threshold: string;
  seeMore?: boolean;
  icon?: React.ReactNode; // Optional icon for flexibility
  category: string; // Added to track the category for "All" tab
}

// Define the shape of referenceData
interface ReferenceData {
  [key: string]: ReferenceItem[];
}

// Data for different weather terminology references
const referenceData: ReferenceData = {
  'UV Index': [
    { title: 'Minimal', description: 'Wear sunglasses on bright days. In winter, reflection off snow can nearly double UV strength. If you burn easily, cover up and use sunscreen.', threshold: '1-2', icon: <AiOutlineSun className="text-yellow-400" />, category: 'UV Index' },
    { title: 'Moderate', description: 'Take precautions, such as covering and using sunscreen, if you will be outside. Stay in shade near midday when the sun is strongest.', threshold: '3-5', icon: <AiOutlineSun className="text-orange-400" />, category: 'UV Index' },
    { title: 'High', description: 'Protection against sunburn is needed. Reduce time in the sun between 11 a.m. and 4 p.m. Cover up, wear a hat and sunglasses, and use sunscreen.', threshold: '6-7', icon: <AiOutlineWarning className="text-red-400" />, category: 'UV Index' },
    { title: 'Very High', description: 'Take extra precautions. Unprotected skin will be damaged and can burn quickly. Try to avoid the sun between 11 a.m. and 4 p.m. Otherwise, seek shade, cover up, wear a hat and sunglasses, and use sunscreen.', threshold: '8-10', seeMore: true, icon: <AiOutlineWarning className="text-red-600" />, category: 'UV Index' },
  ],
  'Heat Index': [
    { title: 'Caution', description: 'Fatigue is possible with prolonged exposure and activity. Continuing activity could lead to heat cramps.', threshold: '27-32°C', icon: <AiOutlineSun className="text-yellow-400" />, category: 'Heat Index' },
    { title: 'Extreme Caution', description: 'Heat cramps and heat exhaustion are possible. Continuing activity could lead to heat stroke.', threshold: '33-41°C', icon: <AiOutlineWarning className="text-orange-400" />, category: 'Heat Index' },
    { title: 'Danger', description: 'Heat cramps and heat exhaustion are likely; heat stroke is probable with continued exposure.', threshold: '42-51°C', icon: <AiOutlineWarning className="text-red-400" />, category: 'Heat Index' },
  ],
  'Wind Speed': [
    { title: 'Light Air', description: 'Wind motion visible in smoke. Leaves rustle slightly.', threshold: '1-3 mph', icon: <AiOutlineCloud className="text-gray-400" />, category: 'Wind Speed' },
    { title: 'Gentle Breeze', description: 'Leaves and small twigs in constant motion.', threshold: '4-7 mph', icon: <AiOutlineCloud className="text-gray-500" />, category: 'Wind Speed' },
    { title: 'Moderate Breeze', description: 'Small branches move, raising dust and loose paper.', threshold: '8-12 mph', icon: <AiOutlineCloud className="text-gray-600" />, category: 'Wind Speed' },
  ],
  'Rainfall': [
    { title: 'Light Rain', description: 'Rainfall less than 0.10 inches per hour.', threshold: '<0.10 in/hr', icon: <AiOutlineCloud className="text-blue-400" />, category: 'Rainfall' },
    { title: 'Moderate Rain', description: 'Rainfall between 0.10 and 0.30 inches per hour.', threshold: '0.10-0.30 in/hr', icon: <AiOutlineCloud className="text-blue-500" />, category: 'Rainfall' },
    { title: 'Heavy Rain', description: 'Rainfall between 0.30 and 0.50 inches per hour.', threshold: '0.30-0.50 in/hr', icon: <AiOutlineCloud className="text-blue-600" />, category: 'Rainfall' },
  ],
};

const Reference: React.FC = () => {
  const matchRoute = useMatchRoute();
  const location = useLocation();

  // Determine active tab based on route
  const getActiveTab = () => {
    if (matchRoute({ to: "/references" }) && !location.pathname.startsWith("/references/terminology")) return 'All'; // Default to "All"
    if (matchRoute({ to: "/references/terminology/heatindex" })) return 'Heat Index';
    if (matchRoute({ to: "/references/terminology/windspeed" })) return 'Wind Speed';
    if (matchRoute({ to: "/references/terminology/rainfall" })) return 'Rainfall';
    if (matchRoute({ to: "/references/terminology/uvindex" })) return 'UV Index';
    return 'All'; // Default fallback to "All"
  };

  const activeTab = getActiveTab();

  // Function to determine progress bar style based on threshold and category
  const getProgressBarStyle = (threshold: string, category: string) => {
    let min = 0, max = 0;
    if (threshold.includes('-')) {
      [min, max] = threshold.split('-').map(num => parseFloat(num.replace(/[^\d.]/g, '')) || 0);
    } else if (threshold.startsWith('<')) {
      max = parseFloat(threshold.replace('<', '').replace(/[^\d.]/g, '')) || 0;
    } else {
      max = parseFloat(threshold.replace(/[^\d.]/g, '')) || 0;
    }
    const value = max || min;

    let color, width;
    switch (category) {
      case 'UV Index':
        if (value <= 2) { color = 'green'; width = '20%'; }
        else if (value <= 5) { color = 'yellow'; width = '40%'; }
        else if (value <= 7) { color = 'orange'; width = '60%'; }
        else { color = 'red'; width = '80%'; }
        break;
      case 'Heat Index':
        if (value <= 32) { color = 'green'; width = '20%'; }
        else if (value <= 41) { color = 'yellow'; width = '40%'; }
        else { color = 'red'; width = '60%'; }
        break;
      case 'Wind Speed':
        if (value <= 3) { color = 'green'; width = '20%'; }
        else if (value <= 7) { color = 'yellow'; width = '40%'; }
        else { color = 'red'; width = '60%'; }
        break;
      case 'Rainfall':
        if (value < 0.10) { color = 'green'; width = '20%'; }
        else if (value <= 0.30) { color = 'yellow'; width = '50%'; }
        else { color = 'red'; width = '80%'; }
        break;
      default:
        color = 'gray'; width = '50%';
    }
    return { background: `linear-gradient(to right, ${color}-200, ${color}-100)`, fill: `${color}-500`, width };
  };

  // Get data based on active tab with reordered categories for "All"
  const getDisplayData = () => {
    if (activeTab === 'All') {
      // Reorder categories to put Heat Index first
      const reorderedData = [
        ...referenceData['Heat Index'],
        ...referenceData['UV Index'],
        ...referenceData['Wind Speed'],
        ...referenceData['Rainfall'],
      ];
      return reorderedData;
    }
    return referenceData[activeTab];
  };

  const displayData = getDisplayData();

  return (
    <div className="container mx-auto p-4 max-h-[80vh] overflow-y-auto">
      <Card className="border-1 rounded-xl shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-200 p-6 bg-gray-100">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <AiOutlineSun className="mr-2 text-yellow-500" /> Weather Terminology References
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">Explore weather condition guidelines.</p>
        </CardHeader>
        <CardContent className="space-y-8 py-6 px-6">
          {displayData.map((item, index) => {
            // Add separator for "All" tab when category changes
            const showSeparator = activeTab === 'All' && index > 0 && displayData[index - 1].category !== item.category;
            return (
              <React.Fragment key={index}>
                {showSeparator && (
                  <div className="w-full py-3 bg-gray-100 border-gray-300 rounded-t-lg flex items-center justify-start px-6 shadow-sm">
                    <h4 className="text-md font-bold text-gray-800 uppercase tracking-wide"> {item.category} </h4>
                  </div>
                )}
                <div className="flex justify-between items-start group transition-all duration-300 hover:bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    {item.icon && <span className="mr-3 mt-1 flex-shrink-0">{item.icon}</span>}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      {item.seeMore && <p className="text-sm text-blue-600 mt-2 cursor-pointer hover:underline">See More</p>}
                    </div>
                  </div>
                  <span className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                    <AiOutlineCloud className="mr-1 text-purple-500" /> {item.category === 'Heat Index' ? 'Heat Index' : 'UV Index'}
                  </span>
                </div>
                <div className={`bg-gradient-to-r ${getProgressBarStyle(item.threshold, item.category).background} h-2 rounded-full overflow-hidden`}>
                  <div className={`bg-${getProgressBarStyle(item.threshold, item.category).fill} h-full`} style={{ width: getProgressBarStyle(item.threshold, item.category).width }}></div>
                </div>
                <p className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md shadow-xs inline-block">Threshold: {item.threshold}</p>
              </React.Fragment>
            );
          })}
        </CardContent>
      </Card>
      <p className="text-sm text-gray-500 text-center mt-4">Last updated: {new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</p>
    </div>
  );
};

export default Reference;