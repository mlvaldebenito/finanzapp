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

    // Get the container width
    const containerWidth = canvas.parentElement.clientWidth;
    // Calculate new dimensions maintaining aspect ratio
    const baseWidth = Math.min(500, containerWidth);
    const baseHeight = (baseWidth * 300) / 500;

    // Set actual size in memory (scaled to account for extra pixel density)
    const scale = window.devicePixelRatio;
    canvas.width = Math.floor(baseWidth * scale);
    canvas.height = Math.floor(baseHeight * scale);

    // Normalize coordinate system to use CSS pixels
    ctx.scale(scale, scale);

    // Scale all dimensions proportionally
    const scaleRatio = baseWidth / 500;
    const centerX = baseWidth / 2;
    const centerY = baseHeight * (250/300);
    const radius = 180 * scaleRatio;

    // Clear canvas
    ctx.clearRect(0, 0, baseWidth, baseHeight);

    // Draw outer arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI, false);
    ctx.lineWidth = 20 * scaleRatio;
    ctx.strokeStyle = '#1f2937';
    ctx.stroke();

    // Calculate progress
    const progress = value / maxValue;
    const startAngle = Math.PI;
    const endAngle = startAngle + (Math.PI * progress);

    // Draw progress arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
    ctx.lineWidth = 20 * scaleRatio;
    const gradient = ctx.createLinearGradient(0, 0, baseWidth, 0);
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
        
        ctx.font = `${14 * scaleRatio}px Inter, system-ui, sans-serif`;
        ctx.fillStyle = '#9ca3af';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${(maxValue * (i / 10)).toFixed(0)}`, labelX, labelY); // Set speedometer max value to 50
      }
    }

    // Draw animated needle
    const needleAngle = value > maxValue 
      ? 0 + needleOffset.current  // Add animation offset while pointing left
      : Math.PI + (Math.PI * progress) + needleOffset.current;
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
        width: '100%',
        maxWidth: '500px',
        height: 'auto',
        display: 'block',
        margin: '0 auto'
      }}
    />
  );
};

export default SpeedometerGauge;