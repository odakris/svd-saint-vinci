"use client";

import { cn } from "@/lib/utils";
import { BookOpen, GraduationCap, LayoutDashboard, Users, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { name: "Élèves", href: "/dashboard/students", icon: Users },
  { name: "Classes", href: "/dashboard/classes", icon: GraduationCap },
  // { name: "Matières", href: "/dashboard/subjects", icon: BookOpen },
  // { name: "Emploi du temps", href: "/dashboard/schedule", icon: Calendar },
  // { name: "Notes", href: "/dashboard/grades", icon: FileText },
  { name: "Import", href: "/dashboard/import", icon: FileText },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 min-h-[calc(100vh-4rem)] border-r bg-card px-3 py-4">
      <div className="space-y-4">
        <div className="py-2">
          <h2 className="px-4 text-lg font-semibold">Navigation</h2>
        </div>
        <div className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "transparent"
              )}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
