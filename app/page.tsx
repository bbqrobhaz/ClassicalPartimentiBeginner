"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IntervalTrainer } from "@/components/interval-trainer"
import { RuleOfOctaveTrainer } from "@/components/rule-of-octave-trainer"
import { GalantSchemataTrainer } from "@/components/galant-schemata-trainer"
import { CadenceTrainer } from "@/components/cadence-trainer"
import { SuspensionTrainer } from "@/components/suspension-trainer"
import { DiminutionTrainer } from "@/components/diminution-trainer"
import { AchievementNotification } from "@/components/achievement-notification"
import { LevelUpNotification } from "@/components/level-up-notification"
import { XPProgressBar } from "@/components/xp-progress-bar"
import { LessonBrowser } from "@/components/lesson-browser"
import { LessonViewer } from "@/components/lesson-viewer"
import { PracticeModeSelector, type PracticeMode } from "@/components/practice-mode-selector"
import { ListenMode } from "@/components/listen-mode"
import { IdentifyMode } from "@/components/identify-mode"
import { ComposeMode } from "@/components/compose-mode"
import { audioEngine } from "@/lib/audio-engine"
import { ProgressDashboard } from "@/components/progress-dashboard"
import {
  Music2,
  BookOpen,
  Sparkles,
  Target,
  TrendingUp,
  Award,
  Headphones,
  Clock,
  Flame,
  GraduationCap,
  BarChart3,
  Piano,
} from "lucide-react"
import { useProgress } from "@/lib/progress-context"
import { CURRICULUM, getNextLesson } from "@/lib/curriculum"
import type { Lesson } from "@/lib/types"

const VirtualPiano = lazy(() => import("@/components/virtual-piano"))

