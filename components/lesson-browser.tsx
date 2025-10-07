"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Lock, Search, BookOpen, Flag } from "lucide-react"
import { CURRICULUM, getAvailableLessons } from "@/lib/curriculum"
import { useProgress } from "@/lib/progress-context"
import type { Lesson } from "@/lib/types"

interface LessonBrowserProps {
  onSelectLesson: (lesson: Lesson) => void
}

export function LessonBrowser({ onSelectLesson }: LessonBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const { progress } = useProgress()

  const completedLessonIds = progress.lessonsCompleted.filter((lp) => lp.completed).map((lp) => lp.lessonId)
  const availableLessons = getAvailableLessons(completedLessonIds)

  const filteredLessons = CURRICULUM.filter((lesson) => {
    const matchesSearch =
      searchQuery === "" ||
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = selectedLevel === null || lesson.level === selectedLevel
    return matchesSearch && matchesLevel
  })

  const getLessonStatus = (lesson: Lesson) => {
    const isCompleted = completedLessonIds.includes(lesson.id)
    const isAvailable = availableLessons.some((l) => l.id === lesson.id)
    const isInProgress = progress.lessonsCompleted.some((lp) => lp.lessonId === lesson.id && !lp.completed)

    if (isCompleted) return "completed"
    if (isInProgress) return "in-progress"
    if (isAvailable) return "available"
    return "locked"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-2xl flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Lesson Browser
          </CardTitle>
          <CardDescription>
            Explore {CURRICULUM.length} lessons across 5 levels, from foundations to mastery
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="all" onValueChange={(v) => setSelectedLevel(v === "all" ? null : Number.parseInt(v))}>
            <TabsList className="grid grid-cols-6 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="1">Level 1</TabsTrigger>
              <TabsTrigger value="2">Level 2</TabsTrigger>
              <TabsTrigger value="3">Level 3</TabsTrigger>
              <TabsTrigger value="4">Level 4</TabsTrigger>
              <TabsTrigger value="5">Level 5</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLessons.map((lesson) => {
          const status = getLessonStatus(lesson)
          const isLocked = status === "locked"

          return (
            <Card
              key={lesson.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isLocked ? "opacity-60" : ""
              } ${status === "completed" ? "border-green-500/30 bg-green-500/5" : ""}`}
              onClick={() => !isLocked && onSelectLesson(lesson)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        Level {lesson.level}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {lesson.difficulty}
                      </Badge>
                      {status === "completed" && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                      {status === "locked" && <Lock className="w-4 h-4 text-muted-foreground" />}
                      {status === "in-progress" && <Flag className="w-4 h-4 text-orange-500" />}
                    </div>
                    <CardTitle className="text-lg font-serif">{lesson.title}</CardTitle>
                    <CardDescription className="text-sm mt-1">{lesson.description}</CardDescription>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-xs text-muted-foreground">XP</div>
                    <div className="text-lg font-bold text-primary">+{lesson.xpReward}</div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      {filteredLessons.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-muted-foreground">No lessons found matching your search.</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
