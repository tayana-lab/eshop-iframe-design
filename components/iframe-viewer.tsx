"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ExternalLink, RefreshCw, Home, ArrowLeft, ArrowRight } from "lucide-react"

export function IframeViewer() {
  const [url, setUrl] = useState("https://example.com")
  const [currentUrl, setCurrentUrl] = useState("https://example.com")
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<string[]>(["https://example.com"])
  const [historyIndex, setHistoryIndex] = useState(0)

  const handleNavigate = () => {
    if (url && url !== currentUrl) {
      setIsLoading(true)
      setCurrentUrl(url)
      const newHistory = [...history.slice(0, historyIndex + 1), url]
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setCurrentUrl(currentUrl + "?refresh=" + Date.now())
  }

  const handleHome = () => {
    const homeUrl = "https://example.com"
    setUrl(homeUrl)
    setCurrentUrl(homeUrl)
    setIsLoading(true)
  }

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      const prevUrl = history[newIndex]
      setUrl(prevUrl)
      setCurrentUrl(prevUrl)
      setIsLoading(true)
    }
  }

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      const nextUrl = history[newIndex]
      setUrl(nextUrl)
      setCurrentUrl(nextUrl)
      setIsLoading(true)
    }
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="border-b border-border bg-card">
        <div className="flex items-center gap-3 p-4">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={handleBack} disabled={historyIndex === 0} className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleForward}
              disabled={historyIndex === history.length - 1}
              className="h-9 w-9"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleRefresh} className="h-9 w-9">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleHome} className="h-9 w-9">
              <Home className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-1 items-center gap-2">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNavigate()}
              placeholder="Enter URL..."
              className="flex-1 bg-background"
            />
            <Button onClick={handleNavigate} size="sm">
              Go
            </Button>
            <Button variant="ghost" size="icon" onClick={() => window.open(currentUrl, "_blank")} className="h-9 w-9">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden p-4">
        <Card className="relative h-full overflow-hidden shadow-lg">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            </div>
          )}
          <iframe
            src={currentUrl}
            className="h-full w-full border-0"
            title="Web Viewer"
            onLoad={() => setIsLoading(false)}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </Card>
      </main>
    </div>
  )
}
