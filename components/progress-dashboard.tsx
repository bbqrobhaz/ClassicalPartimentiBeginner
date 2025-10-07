import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useProgress } from "@/lib/progress-context"
import { CURRICULUM, SKILL_LEVELS } from "@/lib/curriculum"
import { Trophy, Target, Flame, Clock, BookOpen, Award, TrendingUp, Calendar } from "lucide-react"
import { AchievementsShowcase } from "@/components/achievements-showcase"
import { StreakDisplay } from "@/components/streak-display"

export function ProgressDashboard() {
  const { progress } = useProgress()

  const totalLessons = CURRICULUM.length
  const completedLessons = progress.lessonsCompleted.filter((lp) => lp.completed).length
  const inProgressLessons = progress.lessonsCompleted.filter((lp) => lp.inProgress && !lp.completed).length
  const completionPercentage = (completedLessons / totalLessons) * 100

  // Calculate lessons by level
  const lessonsByLevel = CURRICULUM.reduce(
    (acc, lesson) => {
      acc[lesson.level] = (acc[lesson.level] || 0) + 1
      return acc
    },
    {} as Record<number, number>,
  )

  const completedByLevel = progress.lessonsCompleted
    .filter((lp) => lp.completed)
    .reduce(
      (acc, lp) => {
        const lesson = CURRICULUM.find((l) => l.id === lp.lessonId)
        if (lesson) {
          acc[lesson.level] = (acc[lesson.level] || 0) + 1
        }
        return acc
      },
      {} as Record<number, number>,
    )

  // Calculate lessons by tradition
  const italianLessons = CURRICULUM.filter((l) => l.tradition === "Italian").length
  const germanLessons = CURRICULUM.filter((l) => l.tradition === "German").length
  const completedItalian = progress.lessonsCompleted.filter((lp) => {
    const lesson = CURRICULUM.find((l) => l.id === lp.lessonId)
    return lesson?.tradition === "Italian" && lp.completed
  }).length
  const completedGerman = progress.lessonsCompleted.filter((lp) => {
    const lesson = CURRICULUM.find((l) => l.id === lp.lessonId)
    return lesson?.tradition === "German" && lp.completed
  }).length

  const italianPercentage = (completedItalian / italianLessons) * 100
  const germanPercentage = (completedGerman / germanLessons) * 100

  // Calculate time stats
  const totalMinutes = Math.floor(progress.totalPracticeTime / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  // XP to next level
  const currentLevel = progress.currentLevel
  const nextLevel = SKILL_LEVELS.find((l) => l.level === currentLevel.level + 1)
  const xpToNext = nextLevel ? nextLevel.minXP - progress.totalXP : 0
  const xpProgress = nextLevel
    ? ((progress.totalXP - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100
    : 100

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total XP</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.totalXP.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {xpToNext > 0
                ? `${xpToNext.toLocaleString()} XP to level ${currentLevel.level + 1}`
                : "Max level reached"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedLessons}/{totalLessons}
            </div>
            <p className="text-xs text-muted-foreground">{completionPercentage.toFixed(1)}% complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.streak} days</div>
            <p className="text-xs text-muted-foreground">Best: {progress.longestStreak} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Practice Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {hours}h {minutes}m
            </div>
            <p className="text-xs text-muted-foreground">Total time invested</p>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Level Progress
          </CardTitle>
          <CardDescription>
            Current Level: {currentLevel.name} (Level {currentLevel.level})
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>XP Progress</span>
              <span className="font-medium">
                {progress.totalXP.toLocaleString()} / {nextLevel?.minXP.toLocaleString() || "MAX"}
              </span>
            </div>
            <Progress value={xpProgress} className="h-3" />
          </div>
          <p className="text-sm text-muted-foreground">{currentLevel.description}</p>
        </CardContent>
      </Card>

      {/* Tradition Progress */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Italian Tradition</CardTitle>
            <CardDescription>Partimenti, Galant Schemata, Fenaroli Method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">
                  {completedItalian}/{italianLessons}
                </span>
              </div>
              <Progress value={italianPercentage} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">{italianPercentage.toFixed(1)}% mastered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">German Tradition</CardTitle>
            <CardDescription>Griffe, Satzmodelle, Thoroughbass</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">
                  {completedGerman}/{germanLessons}
                </span>
              </div>
              <Progress value={germanPercentage} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">{germanPercentage.toFixed(1)}% mastered</p>
          </CardContent>
        </Card>
      </div>

      {/* Level Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Progress by Level
          </CardTitle>
          <CardDescription>Track your advancement through each skill level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {SKILL_LEVELS.slice(0, 5).map((level) => {
            const total = lessonsByLevel[level.level] || 0
            const completed = completedByLevel[level.level] || 0
            const percentage = total > 0 ? (completed / total) * 100 : 0

            return (
              <div key={level.level} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={progress.currentLevel.level === level.level ? "default" : "outline"}>
                      Level {level.level}
                    </Badge>
                    <span className="font-medium">{level.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {completed}/{total}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Streak Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Practice Streak
          </CardTitle>
          <CardDescription>Keep your daily practice streak alive</CardDescription>
        </CardHeader>
        <CardContent>
          <StreakDisplay streak={progress.streak} lastPracticeDate={progress.lastPracticeDate} />
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
          <CardDescription>
            Unlocked {progress.achievements.length} of {progress.achievements.length + 10} achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AchievementsShowcase />
        </CardContent>
      </Card>
    </div>
  )
}
