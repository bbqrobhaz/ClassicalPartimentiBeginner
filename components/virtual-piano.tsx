"use client"

import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Piano, Volume2, VolumeX } from "lucide-react"
import { audioEngine } from "@/lib/audio-engine"

interface PianoKey {
  note: string
  isBlack: boolean
  keyboardKey?: string
  whiteKeyIndex?: number // Added to track position for black keys
}

interface VirtualPianoProps {
  startOctave?: number
  numOctaves?: number
  showLabels?: boolean
  compact?: boolean
}

export default function VirtualPiano({
  startOctave = 3,
  numOctaves = 2,
  showLabels = true,
  compact = false,
}: VirtualPianoProps) {
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set())
  const [isMuted, setIsMuted] = useState(false)

  const generateKeys = useCallback((): PianoKey[] => {
    const keys: PianoKey[] = []
    const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    const keyboardKeys = ["A", "W", "S", "E", "D", "F", "T", "G", "Y", "H", "U", "J", "K", "O", "L", "P", ";"]

    // Map of black keys to their position relative to white keys
    // C# is after C (0), D# is after D (1), F# is after F (3), G# is after G (4), A# is after A (5)
    const blackKeyPositions: Record<string, number> = {
      "C#": 0,
      "D#": 1,
      "F#": 3,
      "G#": 4,
      "A#": 5,
    }

    let keyIndex = 0
    let whiteKeyCount = 0

    for (let octave = startOctave; octave < startOctave + numOctaves; octave++) {
      for (const noteName of noteNames) {
        const isBlack = noteName.includes("#")
        const whiteKeyIndex = isBlack ? whiteKeyCount - 1 + (blackKeyPositions[noteName] || 0) / 7 : undefined

        keys.push({
          note: `${noteName}${octave}`,
          isBlack,
          keyboardKey: keyIndex < keyboardKeys.length ? keyboardKeys[keyIndex] : undefined,
          whiteKeyIndex,
        })

        if (!isBlack) whiteKeyCount++
        keyIndex++
      }
    }

    return keys
  }, [startOctave, numOctaves])

  const [keys] = useState<PianoKey[]>(generateKeys())

  const playNote = useCallback(
    async (note: string) => {
      if (isMuted) return

      setActiveNotes((prev) => new Set(prev).add(note))
      await audioEngine.playNote(note)

      // Remove active state after a short delay
      setTimeout(() => {
        setActiveNotes((prev) => {
          const next = new Set(prev)
          next.delete(note)
          return next
        })
      }, 300)
    },
    [isMuted],
  )

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()
      const pianoKey = keys.find((k) => k.keyboardKey === key)
      if (pianoKey && !activeNotes.has(pianoKey.note)) {
        playNote(pianoKey.note)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [keys, playNote, activeNotes])

  const whiteKeys = keys.filter((k) => !k.isBlack)
  const blackKeys = keys.filter((k) => k.isBlack)

  return (
    <Card className={`${compact ? "p-4" : "p-6"} bg-gradient-to-b from-background to-muted/20`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Piano className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Virtual Piano</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsMuted(!isMuted)} className="gap-2">
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {isMuted ? "Unmute" : "Mute"}
        </Button>
      </div>

      <div className="relative" style={{ height: compact ? "120px" : "180px" }}>
        {/* White keys */}
        <div className="flex gap-0.5 h-full">
          {whiteKeys.map((key) => (
            <button
              key={key.note}
              onClick={() => playNote(key.note)}
              className={`
                flex-1 rounded-b-lg border-2 border-border
                transition-all duration-150 ease-out
                hover:bg-muted/50 active:bg-muted
                ${activeNotes.has(key.note) ? "bg-primary/20 scale-95" : "bg-background"}
                relative group
              `}
              style={{ minWidth: compact ? "32px" : "48px" }}
            >
              {showLabels && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                  <span className="text-xs font-medium text-muted-foreground">{key.note}</span>
                  {key.keyboardKey && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      {key.keyboardKey}
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="absolute top-0 left-0 right-0 flex pointer-events-none" style={{ height: "60%" }}>
          {blackKeys.map((key) => {
            // Find the white key this black key comes after
            const noteWithoutSharp = key.note.replace("#", "")
            const octave = key.note.slice(-1)
            const baseWhiteNote = noteWithoutSharp + octave

            const whiteKeyIndex = whiteKeys.findIndex((wk) => wk.note === baseWhiteNote)

            if (whiteKeyIndex === -1) return null

            const whiteKeyWidth = 100 / whiteKeys.length
            const leftPosition = (whiteKeyIndex + 0.75) * whiteKeyWidth

            return (
              <button
                key={key.note}
                onClick={() => playNote(key.note)}
                className={`
                  absolute rounded-b-lg border-2 border-border pointer-events-auto
                  transition-all duration-150 ease-out
                  hover:bg-muted active:bg-muted/80
                  ${activeNotes.has(key.note) ? "bg-primary/40 scale-95" : "bg-foreground"}
                  z-10 group
                `}
                style={{
                  width: compact ? "24px" : "32px",
                  height: "100%",
                  left: `${leftPosition}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {showLabels && key.keyboardKey && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] px-1 py-0.5 rounded bg-background/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {key.keyboardKey}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {showLabels && (
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Click keys or use your keyboard (A-; keys) to play notes
        </p>
      )}
    </Card>
  )
}
