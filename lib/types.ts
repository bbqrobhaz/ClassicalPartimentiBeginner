export interface BackingTrackConfig {
  tempo: number
  style: string
  chords?: string[]
}

export interface LessonProgress {
  lessonId: string
  completed: boolean
  score: number
  attempts: number
  lastAttemptDate: Date
  timeSpent: number // in seconds
  mistakes: string[] // track common errors
}

export interface SkillLevel {
  level: number
  name: string
  xp: number
  xpRequired: number
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: Date
  progress: number
  target: number
}

export interface UserProgress {
  userId?: string
  currentLevel: SkillLevel
  totalXP: number
  streak: number
  longestStreak: number
  lastPracticeDate: Date | null
  lessonsCompleted: LessonProgress[]
  achievements: Achievement[]
  practiceTime: number // total seconds
  skillTrees: {
    italian: number // percentage complete
    german: number // percentage complete
  }
}

export interface Lesson {
  id: string
  title: string
  description: string
  category: "foundations" | "patterns" | "schemata" | "diminutions" | "improvisation"
  tradition: "italian" | "german" | "both"
  difficulty: "beginner" | "elementary" | "intermediate" | "advanced" | "mastery"
  level: number
  prerequisites: string[] // lesson IDs
  xpReward: number
  content: LessonContent
}

export interface LessonContent {
  theory: string
  examples: Example[]
  exercises: Exercise[]
  historicalContext?: string
}

export interface Example {
  id: string
  description: string
  notation: string // scale degree notation like "1, 2, 3"
  audioPattern: string[] // note names
  figuredBass?: string
}

export interface Exercise {
  id: string
  type: "listen" | "identify" | "play" | "compose"
  prompt: string
  correctAnswer: string | string[]
  options?: string[]
  hints?: string[]
  audioPattern?: string[] // note names to play for listen/identify exercises
  bassPattern?: string // e.g., "G3-G3-C3" for melodic improvisation exercises
  beatsPerNote?: number // beats per bass note (default 4)
  tempo?: number // BPM (default 80)
}
