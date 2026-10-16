"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import BrandLogo from "./brand-logo";
import {
  HeartPulse,
  Baby,
  Flower2,
  Stethoscope,
  Users,
  FileText,
  MessageCircle,
  Activity,
  UserRound,
  LogOut,
  Brain,
  ShieldCheck,
  Settings,
} from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

const menuItems = [
  {
    translationKey: "navigation.notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    translationKey: "navigation.healthTracking",
    href: "/tracking",
    icon: HeartPulse,
  },
  {
    translationKey: "navigation.doctorConsultation",
    href: "/consultation",
    icon: Stethoscope,
  },
  {
    translationKey: "navigation.menstrual",
    href: "/menstrual",
    icon: Flower2,
  },
  {
    translationKey: "navigation.mentalWellness",
    href: "/mental-wellness",
    icon: Brain,
  },
  {
    translationKey: "navigation.pmos",
    href: "/pmos",
    icon: ShieldCheck,
  },
  {
    translationKey: "navigation.pregnancy",
    href: "/pregnancy",
    icon: Baby,
  },
  {
    translationKey: "navigation.aiAssistant",
    href: "/chat",
    icon: MessageCircle,
  },
  {
    translationKey: "navigation.community",
    href: "/community",
    icon: Users,
  },
  {
    translationKey: "navigation.dietWorkout",
    href: "/diet-workout",
    icon: Activity,
  },
  {
    translationKey: "navigation.reports",
    href: "/reports",
    icon: FileText,
  },
  {
    translationKey: "navigation.profile",
    href: "/profile",
    icon: UserRound,
  },
  {
    translationKey: "navigation.settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  const logout = () => {
    localStorage.removeItem("sakhi_token");
    router.push("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[#f0dce5] bg-white max-md:static max-md:h-auto max-md:w-full">

      {/* Logo */}
      <div className="border-b border-[#f5e5ec] px-5 py-4 sm:px-6 sm:py-6">
        <BrandLogo className="w-40 max-w-full sm:w-48" />

        <p className="mt-1 text-xs text-[#8b7285]">
          {t("navigation.patientTagline")}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto p-4 max-md:flex max-md:gap-2 max-md:overflow-x-auto max-md:overflow-y-hidden max-md:whitespace-nowrap">

        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-[#fce8f0] text-[#a65a78]"
                  : "text-[#76566f] hover:bg-[#fff5f8]"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />

              <span>
                {t(item.translationKey)}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* Logout */}
      <div className="border-t border-[#f5e5ec] p-4 max-md:border-t-0 max-md:pt-0">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#76566f] transition hover:bg-[#fff5f8]"
        >
          <LogOut className="h-5 w-5 shrink-0" />

          <span>
            {t("navigation.logout")}
          </span>
        </button>
      </div>


    </aside>
  );
}