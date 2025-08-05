import React, { useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  Node,
  Edge,
  Position,
  Handle
} from 'reactflow';

const getEntityColor = (intensity: number) => {
  if (intensity > 0.7) {
    return {
      fill: '#fef2f2',
      stroke: '#ef4444',
      text: '#991b1b'
    };
  } else if (intensity > 0.4) {
    return {
      fill: '#fffbeb',
      stroke: '#f59e0b',
      text: '#92400e'
    };
  } else if (intensity > 0.1) {
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

interface ErdNodeData {
  label: string;
  intensity: number;
  type?: 'entity' | 'dataclass';
}

interface Section {
  id: string;
  title: string;
  position: { x: number; y: number };
  width: number;
  height: number;
  entities: Array<{
    id: string;
    name: string;
    position: { x: number; y: number };
    type?: 'entity' | 'dataclass';
  }>;
}

const ErdNode = ({ data }: { data: ErdNodeData }) => {
  const colors = getEntityColor(data.intensity);
  const isDataClass = data.type === 'dataclass';

  return (
    <div
      className="px-3 py-2 rounded shadow-sm"
      style={{
        border: `2px solid ${colors.stroke}`,
        background: colors.fill,
        borderRadius: isDataClass ? '2px' : '4px',
        color: colors.text,
        fontSize: '12px',
        position: 'relative'
      }}
    >
      {isDataClass && (
        <div
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: '#8b5cf6',
            top: '4px',
            left: '4px'
          }}
        />
      )}
      {!isDataClass && (
        <div
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: '#059669',
            top: '4px',
            left: '4px'
          }}
        />
      )}
      {data.label}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

interface SectionNodeData {
  section: Section;
  intensity: number;
}

// Background node for sections
const SectionNode = ({ data }: { data: SectionNodeData }) => {
  const { section, intensity } = data;
  
  // Get colors based on cost intensity
  const getColors = (intensity: number) => {
    if (intensity > 0.7) {
      return {
        background: '#fecaca',
        border: '#ef4444'
      };
    } else if (intensity > 0.4) {
      return {
        background: '#fef3c7',
        border: '#f59e0b'
      };
    } else {
      return {
        background: '#dbeafe',
        border: '#3b82f6'
      };
    }
  };

  const colors = getColors(intensity);
  const opacity = 0.1 + (intensity * 0.3);
  
  return (
    <div 
      className="section-node" 
      style={{ 
        width: section.width,
        height: section.height,
        position: 'relative',
        backgroundColor: colors.background,
        opacity,
        borderRadius: '8px',
        border: `2px dashed ${colors.border}`,
        pointerEvents: 'none'
      }}
    >
      <div 
        className="absolute -top-6 left-2 text-sm font-semibold text-slate-700 whitespace-nowrap bg-white px-2"
      >
        {section.title}
      </div>
    </div>
  );
};

const nodeTypes = {
  erdNode: ErdNode,
  sectionNode: SectionNode
};

interface ERDDiagramProps {
  calculatedCosts: {
    sections: any;
    totalSystem: number;
  };
}

