export class RealAudioSamples {
  private audioContext: AudioContext
  private sampleCache: Map<string, AudioBuffer> = new Map()
  private loadingPromises: Map<string, Promise<AudioBuffer>> = new Map()
  private currentPianoType = "grand-2021"

  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext
    console.log("[v0] Real audio samples initialized")
  }

  setPianoType(type: string): void {
    if (this.currentPianoType !== type) {
      console.log(`[v0] Changing piano type from ${this.currentPianoType} to ${type}`)
      this.currentPianoType = type
      // Clear piano sample cache to force reload with new type
      const keysToDelete: string[] = []
      this.sampleCache.forEach((_, key) => {
        if (key.startsWith("piano_")) {
          keysToDelete.push(key)
        }
      })
      keysToDelete.forEach((key) => this.sampleCache.delete(key))
      console.log(`[v0] Cleared ${keysToDelete.length} cached piano samples`)
    }
  }

  async getPianoSample(note: string, octave: number): Promise<AudioBuffer> {
    const key = `piano_${note}${octave}`
    console.log(`[v0] Requesting piano sample: ${key}`)

    if (this.sampleCache.has(key)) {
      console.log(`[v0] Using cached piano sample: ${key}`)
      return this.sampleCache.get(key)!
    }

    if (this.loadingPromises.has(key)) {
      console.log(`[v0] Piano sample already loading: ${key}`)
      return this.loadingPromises.get(key)!
    }

    const loadingPromise = this.loadRealPianoSample(note, octave)
    this.loadingPromises.set(key, loadingPromise)
    return loadingPromise
  }

  async getBassSample(note: string, octave: number): Promise<AudioBuffer> {
    const key = `bass_${note}${octave}`
    console.log(`[v0] Requesting bass sample: ${key}`)

    if (this.sampleCache.has(key)) {
      console.log(`[v0] Using cached bass sample: ${key}`)
      return this.sampleCache.get(key)!
    }

    if (this.loadingPromises.has(key)) {
      console.log(`[v0] Bass sample already loading: ${key}`)
      return this.loadingPromises.get(key)!
    }

    const loadingPromise = this.loadCDNBassSample(note, octave)
    this.loadingPromises.set(key, loadingPromise)

    try {
      const buffer = await loadingPromise
      return buffer
    } catch (error) {
      console.error(`[v0] ✗✗✗ BASS SAMPLE FAILED FOR ${key} ✗✗✗`)
      console.error(`[v0] Error details:`, error)
      this.loadingPromises.delete(key)
      throw error
    }
  }

  async getDrumSample(drumType: string): Promise<AudioBuffer> {
    const key = `drum_${drumType}`
    console.log(`[v0] Requesting drum sample: ${key}`)

    if (this.sampleCache.has(key)) {
      console.log(`[v0] Using cached drum sample: ${key}`)
      return this.sampleCache.get(key)!
    }

    if (this.loadingPromises.has(key)) {
      console.log(`[v0] Drum sample already loading: ${key}`)
      return this.loadingPromises.get(key)!
    }

    const loadingPromise = this.loadRealDrumSample(drumType)
    this.loadingPromises.set(key, loadingPromise)
    return loadingPromise
  }

  private async loadRealPianoSample(note: string, octave: number): Promise<AudioBuffer> {
    const key = `piano_${note}${octave}`

    const getClosestSample = (
      note: string,
      octave: number,
    ): { sampleNote: string; sampleOctave: number; pitchShift: number } => {
      const noteToSemitone: { [key: string]: number } = {
        C: 0,
        "C#": 1,
        D: 2,
        "D#": 3,
        E: 4,
        F: 5,
        "F#": 6,
        G: 7,
        "G#": 8,
        A: 9,
        "A#": 10,
        B: 11,
      }

      const targetSemitone = noteToSemitone[note]
      const targetAbsolute = octave * 12 + targetSemitone

      const availableSamples = [
        { note: "A", minOctave: 0, maxOctave: 7, baseSemitone: 9 },
        { note: "C", minOctave: 1, maxOctave: 8, baseSemitone: 0 },
      ]

      for (const sample of availableSamples) {
        if (sample.note === note) {
          for (let sampleOctave = sample.minOctave; sampleOctave <= sample.maxOctave; sampleOctave++) {
            if (sampleOctave === octave) {
              console.log(`[v0] Found EXACT match for ${note}${octave} - no pitch shift needed!`)
              return {
                sampleNote: note,
                sampleOctave: octave,
                pitchShift: 0,
              }
            }
          }
        }
      }

      let bestSample = availableSamples[0]
      let bestDistance = Number.POSITIVE_INFINITY
      let bestOctave = 4
      let bestPitchShift = 0

      for (const sample of availableSamples) {
        for (let sampleOctave = sample.minOctave; sampleOctave <= sample.maxOctave; sampleOctave++) {
          const sampleAbsolute = sampleOctave * 12 + sample.baseSemitone
          const distance = Math.abs(targetAbsolute - sampleAbsolute)

          if (distance < bestDistance && distance <= 6) {
            bestSample = sample
            bestDistance = distance
            bestOctave = sampleOctave
            bestPitchShift = targetAbsolute - sampleAbsolute
          }
        }
      }

      if (bestDistance > 6) {
        for (const sample of availableSamples) {
          for (let sampleOctave = sample.minOctave; sampleOctave <= sample.maxOctave; sampleOctave++) {
            const sampleAbsolute = sampleOctave * 12 + sample.baseSemitone
            const distance = Math.abs(targetAbsolute - sampleAbsolute)

            if (distance < bestDistance) {
              bestSample = sample
              bestDistance = distance
              bestOctave = sampleOctave
              bestPitchShift = targetAbsolute - sampleAbsolute
            }
          }
        }
      }

      console.log(
        `[v0] Using ${bestSample.note}${bestOctave} for ${note}${octave} (pitch shift: ${bestPitchShift} semitones, distance: ${bestDistance})`,
      )

      return {
        sampleNote: bestSample.note,
        sampleOctave: bestOctave,
        pitchShift: bestPitchShift,
      }
    }

    const { sampleNote, sampleOctave, pitchShift } = getClosestSample(note, octave)

    const baseUrl = `https://cdn.jsdelivr.net/npm/@audio-samples/piano-velocity8@1.0.5/audio`
    const filename = `${sampleNote}${sampleOctave}v8.ogg`
    const url = `${baseUrl}/${filename}`

    const maxRetries = 3
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[v0] Fetching piano sample from: ${url} (attempt ${attempt}/${maxRetries})`)
        const response = await fetch(url, {
          mode: "cors",
          credentials: "omit",
          cache: "force-cache",
        })

        if (!response.ok) {
          console.error(`[v0] ✗ HTTP error for ${url}: ${response.status} ${response.statusText}`)
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        console.log(`[v0] Successfully fetched ${url}, decoding audio...`)
        const arrayBuffer = await response.arrayBuffer()
        let audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)

        if (pitchShift !== 0) {
          console.log(`[v0] Applying pitch shift of ${pitchShift} semitones to ${key}`)
          audioBuffer = await this.pitchShiftBuffer(audioBuffer, pitchShift)
        }

        this.sampleCache.set(key, audioBuffer)
        this.loadingPromises.delete(key)
        console.log(`[v0] ✓ Successfully loaded and cached piano sample: ${key}`)
        return audioBuffer
      } catch (error) {
        lastError = error as Error
        console.warn(`[v0] ⚠️ Attempt ${attempt}/${maxRetries} failed for ${url}`)
        console.warn(`[v0] Error type: ${error instanceof Error ? error.constructor.name : typeof error}`)
        console.warn(`[v0] Error message:`, error)

        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 100
          console.log(`[v0] Retrying in ${delay}ms...`)
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }
    }

    this.loadingPromises.delete(key)
    console.error(`[v0] ✗✗✗ COMPLETELY FAILED to load piano sample after ${maxRetries} attempts ✗✗✗`)
    console.error(`[v0] URL: ${url}`)
    console.error(`[v0] Target note: ${note}${octave}`)
    console.error(`[v0] Sample note: ${sampleNote}${sampleOctave}`)
    console.error(`[v0] Pitch shift: ${pitchShift} semitones`)
    console.error(`[v0] Final error:`, lastError)
    throw new Error(`Failed to load piano sample: ${url} - ${lastError?.message || "Unknown error"}`)
  }

  private async loadCDNBassSample(note: string, octave: number): Promise<AudioBuffer> {
    const key = `bass_${note}${octave}`
    const url = `https://cdn.jsdelivr.net/npm/@audio-samples/bass-electric@1.0.0/audio/${note}${octave}.ogg`

    console.log(`[v0] Loading bass sample from CDN: ${url}`)

    try {
      const response = await fetch(url, {
        mode: "cors",
        credentials: "omit",
        cache: "force-cache",
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)

      this.sampleCache.set(key, audioBuffer)
      this.loadingPromises.delete(key)
      console.log(`[v0] ✓ Successfully loaded bass sample: ${key}`)
      return audioBuffer
    } catch (error) {
      this.loadingPromises.delete(key)
      console.error(`[v0] Failed to load bass sample ${url}:`, error)
      throw error
    }
  }

  private async loadRealDrumSample(drumType: string): Promise<AudioBuffer> {
    const key = `drum_${drumType}`
    const drumMap: { [key: string]: string } = {
      kick: "kick-acoustic01",
      snare: "snare-acoustic01",
      hihat: "hihat-acoustic01",
      "hihat-open": "hihat-acoustic02",
      ride: "ride-acoustic01",
      crash: "crash-acoustic",
      tom1: "tom-acoustic01",
      tom2: "tom-acoustic02",
    }

    const sampleName = drumMap[drumType] || drumType
    const url = `https://cdn.jsdelivr.net/npm/@audio-samples/drums-acoustic@1.0.0/audio/${sampleName}.ogg`

    console.log(`[v0] Loading drum sample from CDN: ${url}`)

    try {
      const response = await fetch(url, {
        mode: "cors",
        credentials: "omit",
        cache: "force-cache",
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)

      this.sampleCache.set(key, audioBuffer)
      this.loadingPromises.delete(key)
      console.log(`[v0] ✓ Successfully loaded drum sample: ${key}`)
      return audioBuffer
    } catch (error) {
      this.loadingPromises.delete(key)
      console.error(`[v0] Failed to load drum sample ${url}:`, error)
      throw error
    }
  }

  private async pitchShiftBuffer(buffer: AudioBuffer, semitones: number): Promise<AudioBuffer> {
    const rate = Math.pow(2, semitones / 12)
    const newLength = Math.floor(buffer.length / rate)

    const offlineContext = new OfflineAudioContext(buffer.numberOfChannels, newLength, buffer.sampleRate)

    const source = offlineContext.createBufferSource()
    source.buffer = buffer
    source.playbackRate.value = rate
    source.connect(offlineContext.destination)
    source.start(0)

    return await offlineContext.startRendering()
  }

  async playPianoNote(frequency: number, duration: number, velocity = 0.7): Promise<void> {
    const { note, octave } = this.frequencyToNote(frequency)
    console.log(`[v0] Playing piano note: ${note}${octave} (${frequency.toFixed(1)}Hz)`)

    const buffer = await this.getPianoSample(note, octave)

    const source = this.audioContext.createBufferSource()
    source.buffer = buffer

    const gainNode = this.audioContext.createGain()
    gainNode.gain.setValueAtTime(velocity, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

    source.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    source.start(this.audioContext.currentTime)
    source.stop(this.audioContext.currentTime + duration)
  }

  private frequencyToNote(frequency: number): { note: string; octave: number } {
    const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    const a4 = 440
    const c0 = a4 * Math.pow(2, -4.75)
    const halfSteps = Math.round(12 * Math.log2(frequency / c0))
    const octave = Math.floor(halfSteps / 12)
    const note = noteNames[halfSteps % 12]
    return { note, octave }
  }
}
