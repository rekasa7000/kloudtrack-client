import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
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
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const { isAuthenticated } = useAuth();

  const progressPercentage =
    scrollPosition === 0
      ? 0
      : Math.min(
          100,
          (scrollPosition /
            Math.max(1, (textRef.current?.scrollWidth || 1) - (containerRef.current?.clientWidth || 1))) *
            100
        );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (progressPercentage < 100) {
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
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [scrollPosition, progressPercentage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div className="w-full">
      <div className={`w-full h-screen relative ${isVisible ? "overflow-hidden" : "hidden"}`} ref={containerRef}>
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
          className="text-[50rem] leading-[60rem] font-bold whitespace-nowrap transition-transform duration-100 ease-out font-montserrat "
          style={{
            transform: `translateX(-${scrollPosition}px)`,
          }}
        >
          <span className="text-c_secondary ">Kloud</span>
          <span className="text-main">track</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="rounded-full h-2">
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

        {progressPercentage === 100 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
            <div className=" text-center">
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
              </div>
              <p className="text-sm mt-2">Scroll to explore</p>
            </div>
          </div>
        )}
      </div>
      <div className="w-full text-center text-white bg-c_secondary text-2xl font-montserrat">KLOUDTRACK</div>
      <section className="w-full h-full bg-main">
        <div className=" flex flex-col container m-auto space-y-5 py-5 ">
          {solutions.map((item) => (
            <Card className="p-2">
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          ))}
        </div>
      </section>
      <section className="w-full h-full bg-c_secondary">
        <div className=" flex flex-col container m-auto space-y-5 py-5 ">
          {features.map((item) => (
            <Card className="p-2">
              <CardTitle className="flex items-center gap-2">
                {item.icon}
                {item.title}
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          ))}
        </div>
      </section>
      <section className="w-full h-full bg-main">
        <div className=" flex flex-col container m-auto space-y-5 py-5 ">
          {otherServices.map((item) => (
            <Card className="p-2">
              <CardTitle className="flex items-center gap-2">
                {item.image}
                {item.title}
              </CardTitle>
              <CardDescription>{item.content}</CardDescription>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
