"use client"

import type React from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: (message: string) => void
  disabled: boolean
}

export function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend(value)
    }
  }

  return (
    <div className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Where would you like to go? (e.g., Tokyo, London, Paris...)"
              className="pr-12 py-3 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              disabled={disabled}
            />
            <Button
              onClick={() => onSend(value)}
              disabled={!value.trim() || disabled}
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          FlightGPT analyzes prices, weather, and events to find your perfect travel window
        </p>
      </div>
    </div>
  )
}
