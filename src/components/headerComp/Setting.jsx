import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Settings,
  Sun,
  Moon,
  Languages,
  Check,
  ChevronDown,
  Globe,
} from "lucide-react";
import useThemeStore from "../../store/useThemeStore";
import { useLanguageStore } from "../../store/useLanguageStore";

export default function Setting() {
  const { theme, setTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="outline-none" asChild>
        <button className="flex h-[30px] items-center justify-center rounded-md bg-[#a1abae] px-[10px] py-[2px] dark:bg-[#212121]">
          <Settings size={20} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          align="start"
          className="z-50 mt-[10px] min-w-[150px] rounded-md bg-white p-1 shadow-lg dark:bg-[#171717] dark:text-white"
        >
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="z-50 flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm font-medium hover:bg-[#a1abae] dark:hover:bg-[#212121]">
              <span className="flex items-center gap-2">
                <Sun size={16} /> Theme
              </span>
              <ChevronDown size={16} />
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className="z-50 w-[150px] rounded-md bg-white p-1 shadow-lg dark:bg-[#171717] dark:text-white"
                sideOffset={7}
                align="start"
              >
                <DropdownMenu.Item
                  onSelect={() => setTheme("light")}
                  className="flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-[#a1abae] dark:hover:bg-[#212121]"
                >
                  <span className="flex items-center gap-2">
                    <Sun size={16} /> Light Mode
                  </span>
                  {theme === "light" && <Check size={16} />}
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={() => setTheme("dark")}
                  className="flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-[#a1abae] dark:hover:bg-[#212121]"
                >
                  <span className="flex items-center gap-2">
                    <Moon size={16} /> Dark Mode
                  </span>
                  {theme === "dark" && <Check size={16} />}
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator className="z-50 my-1 h-px bg-gray-200 dark:bg-gray-700" />

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="z-50 flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm font-medium hover:bg-[#a1abae] dark:hover:bg-[#212121]">
              <span className="flex items-center gap-2">
                <Globe size={16} /> Language
              </span>
              <ChevronDown size={16} />
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className="z-50 w-[150px] rounded-md bg-white p-1 shadow-lg dark:bg-[#171717] dark:text-white"
                sideOffset={7}
                align="start"
              >
                <DropdownMenu.Item
                  onSelect={() => setLanguage("en")}
                  className="flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-[#a1abae] dark:hover:bg-[#212121]"
                >
                  <span className="flex items-center gap-2">
                    <Languages size={16} /> English (EN)
                  </span>
                  {language === "en" && <Check size={16} />}
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={() => setLanguage("hu")}
                  className="flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-[#a1abae] dark:hover:bg-[#212121]"
                >
                  <span className="flex items-center gap-2">
                    <Languages size={16} /> Magyar (HU)
                  </span>
                  {language === "hu" && <Check size={16} />}
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
