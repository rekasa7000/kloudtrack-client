import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "./theme-provider";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      size="icon"
      className={`rounded-full shadown-none bg-transparent hover:bg-muted ${theme === "dark" ? " text-white" : "text-black"}`}
      onClick={toggleTheme}
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default ThemeSwitch;
