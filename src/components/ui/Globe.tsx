"use client";

import { useEffect, useRef } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { cn } from "@/lib/utils";

const STATIC_GLOBE_CONFIG: COBEOptions = {
  width: 600,
  height: 600,
  devicePixelRatio: 1,
  phi: 3.1, // Fixed position
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 5000, // Significantly reduced for better performance
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    // Reduced markers for better performance
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [40.7128, -74.006], size: 0.1 },
  ],
  onRender: function (state: Record<string, any>): void {
    throw new Error("Function not implemented.");
  }
};

export default function StaticGlobe({
  className,
  config = STATIC_GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const width = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Set initial width
    width.current = Math.min(canvasRef.current.offsetWidth, 600);
    
    // Create static globe
    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width.current * 2,
      height: width.current * 2,
      onRender: () => {} // Empty render function - no animations
    });

    // Fade in
    requestAnimationFrame(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    });

    return () => globe.destroy();
  }, [config]);

  return (
    <div className={cn(
      "relative mx-auto aspect-[1/1] w-full max-w-[600px]",
      className
    )}>
      <canvas
        className="h-full w-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        ref={canvasRef}
      />
    </div>
  );
}