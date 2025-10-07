"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Volume2, RotateCcw, BookOpen } from "lucide-react"
import { audioEngine } from "@/lib/audio-engine"
import { GALANT_SCHEMATA, getSchemaName, type GalantSchema, type GalantSchemaPattern } from "@/lib/partimenti-theory"
import { degreeToNote, buildChordFromFiguredBass } from "@/lib/figured-bass"

export function GalantSchemataTrainer() {
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [currentSchema, setCurrentSchema] = useState<GalantSchemaPattern | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<GalantSchema | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced" | "all">("all")
  const [showInfo, setShowInfo] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const filteredSchemata =
    difficulty === "all" ? GALANT_SCHEMATA : GALANT_SCHEMATA.filter((s) => s.difficulty === difficulty)

  const generateNewSchema = () => {
    if (filteredSchemata.length === 0) return

    const randomSchema = filteredSchemata[Math.floor(Math.random() * filteredSchemata.length)]
    setCurrentSchema(randomSchema)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const playCurrentSchema = async () => {
    console.log("[v0] playCurrentSchema called - currentSchema:", currentSchema)

    if (!currentSchema || isPlaying) {
      console.log("[v0] Skipping playback - no schema or already playing")
      return
    }

    setIsPlaying(true)
    setAudioError(null)

    try {
      for (let i = 0; i < currentSchema.bassLine.length; i++) {
        const degree = currentSchema.bassLine[i]
        const figures = currentSchema.figures[i][0]
        const bassNote = degreeToNote(degree)

        console.log("[v0] Playing schema step:", degree, "with figures:", figures)

        // Build proper chord from figured bass
        const chordNotes = buildChordFromFiguredBass(bassNote, 3, figures)

        await audioEngine.playChord(chordNotes, 0.8)

        if (i < currentSchema.bassLine.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 850))
        }
      }
      console.log("[v0] Schema playback completed")
    } catch (error) {
      console.error("[v0] Error playing schema:", error)
      setAudioError(error instanceof Error ? error.message : "Failed to play audio")
    } finally {
      setIsPlaying(false)
    }
  }

  const checkAnswer = () => {
    if (!selectedAnswer || !currentSchema) return

    setTotal(total + 1)
    if (selectedAnswer === currentSchema.name) {
      setScore(score + 1)
    }
    setShowFeedback(true)
  }

  const nextQuestion = () => {
    generateNewSchema()
  }

  useEffect(() => {
    generateNewSchema()
  }, [difficulty])

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0

  const schemaInfo: Record<GalantSchema, { composer: string; usage: string }> = {
    prinner: {
      composer: "Named by Robert Gjerdingen",
      usage: "Common in opening themes and transitions",
    },
    romanesca: {
      composer: "Ancient pattern, used by Corelli",
      usage: "Descending tetrachord, often in slow movements",
    },
    monte: {
      composer: "Ascending sequence",
      usage: "Creates tension and forward motion",
    },
    fonte: {
      composer: "Descending sequence",
      usage: "Often follows monte, provides resolution",
    },
    fenaroli: {
      composer: "Named after Fedele Fenaroli",
      usage: "Characteristic 7-6 suspension pattern",
    },
    quieszenza: {
      composer: "Resting pattern",
      usage: "Provides momentary pause or conclusion",
    },
    meyer: {
      composer: "Named by Gjerdingen",
      usage: "Opening gambit with characteristic leap",
    },
    jupiter: {
      composer: "From Mozart's Jupiter Symphony",
      usage: "Ascending pattern with strong character",
    },
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-serif text-3xl">Galant Schemata</CardTitle>
              <CardDescription className="text-base mt-2">
                Recognize the stock musical patterns used by 18th-century composers
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
                <BookOpen className="w-4 h-4" />
                <h4 className="font-semibold text-sm">About Schemata</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Galant schemata are stock musical patterns that 18th-century composers learned and used as building
                blocks. They were taught through partimento training and form the vocabulary of classical style.
              </p>
            </div>

            {currentSchema && showInfo && (
              <div className="bg-primary/10 p-4 rounded-lg border border-primary">
                <h4 className="font-semibold text-sm mb-2">{getSchemaName(currentSchema.name)}</h4>
                <p className="text-xs text-muted-foreground mb-2">{schemaInfo[currentSchema.name].composer}</p>
                <p className="text-xs text-muted-foreground">{schemaInfo[currentSchema.name].usage}</p>
              </div>
            )}
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

            {currentSchema && (
              <div className="text-center py-8 bg-muted/30 rounded-lg">
                <div className="mb-4">
                  <div className="flex justify-center gap-2 mb-4">
                    {currentSchema.bassLine.map((degree, idx) => (
                      <div
                        key={idx}
                        className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-mono font-bold"
                      >
                        {degree}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Bass line degrees</p>
                </div>
                <Button size="lg" onClick={playCurrentSchema} disabled={isPlaying} className="text-lg px-8">
                  <Volume2 className="w-5 h-5 mr-2" />
                  {isPlaying ? "Playing..." : "Play Schema"}
                </Button>
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-4">Identify the Schema</h3>
              <RadioGroup
                value={selectedAnswer || ""}
                onValueChange={(value) => setSelectedAnswer(value as GalantSchema)}
              >
                <div className="grid grid-cols-2 gap-3">
                  {filteredSchemata.map((schema) => (
                    <div
                      key={schema.name}
                      className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <RadioGroupItem value={schema.name} id={schema.name} />
                      <Label htmlFor={schema.name} className="cursor-pointer flex-1">
                        <div className="font-semibold">{getSchemaName(schema.name)}</div>
                        <div className="text-xs text-muted-foreground">{schema.description}</div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {showFeedback && currentSchema && (
              <div
                className={`p-4 rounded-lg ${selectedAnswer === currentSchema.name ? "bg-primary/10 border border-primary" : "bg-destructive/10 border border-destructive"}`}
              >
                <p className="font-semibold">{selectedAnswer === currentSchema.name ? "✓ Correct!" : "✗ Incorrect"}</p>
                <p className="text-sm mt-1">
                  The schema was: <strong>{getSchemaName(currentSchema.name)}</strong>
                </p>
                <p className="text-xs text-muted-foreground mt-2">{currentSchema.description}</p>
                <Button variant="link" size="sm" onClick={() => setShowInfo(!showInfo)} className="mt-2 p-0 h-auto">
                  {showInfo ? "Hide" : "Show"} more information
                </Button>
              </div>
            )}

            <div className="flex gap-3">
              {!showFeedback ? (
                <Button onClick={checkAnswer} disabled={!selectedAnswer} className="flex-1">
                  Check Answer
                </Button>
              ) : (
                <Button onClick={nextQuestion} className="flex-1">
                  Next Schema
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  setScore(0)
                  setTotal(0)
                  generateNewSchema()
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