const ERDDiagram: React.FC<ERDDiagramProps> = ({ calculatedCosts }) => {
  // Get cost intensity for color coding
  const getCostIntensity = (sectionKey: string, componentKey?: string) => {
    const sectionData = calculatedCosts.sections[sectionKey];
    if (!sectionData) return 0;

    if (componentKey) {
      const componentCost = sectionData.components[componentKey] || 0;
      const maxCost = Math.max(...Object.values(calculatedCosts.sections).map((s: any) => 
        Math.max(...Object.values(s.components).map(Number))
      ));
      return maxCost > 0 ? componentCost / maxCost : 0;
    } else {
      const sectionTotal = sectionData.total || 0;
      const maxSectionCost = Math.max(...Object.values(calculatedCosts.sections).map((s: any) => s.total));
      return maxSectionCost > 0 ? sectionTotal / maxSectionCost : 0;
    }
  };

  const sections = [
    {
      id: 'IE_Governance',
      title: 'IE Governance (meta)',
      position: { x: 400, y: 50 },
      width: 900,
      height: 200,  // Increased height for two rows
      entities: [
        // ObjectivesDesigner centered at top
        { id: 'ObjectivesDesigner', name: 'ObjectivesDesigner', position: { x: 800, y: 80 } },
        // Other components in a row below
        { id: 'ScopesDesigner', name: 'ScopesDesigner', position: { x: 580, y: 160 } },
        { id: 'MeasurementDesigner', name: 'MeasurementDesigner', position: { x: 740, y: 160 } },
        { id: 'EvaluationDesigner', name: 'EvaluationDesigner', position: { x: 900, y: 160 } },
        { id: 'RewardDesigner', name: 'RewardDesigner', position: { x: 1060, y: 160 } },
        { id: 'Treasury', name: 'Treasury', position: { x: 1200, y: 160 } }
      ]
    },
    {
      id: 'Impact',
      title: 'Impact',
      position: { x: 50, y: 250 },
      width: 380,
      height: 520,  // Increased height further
      entities: [
        { id: 'ImpactOrganization', name: 'ImpactOrganization', position: { x: 170, y: 280 } },
        { id: 'ImpactProject', name: 'ImpactProject', position: { x: 170, y: 360 } },
        { id: 'ImpactScope', name: 'ImpactScope', position: { x: 300, y: 440 }, type: 'dataclass' },
        { id: 'ImpactClaim', name: 'ImpactClaim', position: { x: 300, y: 520 }, type: 'dataclass' },
        { id: 'ImpactContributor', name: 'ImpactContributor', position: { x: 70, y: 580 } },
        { id: 'ImpactWork', name: 'ImpactWork', position: { x: 70, y: 700 } }  // Moved much further down
      ]
    },
    {
      id: 'Measure',
      title: 'Measure',
      position: { x: 480, y: 350 },
      width: 200,
      height: 200,
      entities: [
        { id: 'Measurer', name: 'Measurer', position: { x: 540, y: 400 } },
        { id: 'Measurement', name: 'Measurement', position: { x: 540, y: 480 }, type: 'dataclass' }
      ]
    },
    {
      id: 'Evaluate',
      title: 'Evaluate',
      position: { x: 730, y: 350 },
      width: 200,
      height: 200,
      entities: [
        { id: 'Evaluator', name: 'Evaluator', position: { x: 790, y: 400 } },
        { id: 'EvaluationResult', name: 'EvaluationResult', position: { x: 790, y: 480 }, type: 'dataclass' }
      ]
    },
    {
      id: 'Reward',
      title: 'Reward',
      position: { x: 980, y: 350 },
      width: 300,
      height: 200,
      entities: [
        { id: 'RewardCalculator', name: 'RewardCalculator', position: { x: 1040, y: 400 } },
        { id: 'RewardAllocation', name: 'RewardAllocation', position: { x: 1180, y: 480 }, type: 'dataclass' },
        { id: 'RewardDistributor', name: 'RewardDistributor', position: { x: 1040, y: 520 } }
      ]
    }
  ];

  const standaloneEntities = [
    { id: 'FundingSource', name: 'FundingSource', position: { x: 1320, y: 80 } },
    { id: 'ExternalWorld', name: 'ExternalWorld', position: { x: 1320, y: 580 } }
  ];

  // Interaction handlers
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    console.log('Clicked node:', node);
  };

  const onEdgeClick = (_: React.MouseEvent, edge: Edge) => {
    console.log('Clicked edge:', edge);
  };

  // Node dragging handlers
  const onNodeDragStart = (_: React.MouseEvent, node: Node) => {
    console.log('Started dragging node:', node);
  };

  const onNodeDragStop = (_: React.MouseEvent, node: Node) => {
    console.log('Stopped dragging node:', node);
  };

  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    
    // Add section background nodes first
    sections.forEach((section) => {
      // Add padding to section dimensions
      const paddedSection = {
        ...section,
        width: section.width + 40,    // 20px padding on each side
        height: section.height + 40    // 20px padding on each side
      };
      
      nodes.push({
        id: `section-${section.id}`,
        type: 'sectionNode',
        position: {
          x: section.position.x - 20,  // Offset for padding
          y: section.position.y - 20   // Offset for padding
        },
        data: {
          section: paddedSection,
          intensity: getCostIntensity(section.id)
        },
        draggable: false,
        selectable: false,
        style: { zIndex: -1 }
      });
    });

    // Convert sections and entities to nodes
    sections.forEach((section) => {
      section.entities.forEach((entity) => {
        nodes.push({
          id: entity.id,
          type: 'erdNode',
          position: entity.position,
          data: {
            label: entity.name,
            type: entity.type,
            intensity: getCostIntensity(section.id, entity.id)
          }
        });
      });
    });

    // Add standalone entities
    standaloneEntities.forEach((entity) => {
      nodes.push({
        id: entity.id,
        type: 'erdNode',
        position: entity.position,
        data: {
          label: entity.name,
          intensity: 0
        }
      });
    });

    // Convert all ERDConnections to edges
    const connections = [
      { from: 'ObjectivesDesigner', to: 'ScopesDesigner', label: 'orients' },
      { from: 'ObjectivesDesigner', to: 'MeasurementDesigner', label: 'orients' },
      { from: 'ObjectivesDesigner', to: 'EvaluationDesigner', label: 'orients' },
      { from: 'ObjectivesDesigner', to: 'RewardDesigner', label: 'orients' },
      { from: 'ScopesDesigner', to: 'ImpactScope', label: 'designs' },
      { from: 'MeasurementDesigner', to: 'Measurer', label: 'designs' },
      { from: 'EvaluationDesigner', to: 'Evaluator', label: 'designs' },
      { from: 'RewardDesigner', to: 'RewardCalculator', label: 'designs' },
      { from: 'ImpactOrganization', to: 'ImpactProject', label: 'facilitates' },
      { from: 'ImpactProject', to: 'ImpactScope', label: 'divides into' },
      { from: 'ImpactScope', to: 'ImpactClaim', label: 'contains' },
      { from: 'ImpactClaim', to: 'Measurer', label: 'submitted to' },
      { from: 'Measurer', to: 'Measurement', label: 'takes' },
      { from: 'Measurement', to: 'Evaluator', label: 'ingested by' },
      { from: 'Evaluator', to: 'EvaluationResult', label: 'calculates' },
      { from: 'EvaluationResult', to: 'RewardCalculator', label: 'steers' },
      { from: 'Treasury', to: 'RewardDistributor', label: 'funds' },
      { from: 'FundingSource', to: 'Treasury', label: 'funds' },
      // Additional connections
      { from: 'ImpactContributor', to: 'ImpactClaim', label: 'claims' },
      { from: 'ImpactContributor', to: 'ImpactWork', label: 'contributes' },
      { from: 'ImpactContributor', to: 'ImpactOrganization', label: 'belongs to' },
      { from: 'ImpactClaim', to: 'ImpactWork', label: 'represents' },
      { from: 'Measurement', to: 'ImpactClaim', label: 'measures' },
      { from: 'Measurement', to: 'ImpactContributor', label: 'credits' },
      { from: 'EvaluationResult', to: 'Measurement', label: 'evaluates' },
      { from: 'EvaluationResult', to: 'Evaluator', label: 'cascaded to' },
      { from: 'RewardCalculator', to: 'RewardAllocation', label: 'calculates' },
      { from: 'RewardAllocation', to: 'RewardDistributor', label: 'authorizes' },
      { from: 'RewardDistributor', to: 'ImpactContributor', label: 'rewards' },
      { from: 'ExternalWorld', to: 'RewardAllocation', label: 'values' }
    ];

    connections.forEach((conn, idx) => {
      edges.push({
        id: `e${idx}`,
        source: conn.from,
        target: conn.to,
        label: conn.label,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#64748b', strokeWidth: 1.5 },
        labelStyle: { fill: '#475569', fontSize: 12 }
      });
    });

    return { nodes, edges };
  }, [calculatedCosts]);

  // Default edge style
  const defaultEdgeOptions = {
    type: 'smoothstep',
    animated: false,
    style: { stroke: '#64748b', strokeWidth: 1.5 },
    labelStyle: { fill: '#475569', fontSize: 12 },
    markerEnd: {
      type: 'arrowclosed',
      color: '#64748b',
    },
  };

  return (
        <div className="relative w-full overflow-hidden" style={{ height: 700, border: '1px solid #e2e8f0' }}>
      <ReactFlow
        className="bg-slate-50"
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionMode="loose"
        snapToGrid={true}
        snapGrid={[10, 10]}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onNodeDragStart={onNodeDragStart}
        onNodeDragStop={onNodeDragStop}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
        panOnDrag={true}
        zoomOnScroll={true}
        zoomOnPinch={true}
        preventScrolling={true}
      >
        <Background />
        <Controls />
        <MiniMap 
          nodeColor={(n: Node) => {
            const intensity = (n.data as ErdNodeData).intensity || 0;
            return intensity > 0.7 ? '#ef4444' : 
                   intensity > 0.4 ? '#f59e0b' : 
                   '#3b82f6';
          }}
        />
      </ReactFlow>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-900 mb-2">Cost Intensity</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-blue-200 border border-blue-300"></div>
            <span className="text-xs text-slate-600">Low Cost</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-yellow-200 border border-yellow-400"></div>
            <span className="text-xs text-slate-600">Medium Cost</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-red-200 border border-red-400"></div>
            <span className="text-xs text-slate-600">High Cost</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ERDDiagram;