'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FlaskConical, Clock, Zap, Filter } from 'lucide-react';
import { labs as labsApi } from '@/lib/api';

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const categories = ['All', 'Containers', 'CI/CD', 'Cloud', 'Orchestration', 'Security', 'IaC', 'Monitoring'];


const fallbackLabs = [
  { id: '1', title: 'Deploy Multi-Container App with Docker Compose', slug: 'docker-compose-deploy', difficulty: 'Beginner', duration: '30 min', xp: 150, category: 'Containers', description: 'Learn to orchestrate multiple containers with Docker Compose.' },
  { id: '2', title: 'Kubernetes Cluster Setup with kubeadm', slug: 'k8s-kubeadm-setup', difficulty: 'Intermediate', duration: '60 min', xp: 300, category: 'Orchestration', description: 'Set up a production-ready Kubernetes cluster from scratch.' },
  { id: '3', title: 'CI/CD Pipeline with GitHub Actions', slug: 'github-actions-pipeline', difficulty: 'Beginner', duration: '45 min', xp: 200, category: 'CI/CD', description: 'Build a complete CI/CD pipeline with testing and deployment.' },
  { id: '4', title: 'Zero-Trust Network with Istio', slug: 'istio-zero-trust', difficulty: 'Advanced', duration: '90 min', xp: 500, category: 'Security', description: 'Implement service mesh security with Istio.' },
  { id: '5', title: 'Terraform AWS Infrastructure', slug: 'terraform-aws', difficulty: 'Intermediate', duration: '45 min', xp: 250, category: 'IaC', description: 'Provision AWS infrastructure using Terraform modules.' },
  { id: '6', title: 'Prometheus Monitoring Setup', slug: 'prometheus-setup', difficulty: 'Intermediate', duration: '40 min', xp: 200, category: 'Monitoring', description: 'Set up complete monitoring with Prometheus and Grafana.' },
  { id: '7', title: 'Deploy to AWS ECS', slug: 'aws-ecs-deploy', difficulty: 'Intermediate', duration: '50 min', xp: 250, category: 'Cloud', description: 'Deploy containerized applications to AWS ECS.' },
  { id: '8', title: 'Kubernetes RBAC Security', slug: 'k8s-rbac', difficulty: 'Advanced', duration: '60 min', xp: 400, category: 'Security', description: 'Implement role-based access control in Kubernetes.' },
];


export default function LabsPage() {
  const [labList, setLabList] = useState(fallbackLabs);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState('All');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    labsApi.list()
      .then((data) => { if (data && data.length > 0) setLabList(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = labList.filter((lab) => {
    const matchDiff = difficulty === 'All' || lab.difficulty === difficulty;
    const matchCat = category === 'All' || lab.category === category;
    return matchDiff && matchCat;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold dark:text-white">
            Hands-On <span className="gradient-text">Labs</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Practice DevOps skills in real cloud environments with guided exercises.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Filter size={14} className="text-gray-400" />
            {difficulties.map((d) => (
              <button key={d} onClick={() => setDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  difficulty === d ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>{d}</button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  category === c ? 'bg-secondary-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>{c}</button>
            ))}
          </div>
        </div>


        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">{filtered.length} labs available</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((lab) => (
                <Link key={lab.id} href={`/labs/${lab.slug}`} className="card-hover group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      lab.difficulty === 'Beginner' ? 'difficulty-beginner' :
                      lab.difficulty === 'Intermediate' ? 'difficulty-intermediate' : 'difficulty-advanced'
                    }`}>{lab.difficulty}</span>
                    <span className="text-xs text-accent-400 font-medium">+{lab.xp} XP</span>
                    <span className="skill-tag text-xs">{lab.category}</span>
                  </div>
                  <h3 className="font-bold dark:text-white group-hover:text-primary-400 transition-colors">{lab.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{lab.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock size={12} /> {lab.duration}</span>
                    <span className="flex items-center gap-1"><FlaskConical size={12} /> Hands-on</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
