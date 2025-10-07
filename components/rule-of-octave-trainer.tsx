"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Volume2, RotateCcw, ArrowUp, ArrowDown } from "lucide-react"
import { audioEngine } from "@/lib/audio-engine"
import { RULE_OF_OCTAVE_ASCENDING, RULE_OF_OCTAVE_DESCENDING, type RuleOfOctaveStep } from "@/lib/partimenti-theory"
import { buildChordFromFiguredBass } from "@/lib/figured-bass"

export function RuleOfOctaveTrainer() {
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [direction, setDirection] = useState<"ascending" | "descending">("ascending")
  const [currentStep, setCurrentStep] = useState<RuleOfOctaveStep | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showReference, setShowReference] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const currentScale = direction === "ascending" ? RULE_OF_OCTAVE_ASCENDING : RULE_OF_OCTAVE_DESCENDING

  const generateNewStep = () => {
    const scale = direction === "ascending" ? RULE_OF_OCTAVE_ASCENDING : RULE_OF_OCTAVE_DESCENDING
    const randomStep = scale[Math.floor(Math.random() * scale.length)]
    setCurrentStep(randomStep)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const playCurrentStep = async () => {
    console.log("[v0] playCurrentStep called - currentStep:", currentStep)

    if (!currentStep || isPlaying) {
      console.log("[v0] Skipping playback - no step or already playing")
      return
    }

    setIsPlaying(true)
    setAudioError(null)

    try {
      const noteMap: Record<string, string> = {
        Do: "C",
        Re: "D",
        Mi: "E",
        Fa: "F",
        Sol: "G",
        La: "A",
        Ti: "B",
      }

      const bassNote = noteMap[currentStep.bass]
      const figures = currentStep.figures[0]
      const chordNotes = buildChordFromFiguredBass(bassNote, 3, figures)

      console.log("[v0] Playing chord for step:", currentStep.bass, "with figures:", figures)
      await audioEngine.playChord(chordNotes, 1.5)
      console.log("[v0] Step playback completed")
    } catch (error) {
      console.error("[v0] Error playing step:", error)
      setAudioError(error instanceof Error ? error.message : "Failed to play audio")
    } finally {
      setIsPlaying(false)
    }
  }

  const checkAnswer = () => {
    if (!selectedAnswer || !currentStep) return

    setTotal(total + 1)
    if (selectedAnswer === currentStep.figures[0]) {
      setScore(score + 1)
    }
    setShowFeedback(true)
  }

  const nextQuestion = () => {
    generateNewStep()
  }

  useEffect(() => {
    generateNewStep()
  }, [direction])

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0

  const figuredBassOptions = ["5/3", "6/3", "6/4", "7/5/3", "6/5/3", "6/4/3", "6/4/2"]

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-serif text-3xl">Rule of the Octave</CardTitle>
              <CardDescription className="text-base mt-2">
                Master the fundamental bass harmonization pattern used throughout the baroque period
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
        {/* Settings & Reference */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Direction</h3>
              <div className="flex gap-2">
                <Button
                  variant={direction === "ascending" ? "default" : "outline"}
                  onClick={() => setDirection("ascending")}
                  className="flex-1"
                >
                  <ArrowUp className="w-4 h-4 mr-2" />
                  Ascending
                </Button>
                <Button
                  variant={direction === "descending" ? "default" : "outline"}
                  onClick={() => setDirection("descending")}
                  className="flex-1"
                >
                  <ArrowDown className="w-4 h-4 mr-2" />
                  Descending
                </Button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Reference Chart</h3>
                <Switch checked={showReference} onCheckedChange={setShowReference} />
              </div>

              {showReference && (
                <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                  <p className="font-semibold text-foreground mb-3">
                    {direction === "ascending" ? "Ascending" : "Descending"} Scale
                  </p>
                  {currentScale.map((step) => (
                    <div
                      key={step.degree}
                      className="flex justify-between items-center py-1 border-b border-border last:border-0"
                    >
                      <span className="font-mono">
                        {step.degree}. {step.bass}
                      </span>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {step.figures[0]}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-accent/10 p-4 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">About the Rule</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The Rule of the Octave is a fundamental pattern for harmonizing a scale in the bass. It was taught by
                masters like Fedele Fenaroli and forms the foundation of partimento training.
              </p>
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

            {currentStep && (
              <div className="text-center py-8 bg-muted/30 rounded-lg">
                <div className="text-6xl font-serif font-bold text-primary mb-4">{currentStep.bass}</div>
                <p className="text-muted-foreground mb-4">
                  Scale degree: {currentStep.degree} ({direction})
                </p>
                <Button size="lg" onClick={playCurrentStep} disabled={isPlaying} className="text-lg px-8">
                  <Volume2 className="w-5 h-5 mr-2" />
                  {isPlaying ? "Playing..." : "Play Harmony"}
                </Button>
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-4">Select the Figured Bass</h3>
              <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer}>
                <div className="grid grid-cols-2 gap-3">
                  {figuredBassOptions.map((figure) => (
                    <div
                      key={figure}
                      className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <RadioGroupItem value={figure} id={figure} />
                      <Label htmlFor={figure} className="cursor-pointer font-mono text-lg flex-1">
                        {figure}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {showFeedback && currentStep && (
              <div
                className={`p-4 rounded-lg ${selectedAnswer === currentStep.figures[0] ? "bg-primary/10 border border-primary" : "bg-destructive/10 border border-destructive"}`}
              >
                <p className="font-semibold">
                  {selectedAnswer === currentStep.figures[0] ? "✓ Correct!" : "✗ Incorrect"}
                </p>
                <p className="text-sm mt-1">
                  The figured bass for <strong>{currentStep.bass}</strong> (degree {currentStep.degree}) is:{" "}
                  <strong className="font-mono">{currentStep.figures[0]}</strong>
                </p>
                <p className="text-xs text-muted-foreground mt-2">{currentStep.description}</p>
              </div>
            )}

            <div className="flex gap-3">
              {!showFeedback ? (
                <Button onClick={checkAnswer} disabled={!selectedAnswer} className="flex-1">
                  Check Answer
                </Button>
              ) : (
                <Button onClick={nextQuestion} className="flex-1">
                  Next Step
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  setScore(0)
                  setTotal(0)
                  generateNewStep()
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
