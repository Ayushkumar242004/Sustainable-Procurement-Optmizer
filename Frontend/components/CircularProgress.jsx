import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const CircularProgress = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      controls.start({
        strokeDashoffset: 440 - (440 * value) / 100,
        transition: { duration: 1.5, ease: "easeOut" }
      });
      
      // Animate the counter
      const duration = 1500; // ms
      const step = (value / duration) * 10;
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= value) {
          current = value;
          clearInterval(timer);
        }
        setAnimatedValue(Math.round(current));
      }, 10);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value, controls]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const initialOffset = circumference;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full " viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#2d3748"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />
          {/* Progress circle */}
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: initialOffset }}
            animate={controls}
            transform="rotate(-90 80 80)"
          />
          <defs>
           <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
  <stop offset="0%" stopColor="red" />
  <stop offset="100%" stopColor="purple" />
  
</linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#16a34a" floodOpacity="0.4" />
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#2563eb" floodOpacity="0.2" />
            </filter>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-lg font-bold bg-black bg-clip-text text-transparent drop-shadow"
            style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            {animatedValue}%
          </span>
        </div>
      </div>
      <p className="mt-1 text-xs text-center text-muted-foreground">{label}</p>
    </div>
  );
};

export { CircularProgress };