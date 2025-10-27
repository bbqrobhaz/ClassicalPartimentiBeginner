"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import type { UserProgress } from "./types"
import {
  loadProgress,
  saveProgress,
  updateStreak,
  addXP,
  completeLesson,
  unlockAchievement,
  getDefaultProgress,
} from "./progress-storage"

interface ProgressContextType {
  progress: UserProgress
  updateProgress: (updater: (prev: UserProgress) => UserProgress) => void
  addExperience: (xp: number) => void
  recordLessonCompletion: (lessonId: string, score: number, timeSpent: number) => void
  checkAndUnlockAchievements: () => void
  resetProgress: () => void
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(getDefaultProgress())
  const [isLoaded, setIsLoaded] = useState(false)

  // Load progress on mount
  useEffect(() => {
    const loaded = loadProgress()
    const withStreak = updateStreak(loaded)
    setProgress(withStreak)
    saveProgress(withStreak)
    setIsLoaded(true)
  }, [])

  // Save progress whenever it changes
  useEffect(() => {
    if (isLoaded) {
      saveProgress(progress)
    }
  }, [progress, isLoaded])

  const updateProgress = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => updater(prev))
  }, [])

  const addExperience = useCallback((xp: number) => {
    setProgress((prev) => addXP(prev, xp))
  }, [])

  const recordLessonCompletion = useCallback((lessonId: string, score: number, timeSpent: number) => {
    setProgress((prev) => {
      let updated = completeLesson(prev, lessonId, score, timeSpent)
      updated = updateStreak(updated)
      return updated
    })
  }, [])

  const checkAndUnlockAchievements = useCallback(() => {
    setProgress((prev) => {
      let updated = { ...prev }

      // Check first lesson achievement
      if (prev.lessonsCompleted.length >= 1 && !prev.achievements.find((a) => a.id === "first-lesson")?.unlockedAt) {
        updated = unlockAchievement(updated, "first-lesson")
      }

      // Check week streak achievement
      if (prev.streak >= 7 && !prev.achievements.find((a) => a.id === "week-streak")?.unlockedAt) {
        updated = unlockAchievement(updated, "week-streak")
      }

      // Update achievement progress
      updated.achievements = updated.achievements.map((achievement) => {
        if (achievement.unlockedAt) return achievement

        switch (achievement.id) {
          case "first-lesson":
            return { ...achievement, progress: Math.min(prev.lessonsCompleted.length, 1) }
          case "week-streak":
            return { ...achievement, progress: Math.min(prev.streak, 7) }
          case "rule-master":
            return {
              ...achievement,
              progress: prev.lessonsCompleted.filter((lp) => lp.lessonId.startsWith("foundations-5")).length,
            }
          default:
            return achievement
        }
      })

      return updated
    })
  }, [])

  const resetProgress = useCallback(() => {
    const fresh = getDefaultProgress()
    setProgress(fresh)
    saveProgress(fresh)
  }, [])

  return (
    <ProgressContext.Provider
      value={{
        progress,
        updateProgress,
        addExperience,
        recordLessonCompletion,
        checkAndUnlockAchievements,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider")
  }
  return context
}
