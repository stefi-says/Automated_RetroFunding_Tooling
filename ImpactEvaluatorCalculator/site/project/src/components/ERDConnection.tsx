import React from 'react';

interface ERDConnectionProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  label?: string;
}

const ERDConnection: React.FC<ERDConnectionProps> = ({ from, to, label }) => {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  return (
    <g>
      {/* Connection line */}
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="#64748b"
        strokeWidth="1.5"
        markerEnd="url(#arrowhead)"
        className="opacity-60"
      />
      
      {/* Arrowhead marker */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="#64748b"
            className="opacity-60"
          />
        </marker>
      </defs>
      
      {/* Label */}
      {label && (
        <>
          <rect
            x={midX - (label.length * 3)}
            y={midY - 8}
            width={label.length * 6}
            height="16"
            fill="white"
            stroke="#e2e8f0"
            strokeWidth="1"
            rx="2"
            className="opacity-90"
          />
          <text
            x={midX}
            y={midY + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs fill-slate-600"
          >
            {label}
          </text>
        </>
      )}
    </g>
  );
};

export default ERDConnection;