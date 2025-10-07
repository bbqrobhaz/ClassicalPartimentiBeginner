"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import type { SkillLevel } from "@/lib/types"

interface XPProgressBarProps {
  currentLevel: SkillLevel
  totalXP: number
}

export function XPProgressBar({ currentLevel, totalXP }: XPProgressBarProps) {
  const currentLevelXP = totalXP - currentLevel.xpRequired
  const xpForNextLevel = currentLevel.level < 7 ? currentLevel.xpRequired * 2 - currentLevel.xpRequired : 0
  const progress = xpForNextLevel > 0 ? (currentLevelXP / xpForNextLevel) * 100 : 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-foreground">
          Level {currentLevel.level} - {currentLevel.name}
        </span>
        <span className="text-muted-foreground">
          {currentLevelXP} / {xpForNextLevel} XP
        </span>
      </div>
      <div className="relative">
        <Progress value={progress} className="h-3" />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute top-0 left-0 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
