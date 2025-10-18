"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipForward } from "lucide-react"
import type { Lesson } from "@/lib/types"
import { useProgress } from "@/lib/progress-context"

interface ListenModeProps {
  lessons: Lesson[]
}

export function ListenMode({ lessons }: ListenModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const { addXP } = useProgress()

  const currentLesson = lessons[currentIndex]

  const handlePlay = () => {
    setIsPlaying(true)
    // Award XP for listening
    addXP(5)
    // TODO: Implement actual audio playback
    setTimeout(() => setIsPlaying(false), 3000)
  }

  const handleNext = () => {
    if (currentIndex < lessons.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsPlaying(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">{currentLesson.title}</h3>
            <p className="text-muted-foreground">{currentLesson.description}</p>
          </div>

          {currentLesson.examples && currentLesson.examples.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Examples:</h4>
              {currentLesson.examples.map((example, idx) => (
                <div key={idx} className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">{example.description}</p>
                  <p className="font-mono text-sm mt-1">
                    {example.notes.map((n) => `${n.note}${n.octave}`).join(" - ")}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 pt-4">
            <Button size="lg" onClick={handlePlay} disabled={isPlaying} className="flex-1">
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-5 w-5" />
                  Playing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Play Example
                </>
              )}
            </Button>
            <Button size="lg" variant="outline" onClick={handleNext} disabled={currentIndex >= lessons.length - 1}>
              <SkipForward className="mr-2 h-5 w-5" />
              Next
            </Button>
          </div>

          <div className="text-sm text-muted-foreground text-center">
            Lesson {currentIndex + 1} of {lessons.length}
          </div>
        </div>
      </Card>
    </div>
  )
}
