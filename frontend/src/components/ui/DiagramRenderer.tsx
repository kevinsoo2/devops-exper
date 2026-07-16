'use client';

import { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Info } from 'lucide-react';

// Interactive Architecture Diagram Component
export function ArchitectureDiagram({ nodes, connections, title }: {
  nodes: { id: string; label: string; x: number; y: number; type: string; color?: string }[];
  connections: { from: string; to: string; label?: string }[];
  title?: string;
}) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'client': return { bg: '#3b82f6', border: '#60a5fa' };
      case 'server': return { bg: '#8b5cf6', border: '#a78bfa' };
      case 'database': return { bg: '#10b981', border: '#34d399' };
      case 'cache': return { bg: '#f59e0b', border: '#fbbf24' };
      case 'queue': return { bg: '#ef4444', border: '#f87171' };
      case 'loadbalancer': return { bg: '#06b6d4', border: '#22d3ee' };
      default: return { bg: '#6b7280', border: '#9ca3af' };
    }
  };

  return (
    <div className="my-6 rounded-xl border border-gray-700/50 bg-gray-900/50 overflow-hidden">
      {title && (
        <div className="px-4 py-2 border-b border-gray-700/50 flex items-center justify-between">
          <span className="text-sm font-medium text-white flex items-center gap-2">
            <Maximize2 size={14} className="text-primary-400" />
            {title}
          </span>
          <div className="flex items-center gap-1">
            <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-1 hover:bg-gray-800 rounded">
              <ZoomOut size={14} className="text-gray-400" />
            </button>
            <span className="text-xs text-gray-500 w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(1.5, z + 0.1))} className="p-1 hover:bg-gray-800 rounded">
              <ZoomIn size={14} className="text-gray-400" />
            </button>
          </div>
        </div>
      )}
      <div className="p-4 overflow-auto">
        <svg 
          width={600 * zoom} 
          height={400 * zoom} 
          viewBox="0 0 600 400"
          className="mx-auto"
        >
          {/* Connections */}
          {connections.map((conn, i) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            const isHighlighted = hoveredNode === conn.from || hoveredNode === conn.to;
            return (
              <g key={i}>
                <line
                  x1={fromNode.x} y1={fromNode.y}
                  x2={toNode.x} y2={toNode.y}
                  stroke={isHighlighted ? '#818cf8' : '#4b5563'}
                  strokeWidth={isHighlighted ? 2.5 : 1.5}
                  strokeDasharray={isHighlighted ? '' : '4 4'}
                  className="transition-all duration-300"
                />
                {conn.label && (
                  <text
                    x={(fromNode.x + toNode.x) / 2}
                    y={(fromNode.y + toNode.y) / 2 - 8}
                    textAnchor="middle"
                    fill="#9ca3af"
                    fontSize="10"
                  >
                    {conn.label}
                  </text>
                )}
              </g>
            );
          })}
          
          {/* Nodes */}
          {nodes.map((node) => {
            const colors = getNodeColor(node.type);
            const isHovered = hoveredNode === node.id;
            return (
              <g 
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
              >
                <rect
                  x={node.x - 55}
                  y={node.y - 20}
                  width={110}
                  height={40}
                  rx={8}
                  fill={isHovered ? colors.border : colors.bg}
                  fillOpacity={isHovered ? 0.3 : 0.2}
                  stroke={isHovered ? colors.border : colors.bg}
                  strokeWidth={isHovered ? 2 : 1.5}
                  className="transition-all duration-200"
                />
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill={isHovered ? '#fff' : '#e5e7eb'}
                  fontSize="11"
                  fontWeight="500"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="px-4 py-2 border-t border-gray-700/50 flex items-center gap-4 flex-wrap">
        <span className="text-xs text-gray-500 flex items-center gap-1"><Info size={10} /> Survolez les nœuds pour voir les connexions</span>
        <div className="flex items-center gap-3">
          {['client', 'server', 'database', 'cache'].map(type => {
            const colors = getNodeColor(type);
            return (
              <span key={type} className="flex items-center gap-1 text-xs text-gray-400">
                <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: colors.bg }}></span>
                {type}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Info/Warning/Tip boxes
export function InfoBox({ type, children }: { type: 'info' | 'warning' | 'tip' | 'danger'; children: React.ReactNode }) {
  const styles = {
    info: { icon: 'ℹ️', bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-300' },
    warning: { icon: '⚠️', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-300' },
    tip: { icon: '💡', bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-300' },
    danger: { icon: '🚨', bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-300' },
  };
  const s = styles[type];
  return (
    <div className={`my-4 p-4 rounded-lg border ${s.bg} ${s.border}`}>
      <div className={`text-sm ${s.text} leading-relaxed`}>
        <span className="mr-2">{s.icon}</span>
        {children}
      </div>
    </div>
  );
}

// Interactive Terminal Component
export function InteractiveTerminal({ commands }: { commands: { cmd: string; output: string }[] }) {
  const [visibleLines, setVisibleLines] = useState(1);

  return (
    <div className="my-4 rounded-lg border border-gray-700 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-gray-400 ml-2">terminal</span>
      </div>
      <div className="bg-gray-950 p-4 font-mono text-sm max-h-80 overflow-y-auto">
        {commands.slice(0, visibleLines).map((item, i) => (
          <div key={i} className="mb-2">
            <div className="flex items-center gap-2">
              <span className="text-green-400">$</span>
              <span className="text-white">{item.cmd}</span>
            </div>
            {item.output && (
              <div className="text-gray-400 mt-1 ml-4 whitespace-pre-wrap text-xs">{item.output}</div>
            )}
          </div>
        ))}
        {visibleLines < commands.length && (
          <button
            onClick={() => setVisibleLines(v => Math.min(v + 1, commands.length))}
            className="mt-2 px-3 py-1 text-xs bg-primary-500/20 text-primary-400 rounded hover:bg-primary-500/30 transition"
          >
            Exécuter la commande suivante →
          </button>
        )}
      </div>
    </div>
  );
}

// Comparison table component
export function ComparisonTable({ headers, rows, title }: {
  headers: string[];
  rows: string[][];
  title?: string;
}) {
  return (
    <div className="my-6 rounded-xl border border-gray-700/50 overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-gray-800/50 border-b border-gray-700/50">
          <span className="text-sm font-medium text-white">{title}</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-800/30">
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-gray-300 border-b border-gray-700/50">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-gray-800/20 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-2.5 text-gray-400 border-b border-gray-800/50">
                    {cell === '✅' ? <span className="text-green-400">✅</span> :
                     cell === '❌' ? <span className="text-red-400">❌</span> :
                     cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Step-by-step process diagram
export function ProcessDiagram({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <div className="my-6 space-y-0">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className="w-0.5 flex-1 bg-gradient-to-b from-primary-500/50 to-transparent min-h-[30px]" />
            )}
          </div>
          <div className="pb-6 pt-1">
            <h4 className="text-sm font-semibold text-white">{step.title}</h4>
            <p className="text-xs text-gray-400 mt-1">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
