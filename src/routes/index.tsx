import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Cloud,
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Star,
  MapPin,
  Droplets,
  Wind,
  Play,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setTheme, theme } = useTheme();

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
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Capacity Building and Training Services",
      description:
        "Our disaster education and workshops aim to promote comprehensive awareness and preparedness. believe that by providing these resources, we can help individuals and communities better understand the risks and take proactive measures to mitigate them. Join us in our efforts to build a safer and more future.",
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

  const themeClasses = theme === "dark" ? "bg-zinc-900 text-zinc-100" : "bg-zinc-50 text-zinc-900";

  const cardClasses =
    theme === "dark"
      ? "bg-zinc-800/50 border-zinc-700/50 backdrop-blur-sm"
      : "bg-white/80 border-zinc-200/50 backdrop-blur-sm";

  const accentClasses = "text-[#fbd008]";
  const secondaryClasses = theme === "dark" ? "text-zinc-400" : "text-[#545454]";

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses}`}>
      <div className="fixed inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #fbd008 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #fbd008 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <header className="relative z-10 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="favicon.svg" className="w-8 h-8" alt="favicon" />
            <span className="text-2xl font-bold">KloudTrack</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className={`hover:${accentClasses} transition-colors`}>
              Features
            </a>
            <a href="#products" className={`hover:${accentClasses} transition-colors`}>
              Products
            </a>
            <a href="#learn" className={`hover:${accentClasses} transition-colors`}>
              Learn More
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={`p-2 rounded-lg border transition-all hover:scale-110 ${cardClasses}`}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="bg-[#fbd008] text-zinc-900 px-6 py-2 rounded-lg font-semibold hover:bg-[#fbd008]/90 transition-all hover:scale-105 shadow-lg">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 "opacity-0 translate-y-10`}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              Disaster Preparedness
              <br />
              <span className={accentClasses}>Starts Here</span>
            </h1>
            <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto ${secondaryClasses}`}>
              Empowering Communities with Hyper-Localized Weather Monitoring and Decision Support Tools
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="bg-[#fbd008] text-zinc-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#fbd008]/90 transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2">
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {solutions.map((data, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border flex flex-col justify-between gap-2 transition-all duration-500 hover:scale-105 ${cardClasses}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <span className="text-xl font-bold mb-2">{data.title}</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-300 ">{data.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border transition-all duration-300 hover:scale-105 group ${cardClasses}`}
              >
                <div className={`mb-6 ${accentClasses} group-hover:scale-110 transition-transform`}>{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className={secondaryClasses}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Other Services and <span className={accentClasses}>Products</span>
            </h2>
            <h3></h3>
            Kloudtech is also a provider of coastal weather monitoring and river water level monitoring services. We
            also offer Kloudteach, a workshop and tutorial service designed to help individuals and organizations stay
            informed about environmental conditions and learn new skills. With our expertise, clients can make informed
            decisions about activities such as boating, fishing, or construction near bodies of water. Our commitment to
            providing these diverse services demonstrates our dedication to meeting the needs of our clients and
            supporting their ongoing learning and development.
          </div>

          <div className="grid md:grid-cols-3 gap-8 mx-auto">
            {otherServices.map((service, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${cardClasses}`}
              >
                <div>
                  <div className="font-semibold">{service.title}</div>
                  <p className={`text-lg mb-6 ${secondaryClasses}`}>{service.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20" id="learn">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`p-12 rounded-3xl border ${cardClasses}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Learn more about
              <br />
              Kloud
              <span className={accentClasses}>Track</span>
            </h2>
            <iframe
              className="w-full h-full aspect-video"
              src="https://www.youtube.com/embed/bbuA3XmUSgo?si=03MDzmUEPNrBZhM3"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      </section>

      <footer className="relative z-10 px-6 py-12 border-t border-opacity-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <img src="favicon.svg" className="w-8 h-8" alt="favicon" />
            <span className="text-xl font-bold">KloudTrack</span>
          </div>
          <p className={secondaryClasses}>© 2025 KloudTrack. Disaster Preparedness Starts Here.</p>
        </div>
      </footer>
    </div>
  );
}
