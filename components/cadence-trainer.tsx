"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Volume2, RotateCcw, Info } from "lucide-react"
import { audioEngine } from "@/lib/audio-engine"
import { CADENCE_PATTERNS, type CadenceType, type CadencePattern } from "@/lib/partimenti-theory"
import { degreeToNote, buildChordFromFiguredBass } from "@/lib/figured-bass"

export function CadenceTrainer() {
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [currentCadence, setCurrentCadence] = useState<CadencePattern | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<CadenceType | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced" | "all">("all")
  const [audioError, setAudioError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const filteredCadences =
    difficulty === "all" ? CADENCE_PATTERNS : CADENCE_PATTERNS.filter((c) => c.difficulty === difficulty)

  const generateNewCadence = () => {
    if (filteredCadences.length === 0) return

    const randomCadence = filteredCadences[Math.floor(Math.random() * filteredCadences.length)]
    setCurrentCadence(randomCadence)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const playCurrentCadence = async () => {
    console.log("[v0] playCurrentCadence called - currentCadence:", currentCadence)

    if (!currentCadence || isPlaying) {
      console.log("[v0] Skipping playback - no cadence or already playing")
      return
    }

    setIsPlaying(true)
    setAudioError(null)

    try {
      for (let i = 0; i < currentCadence.bassLine.length; i++) {
        const degree = currentCadence.bassLine[i]
        const figures = currentCadence.figures[i][0]
        const bassNote = degreeToNote(degree)

        console.log("[v0] Playing cadence chord for degree:", degree, "with figures:", figures)

        const chordNotes = buildChordFromFiguredBass(bassNote, 3, figures)
        console.log("[v0] Chord notes to play:", chordNotes)

        const duration = i === currentCadence.bassLine.length - 1 ? 1.5 : 0.8

        await audioEngine.playChord(chordNotes, duration)

        if (i < currentCadence.bassLine.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 850))
        }
      }
      console.log("[v0] Cadence playback completed")
    } catch (error) {
      console.error("[v0] Error playing cadence:", error)
      setAudioError(error instanceof Error ? error.message : "Failed to play audio")
    } finally {
      setIsPlaying(false)
    }
  }

  const checkAnswer = () => {
    if (!selectedAnswer || !currentCadence) return

    setTotal(total + 1)
    if (selectedAnswer === currentCadence.type) {
      setScore(score + 1)
    }
    setShowFeedback(true)
  }

  const nextQuestion = () => {
    generateNewCadence()
  }

  useEffect(() => {
    generateNewCadence()
  }, [difficulty])

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0

  const getCadenceName = (type: CadenceType): string => {
    const names: Record<CadenceType, string> = {
      "simple-authentic": "Simple Authentic",
      "compound-authentic": "Compound Authentic",
      "half-cadence": "Half Cadence",
      deceptive: "Deceptive Cadence",
      evaded: "Evaded Cadence",
      phrygian: "Phrygian Cadence",
      plagal: "Plagal Cadence",
    }
    return names[type]
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-serif text-3xl">Cadence Recognition</CardTitle>
              <CardDescription className="text-base mt-2">
                Master the art of identifying different types of cadential formulas
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
                <Info className="w-4 h-4" />
                <h4 className="font-semibold text-sm">About Cadences</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cadences are formulaic endings that provide closure or continuation. They are essential to understanding
                phrase structure in classical music.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="font-semibold">Authentic:</p>
                <p className="text-muted-foreground">V-I, provides strong closure</p>
              </div>
              <div>
                <p className="font-semibold">Half:</p>
                <p className="text-muted-foreground">Ends on V, creates expectation</p>
              </div>
              <div>
                <p className="font-semibold">Deceptive:</p>
                <p className="text-muted-foreground">V-vi, avoids expected resolution</p>
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

            {currentCadence && (
              <div className="text-center py-8 bg-muted/30 rounded-lg">
                <div className="mb-4">
                  <div className="flex justify-center gap-3 mb-4">
                    {currentCadence.bassLine.map((degree, idx) => (
                      <div key={idx}>
                        <div className="w-16 h-16 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-mono font-bold text-xl">
                          {degree}
                        </div>
                        {idx < currentCadence.bassLine.length - 1 && (
                          <div className="text-2xl text-muted-foreground mt-1">→</div>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Bass line progression</p>
                </div>
                <Button size="lg" onClick={playCurrentCadence} disabled={isPlaying} className="text-lg px-8">
                  <Volume2 className="w-5 h-5 mr-2" />
                  {isPlaying ? "Playing..." : "Play Cadence"}
                </Button>
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-4">Identify the Cadence Type</h3>
              <RadioGroup
                value={selectedAnswer || ""}
                onValueChange={(value) => setSelectedAnswer(value as CadenceType)}
              >
                <div className="space-y-3">
                  {filteredCadences.map((cadence) => (
                    <div
                      key={cadence.type}
                      className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <RadioGroupItem value={cadence.type} id={cadence.type} />
                      <Label htmlFor={cadence.type} className="cursor-pointer flex-1">
                        <div className="font-semibold">{getCadenceName(cadence.type)}</div>
                        <div className="text-xs text-muted-foreground mt-1">{cadence.description}</div>
                      </Label>
                      <Badge variant="outline">{cadence.difficulty}</Badge>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {showFeedback && currentCadence && (
              <div
                className={`p-4 rounded-lg ${selectedAnswer === currentCadence.type ? "bg-primary/10 border border-primary" : "bg-destructive/10 border border-destructive"}`}
              >
                <p className="font-semibold">{selectedAnswer === currentCadence.type ? "✓ Correct!" : "✗ Incorrect"}</p>
                <p className="text-sm mt-1">
                  The cadence was: <strong>{getCadenceName(currentCadence.type)}</strong>
                </p>
                <p className="text-xs text-muted-foreground mt-2">{currentCadence.description}</p>
              </div>
            )}

            <div className="flex gap-3">
              {!showFeedback ? (
                <Button onClick={checkAnswer} disabled={!selectedAnswer} className="flex-1">
                  Check Answer
                </Button>
              ) : (
                <Button onClick={nextQuestion} className="flex-1">
                  Next Cadence
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  setScore(0)
                  setTotal(0)
                  generateNewCadence()
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
