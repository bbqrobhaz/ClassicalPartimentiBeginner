"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import type { UserProgress, Achievement, SkillLevel } from "./types"
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
  newAchievement: Achievement | null
  newLevel: SkillLevel | null
  clearAchievementNotification: () => void
  clearLevelNotification: () => void
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(getDefaultProgress())
  const [isLoaded, setIsLoaded] = useState(false)
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)
  const [newLevel, setNewLevel] = useState<SkillLevel | null>(null)

  useEffect(() => {
    const loaded = loadProgress()
    const withStreak = updateStreak(loaded)
    setProgress(withStreak)
    saveProgress(withStreak)
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      saveProgress(progress)
    }
  }, [progress, isLoaded])

  const updateProgress = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => updater(prev))
  }, [])

  const addExperience = useCallback((xp: number) => {
    setProgress((prev) => {
      const oldLevel = prev.currentLevel.level
      const updated = addXP(prev, xp)
      if (updated.currentLevel.level > oldLevel) {
        setNewLevel(updated.currentLevel)
      }
      return updated
    })
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
        const achievement = updated.achievements.find((a) => a.id === "first-lesson")
        if (achievement) setNewAchievement(achievement)
      }

      // Check week streak achievement
      if (prev.streak >= 7 && !prev.achievements.find((a) => a.id === "week-streak")?.unlockedAt) {
        updated = unlockAchievement(updated, "week-streak")
        const achievement = updated.achievements.find((a) => a.id === "week-streak")
        if (achievement) setNewAchievement(achievement)
      }

      // Check month streak achievement
      if (prev.streak >= 30 && !prev.achievements.find((a) => a.id === "month-streak")?.unlockedAt) {
        updated = unlockAchievement(updated, "month-streak")
        const achievement = updated.achievements.find((a) => a.id === "month-streak")
        if (achievement) setNewAchievement(achievement)
      }

      // Update achievement progress
      updated.achievements = updated.achievements.map((achievement) => {
        if (achievement.unlockedAt) return achievement

        switch (achievement.id) {
          case "first-lesson":
            return { ...achievement, progress: Math.min(prev.lessonsCompleted.length, 1) }
          case "week-streak":
            return { ...achievement, progress: Math.min(prev.streak, 7) }
          case "month-streak":
            return { ...achievement, progress: Math.min(prev.streak, 30) }
          case "rule-master":
            return {
              ...achievement,
              progress: prev.lessonsCompleted.filter((lp) => lp.lessonId.startsWith("found-6")).length,
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

  const clearAchievementNotification = useCallback(() => {
    setNewAchievement(null)
  }, [])

  const clearLevelNotification = useCallback(() => {
    setNewLevel(null)
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
        newAchievement,
        newLevel,
        clearAchievementNotification,
        clearLevelNotification,
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
