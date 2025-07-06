import { Sparkles } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function TypingIndicator() {
  return (
    <div className="flex gap-4 justify-start">
      <Avatar className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600">
        <AvatarFallback className="text-white text-sm">
          <Sparkles className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}
