"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "admin" | "resident" | "manager"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  condominiumId?: string
  condominiumCode?: string
  cpf?: string
  cnpj?: string
  address?: string
  internalAddress?: string
  approved?: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: Partial<User>, password: string) => Promise<boolean>
  updateUser: (userData: Partial<User>) => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("condoconnect_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    const users = JSON.parse(localStorage.getItem("condoconnect_users") || "[]")
    const foundUser = users.find((u: User & { password: string }) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      setIsAuthenticated(true)
      localStorage.setItem("condoconnect_user", JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("condoconnect_user")
  }

  const updateUser = (userData: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem("condoconnect_user", JSON.stringify(updatedUser))

    // Also update in users array
    const users = JSON.parse(localStorage.getItem("condoconnect_users") || "[]")
    const updatedUsers = users.map((u: any) => (u.id === user.id ? { ...u, ...userData } : u))
    localStorage.setItem("condoconnect_users", JSON.stringify(updatedUsers))
  }

  const register = async (userData: Partial<User>, password: string): Promise<boolean> => {
    // Simulate API call
    const users = JSON.parse(localStorage.getItem("condoconnect_users") || "[]")

    // Check if email already exists
    if (users.some((u: User) => u.email === userData.email)) {
      return false
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      password,
      approved: userData.role === "admin" ? true : false,
    }

    users.push(newUser)
    localStorage.setItem("condoconnect_users", JSON.stringify(users))

    // If admin, auto-login
    if (userData.role === "admin") {
      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      setIsAuthenticated(true)
      localStorage.setItem("condoconnect_user", JSON.stringify(userWithoutPassword))
    }

    return true
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
