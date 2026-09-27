import React from 'react';

interface ProvenanceBadgeProps {
  source: string;
  type?: 'satellite' | 'meteorology' | 'ai' | 'model';
}

export default function ProvenanceBadge({ source, type = 'model' }: ProvenanceBadgeProps) {
  const colorMap = {
    satellite: 'bg-emerald-50/90 text-[#4B8359] border-emerald-200/80',
    meteorology: 'bg-sky-50/90 text-[#0284C7] border-sky-200/80',
    ai: 'bg-blue-50/90 text-[#2563EB] border-blue-200/80',
    model: 'bg-amber-50/90 text-[#D99B26] border-amber-200/80'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium border shadow-xs ${colorMap[type] || colorMap.model}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {source}
    </span>
  );
}