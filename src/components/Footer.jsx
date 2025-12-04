import { Heart, Sparkles, Laptop2 } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          
          {/* Kiri - Brand + Love */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <img src="/Dev..png" alt="Logo CariLaptop" className="h-20 w-20 object-contain" />
              <img src="/carilaptop.com.png" alt="Logo CariLaptop" className="h-24 w-auto object-contain"/>
            </div>
            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
              Dibuat dengan
              <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
              untuk kamu yang lagi cari laptop terbaik
            </p>
          </div>

          {/* Tengah - Tagline */}
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700 mb-2">
              Temukan laptop impianmu
            </p>
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tanpa bingung lagi
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Sparkles className="w-6 h-6 text-yellow-500 animate-twinkle" />
              <Sparkles className="w-5 h-5 text-yellow-400 animate-twinkle animation-delay-1000" />
              <Sparkles className="w-6 h-6 text-yellow-500 animate-twinkle animation-delay-2000" />
            </div>
          </div>

          {/* Kanan - Credit */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500 mb-1">Dibangun dengan penuh semangat oleh</p>
            <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Z-Dev
            </p>
            <p className="text-xs text-gray-400 mt-2">© {currentYear} All rights reserved</p>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-8 border-t border-gray-200/60">
          <p className="text-center text-sm text-gray-500">
            Terima kasih sudah mempercayakan pencarian laptopmu kepada kami
          </p>
        </div>
      </div>

      {/* CSS Animation (tambahkan di globals.css atau component) */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .animate-twinkle {
          animation: twinkle 2s infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;