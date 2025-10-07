"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import type { Achievement } from "@/lib/types"

interface AchievementNotificationProps {
  achievement: Achievement | null
  onDismiss: () => void
}

export function AchievementNotification({ achievement, onDismiss }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (achievement) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onDismiss, 300)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [achievement, onDismiss])

  return (
    <AnimatePresence>
      {isVisible && achievement && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          className="fixed top-4 right-4 z-50"
        >
          <Card className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/50 p-6 shadow-2xl max-w-sm">
            <div className="flex items-start gap-4">
              <div className="text-5xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-1">
                  Achievement Unlocked!
                </div>
                <div className="font-serif text-xl font-bold text-foreground mb-1">{achievement.name}</div>
                <div className="text-sm text-muted-foreground">{achievement.description}</div>
              </div>
              <button
                onClick={() => {
                  setIsVisible(false)
                  setTimeout(onDismiss, 300)
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
