import React, { useEffect, useRef } from 'react';
import useAnimationFrame from '../hooks/useAnimationFrame';

const SpeedometerGauge = ({ value, maxValue }) => {
  const canvasRef = useRef(null);
  const needleOffset = useRef(0);

  const needleSpeed = 100;
  useAnimationFrame((deltaTime) => {
    needleOffset.current = Math.sin(deltaTime / needleSpeed) * 0.02;
    drawGauge();
  });

  const drawGauge = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set actual size in memory (scaled to account for extra pixel density)
    const scale = window.devicePixelRatio;
    canvas.width = Math.floor(500 * scale);
    canvas.height = Math.floor(300 * scale);

    // Normalize coordinate system to use CSS pixels
    ctx.scale(scale, scale);

    const centerX = 250;
    const centerY = 250;
    const radius = 180;

    // Clear canvas
    ctx.clearRect(0, 0, 500, 300);

    // Draw outer arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI, false);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#1f2937';
    ctx.stroke();

    // Calculate progress
    const progress = value / maxValue;
    const startAngle = Math.PI;
    const endAngle = startAngle + (Math.PI * progress);

    // Draw progress arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
    ctx.lineWidth = 20;
    const gradient = ctx.createLinearGradient(0, 0, 500, 0);
    gradient.addColorStop(0, '#10b981');
    gradient.addColorStop(1, '#3b82f6');
    ctx.strokeStyle = gradient;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Draw ticks with animation
    for (let i = 0; i <= 10; i++) {
      const angle = Math.PI + (Math.PI * (i / 10));
      const tickLength = i % 2 === 0 ? 20 : 10;
      const tickOffset = Math.sin(Date.now() / 1000 + i) * 2; // Animated offset
      
      const startX = centerX + (radius - 30 + tickOffset) * Math.cos(angle);
      const startY = centerY + (radius - 30 + tickOffset) * Math.sin(angle);
      const endX = centerX + (radius - 30 - tickLength + tickOffset) * Math.cos(angle);
      const endY = centerY + (radius - 30 - tickLength + tickOffset) * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.lineWidth = i % 2 === 0 ? 3 : 2;
      ctx.strokeStyle = '#9ca3af';
      ctx.stroke();

      // Add labels for major ticks
      if (i % 2 === 0) {
        const labelX = centerX + (radius - 60) * Math.cos(angle);
        const labelY = centerY + (radius - 60) * Math.sin(angle);
        
        ctx.font = '14px Inter, system-ui, sans-serif';
        ctx.fillStyle = '#9ca3af';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${(maxValue * (i / 10)).toFixed(0)}`, labelX, labelY); // Set speedometer max value to 50
      }
    }

    // Draw animated needle
    const needleAngle = Math.PI + (Math.PI * progress) + needleOffset.current;
    const needleLength = radius - 60;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + needleLength * Math.cos(needleAngle),
      centerY + needleLength * Math.sin(needleAngle)
    );
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#f43f5e';
    ctx.stroke();

    // Draw center circle with glow
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#f43f5e';
    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '500px',
        height: '300px',
        display: 'block',
        margin: '0 auto'
      }}
    />
  );
};

export default SpeedometerGauge;