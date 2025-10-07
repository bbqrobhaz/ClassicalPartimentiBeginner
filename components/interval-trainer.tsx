"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Volume2, RotateCcw, Play, CheckCircle, XCircle } from "lucide-react"
import { audioEngine } from "@/lib/audio-engine"
import {
  INTERVALS,
  getIntervalName,
  noteToFrequency,
  getIntervalFrequency,
  type Interval,
} from "@/lib/partimenti-theory"

interface IntervalTrainerProps {
  onProgressUpdate?: (correct: number, total: number, streak: number) => void
}

export function IntervalTrainer({ onProgressUpdate }: IntervalTrainerProps) {
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [streak, setStreak] = useState(0)
  const [currentInterval, setCurrentInterval] = useState<Interval | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<Interval | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)

  const generateNewInterval = () => {
    const enabled = INTERVALS.filter((i) => enabledIntervals.includes(i.name))
    if (enabled.length === 0) return

    const randomInterval = enabled[Math.floor(Math.random() * enabled.length)]
    setCurrentInterval(randomInterval.name)
    setSelectedAnswer(null)
    setShowAnswer(false)
  }

  const playCurrentInterval = async () => {
    console.log("[v0] playCurrentInterval called - currentInterval:", currentInterval, "isPlaying:", isPlaying)

    if (!currentInterval || isPlaying) {
      console.log("[v0] Skipping playback - no interval or already playing")
      return
    }

    setIsPlaying(true)
    setAudioError(null) // Clear previous errors

    try {
      const interval = INTERVALS.find((i) => i.name === currentInterval)
      if (!interval) {
        console.log("[v0] Interval not found:", currentInterval)
        return
      }

      const rootFreq = noteToFrequency("C", 4)
      const intervalFreq = getIntervalFrequency("C", 4, interval.semitones)

      console.log("[v0] Playing interval - root:", rootFreq, "interval:", intervalFreq)

      const actualDirection = direction === "both" ? (Math.random() > 0.5 ? "ascending" : "descending") : direction

      if (playbackMode === "harmonic" || playbackMode === "both") {
        await audioEngine.playInterval(rootFreq, intervalFreq, "harmonic")
      }

      if (playbackMode === "melodic" || playbackMode === "both") {
        if (playbackMode === "both") {
          await new Promise((resolve) => setTimeout(resolve, 800))
        }
        await audioEngine.playInterval(rootFreq, intervalFreq, "melodic")
      }

      console.log("[v0] Interval playback completed")
    } catch (error) {
      console.error("[v0] Error playing interval:", error)
      setAudioError(error instanceof Error ? error.message : "Failed to play audio")
    } finally {
      setIsPlaying(false)
    }
  }

  const checkAnswer = () => {
    if (!selectedAnswer || !currentInterval) return

    const isCorrect = selectedAnswer === currentInterval
    const newScore = {
      correct: score.correct + (isCorrect ? 1 : 0),
      total: score.total + 1,
    }
    const newStreak = isCorrect ? streak + 1 : 0

    setScore(newScore)
    setStreak(newStreak)
    setShowAnswer(true)

    if (onProgressUpdate) {
      onProgressUpdate(newScore.correct, newScore.total, newStreak)
    }
  }

  const nextQuestion = () => {
    generateNewInterval()
  }

  const resetScore = () => {
    setScore({ correct: 0, total: 0 })
    setStreak(0)
    generateNewInterval()
  }

  useEffect(() => {
    generateNewInterval()
  }, [])

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0

  const toggleInterval = (interval: Interval) => {
    if (enabledIntervals.includes(interval)) {
      setEnabledIntervals(enabledIntervals.filter((i) => i !== interval))
    } else {
      setEnabledIntervals([...enabledIntervals, interval])
    }
  }

  // Settings
  const [playbackMode, setPlaybackMode] = useState<"harmonic" | "melodic" | "both">("harmonic")
  const [direction, setDirection] = useState<"ascending" | "descending" | "both">("ascending")
  const [enabledIntervals, setEnabledIntervals] = useState<Interval[]>([
    "unison",
    "minor-2nd",
    "major-2nd",
    "minor-3rd",
    "major-3rd",
    "perfect-4th",
    "tritone",
    "perfect-5th",
    "minor-6th",
    "major-6th",
    "minor-7th",
    "major-7th",
    "octave",
  ])

  return (
    <div className="space-y-6">
      {/* Score Display */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{accuracy}%</div>
              <div className="text-sm text-muted-foreground mt-1">Accuracy</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">
                {score.correct}/{score.total}
              </div>
              <div className="text-sm text-muted-foreground mt-1">Score</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">{streak}</div>
              <div className="text-sm text-muted-foreground mt-1">Current Streak</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Exercise Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Playback Mode */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Playback Mode</Label>
              <RadioGroup value={playbackMode} onValueChange={(value: any) => setPlaybackMode(value)}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="harmonic" id="harmonic" />
                    <Label htmlFor="harmonic" className="cursor-pointer text-sm">
                      Harmonic (together)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="melodic" id="melodic" />
                    <Label htmlFor="melodic" className="cursor-pointer text-sm">
                      Melodic (sequence)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both" className="cursor-pointer text-sm">
                      Both
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Direction */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Direction</Label>
              <RadioGroup value={direction} onValueChange={(value: any) => setDirection(value)}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ascending" id="ascending" />
                    <Label htmlFor="ascending" className="cursor-pointer text-sm">
                      Ascending
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="descending" id="descending" />
                    <Label htmlFor="descending" className="cursor-pointer text-sm">
                      Descending
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="dir-both" />
                    <Label htmlFor="dir-both" className="cursor-pointer text-sm">
                      Both (random)
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Enabled Intervals */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Enabled Intervals</Label>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {INTERVALS.map((interval) => (
                  <div key={interval.name} className="flex items-center justify-between py-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`interval-${interval.name}`}
                        checked={enabledIntervals.includes(interval.name)}
                        onCheckedChange={() => toggleInterval(interval.name)}
                      />
                      <Label htmlFor={`interval-${interval.name}`} className="cursor-pointer text-sm">
                        {getIntervalName(interval.name)}
                      </Label>
                    </div>
                    <Badge
                      variant={
                        interval.difficulty === "easy"
                          ? "default"
                          : interval.difficulty === "medium"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {interval.difficulty}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-primary" />
              Current Exercise
            </CardTitle>
            <CardDescription>Listen carefully and identify the interval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {audioError && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive">
                <p className="text-sm font-semibold text-destructive">Audio Error</p>
                <p className="text-xs text-muted-foreground mt-1">{audioError}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Audio samples are blocked in preview. Please publish to production to enable audio.
                </p>
              </div>
            )}

            {/* Play Button */}
            <div className="flex justify-center py-8">
              <Button
                size="lg"
                onClick={playCurrentInterval}
                disabled={!currentInterval || isPlaying}
                className="text-lg px-12 py-6 h-auto"
              >
                {isPlaying ? (
                  <>
                    <Play className="w-6 h-6 mr-2 animate-pulse" />
                    Playing...
                  </>
                ) : (
                  <>
                    <Volume2 className="w-6 h-6 mr-2" />
                    Play Interval
                  </>
                )}
              </Button>
            </div>

            {/* Answer Options */}
            <div>
              <Label className="text-sm font-semibold mb-4 block">Select the Interval</Label>
              <RadioGroup
                value={selectedAnswer || ""}
                onValueChange={(value) => !showAnswer && setSelectedAnswer(value as Interval)}
                disabled={showAnswer}
              >
                <div className="grid grid-cols-2 gap-3">
                  {INTERVALS.filter((i) => enabledIntervals.includes(i.name)).map((interval) => (
                    <div
                      key={interval.name}
                      className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                        showAnswer && interval.name === currentInterval
                          ? "bg-primary/10 border-primary"
                          : showAnswer && interval.name === selectedAnswer
                            ? "bg-destructive/10 border-destructive"
                            : "hover:bg-muted/50"
                      }`}
                    >
                      <RadioGroupItem value={interval.name} id={`answer-${interval.name}`} disabled={showAnswer} />
                      <Label htmlFor={`answer-${interval.name}`} className="cursor-pointer flex-1">
                        {getIntervalName(interval.name)}
                      </Label>
                      {showAnswer && interval.name === currentInterval && (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      )}
                      {showAnswer && interval.name === selectedAnswer && interval.name !== currentInterval && (
                        <XCircle className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Feedback */}
            {showAnswer && (
              <div
                className={`p-4 rounded-lg border ${
                  selectedAnswer === currentInterval
                    ? "bg-primary/10 border-primary/20"
                    : "bg-destructive/10 border-destructive/20"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {selectedAnswer === currentInterval ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-primary">Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-destructive" />
                      <span className="font-semibold text-destructive">Incorrect</span>
                    </>
                  )}
                </div>
                <p className="text-sm">
                  The interval was: <strong>{currentInterval && getIntervalName(currentInterval)}</strong>
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!showAnswer ? (
                <Button onClick={checkAnswer} disabled={!selectedAnswer} className="flex-1" size="lg">
                  Check Answer
                </Button>
              ) : (
                <Button onClick={nextQuestion} className="flex-1" size="lg">
                  Next Interval →
                </Button>
              )}
              <Button variant="outline" onClick={resetScore} size="lg">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{accuracy}% accuracy</span>
              </div>
              <Progress value={accuracy} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
