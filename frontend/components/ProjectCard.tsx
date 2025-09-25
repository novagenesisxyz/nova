'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/lib/types';
import { Users, Clock, TrendingUp, Zap } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const fundingPercentage = (project.currentFunding / project.fundingGoal) * 100;
  const [imageSrc, setImageSrc] = useState(project.imageUrl);

  return (
    <Link href={`/project/${project.id}`}>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all group cursor-pointer"
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            fill
            src={imageSrc || '/nova-logo.png'}
            alt={project.title}
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => {
              if (imageSrc !== '/nova-logo.png') {
                setImageSrc('/nova-logo.png');
              }
            }}
            priority={false}
          />
          <div className="absolute top-2 right-2">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-lg rounded-full text-xs text-white">
              {project.category}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white font-semibold">
                {project.quadraticScore.toFixed(1)} QF Score
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {project.institution && (
            <p className="text-xs text-purple-400 mb-4">{project.institution}</p>
          )}

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Initiative Funding Progress</span>
              <span className="text-sm text-white font-semibold">
                {fundingPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-400">
                ${project.currentFunding.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">
                ${project.fundingGoal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">{project.backers}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">{project.daysLeft}d</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">
                +${project.matchingPool.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
