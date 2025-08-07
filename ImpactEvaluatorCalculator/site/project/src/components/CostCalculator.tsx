import React, { useState } from 'react';
import { Upload, Download, RefreshCw } from 'lucide-react';

interface CostCalculatorProps {
  costData: any;
  onCostDataChange: (data: any) => void;
}

const CostCalculator: React.FC<CostCalculatorProps> = ({ costData, onCostDataChange }) => {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(costData, null, 2));
  const [isValidJson, setIsValidJson] = useState(true);

  const sampleData = {
    "IE_Governance": {
      "ObjectivesDesigner": { "total_cost": 1000, "total_hours": 12 },
      "ScopesDesigner": { "total_hours": 12, "hourly_rate": 80 },
      "MeasurementDesigner": { "total_hours": 15, "hourly_rate": 90 },
      "EvaluationDesigner": { "total_cost": 2000, "total_hours": 25 },
      "RewardDesigner": { "total_hours": 8, "hourly_rate": 100 },
      "Treasury": { "total_cost": 500, "total_hours": 6 }
    },
    "Impact": {
      "ImpactProject": { "total_hours": 5, "hourly_rate": 60 },
      "ImpactScope": { "total_cost": 300, "total_hours": 4 },
      "ImpactClaim": { "total_hours": 10, "hourly_rate": 50 },
      "ImpactContributor": { "total_cost": 800, "total_hours": 10 },
      "ImpactWork": { "total_hours": 20, "hourly_rate": 45 }
    },
    "Measure": {
      "Measurer": { "total_hours": 6, "hourly_rate": 75 },
      "Measurement": { "total_cost": 400, "total_hours": 5 }
    },
    "Evaluate": {
      "Evaluator": { "total_hours": 8, "hourly_rate": 85 },
      "EvaluationResult": { "total_cost": 600, "total_hours": 8 }
    },
    "Reward": {
      "RewardCalculator": { "total_hours": 12, "hourly_rate": 95 },
      "RewardAllocation": { "total_cost": 1500, "total_hours": 18 },
      "RewardDistributor": { "total_hours": 4, "hourly_rate": 70 }
    }
  };

  const handleJsonChange = (value: string) => {
    setJsonInput(value);
    try {
      const parsedData = JSON.parse(value);
      setIsValidJson(true);
      onCostDataChange(parsedData);
    } catch (error) {
      setIsValidJson(false);
    }
  };

  const loadSampleData = () => {
    const sampleJson = JSON.stringify(sampleData, null, 2);
    setJsonInput(sampleJson);
    handleJsonChange(sampleJson);
  };

  const clearData = () => {
    setJsonInput('{}');
    handleJsonChange('{}');
  };

  const downloadJson = () => {
    const blob = new Blob([jsonInput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meriter-costs.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={loadSampleData}
          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium"
        >
          <Upload className="w-4 h-4" />
          <span>Load Sample</span>
        </button>
        <button
          onClick={downloadJson}
          className="flex items-center space-x-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors text-sm font-medium"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
        <button
          onClick={clearData}
          className="flex items-center space-x-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Clear</span>
        </button>
      </div>

      {/* JSON Input */}
      <div className="relative">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Cost Data (JSON Format)
        </label>
        <textarea
          value={jsonInput}
          onChange={(e) => handleJsonChange(e.target.value)}
          className={`w-full h-64 p-3 font-mono text-sm border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            isValidJson ? 'border-slate-300' : 'border-red-300 bg-red-50'
          }`}
          placeholder="Enter JSON cost data..."
          spellCheck={false}
        />
        {!isValidJson && (
          <div className="absolute top-8 right-2 bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
            Invalid JSON
          </div>
        )}
      </div>

      {/* Format Instructions */}
      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-slate-900 mb-2">JSON Format</h4>
        <div className="text-xs text-slate-600 space-y-1">
          <p>Each section contains components with either:</p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li><code className="bg-white px-1 rounded">"total_cost": number</code> - Direct cost</li>
            <li><code className="bg-white px-1 rounded">"total_hours": number, "hourly_rate": number</code> - Calculated cost</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;