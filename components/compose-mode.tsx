"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Save, Trash2 } from "lucide-react"
import type { Lesson } from "@/lib/types"
import { useProgress } from "@/lib/progress-context"

interface ComposeModeProps {
  lessons: Lesson[]
}

export function ComposeMode({ lessons }: ComposeModeProps) {
  const [selectedPatterns, setSelectedPatterns] = useState<Lesson[]>([])
  const { addXP } = useProgress()

  const handleAddPattern = (lesson: Lesson) => {
    setSelectedPatterns([...selectedPatterns, lesson])
  }

  const handleRemovePattern = (index: number) => {
    setSelectedPatterns(selectedPatterns.filter((_, i) => i !== index))
  }

  const handlePlay = () => {
    // TODO: Play the composed sequence
    console.log(
      "[v0] Playing composition:",
      selectedPatterns.map((p) => p.title),
    )
    addXP(30)
  }

  const handleSave = () => {
    // TODO: Save the composition
    console.log("[v0] Saving composition")
    addXP(50)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Your Composition</h3>
        {selectedPatterns.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Select patterns below to build your composition</p>
        ) : (
          <div className="space-y-2">
            {selectedPatterns.map((pattern, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="flex-1">
                  <div className="font-semibold">{pattern.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {pattern.tradition} • Level {pattern.level}
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => handleRemovePattern(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {selectedPatterns.length > 0 && (
          <div className="flex gap-3 mt-4">
            <Button onClick={handlePlay} className="flex-1">
              <Play className="mr-2 h-4 w-4" />
              Play Composition
            </Button>
            <Button onClick={handleSave} variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Available Patterns</h3>
        <div className="grid gap-2 max-h-96 overflow-y-auto">
          {lessons.map((lesson) => (
            <Button
              key={lesson.id}
              variant="outline"
              className="h-auto py-3 px-4 justify-start text-left bg-transparent"
              onClick={() => handleAddPattern(lesson)}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="flex-1">
                  <div className="font-semibold">{lesson.title}</div>
                  <div className="text-sm text-muted-foreground">{lesson.description}</div>
                </div>
                <Badge variant="secondary">{lesson.tradition}</Badge>
              </div>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  )
}
