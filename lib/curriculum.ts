import type { Lesson, Achievement, SkillLevel } from "./types"

export const CURRICULUM: Lesson[] = [
  {
    id: "scale-degrees",
    title: "Understanding Scale Degrees",
    category: "foundations",
    level: 1,
    prerequisites: [],
    description: "Learn the Do-Re-Mi system and how scale degrees form the foundation of partimenti.",
    theory:
      "In partimenti, we use the Do-Re-Mi system (movable Do solfège) where Do is always the tonic (home note) of the key. Each scale degree has a specific function: Do (1) is stable, Re (2) moves upward, Mi (3) defines major/minor, Fa (4) pulls to Mi, Sol (5) is the dominant, La (6) is flexible, and Ti (7) leads to Do.",
    examples: [
      {
        id: "scale-c-major",
        description: "C Major scale with Do-Re-Mi labels",
        audioPattern: {
          notes: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
          durations: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
        },
        figuredBass: "Do Re Mi Fa Sol La Ti Do",
      },
    ],
    exercises: [
      {
        id: "identify-scale-degrees",
        type: "identification",
        prompt: "Listen to the note and identify which scale degree it is",
        difficulty: "beginner",
      },
    ],
  },
  {
    id: "do-chord",
    title: "The Do Chord (Tonic Triad)",
    category: "chords",
    level: 1,
    prerequisites: ["scale-degrees"],
    description: "Master the tonic triad - the home chord that provides stability and resolution.",
    theory:
      "The Do chord (I) is built on the first scale degree and consists of Do-Mi-Sol (1-3-5). It's the most stable chord in any key and serves as the point of departure and return. In figured bass, it's often unmarked or shown as '5/3'.",
    examples: [
      {
        id: "do-chord-root",
        description: "Do chord in root position (Do-Mi-Sol)",
        audioPattern: {
          notes: [["C4", "E4", "G4"]],
          durations: [2.0],
        },
        figuredBass: "5/3 or unmarked",
      },
      {
        id: "do-chord-first-inv",
        description: "Do chord in first inversion (Mi-Sol-Do)",
        audioPattern: {
          notes: [["E4", "G4", "C5"]],
          durations: [2.0],
        },
        figuredBass: "6",
      },
    ],
    exercises: [
      {
        id: "play-do-chord",
        type: "keyboard",
        prompt: "Play the Do chord in root position",
        difficulty: "beginner",
      },
      {
        id: "identify-do-inversions",
        type: "identification",
        prompt: "Identify whether the Do chord is in root position or first inversion",
        difficulty: "beginner",
      },
    ],
  },
  {
    id: "re-chord",
    title: "The Re Chord (Supertonic)",
    category: "chords",
    level: 1,
    prerequisites: ["do-chord"],
    description: "Learn the supertonic chord that creates forward motion toward the dominant.",
    theory:
      "The Re chord (ii) is built on the second scale degree: Re-Fa-La (2-4-6). It's a minor chord in major keys and diminished in minor keys. The Re chord typically moves to Sol (V) or Do (I), creating a sense of gentle forward motion.",
    examples: [
      {
        id: "re-chord-root",
        description: "Re chord in root position (Re-Fa-La)",
        audioPattern: {
          notes: [["D4", "F4", "A4"]],
          durations: [2.0],
        },
        figuredBass: "5/3",
      },
      {
        id: "re-to-sol",
        description: "Re chord moving to Sol (ii-V progression)",
        audioPattern: {
          notes: [
            ["D4", "F4", "A4"],
            ["G4", "B4", "D5"],
          ],
          durations: [1.0, 1.0],
        },
        figuredBass: "ii - V",
      },
    ],
    exercises: [
      {
        id: "play-re-chord",
        type: "keyboard",
        prompt: "Play the Re chord in root position",
        difficulty: "beginner",
      },
      {
        id: "re-to-sol-progression",
        type: "keyboard",
        prompt: "Play the progression: Re chord to Sol chord",
        difficulty: "beginner",
      },
    ],
  },
  {
    id: "mi-chord",
    title: "The Mi Chord (Mediant)",
    category: "chords",
    level: 1,
    prerequisites: ["re-chord"],
    description: "Explore the mediant chord that bridges tonic and dominant functions.",
    theory:
      "The Mi chord (iii) is built on the third scale degree: Mi-Sol-Ti (3-5-7). It's a minor chord in major keys. The Mi chord shares two notes with the Do chord (Mi and Sol), making it a gentle alternative to the tonic. It often moves to Fa (IV) or La (vi).",
    examples: [
      {
        id: "mi-chord-root",
        description: "Mi chord in root position (Mi-Sol-Ti)",
        audioPattern: {
          notes: [["E4", "G4", "B4"]],
          durations: [2.0],
        },
        figuredBass: "5/3",
      },
      {
        id: "do-mi-fa",
        description: "Common progression: Do-Mi-Fa (I-iii-IV)",
        audioPattern: {
          notes: [
            ["C4", "E4", "G4"],
            ["E4", "G4", "B4"],
            ["F4", "A4", "C5"],
          ],
          durations: [1.0, 1.0, 1.0],
        },
        figuredBass: "I - iii - IV",
      },
    ],
    exercises: [
      {
        id: "play-mi-chord",
        type: "keyboard",
        prompt: "Play the Mi chord in root position",
        difficulty: "beginner",
      },
      {
        id: "identify-mi-chord",
        type: "identification",
        prompt: "Identify when you hear the Mi chord in a progression",
        difficulty: "beginner",
      },
    ],
  },
  {
    id: "fa-chord",
    title: "The Fa Chord (Subdominant)",
    category: "chords",
    level: 1,
    prerequisites: ["mi-chord"],
    description: "Master the subdominant chord that prepares dominant and tonic arrivals.",
    theory:
      "The Fa chord (IV) is built on the fourth scale degree: Fa-La-Do (4-6-1). It's a major chord that creates a sense of departure from the tonic. The Fa chord typically moves to Sol (V) or directly to Do (I), and is essential in authentic cadences (IV-V-I).",
    examples: [
      {
        id: "fa-chord-root",
        description: "Fa chord in root position (Fa-La-Do)",
        audioPattern: {
          notes: [["F4", "A4", "C5"]],
          durations: [2.0],
        },
        figuredBass: "5/3",
      },
      {
        id: "plagal-cadence",
        description: "Plagal cadence: Fa-Do (IV-I)",
        audioPattern: {
          notes: [
            ["F4", "A4", "C5"],
            ["C4", "E4", "G4"],
          ],
          durations: [1.0, 2.0],
        },
        figuredBass: "IV - I",
      },
    ],
    exercises: [
      {
        id: "play-fa-chord",
        type: "keyboard",
        prompt: "Play the Fa chord in root position",
        difficulty: "beginner",
      },
      {
        id: "fa-sol-do-progression",
        type: "keyboard",
        prompt: "Play the authentic cadence: Fa-Sol-Do (IV-V-I)",
        difficulty: "beginner",
      },
    ],
  },
  {
    id: "cadences",
    title: "Cadences: Musical Punctuation",
    category: "progressions",
    level: 2,
    prerequisites: ["fa-chord"],
    description: "Learn how cadences create phrases and provide closure in baroque music.",
    theory:
      "Cadences are harmonic formulas that create points of rest or closure. The authentic cadence (V-I) provides strong closure, the half cadence (ending on V) creates suspense, and the deceptive cadence (V-vi) surprises by avoiding the expected resolution. Cadences are the punctuation marks of musical phrases.",
    examples: [
      {
        id: "authentic-cadence",
        description: "Authentic cadence: Sol-Do (V-I)",
        audioPattern: {
          notes: [
            ["G4", "B4", "D5"],
            ["C4", "E4", "G4"],
          ],
          durations: [1.0, 2.0],
        },
        figuredBass: "V - I",
      },
      {
        id: "half-cadence",
        description: "Half cadence: ending on Sol (V)",
        audioPattern: {
          notes: [
            ["C4", "E4", "G4"],
            ["G4", "B4", "D5"],
          ],
          durations: [1.0, 2.0],
        },
        figuredBass: "I - V",
      },
      {
        id: "deceptive-cadence",
        description: "Deceptive cadence: Sol-La (V-vi)",
        audioPattern: {
          notes: [
            ["G4", "B4", "D5"],
            ["A4", "C5", "E5"],
          ],
          durations: [1.0, 2.0],
        },
        figuredBass: "V - vi",
      },
    ],
    exercises: [
      {
        id: "identify-cadence-types",
        type: "identification",
        prompt: "Listen and identify the type of cadence: authentic, half, or deceptive",
        difficulty: "intermediate",
      },
      {
        id: "play-cadences",
        type: "keyboard",
        prompt: "Play all three cadence types in sequence",
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "rule-of-octave",
    title: "Rule of the Octave",
    category: "progressions",
    level: 2,
    prerequisites: ["cadences"],
    description: "Master the fundamental bass pattern that harmonizes ascending and descending scales.",
    theory:
      "The Rule of the Octave is the most important pattern in baroque keyboard playing. It provides a standard harmonization for bass scales, both ascending and descending. Each scale degree receives specific chords and figured bass numbers. This pattern appears in countless baroque compositions and is essential for improvisation.",
    examples: [
      {
        id: "rule-ascending",
        description: "Rule of the Octave ascending in C major",
        audioPattern: {
          notes: [
            ["C4", "E4", "G4"],
            ["D4", "F4", "A4"],
            ["E4", "G4", "C5"],
            ["F4", "A4", "C5"],
            ["G4", "B4", "D5"],
            ["A4", "C5", "E5"],
            ["B4", "D5", "F5"],
            ["C5", "E5", "G5"],
          ],
          durations: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1.0],
        },
        figuredBass: "5/3 - 6/3 - 6 - 5/3 - 5/3 - 6/5 - 6/4 - 5/3",
      },
      {
        id: "rule-descending",
        description: "Rule of the Octave descending in C major",
        audioPattern: {
          notes: [
            ["C5", "E5", "G5"],
            ["B4", "D5", "G5"],
            ["A4", "C5", "F5"],
            ["G4", "B4", "E5"],
            ["F4", "A4", "D5"],
            ["E4", "G4", "C5"],
            ["D4", "F4", "B4"],
            ["C4", "E4", "G4"],
          ],
          durations: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1.0],
        },
        figuredBass: "5/3 - 6 - 6/5 - 6 - 6/5 - 5/3 - 7 - 5/3",
      },
    ],
    exercises: [
      {
        id: "play-rule-ascending",
        type: "keyboard",
        prompt: "Play the Rule of the Octave ascending",
        difficulty: "intermediate",
      },
      {
        id: "play-rule-descending",
        type: "keyboard",
        prompt: "Play the Rule of the Octave descending",
        difficulty: "intermediate",
      },
      {
        id: "identify-rule-patterns",
        type: "identification",
        prompt: "Identify whether the Rule of the Octave is ascending or descending",
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "suspensions",
    title: "Suspensions: Creating Expressive Tension",
    category: "decorations",
    level: 3,
    prerequisites: ["rule-of-octave"],
    description: "Learn how suspensions delay resolution to create expressive dissonance.",
    theory:
      "A suspension is a note held over from one chord into the next, creating a dissonance that then resolves downward by step. The three parts are: preparation (consonance), suspension (dissonance), and resolution (consonance). Common suspensions include 4-3, 7-6, 9-8, and 2-3. Suspensions add expressiveness and forward motion to baroque music.",
    examples: [
      {
        id: "suspension-4-3",
        description: "4-3 suspension",
        audioPattern: {
          notes: [
            ["C4", "F4", "A4"],
            ["C4", "E4", "G4"],
          ],
          durations: [1.0, 1.0],
        },
        figuredBass: "4 - 3",
      },
      {
        id: "suspension-7-6",
        description: "7-6 suspension",
        audioPattern: {
          notes: [
            ["D4", "C5"],
            ["D4", "B4"],
          ],
          durations: [1.0, 1.0],
        },
        figuredBass: "7 - 6",
      },
      {
        id: "suspension-9-8",
        description: "9-8 suspension",
        audioPattern: {
          notes: [
            ["C4", "D5"],
            ["C4", "C5"],
          ],
          durations: [1.0, 1.0],
        },
        figuredBass: "9 - 8",
      },
    ],
    exercises: [
      {
        id: "identify-suspension-types",
        type: "identification",
        prompt: "Identify the type of suspension: 4-3, 7-6, 9-8, or 2-3",
        difficulty: "advanced",
      },
      {
        id: "play-suspensions",
        type: "keyboard",
        prompt: "Play a 4-3 suspension resolving properly",
        difficulty: "advanced",
      },
    ],
  },
  {
    id: "romanesca",
    title: "Galant Schema: Romanesca",
    category: "schemata",
    level: 3,
    prerequisites: ["suspensions"],
    description: "Master the Romanesca, one of the most beloved patterns in Western music.",
    theory:
      "The ROMANESCA is one of the oldest and most beloved patterns in Western music, appearing in countless songs, dances, and instrumental works from the Renaissance through the Baroque era. The bass descends by step: 1-7-6-5 (in C major: C-B-A-G). Above this descending bass, the upper voices create a series of consonances that give the Romanesca its characteristic sound. The standard harmonization uses: I - V6 - vi - III (or V/vi). This pattern appears in works by Corelli, Vivaldi, and countless other baroque masters.",
    examples: [
      {
        id: "romanesca-basic",
        description: "Basic Romanesca pattern in C major",
        audioPattern: {
          notes: [
            ["C4", "E4", "G4"],
            ["B3", "D4", "G4"],
            ["A3", "C4", "E4"],
            ["G3", "B3", "D4"],
          ],
          durations: [1.0, 1.0, 1.0, 1.0],
        },
        figuredBass: "1 - 7(6) - 6 - 5",
      },
      {
        id: "romanesca-with-chords",
        description: "Romanesca with full chords (I - V6 - vi - III)",
        audioPattern: {
          notes: [
            ["C4", "E4", "G4", "C5"],
            ["B3", "D4", "G4", "B4"],
            ["A3", "C4", "E4", "A4"],
            ["G3", "B3", "D4", "G4"],
          ],
          durations: [1.0, 1.0, 1.0, 1.5],
        },
        figuredBass: "I - V6 - vi - III",
      },
      {
        id: "romanesca-diminished",
        description: "Romanesca with simple diminutions (eighth notes)",
        audioPattern: {
          notes: [
            ["C4", "E4", "G4"],
            ["D4"],
            ["B3", "D4", "G4"],
            ["C4"],
            ["A3", "C4", "E4"],
            ["B3"],
            ["G3", "B3", "D4"],
          ],
          durations: [0.75, 0.25, 0.75, 0.25, 0.75, 0.25, 1.5],
        },
        figuredBass: "I - (passing) - V6 - (passing) - vi - (passing) - III",
      },
    ],
    exercises: [
      {
        id: "identify-romanesca",
        type: "identification",
        prompt: "Listen and identify when you hear a Romanesca pattern",
        difficulty: "advanced",
      },
      {
        id: "play-romanesca",
        type: "keyboard",
        prompt: "Play the Romanesca pattern with proper voice leading",
        difficulty: "advanced",
      },
      {
        id: "romanesca-with-diminutions",
        type: "composition",
        prompt: "Create a Romanesca pattern and add your own diminutions (passing notes, neighbor tones)",
        difficulty: "advanced",
      },
    ],
  },
  {
    id: "do-re-mi-schema",
    title: "Galant Schema: Do-Re-Mi",
    category: "schemata",
    level: 3,
    prerequisites: ["romanesca"],
    description: "Learn the ascending Do-Re-Mi pattern that creates optimistic, rising energy.",
    theory:
      "The DO-RE-MI schema is a rising bass pattern (1-2-3) that creates a sense of optimism and forward momentum. Unlike the descending Romanesca, this pattern ascends through the first three scale degrees. The standard harmonization is: I - V6/4 - I6 (or I - ii6 - I6). This pattern appears frequently in opening phrases and creates a bright, affirmative character. Composers like Handel and Vivaldi used it to begin movements with energy and confidence.",
    examples: [
      {
        id: "do-re-mi-basic",
        description: "Basic Do-Re-Mi pattern in C major",
        audioPattern: {
          notes: [
            ["C4", "E4", "G4"],
            ["D4", "F4", "G4"],
            ["E4", "G4", "C5"],
          ],
          durations: [1.0, 1.0, 1.5],
        },
        figuredBass: "1 - 2(6/4) - 3(6)",
      },
      {
        id: "do-re-mi-with-chords",
        description: "Do-Re-Mi with full chords (I - V6/4 - I6)",
        audioPattern: {
          notes: [
            ["C4", "E4", "G4", "C5"],
            ["D4", "F4", "G4", "B4"],
            ["E4", "G4", "C5", "E5"],
          ],
          durations: [1.0, 1.0, 1.5],
        },
        figuredBass: "I - V6/4 - I6",
      },
      {
        id: "do-re-mi-diminished",
        description: "Do-Re-Mi with passing tones and neighbor notes",
        audioPattern: {
          notes: [["C4", "E4", "G4"], ["D4"], ["D4", "F4", "G4"], ["E4"], ["E4", "G4", "C5"]],
          durations: [0.75, 0.25, 0.75, 0.25, 1.5],
        },
        figuredBass: "I - (passing) - V6/4 - (passing) - I6",
      },
    ],
    exercises: [
      {
        id: "identify-do-re-mi",
        type: "identification",
        prompt: "Listen and identify when you hear a Do-Re-Mi pattern",
        difficulty: "advanced",
      },
      {
        id: "play-do-re-mi",
        type: "keyboard",
        prompt: "Play the Do-Re-Mi pattern with proper voice leading",
        difficulty: "advanced",
      },
      {
        id: "do-re-mi-with-diminutions",
        type: "composition",
        prompt: "Create a Do-Re-Mi pattern and add your own diminutions",
        difficulty: "advanced",
      },
      {
        id: "combine-schemas",
        type: "composition",
        prompt: "Combine a Do-Re-Mi opening with a Romanesca continuation to create a complete phrase",
        difficulty: "advanced",
      },
    ],
  },
]

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-lesson",
    name: "First Steps",
    description: "Complete your first lesson",
    icon: "🎵",
    xpReward: 50,
    condition: (progress) => progress.lessonsCompleted.filter((lp) => lp.completed).length >= 1,
  },
  {
    id: "five-lessons",
    name: "Dedicated Student",
    description: "Complete 5 lessons",
    icon: "📚",
    xpReward: 100,
    condition: (progress) => progress.lessonsCompleted.filter((lp) => lp.completed).length >= 5,
  },
  {
    id: "week-streak",
    name: "Week Warrior",
    description: "Maintain a 7-day practice streak",
    icon: "🔥",
    xpReward: 200,
    condition: (progress) => progress.streak >= 7,
  },
  {
    id: "master-chords",
    name: "Chord Master",
    description: "Complete all basic chord lessons",
    icon: "🎹",
    xpReward: 150,
    condition: (progress) => {
      const chordLessons = ["do-chord", "re-chord", "mi-chord", "fa-chord"]
      return chordLessons.every((id) => progress.lessonsCompleted.some((lp) => lp.lessonId === id && lp.completed))
    },
  },
  {
    id: "schema-scholar",
    name: "Schema Scholar",
    description: "Master your first Galant schema",
    icon: "🎼",
    xpReward: 250,
    condition: (progress) => {
      const schemaLessons = ["romanesca", "do-re-mi-schema"]
      return schemaLessons.some((id) => progress.lessonsCompleted.some((lp) => lp.lessonId === id && lp.completed))
    },
  },
]