export default function PartimentiTrainer() {
  const [activeTab, setActiveTab] = useState("lessons")
  const [isInitialized, setIsInitialized] = useState(false)
  const [initError, setInitError] = useState<string | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [practiceMode, setPracticeMode] = useState<PracticeMode | null>(null)
  const {
    progress,
    checkAndUnlockAchievements,
    newAchievement,
    newLevel,
    clearAchievementNotification,
    clearLevelNotification,
  } = useProgress()

  useEffect(() => {
    const initializeAudio = async () => {
      try {
        if (typeof window !== "undefined") {
          await audioEngine.initialize()
          setIsInitialized(true)
          checkAndUnlockAchievements()
        }
      } catch (error) {
        console.error("Audio initialization failed:", error)
        setInitError("Audio initialization failed. Some features may be limited.")
        setIsInitialized(true)
      }
    }

    initializeAudio()
  }, [checkAndUnlockAchievements])

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-2xl font-serif text-foreground">Initializing professional audio engine...</div>
          <div className="text-muted-foreground">Loading baroque samples and partimenti theory algorithms...</div>
        </div>
      </div>
    )
  }

  const totalCompleted = progress.lessonsCompleted.reduce((sum, lp) => sum + (lp.completed ? 1 : 0), 0)
  const completedLessonIds = progress.lessonsCompleted.filter((lp) => lp.completed).map((lp) => lp.lessonId)

  const handleLessonComplete = () => {
    checkAndUnlockAchievements()
  }

  const handleNextLesson = () => {
    if (!selectedLesson) return
    const nextLesson = getNextLesson(selectedLesson.id, completedLessonIds)
    if (nextLesson) {
      setSelectedLesson(nextLesson)
    }
  }

  const handlePreviousLesson = () => {
    if (!selectedLesson) return
    const currentIndex = CURRICULUM.findIndex((l) => l.id === selectedLesson.id)
    if (currentIndex > 0) {
      setSelectedLesson(CURRICULUM[currentIndex - 1])
    }
  }

  const hasNextLesson = selectedLesson ? getNextLesson(selectedLesson.id, completedLessonIds) !== null : false
  const hasPreviousLesson = selectedLesson ? CURRICULUM.findIndex((l) => l.id === selectedLesson.id) > 0 : false

  const trainingModules = [
    {
      id: "dashboard",
      name: "Progress Dashboard",
      description: "View your learning analytics and achievements",
      icon: BarChart3,
      difficulty: "Overview",
    },
    {
      id: "lessons",
      name: "Structured Lessons",
      description: "Follow the complete curriculum from foundations to mastery",
      icon: GraduationCap,
      difficulty: "All Levels",
    },
    {
      id: "piano",
      name: "Virtual Piano",
      description: "Interactive piano for practicing and testing intervals",
      icon: Piano,
      difficulty: "All Levels",
    },
    {
      id: "practice",
      name: "Practice Modes",
      description: "Listen, identify, play, and compose with learned patterns",
      icon: Headphones,
      difficulty: "All Levels",
    },
    {
      id: "intervals",
      name: "Interval Recognition",
      description: "Master interval identification with harmonic and melodic exercises",
      icon: Music2,
      difficulty: "Beginner",
    },
    {
      id: "rule-of-octave",
      name: "Rule of the Octave",
      description: "Learn the fundamental bass harmonization pattern of baroque music",
      icon: BookOpen,
      difficulty: "Beginner",
    },
    {
      id: "galant-schemata",
      name: "Galant Schemata",
      description: "Practice Prinner, Romanesca, Monte, Fonte, Fenaroli, and Quieszenza",
      icon: Sparkles,
      difficulty: "Intermediate",
    },
    {
      id: "cadences",
      name: "Cadence Recognition",
      description: "Identify simple, compound, deceptive, and evaded cadences",
      icon: Target,
      difficulty: "Intermediate",
    },
    {
      id: "suspensions",
      name: "Suspension Training",
      description: "Train your ear for 7-6, 9-8, 4-3, and 2-3 suspensions",
      icon: TrendingUp,
      difficulty: "Advanced",
    },
    {
      id: "diminutions",
      name: "Diminutions & Decorations",
      description: "Recognize turns, appoggiaturas, passing notes, and baroque ornaments",
      icon: Award,
      difficulty: "Advanced",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AchievementNotification achievement={newAchievement} onDismiss={clearAchievementNotification} />
      <LevelUpNotification newLevel={newLevel} onDismiss={clearLevelNotification} />

      {initError && (
        <div className="bg-destructive/10 border-b border-destructive/20">
          <div className="container mx-auto px-4 py-3">
            <p className="text-center text-destructive">{initError}</p>
          </div>
        </div>
      )}

      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-4xl font-bold text-foreground mb-1 flex items-center gap-3">
                <Music2 className="w-8 h-8 text-primary" />
                Baroque Improvisation Academy
                <Badge variant="secondary" className="text-xs">
                  {progress.currentLevel.name}
                </Badge>
              </h1>
              <p className="text-muted-foreground">
                Master Renaissance & Baroque improvisation from foundations to virtuosity
              </p>
            </div>

            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Level</div>
                <div className="text-2xl font-bold text-primary">{progress.currentLevel.level}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">XP</div>
                <div className="text-2xl font-bold text-secondary">{progress.totalXP}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1 justify-center">
                  <Flame className="w-3 h-3" />
                  Streak
                </div>
                <div className="text-2xl font-bold text-orange-500">{progress.streak}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Lessons</div>
                <div className="text-2xl font-bold text-accent">{totalCompleted}</div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <XPProgressBar currentLevel={progress.currentLevel} totalXP={progress.totalXP} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-xl">Training Modules</CardTitle>
              </CardHeader>
              <div className="p-4 space-y-2">
                {trainingModules.map((module) => {
                  const Icon = module.icon
                  return (
                    <Button
                      key={module.id}
                      onClick={() => {
                        setActiveTab(module.id)
                        if (module.id === "lessons") {
                          setSelectedLesson(null)
                        }
                      }}
                      variant="ghost"
                      className={`
                        w-full justify-start gap-3 p-4 h-auto
                        hover:bg-muted/50 transition-all duration-200 border
                        rounded-lg
                        ${
                          activeTab === module.id
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "bg-transparent border-transparent"
                        }
                      `}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <div className="text-left flex-1 min-w-0">
                        <div className="font-semibold text-sm whitespace-normal">{module.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2 w-full whitespace-normal">
                          {module.description}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs flex-shrink-0">
                        {module.difficulty}
                      </Badge>
                    </Button>
                  )
                })}
              </div>
            </Card>

            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="font-serif text-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <div className="p-4 space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-2">
                  <Headphones className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                  <span>Use headphones for the best audio experience and stereo separation</span>
                </div>
                <div className="flex gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                  <span>Practice daily for 15-20 minutes to maintain your streak</span>
                </div>
                <div className="flex gap-2">
                  <Target className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                  <span>Complete lessons in order to build a solid foundation</span>
                </div>
                <div className="flex gap-2">
                  <BookOpen className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                  <span>Study historical treatises by Fenaroli, Furno, and Ortiz for deeper understanding</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="dashboard" className="mt-0">
                <ProgressDashboard />
              </TabsContent>

              <TabsContent value="lessons" className="mt-0">
                {selectedLesson ? (
                  <LessonViewer
                    lesson={selectedLesson}
                    onComplete={handleLessonComplete}
                    onNext={handleNextLesson}
                    onPrevious={handlePreviousLesson}
                    hasNext={hasNextLesson}
                    hasPrevious={hasPreviousLesson}
                  />
                ) : (
                  <LessonBrowser onSelectLesson={setSelectedLesson} />
                )}
              </TabsContent>

              <TabsContent value="piano" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl">Virtual Piano</CardTitle>
                    <CardDescription className="text-base">
                      Practice playing notes, test intervals, and explore the keyboard. Click keys with your mouse or
                      use your computer keyboard (A-; keys map to piano keys).
                    </CardDescription>
                  </CardHeader>
                  <div className="p-6 space-y-6">
                    <Suspense
                      fallback={<div className="text-center py-12 text-muted-foreground">Loading virtual piano...</div>}
                    >
                      <VirtualPiano startOctave={3} numOctaves={2} showLabels={true} />
                    </Suspense>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-muted/30">
                        <CardHeader>
                          <CardTitle className="text-lg">Keyboard Shortcuts</CardTitle>
                        </CardHeader>
                        <div className="p-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">White keys:</span>
                            <span className="font-mono">A S D F G H J K L ;</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Black keys:</span>
                            <span className="font-mono">W E T Y U O P</span>
                          </div>
                          <div className="pt-2 mt-2 border-t border-border">
                            <p className="text-xs text-muted-foreground italic">
                              Note: Computer keyboard hardware limitations may prevent some key combinations from
                              registering simultaneously, which can affect chord playing.
                            </p>
                          </div>
                        </div>
                      </Card>

                      <Card className="bg-muted/30">
                        <CardHeader>
                          <CardTitle className="text-lg">Practice Ideas</CardTitle>
                        </CardHeader>
                        <div className="p-4 space-y-2 text-sm text-muted-foreground">
                          <div>• Play scales and arpeggios</div>
                          <div>• Test intervals you're learning</div>
                          <div>• Practice cadence patterns</div>
                          <div>• Experiment with melodic lines</div>
                        </div>
                      </Card>
                    </div>

                    <Suspense fallback={<div className="text-center py-6 text-muted-foreground">Loading...</div>}>
                      <VirtualPiano startOctave={4} numOctaves={1} showLabels={false} compact={true} />
                    </Suspense>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="practice" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl">Practice Modes</CardTitle>
                    <CardDescription className="text-base">
                      Choose a practice mode to reinforce your learning with interactive exercises
                    </CardDescription>
                  </CardHeader>
                  <div className="p-6">
                    {!practiceMode ? (
                      <PracticeModeSelector onSelectMode={setPracticeMode} />
                    ) : (
                      <div className="space-y-4">
                        <Button variant="outline" onClick={() => setPracticeMode(null)}>
                          ← Back to Practice Modes
                        </Button>
                        {practiceMode === "listen" && <ListenMode lessons={CURRICULUM} />}
                        {practiceMode === "identify" && <IdentifyMode lessons={CURRICULUM} />}
                        {practiceMode === "compose" && <ComposeMode lessons={CURRICULUM} />}
                        {practiceMode === "play" && (
                          <div className="text-center py-12 text-muted-foreground">
                            Play Mode coming soon - practice playing patterns with real-time feedback
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="intervals" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl">Interval Recognition Training</CardTitle>
                    <CardDescription className="text-base">
                      Master the foundation of ear training by learning to identify musical intervals. Start with
                      perfect intervals and progress to more challenging chromatic intervals used in baroque harmony.
                    </CardDescription>
                  </CardHeader>
                  <div className="p-6">
                    <IntervalTrainer />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="rule-of-octave" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl">Rule of the Octave Training</CardTitle>
                    <CardDescription className="text-base">
                      Learn the fundamental bass harmonization pattern that forms the foundation of baroque keyboard
                      improvisation and figured bass realization.
                    </CardDescription>
                  </CardHeader>
                  <div className="p-6">
                    <RuleOfOctaveTrainer />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="galant-schemata" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl">Galant Schemata Recognition</CardTitle>
                    <CardDescription className="text-base">
                      Master the stock musical patterns used by 18th-century composers including Prinner, Romanesca,
                      Monte, Fonte, Fenaroli, and Quieszenza.
                    </CardDescription>
                  </CardHeader>
                  <div className="p-6">
                    <GalantSchemataTrainer />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="cadences" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl">Cadence Recognition Training</CardTitle>
                    <CardDescription className="text-base">
                      Develop your ability to identify various cadence types including simple authentic, compound,
                      deceptive, evaded, and Phrygian cadences.
                    </CardDescription>
                  </CardHeader>
                  <div className="p-6">
                    <CadenceTrainer />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="suspensions" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl">Suspension Training</CardTitle>
                    <CardDescription className="text-base">
                      Train your ear to recognize and identify common baroque suspensions including 7-6, 9-8, 4-3, and
                      2-3 patterns with proper preparation and resolution.
                    </CardDescription>
                  </CardHeader>
                  <div className="p-6">
                    <SuspensionTrainer />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="diminutions" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl">Diminutions & Decorations Training</CardTitle>
                    <CardDescription className="text-base">
                      Develop your melodic ear by recognizing baroque ornaments and diminutions including turns,
                      appoggiaturas, acciaccaturas, passing notes, and neighbor tones.
                    </CardDescription>
                  </CardHeader>
                  <div className="p-6">
                    <DiminutionTrainer />
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
