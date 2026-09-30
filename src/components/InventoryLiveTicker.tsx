import React from 'react';
import { Activity, ArrowUpRight, ArrowDownRight, Boxes, Radio } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export const InventoryLiveTicker: React.FC = () => {
  const { recentLogs, isLiveSimulationActive, setIsAdminOpen } = useInventory();

  if (recentLogs.length === 0) return null;

  const latestLog = recentLogs[0];

  return (
    <div className="bg-neutral-900 border-b border-neutral-800 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex items-center gap-1.5 shrink-0 text-amber-400 font-mono text-[11px] font-bold">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>REAL-TIME DISPATCH FEED:</span>
          </div>

          <div className="flex items-center gap-2 truncate text-neutral-300">
            <span className="font-mono text-neutral-500 text-[11px]">[{latestLog.timestamp}]</span>
            <span className="font-semibold text-white truncate max-w-xs sm:max-w-md">
              {latestLog.partName}
            </span>
            <span className="font-mono text-[11px] text-neutral-400 shrink-0">
              ({latestLog.sku})
            </span>
            <span className={`inline-flex items-center gap-0.5 text-[11px] font-mono font-bold shrink-0 ${
              latestLog.change < 0 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {latestLog.change < 0 ? (
                <>
                  <ArrowDownRight className="w-3 h-3" />
                  <span>{latestLog.change} units</span>
                </>
              ) : (
                <>
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+{latestLog.change} units</span>
                </>
              )}
            </span>
            <span className="hidden md:inline text-neutral-500">·</span>
            <span className="hidden md:inline text-neutral-400 truncate text-[11px]">
              {latestLog.reason} ({latestLog.location})
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsAdminOpen(true)}
          className="text-[11px] text-neutral-400 hover:text-amber-400 font-mono flex items-center gap-1 underline transition-colors shrink-0 cursor-pointer"
        >
          <span>View Audit Log ({recentLogs.length})</span>
        </button>
      </div>
    </div>
  );
};
