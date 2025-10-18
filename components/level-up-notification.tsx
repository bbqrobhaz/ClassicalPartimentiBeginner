"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import type { SkillLevel } from "@/lib/types"

interface LevelUpNotificationProps {
  newLevel: SkillLevel | null
  onDismiss: () => void
}

export function LevelUpNotification({ newLevel, onDismiss }: LevelUpNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (newLevel) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onDismiss, 300)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [newLevel, onDismiss])

  return (
    <AnimatePresence>
      {isVisible && newLevel && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ type: "spring", stiffness: 200 }}>
            <Card className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/50 p-12 shadow-2xl text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <Sparkles className="w-20 h-20 mx-auto text-purple-500" />
              </motion.div>
              <div className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">Level Up!</div>
              <div className="font-serif text-5xl font-bold text-foreground mb-2">Level {newLevel.level}</div>
              <div className="text-2xl text-muted-foreground mb-6">{newLevel.name}</div>
              <div className="text-sm text-muted-foreground">
                You've reached a new milestone in your baroque improvisation journey!
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
