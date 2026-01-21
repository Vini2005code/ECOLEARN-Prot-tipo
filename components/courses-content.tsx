"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Clock, BookOpen, Award, Droplets, Construction } from "lucide-react"

export function CoursesContent() {
  const router = useRouter()
  // Estado para alternar entre a visão de Lista de Cursos e a Aula do Vídeo
  const [view, setView] = useState<"list" | "video">("list")

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      {/* Header Dinâmico */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          {view === "list" ? "Nossos Cursos" : "Aula: Conscientização de Água"}
        </h1>
        <p className="text-muted-foreground">
          {view === "list" 
            ? "Escolha um tema abaixo para começar sua jornada de aprendizado." 
            : "Assista ao vídeo abaixo para completar este módulo."}
        </p>
        {view === "video" && (
          <button 
            onClick={() => setView("list")}
            className="text-primary text-sm font-medium hover:underline mt-2"
          >
            ← Voltar para a lista de cursos
          </button>
        )}
      </div>

      {/* --- VISÃO 1: GRADE DE CURSOS --- */}
      {view === "list" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. CURSO ATIVO (YouTube) */}
          <Card 
            onClick={() => setView("video")}
            className="bg-card border-border hover:border-blue-500 transition-all cursor-pointer active:scale-95 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] px-2 py-1 rounded-bl-lg font-bold">
              DISPONÍVEL
            </div>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                <Droplets className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Conscientização de Água</h3>
              <p className="text-sm text-muted-foreground">Aprenda sobre o ciclo e a preservação da água.</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-blue-500 font-bold">
                <Play className="w-3 h-3" /> COMEÇAR AGORA
              </div>
            </CardContent>
          </Card>

          {/* 2. CURSO EM DESENVOLVIMENTO (Exemplo 1) */}
          <Card className="bg-muted/50 border-dashed border-border opacity-80 cursor-not-allowed">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-500/10 flex items-center justify-center mx-auto mb-4">
                <Construction className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-muted-foreground mb-2">Energias Renováveis</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Em Desenvolvimento</p>
            </CardContent>
          </Card>

          {/* 3. CURSO EM DESENVOLVIMENTO (Exemplo 2) */}
          <Card className="bg-muted/50 border-dashed border-border opacity-80 cursor-not-allowed">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-500/10 flex items-center justify-center mx-auto mb-4">
                <Construction className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-muted-foreground mb-2">Gestão de Resíduos</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Em Desenvolvimento</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* --- VISÃO 2: PLAYER DO VÍDEO (YouTube) --- */}
      {view === "video" && (
        <Card className="bg-card border-border overflow-hidden">
          <div className="relative aspect-video bg-black shadow-2xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/EWqnWXnXURw"
              title="A odisseia de uma garrafa | ONU Meio Ambiente"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4 text-sm text-blue-500 font-medium">
              <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">Módulo 1</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> 1:01 min</span>
            </div>
            <h3 className="text-xl font-bold mb-2">O Ciclo da Preservação</h3>
            <p className="text-muted-foreground text-sm">
              Nesta aula, exploramos a "Odisseia de uma Garrafa" para entender o impacto do descarte de resíduos em nossos oceanos e fontes de água doce.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Progress Section (Sempre visível para manter a identidade visual) */}
      <Card className="mt-8 bg-linear-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
            <Award className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Seu Aprendizado</h3>
            <p className="text-muted-foreground text-sm">
              Complete os cursos disponíveis para desbloquear conquistas em seu dashboard.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}