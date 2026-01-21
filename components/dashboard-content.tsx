"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Target, Award, TrendingUp, Medal } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface DashboardContentProps {
  userName: string
  userEmail: string
  bestScore: number
  totalQuizzes: number
  onStartQuiz: (topicId: string) => void
}

// Lista de competidores com nomes reais para simular o ranking
const initialRanking = [
  { name: "Ana Silva", score: 450.00 },
  { name: "Carlos Oliveira", score: 380.50 },
  { name: "Mariana Costa", score: 310.00 },
  { name: "João Pedro Santos", score: 220.00 },
  { name: "Beatriz Souza", score: 180.00 },
]

const topics = [
  { id: "meio-ambiente", name: "Meio Ambiente", image: "/images/meio-ambiente.jpg", description: "Sustentabilidade" },
  { id: "animais", name: "Animais", image: "/images/animais.jpg", description: "Fauna brasileira" },
  { id: "dengue", name: "Dengue", image: "/images/dengue.jpg", description: "Prevenção" }
]

export function DashboardContent({ userName, bestScore, totalQuizzes, onStartQuiz }: DashboardContentProps) {
  
  // Criamos o ranking final misturando os "outros" com o usuário atual
  const fullRanking = [
    ...initialRanking,
    { name: userName + " (Você)", score: bestScore }
  ].sort((a, b) => b.score - a.score); // Ordena do maior para o menor

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Painel de Impacto</h1>
        <p className="text-muted-foreground">Continue aprendendo para subir no ranking!</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Seu Recorde</CardTitle>
            <Trophy className="w-5 h-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{Math.round(bestScore)} pontos</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Quizzes</CardTitle>
            <Target className="w-5 h-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuizzes}</div>
          </CardContent>
        </Card>

        {/* Card de Posição no Ranking */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sua Posição</CardTitle>
            <Medal className="w-5 h-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {fullRanking.findIndex(r => r.name.includes("(Você)")) + 1}º Lugar
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Progresso</CardTitle>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.min(totalQuizzes * 10, 100)}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna da Esquerda: Desafios */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Desafios Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <Card key={topic.id} className="cursor-pointer hover:border-primary transition-all overflow-hidden group" onClick={() => onStartQuiz(topic.id)}>
                <div className="relative h-32">
                  <Image src={topic.image} alt={topic.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-white font-bold text-lg">{topic.name}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Coluna da Direita: Ranking em Tempo Real */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Ranking da Comunidade</h2>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4 space-y-4">
              {fullRanking.slice(0, 6).map((rank, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex items-center justify-between p-2 rounded-lg",
                    rank.name.includes("(Você)") ? "bg-primary text-primary-foreground shadow-md" : "bg-background/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold w-4">{index + 1}º</span>
                    <span className="text-sm font-medium truncate max-w-[120px]">{rank.name}</span>
                  </div>
                  <span className="font-mono text-xs">{Math.round(rank.score)} pts</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}