"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type GlobeVariant =
  | "interactive-dots"
  | "hologram-wireframe"
  | "digital-matrix"
  | "shield-energy"
  | "minimal-flat-3d"
  | "heat-map"
  | "cyber-hex"
  | "radar-sweep"
  | "galaxy-spiral";

export interface LocationMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  label?: string;
  value?: string;
  color?: string;
}

export interface FlightArc {
  from: { lat: number; lng: number; name: string };
  to: { lat: number; lng: number; name: string };
  color?: string;
}

export interface GlobeProps {
  variant?: GlobeVariant;
  size?: number;
  speed?: number;
  interactive?: boolean;
  glowColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  markers?: LocationMarker[];
  arcs?: FlightArc[];
  className?: string;
}

const DEFAULT_CITIES: LocationMarker[] = [
  { id: "nyc", name: "New York", lat: 40.7128, lng: -74.006, label: "NYC Hub" },
  { id: "lon", name: "London", lat: 51.5074, lng: -0.1278, label: "EMEA Node" },
  { id: "tok", name: "Tokyo", lat: 35.6762, lng: 139.6503, label: "Asia HQ" },
  { id: "syd", name: "Sydney", lat: -33.8688, lng: 151.2093, label: "APAC Gateway" },
  { id: "dxb", name: "Dubai", lat: 25.2048, lng: 55.2708, label: "MENA Relay" },
  { id: "sao", name: "São Paulo", lat: -23.5505, lng: -46.6333, label: "LATAM Node" },
];

const DEFAULT_ARCS: FlightArc[] = [
  { from: { lat: 40.7128, lng: -74.006, name: "NYC" }, to: { lat: 51.5074, lng: -0.1278, name: "LON" } },
  { from: { lat: 51.5074, lng: -0.1278, name: "LON" }, to: { lat: 25.2048, lng: 55.2708, name: "DXB" } },
  { from: { lat: 25.2048, lng: 55.2708, name: "DXB" }, to: { lat: 35.6762, lng: 139.6503, name: "TOK" } },
  { from: { lat: 35.6762, lng: 139.6503, name: "TOK" }, to: { lat: -33.8688, lng: 151.2093, name: "SYD" } },
  { from: { lat: 40.7128, lng: -74.006, name: "NYC" }, to: { lat: -23.5505, lng: -46.6333, name: "SAO" } },
];

