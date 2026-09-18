"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Headphones } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed w-full z-50 bg-[#0a0a10]/80 backdrop-blur-xl border-b border-white/10 shadow-sm text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
          >
            <Headphones className="text-cyan-400" /> 
            VIBEMATCH
          </motion.div>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-bold text-gray-400">
          <Link href="/" className={`${pathname === "/" ? "text-cyan-400" : "hover:text-cyan-400"} transition-colors`}>
            Khám phá
          </Link>
          <Link href="/features" className={`${pathname === "/features" ? "text-cyan-400" : "hover:text-cyan-400"} transition-colors`}>
            Tính năng
          </Link>
          <Link href="/players" className={`${pathname === "/players" ? "text-cyan-400" : "hover:text-cyan-400"} transition-colors`}>
            Tìm Vibe-mate
          </Link>
        </div>
        <motion.button 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-cyan-500/20"
        >
          Connect Spotify
        </motion.button>
      </div>
    </nav>
  );
}
