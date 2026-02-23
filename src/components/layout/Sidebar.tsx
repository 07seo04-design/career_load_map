"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  Target,
  FolderOpen,
  Menu,
  X,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/roadmap", label: "로드맵", icon: Map },
  { href: "/daily", label: "Daily Quest", icon: Target },
  { href: "/archive", label: "아카이브", icon: FolderOpen },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* 모바일 햄버거 버튼 */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 rounded-lg bg-navy-600 p-2 text-white shadow-lg md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* 모바일 오버레이 */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-navy-800 text-white transition-transform duration-300 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* 로고 영역 */}
        <div className="flex items-center justify-between border-b border-navy-700 px-6 py-5">
          <Link href="/" className="flex items-center gap-2">
            <Compass className="h-7 w-7 text-green-accent" />
            <span className="text-lg font-bold tracking-tight">
              Job Navigator
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded p-1 hover:bg-navy-700 md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 내비게이션 */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-navy-600 text-white shadow-sm"
                    : "text-navy-200 hover:bg-navy-700 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 하단 프로필 영역 */}
        <div className="border-t border-navy-700 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-accent text-sm font-bold text-navy-900">
              N
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium">학생 이름</p>
              <p className="text-xs text-navy-300">소프트웨어과</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