function resolveCanvasColor(colorStr?: string, alpha: number = 1, element?: HTMLElement | null): string {
  const fallback = `rgba(99, 102, 241, ${alpha})`;
  if (!colorStr) return fallback;
  let raw = colorStr.trim();

  if (typeof window !== "undefined" && raw.includes("var(")) {
    const varName = raw.match(/var\(([^,\)]+)/)?.[1]?.trim();
    if (varName) {
      try {
        const targetEl = element || document.documentElement;
        const val = getComputedStyle(targetEl).getPropertyValue(varName).trim();
        if (val) raw = val;
      } catch {
        // fallback
      }
    }
  }

  if (raw.startsWith("oklch")) {
    const inner = raw.match(/oklch\(([^)]+)\)/)?.[1]?.trim();
    if (inner) {
      const cleanInner = inner.split("/")[0].trim();
      return `oklch(${cleanInner} / ${alpha})`;
    }
  }

  if (raw.startsWith("#")) {
    let hex = raw.substring(1);
    if (hex.length === 3) {
      hex = hex.split("").map((c) => c + c).join("");
    }
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
    }
  }

  if (raw.startsWith("hsl")) {
    const match = raw.match(/hsla?\(([\d.]+)[,\s]+([\d.]+)%?[,\s]+([\d.]+)%?/);
    if (match) {
      return `hsla(${match[1]}, ${match[2]}%, ${match[3]}%, ${alpha})`;
    }
  }

  if (raw.startsWith("rgb")) {
    const match = raw.match(/rgba?\(([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
    if (match) {
      return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${alpha})`;
    }
  }

  const parts = raw.split(/[\s,]+/);
  if (parts.length >= 3 && !isNaN(parseFloat(parts[0]))) {
    const h = parseFloat(parts[0]);
    const s = parts[1].includes("%") ? parts[1] : `${parts[1]}%`;
    const l = parts[2].includes("%") ? parts[2] : `${parts[2]}%`;
    return `hsla(${h}, ${s}, ${l}, ${alpha})`;
  }

  return fallback;
}

function generateSpherePoints(count: number = 850) {
  const points: { x: number; y: number; z: number; isLand: boolean; lat: number; lng: number }[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    const lat = (Math.asin(y) * 180) / Math.PI;
    const lng = (Math.atan2(z, x) * 180) / Math.PI;

    const isLand = isApproxLand(lat, lng);
    points.push({ x, y, z, isLand, lat, lng });
  }
  return points;
}

function isApproxLand(lat: number, lng: number): boolean {
  if (lat > 15 && lat < 70 && lng > -160 && lng < -50) return true;
  if (lat > -55 && lat < 12 && lng > -85 && lng < -35) return true;
  if (lat > 35 && lat < 70 && lng > -10 && lng < 40) return true;
  if (lat > -35 && lat < 35 && lng > -20 && lng < 50) return true;
  if (lat > 5 && lat < 70 && lng > 60 && lng < 150) return true;
  if (lat > -45 && lat < -10 && lng > 110 && lng < 155) return true;
  return false;
}

function latLngToVector3(lat: number, lng: number, radius: number = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return { x, y, z };
}

export function Globe({
  variant = "interactive-dots",
  size = 560,
  speed = 1,
  interactive = true,
  glowColor = "var(--primary)",
  primaryColor = "var(--primary)",
  secondaryColor = "var(--primary)",
  markers = DEFAULT_CITIES,
  arcs = DEFAULT_ARCS,
  className,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotation, setRotation] = useState({ x: 0.2, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !interactive) return;
    const deltaX = (e.clientX - dragStart.x) * 0.005;
    const deltaY = (e.clientY - dragStart.y) * 0.005;

    setRotation((prev) => ({
      x: Math.max(-Math.PI / 2, Math.min(Math.PI / 2, prev.x + deltaY)),
      y: prev.y + deltaX,
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let currentRotationY = rotation.y;
    let currentRotationX = rotation.x;
    const points = generateSpherePoints(variant === "galaxy-spiral" ? 1000 : 650);

    const radius = (size / 2) * 0.85;
    const centerX = size / 2;
    const centerY = size / 2;

    let time = 0;

    const render = () => {
      time += 0.02 * speed;
      ctx.clearRect(0, 0, size, size);

      if (!isDragging) {
        currentRotationY += 0.004 * speed;
      } else {
        currentRotationY = rotation.y;
        currentRotationX = rotation.x;
      }

      const cosX = Math.cos(currentRotationX);
      const sinX = Math.sin(currentRotationX);
      const cosY = Math.cos(currentRotationY);
      const sinY = Math.sin(currentRotationY);

      const project = (x: number, y: number, z: number) => {
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        return {
          px: centerX + x1 * radius,
          py: centerY - y2 * radius,
          scale: (z2 + 1) / 2,
          z: z2,
        };
      };

      // Background theme glow aura
      try {
        const glowGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.5, centerX, centerY, radius * 1.15);
        glowGradient.addColorStop(0, resolveCanvasColor(glowColor, 0.3, canvas));
        glowGradient.addColorStop(0.6, resolveCanvasColor(glowColor, 0.1, canvas));
        glowGradient.addColorStop(1, "transparent");
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 1.15, 0, Math.PI * 2);
        ctx.fill();
      } catch {
        // Fallback safely
      }

      // Variant Specific Surface & Decorative Elements
      if (variant === "hologram-wireframe") {
        ctx.strokeStyle = resolveCanvasColor(primaryColor, 0.3, canvas);
        ctx.lineWidth = 1.2;

        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 8 + currentRotationY;
          ctx.beginPath();
          ctx.ellipse(centerX, centerY, radius * Math.abs(Math.cos(angle)), radius, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        const scanY = centerY + Math.sin(time * 2) * radius * 0.8;
        ctx.strokeStyle = resolveCanvasColor(primaryColor, 0.85, canvas);
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(centerX - radius * 0.9, scanY);
        ctx.lineTo(centerX + radius * 0.9, scanY);
        ctx.stroke();
      } else if (variant === "shield-energy") {
        ctx.save();
        ctx.strokeStyle = resolveCanvasColor(primaryColor, 0.5, canvas);
        ctx.lineWidth = 2;
        const shieldPulse = radius + Math.sin(time * 4) * 6;
        ctx.beginPath();
        ctx.arc(centerX, centerY, shieldPulse, 0, Math.PI * 2);
        ctx.stroke();

        const rippleR = (time * 50) % (radius * 1.1);
        ctx.strokeStyle = resolveCanvasColor(secondaryColor, 0.6, canvas);
        ctx.beginPath();
        ctx.arc(centerX, centerY, rippleR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      } else if (variant === "heat-map") {
        for (let i = 0; i < 3; i++) {
          const hRadius = radius * (0.3 + ((time * 0.5 + i * 0.3) % 0.7));
          const opacity = Math.max(0, 1 - hRadius / radius);
          ctx.strokeStyle = resolveCanvasColor(primaryColor, opacity * 0.8, canvas);
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.arc(centerX, centerY, hRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else if (variant === "radar-sweep") {
        ctx.strokeStyle = resolveCanvasColor(primaryColor, 0.25, canvas);
        ctx.lineWidth = 1.2;
        [0.3, 0.65, 0.95].forEach((rFactor) => {
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius * rFactor, 0, Math.PI * 2);
          ctx.stroke();
        });

        const sweepAngle = time * 2;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(sweepAngle);

        const beamGrad = ctx.createConicGradient(0, 0, 0);
        beamGrad.addColorStop(0, resolveCanvasColor(primaryColor, 0.35, canvas));
        beamGrad.addColorStop(0.15, "transparent");
        beamGrad.addColorStop(1, "transparent");

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.05, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw Sphere Points matching website theme
      points.forEach((pt) => {
        const proj = project(pt.x, pt.y, pt.z);
        if (proj.z <= -0.1) return;

        const depthAlpha = Math.pow(proj.scale, 1.4);
        const ptRadius = (pt.isLand ? 2.6 : 1.4) * proj.scale;

        ctx.beginPath();

        if (variant === "digital-matrix") {
          ctx.fillStyle = pt.isLand
            ? resolveCanvasColor(primaryColor, depthAlpha, canvas)
            : resolveCanvasColor(primaryColor, depthAlpha * 0.35, canvas);
          ctx.font = `${Math.floor(9 * proj.scale)}px monospace`;
          const char = (Math.floor(pt.lat + pt.lng + time * 10) % 2).toString();
          ctx.fillText(char, proj.px, proj.py);
        } else if (variant === "galaxy-spiral") {
          const spiralOffset = Math.sin(time * 2 + pt.lat * 0.1) * 6;
          ctx.fillStyle = pt.isLand
            ? resolveCanvasColor(primaryColor, depthAlpha * 0.9, canvas)
            : resolveCanvasColor(primaryColor, depthAlpha * 0.4, canvas);
          ctx.arc(proj.px + spiralOffset, proj.py, Math.max(0.6, ptRadius * 1.2), 0, Math.PI * 2);
          ctx.fill();
        } else if (variant === "cyber-hex") {
          ctx.fillStyle = pt.isLand
            ? resolveCanvasColor(primaryColor, depthAlpha * 0.95, canvas)
            : resolveCanvasColor(secondaryColor, depthAlpha * 0.25, canvas);
          ctx.rect(proj.px - ptRadius, proj.py - ptRadius, ptRadius * 2, ptRadius * 2);
          ctx.fill();
        } else {
          ctx.arc(proj.px, proj.py, Math.max(0.6, ptRadius), 0, Math.PI * 2);
          if (pt.isLand) {
            ctx.fillStyle = resolveCanvasColor(primaryColor, depthAlpha * 0.95, canvas);
          } else {
            ctx.fillStyle = resolveCanvasColor(secondaryColor, depthAlpha * 0.35, canvas);
          }
          ctx.fill();
        }
      });

      // Render Arcs (Interactive Dots connection arcs)
      if (variant === "interactive-dots") {
        arcs.forEach((arc) => {
          const fromVec = latLngToVector3(arc.from.lat, arc.from.lng);
          const toVec = latLngToVector3(arc.to.lat, arc.to.lng);

          const p1 = project(fromVec.x, fromVec.y, fromVec.z);
          const p2 = project(toVec.x, toVec.y, toVec.z);

          if (p1.z > 0 || p2.z > 0) {
            const midX = (p1.px + p2.px) / 2;
            const midY = (p1.py + p2.py) / 2 - radius * 0.38;

            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.quadraticCurveTo(midX, midY, p2.px, p2.py);
            ctx.strokeStyle = resolveCanvasColor(arc.color || primaryColor, 0.8, canvas);
            ctx.lineWidth = 2.2;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);

            const progress = (time * 0.8) % 1;
            const travelX = (1 - progress) * (1 - progress) * p1.px + 2 * (1 - progress) * progress * midX + progress * progress * p2.px;
            const travelY = (1 - progress) * (1 - progress) * p1.py + 2 * (1 - progress) * progress * midY + progress * progress * p2.py;

            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(travelX, travelY, 3.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = resolveCanvasColor(arc.color || primaryColor, 0.6, canvas);
            ctx.beginPath();
            ctx.arc(travelX, travelY, 7, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // Render Hotspot Markers using theme color
      markers.forEach((marker) => {
        const vec = latLngToVector3(marker.lat, marker.lng);
        const proj = project(vec.x, vec.y, vec.z);

        if (proj.z > 0.05) {
          const markerColor = resolveCanvasColor(marker.color || primaryColor, 1, canvas);
          const pulse = (time * 3) % 1;

          ctx.strokeStyle = resolveCanvasColor(marker.color || primaryColor, (1 - pulse) * proj.scale, canvas);
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 5 + pulse * 16, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = markerColor;
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 5 * proj.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant, size, speed, rotation, isDragging, primaryColor, secondaryColor, glowColor, markers, arcs]);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center select-none overflow-hidden rounded-3xl p-2",
        className
      )}
      style={{ width: size, height: size }}
    >
      <div
        className="relative cursor-grab active:cursor-grabbing flex items-center justify-center m-auto"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas ref={canvasRef} width={size} height={size} className="touch-none" />
      </div>
    </div>
  );
}
