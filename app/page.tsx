"use client"

import { useState, useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Header } from "@/components/header"
import { MessageBubble } from "@/components/message-bubble"
import { TypingIndicator } from "@/components/typing-indicator"
import { ChatInput } from "@/components/chat-input"
import { generateAIResponse } from "@/utils/ai-responses"
import type { Message, UserLocation, TripType, TransportationMode } from "@/types"
import type { PassengerCounts, CabinClass } from "@/features/flight/types"
import type { TrainPassengerCounts, TrainClass } from "@/features/train/types"
import type { DateInfo } from "@/features/flight/types"

export default function FlightGPT() {
  const [userLocation, setUserLocation] = useState<UserLocation>({
    city: "Los Angeles",
    airport: "LAX",
    country: "United States",
  })

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: `Hi! I'm FlightGPT, your AI travel assistant. Where would you like to go?`,
      timestamp: new Date(),
      quickActions: [
        { label: "Tokyo", action: "Tokyo" },
        { label: "London", action: "London" },
        { label: "Paris", action: "Paris" },
        { label: "New York", action: "New York" },
        { label: "Bali", action: "Bali" },
        { label: "San Francisco", action: "San Francisco" },
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentTransportationMode, setCurrentTransportationMode] = useState<TransportationMode | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simulate location detection
  useEffect(() => {
    const detectLocation = () => {
      const locations = [
        { city: "Los Angeles", airport: "LAX", country: "United States" },
        { city: "New York", airport: "JFK", country: "United States" },
        { city: "London", airport: "LHR", country: "United Kingdom" },
        { city: "San Francisco", airport: "SFO", country: "United States" },
      ]
      const randomLocation = locations[Math.floor(Math.random() * locations.length)]
      setUserLocation(randomLocation)
    }

    detectLocation()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleTransportationSelect = async (mode: TransportationMode, destination: string) => {
    setIsTyping(true)
    setCurrentTransportationMode(mode)

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    let assistantMessage: Message

    if (mode === "plane" || mode === "train") {
      // Import the appropriate response generator dynamically
      if (mode === "plane") {
        const { generateTransportationResponse } = await import("@/features/flight/utils/ai-responses")
        const response = generateTransportationResponse(destination, mode, userLocation)
        assistantMessage = {
          id: Date.now().toString(),
          type: "assistant",
          content: response.content,
          timestamp: new Date(),
          tripTypeSelector: response.tripTypeSelector,
          quickActions: response.quickActions,
          destination: destination,
          transportationMode: mode,
        }
      } else {
        const { generateTransportationResponse } = await import("@/features/train/utils/ai-responses")
        const response = generateTransportationResponse(destination, mode, userLocation)
        assistantMessage = {
          id: Date.now().toString(),
          type: "assistant",
          content: response.content,
          timestamp: new Date(),
          trainTripSelector: response.trainTripSelector,
          quickActions: response.quickActions,
          destination: destination,
          transportationMode: mode,
        }
      }
    } else {
      // Coming soon message for other transportation modes
      const modeLabels = {
        bus: "bus travel",
        car: "road trips",
        ferry: "ferry travel",
      }
      const modeLabel = modeLabels[mode] || "this transportation method"

      assistantMessage = {
        id: Date.now().toString(),
        type: "assistant",
        content: `🚧 ${modeLabel.charAt(0).toUpperCase() + modeLabel.slice(1)} booking is coming soon! We're working hard to bring you the best ${modeLabel} options. In the meantime, would you like to explore flights or trains to ${destination}?`,
        timestamp: new Date(),
        quickActions: [
          { label: `✈️ Flights to ${destination}`, action: `flights to ${destination}` },
          { label: `🚂 Trains to ${destination}`, action: `trains to ${destination}` },
          { label: "🏠 Choose different destination", action: "where should I go" },
          { label: "📧 Notify me when available", action: `notify me when ${modeLabel} is available` },
        ],
        destination: destination,
        transportationMode: mode,
      }
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleTripTypeSelect = async (
    tripType: TripType,
    destination: string,
    passengers: PassengerCounts,
    cabinClass: CabinClass,
    dateInfo?: DateInfo | null,
  ) => {
    setIsTyping(true)

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Import flight response generator
    const { generateTravelTimesResponse } = await import("@/features/flight/utils/ai-responses")
    const response = generateTravelTimesResponse(destination, tripType, passengers, cabinClass, userLocation, dateInfo)
    const assistantMessage: Message = {
      id: Date.now().toString(),
      type: "assistant",
      content: response.content,
      timestamp: new Date(),
      travelTimes: response.travelTimes,
      quickActions: response.quickActions,
      transportationMode: "plane",
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleTrainTripSelect = async (
    tripType: TripType,
    destination: string,
    passengers: TrainPassengerCounts,
    trainClass: TrainClass,
  ) => {
    setIsTyping(true)

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Import train response generator
    const { generateTrainTravelTimesResponse } = await import("@/features/train/utils/ai-responses")
    const response = generateTrainTravelTimesResponse(destination, tripType, passengers, trainClass, userLocation)
    const assistantMessage: Message = {
      id: Date.now().toString(),
      type: "assistant",
      content: response.content,
      timestamp: new Date(),
      travelTimes: response.travelTimes,
      quickActions: response.quickActions,
      transportationMode: "train",
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 2000))

    // Generate AI response
    const aiResponse = generateAIResponse(content, userLocation)
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: aiResponse.content,
      timestamp: new Date(),
      travelTimes: aiResponse.travelTimes,
      quickActions: aiResponse.quickActions,
      tripTypeSelector: aiResponse.tripTypeSelector,
      transportationSelector: aiResponse.transportationSelector,
      destination: aiResponse.destination,
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header userLocation={userLocation} />

      {/* Messages */}
      <ScrollArea className="flex-1 px-6 py-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onQuickAction={handleQuickAction}
              onTripTypeSelect={handleTripTypeSelect}
              onTrainTripSelect={handleTrainTripSelect}
              onTransportationSelect={handleTransportationSelect}
              userLocation={userLocation}
              currentTransportationMode={currentTransportationMode}
            />
          ))}

          {/* Typing Indicator */}
          {isTyping && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <ChatInput value={inputValue} onChange={setInputValue} onSend={handleSendMessage} disabled={isTyping} />
    </div>
  )
}
