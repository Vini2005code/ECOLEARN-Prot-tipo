"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { QuizContent } from "@/components/quiz-content"
import { CoursesContent } from "@/components/courses-content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, LogOut, Menu, X, Leaf } from "lucide-react"

export default function EcoLearn() {
  // --- ESTADOS ---
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({ name: "", email: "" })
  const [activeTab, setActiveTab] = useState("dashboard")
  const [bestScore, setBestScore] = useState(0)
  const [totalQuizzes, setTotalQuizzes] = useState(0)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // --- CARREGAR DADOS ---
  useEffect(() => {
    const savedName = localStorage.getItem("ecolearn_user_name")
    const savedEmail = localStorage.getItem("ecolearn_user_email")
    const savedScore = localStorage.getItem("ecolearn_best_score")
    const savedQuizzes = localStorage.getItem("ecolearn_total_quizzes")

    if (savedName && savedEmail) {
      setUser({ name: savedName, email: savedEmail })
      setIsLoggedIn(true)
    }
    if (savedScore) setBestScore(parseFloat(savedScore))
    if (savedQuizzes) setTotalQuizzes(parseInt(savedQuizzes))
  }, [])

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string

    if (name && email) {
      localStorage.setItem("ecolearn_user_name", name)
      localStorage.setItem("ecolearn_user_email", email)
      setUser({ name, email })
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  const handleQuizComplete = (score: number) => {
    setTotalQuizzes(prev => {
      const newTotal = prev + 1
      localStorage.setItem("ecolearn_total_quizzes", newTotal.toString())
      return newTotal
    })
    
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem("ecolearn_best_score", score.toString())
    }
    setActiveTab("dashboard")
  }

  const handleTabChange = (tab: string) => {
    if (tab === "logout") {
      setShowLogoutModal(true)
    } else {
      setActiveTab(tab)
      setIsMobileMenuOpen(false)
    }
  }

  // --- TELA DE LOGIN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-primary/20 shadow-2xl bg-card">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">EcoLearn</CardTitle>
            <p className="text-muted-foreground text-sm">Faça login para começar</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nome Completo</label>
                <input 
                  name="name" 
                  required 
                  className="w-full p-2 rounded-md border border-border bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">E-mail</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  className="w-full p-2 rounded-md border border-border bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="seu@email.com"
                />
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // --- TELA PRINCIPAL ---
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg border border-border"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div className={`fixed lg:relative inset-y-0 left-0 z-40 transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          userName={user.name}
          userEmail={user.email}
          bestScore={bestScore}
        />
      </div>

      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {activeTab === "dashboard" && (
          <DashboardContent
            userName={user.name}
            userEmail={user.email}
            bestScore={bestScore}
            totalQuizzes={totalQuizzes}
            onStartQuiz={handleTabChange}
          />
        )}
        {(activeTab === "meio-ambiente" || activeTab === "animais" || activeTab === "dengue") && (
          <QuizContent
            topicId={activeTab}
            onComplete={handleQuizComplete}
            onBack={() => setActiveTab("dashboard")}
          />
        )}
        {activeTab === "cursos" && <CoursesContent />}
        {activeTab === "comunidade" && (
           <div className="flex-1 p-8 flex items-center justify-center">
             <Card className="max-w-md bg-card border-border p-8 text-center">
               <Users className="w-12 h-12 text-primary mx-auto mb-4" />
               <h2 className="text-xl font-bold mb-2">Comunidade</h2>
               <p className="text-muted-foreground">Em breve!</p>
             </Card>
           </div>
        )}
      </main>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-sm w-full bg-card border-border">
            <CardHeader><CardTitle className="text-lg">Deseja sair?</CardTitle></CardHeader>
            <CardContent className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowLogoutModal(false)}>Cancelar</Button>
              <Button variant="destructive" className="flex-1" onClick={handleLogout}>Sair</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}