export const SKILL_LEVELS: SkillLevel[] = [
  { level: 1, name: "Novice", minXP: 0, maxXP: 500, color: "#94a3b8" },
  { level: 2, name: "Beginner", minXP: 500, maxXP: 1500, color: "#60a5fa" },
  { level: 3, name: "Intermediate", minXP: 1500, maxXP: 3000, color: "#34d399" },
  { level: 4, name: "Advanced", minXP: 3000, maxXP: 5000, color: "#fbbf24" },
  { level: 5, name: "Expert", minXP: 5000, maxXP: 8000, color: "#f97316" },
  { level: 6, name: "Master", minXP: 8000, maxXP: 12000, color: "#ec4899" },
  { level: 7, name: "Virtuoso", minXP: 12000, maxXP: Number.POSITIVE_INFINITY, color: "#a855f7" },
]

// Helper functions
export function getNextLesson(currentLessonId: string, completedLessonIds: string[]): Lesson | null {
  const currentIndex = CURRICULUM.findIndex((l) => l.id === currentLessonId)
  if (currentIndex === -1 || currentIndex === CURRICULUM.length - 1) return null

  for (let i = currentIndex + 1; i < CURRICULUM.length; i++) {
    const lesson = CURRICULUM[i]
    const prerequisitesMet = lesson.prerequisites.every((prereq) => completedLessonIds.includes(prereq))
    if (prerequisitesMet) {
      return lesson
    }
  }
  return null
}

export function getAvailableLessons(completedLessonIds: string[]): Lesson[] {
  return CURRICULUM.filter((lesson) => {
    const prerequisitesMet = lesson.prerequisites.every((prereq) => completedLessonIds.includes(prereq))
    return prerequisitesMet
  })
}

export function getPreviousLesson(currentLessonId: string): Lesson | null {
  const currentIndex = CURRICULUM.findIndex((l) => l.id === currentLessonId)
  if (currentIndex <= 0) return null
  return CURRICULUM[currentIndex - 1]
}

export function getLessonById(lessonId: string): Lesson | null {
  return CURRICULUM.find((l) => l.id === lessonId) || null
}
