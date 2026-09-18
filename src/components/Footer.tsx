export default function Footer() {
  return (
    <footer className="bg-[#0a0a10] border-t border-white/10 py-12 text-center text-gray-500 text-sm font-medium relative z-10">
      <p>VIBEMATCH PLATFORM © {new Date().getFullYear()}. Kết nối qua từng nhịp Bass.</p>
      <p className="mt-2 text-gray-700">Powered by Next.js, Tailwind CSS & Framer Motion</p>
    </footer>
  );
}
