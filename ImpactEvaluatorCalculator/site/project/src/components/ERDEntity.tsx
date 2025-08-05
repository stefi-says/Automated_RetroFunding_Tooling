import React from 'react';

interface ERDEntityProps {
  id: string;
  name: string;
  position: { x: number; y: number };
  type?: 'entity' | 'dataclass';
  costIntensity?: number;
}

const ERDEntity: React.FC<ERDEntityProps> = ({ 
  id, 
  name, 
  position, 
  type = 'entity', 
  costIntensity = 0 
}) => {
  const getEntityColor = () => {
    if (costIntensity > 0.7) {
      return {
        fill: '#fef2f2',
        stroke: '#ef4444',
        text: '#991b1b'
      };
    } else if (costIntensity > 0.4) {
      return {
        fill: '#fffbeb',
        stroke: '#f59e0b',
        text: '#92400e'
      };
    } else if (costIntensity > 0.1) {
      return {
        fill: '#eff6ff',
        stroke: '#3b82f6',
        text: '#1e40af'
      };
    } else {
      return {
        fill: '#f8fafc',
        stroke: '#64748b',
        text: '#475569'
      };
    }
  };

  const colors = getEntityColor();
  const isDataClass = type === 'dataclass';
  const width = name.length * 8 + 20;
  const height = 32;

  return (
    <g>
      {/* Entity rectangle */}
      <rect
        x={position.x - width / 2}
        y={position.y - height / 2}
        width={width}
        height={height}
        fill={colors.fill}
        stroke={colors.stroke}
        strokeWidth={costIntensity > 0.4 ? "3" : "2"}
        rx={isDataClass ? "2" : "4"}
        className="transition-all duration-200"
        style={{
          filter: costIntensity > 0.7 ? 'drop-shadow(0 4px 6px rgba(239, 68, 68, 0.3))' : 
                  costIntensity > 0.4 ? 'drop-shadow(0 4px 6px rgba(245, 158, 11, 0.3))' : 
                  'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
        }}
      />
      
      {/* Entity type indicator for dataclass */}
      {isDataClass && (
        <circle
          cx={position.x - width / 2 + 8}
          cy={position.y - height / 2 + 8}
          r="4"
          fill="#8b5cf6"
        />
      )}
      
      {/* Entity type indicator for entity */}
      {!isDataClass && (
        <circle
          cx={position.x - width / 2 + 8}
          cy={position.y - height / 2 + 8}
          r="4"
          fill="#059669"
        />
      )}
      
      {/* Entity name */}
      <text
        x={position.x}
        y={position.y + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-xs font-medium"
        fill={colors.text}
      >
        {name}
      </text>
      
      {/* Cost intensity indicator */}
      {costIntensity > 0.1 && (
        <rect
          x={position.x + width / 2 - 12}
          y={position.y - height / 2 + 2}
          width="8"
          height="4"
          fill={costIntensity > 0.7 ? '#ef4444' : costIntensity > 0.4 ? '#f59e0b' : '#3b82f6'}
          rx="2"
        />
      )}
    </g>
  );
};

export default ERDEntity;