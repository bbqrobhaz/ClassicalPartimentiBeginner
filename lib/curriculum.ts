import type { Lesson, Achievement } from "./types"

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-lesson",
    name: "First Steps",
    description: "Complete your first lesson",
    icon: "🎵",
    progress: 0,
    target: 1,
  },
  {
    id: "week-streak",
    name: "Dedicated Student",
    description: "Practice for 7 days in a row",
    icon: "🔥",
    progress: 0,
    target: 7,
  },
  {
    id: "month-streak",
    name: "Committed Scholar",
    description: "Practice for 30 days in a row",
    icon: "🌟",
    progress: 0,
    target: 30,
  },
  {
    id: "rule-of-the-octave-master",
    name: "Rule of the Octave Master",
    description: "Complete all Rule of the Octave lessons",
    icon: "📐",
    progress: 0,
    target: 8,
  },
  {
    id: "schema-collector",
    name: "Schema Collector",
    description: "Learn all 18 galant schemata",
    icon: "🎼",
    progress: 0,
    target: 18,
  },
  {
    id: "diminution-expert",
    name: "Diminution Expert",
    description: "Master all historical diminution techniques",
    icon: "✨",
    progress: 0,
    target: 20,
  },
  {
    id: "german-master",
    name: "German Tradition Master",
    description: "Complete all German Griffe and patterns",
    icon: "🇩🇪",
    progress: 0,
    target: 15,
  },
  {
    id: "italian-master",
    name: "Italian Tradition Master",
    description: "Complete all Italian partimenti",
    icon: "🇮🇹",
    progress: 0,
    target: 25,
  },
  {
    id: "improviser",
    name: "Baroque Improviser",
    description: "Complete a free improvisation exercise",
    icon: "🎹",
    progress: 0,
    target: 1,
  },
  {
    id: "virtuoso",
    name: "Virtuoso",
    description: "Reach level 7 (Virtuoso)",
    icon: "👑",
    progress: 0,
    target: 1,
  },
]

