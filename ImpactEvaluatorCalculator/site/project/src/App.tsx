import { useState, useMemo } from 'react';
import { Calculator, TrendingUp, Eye } from 'lucide-react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import ERDDiagram from './components/ERDDiagram';
import CostCalculator from './components/CostCalculator';
import CostSummary from './components/CostSummary';

function App() {
  const [costData, setCostData] = useState<any>({});
  const [visualizationMode, setVisualizationMode] = useState<'cost' | 'hours'>('cost');

  const calculatedCosts = useMemo(() => {
    const calculations: any = {};
    let totalSystemCost = 0;
    let totalSystemHours = 0;

    // Calculate costs for each section
    Object.entries(costData).forEach(([sectionKey, sectionData]: [string, any]) => {
      let sectionTotal = 0;
      let sectionHours = 0;
      const componentCosts: any = {};
      const componentHours: any = {};

      Object.entries(sectionData).forEach(([componentKey, componentData]: [string, any]) => {
        let componentCost = 0;
        let componentHoursValue = 0;
        
        if (componentData.total_cost) {
          componentCost = componentData.total_cost;
        } else if (componentData.total_hours && componentData.hourly_rate) {
          componentHoursValue = componentData.total_hours;
          componentCost = componentHoursValue * componentData.hourly_rate;
        }
        
        // Always track hours if available
        if (componentData.total_hours) {
          componentHoursValue = componentData.total_hours;
        }
        
        componentCosts[componentKey] = componentCost;
        componentHours[componentKey] = componentHoursValue;
        sectionTotal += componentCost;
        sectionHours += componentHoursValue;
      });

      calculations[sectionKey] = {
        components: componentCosts,
        componentHours: componentHours,
        total: sectionTotal,
        totalHours: sectionHours
      };
      totalSystemCost += sectionTotal;
      totalSystemHours += sectionHours;
    });

    return {
      sections: calculations,
      totalSystem: totalSystemCost,
      totalHours: totalSystemHours
    };
  }, [costData]);

  const handleCostDataChange = (newCostData: any) => {
    setCostData(newCostData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">MERIter ERD Calculator</h1>
                <p className="text-slate-600">Entity Relationship Diagram Cost Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-slate-600">Total System Cost</div>
                <div className="text-2xl font-bold text-blue-600">
                  ${calculatedCosts.totalSystem.toLocaleString()}
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ERD Diagram */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-slate-900">
                    Entity Relationship Diagram
                  </h2>
                </div>
                <p className="text-slate-600 mt-1">
                  Interactive visualization with cost highlighting
                </p>
              </div>
              <div className="p-6">
                <ReactFlowProvider>
                  <ERDDiagram calculatedCosts={calculatedCosts} visualizationMode={visualizationMode} />
                </ReactFlowProvider>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cost Summary */}
            <CostSummary 
              calculatedCosts={calculatedCosts} 
              visualizationMode={visualizationMode}
              onVisualizationModeChange={setVisualizationMode}
            />

            {/* Calculator Panel */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-slate-900">
                    Cost Calculator
                  </h2>
                </div>
                <p className="text-slate-600 mt-1">
                  Input JSON cost data for components
                </p>
              </div>
              <div className="p-6">
                <CostCalculator
                  costData={costData}
                  onCostDataChange={handleCostDataChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;