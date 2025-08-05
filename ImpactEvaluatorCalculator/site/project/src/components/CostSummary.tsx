import React from 'react';
import { DollarSign, TrendingUp, BarChart3 } from 'lucide-react';

interface CostSummaryProps {
  calculatedCosts: {
    sections: any;
    totalSystem: number;
  };
}

const CostSummary: React.FC<CostSummaryProps> = ({ calculatedCosts }) => {
  const sectionEntries = Object.entries(calculatedCosts.sections || {}).map(([key, data]: [string, any]) => ({
    id: key,
    name: key.replace(/_/g, ' '),
    total: data.total || 0,
    components: Object.keys(data.components || {}).length
  })).sort((a, b) => b.total - a.total);

  const highestCostSection = sectionEntries[0];
  const maxCost = highestCostSection?.total || 1;

  const formatSectionName = (name: string) => {
    return name.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-slate-900">Cost Summary</h2>
        </div>
        <p className="text-slate-600 mt-1">Section-wise cost breakdown</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Total System Cost */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Total System Cost</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              ${calculatedCosts.totalSystem.toLocaleString()}
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
                const percentage = maxCost > 0 ? (section.total / maxCost) * 100 : 0;
                const isHighest = index === 0 && section.total > 0;
                
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
                      <div className="text-right">
                        <div className="text-sm font-semibold text-slate-900">
                          ${section.total.toLocaleString()}
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
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
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
              <div className="text-xs text-slate-600">Avg per Section</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CostSummary;