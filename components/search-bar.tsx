"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

export function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", query)
  }

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by address, transaction hash, or block..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 pl-10 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      </div>
    </form>
  )
}