export const CURRICULUM: Lesson[] = [
  // ============================================
  // LEVEL 1: FOUNDATIONS (Beginner)
  // ============================================
  {
    id: "found-1-scale-degrees",
    title: "Introduction to Scale Degrees",
    description: "Learn to think in numbers: 1, 2, 3 represent Do, Re, Mi",
    category: "foundations",
    tradition: "both",
    difficulty: "beginner",
    level: 1,
    prerequisites: [],
    xpReward: 10,
    content: {
      theory:
        "In baroque improvisation, we use numbers to represent scale degrees. 1 is the tonic (Do), 2 is the supertonic (Re), 3 is the mediant (Mi), 4 is the subdominant (Fa), 5 is the dominant (Sol), 6 is the submediant (La), 7 is the leading tone (Ti), and 8 is the octave. This system makes it easy to transpose and understand patterns in any key.",
      examples: [
        {
          id: "ex-1",
          description: "Ascending scale in C major",
          notation: "1, 2, 3, 4, 5, 6, 7, 8",
          audioPattern: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
        },
        {
          id: "ex-2",
          description: "Descending scale in C major",
          notation: "8, 7, 6, 5, 4, 3, 2, 1",
          audioPattern: ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"],
        },
      ],
      exercises: [
        {
          id: "ex1-1",
          type: "identify",
          prompt: "Listen to the scale degree and identify it",
          correctAnswer: "3",
          options: ["1", "2", "3", "4", "5"],
          audioPattern: ["E4"],
        },
        {
          id: "ex1-2",
          type: "identify",
          prompt: "Listen to the scale degree and identify it",
          correctAnswer: "5",
          options: ["3", "4", "5", "6", "7"],
          audioPattern: ["G4"],
        },
        {
          id: "ex1-3",
          type: "identify",
          prompt: "Listen to the scale degree and identify it",
          correctAnswer: "7",
          options: ["5", "6", "7", "8"],
          audioPattern: ["B4"],
        },
      ],
      historicalContext:
        "The solfège system (Do, Re, Mi) was developed by Guido of Arezzo in the 11th century and became the foundation of all musical pedagogy. In the Neapolitan conservatories, students learned to sing scale degrees before touching an instrument.",
    },
  },
  {
    id: "found-2-figured-bass-53",
    title: "Simple Figured Bass: 5/3",
    description: "Learn the most basic figured bass symbol - the root position triad",
    category: "foundations",
    tradition: "both",
    difficulty: "beginner",
    level: 1,
    prerequisites: ["found-1-scale-degrees"],
    xpReward: 15,
    content: {
      theory:
        "5/3 (or just 5, or often left blank) indicates a root position triad. The numbers mean intervals above the bass: 5th and 3rd. In C major, bass note 1 with 5/3 = C-E-G. This is the most common chord and is often left unfigured.",
      examples: [
        {
          id: "ex-1",
          description: "I chord (1 with 5/3)",
          notation: "Bass: 1, Figures: 5/3",
          audioPattern: ["C3", "E4", "G4", "C5"],
          figuredBass: "5/3",
        },
        {
          id: "ex-2",
          description: "V chord (5 with 5/3)",
          notation: "Bass: 5, Figures: 5/3",
          audioPattern: ["G3", "B4", "D5", "G5"],
          figuredBass: "5/3",
        },
        {
          id: "ex-3",
          description: "IV chord (4 with 5/3)",
          notation: "Bass: 4, Figures: 5/3",
          audioPattern: ["F3", "A4", "C5", "F5"],
          figuredBass: "5/3",
        },
      ],
      exercises: [
        {
          id: "ex2-1",
          type: "identify",
          prompt: "Which bass note creates a V chord with 5/3?",
          correctAnswer: "5",
          options: ["1", "4", "5", "6"],
        },
        {
          id: "ex2-2",
          type: "identify",
          prompt: "Listen to this chord. Which bass note is it?",
          correctAnswer: "1",
          options: ["1", "4", "5"],
          audioPattern: ["C3", "E4", "G4", "C5"],
        },
        {
          id: "ex2-3",
          type: "identify",
          prompt: "What intervals are above the bass in a 5/3 chord?",
          correctAnswer: "3rd and 5th",
          options: ["3rd and 5th", "3rd and 6th", "4th and 6th", "2nd and 5th"],
        },
        {
          id: "ex2-4",
          type: "identify",
          prompt: "Listen to this chord. Is it I, IV, or V?",
          correctAnswer: "IV",
          options: ["I", "IV", "V"],
          audioPattern: ["F3", "A4", "C5", "F5"],
        },
        {
          id: "ex2-5",
          type: "identify",
          prompt: "In C major, bass note 4 with 5/3 creates which chord?",
          correctAnswer: "F-A-C (IV)",
          options: ["C-E-G (I)", "F-A-C (IV)", "G-B-D (V)", "A-C-E (vi)"],
        },
        {
          id: "ex2-6",
          type: "identify",
          prompt: "Listen to this progression. Which is it?",
          correctAnswer: "I-V-I",
          options: ["I-IV-I", "I-V-I", "IV-V-I"],
          audioPattern: ["C3", "E4", "G4", "C5", "G3", "B4", "D5", "G5", "C3", "E4", "G4", "C5"],
        },
        {
          id: "ex2-7-keyboard",
          type: "play",
          prompt: "KEYBOARD: Realize this bass line with 5/3 chords in the right hand: C-F-G-C",
          correctAnswer:
            "Play bass notes C-F-G-C with left hand, and complete triads (C-E-G, F-A-C, G-B-D, C-E-G) with right hand",
          hints: [
            "Keep your right hand in a comfortable position. Use smooth voice leading - move each voice to the nearest chord tone.",
          ],
        },
        {
          id: "ex2-8-melodic",
          type: "play",
          prompt: "MELODIES: Create a melodic line over this progression: I-IV-V-I",
          correctAnswer:
            "Improvise a melody using notes from each chord (C-E-G over I, F-A-C over IV, G-B-D over V, C-E-G over I)",
          hints: [
            "Start on C (scale degree 1), move stepwise when possible, and end on C. Use chord tones on strong beats.",
          ],
          bassPattern: "C3-F3-G3-C3",
          beatsPerNote: 4,
          tempo: 80,
        },
      ],
      historicalContext:
        "Figured bass (basso continuo) was the universal notation system for baroque music, allowing keyboardists to improvise harmonies from a bass line with numbers. It was invented around 1600 and remained standard practice until 1800.",
    },
  },
  {
    id: "found-3-figured-bass-63",
    title: "First Inversion: 6/3",
    description: "Learn the 6/3 chord - first inversion triad",
    category: "foundations",
    tradition: "both",
    difficulty: "beginner",
    level: 1,
    prerequisites: ["found-2-figured-bass-53"],
    xpReward: 15,
    content: {
      theory:
        "6/3 (or just 6) indicates first inversion. The bass has the 3rd of the chord. In C major, bass note 3 with 6 = E-G-C. The 6/3 chord is smoother and more melodic than 5/3, perfect for stepwise bass motion.",
      examples: [
        {
          id: "ex-1",
          description: "I6 chord (3 with 6)",
          notation: "Bass: 3, Figures: 6",
          audioPattern: ["E3", "G4", "C5"],
          figuredBass: "6",
        },
        {
          id: "ex-2",
          description: "V6 chord (7 with 6)",
          notation: "Bass: 7, Figures: 6",
          audioPattern: ["B3", "D5", "G5"],
          figuredBass: "6",
        },
        {
          id: "ex-3",
          description: "IV6 chord (6 with 6)",
          notation: "Bass: 6, Figures: 6",
          audioPattern: ["A3", "C5", "F5"],
          figuredBass: "6",
        },
      ],
      exercises: [
        {
          id: "ex3-1",
          type: "identify",
          prompt: "Which bass note creates a I6 chord?",
          correctAnswer: "3",
          options: ["1", "2", "3", "4", "5"],
        },
        {
          id: "ex3-2",
          type: "identify",
          prompt: "Listen to this chord. Is it in root position (5/3) or first inversion (6)?",
          correctAnswer: "First inversion (6)",
          options: ["Root position (5/3)", "First inversion (6)"],
          audioPattern: ["E3", "G4", "C5"],
        },
        {
          id: "ex3-3",
          type: "identify",
          prompt: "What intervals are above the bass in a 6/3 chord?",
          correctAnswer: "3rd and 6th",
          options: ["3rd and 5th", "3rd and 6th", "4th and 6th", "2nd and 6th"],
        },
        {
          id: "ex3-4",
          type: "identify",
          prompt: "Listen to this chord. Which bass note is it?",
          correctAnswer: "7",
          options: ["5", "6", "7", "1"],
          audioPattern: ["B3", "D5", "G5"],
        },
        {
          id: "ex3-5",
          type: "identify",
          prompt: "Why is 6/3 smoother than 5/3 for stepwise bass motion?",
          correctAnswer: "The bass moves by step, not leap",
          options: [
            "The bass moves by step, not leap",
            "It has more notes",
            "It's louder",
            "It's in a higher register",
          ],
        },
        {
          id: "ex3-6",
          type: "identify",
          prompt: "Listen to this progression. Which is it?",
          correctAnswer: "I-I6-V",
          options: ["I-IV-V", "I-I6-V", "I-V-I"],
          audioPattern: ["C3", "E4", "G4", "C5", "E3", "G4", "C5", "G3", "B4", "D5"],
        },
        {
          id: "ex3-7-keyboard",
          type: "play",
          prompt: "KEYBOARD: Realize this ascending bass line with 6/3 chords: C-D-E-F (figures: - 6 6 -)",
          correctAnswer: "Play bass C-D-E-F with left hand, right hand plays: C-E-G, D-F-A, E-G-C, F-A-C",
          hints: [
            "The 6/3 chords create smooth stepwise motion. Keep the right hand close together, moving each voice by step when possible.",
          ],
        },
        {
          id: "ex3-8-melodic",
          type: "play",
          prompt: "MELODIES: Create a melodic line over this bass: C-D-E-F (I-ii6-I6-IV)",
          correctAnswer:
            "Improvise a melody using chord tones, emphasizing stepwise motion to match the smooth bass line",
          hints: [
            "Try starting on G (5), moving to F (over D), E (over E), then C or F (over F). Stepwise motion works beautifully with 6/3 chords.",
          ],
          bassPattern: "C3-D3-E3-F3",
          beatsPerNote: 4,
          tempo: 80,
        },
      ],
      historicalContext:
        "First inversion chords (6/3) were essential for creating smooth, stepwise bass lines in baroque music. The Rule of the Octave uses 6/3 chords on scale degrees 2, 3, 6, and 7 ascending.",
    },
  },
  {
    id: "found-4-figured-bass-64",
    title: "Second Inversion: 6/4",
    description: "Learn the 6/4 chord - second inversion triad",
    category: "foundations",
    tradition: "both",
    difficulty: "beginner",
    level: 1,
    prerequisites: ["found-3-figured-bass-63"],
    xpReward: 15,
    content: {
      theory:
        "6/4 indicates second inversion. The bass has the 5th of the chord. In C major, bass note 5 with 6/4 = G-C-E. The 6/4 is unstable and usually resolves to 5/3. The most important use is the cadential 6/4: I6/4 on a strong beat resolves to V on the next beat, creating a powerful cadence.",
      examples: [
        {
          id: "ex-1",
          description: "Cadential 6/4 (I6/4 resolving to V)",
          notation: "Bass: 5-5, Figures: 6/4-5/3",
          audioPattern: ["G3", "C5", "E5", "G3", "B4", "D5"],
          figuredBass: "6/4-5/3",
        },
        {
          id: "ex-2",
          description: "Passing 6/4 (between I and I6)",
          notation: "Bass: 1-2-3, Figures: 5/3-6/4-6",
          audioPattern: ["C3", "E4", "G4", "D3", "F4", "A4", "E3", "G4", "C5"],
          figuredBass: "5/3-6/4-6",
        },
        {
          id: "ex-3",
          description: "Pedal 6/4 (over sustained bass)",
          notation: "Bass: 1-1-1, Figures: 5/3-6/4-5/3",
          audioPattern: ["C3", "E4", "G4", "C3", "F4", "A4", "C3", "E4", "G4"],
          figuredBass: "5/3-6/4-5/3",
        },
      ],
      exercises: [
        {
          id: "ex4-1",
          type: "identify",
          prompt: "What intervals are above the bass in a 6/4 chord?",
          correctAnswer: "4th and 6th",
          options: ["3rd and 5th", "3rd and 6th", "4th and 6th", "2nd and 6th"],
        },
        {
          id: "ex4-2",
          type: "identify",
          prompt: "Listen to this cadential 6/4. What does it resolve to?",
          correctAnswer: "V (5/3)",
          options: ["I (5/3)", "V (5/3)", "IV (5/3)", "vi (5/3)"],
          audioPattern: ["G3", "C5", "E5", "G3", "B4", "D5"],
        },
        {
          id: "ex4-3",
          type: "identify",
          prompt: "Why is the 6/4 chord considered unstable?",
          correctAnswer: "The 4th above a bass was traditionally considered a dissonance",
          options: [
            "It has too many notes",
            "The 4th above a bass was traditionally considered a dissonance",
            "It's too high",
            "It's too quiet",
          ],
        },
        {
          id: "ex4-4",
          type: "identify",
          prompt: "In a cadential 6/4, which bass note is most common?",
          correctAnswer: "5 (dominant)",
          options: ["1 (tonic)", "4 (subdominant)", "5 (dominant)", "6 (submediant)"],
        },
        {
          id: "ex4-5",
          type: "identify",
          prompt: "Listen to this progression. Which type of 6/4 is it?",
          correctAnswer: "Passing 6/4",
          options: ["Cadential 6/4", "Passing 6/4", "Pedal 6/4"],
          audioPattern: ["C3", "E4", "G4", "D3", "F4", "A4", "E3", "G4", "C5"],
        },
        {
          id: "ex4-6",
          type: "identify",
          prompt: "In C major, bass note 5 with 6/4 creates which notes?",
          correctAnswer: "G-C-E",
          options: ["C-E-G", "E-G-C", "G-C-E", "G-B-D"],
        },
        {
          id: "ex4-7-keyboard",
          type: "play",
          prompt: "KEYBOARD: Realize a cadential 6/4: Bass G-G (figures: 6/4-5/3), then resolve to C",
          correctAnswer:
            "Play bass G in bass twice, right hand plays C-E-G (6/4) then B-D-G (5/3), then resolve to C-E-G over bass C",
          hints: [
            "The 6/4 chord (C-E over bass G) resolves down by step: C→B and E→D, creating the V chord before final resolution to I.",
          ],
        },
        {
          id: "ex4-8-melodic",
          type: "play",
          prompt: "MELODIES: Create a melodic cadence using the cadential 6/4 pattern",
          correctAnswer:
            "Improvise a melody that emphasizes the resolution: use C or E over the first G (6/4), resolve to B or D over the second G (V), then end on C",
          hints: [
            "Try: E (over G 6/4) → D (over G V) → C (over C I). The stepwise descent creates a strong cadential feeling.",
          ],
          bassPattern: "G3-G3-C3",
          beatsPerNote: 4,
          tempo: 80,
        },
      ],
      historicalContext:
        "The cadential 6/4 is one of the most important patterns in baroque music. It appears in virtually every piece and was one of the first patterns taught to students. The 6/4 chord's instability (due to the dissonant 4th above the bass) and need for resolution makes it perfect for creating strong cadences.",
    },
  },
  {
    id: "found-5-three-cadences",
    title: "The Three Partimenti Cadences",
    description: "Master Simple, Compound, and Double cadences (Neapolitan tradition)",
    category: "foundations",
    tradition: "italian",
    difficulty: "beginner",
    level: 1,
    prerequisites: ["found-4-figured-bass-64"],
    xpReward: 20,
    content: {
      theory:
        "In partimenti pedagogy, cadences are classified by how long the dominant lasts, not by their harmonic function. The THREE BASIC CADENCES are: (1) SIMPLE CADENCE (Cadenza Semplice): dominant lasts ONE beat with a single sonority (5/3 or 7/3). (2) COMPOUND CADENCE (Cadenza Composta): dominant lasts TWO beats with two sonorities, often including a 4-3 suspension. (3) DOUBLE CADENCE (Cadenza Doppia): dominant lasts FOUR beats with four successive sonorities above V: 5/3 (or 7/3), 6/4, 5/4, and 5/3 (or 7/3). These cadences are the foundation of all baroque music and must be memorized in all keys.",
      examples: [
        {
          id: "ex-1",
          description: "Simple Cadence (Cadenza Semplice) - V lasts 1 beat",
          notation: "Bass: 5-1, Figures: 7/3-5/3 (or 5/3-5/3)",
          audioPattern: ["G3", "B4", "D5", "F5", "C3", "E4", "G4", "C5"],
          figuredBass: "7/3-5/3",
        },
        {
          id: "ex-2",
          description: "Compound Cadence (Cadenza Composta) - V lasts 2 beats with 4-3 suspension",
          notation: "Bass: 5-5-1, Figures: 5/4-5/3-5/3",
          audioPattern: ["G3", "C5", "D5", "G3", "B4", "D5", "C3", "E4", "G4", "C5"],
          figuredBass: "5/4-5/3-5/3",
        },
        {
          id: "ex-3",
          description: "Double Cadence (Cadenza Doppia) - V lasts 4 beats with four sonorities",
          notation: "Bass: 5-5-5-5-1, Figures: 5/3-6/4-5/4-5/3-5/3",
          audioPattern: [
            "G3",
            "B4",
            "D5",
            "G3",
            "C5",
            "E5",
            "G3",
            "C5",
            "D5",
            "G3",
            "B4",
            "D5",
            "C3",
            "E4",
            "G4",
            "C5",
          ],
          figuredBass: "5/3-6/4-5/4-5/3-5/3",
        },
        {
          id: "ex-4",
          description: "Double Cadence with I-V-I bass (alternative form)",
          notation: "Bass: 1-5-5-5-5-1, Figures: 5/3-5/3-6/4-5/4-7/3-5/3",
          audioPattern: [
            "C3",
            "E4",
            "G4",
            "G3",
            "B4",
            "D5",
            "G3",
            "C5",
            "E5",
            "G3",
            "C5",
            "D5",
            "G3",
            "B4",
            "D5",
            "F5",
            "C3",
            "E4",
            "G4",
            "C5",
          ],
          figuredBass: "5/3-5/3-6/4-5/4-7/3-5/3",
        },
      ],
      exercises: [
        {
          id: "ex5-1",
          type: "identify",
          prompt: "Listen to this cadence. How many beats does the dominant last?",
          correctAnswer: "1 beat (Simple Cadence)",
          options: ["1 beat (Simple Cadence)", "2 beats (Compound Cadence)", "4 beats (Double Cadence)"],
          audioPattern: ["G3", "B4", "D5", "F5", "C3", "E4", "G4", "C5"],
        },
        {
          id: "ex5-2",
          type: "identify",
          prompt: "Listen to this cadence. Which type is it?",
          correctAnswer: "Compound Cadence",
          options: ["Simple Cadence", "Compound Cadence", "Double Cadence"],
          audioPattern: ["G3", "C5", "D5", "G3", "B4", "D5", "C3", "E4", "G4", "C5"],
        },
        {
          id: "ex5-3",
          type: "identify",
          prompt: "Listen to this cadence. Which type is it?",
          correctAnswer: "Double Cadence",
          options: ["Simple Cadence", "Compound Cadence", "Double Cadence"],
          audioPattern: [
            "G3",
            "B4",
            "D5",
            "G3",
            "C5",
            "E5",
            "G3",
            "C5",
            "D5",
            "G3",
            "B4",
            "D5",
            "C3",
            "E4",
            "G4",
            "C5",
          ],
        },
        {
          id: "ex5-4",
          type: "identify",
          prompt: "In a Compound Cadence, what suspension is typically used?",
          correctAnswer: "4-3 suspension",
          options: ["2-3 suspension", "4-3 suspension", "7-6 suspension", "9-8 suspension"],
        },
        {
          id: "ex5-5",
          type: "identify",
          prompt: "In a Double Cadence, what are the four sonorities above the dominant?",
          correctAnswer: "5/3, 6/4, 5/4, 5/3",
          options: ["5/3, 6/3, 5/3, 5/3", "5/3, 6/4, 5/4, 5/3", "6/3, 6/4, 5/3, 5/3", "5/3, 5/3, 5/3, 5/3"],
        },
        {
          id: "ex5-6",
          type: "identify",
          prompt: "Which cadence is the most elaborate and takes the longest time?",
          correctAnswer: "Double Cadence (Cadenza Doppia)",
          options: [
            "Simple Cadence (Cadenza Semplice)",
            "Compound Cadence (Cadenza Composta)",
            "Double Cadence (Cadenza Doppia)",
          ],
        },
        {
          id: "ex5-7-keyboard",
          type: "play",
          prompt:
            "KEYBOARD: Realize a Simple Cadence in C major. Bass: G-C with figures 7/3-5/3. Play the dominant seventh (G-B-D-F) resolving to tonic (C-E-G-C).",
          correctAnswer: "Correct realization with proper voice leading: F→E, D→C, B→C",
          hints: [
            "The seventh (F) must resolve down by step to E. Keep common tones where possible. The leading tone (B) resolves up to C.",
          ],
        },
        {
          id: "ex5-8-keyboard",
          type: "play",
          prompt:
            "KEYBOARD: Realize a Compound Cadence in C major. Bass: G-G-C with figures 5/4-5/3-5/3. The 4-3 suspension creates the compound effect.",
          correctAnswer: "Correct realization: G-C-D over first G, then G-B-D over second G, then C-E-G-C",
          hints: [
            "Prepare the C in the first chord, suspend it over the second G (creating the 4th), then resolve it down to B (the 3rd). This is the characteristic 4-3 suspension of the Compound Cadence.",
          ],
        },
        {
          id: "ex5-9-keyboard",
          type: "play",
          prompt:
            "KEYBOARD: Realize a Double Cadence in C major. Bass: G-G-G-G-C with figures 5/3-6/4-5/4-7/3-5/3. This is the most elaborate cadence.",
          correctAnswer: "Correct realization with all four sonorities: G-B-D, G-C-E, G-C-D, G-B-D-F, then C-E-G-C",
          hints: [
            "Each sonority lasts one beat. The 6/4 (C-E over G) is the cadential 6/4 we learned earlier. It resolves through 5/4 (C-D) to 7/3 (B-D-F) before final resolution to I.",
          ],
        },
        {
          id: "ex5-10-melodic",
          type: "play",
          prompt:
            "MELODIES: Create a melodic line over a Simple Cadence. The bass plays G (1 beat) then C (1 beat). Your melody should emphasize the resolution.",
          correctAnswer: "Melodic line using chord tones, emphasizing the resolution from V to I",
          hints: [
            "Try: D (over G) → C (over C), or F (over G) → E (over C). The stepwise descent creates a strong cadential feeling. You can also use B → C for the leading tone resolution.",
          ],
          bassPattern: "G3-C3",
          beatsPerNote: 4,
          tempo: 80,
        },
        {
          id: "ex5-11-melodic",
          type: "play",
          prompt:
            "MELODIES: Create a melodic line over a Compound Cadence. The bass plays G (2 beats) then C (1 beat). Use the 4-3 suspension in your melody.",
          correctAnswer: "Melodic line featuring a 4-3 suspension (C→B) over the dominant",
          hints: [
            "Try: C (over first G, held for 2 beats) → B (over second G) → C (over C). This creates the characteristic 4-3 suspension of the Compound Cadence. The C is prepared, suspended, then resolved down to B.",
          ],
          bassPattern: "G3-G3-C3",
          beatsPerNote: 4,
          tempo: 80,
        },
        {
          id: "ex5-12-melodic",
          type: "play",
          prompt:
            "MELODIES: Create a melodic line over a Double Cadence. The bass plays G (4 beats) then C (1 beat). Your melody should elaborate the four sonorities.",
          correctAnswer: "Melodic line that follows the four sonorities: 5/3, 6/4, 5/4, 7/3, then resolves to I",
          hints: [
            "Try: D (beat 1) → E (beat 2) → D (beat 3) → D or F (beat 4) → C (final). This follows the harmonic progression while creating a melodic line. You can also try: B → C → B → B → C for a simpler approach.",
          ],
          bassPattern: "G3-G3-G3-G3-C3",
          beatsPerNote: 4,
          tempo: 80,
        },
      ],
      historicalContext:
        "These three cadences are the foundation of Neapolitan partimenti pedagogy. Fenaroli wrote: 'Before attempting any partimento, the student must know the three cadences perfectly in all keys.' The Simple, Compound, and Double cadences appear in every baroque composition and were the first patterns memorized by students at the conservatories. Partimenti.org provides a dedicated lesson on these cadences: 'Learning Cadences' is recommended as essential study after mastering the Rule of the Octave. The Double Cadence (Cadenza Doppia) is particularly important as it combines elements from both Simple and Compound cadences, creating the most elaborate and satisfying resolution in baroque music.",
    },
  },
  {
    id: "found-6-rule-octave-asc-1",
    title: "Rule of the Octave - Ascending (1-4)",
    description: "Learn degrees 1-4 ascending with proper harmonization",
    category: "foundations",
    tradition: "italian",
    difficulty: "beginner",
    level: 1,
    prerequisites: ["found-5-three-cadences"],
    xpReward: 25,
    content: {
      theory:
        "The Rule of the Octave is THE fundamental pattern of baroque harmony. Ascending: 1(5/3), 2(6/3), 3(6/3), 4(5/3). Each scale degree has its standard harmonization.",
      examples: [],
      exercises: [],
      historicalContext:
        "First codified by François Campion (1716), the Rule of the Octave became the foundation of all baroque keyboard training. Every student memorized this pattern in all keys.",
    },
  },
  {
    id: "found-7-rule-octave-asc-2",
    title: "Rule of the Octave - Ascending (5-8)",
    description: "Complete the ascending Rule with degrees 5-8",
    category: "foundations",
    tradition: "italian",
    difficulty: "beginner",
    level: 1,
    prerequisites: ["found-6-rule-octave-asc-1"],
    xpReward: 25,
    content: {
      theory:
        "Ascending continued: 5(5/3), 6(6/3 or 5/3), 7(6/3 or 6/5/3), 8(5/3). The dominant (5) and tonic (8) are always 5/3.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "found-8-rule-octave-desc",
    title: "Rule of the Octave - Descending",
    description: "Learn the descending Rule with different harmonizations",
    category: "foundations",
    tradition: "italian",
    difficulty: "beginner",
    level: 1,
    prerequisites: ["found-7-rule-octave-asc-2"],
    xpReward: 30,
    content: {
      theory:
        "Descending: 8(5/3), 7(6/3), 6(6/3), 5(5/3), 4(6/3), 3(6/3), 2(7/5/3 or 6/5), 1(5/3). Note that degree 2 descending uses 7/5/3 (seventh chord), different from ascending!",
      examples: [],
      exercises: [],
    },
  },

  // ============================================
  // LEVEL 2: BASIC PATTERNS (Elementary)
  // ============================================
  {
    id: "basic-1-simple-suspensions",
    title: "Simple Suspensions: 4-3",
    description: "Learn the most common suspension pattern",
    category: "patterns",
    tradition: "both",
    difficulty: "elementary",
    level: 2,
    prerequisites: ["found-8-rule-octave-desc"],
    xpReward: 30,
    content: {
      theory:
        "A suspension delays resolution. The 4-3 suspension: prepare the 4th, suspend it over a new bass, then resolve down to the 3rd. Pattern: preparation - suspension - resolution.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "basic-2-romanesca",
    title: "Galant Schema: Romanesca",
    description: "Learn the descending tetrachord pattern",
    category: "schemata",
    tradition: "italian",
    difficulty: "elementary",
    level: 2,
    prerequisites: ["basic-1-simple-suspensions"],
    xpReward: 35,
    content: {
      theory:
        "Romanesca: 1-7-6-5 in the bass with specific upper voice patterns. One of the oldest and most common patterns in baroque music.",
      examples: [],
      exercises: [],
      historicalContext:
        "The Romanesca appears in countless baroque compositions from Corelli to Handel. It was one of the first patterns taught to composition students.",
    },
  },
  {
    id: "basic-3-do-re-mi",
    title: "Galant Schema: Do-Re-Mi",
    description: "Master the ascending 1-2-3 pattern",
    category: "schemata",
    tradition: "italian",
    difficulty: "elementary",
    level: 2,
    prerequisites: ["basic-2-romanesca"],
    xpReward: 35,
    content: {
      theory:
        "Do-Re-Mi: 1-2-3 in the bass, often with 5-6-7 in the soprano. A simple but elegant opening pattern used in countless pieces.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "basic-4-sol-fa-mi",
    title: "Galant Schema: Sol-Fa-Mi",
    description: "Learn the descending 5-4-3 pattern",
    category: "schemata",
    tradition: "italian",
    difficulty: "elementary",
    level: 2,
    prerequisites: ["basic-3-do-re-mi"],
    xpReward: 35,
    content: {
      theory: "Sol-Fa-Mi: 5-4-3 in the bass, often used as a closing pattern or to approach a cadence.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "basic-5-furno-partimenti-1",
    title: "Furno's Method: First Partimenti",
    description: "Begin with Giovanni Furno's clear, easy partimenti",
    category: "patterns",
    tradition: "italian",
    difficulty: "elementary",
    level: 2,
    prerequisites: ["basic-4-sol-fa-mi"],
    xpReward: 40,
    content: {
      theory:
        "Furno's partimenti are the perfect introduction. They combine the Rule of the Octave with simple cadences and suspensions. Each partimento is a complete musical phrase that teaches specific patterns. Start by playing the bass line, then add the right hand using the figures.",
      examples: [
        {
          id: "ex-1",
          description: "Furno Partimento No. 1 - Simple ascending scale",
          notation: "Bass: C D E F G A B C | Figures: - 6 6 - - 6 6 -",
          audioPattern: ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"],
          figuredBass: "- 6 6 - - 6 6 -",
        },
        {
          id: "ex-2",
          description: "Furno Partimento No. 2 - Descending with cadence",
          notation: "Bass: C B A G F E D C | Figures: - 6 6 - 6 6 7 -",
          audioPattern: ["C4", "B3", "A3", "G3", "F3", "E3", "D3", "C3"],
          figuredBass: "- 6 6 - 6 6 7 -",
        },
        {
          id: "ex-3",
          description: "Furno Partimento No. 3 - With authentic cadence",
          notation: "Bass: C D E F G C | Figures: - 6 6 - 7 -",
          audioPattern: ["C3", "D3", "E3", "F3", "G3", "C3"],
          figuredBass: "- 6 6 - 7 -",
        },
      ],
      exercises: [
        {
          id: "ex-furno-1",
          type: "play",
          prompt: "Realize this Furno partimento: Bass C-D-E-F-G-C with figures - 6 6 - 7 -",
          correctAnswer: "Correct realization with proper voice leading",
        },
      ],
      historicalContext:
        "Giovanni Furno (1748-1837) created the clearest and most pedagogical partimenti method, with written-out realizations for students to study. His 'Metodo facile, breve e chiaro' (Easy, Brief, and Clear Method) was used throughout Europe. Available at partimenti.org/partimenti/collections/furno/",
    },
  },
  {
    id: "basic-6-diminution-2to1",
    title: "Simple Diminutions: 2:1 Ratio",
    description: "Learn to add two notes for every one (Ortiz style)",
    category: "diminutions",
    tradition: "both",
    difficulty: "elementary",
    level: 2,
    prerequisites: ["basic-5-furno-partimenti-1"],
    xpReward: 35,
    content: {
      theory:
        "2:1 diminution: For every note, play two. Use passing tones (stepwise motion) or neighbor tones (step away and back).",
      examples: [],
      exercises: [],
      historicalContext:
        "Diego Ortiz (1553) systematized diminution pedagogy, starting with simple 2:1 ratios before progressing to more complex divisions.",
    },
  },

  // ============================================
  // LEVEL 3: INTERMEDIATE PATTERNS
  // ============================================
  {
    id: "inter-1-prinner",
    title: "Galant Schema: Prinner",
    description: "Master the descending 6-5-4-3 pattern",
    category: "schemata",
    tradition: "italian",
    difficulty: "intermediate",
    level: 3,
    prerequisites: ["basic-6-diminution-2to1"],
    xpReward: 45,
    content: {
      theory:
        "Prinner: 6-5-4-3 in the bass with alternating 5/3 and 6/3 chords. One of the most common opening patterns in galant music.",
      examples: [],
      exercises: [],
      historicalContext:
        "Named after Johann Jakob Prinner (1624-1694), this pattern appears in thousands of 18th-century compositions.",
    },
  },
  {
    id: "inter-2-meyer",
    title: "Galant Schema: Meyer",
    description: "Learn the 1-7-4-3 pattern",
    category: "schemata",
    tradition: "italian",
    difficulty: "intermediate",
    level: 3,
    prerequisites: ["inter-1-prinner"],
    xpReward: 45,
    content: {
      theory: "Meyer: 1-7-4-3 in the bass, often used as an opening riposte to the Prinner.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "inter-3-fonte",
    title: "Galant Schema: Fonte",
    description: "Master the sequential descending pattern",
    category: "schemata",
    tradition: "italian",
    difficulty: "intermediate",
    level: 3,
    prerequisites: ["inter-2-meyer"],
    xpReward: 50,
    content: {
      theory:
        "Fonte: A descending sequence, typically 4-3-2-1 with specific voice leading. Creates a sense of gentle descent.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "inter-4-monte",
    title: "Galant Schema: Monte",
    description: "Learn the ascending sequential pattern",
    category: "schemata",
    tradition: "italian",
    difficulty: "intermediate",
    level: 3,
    prerequisites: ["inter-3-fonte"],
    xpReward: 50,
    content: {
      theory: "Monte: An ascending sequence, the opposite of Fonte. Creates energy and forward motion.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "inter-5-ponte",
    title: "Galant Schema: Ponte",
    description: "Master the dominant pedal pattern",
    category: "schemata",
    tradition: "italian",
    difficulty: "intermediate",
    level: 3,
    prerequisites: ["inter-4-monte"],
    xpReward: 50,
    content: {
      theory:
        "Ponte: A dominant pedal (sustained 5 in bass) with upper voice motion. Creates anticipation and tension.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "inter-6-german-griffe-1",
    title: "German Griffe: Basic Hand Positions",
    description: "Learn fundamental German keyboard grip patterns",
    category: "patterns",
    tradition: "german",
    difficulty: "intermediate",
    level: 3,
    prerequisites: ["inter-5-ponte"],
    xpReward: 55,
    content: {
      theory:
        "Griffe (grips) are specific hand positions for common chord progressions. Learn the basic I-IV-V-I grip pattern.",
      examples: [],
      exercises: [],
      historicalContext:
        "Friedrich Erhardt Niedt's 'Musicalische Handleitung' (1700-1721) systematized Griffe as the foundation of German keyboard pedagogy.",
    },
  },
  {
    id: "inter-7-diminution-4to1",
    title: "Intermediate Diminutions: 4:1 Ratio",
    description: "Add four notes for every one (Ortiz/Bovicelli style)",
    category: "diminutions",
    tradition: "both",
    difficulty: "intermediate",
    level: 3,
    prerequisites: ["inter-6-german-griffe-1"],
    xpReward: 50,
    content: {
      theory:
        "4:1 diminution: Combine passing tones, neighbor tones, and small leaps. Use consonant notes on strong beats.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "inter-8-fenaroli-book1",
    title: "Fenaroli Book I: Simple Figured Basses",
    description: "Begin Fenaroli's systematic partimenti method",
    category: "patterns",
    tradition: "italian",
    difficulty: "intermediate",
    level: 3,
    prerequisites: ["inter-7-diminution-4to1"],
    xpReward: 60,
    content: {
      theory:
        "Fenaroli Book I introduces simple figured basses without complex dissonances. Focus on smooth voice leading and proper doubling. These partimenti teach you to think harmonically while maintaining melodic lines in all voices. Prerequisites: You must know the three cadences and the Rule of the Octave before attempting Fenaroli.",
      examples: [
        {
          id: "ex-1",
          description: "Fenaroli Book I, No. 1 - Simple ascending bass",
          notation: "Bass: C D E F G A B C | Figures: - 6 6 5 - 6 6 5",
          audioPattern: ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"],
          figuredBass: "- 6 6 5 - 6 6 5",
        },
        {
          id: "ex-2",
          description: "Fenaroli Book I, No. 2 - With passing seventh",
          notation: "Bass: C D E F G C | Figures: - 6 6 - 7 -",
          audioPattern: ["C3", "D3", "E3", "F3", "G3", "C3"],
          figuredBass: "- 6 6 - 7 -",
        },
        {
          id: "ex-3",
          description: "Fenaroli Book I, No. 5 - Introducing suspensions",
          notation: "Bass: C F G C | Figures: - 4-3 7 -",
          audioPattern: ["C3", "F3", "G3", "C3"],
          figuredBass: "- 4-3 7 -",
        },
      ],
      exercises: [
        {
          id: "ex-fen1-1",
          type: "play",
          prompt: "Realize Fenaroli Book I, No. 1 with proper voice leading",
          correctAnswer: "Correct realization",
        },
      ],
      historicalContext:
        "Fedele Fenaroli (1730-1818) created the most thorough and detailed partimenti method, used throughout Europe for over a century. His four-book series progresses from simple figured basses to complex fugal partimenti. Book I is the foundation. Complete collection at partimenti.org/partimenti/collections/fenaroli/",
    },
  },

  // ============================================
  // LEVEL 4: ADVANCED PATTERNS
  // ============================================
  {
    id: "adv-1-fenaroli-schema",
    title: "Galant Schema: Fenaroli",
    description: "Master the 7-1-7-1 pattern",
    category: "schemata",
    tradition: "italian",
    difficulty: "advanced",
    level: 4,
    prerequisites: ["inter-8-fenaroli-book1"],
    xpReward: 65,
    content: {
      theory: "Fenaroli: 7-1-7-1 in the bass with specific upper voice patterns. A sophisticated cadential approach.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "adv-2-indugio",
    title: "Galant Schema: Indugio",
    description: "Learn the pedal point delay pattern",
    category: "schemata",
    tradition: "italian",
    difficulty: "advanced",
    level: 4,
    prerequisites: ["adv-1-fenaroli-schema"],
    xpReward: 65,
    content: {
      theory:
        "Indugio: A pedal point on 4 with 6 or 6/5 chord, delaying the cadence. Creates suspense and anticipation.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "adv-3-jupiter",
    title: "Galant Schema: Jupiter",
    description: "Master the 1-2-4-3 pattern",
    category: "schemata",
    tradition: "italian",
    difficulty: "advanced",
    level: 4,
    prerequisites: ["adv-2-indugio"],
    xpReward: 65,
    content: {
      theory: "Jupiter: 1-2-4-3 in the bass, named after Mozart's Jupiter Symphony. A majestic opening pattern.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "adv-4-aprile",
    title: "Galant Schema: Aprile",
    description: "Learn the 4-3-7-1 pattern",
    category: "schemata",
    tradition: "italian",
    difficulty: "advanced",
    level: 4,
    prerequisites: ["adv-3-jupiter"],
    xpReward: 65,
    content: {
      theory: "Aprile: 4-3-7-1 in the bass, a sophisticated cadential pattern.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "adv-5-pastorella",
    title: "Galant Schema: Pastorella",
    description: "Master the pastoral 1-5-1 pattern",
    category: "schemata",
    tradition: "italian",
    difficulty: "advanced",
    level: 4,
    prerequisites: ["adv-4-aprile"],
    xpReward: 65,
    content: {
      theory: "Pastorella: 1-5-1 with drone bass, evoking pastoral scenes. Often in 6/8 or 12/8 time.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "adv-6-quieszenza",
    title: "Galant Schema: Quieszenza",
    description: "Learn the 4-3-2-1 closing pattern",
    category: "schemata",
    tradition: "italian",
    difficulty: "advanced",
    level: 4,
    prerequisites: ["adv-5-pastorella"],
    xpReward: 65,
    content: {
      theory: "Quieszenza: 4-3-2-1 in the bass, a gentle closing pattern. Creates a sense of peaceful resolution.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "adv-7-deceptive-cadence",
    title: "Galant Schema: Deceptive Cadence",
    description: "Master the V-vi surprise resolution",
    category: "schemata",
    tradition: "both",
    difficulty: "advanced",
    level: 4,
    prerequisites: ["adv-6-quieszenza"],
    xpReward: 60,
    content: {
      theory: "Deceptive Cadence: 5-6 instead of expected 5-1. Creates surprise and extends the phrase.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "adv-8-evaded-cadence",
    title: "Galant Schema: Evaded Cadence",
    description: "Learn cadential evasion techniques",
    category: "schemata",
    tradition: "both",
    difficulty: "advanced",
    level: 4,
    prerequisites: ["adv-7-deceptive-cadence"],
    xpReward: 60,
    content: {
      theory: "Evaded Cadence: The expected cadence is avoided through various techniques, extending the phrase.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "adv-9-passo-indietro",
    title: "Galant Schema: Passo Indietro",
    description: "Master the backward step pattern",
    category: "schemata",
    tradition: "italian",
    difficulty: "advanced",
    level: 4,
    prerequisites: ["adv-8-evaded-cadence"],
    xpReward: 65,
    content: {
      theory: "Passo Indietro: A step backward in the bass before moving forward, creating rhythmic interest.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "adv-10-german-griffe-2",
    title: "German Griffe: Sequential Patterns",
    description: "Learn Adlung's 28 sequential voice-leading patterns",
    category: "patterns",
    tradition: "german",
    difficulty: "advanced",
    level: 4,
    prerequisites: ["adv-9-passo-indietro"],
    xpReward: 70,
    content: {
      theory:
        "Adlung's patterns: scalar, sequential, and cadential modules. Learn to vary and recombine these formulas.",
      examples: [],
      exercises: [],
      historicalContext:
        "Jacob Adlung's 'Anweisung zum Fantasieren' (c. 1726-27) provides 28 sequential patterns with embellishments, forming the core of German improvisational training.",
    },
  },
  {
    id: "adv-11-diminution-8to1",
    title: "Advanced Diminutions: 8:1 Ratio",
    description: "Master complex diminutions (Ganassi/Bovicelli style)",
    category: "diminutions",
    tradition: "both",
    difficulty: "advanced",
    level: 4,
    prerequisites: ["adv-10-german-griffe-2"],
    xpReward: 70,
    content: {
      theory:
        "8:1 diminution: Complex rhythmic divisions with high proportional use. Requires advanced technique and musical taste.",
      examples: [],
      exercises: [],
      historicalContext:
        "Sylvestro Ganassi's 'La Fontegara' (1535) features the most complex diminutions of the Renaissance, with intricate rhythmic patterns.",
    },
  },
  {
    id: "adv-12-fenaroli-book2-3",
    title: "Fenaroli Books II-III: Complex Figured Basses",
    description: "Progress to more sophisticated partimenti",
    category: "patterns",
    tradition: "italian",
    difficulty: "advanced",
    level: 4,
    prerequisites: ["adv-11-diminution-8to1"],
    xpReward: 75,
    content: {
      theory:
        "Fenaroli Books II-III introduce complex suspensions, seventh chords, and chromatic passages. Requires mastery of voice leading. Book II focuses on more elaborate suspensions and dissonances. Book III introduces modulation and chromatic harmony. These partimenti prepare you for fugal writing.",
      examples: [
        {
          id: "ex-1",
          description: "Fenaroli Book II, No. 1 - Chain of suspensions",
          notation: "Bass: C F G C | Figures: - 9-8 4-3 7 -",
          audioPattern: ["C3", "F3", "G3", "C3"],
          figuredBass: "- 9-8 4-3 7 -",
        },
        {
          id: "ex-2",
          description: "Fenaroli Book II, No. 10 - Seventh chords",
          notation: "Bass: C D E F G C | Figures: 7 6/5 7 6/5 7 -",
          audioPattern: ["C3", "D3", "E3", "F3", "G3", "C3"],
          figuredBass: "7 6/5 7 6/5 7 -",
        },
        {
          id: "ex-3",
          description: "Fenaroli Book III, No. 1 - Modulation to dominant",
          notation: "Bass: C C# D Eb E F F# G | Figures: - #6 6 b6 6 6 #6 -",
          audioPattern: ["C3", "C#3", "D3", "Eb3", "E3", "F3", "F#3", "G3"],
          figuredBass: "- #6 6 b6 6 6 #6 -",
        },
      ],
      exercises: [],
      historicalContext:
        "Books II and III represent the intermediate stage of Neapolitan training. Students would spend months mastering these partimenti before progressing to Book IV. Many professional musicians never went beyond Book III.",
    },
  },

  // ============================================
  // LEVEL 5: MASTERY
  // ============================================
  {
    id: "mast-1-fenaroli-book4",
    title: "Fenaroli Book IV: Advanced Partimenti",
    description: "Master the most challenging partimenti",
    category: "patterns",
    tradition: "italian",
    difficulty: "mastery",
    level: 5,
    prerequisites: ["adv-12-fenaroli-book2-3"],
    xpReward: 100,
    content: {
      theory:
        "Fenaroli Book IV: The pinnacle of partimenti pedagogy. Complex modulations, chromatic harmony, and sophisticated voice leading. These partimenti are essentially fugues in bass-line form. Book IV was intended only for advanced students preparing for professional careers as composers and maestri di cappella.",
      examples: [
        {
          id: "ex-1",
          description: "Fenaroli Book IV, No. 1 - Fugal partimento",
          notation: "Bass: C G C D E F G C | Figures: - - - 6 6 6/5 7 -",
          audioPattern: ["C3", "G3", "C3", "D3", "E3", "F3", "G3", "C3"],
          figuredBass: "- - - 6 6 6/5 7 -",
        },
        {
          id: "ex-2",
          description: "Fenaroli Book IV, No. 5 - Chromatic modulation",
          notation: "Bass: C C# D Eb E F F# G | Figures: - #6 6 b6 6 6 #6 -",
          audioPattern: ["C3", "C#3", "D3", "Eb3", "E3", "F3", "F#3", "G3"],
          figuredBass: "- #6 6 b6 6 6 #6 -",
        },
      ],
      exercises: [],
      historicalContext:
        "Book IV represents the highest level of Neapolitan pedagogy. Students who mastered this book were considered ready to compose operas and sacred music. Bellini, Mercadante, and other great composers studied from this book.",
    },
  },
  {
    id: "mast-2-fugal-exposition",
    title: "Fugal Improvisation: Exposition",
    description: "Learn to improvise fugal expositions",
    category: "improvisation",
    tradition: "german",
    difficulty: "mastery",
    level: 5,
    prerequisites: ["mast-1-fenaroli-book4"],
    xpReward: 120,
    content: {
      theory:
        "Fugal exposition: Subject, answer, countersubject. Learn the rules of tonal answers and invertible counterpoint.",
      examples: [],
      exercises: [],
      historicalContext:
        "John Mortensen's 'Improvising Fugue' (2023) revives the lost art of fugal improvisation, once a required skill for all organists.",
    },
  },
  {
    id: "mast-3-fugal-episodes",
    title: "Fugal Improvisation: Episodes",
    description: "Master sequential episodes and modulations",
    category: "improvisation",
    tradition: "german",
    difficulty: "mastery",
    level: 5,
    prerequisites: ["mast-2-fugal-exposition"],
    xpReward: 120,
    content: {
      theory: "Episodes: Sequential passages that modulate to new keys. Use fragments of the subject in sequence.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "mast-4-imitazione",
    title: "Imitazione: Imitative Counterpoint",
    description: "Learn Italian imitative improvisation techniques",
    category: "improvisation",
    tradition: "italian",
    difficulty: "mastery",
    level: 5,
    prerequisites: ["mast-3-fugal-episodes"],
    xpReward: 120,
    content: {
      theory:
        "Imitazione: Free imitative counterpoint without strict fugal rules. More flexible and expressive than German fugue.",
      examples: [],
      exercises: [],
    },
  },
  {
    id: "mast-5-free-improvisation",
    title: "Free Improvisation: Combining All Elements",
    description: "Improvise freely using all learned patterns and techniques",
    category: "improvisation",
    tradition: "both",
    difficulty: "mastery",
    level: 5,
    prerequisites: ["mast-4-imitazione"],
    xpReward: 150,
    content: {
      theory:
        "Free improvisation: Combine schemata, diminutions, Griffe, and fugal techniques into coherent musical statements. The ultimate goal of baroque training.",
      examples: [],
      exercises: [],
      historicalContext:
        "In the baroque era, all professional musicians were expected to improvise. Handel, Bach, Mozart, and Beethoven were renowned for their improvisational abilities.",
    },
  },
  {
    id: "mast-6-durante-partimenti",
    title: "Durante's Diminished Partimenti",
    description: "Master Francesco Durante's sophisticated partimenti",
    category: "patterns",
    tradition: "italian",
    difficulty: "mastery",
    level: 5,
    prerequisites: ["mast-1-fenaroli-book4"],
    xpReward: 120,
    content: {
      theory:
        "Francesco Durante (1684-1755) was the most influential teacher at the Neapolitan conservatories. His partimenti are more sophisticated and chromatic than Fenaroli's, with extensive use of diminished harmonies and complex voice leading. Durante taught Pergolesi, Paisiello, Piccinni, and many other great composers.",
      examples: [
        {
          id: "ex-1",
          description: "Durante Partimento - Diminished seventh chains",
          notation: "Bass: C B Bb A Ab G | Figures: - 6/5 6/5 6/5 6/5 -",
          audioPattern: ["C3", "B2", "Bb2", "A2", "Ab2", "G2"],
          figuredBass: "- 6/5 6/5 6/5 6/5 -",
        },
      ],
      exercises: [],
      historicalContext:
        "Durante's partimenti represent the highest level of Neapolitan sophistication. Available at partimenti.org/partimenti/collections/durante/. His students dominated Italian opera for generations.",
    },
  },
  {
    id: "mast-7-insanguine-rules",
    title: "Insanguine's Rules and Partimenti",
    description: "Study Giacomo Insanguine's systematic approach",
    category: "patterns",
    tradition: "italian",
    difficulty: "mastery",
    level: 5,
    prerequisites: ["mast-6-durante-partimenti"],
    xpReward: 120,
    content: {
      theory:
        "Giacomo Insanguine (1728-1795), known as 'Monopoli', created a comprehensive rulebook that systematizes all the patterns of Neapolitan pedagogy. His partimenti are clear and methodical, making them excellent for understanding the underlying principles.",
      examples: [],
      exercises: [],
      historicalContext:
        "Insanguine's rulebook is recommended by partimenti.org as essential reading after Furno and before Fenaroli. His systematic approach helps students understand WHY patterns work, not just HOW to play them. Collection at partimenti.org/partimenti/collections/insanguine/",
    },
  },
  {
    id: "mast-8-sala-rules",
    title: "Nicola Sala's Theoretical Rules",
    description: "Master the theoretical foundations with Sala",
    category: "patterns",
    tradition: "italian",
    difficulty: "mastery",
    level: 5,
    prerequisites: ["mast-7-insanguine-rules"],
    xpReward: 120,
    content: {
      theory:
        "Nicola Sala (1713-1801) wrote the most comprehensive theoretical treatise on partimenti. His 'Regole del Contrappunto Pratico' (Rules of Practical Counterpoint) explains the theoretical basis for all the patterns you've learned.",
      examples: [],
      exercises: [],
      historicalContext:
        "Sala's treatise was the standard textbook at the Neapolitan conservatories. It explains the 'why' behind every rule and pattern. Essential reading for serious students. Available at partimenti.org/partimenti/collections/sala/",
    },
  },
]

export const SKILL_LEVELS = [
  { level: 1, name: "Novice", xp: 0, xpRequired: 100 },
  { level: 2, name: "Apprentice", xp: 0, xpRequired: 300 },
  { level: 3, name: "Student", xp: 0, xpRequired: 600 },
  { level: 4, name: "Practitioner", xp: 0, xpRequired: 1200 },
  { level: 5, name: "Journeyman", xp: 0, xpRequired: 2400 },
  { level: 6, name: "Master", xp: 0, xpRequired: 4800 },
  { level: 7, name: "Virtuoso", xp: 0, xpRequired: 9600 },
]

// Helper functions for curriculum navigation
export function getLessonById(id: string): Lesson | undefined {
  return CURRICULUM.find((lesson) => lesson.id === id)
}

export function getLessonsByLevel(level: number): Lesson[] {
  return CURRICULUM.filter((lesson) => lesson.level === level)
}

export function getLessonsByTradition(tradition: "italian" | "german" | "both"): Lesson[] {
  return CURRICULUM.filter((lesson) => lesson.tradition === tradition || lesson.tradition === "both")
}

export function getNextLesson(currentLessonId: string, completedLessonIds: string[]): Lesson | null {
  const currentIndex = CURRICULUM.findIndex((l) => l.id === currentLessonId)
  if (currentIndex === -1) return CURRICULUM[0] // Start from beginning

  // Find next lesson where all prerequisites are completed
  for (let i = currentIndex + 1; i < CURRICULUM.length; i++) {
    const lesson = CURRICULUM[i]
    const allPrereqsMet = lesson.prerequisites.every((prereq) => completedLessonIds.includes(prereq))
    if (allPrereqsMet) return lesson
  }

  return null // No more lessons available
}

export function getAvailableLessons(completedLessonIds: string[]): Lesson[] {
  return CURRICULUM.filter((lesson) => {
    const allPrereqsMet = lesson.prerequisites.every((prereq) => completedLessonIds.includes(prereq))
    const notCompleted = !completedLessonIds.includes(lesson.id)
    return allPrereqsMet && notCompleted
  })
}
