"use client"

import { motion } from "framer-motion"
import { Flame } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StreakDisplayProps {
  currentStreak: number
  longestStreak: number
  lastPracticeDate: Date | null
}

export function StreakDisplay({ currentStreak, longestStreak, lastPracticeDate }: StreakDisplayProps) {
  const isActiveToday = lastPracticeDate && new Date().toDateString() === lastPracticeDate.toDateString()

  return (
    <Card className={isActiveToday ? "border-orange-500/50 bg-orange-500/5" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <motion.div
            animate={isActiveToday ? { scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <Flame className={`w-5 h-5 ${isActiveToday ? "text-orange-500" : "text-muted-foreground"}`} />
          </motion.div>
          Practice Streak
        </CardTitle>
        <CardDescription>Keep practicing daily to maintain your streak!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500">{currentStreak}</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-muted-foreground">{longestStreak}</div>
            <div className="text-sm text-muted-foreground">Longest Streak</div>
          </div>
        </div>
        {!isActiveToday && currentStreak > 0 && (
          <div className="mt-4 text-sm text-center text-amber-600 dark:text-amber-400">
            Practice today to keep your streak alive!
          </div>
        )}
      </CardContent>
    </Card>
  )
}
