/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
}

export default function ToolCard({ id, name, description, icon: Icon, color }: ToolCardProps) {
  // Map our existing bg-red-500 classes to lighter equivalents for the theme
  const getIconBg = (colorClass: string) => {
    if (colorClass.includes("red")) return "bg-rose-50 text-rose-600 group-hover:bg-rose-600";
    if (colorClass.includes("green")) return "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600";
    if (colorClass.includes("blue")) return "bg-blue-50 text-blue-600 group-hover:bg-blue-600";
    if (colorClass.includes("orange") || colorClass.includes("yellow")) return "bg-amber-50 text-amber-600 group-hover:bg-amber-600";
    if (colorClass.includes("purple") || colorClass.includes("indigo")) return "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600";
    if (colorClass.includes("pink") || colorClass.includes("rose")) return "bg-pink-50 text-pink-600 group-hover:bg-pink-600";
    if (colorClass.includes("teal") || colorClass.includes("cyan")) return "bg-teal-50 text-teal-600 group-hover:bg-teal-600";
    return "bg-slate-50 text-slate-600 group-hover:bg-slate-600";
  };

  const isSpecial = id.includes("ai");

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Link
        to={`/tool/${id}`}
        className={cn(
          "flex flex-col h-full p-5 rounded-xl border transition-all cursor-pointer group shadow-sm hover:shadow-md relative",
          isSpecial 
            ? "bg-blue-600 border-blue-500 text-white" 
            : "bg-white border-slate-200 hover:border-blue-300"
        )}
      >
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors",
          isSpecial ? "bg-white/20 text-white" : getIconBg(color),
          !isSpecial && "group-hover:text-white"
        )}>
          <Icon size={20} />
        </div>
        
        <div className="flex items-center gap-2 mb-1">
          <h3 className={cn("font-bold text-lg leading-tight", isSpecial ? "text-white" : "text-slate-800")}>
            {name}
          </h3>
          {isSpecial && (
            <span className="bg-white text-blue-600 text-[10px] px-1.5 py-0.5 rounded font-black uppercase">New</span>
          )}
        </div>
        
        <p className={cn("text-xs leading-relaxed", isSpecial ? "text-blue-100" : "text-slate-500")}>
          {description}
        </p>
      </Link>
    </motion.div>
  );
}
