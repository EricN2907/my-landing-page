"use client";

import { motion } from "framer-motion";
import { topVibers, genres } from "@/data/mockData";
import { Search, Filter, Music, MessageCircle } from "lucide-react";

export default function VibersPage() {
  const extendedVibers = [...topVibers, ...topVibers.map(p => ({
    ...p, 
    id: p.id + 10, 
    name: p.name + "_X", 
    genres: p.genres.reverse() 
  }))];

  return (
    <main className="min-h-screen bg-[#0a0a10] text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-200 pt-32 pb-24 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Khám Phá <span className="text-cyan-400">Vibe-Mate</span>
            </h1>
            <p className="text-gray-400 text-lg">Tìm kiếm người nghe chung nhạc EDM, Chill Lo-fi, Indie hay Pop...</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4 w-full md:w-auto"
          >
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Tìm user hoặc bài hát..." 
                className="w-full pl-12 pr-4 py-3 bg-[#13131a] border border-white/10 rounded-full focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white"
              />
            </div>
            <button className="p-3 bg-[#13131a] border border-white/10 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-cyan-400">
              <Filter className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Categories / Genres filter */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          <button className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-full">Tất cả</button>
          {genres.map(g => (
            <button key={g.id} className="px-6 py-2 bg-[#13131a] border border-white/10 text-gray-300 font-bold rounded-full hover:border-cyan-500/50 transition-colors">
              {g.name}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {extendedVibers.map((viber, idx) => (
            <motion.div 
              key={viber.id} 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-[#13131a] border border-white/10 hover:border-cyan-500/50 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img src={viber.avatar} alt={viber.name} className="w-16 h-16 rounded-full border-2 border-white/10 group-hover:border-cyan-400 transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">{viber.name}</h3>
                  <p className="text-xs text-gray-400 font-medium mt-1">Match: <span className="text-cyan-400">{viber.match}</span></p>
                </div>
              </div>

              {/* Tags Thể loại */}
              <div className="flex flex-wrap gap-2 mb-4">
                {viber.genres.map(g => (
                  <span key={g} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-white/10 text-gray-300 rounded-md">
                    {g}
                  </span>
                ))}
              </div>

              <div className="bg-[#0a0a10] p-4 rounded-xl mb-6 border border-white/5 flex-grow">
                <p className="text-[10px] text-gray-500 mb-1 font-bold uppercase">Bản nhạc đang nghe</p>
                <p className="font-bold text-sm text-violet-400 flex items-center gap-2 truncate">
                  <Music className="w-3 h-3 flex-shrink-0" /> <span className="truncate">{viber.favorite}</span>
                </p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-white/5 text-gray-300 font-bold text-sm rounded-xl flex items-center justify-center gap-2 group-hover:bg-cyan-500 group-hover:text-black transition-all mt-auto"
              >
                <MessageCircle className="w-4 h-4" /> Bắt chuyện
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
