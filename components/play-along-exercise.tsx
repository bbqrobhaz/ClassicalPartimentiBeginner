"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Play, Square, Mic, PlayCircle, Pause } from "lucide-react"
import { audioEngine } from "@/lib/audio-engine"

interface PlayAlongExerciseProps {
  prompt: string
  bassPattern: string // e.g., "G3-G3-C3"
  beatsPerNote?: number // beats per bass note (default 4)
  tempo?: number // BPM (default 80)
  onComplete: () => void
}

export default function PlayAlongExercise({
  prompt,
  bassPattern,
  beatsPerNote = 4,
  tempo = 80,
  onComplete,
}: PlayAlongExerciseProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [textAnswer, setTextAnswer] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const stopPlaybackRef = useRef<(() => void) | null>(null)

  // Parse bass pattern
  const bassNotes = bassPattern.split("-")

  const startPlayback = async () => {
    setIsPlaying(true)

    try {
      const stopFn = await audioEngine.playBassPatternWithMetronome(bassNotes, tempo, beatsPerNote)
      stopPlaybackRef.current = stopFn
    } catch (error) {
      console.error("[v0] Failed to start playback:", error)
      setIsPlaying(false)
    }
  }

  const stopPlayback = () => {
    if (stopPlaybackRef.current) {
      stopPlaybackRef.current()
      stopPlaybackRef.current = null
    }
    setIsPlaying(false)
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
    setShowResult(true)
    setTimeout(() => {
      onComplete()
    }, 2000)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPlayback()
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  return (
    <div className="space-y-6">
      {/* Playback Controls */}
      <div className="border rounded-lg p-6 space-y-4 bg-muted/30">
        <div className="text-sm font-medium">Bass Pattern Playback</div>
        <div className="font-mono text-lg text-primary mb-2">{bassPattern}</div>
        <div className="text-sm text-muted-foreground mb-4">
          Tempo: {tempo} BPM | {beatsPerNote} beats per note
        </div>

        <div className="flex gap-2">
          {!isPlaying ? (
            <Button onClick={startPlayback} size="lg" className="flex-1">
              <Play className="w-5 h-5 mr-2" />
              Start Playback
            </Button>
          ) : (
            <Button onClick={stopPlayback} variant="destructive" size="lg" className="flex-1">
              <Pause className="w-5 h-5 mr-2" />
              Stop Playback
            </Button>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          The bass pattern will loop continuously with a metronome click. Play along and improvise!
        </div>
      </div>

      {/* Answer Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Write the notes you played (e.g., "G B D G C E G C")</label>
        <Textarea
          value={textAnswer}
          onChange={(e) => setTextAnswer(e.target.value)}
          placeholder="Enter note names separated by spaces..."
          className="min-h-[100px] font-mono"
          disabled={showResult}
        />
      </div>

      {/* Recording Controls */}
      <div className="border rounded-lg p-4 space-y-3 bg-muted/30">
        <div className="text-sm font-medium">Optional: Record your performance</div>
        <div className="flex gap-2">
          {!isRecording && !audioUrl && (
            <Button onClick={startRecording} variant="outline" className="flex-1 bg-transparent">
              <Mic className="w-4 h-4 mr-2" />
              Start Recording
            </Button>
          )}
          {isRecording && (
            <Button onClick={stopRecording} variant="destructive" className="flex-1">
              <Square className="w-4 h-4 mr-2" />
              Stop Recording
            </Button>
          )}
          {audioUrl && !isRecording && (
            <>
              <Button onClick={playRecording} variant="outline" className="flex-1 bg-transparent">
                <PlayCircle className="w-4 h-4 mr-2" />
                Play Recording
              </Button>
              <Button onClick={startRecording} variant="outline" className="flex-1 bg-transparent">
                <Mic className="w-4 h-4 mr-2" />
                Re-record
              </Button>
            </>
          )}
        </div>
        {isRecording && (
          <div className="text-sm text-red-500 animate-pulse flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            Recording in progress...
          </div>
        )}
      </div>

      {/* Result Display */}
      {showResult && (
        <div className="p-4 rounded-lg border bg-green-500/10 border-green-500/30">
          <div className="font-semibold text-green-600 dark:text-green-400">Great work!</div>
        </div>
      )}

      {/* Submit Button */}
      {!showResult && (
        <Button onClick={handleSubmit} disabled={!textAnswer.trim()} className="w-full" size="lg">
          Submit Answer
        </Button>
      )}
    </div>
  )
}
