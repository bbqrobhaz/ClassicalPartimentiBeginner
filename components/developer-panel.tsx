"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Code2, Zap, RotateCcw } from "lucide-react"
import { isDeveloperMode, setDeveloperMode, setXPAndStreak } from "@/lib/progress-storage"
import { useProgress } from "@/lib/progress-context"

export function DeveloperPanel() {
  const [devMode, setDevMode] = useState(false)
  const [xpInput, setXpInput] = useState("")
  const [streakInput, setStreakInput] = useState("")
  const { progress, refreshProgress } = useProgress()

  useEffect(() => {
    setDevMode(isDeveloperMode())
  }, [])

  const handleToggleDevMode = (enabled: boolean) => {
    setDeveloperMode(enabled)
    setDevMode(enabled)
    window.location.reload()
  }

  const handleSetProgress = () => {
    const xp = Number.parseInt(xpInput) || 0
    const streak = Number.parseInt(streakInput) || 0
    setXPAndStreak(xp, streak)
    refreshProgress()
    setXpInput("")
    setStreakInput("")
  }

  return (
    <Card className="border-orange-500/30 bg-orange-500/5">
      <CardHeader>
        <CardTitle className="font-serif text-xl flex items-center gap-2">
          <Code2 className="w-5 h-5 text-orange-500" />
          Developer Panel
        </CardTitle>
        <CardDescription>Testing tools for development and debugging</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="dev-mode" className="text-base font-semibold">
              Developer Mode
            </Label>
            <div className="text-sm text-muted-foreground">Unlock all lessons for testing</div>
          </div>
          <Switch id="dev-mode" checked={devMode} onCheckedChange={handleToggleDevMode} />
        </div>

        {devMode && (
          <Badge variant="destructive" className="w-full justify-center py-2">
            <Zap className="w-3 h-3 mr-1" />
            All lessons unlocked • Prerequisites bypassed
          </Badge>
        )}

        <div className="border-t border-border pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="xp-input">Set XP</Label>
            <Input
              id="xp-input"
              type="number"
              placeholder={`Current: ${progress.totalXP}`}
              value={xpInput}
              onChange={(e) => setXpInput(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="streak-input">Set Streak</Label>
            <Input
              id="streak-input"
              type="number"
              placeholder={`Current: ${progress.streak}`}
              value={streakInput}
              onChange={(e) => setStreakInput(e.target.value)}
            />
          </div>

          <Button onClick={handleSetProgress} className="w-full" variant="secondary">
            <RotateCcw className="w-4 h-4 mr-2" />
            Update Progress
          </Button>
        </div>

        <div className="text-xs text-muted-foreground border-t border-border pt-4">
          <div className="font-semibold mb-2">Current Progress:</div>
          <div className="space-y-1 font-mono">
            <div>XP: {progress.totalXP}</div>
            <div>Streak: {progress.streak} days</div>
            <div>Level: {progress.currentLevel.name}</div>
            <div>Completed: {progress.lessonsCompleted.filter((lp) => lp.completed).length} lessons</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
