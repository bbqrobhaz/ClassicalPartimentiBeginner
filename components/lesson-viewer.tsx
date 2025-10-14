"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, ChevronLeft, BookOpen, Play, CheckCircle2 } from "lucide-react"
import type { Lesson } from "@/lib/types"
import { useProgress } from "@/lib/progress-context"
import { audioEngine } from "@/lib/audio-engine"
import PlayAlongExercise from "@/components/play-along-exercise" // Import the new component
import VirtualPiano from "@/components/virtual-piano" // Import VirtualPiano for exercise integration

interface LessonViewerProps {
  lesson: Lesson
  onComplete: () => void
  onNext: () => void
  onPrevious: () => void
  hasNext: boolean
  hasPrevious: boolean
}

export function LessonViewer({ lesson, onComplete, onNext, onPrevious, hasNext, hasPrevious }: LessonViewerProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [textAnswer, setTextAnswer] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const randomizedExercises = useMemo(() => {
    const exercises = [...lesson.content.exercises]
    // Fisher-Yates shuffle algorithm
    for (let i = exercises.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[exercises[i], exercises[j]] = [exercises[j], exercises[i]]
    }
    return exercises
  }, [lesson.id]) // Re-randomize when lesson changes

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [exerciseResults, setExerciseResults] = useState<boolean[]>([])
  const [showTheory, setShowTheory] = useState(true)
  const [startTime] = useState(Date.now())
  const { progress, recordLessonCompletion, addExperience, checkAndUnlockAchievements } = useProgress()

  const isCompleted = progress.lessonsCompleted.find((lp) => lp.lessonId === lesson.id)?.completed || false
  const currentExercise = randomizedExercises[currentExerciseIndex]
  const totalExercises = randomizedExercises.length
  const attemptedExercises = exerciseResults.length
  const correctExercises = exerciseResults.filter(Boolean).length

  const handleExerciseComplete = (correct: boolean) => {
    console.log("[v0] handleExerciseComplete called:", { correct, currentExerciseIndex, totalExercises })
    const newResults = [...exerciseResults]
    newResults[currentExerciseIndex] = correct
    setExerciseResults(newResults)

    if (currentExerciseIndex < totalExercises - 1) {
      console.log("[v0] Advancing to next exercise:", currentExerciseIndex + 1)
      setCurrentExerciseIndex(currentExerciseIndex + 1)
    } else {
      console.log("[v0] Lesson complete! Calculating score...")
      const score = (newResults.filter(Boolean).length / totalExercises) * 100
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      recordLessonCompletion(lesson.id, score, timeSpent)
      if (score >= 70) {
        addExperience(lesson.xpReward)
        checkAndUnlockAchievements()
      }
      onComplete()
    }
  }

  const playExample = async (audioPattern: string[]) => {
    try {
      for (const note of audioPattern) {
        let noteName: string
        let octave: number

        if (note.length > 1 && !isNaN(Number.parseInt(note[note.length - 1]))) {
          // Note includes octave number (e.g., "C4", "C#5")
          noteName = note.slice(0, -1)
          octave = Number.parseInt(note[note.length - 1])
        } else {
          // Legacy format without octave, default to 4
          noteName = note
          octave = 4
        }

        await audioEngine.playNote(audioEngine.noteToFrequency(noteName, octave), 0.5)
        await new Promise((resolve) => setTimeout(resolve, 600))
      }
    } catch (error) {
      console.error("[v0] Failed to play example:", error)
    }
  }

  const playExerciseAudio = async () => {
    if (!currentExercise?.audioPattern || isPlaying) return

    setIsPlaying(true)
    try {
      for (const note of currentExercise.audioPattern) {
        let noteName: string
        let octave: number

        if (note.length > 1 && !isNaN(Number.parseInt(note[note.length - 1]))) {
          noteName = note.slice(0, -1)
          octave = Number.parseInt(note[note.length - 1])
        } else {
          noteName = note
          octave = 4
        }

        await audioEngine.playNote(audioEngine.noteToFrequency(noteName, octave), 0.5)
        await new Promise((resolve) => setTimeout(resolve, 600))
      }
    } catch (error) {
      console.error("[v0] Failed to play exercise audio:", error)
    } finally {
      setIsPlaying(false)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        setAudioBlob(blob)
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("[v0] Failed to start recording:", error)
      alert("Could not access microphone. Please check your browser permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl)
      audio.play()
    }
  }

  const handleSubmit = () => {
    console.log("[v0] handleSubmit called:", {
      exerciseType: currentExercise?.type,
      hasBassPattern: !!currentExercise?.bassPattern,
    })

    if (currentExercise?.type === "play") {
      if (!currentExercise.bassPattern) {
        // Keyboard realization exercise - validate the answer
        console.log("[v0] Validating keyboard exercise answer:", textAnswer)
        const userNotes = textAnswer
          .toUpperCase()
          .replace(/[^A-G#\s]/g, "")
          .split(/\s+/)
          .filter(Boolean)
          .map((note) => note.replace(/\d+/g, ""))

        const expectedNotes = (currentExercise.correctAnswer || "").toUpperCase().match(/[A-G](#|b)?/g) || []
        const matchedNotes = expectedNotes.filter((note) => userNotes.includes(note))
        const isCorrect = matchedNotes.length >= expectedNotes.length * 0.7

        console.log("[v0] Validation result:", {
          isCorrect,
          matchedNotes: matchedNotes.length,
          expectedNotes: expectedNotes.length,
        })

        setShowResult(true)
        console.log("[v0] Setting timeout for keyboard exercise (1000ms)")
        setTimeout(() => {
          console.log("[v0] Timeout fired for keyboard exercise")
          handleExerciseComplete(isCorrect)
          setTextAnswer("")
          setAudioBlob(null)
          setAudioUrl(null)
          setShowResult(false)
          setShowHint(false)
        }, 1000)
      } else {
        // Melodic improvisation exercise (with bassPattern) - always mark as correct (it's creative)
        console.log("[v0] Melodic improvisation exercise - marking as correct")
        setShowResult(true)
        console.log("[v0] Setting timeout for melodic exercise (1000ms)")
        setTimeout(() => {
          console.log("[v0] Timeout fired for melodic exercise")
          handleExerciseComplete(true)
          setTextAnswer("")
          setAudioBlob(null)
          setAudioUrl(null)
          setShowResult(false)
          setShowHint(false)
        }, 1000)
      }
    } else {
      if (!selectedAnswer) return
      const correct = selectedAnswer === currentExercise?.correctAnswer
      console.log("[v0] Identify/listen exercise:", {
        correct,
        selectedAnswer,
        correctAnswer: currentExercise?.correctAnswer,
      })
      setShowResult(true)
      console.log("[v0] Setting timeout for identify exercise (1000ms)")
      setTimeout(() => {
        console.log("[v0] Timeout fired for identify exercise")
        handleExerciseComplete(correct)
        setSelectedAnswer(null)
        setShowResult(false)
        setShowHint(false)
      }, 1000)
    }
  }

  const randomizedOptions = useMemo(() => {
    if (!currentExercise?.options) return []
    const options = [...currentExercise.options]
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[options[i], options[j]] = [options[j], options[i]]
    }
    return options
  }, [currentExercise?.id])

  useEffect(() => {
    setTextAnswer("")
    setSelectedAnswer(null)
    setShowResult(false)
    setShowHint(false)
    setAudioBlob(null)
    setAudioUrl(null)
  }, [currentExerciseIndex])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={lesson.difficulty === "beginner" ? "default" : "secondary"}>{lesson.difficulty}</Badge>
                <Badge variant="outline">{lesson.tradition}</Badge>
                <Badge variant="outline">Level {lesson.level}</Badge>
                {isCompleted && (
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <CardTitle className="font-serif text-3xl">{lesson.title}</CardTitle>
              <CardDescription className="text-base mt-2">{lesson.description}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">XP Reward</div>
              <div className="text-2xl font-bold text-primary">+{lesson.xpReward}</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {showTheory && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Theory
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base leading-relaxed">{lesson.content.theory}</p>

            {lesson.content.historicalContext && (
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <div className="text-sm font-semibold text-muted-foreground mb-2">Historical Context</div>
                <p className="text-sm leading-relaxed">{lesson.content.historicalContext}</p>
              </div>
            )}

            {lesson.content.examples.length > 0 && (
              <div className="space-y-3">
                <div className="text-sm font-semibold text-foreground">Examples</div>
                {lesson.content.examples.map((example) => (
                  <div key={example.id} className="bg-muted/30 p-4 rounded-lg border border-border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-semibold text-sm mb-1">{example.description}</div>
                        <div className="font-mono text-lg text-primary mb-2">{example.notation}</div>
                        {example.figuredBass && (
                          <div className="text-sm text-muted-foreground">Figured Bass: {example.figuredBass}</div>
                        )}
                      </div>
                      <Button size="sm" onClick={() => playExample(example.audioPattern)}>
                        <Play className="w-4 h-4 mr-1" />
                        Play
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {totalExercises > 0 && (
              <Button onClick={() => setShowTheory(false)} className="w-full" size="lg">
                Start Exercises
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {!showTheory && totalExercises > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>
                Exercise {currentExerciseIndex + 1} of {totalExercises}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowTheory(true)}>
                <BookOpen className="w-4 h-4 mr-1" />
                Review Theory
              </Button>
            </div>
            <div className="space-y-2">
              <Progress value={(attemptedExercises / totalExercises) * 100} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {attemptedExercises} of {totalExercises} completed
                </span>
                <span>
                  Score: {correctExercises}/{attemptedExercises || 1} (
                  {Math.round((correctExercises / (attemptedExercises || 1)) * 100)}%)
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {currentExercise && (
              <div className="space-y-6">
                <div className="text-lg font-semibold">{currentExercise.prompt}</div>

                {(currentExercise.type === "listen" || currentExercise.type === "identify") &&
                  currentExercise.audioPattern && (
                    <div className="flex justify-center">
                      <Button onClick={playExerciseAudio} disabled={isPlaying} size="lg" className="w-full max-w-xs">
                        <Play className="w-5 h-5 mr-2" />
                        {isPlaying ? "Playing..." : "Play Scale Degree"}
                      </Button>
                    </div>
                  )}

                {currentExercise.type === "play" && currentExercise.bassPattern ? (
                  <PlayAlongExercise
                    prompt={currentExercise.prompt}
                    bassPattern={currentExercise.bassPattern}
                    beatsPerNote={currentExercise.beatsPerNote || 4}
                    tempo={currentExercise.tempo || 80}
                    onComplete={() => handleExerciseComplete(true)}
                  />
                ) : currentExercise.type === "play" ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Write the notes you played (e.g., "G B D G C E G C")
                      </label>
                      <Textarea
                        value={textAnswer}
                        onChange={(e) => setTextAnswer(e.target.value)}
                        placeholder="Enter note names separated by spaces..."
                        className="min-h-[100px] font-mono"
                        disabled={showResult}
                      />
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        Click piano keys to add notes to your answer, or type them directly above.
                      </p>
                      <VirtualPiano
                        startOctave={3}
                        numOctaves={2}
                        showLabels={true}
                        compact={true}
                        onNoteClick={(note) => {
                          // Append clicked note to text answer
                          setTextAnswer((prev) => (prev ? `${prev} ${note}` : note))
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentExercise.type === "identify" && currentExercise.options && (
                      <div className="grid grid-cols-2 gap-3">
                        {randomizedOptions.map((option) => (
                          <Button
                            key={option}
                            onClick={() => setSelectedAnswer(option)}
                            variant={selectedAnswer === option ? "default" : "outline"}
                            className="h-auto min-h-16 text-lg whitespace-normal text-wrap py-3 px-4"
                            disabled={showResult}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {currentExercise.hints && currentExercise.hints.length > 0 && !showResult && (
                  <Button variant="ghost" size="sm" onClick={() => setShowHint(!showHint)}>
                    {showHint ? "Hide" : "Show"} Hint
                  </Button>
                )}

                {showResult && (
                  <div
                    className={`p-4 rounded-lg border ${
                      currentExercise.type === "play" && currentExercise.bassPattern
                        ? "bg-green-500/10 border-green-500/30" // Melodic improvisation - always green
                        : currentExercise.type === "play"
                          ? (() => {
                              const userNotes = textAnswer
                                .toUpperCase()
                                .replace(/[^A-G#\s]/g, "")
                                .split(/\s+/)
                                .filter(Boolean)
                                .map((note) => note.replace(/\d+/g, ""))
                              const expectedNotes =
                                (currentExercise.correctAnswer || "").toUpperCase().match(/[A-G](#|b)?/g) || []
                              const matchedNotes = expectedNotes.filter((note) => userNotes.includes(note))
                              const isCorrect = matchedNotes.length >= expectedNotes.length * 0.7
                              return isCorrect
                                ? "bg-green-500/10 border-green-500/30"
                                : "bg-red-500/10 border-red-500/30"
                            })()
                          : selectedAnswer === currentExercise.correctAnswer
                            ? "bg-green-500/10 border-green-500/30"
                            : "bg-red-500/10 border-red-500/30"
                    }`}
                  >
                    <div
                      className={`font-semibold ${
                        currentExercise.type === "play" && currentExercise.bassPattern
                          ? "text-green-600 dark:text-green-400"
                          : currentExercise.type === "play"
                            ? (() => {
                                const userNotes = textAnswer
                                  .toUpperCase()
                                  .replace(/[^A-G#\s]/g, "")
                                  .split(/\s+/)
                                  .filter(Boolean)
                                  .map((note) => note.replace(/\d+/g, ""))
                                const expectedNotes =
                                  (currentExercise.correctAnswer || "").toUpperCase().match(/[A-G](#|b)?/g) || []
                                const matchedNotes = expectedNotes.filter((note) => userNotes.includes(note))
                                const isCorrect = matchedNotes.length >= expectedNotes.length * 0.7
                                return isCorrect
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              })()
                            : selectedAnswer === currentExercise.correctAnswer
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {currentExercise.type === "play" && currentExercise.bassPattern
                        ? "Great work!"
                        : currentExercise.type === "play"
                          ? (() => {
                              const userNotes = textAnswer
                                .toUpperCase()
                                .replace(/[^A-G#\s]/g, "")
                                .split(/\s+/)
                                .filter(Boolean)
                                .map((note) => note.replace(/\d+/g, ""))
                              const expectedNotes =
                                (currentExercise.correctAnswer || "").toUpperCase().match(/[A-G](#|b)?/g) || []
                              const matchedNotes = expectedNotes.filter((note) => userNotes.includes(note))
                              const isCorrect = matchedNotes.length >= expectedNotes.length * 0.7
                              return isCorrect ? "Correct!" : "Incorrect"
                            })()
                          : selectedAnswer === currentExercise.correctAnswer
                            ? "Correct!"
                            : "Incorrect"}
                    </div>
                    {currentExercise.type === "play" &&
                      !currentExercise.bassPattern &&
                      (() => {
                        const userNotes = textAnswer
                          .toUpperCase()
                          .replace(/[^A-G#\s]/g, "")
                          .split(/\s+/)
                          .filter(Boolean)
                          .map((note) => note.replace(/\d+/g, ""))
                        const expectedNotes =
                          (currentExercise.correctAnswer || "").toUpperCase().match(/[A-G](#|b)?/g) || []
                        const matchedNotes = expectedNotes.filter((note) => userNotes.includes(note))
                        const isCorrect = matchedNotes.length >= expectedNotes.length * 0.7
                        return !isCorrect
                      })() && <div className="text-sm mt-1">Expected notes: {currentExercise.correctAnswer}</div>}
                    {currentExercise.type !== "play" && selectedAnswer !== currentExercise.correctAnswer && (
                      <div className="text-sm mt-1">The correct answer was: {currentExercise.correctAnswer}</div>
                    )}
                    {currentExerciseIndex < totalExercises - 1 && (
                      <div className="text-sm mt-2 text-muted-foreground">Loading next exercise...</div>
                    )}
                  </div>
                )}

                {!showResult && (
                  <Button
                    onClick={handleSubmit}
                    disabled={currentExercise.type === "play" ? !textAnswer.trim() : !selectedAnswer}
                    className="w-full"
                    size="lg"
                  >
                    Submit Answer
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <Button onClick={onPrevious} disabled={!hasPrevious} variant="outline">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous Lesson
        </Button>
        <Button onClick={onNext} disabled={!hasNext} variant="outline">
          Next Lesson
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
