"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Radio, Disc, Play, Heart, Headphones, ChevronRight, PlayCircle, Star, MessageCircle, CheckCircle, Clock, Volume2, VolumeX } from "lucide-react";
import { statistics, genres, topVibers, steps, testimonials, suggestedVibes, trendingTracks } from "@/data/mockData";
import Link from "next/link";

export default function Home() {
  // --- AUDIO STATES ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Alan Walker Section Audio State
  const awAudioRef = useRef<HTMLAudioElement | null>(null);
  const [activeAW, setActiveAW] = useState<number | null>(null);

  // Sync Volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    if (awAudioRef.current) awAudioRef.current.volume = volume;
  }, [volume]);

  // --- HANDLERS ---
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playAWSong = (id: number) => {
    setActiveAW(id);
    const node = awNodes.find(n => n.id === id);
    if (awAudioRef.current && node) {
      awAudioRef.current.src = node.audio;
      awAudioRef.current.play().catch(e => console.log("Audio play blocked by browser", e));
      
      // Tạm dừng nhạc nền Lofi nếu đang bật
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const stopAWSong = () => {
    setActiveAW(null);
    if (awAudioRef.current) {
      awAudioRef.current.pause();
      awAudioRef.current.currentTime = 0;
    }
  };

  const getGenreIcon = (id: number) => {
    switch (id) {
      case 1: return <Disc className="w-12 h-12 text-cyan-400" />;
      case 2: return <Headphones className="w-12 h-12 text-amber-500" />;
      case 3: return <Play className="w-12 h-12 text-emerald-400" />;
      case 4: return <Radio className="w-12 h-12 text-pink-500" />;
      default: return <Music className="w-12 h-12 text-gray-400" />;
    }
  };

  // Tọa độ 5 đỉnh của chữ W
  const awNodes = [
    { id: 1, title: "Alone", x: 10, y: 15, audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a2/71/3f/a2713f1c-c1a2-86b3-5ec2-633e71927fae/mzaf_1625470662823872018.plus.aac.p.m4a" },
    { id: 2, title: "Sing Me To Sleep", x: 30, y: 85, audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/8a/f5/81/8af58164-55a1-1cfe-2749-c3166cf1defd/mzaf_13890035559065524537.plus.aac.p.m4a" },
    { id: 3, title: "The Spectre", x: 50, y: 40, audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b2/06/ae/b206ae07-8bdb-2405-b8f2-d85a777aa69d/mzaf_1782105357937446994.plus.aac.p.m4a" },
    { id: 4, title: "Ignite", x: 70, y: 85, audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/55/18/68/551868c0-feaa-65ca-a589-58049e401797/mzaf_17405011615928886017.plus.aac.p.m4a" },
    { id: 5, title: "On My Way", x: 90, y: 15, audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b2/85/49/b28549a1-db17-cf5d-8442-9a6cb4810ab9/mzaf_359154721032886178.plus.aac.p.m4a" },
  ];

  return (
    <main className="bg-[#0a0a10] text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden relative min-h-screen">
      
      {/* --- BACKGROUND MUSIC PLAYER --- */}
      <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      <audio ref={awAudioRef} loop />

      {/* Floating Audio Controller & Volume */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4 bg-[#0a0a10]/80 backdrop-blur-xl border border-white/10 p-2 pr-2 pl-5 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all">
        {/* Volume Slider */}
        <div className="flex items-center gap-2">
          {volume === 0 ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-gray-400" />}
          <input 
            type="range" min="0" max="1" step="0.01" 
            value={volume} 
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 md:w-28 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Play/Pause Button */}
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl relative ${
            isPlaying 
              ? "bg-gradient-to-r from-cyan-500 to-violet-600 shadow-[0_0_20px_rgba(6,182,212,0.5)]" 
              : "bg-white/10 text-gray-300"
          }`}
        >
          {isPlaying ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              <Disc className="w-7 h-7 text-white" />
            </motion.div>
          ) : (
            <PlayCircle className="w-7 h-7 ml-1" />
          )}
          
          {isPlaying && (
            <div className="absolute -top-1 -right-1 flex gap-1 pointer-events-none">
              <motion.span animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-cyan-400 rounded-full"></motion.span>
              <motion.span animate={{ height: [8, 4, 16, 8] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-violet-400 rounded-full"></motion.span>
              <motion.span animate={{ height: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-fuchsia-400 rounded-full"></motion.span>
            </div>
          )}
        </motion.button>
      </div>

      {/* Background Animated Neon Glows */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none" 
      />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-24 px-6 lg:pt-52 lg:pb-32 flex flex-col items-center justify-center text-center">
        <div 
          className="absolute inset-0 z-0 opacity-[0.15]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1470229722913-7c090be5c520?q=80&w=2070&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a10]/80 to-[#0a0a10] z-0" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold rounded-full text-sm mb-6 uppercase tracking-widest backdrop-blur-md"
          >
            🎵 Trải nghiệm âm nhạc không giới hạn
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.1] text-white"
          >
            Find Your Rhythm. <br />
            <motion.span 
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 bg-[length:200%_auto]"
            >
              Connect Your Vibe.
            </motion.span> 
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light"
          >
            Kết nối với những tâm hồn đồng điệu. Dù bạn đam mê quẩy EDM, chill cùng Lo-fi, hay phiêu lãng với Indie acoustic.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link href="/players">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-lg rounded-full shadow-xl flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12" />
                <Heart className="w-5 h-5 group-hover:animate-ping absolute opacity-0 group-hover:opacity-100" />
                <Heart className="w-5 h-5 relative z-10" /> Tìm Vibe-Mate Ngay
              </motion.button>
            </Link>
            <motion.button 
              onClick={togglePlay}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-bold text-lg rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center gap-2 transition-colors"
            >
              <PlayCircle className={`w-5 h-5 ${isPlaying ? 'text-cyan-400' : ''}`} /> 
              {isPlaying ? "Tạm Dừng Nhạc" : "Nghe Thử Nhạc"}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* --- STATISTICS SECTION --- */}
      <section className="py-16 relative bg-white/5 backdrop-blur-md border-y border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {statistics.map((stat, idx) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2, type: "spring" }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="text-5xl md:text-6xl font-black text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {stat.value}
              </div>
              <div className="text-cyan-400 font-bold uppercase tracking-wider text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FANDOM SPOTLIGHT: ALAN WALKER (NEW INTERACTIVE SECTION) --- */}
      <section className="py-32 px-6 relative z-10 bg-black overflow-hidden border-y border-white/10">
        {/* Background Video / Image for AW Section */}
        <div 
          className="absolute inset-0 z-0 opacity-40 transition-opacity duration-700"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: activeAW ? "brightness(1.5) contrast(1.2)" : "grayscale(80%) brightness(0.5)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a10] via-transparent to-[#0a0a10] z-0" />
        <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay z-0" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-sm font-black text-cyan-400 uppercase tracking-[0.3em] mb-4">Fandom Spotlight</h2>
            <h3 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl">ALAN WALKER</h3>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto text-lg">Di chuột vào các đỉnh của biểu tượng huyền thoại để đánh thức những giai điệu đi cùng năm tháng.</p>
          </motion.div>

          {/* THE "W" INTERACTIVE GRAPHIC */}
          <div className="relative w-full max-w-3xl mx-auto aspect-[2/1] mt-10">
            {/* Background glowing particles */}
            <motion.div animate={{ y: [0, -20, 0], opacity: [0, 0.5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />
            <motion.div animate={{ y: [0, 20, 0], opacity: [0, 0.4, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-fuchsia-500/10 rounded-full blur-2xl pointer-events-none" />
            
            {/* SVG W Path perfectly aligned to aspect-[2/1] */}
            <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-10">
              {/* Outer blurred glow */}
              <motion.path 
                d="M 20 15 L 60 85 L 100 40 L 140 85 L 180 15"
                fill="transparent"
                stroke="rgba(6, 182, 212, 0.5)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="blur(4px)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              {/* Inner bright core */}
              <motion.path 
                d="M 20 15 L 60 85 L 100 40 L 140 85 L 180 15"
                fill="transparent"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>

            {/* Glowing Nodes for each Song */}
            {awNodes.map((node) => {
              const isActive = activeAW === node.id;
              
              return (
                <div 
                  key={node.id}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  onMouseEnter={() => playAWSong(node.id)}
                  onMouseLeave={stopAWSong}
                >
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    animate={!isActive ? { boxShadow: ["0 0 10px rgba(6,182,212,0.5)", "0 0 25px rgba(6,182,212,0.9)", "0 0 10px rgba(6,182,212,0.5)"] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center ${
                      isActive ? "bg-white shadow-[0_0_40px_rgba(255,255,255,1)]" : "bg-cyan-500 border-2 border-white"
                    }`}
                  >
                    {isActive && <div className="absolute w-12 h-12 rounded-full border border-white/50 animate-ping" />}
                  </motion.div>

                  {/* Song Title Tooltip */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: node.y > 50 ? -40 : 40, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 border border-cyan-500/50 backdrop-blur-md px-4 py-2 rounded-lg pointer-events-none z-50"
                      >
                        <p className="text-white font-black tracking-widest uppercase text-sm md:text-base drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                          {node.title}
                        </p>
                        <div className="flex justify-center gap-1 mt-1">
                          {[1,2,3,4,5].map(i => (
                            <motion.div 
                              key={i} 
                              animate={{ height: [2, Math.random() * 10 + 4, 2] }} 
                              transition={{ repeat: Infinity, duration: Math.random() * 0.5 + 0.3 }}
                              className="w-1 bg-cyan-400 rounded-full"
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- SUGGESTED VIBES / PLAYLISTS --- */}
      <section className="py-24 px-6 relative z-10 bg-[#0a0a10]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black mb-4 tracking-tight flex items-center gap-3">
                <span className="text-fuchsia-500">Playlist</span> Tâm Trạng
              </h2>
              <p className="text-gray-400 text-lg">Khám phá các playlist được AI gợi ý dựa trên cảm xúc của bạn hôm nay.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestedVibes.map((vibe, idx) => (
              <motion.div
                key={vibe.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, type: "spring", stiffness: 50 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-xl"
              >
                <div className="aspect-square relative overflow-hidden">
                  <motion.img 
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                    src={vibe.image} 
                    alt={vibe.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a10] via-black/40 to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      className="w-16 h-16 bg-fuchsia-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-fuchsia-500/50"
                    >
                      <Play className="w-8 h-8 ml-1" />
                    </motion.div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-300 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-white mb-2">{vibe.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {vibe.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 bg-white/20 backdrop-blur-md rounded-md text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{vibe.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRENDING TRACKS LIST --- */}
      <section className="py-24 px-6 relative z-10 bg-[#0f0f16] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <div>
              <h2 className="text-4xl font-black mb-4 tracking-tight">
                Nhạc Đang <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="text-cyan-400">Thịnh Hành</motion.span>
              </h2>
              <p className="text-gray-400 text-lg">Top 10 giai điệu được nghe và ghép đôi nhiều nhất trên nền tảng tuần này.</p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-3">
            {trendingTracks.map((track, idx) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05, type: "spring", stiffness: 50 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                className="group flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-cyan-500/30 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="flex items-center gap-4 w-2/3 relative z-10">
                  <span className="w-6 text-center text-gray-500 font-bold group-hover:hidden">{idx + 1}</span>
                  <motion.div whileHover={{ scale: 1.2 }} className="w-6 hidden group-hover:flex justify-center">
                    <Play className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                  </motion.div>
                  <img src={track.cover} alt={track.title} className="w-12 h-12 rounded object-cover shadow-md group-hover:shadow-cyan-500/50 transition-shadow" />
                  <div>
                    <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors truncate">{track.title}</h4>
                    <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between w-1/3 relative z-10">
                  <span className="hidden sm:block text-xs uppercase font-bold tracking-wider px-3 py-1 bg-white/5 text-gray-300 rounded-full border border-white/10 group-hover:border-cyan-500/50 group-hover:text-cyan-300 transition-colors">
                    {track.genre}
                  </span>
                  <span className="text-gray-400 font-medium group-hover:text-white transition-colors">{track.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="py-24 px-6 bg-[#0a0a10]">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-cyan-600 via-blue-600 to-violet-700 rounded-[2rem] p-12 md:p-16 text-center text-white shadow-2xl shadow-cyan-900/40 relative overflow-hidden group"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" 
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-32 -left-32 w-96 h-96 bg-fuchsia-400/20 rounded-full blur-3xl pointer-events-none" 
            />
            
            <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10">Bạn Đã Sẵn Sàng Bật Nhạc?</h2>
            <p className="text-cyan-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">
              Đừng nghe nó một mình. Đồng bộ ứng dụng âm nhạc ngay để kết nối với hàng nghìn Vibe-Mate trên toàn cầu.
            </p>
            <motion.button 
              whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-violet-700 font-black text-lg rounded-full shadow-xl flex items-center gap-3 mx-auto relative z-10 hover:bg-gray-100 transition-all"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                <Disc className="w-6 h-6" /> 
              </motion.div>
              Tham Gia Ngay
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
