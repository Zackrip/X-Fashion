import React, { useState } from "react";
import { Link } from "react-router-dom";

const ReelsButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-2">


      {hovered && (
        <div className="bg-black text-white text-xs px-3 py-2 rounded-xl shadow-lg animate-fade-in text-right">
          <p className="font-semibold">✨ New Feature</p>
          <p className="text-white/70">See product reels</p>
        </div>
      )}

      <Link
        to="/reels"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex flex-col items-center justify-center w-16 h-16 bg-black text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
        style={{
          boxShadow: "0 0 20px rgba(0,0,0,0.4)",
        }}
      >
        
        <span className="absolute w-16 h-16 rounded-full bg-black/30 animate-ping" />

        <span className="text-2xl">🎬</span>
        <span className="text-[9px] font-bold tracking-wide mt-0.5">REELS</span>
      </Link>
    </div>
  );
};

export default ReelsButton;
