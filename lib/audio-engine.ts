import { RealAudioSamples } from "./real-audio-samples"

export type PianoType = "grand-2021" | "grand-2015" | "rhodes" | "yamaha-dx7"
export type ChordNote = number | { note: string; octave: number }

class AdvancedAudioEngine {
  private audioContext: AudioContext | null = null
  private isInitialized = false
  private currentPianoType: PianoType = "grand-2021"
  private activeAudioNodes: AudioNode[] = []
  private realSamples: RealAudioSamples | null = null

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      this.audioContext = new AudioContext()
      this.realSamples = new RealAudioSamples(this.audioContext)
      this.isInitialized = true
      console.log("[v0] Advanced audio engine initialized with REAL SAMPLES")
    } catch (error) {
      console.error("Failed to initialize audio context:", error)
      throw error
    }
  }

  setPianoType(type: PianoType): void {
    this.currentPianoType = type
    if (this.realSamples) {
      this.realSamples.setPianoType(type)
    }
    console.log(`[v0] Piano type set to: ${type} (using real samples)`)
  }

  async playInterval(rootFreq: number, intervalFreq: number, type: "harmonic" | "melodic" = "harmonic"): Promise<void> {
    if (!this.audioContext || !this.realSamples) return

    console.log(`[v0] Playing interval with REAL samples: ${rootFreq.toFixed(1)}Hz - ${intervalFreq.toFixed(1)}Hz`)

    if (type === "harmonic") {
      await Promise.all([this.playRealPianoNote(rootFreq, 2.0, 0.6), this.playRealPianoNote(intervalFreq, 2.0, 0.6)])
    } else {
      await this.playRealPianoNote(rootFreq, 1.0, 0.7)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await this.playRealPianoNote(intervalFreq, 1.0, 0.7)
    }
  }

  async playChord(notes: ChordNote[], duration = 2.0): Promise<void> {
    if (!this.audioContext || !notes.length || !this.realSamples) return

    const frequencies = notes.map((note) => {
      if (typeof note === "number") {
        return note
      } else {
        return this.noteToFrequency(note.note, note.octave)
      }
    })

    console.log(`[v0] Playing chord with REAL samples: ${frequencies.map((f) => f.toFixed(1)).join(", ")}Hz`)

    const results = await Promise.allSettled(
      frequencies.map((freq) => {
        return this.playRealPianoNote(freq, duration * 0.9, 0.6)
      }),
    )

    const succeeded = results.filter((r) => r.status === "fulfilled").length
    const failed = results.filter((r) => r.status === "rejected").length

    if (failed > 0) {
      console.error(
        `[v0] ⚠️ Chord playback: ${succeeded}/${frequencies.length} notes played successfully, ${failed} failed`,
      )
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(`[v0] ✗ Note ${index + 1} (${frequencies[index].toFixed(1)}Hz) failed:`, result.reason)
        }
      })
    } else {
      console.log(`[v0] ✓ All ${succeeded} chord notes played successfully`)
    }
  }

  async playNote(frequency: number, duration = 1.0): Promise<void> {
    if (!this.audioContext || !this.realSamples) return

    try {
      console.log(`[v0] Playing single note with REAL sample: ${frequency.toFixed(1)}Hz`)
      await this.playRealPianoNote(frequency, duration, 0.7)
    } catch (error) {
      const { note, octave } = this.frequencyToNote(frequency)
      console.error(`[v0] ⚠️ Skipping note ${note}${octave} due to error (continuing playback)`)
      // Don't throw - just log and continue
    }
  }

  async playSequence(frequencies: number[], noteDuration: number): Promise<void> {
    if (!frequencies || frequencies.length === 0) {
      console.log("[v0] No frequencies provided for sequence playback")
      return
    }

    console.log(`[v0] Playing sequence with REAL SAMPLES: ${frequencies.length} notes, ${noteDuration}s each`)

    for (let i = 0; i < frequencies.length; i++) {
      try {
        await this.playRealPianoNote(frequencies[i], noteDuration * 0.9, 0.7)
      } catch (error) {
        const { note, octave } = this.frequencyToNote(frequencies[i])
        console.error(`[v0] ⚠️ Failed to play note ${i + 1}/${frequencies.length} (${note}${octave}), continuing...`)
        // Continue to next note instead of stopping
      }
      if (i < frequencies.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, noteDuration * 1000))
      }
    }
    console.log(`[v0] ✓ Sequence playback completed`)
  }

  async playRealPianoNote(frequency: number, duration: number, velocity: number): Promise<void> {
    if (!this.audioContext || !this.realSamples) return

    try {
      const { note, octave } = this.frequencyToNote(frequency)
      console.log(
        `[v0] Attempting to play ${note}${octave} (${frequency.toFixed(1)}Hz) with velocity ${velocity.toFixed(2)}`,
      )

      const buffer = await this.realSamples.getPianoSample(note, octave)

      const source = this.audioContext.createBufferSource()
      source.buffer = buffer

      const gainNode = this.audioContext.createGain()
      gainNode.gain.setValueAtTime(velocity, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

      source.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      this.activeAudioNodes.push(source, gainNode)

      source.start(this.audioContext.currentTime)
      source.stop(this.audioContext.currentTime + duration)

      source.onended = () => {
        try {
          source.disconnect()
          gainNode.disconnect()
        } catch (e) {}
        this.activeAudioNodes = this.activeAudioNodes.filter((node) => node !== source && node !== gainNode)
      }

      console.log(`[v0] ✓ Successfully started playback of ${note}${octave}`)
    } catch (error) {
      const { note, octave } = this.frequencyToNote(frequency)
      console.error(`[v0] ✗✗✗ FAILED to play ${note}${octave} (${frequency.toFixed(1)}Hz) ✗✗✗`)
      console.error(`[v0] Error details:`, error)
      throw error
    }
  }

  private noteToFrequency(note: string, octave: number): number {
    const A4 = 440
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    const noteIndex = notes.indexOf(note)

    if (noteIndex === -1) {
      throw new Error(`Invalid note: ${note}`)
    }

    const halfSteps = octave * 12 + noteIndex
    const halfStepsFromA4 = halfSteps - (4 * 12 + 9)
    return A4 * Math.pow(2, halfStepsFromA4 / 12)
  }

  private frequencyToNote(frequency: number): { note: string; octave: number } {
    const A4 = 440
    const C0 = A4 * Math.pow(2, -4.75)
    const halfSteps = Math.round(12 * Math.log2(frequency / C0))
    const octave = Math.floor(halfSteps / 12)
    const noteIndex = halfSteps % 12

    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    const note = notes[noteIndex]

    return { note, octave }
  }

  stopAll(): void {
    this.activeAudioNodes.forEach((node) => {
      try {
        if (node instanceof AudioScheduledSourceNode) {
          node.stop()
        }
        node.disconnect()
      } catch (error) {}
    })
    this.activeAudioNodes = []
    console.log("[v0] All audio stopped")
  }

  async playMetronomeClick(isAccent = false): Promise<void> {
    if (!this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    // Accent clicks are higher pitched and louder
    oscillator.frequency.value = isAccent ? 1200 : 800
    gainNode.gain.setValueAtTime(isAccent ? 0.3 : 0.2, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1)

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.1)

    console.log(`[v0] Metronome click: ${isAccent ? "ACCENT" : "normal"}`)
  }

  async playBassPatternWithMetronome(bassNotes: string[], beatsPerNote = 4, tempo = 80): Promise<void> {
    if (!this.audioContext || !this.realSamples) return

    const beatDuration = 60 / tempo // Duration of one beat in seconds
    const noteDuration = beatDuration * beatsPerNote

    console.log(
      `[v0] Starting play-along: ${bassNotes.length} bass notes, ${beatsPerNote} beats each, tempo ${tempo} BPM`,
    )

    // Play 4 metronome clicks as count-in
    console.log("[v0] Count-in: 4 metronome clicks")
    for (let i = 0; i < 4; i++) {
      await this.playMetronomeClick(i === 0) // First click is accented
      await new Promise((resolve) => setTimeout(resolve, beatDuration * 1000))
    }

    // Play each bass note for the specified duration with metronome clicks
    for (let i = 0; i < bassNotes.length; i++) {
      const note = bassNotes[i]
      console.log(`[v0] Playing bass note ${i + 1}/${bassNotes.length}: ${note} for ${beatsPerNote} beats`)

      // Parse note (e.g., "C3" -> note: "C", octave: 3)
      const noteName = note.slice(0, -1)
      const octave = Number.parseInt(note.slice(-1))
      const frequency = this.noteToFrequency(noteName, octave)

      // Start the bass note
      const bassPromise = this.playRealPianoNote(frequency, noteDuration, 0.5)

      // Play metronome clicks during the bass note
      const clickPromises: Promise<void>[] = []
      for (let beat = 0; beat < beatsPerNote; beat++) {
        clickPromises.push(
          (async () => {
            await new Promise((resolve) => setTimeout(resolve, beat * beatDuration * 1000))
            await this.playMetronomeClick(beat === 0) // First beat of each note is accented
          })(),
        )
      }

      // Wait for bass note and all clicks to complete
      await Promise.all([bassPromise, ...clickPromises])

      // Small gap between notes
      if (i < bassNotes.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }

    console.log("[v0] ✓ Play-along completed")
  }
}

export const audioEngine = new AdvancedAudioEngine()
