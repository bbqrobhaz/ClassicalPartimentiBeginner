"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft, BookOpen, Play, CheckCircle2 } from "lucide-react"
import type { Lesson, Exercise } from "@/lib/types"
import { useProgress } from "@/lib/progress-context"
import { audioEngine } from "@/lib/audio-engine"

interface LessonViewerProps {
  lesson: Lesson
  onComplete: () => void
  onNext: () => void
  onPrevious: () => void
  hasNext: boolean
  hasPrevious: boolean
}

export function LessonViewer({ lesson, onComplete, onNext, onPrevious, hasNext, hasPrevious }: LessonViewerProps) {
  const randomizedExercises = useMemo(() => {
    const exercises = [...lesson.content.exercises]
    // Fisher-Yates shuffle algorithm
    for (let i = exercises.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[exercises[i], exercises[j]] = [exercises[j], exercises[i]]
    }
    return exercises
  }, [lesson.id]) // Re-randomize when lesson changes

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [exerciseResults, setExerciseResults] = useState<boolean[]>([])
  const [showTheory, setShowTheory] = useState(true)
  const [startTime] = useState(Date.now())
  const { progress, recordLessonCompletion, addExperience, checkAndUnlockAchievements } = useProgress()

  const isCompleted = progress.lessonsCompleted.find((lp) => lp.lessonId === lesson.id)?.completed || false
  const currentExercise = randomizedExercises[currentExerciseIndex]
  const totalExercises = randomizedExercises.length
  const completedExercises = exerciseResults.filter(Boolean).length

  const handleExerciseComplete = (correct: boolean) => {
    const newResults = [...exerciseResults]
    newResults[currentExerciseIndex] = correct
    setExerciseResults(newResults)

    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
    } else {
      const score = (newResults.filter(Boolean).length / totalExercises) * 100
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      recordLessonCompletion(lesson.id, score, timeSpent)
      if (score >= 70) {
        addExperience(lesson.xpReward)
        checkAndUnlockAchievements()
      }
      onComplete()
    }
  }

  const playExample = async (audioPattern: string[]) => {
    try {
      for (const note of audioPattern) {
        let noteName: string
        let octave: number

        if (note.length > 1 && !isNaN(Number.parseInt(note[note.length - 1]))) {
          // Note includes octave number (e.g., "C4", "C#5")
          noteName = note.slice(0, -1)
          octave = Number.parseInt(note[note.length - 1])
        } else {
          // Legacy format without octave, default to 4
          noteName = note
          octave = 4
        }

        await audioEngine.playNote(audioEngine.noteToFrequency(noteName, octave), 0.5)
        await new Promise((resolve) => setTimeout(resolve, 600))
      }
    } catch (error) {
      console.error("[v0] Failed to play example:", error)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={lesson.difficulty === "beginner" ? "default" : "secondary"}>{lesson.difficulty}</Badge>
                <Badge variant="outline">{lesson.tradition}</Badge>
                <Badge variant="outline">Level {lesson.level}</Badge>
                {isCompleted && (
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <CardTitle className="font-serif text-3xl">{lesson.title}</CardTitle>
              <CardDescription className="text-base mt-2">{lesson.description}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">XP Reward</div>
              <div className="text-2xl font-bold text-primary">+{lesson.xpReward}</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {showTheory && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Theory
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base leading-relaxed">{lesson.content.theory}</p>

            {lesson.content.historicalContext && (
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <div className="text-sm font-semibold text-muted-foreground mb-2">Historical Context</div>
                <p className="text-sm leading-relaxed">{lesson.content.historicalContext}</p>
              </div>
            )}

            {lesson.content.examples.length > 0 && (
              <div className="space-y-3">
                <div className="text-sm font-semibold text-foreground">Examples</div>
                {lesson.content.examples.map((example) => (
                  <div key={example.id} className="bg-muted/30 p-4 rounded-lg border border-border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-semibold text-sm mb-1">{example.description}</div>
                        <div className="font-mono text-lg text-primary mb-2">{example.notation}</div>
                        {example.figuredBass && (
                          <div className="text-sm text-muted-foreground">Figured Bass: {example.figuredBass}</div>
                        )}
                      </div>
                      <Button size="sm" onClick={() => playExample(example.audioPattern)}>
                        <Play className="w-4 h-4 mr-1" />
                        Play
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {totalExercises > 0 && (
              <Button onClick={() => setShowTheory(false)} className="w-full" size="lg">
                Start Exercises
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {!showTheory && totalExercises > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>
                Exercise {currentExerciseIndex + 1} of {totalExercises}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowTheory(true)}>
                <BookOpen className="w-4 h-4 mr-1" />
                Review Theory
              </Button>
            </div>
            <Progress value={(completedExercises / totalExercises) * 100} className="h-2" />
          </CardHeader>
          <CardContent>
            {currentExercise && <ExerciseComponent exercise={currentExercise} onComplete={handleExerciseComplete} />}
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <Button onClick={onPrevious} disabled={!hasPrevious} variant="outline">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous Lesson
        </Button>
        <Button onClick={onNext} disabled={!hasNext} variant="outline">
          Next Lesson
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}

function ExerciseComponent({ exercise, onComplete }: { exercise: Exercise; onComplete: (correct: boolean) => void }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const randomizedOptions = useMemo(() => {
    if (!exercise.options) return []
    const options = [...exercise.options]
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[options[i], options[j]] = [options[j], options[i]]
    }
    return options
  }, [exercise.id])

  const playExerciseAudio = async () => {
    if (!exercise.audioPattern || isPlaying) return

    setIsPlaying(true)
    try {
      for (const note of exercise.audioPattern) {
        let noteName: string
        let octave: number

        if (note.length > 1 && !isNaN(Number.parseInt(note[note.length - 1]))) {
          noteName = note.slice(0, -1)
          octave = Number.parseInt(note[note.length - 1])
        } else {
          noteName = note
          octave = 4
        }

        await audioEngine.playNote(audioEngine.noteToFrequency(noteName, octave), 0.5)
        await new Promise((resolve) => setTimeout(resolve, 600))
      }
    } catch (error) {
      console.error("[v0] Failed to play exercise audio:", error)
    } finally {
      setIsPlaying(false)
    }
  }

  const handleSubmit = () => {
    if (!selectedAnswer) return
    const correct = selectedAnswer === exercise.correctAnswer
    setShowResult(true)
    setTimeout(() => {
      onComplete(correct)
      setSelectedAnswer(null)
      setShowResult(false)
      setShowHint(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="text-lg font-semibold">{exercise.prompt}</div>

      {(exercise.type === "listen" || exercise.type === "identify") && exercise.audioPattern && (
        <div className="flex justify-center">
          <Button onClick={playExerciseAudio} disabled={isPlaying} size="lg" className="w-full max-w-xs">
            <Play className="w-5 h-5 mr-2" />
            {isPlaying ? "Playing..." : "Play Scale Degree"}
          </Button>
        </div>
      )}

      {exercise.type === "identify" && exercise.options && (
        <div className="grid grid-cols-2 gap-3">
          {randomizedOptions.map((option) => (
            <Button
              key={option}
              onClick={() => setSelectedAnswer(option)}
              variant={selectedAnswer === option ? "default" : "outline"}
              className="h-16 text-lg"
              disabled={showResult}
            >
              {option}
            </Button>
          ))}
        </div>
      )}

      {exercise.hints && exercise.hints.length > 0 && !showResult && (
        <Button variant="ghost" size="sm" onClick={() => setShowHint(!showHint)}>
          {showHint ? "Hide" : "Show"} Hint
        </Button>
      )}

      {showHint && exercise.hints && (
        <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
          <div className="text-sm text-blue-600 dark:text-blue-400">{exercise.hints[0]}</div>
        </div>
      )}

      {showResult && (
        <div
          className={`p-4 rounded-lg border ${
            selectedAnswer === exercise.correctAnswer
              ? "bg-green-500/10 border-green-500/30"
              : "bg-red-500/10 border-red-500/30"
          }`}
        >
          <div
            className={`font-semibold ${
              selectedAnswer === exercise.correctAnswer
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {selectedAnswer === exercise.correctAnswer ? "Correct!" : "Incorrect"}
          </div>
          {selectedAnswer !== exercise.correctAnswer && (
            <div className="text-sm mt-1">The correct answer was: {exercise.correctAnswer}</div>
          )}
        </div>
      )}

      {!showResult && (
        <Button onClick={handleSubmit} disabled={!selectedAnswer} className="w-full" size="lg">
          Submit Answer
        </Button>
      )}
    </div>
  )
}
