import React from 'react';
import { DollarSign, TrendingUp, BarChart3, Clock } from 'lucide-react';

interface CostSummaryProps {
  calculatedCosts: {
    sections: any;
    totalSystem: number;
    totalHours: number;
  };
  visualizationMode: 'cost' | 'hours';
  onVisualizationModeChange: (mode: 'cost' | 'hours') => void;
}

const CostSummary: React.FC<CostSummaryProps> = ({ calculatedCosts, visualizationMode, onVisualizationModeChange }) => {
  const sectionEntries = Object.entries(calculatedCosts.sections || {}).map(([key, data]: [string, any]) => ({
    id: key,
    name: key.replace(/_/g, ' '),
    total: data.total || 0,
    totalHours: data.totalHours || 0,
    components: Object.keys(data.components || {}).length
  })).sort((a, b) => visualizationMode === 'cost' ? b.total - a.total : b.totalHours - a.totalHours);

  const highestSection = sectionEntries[0];
  const maxValue = visualizationMode === 'cost' 
    ? (highestSection?.total || 1)
    : (highestSection?.totalHours || 1);

  const formatSectionName = (name: string) => {
    return name.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200">
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-900">Cost Summary</h2>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onVisualizationModeChange('cost')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                visualizationMode === 'cost'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>By Cost</span>
            </button>
            <button
              onClick={() => onVisualizationModeChange('hours')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                visualizationMode === 'hours'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>By Hours</span>
            </button>
          </div>
        </div>
        <p className="text-slate-600">Section-wise breakdown by cost and hours</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Total System Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium text-blue-900">Total System Cost</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 truncate">
                ${calculatedCosts.totalSystem.toLocaleString()}
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-200">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm font-medium text-emerald-900">Total Hours</span>
              </div>
              <div className="text-2xl font-bold text-emerald-600 truncate">
                {calculatedCosts.totalHours.toLocaleString()}h
              </div>
            </div>
          </div>
        </div>

        {/* Section Breakdown */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Section Costs</span>
          </h3>
          
          {sectionEntries.length > 0 ? (
            <div className="space-y-2">
              {sectionEntries.map((section, index) => {
                const currentValue = visualizationMode === 'cost' ? section.total : section.totalHours;
                const percentage = maxValue > 0 ? (currentValue / maxValue) * 100 : 0;
                const isHighest = index === 0 && currentValue > 0;
                
                return (
                  <div
                    key={section.id}
                    className={`p-3 rounded-lg border ${
                      isHighest
                        ? 'bg-red-50 border-red-200'
                        : percentage > 50
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-slate-900">
                          {formatSectionName(section.name)}
                        </span>
                        {isHighest && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                            Highest
                          </span>
                        )}
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm font-semibold text-slate-900">
                          ${section.total.toLocaleString()}
                        </div>
                        <div className="text-xs text-emerald-600 font-medium">
                          {section.totalHours.toLocaleString()}h
                        </div>
                        <div className="text-xs text-slate-500">
                          {section.components} components
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          isHighest
                            ? 'bg-red-500'
                            : percentage > 50
                            ? 'bg-yellow-500'
                            : 'bg-blue-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No cost data available</p>
              <p className="text-xs">Use the calculator to input cost data</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {sectionEntries.length > 0 && (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
            <div className="text-center">
              <div className="text-lg font-bold text-slate-900">
                {sectionEntries.length}
              </div>
              <div className="text-xs text-slate-600">Active Sections</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-slate-900">
                ${Math.round(calculatedCosts.totalSystem / sectionEntries.length).toLocaleString()}
              </div>
              <div className="text-xs text-slate-600">Avg Cost/Section</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-slate-900">
                {Math.round(calculatedCosts.totalHours / sectionEntries.length)}h
              </div>
              <div className="text-xs text-slate-600">Avg Hours/Section</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CostSummary;