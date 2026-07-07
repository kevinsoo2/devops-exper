'use client';

import { useState, useEffect, useRef } from 'react';

const commands: Record<string, string> = {
  'docker ps': `CONTAINER ID   IMAGE          STATUS          PORTS                    NAMES
a1b2c3d4e5f6   nginx:latest   Up 2 hours      0.0.0.0:80->80/tcp       web-frontend
b2c3d4e5f6a1   redis:7        Up 2 hours      0.0.0.0:6379->6379/tcp   cache-redis
c3d4e5f6a1b2   postgres:15    Up 2 hours      0.0.0.0:5432->5432/tcp   db-postgres`,
  'kubectl get pods': `NAME                          READY   STATUS    RESTARTS   AGE
frontend-6d8f9b7c4d-x2k9p    1/1     Running   0          4h
backend-api-5c4d3b2a1-m7n8    2/2     Running   0          4h
redis-cache-7e8f9a0b1-q3r4    1/1     Running   0          12h`,
  'terraform plan': `Terraform will perform the following actions:

  # aws_instance.web will be created
  + resource "aws_instance" "web" {
      + ami           = "ami-0c55b159cbfafe1f0"
      + instance_type = "t3.medium"
    }

Plan: 3 to add, 1 to change, 0 to destroy.`,
  'helm list': `NAME            NAMESPACE    REVISION  STATUS    CHART
frontend        production   5         deployed  frontend-2.1.0
backend-api     production   8         deployed  backend-3.4.2
monitoring      monitoring   3         deployed  kube-prometheus-0.65.1`,
};

export function Terminal() {
  const [currentCmd, setCurrentCmd] = useState('');
  const [output, setOutput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  async function runCommand(cmd: string) {
    if (isTyping) return;
    setIsTyping(true);
    setOutput('');
    setCurrentCmd('');

    // Typing effect
    for (let i = 0; i <= cmd.length; i++) {
      await new Promise((r) => setTimeout(r, 50));
      setCurrentCmd(cmd.slice(0, i));
    }

    await new Promise((r) => setTimeout(r, 300));
    setOutput(commands[cmd] || 'Command not found');
    setIsTyping(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => runCommand('docker ps'), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-badge mb-4">
            <i className="fas fa-terminal"></i> Démo Live
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Terminal <span className="gradient-text">Interactif</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Essayez quelques commandes DevOps directement dans votre navigateur
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="terminal">
            <div className="terminal-header">
              <div className="flex gap-2 mr-4">
                <span className="terminal-dot bg-red-500" />
                <span className="terminal-dot bg-yellow-400" />
                <span className="terminal-dot bg-green-500" />
              </div>
              <span className="text-xs text-slate-500 font-mono">devops@expert:~$</span>
            </div>
            <div ref={bodyRef} className="p-5 min-h-[200px] font-mono text-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-400 font-semibold">$</span>
                <span className="text-slate-200">{currentCmd}</span>
                <span className="text-green-400 animate-pulse">|</span>
              </div>
              {output && (
                <pre className="text-slate-500 text-xs leading-relaxed pl-5 whitespace-pre-wrap">{output}</pre>
              )}
            </div>
            <div className="flex gap-2 p-3 border-t border-[#30363d] flex-wrap">
              {Object.keys(commands).map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => runCommand(cmd)}
                  disabled={isTyping}
                  className="px-3 py-1.5 bg-[#21262d] border border-[#30363d] rounded-md text-xs font-mono text-slate-500 hover:border-green-400 hover:text-green-400 hover:bg-green-400/5 transition-all disabled:opacity-50"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
