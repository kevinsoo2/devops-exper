'use client';

import { useState, useEffect, useRef } from 'react';
import { TerminalIcon, Play } from 'lucide-react';

const commands = [
  { cmd: '$ docker build -t myapp:v2 .', delay: 0 },
  { cmd: 'Sending build context to Docker daemon  4.096kB', delay: 800 },
  { cmd: 'Step 1/6 : FROM node:18-alpine', delay: 1200 },
  { cmd: 'Step 2/6 : WORKDIR /app', delay: 1600 },
  { cmd: 'Step 3/6 : COPY package*.json ./', delay: 2000 },
  { cmd: 'Step 4/6 : RUN npm ci --only=production', delay: 2400 },
  { cmd: 'Step 5/6 : COPY . .', delay: 3000 },
  { cmd: 'Step 6/6 : CMD ["node", "server.js"]', delay: 3400 },
  { cmd: 'Successfully built a1b2c3d4e5f6', delay: 4000 },
  { cmd: 'Successfully tagged myapp:v2', delay: 4200 },
  { cmd: '', delay: 4600 },
  { cmd: '$ kubectl apply -f deployment.yaml', delay: 5000 },
  { cmd: 'deployment.apps/myapp configured', delay: 5500 },
  { cmd: 'service/myapp-svc unchanged', delay: 5800 },
  { cmd: '', delay: 6000 },
  { cmd: '$ kubectl rollout status deployment/myapp', delay: 6400 },
  { cmd: 'deployment "myapp" successfully rolled out', delay: 7000 },
  { cmd: '$ echo "Deployment complete! 🚀"', delay: 7500 },
  { cmd: 'Deployment complete! 🚀', delay: 7800 },
];

export function Terminal() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const runDemo = () => {
    setVisibleLines([]);
    setIsRunning(true);
    commands.forEach((line, idx) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line.cmd]);
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
        if (idx === commands.length - 1) setIsRunning(false);
      }, line.delay);
    });
  };

  useEffect(() => {
    const timer = setTimeout(runDemo, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 dark:bg-dark/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-badge">
            <TerminalIcon size={16} />
            Terminal Interactif
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold dark:text-white">
            Découvrez des <span className="gradient-text">Workflows Réels</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Regardez de vrais workflows DevOps prendre vie. Voici à quoi ressemble votre travail quotidien.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl border border-gray-700 overflow-hidden shadow-2xl shadow-primary-500/10">
          {/* Title Bar */}
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-gray-400 font-mono">terminal — devops-lab</span>
            <button
              onClick={runDemo}
              disabled={isRunning}
              className="flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 disabled:opacity-50"
            >
              <Play size={12} /> Rejouer
            </button>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalRef}
            className="bg-gray-900 p-6 h-80 overflow-y-auto font-mono text-sm"
          >
            {visibleLines.map((line, idx) => (
              <div
                key={idx}
                className={`${
                  line.startsWith('$')
                    ? 'text-green-400'
                    : line.includes('Successfully') || line.includes('complete') || line.includes('configured')
                    ? 'text-accent-400'
                    : 'text-gray-300'
                } ${line === '' ? 'h-4' : ''}`}
              >
                {line}
              </div>
            ))}
            {isRunning && (
              <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
