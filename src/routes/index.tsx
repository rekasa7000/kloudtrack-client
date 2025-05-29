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
          className="text-[50rem] leading-none font-bold whitespace-nowrap transition-transform duration-100 ease-out font-montserrat"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
          }}
        >
          <span className="text-c_secondary ">Kloud</span>
          <span className="text-main">track</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="rounded-full h-2 bg-black/20">
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
            <div className="text-white text-center">
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
              </div>
              <p className="text-sm mt-2">Scroll to explore</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white">
        <div className="bg-white">
          <section className="py-20 px-6 w-full mx-auto relative h-[30rem]">
            <video
              src="https://videos.pexels.com/video-files/9354232/9354232-hd_1080_1920_28fps.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-0 left-0 z-0 block w-full h-[100%] object-cover"
              poster="https://images.pexels.com/videos/9354232/pexels-photo-9354232.jpeg?auto=compress&amp;cs=tinysrgb&amp;fit=crop&amp;h=1200&amp;w=630"
            ></video>
            <div className="w-full absolute top-0 bottom-0 flex flex-col justify-center items-center">
              <div className="text-center my-16">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">
                  <span className="text-c_secondary ">Kloud</span>
                  <span className="text-main">track</span>
                </h1>

                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Disaster Preparedness Starts Here </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {solutions.map((solution, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{solution.title}</h3>
                    <p className="text-gray-600">{solution.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Advanced technology solutions for real-time weather monitoring and decision support
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Specialized monitoring systems tailored for different environmental conditions
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {otherServices.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Cloud className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm opacity-90">{service.image}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{service.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-6 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join us in building resilient communities with cutting-edge weather monitoring technology
              </p>
              <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                <Button className="bg-main hover:bg-amber-400 text-black px-8 py-3 text-lg font-semibold">
                  {isAuthenticated ? "Go to Dashboard" : "Get Started Today"}
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
