"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Volume2, RotateCcw, Sparkles } from "lucide-react"
import { audioEngine } from "@/lib/audio-engine"
import { DECORATION_PATTERNS, type DecorationType, type DecorationPattern } from "@/lib/partimenti-theory"

export function DiminutionTrainer() {
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [currentDecoration, setCurrentDecoration] = useState<DecorationPattern | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<DecorationType | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced" | "all">("all")
  const [playbackSpeed, setPlaybackSpeed] = useState<"slow" | "medium" | "fast">("medium")
  const [audioError, setAudioError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const filteredDecorations =
    difficulty === "all" ? DECORATION_PATTERNS : DECORATION_PATTERNS.filter((d) => d.difficulty === difficulty)

  const generateNewDecoration = () => {
    if (filteredDecorations.length === 0) return

    const randomDecoration = filteredDecorations[Math.floor(Math.random() * filteredDecorations.length)]
    setCurrentDecoration(randomDecoration)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const playCurrentDecoration = async () => {
    console.log("[v0] playCurrentDecoration called - currentDecoration:", currentDecoration)

    if (!currentDecoration || isPlaying) {
      console.log("[v0] Skipping playback - no decoration or already playing")
      return
    }

    setIsPlaying(true)
    setAudioError(null)

    try {
      const noteToFrequency = (note: string, octave: number): number => {
        const A4 = 440
        const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
        const noteIndex = notes.indexOf(note)
        if (noteIndex === -1) throw new Error(`Invalid note: ${note}`)
        const halfSteps = octave * 12 + noteIndex
        const halfStepsFromA4 = halfSteps - (4 * 12 + 9)
        return A4 * Math.pow(2, halfStepsFromA4 / 12)
      }

      const speedMap = {
        slow: 0.6,
        medium: 0.4,
        fast: 0.25,
      }

      const noteDuration = speedMap[playbackSpeed]

      for (let i = 0; i < currentDecoration.pattern.length; i++) {
        const noteName = currentDecoration.pattern[i]
        const frequency = noteToFrequency(noteName, 4)

        console.log("[v0] Playing decoration note:", noteName, "at", frequency, "Hz")

        // Try to play the note, but continue even if it fails
        try {
          await audioEngine.playNote(frequency, noteDuration)
        } catch (error) {
          console.error(`[v0] Failed to play ${noteName}, continuing sequence...`)
        }

        if (i < currentDecoration.pattern.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, noteDuration * 1000))
        }
      }
      console.log("[v0] Decoration playback completed")
    } catch (error) {
      console.error("[v0] Error playing decoration:", error)
      setAudioError(error instanceof Error ? error.message : "Failed to play audio")
    } finally {
      setIsPlaying(false)
    }
  }

  const checkAnswer = () => {
    if (!selectedAnswer || !currentDecoration) return

    setTotal(total + 1)
    if (selectedAnswer === currentDecoration.type) {
      setScore(score + 1)
    }
    setShowFeedback(true)
  }

  const nextQuestion = () => {
    generateNewDecoration()
  }

  useEffect(() => {
    generateNewDecoration()
  }, [difficulty])

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0

  const getDecorationName = (type: DecorationType): string => {
    const names: Record<DecorationType, string> = {
      turn: "Turn",
      appoggiatura: "Appoggiatura",
      acciaccatura: "Acciaccatura",
      "passing-note": "Passing Note",
      "neighbor-note": "Neighbor Note",
      "escape-tone": "Escape Tone",
    }
    return names[type]
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-serif text-3xl">Diminutions & Decorations</CardTitle>
              <CardDescription className="text-base mt-2">
                Master the art of recognizing ornamental figures and melodic embellishments
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

            <div>
              <h3 className="font-semibold mb-3">Playback Speed</h3>
              <div className="space-y-2">
                {(["slow", "medium", "fast"] as const).map((speed) => (
                  <Button
                    key={speed}
                    variant={playbackSpeed === speed ? "default" : "outline"}
                    onClick={() => setPlaybackSpeed(speed)}
                    className="w-full justify-start"
                  >
                    {speed.charAt(0).toUpperCase() + speed.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-accent/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" />
                <h4 className="font-semibold text-sm">About Diminutions</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Diminutions are ornamental figures that embellish simple melodic lines. They were essential to baroque
                improvisation and were taught through partimento training.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="font-semibold">Turn:</p>
                <p className="text-muted-foreground">Note-above-note-below-note</p>
              </div>
              <div>
                <p className="font-semibold">Appoggiatura:</p>
                <p className="text-muted-foreground">Accented non-chord tone</p>
              </div>
              <div>
                <p className="font-semibold">Passing Note:</p>
                <p className="text-muted-foreground">Stepwise connection</p>
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

            {currentDecoration && (
              <div className="text-center py-8 bg-muted/30 rounded-lg">
                <div className="mb-6">
                  <div className="flex justify-center gap-2 mb-4 flex-wrap">
                    {currentDecoration.pattern.map((note, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-mono font-bold">
                          {note}
                        </div>
                        {idx < currentDecoration.pattern.length - 1 && (
                          <div className="text-muted-foreground mx-1">→</div>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Melodic pattern</p>
                  <Badge variant="outline" className="mb-4">
                    Speed: {playbackSpeed}
                  </Badge>
                </div>
                <Button size="lg" onClick={playCurrentDecoration} disabled={isPlaying} className="text-lg px-8">
                  <Volume2 className="w-5 h-5 mr-2" />
                  {isPlaying ? "Playing..." : "Play Decoration"}
                </Button>
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-4">Identify the Decoration Type</h3>
              <RadioGroup
                value={selectedAnswer || ""}
                onValueChange={(value) => setSelectedAnswer(value as DecorationType)}
              >
                <div className="space-y-3">
                  {filteredDecorations.map((decoration) => (
                    <div
                      key={decoration.type}
                      className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <RadioGroupItem value={decoration.type} id={decoration.type} />
                      <Label htmlFor={decoration.type} className="cursor-pointer flex-1">
                        <div className="font-semibold">{getDecorationName(decoration.type)}</div>
                        <div className="text-xs text-muted-foreground mt-1">{decoration.description}</div>
                      </Label>
                      <Badge variant="outline">{decoration.difficulty}</Badge>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {showFeedback && currentDecoration && (
              <div
                className={`p-4 rounded-lg ${selectedAnswer === currentDecoration.type ? "bg-primary/10 border border-primary" : "bg-destructive/10 border border-destructive"}`}
              >
                <p className="font-semibold">
                  {selectedAnswer === currentDecoration.type ? "✓ Correct!" : "✗ Incorrect"}
                </p>
                <p className="text-sm mt-1">
                  The decoration was: <strong>{getDecorationName(currentDecoration.type)}</strong>
                </p>
                <p className="text-xs text-muted-foreground mt-2">{currentDecoration.description}</p>
                <p className="text-xs text-muted-foreground mt-2 font-mono">
                  Pattern: {currentDecoration.pattern.join(" → ")}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              {!showFeedback ? (
                <Button onClick={checkAnswer} disabled={!selectedAnswer} className="flex-1">
                  Check Answer
                </Button>
              ) : (
                <Button onClick={nextQuestion} className="flex-1">
                  Next Decoration
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  setScore(0)
                  setTotal(0)
                  generateNewDecoration()
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
