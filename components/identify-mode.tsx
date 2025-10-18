"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Check, X } from "lucide-react"
import type { Lesson } from "@/lib/types"
import { useProgress } from "@/lib/progress-context"
import { audioEngine } from "@/lib/audio-engine"

interface IdentifyModeProps {
  lessons: Lesson[]
}

export function IdentifyMode({ lessons }: IdentifyModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [options, setOptions] = useState<Lesson[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const { addXP } = useProgress()

  const currentLesson = lessons[currentIndex]

  useEffect(() => {
    // Generate 4 random options including the correct answer
    const shuffled = [...lessons].sort(() => Math.random() - 0.5)
    const opts = shuffled.slice(0, 3)
    if (!opts.find((l) => l.id === currentLesson.id)) {
      opts[Math.floor(Math.random() * 3)] = currentLesson
    } else {
      opts.push(currentLesson)
    }
    setOptions(opts.sort(() => Math.random() - 0.5))
    setSelectedAnswer(null)
    setIsCorrect(null)
  }, [currentIndex, lessons, currentLesson])

  const handlePlay = async () => {
    if (!currentLesson.content.examples || currentLesson.content.examples.length === 0) {
      console.log("[v0] No examples available for:", currentLesson.title)
      return
    }

    const firstExample = currentLesson.content.examples[0]
    console.log("[v0] Playing audio for:", currentLesson.title, "Example:", firstExample.description)

    try {
      for (const note of firstExample.audioPattern) {
        // Parse note with octave (e.g., "C4") or default to octave 4
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
      console.error("[v0] Failed to play example:", error)
    }
  }

  const handleAnswer = (lessonId: string) => {
    setSelectedAnswer(lessonId)
    const correct = lessonId === currentLesson.id
    setIsCorrect(correct)
    if (correct) {
      addXP(20)
    }
  }

  const handleNext = () => {
    if (currentIndex < lessons.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Listen and identify the pattern</h3>
            <Button size="lg" onClick={handlePlay}>
              <Play className="mr-2 h-5 w-5" />
              Play Pattern
            </Button>
          </div>

          <div className="grid gap-3">
            {options.map((option) => {
              const isSelected = selectedAnswer === option.id
              const showResult = isSelected && isCorrect !== null
              const buttonVariant = showResult
                ? isCorrect
                  ? "default"
                  : "destructive"
                : isSelected
                  ? "secondary"
                  : "outline"

              return (
                <Button
                  key={option.id}
                  variant={buttonVariant}
                  className="h-auto py-4 px-6 justify-start text-left"
                  onClick={() => handleAnswer(option.id)}
                  disabled={selectedAnswer !== null}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex-1">
                      <div className="font-semibold">{option.title}</div>
                      <div className="text-sm opacity-80">{option.description}</div>
                    </div>
                    {showResult && <div>{isCorrect ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}</div>}
                  </div>
                </Button>
              )
            })}
          </div>

          {isCorrect !== null && (
            <div className="text-center space-y-4">
              <p className="text-lg font-semibold">
                {isCorrect ? "Correct! +20 XP" : "Incorrect. Try again next time!"}
              </p>
              <Button onClick={handleNext} disabled={currentIndex >= lessons.length - 1}>
                Next Question
              </Button>
            </div>
          )}

          <div className="text-sm text-muted-foreground text-center">
            Question {currentIndex + 1} of {lessons.length}
          </div>
        </div>
      </Card>
    </div>
  )
}
