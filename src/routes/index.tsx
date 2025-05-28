import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Cloud, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const solutions = [
  { title: "Community Engagement Solutions", description: "Transformative tools for disaster-prone communities." },
  { title: "Weather Data Solutions", description: "Real-time and hyper-localized Weather Data" },
  { title: "Community Capacity Building", description: "Enhance DRRM Community Awareness" },
];

const features = [
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Inexpensive network of hyper localized weather stations",
    description:
      "With our inexpensive and reliable dense network of hyperlocalized weather stations, you can track and localized weather conditions with ease. Stay ahead of the weather and make informed with our advanced technology. Contact us today to learn more.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Decision support tool and Web App",
    description:
      "A web dashboard system that provides real-time hyperlocal data to government officials and citizens for informed decision-making. Stay up-to-date with the latest and make informed decisions with ease. Our platform is designed to provide you with the most accurate and reliable data available.",
  },
];

const otherServices = [
  {
    title: "Coastal Weather Monitoring",
    image: "Meteorologist, WeatherTech Inc.",
    content:
      "Real-time hyper-localized Coastal weather data with decision support tools and capacity building for community services.",
  },
  {
    title: "River Water Level Monitoring",
    image: "Operations Manager, AgroFarm",
    content:
      "This system can provide real-time data on the water levels, allowing authorities to take necessary measures in case of flooding or drought. ",
  },
  {
    title: "Heat Index Monitoring System",
    image: "Operations Manager, AgroFarm",
    content:
      "The localized heat index monitoring system is designed specifically for urban environments, where the effects of heat can be intensified due to various factors such as concrete surfaces, limited vegetation, and human activity. ",
  },
];

function RouteComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const scrollSpeed = 2;
      const newScrollPosition = scrollPosition + e.deltaY * scrollSpeed;

      const textElement = textRef.current;
      if (!textElement) return;

      const textWidth = textElement.scrollWidth;
      const containerWidth = container.clientWidth;

      const maxScroll = Math.max(0, textWidth - containerWidth);
      const clampedPosition = Math.max(0, Math.min(newScrollPosition, maxScroll));

      setScrollPosition(clampedPosition);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [scrollPosition]);

  const progressPercentage =
    scrollPosition === 0
      ? 0
      : Math.min(
          100,
          (scrollPosition /
            Math.max(1, (textRef.current?.scrollWidth || 1) - (containerRef.current?.clientWidth || 1))) *
            100
        );

  return (
    <>
      <div className="w-full h-screen overflow-hidden relative" ref={containerRef}>
        <video
          src="https://videos.pexels.com/video-files/9354232/9354232-hd_1080_1920_28fps.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 z-0 block w-full h-[100%] object-cover"
          poster="https://images.pexels.com/videos/9354232/pexels-photo-9354232.jpeg?auto=compress&amp;cs=tinysrgb&amp;fit=crop&amp;h=1200&amp;w=630"
        ></video>
        <Link to="/login">
          <Button
            className={`absolute top-5 right-5 block z-10 px-3 h-12 duration-300 ease-in-out text-center cursor-pointer ${
              progressPercentage >= 50 ? "bg-c_secondary hover:bg-gray-500 " : "bg-main hover:bg-amber-400 text-black"
            }`}
          >
            {isAuthenticated ? "Go to dashboard" : "Login"}
          </Button>
        </Link>

        <div
          ref={textRef}
          className="text-[60rem] leading-none font-bold whitespace-nowrap transition-transform duration-100 ease-out font-montserrat"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
          }}
        >
          <span className="text-c_secondary ">Kloud</span>
          <span className="text-main">track</span>
        </div>
      </div>
      <div className="fixed bottom-4 left-4 right-4 z-20">
        <div className=" rounded-full h-2">
          <div
            className={`rounded-full h-2 transition-all duration-100 ${
              progressPercentage >= 50 ? "bg-c_secondary" : "bg-main"
            }`}
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>
      </div>
    </>
  );
}
