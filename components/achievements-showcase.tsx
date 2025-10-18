"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lock } from "lucide-react"
import type { Achievement } from "@/lib/types"

interface AchievementsShowcaseProps {
  achievements: Achievement[]
}

export function AchievementsShowcase({ achievements }: AchievementsShowcaseProps) {
  const unlocked = achievements.filter((a) => a.unlockedAt)
  const locked = achievements.filter((a) => !a.unlockedAt)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Achievements</CardTitle>
        <CardDescription>
          {unlocked.length} of {achievements.length} unlocked
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const isUnlocked = !!achievement.unlockedAt
            const progressPercent = (achievement.progress / achievement.target) * 100

            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  isUnlocked
                    ? "bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/30"
                    : "bg-muted/30 border-border"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`text-3xl ${isUnlocked ? "" : "opacity-30"}`}>
                    {isUnlocked ? achievement.icon : <Lock className="w-8 h-8 text-muted-foreground" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`font-semibold ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>
                        {achievement.name}
                      </div>
                      {isUnlocked && (
                        <Badge variant="secondary" className="text-xs">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">{achievement.description}</div>
                    {!isUnlocked && (
                      <div className="space-y-1">
                        <Progress value={progressPercent} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {achievement.progress} / {achievement.target}
                        </div>
                      </div>
                    )}
                    {isUnlocked && achievement.unlockedAt && (
                      <div className="text-xs text-muted-foreground">
                        Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
