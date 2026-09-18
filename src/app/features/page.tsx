"use client";

import { motion } from "framer-motion";
import { CheckCircle, Radio } from "lucide-react";
import { steps } from "@/data/mockData";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a10] text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-200 pt-32 pb-24 px-6 relative">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 font-bold text-sm rounded-full tracking-wide uppercase mb-6 inline-block border border-cyan-500/30">Tính Năng Cốt Lõi</span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            Thuật Toán <span className="text-violet-500">Music Match</span> Độc Quyền
          </h1>
          <p className="text-gray-400 text-xl mb-16 leading-relaxed">
            Chúng tôi sử dụng AI để phân tích hàng ngàn playlist Spotify và Apple Music của bạn, từ đó đo đạc sóng âm và tần số để ghép đôi chính xác những tâm hồn có chung nhịp đập âm nhạc.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-[#13131a] p-8 rounded-3xl border border-white/10 text-center hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Radio className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
      </div>
    </main>
  );
}
