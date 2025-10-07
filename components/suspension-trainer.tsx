"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Volume2, RotateCcw, TrendingDown } from "lucide-react"
import { audioEngine } from "@/lib/audio-engine"
import { SUSPENSION_PATTERNS, type SuspensionType, type SuspensionPattern } from "@/lib/partimenti-theory"
import { buildSuspensionProgression } from "@/lib/figured-bass"

export function SuspensionTrainer() {
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [currentSuspension, setCurrentSuspension] = useState<SuspensionPattern | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<SuspensionType | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced" | "all">("all")
  const [audioError, setAudioError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const filteredSuspensions =
    difficulty === "all" ? SUSPENSION_PATTERNS : SUSPENSION_PATTERNS.filter((s) => s.difficulty === difficulty)

  const generateNewSuspension = () => {
    if (filteredSuspensions.length === 0) return

    const randomSuspension = filteredSuspensions[Math.floor(Math.random() * filteredSuspensions.length)]
    setCurrentSuspension(randomSuspension)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const playCurrentSuspension = async () => {
    console.log("[v0] playCurrentSuspension called - currentSuspension:", currentSuspension)

    if (!currentSuspension || isPlaying) {
      console.log("[v0] Skipping playback - no suspension or already playing")
      return
    }

    setIsPlaying(true)
    setAudioError(null)

    try {
      const progression = buildSuspensionProgression(currentSuspension.type, 3)

      // Play preparation
      console.log("[v0] Playing preparation")
      await audioEngine.playChord(progression.preparation, 0.8)

      await new Promise((resolve) => setTimeout(resolve, 850))

      // Play suspension (with dissonance)
      console.log("[v0] Playing suspension")
      await audioEngine.playChord(progression.suspension, 0.8)

      await new Promise((resolve) => setTimeout(resolve, 850))

      // Play resolution
      console.log("[v0] Playing resolution")
      await audioEngine.playChord(progression.resolution, 1.2)
      console.log("[v0] Suspension playback completed")
    } catch (error) {
      console.error("[v0] Error playing suspension:", error)
      setAudioError(error instanceof Error ? error.message : "Failed to play audio")
    } finally {
      setIsPlaying(false)
    }
  }

  const checkAnswer = () => {
    if (!selectedAnswer || !currentSuspension) return

    setTotal(total + 1)
    if (selectedAnswer === currentSuspension.type) {
      setScore(score + 1)
    }
    setShowFeedback(true)
  }

  const nextQuestion = () => {
    generateNewSuspension()
  }

  useEffect(() => {
    generateNewSuspension()
  }, [difficulty])

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-serif text-3xl">Suspension Recognition</CardTitle>
              <CardDescription className="text-base mt-2">
                Train your ear to identify different suspension patterns and their resolutions
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{accuracy}%</div>
              <div className="text-sm text-muted-foreground">
                Score: {score}/{total}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Difficulty Level</h3>
              <div className="space-y-2">
                {(["all", "beginner", "intermediate", "advanced"] as const).map((level) => (
                  <Button
                    key={level}
                    variant={difficulty === level ? "default" : "outline"}
                    onClick={() => setDifficulty(level)}
                    className="w-full justify-start"
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-accent/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4" />
                <h4 className="font-semibold text-sm">About Suspensions</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Suspensions create dissonance by holding a note from one chord into the next, then resolving downward by
                step. They follow the pattern: preparation → suspension → resolution.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="font-semibold font-mono">7-6:</p>
                <p className="text-muted-foreground">Seventh resolves to sixth</p>
              </div>
              <div>
                <p className="font-semibold font-mono">9-8:</p>
                <p className="text-muted-foreground">Ninth resolves to octave</p>
              </div>
              <div>
                <p className="font-semibold font-mono">4-3:</p>
                <p className="text-muted-foreground">Fourth resolves to third</p>
              </div>
              <div>
                <p className="font-semibold font-mono">2-3:</p>
                <p className="text-muted-foreground">Second resolves to third</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exercise */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Current Exercise
            </CardTitle>
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

            {currentSuspension && (
              <div className="text-center py-8 bg-muted/30 rounded-lg">
                <div className="mb-6">
                  <div className="flex justify-center items-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-2">Preparation</div>
                      <div className="w-20 h-20 rounded-lg bg-muted border-2 border-border flex items-center justify-center font-mono font-bold">
                        {currentSuspension.preparation}
                      </div>
                    </div>
                    <div className="text-2xl text-muted-foreground">→</div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-2">Suspension</div>
                      <div className="w-20 h-20 rounded-lg bg-destructive/20 border-2 border-destructive flex items-center justify-center font-mono font-bold">
                        ?
                      </div>
                    </div>
                    <div className="text-2xl text-muted-foreground">→</div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-2">Resolution</div>
                      <div className="w-20 h-20 rounded-lg bg-primary/20 border-2 border-primary flex items-center justify-center font-mono font-bold">
                        {currentSuspension.resolution}
                      </div>
                    </div>
                  </div>
                </div>
                <Button size="lg" onClick={playCurrentSuspension} disabled={isPlaying} className="text-lg px-8">
                  <Volume2 className="w-5 h-5 mr-2" />
                  {isPlaying ? "Playing..." : "Play Suspension"}
                </Button>
                <p className="text-xs text-muted-foreground mt-3">Listen for the dissonance and its resolution</p>
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-4">Identify the Suspension Type</h3>
              <RadioGroup
                value={selectedAnswer || ""}
                onValueChange={(value) => setSelectedAnswer(value as SuspensionType)}
              >
                <div className="grid grid-cols-2 gap-3">
                  {filteredSuspensions.map((suspension) => (
                    <div
                      key={suspension.type}
                      className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <RadioGroupItem value={suspension.type} id={suspension.type} />
                      <Label htmlFor={suspension.type} className="cursor-pointer flex-1">
                        <div className="font-semibold font-mono text-lg">{suspension.type}</div>
                        <div className="text-xs text-muted-foreground mt-1">{suspension.description}</div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {showFeedback && currentSuspension && (
              <div
                className={`p-4 rounded-lg ${selectedAnswer === currentSuspension.type ? "bg-primary/10 border border-primary" : "bg-destructive/10 border border-destructive"}`}
              >
                <p className="font-semibold">
                  {selectedAnswer === currentSuspension.type ? "✓ Correct!" : "✗ Incorrect"}
                </p>
                <p className="text-sm mt-1">
                  The suspension was: <strong className="font-mono">{currentSuspension.type}</strong>
                </p>
                <p className="text-xs text-muted-foreground mt-2">{currentSuspension.description}</p>
              </div>
            )}

            <div className="flex gap-3">
              {!showFeedback ? (
                <Button onClick={checkAnswer} disabled={!selectedAnswer} className="flex-1">
                  Check Answer
                </Button>
              ) : (
                <Button onClick={nextQuestion} className="flex-1">
                  Next Suspension
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  setScore(0)
                  setTotal(0)
                  generateNewSuspension()
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            <Progress value={accuracy} className="h-2" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
