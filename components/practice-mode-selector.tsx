"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Headphones, Ear, Piano, Sparkles } from "lucide-react"

export type PracticeMode = "listen" | "identify" | "play" | "compose"

interface PracticeModeOption {
  id: PracticeMode
  name: string
  description: string
  icon: React.ReactNode
  color: string
}

const PRACTICE_MODES: PracticeModeOption[] = [
  {
    id: "listen",
    name: "Listen Mode",
    description: "Hear patterns and schemata played correctly",
    icon: <Headphones className="h-8 w-8" />,
    color: "bg-blue-500",
  },
  {
    id: "identify",
    name: "Identify Mode",
    description: "Identify patterns by ear and test your knowledge",
    icon: <Ear className="h-8 w-8" />,
    color: "bg-purple-500",
  },
  {
    id: "play",
    name: "Play Mode",
    description: "Practice playing patterns with real-time feedback",
    icon: <Piano className="h-8 w-8" />,
    color: "bg-green-500",
  },
  {
    id: "compose",
    name: "Compose Mode",
    description: "Create music using learned patterns and schemata",
    icon: <Sparkles className="h-8 w-8" />,
    color: "bg-amber-500",
  },
]

interface PracticeModeSelectorProps {
  onSelectMode: (mode: PracticeMode) => void
}

export function PracticeModeSelector({ onSelectMode }: PracticeModeSelectorProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {PRACTICE_MODES.map((mode) => (
        <Card
          key={mode.id}
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSelectMode(mode.id)}
        >
          <div className="flex items-start gap-4">
            <div className={`${mode.color} text-white p-3 rounded-lg`}>{mode.icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{mode.name}</h3>
              <p className="text-sm text-muted-foreground">{mode.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
