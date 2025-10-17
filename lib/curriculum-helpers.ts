import type { Lesson } from "./types"
import { CURRICULUM_MODULES } from "./curriculum"

export const CURRICULUM: Lesson[] = CURRICULUM_MODULES.flatMap((module) => module.lessons)

function isLessonAvailable(lesson: Lesson, completedLessonIds: string[]): boolean {
  return lesson.prerequisites.every((prereqId) => completedLessonIds.includes(prereqId))
}

export function getAvailableLessons(completedLessonIds: string[]): Lesson[] {
  return CURRICULUM.filter((lesson) => isLessonAvailable(lesson, completedLessonIds))
}

export function getNextLesson(currentLessonId: string, completedLessonIds: string[]): Lesson | null {
  const currentIndex = CURRICULUM.findIndex((lesson) => lesson.id === currentLessonId)

  if (currentIndex === -1) {
    // If current lesson not found, return the first available lesson
    const availableLessons = getAvailableLessons(completedLessonIds)
    return availableLessons[0] || null
  }

  // Find the next available lesson after the current one
  for (let i = currentIndex + 1; i < CURRICULUM.length; i++) {
    const lesson = CURRICULUM[i]
    if (isLessonAvailable(lesson, completedLessonIds)) {
      return lesson
    }
  }

  // No next lesson available
  return null
}
