import type { UserProgress, LessonProgress } from "./types"
import { SKILL_LEVELS, ACHIEVEMENTS } from "./curriculum"

const STORAGE_KEY = "baroque-improvisation-progress"

export function getDefaultProgress(): UserProgress {
  return {
    currentLevel: SKILL_LEVELS[0],
    totalXP: 0,
    streak: 0,
    longestStreak: 0,
    lastPracticeDate: null,
    lessonsCompleted: [],
    achievements: ACHIEVEMENTS.map((a) => ({ ...a })),
    practiceTime: 0,
    skillTrees: {
      italian: 0,
      german: 0,
    },
  }
}

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return getDefaultProgress()

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return getDefaultProgress()

    const parsed = JSON.parse(stored)
    // Convert date strings back to Date objects
    if (parsed.lastPracticeDate) {
      parsed.lastPracticeDate = new Date(parsed.lastPracticeDate)
    }
    parsed.lessonsCompleted = parsed.lessonsCompleted.map((lp: any) => ({
      ...lp,
      lastAttemptDate: new Date(lp.lastAttemptDate),
    }))
    parsed.achievements = parsed.achievements.map((a: any) => ({
      ...a,
      unlockedAt: a.unlockedAt ? new Date(a.unlockedAt) : undefined,
    }))

    return parsed
  } catch (error) {
    console.error("[v0] Failed to load progress:", error)
    return getDefaultProgress()
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error("[v0] Failed to save progress:", error)
  }
}

export function updateStreak(progress: UserProgress): UserProgress {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (!progress.lastPracticeDate) {
    // First practice session
    return {
      ...progress,
      streak: 1,
      longestStreak: Math.max(1, progress.longestStreak),
      lastPracticeDate: today,
    }
  }

  const lastPractice = new Date(progress.lastPracticeDate)
  const lastPracticeDay = new Date(lastPractice.getFullYear(), lastPractice.getMonth(), lastPractice.getDate())

  const daysDiff = Math.floor((today.getTime() - lastPracticeDay.getTime()) / (1000 * 60 * 60 * 24))

  if (daysDiff === 0) {
    // Same day, no streak change
    return progress
  } else if (daysDiff === 1) {
    // Consecutive day
    const newStreak = progress.streak + 1
    return {
      ...progress,
      streak: newStreak,
      longestStreak: Math.max(newStreak, progress.longestStreak),
      lastPracticeDate: today,
    }
  } else {
    // Streak broken
    return {
      ...progress,
      streak: 1,
      lastPracticeDate: today,
    }
  }
}

export function addXP(progress: UserProgress, xp: number): UserProgress {
  const newTotalXP = progress.totalXP + xp
  let newLevel = progress.currentLevel

  // Check for level up
  for (let i = SKILL_LEVELS.length - 1; i >= 0; i--) {
    if (newTotalXP >= SKILL_LEVELS[i].xpRequired) {
      newLevel = { ...SKILL_LEVELS[i], xp: newTotalXP }
      break
    }
  }

  return {
    ...progress,
    totalXP: newTotalXP,
    currentLevel: newLevel,
  }
}

export function completeLesson(
  progress: UserProgress,
  lessonId: string,
  score: number,
  timeSpent: number,
): UserProgress {
  const existingIndex = progress.lessonsCompleted.findIndex((lp) => lp.lessonId === lessonId)

  const lessonProgress: LessonProgress = {
    lessonId,
    completed: score >= 70, // 70% to pass
    score,
    attempts: existingIndex >= 0 ? progress.lessonsCompleted[existingIndex].attempts + 1 : 1,
    lastAttemptDate: new Date(),
    timeSpent,
    mistakes: [],
  }

  const newLessonsCompleted =
    existingIndex >= 0
      ? progress.lessonsCompleted.map((lp, i) => (i === existingIndex ? lessonProgress : lp))
      : [...progress.lessonsCompleted, lessonProgress]

  return {
    ...progress,
    lessonsCompleted: newLessonsCompleted,
    practiceTime: progress.practiceTime + timeSpent,
  }
}

export function unlockAchievement(progress: UserProgress, achievementId: string): UserProgress {
  const achievementIndex = progress.achievements.findIndex((a) => a.id === achievementId)
  if (achievementIndex === -1) return progress

  const achievement = progress.achievements[achievementIndex]
  if (achievement.unlockedAt) return progress // Already unlocked

  const newAchievements = progress.achievements.map((a, i) =>
    i === achievementIndex ? { ...a, progress: a.target, unlockedAt: new Date() } : a,
  )

  return {
    ...progress,
    achievements: newAchievements,
  }
}
