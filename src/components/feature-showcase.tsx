'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Video, Wifi, Gauge } from 'lucide-react';
import React from 'react';

const features = [
  {
    icon: Lightbulb,
    label: 'Smart Lighting',
    color: 'text-blue-400',
    animation: 'animate-feature-icon-1',
  },
  {
    icon: Video,
    label: 'CCTV Monitoring',
    color: 'text-green-400',
    animation: 'animate-feature-icon-2',
  },
  {
    icon: Wifi,
    label: 'IoT Integration',
    color: 'text-purple-400',
    animation: 'animate-feature-icon-3',
  },
  {
    icon: Gauge,
    label: 'Real-time Analytics',
    color: 'text-yellow-400',
    animation: 'animate-feature-icon-4',
  },
];

export function FeatureShowcase() {
  return (
    <div className="w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-foreground">
          Unified Control. Unmatched Security.
        </h2>
        <p className="mt-2 text-muted-foreground">
          Seamlessly manage your smart devices from one powerful platform.
        </p>
      </motion.div>
      <div className="relative h-64 w-full">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`relative flex items-center justify-center ${feature.animation}`}>
              <div className="absolute h-24 w-24 rounded-full bg-primary/5 opacity-50 blur-xl" />
              <feature.icon className={`h-12 w-12 ${feature.color}`} />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 rounded-full border-2 border-dashed border-primary/20 animate-spin-slow" />
        </div>
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-48 w-48 rounded-full border-2 border-dashed border-primary/10 animate-spin-slow-reverse" />
        </div>
      </div>
    </div>
  );
}

// Add custom animations to tailwind.config.ts if they don't exist
// keyframes: {
//   'feature-icon': {
//     '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
//     '50%': { transform: 'translateY(-20px) scale(1.1)', opacity: '0.8' },
//   }
// },
// animation: {
//   'feature-icon-1': 'feature-icon 4s ease-in-out infinite',
//   'feature-icon-2': 'feature-icon 4s ease-in-out 1s infinite',
//   'feature-icon-3': 'feature-icon 4s ease-in-out 2s infinite',
//   'feature-icon-4': 'feature-icon 4s ease-in-out 3s infinite',
//   'spin-slow': 'spin 20s linear infinite',
//   'spin-slow-reverse': 'spin 20s linear infinite reverse',
// }
//
// And also in globals.css
// .animate-spin-slow {
//   animation: spin 20s linear infinite;
// }
// .animate-spin-slow-reverse {
//    animation: spin 20s linear infinite reverse;
// }
//
