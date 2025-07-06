import type { UserLocation, QuickAction } from "@/types"

// Destination detection utility
const detectDestination = (message: string): string | null => {
  const destinations = [
    "tokyo",
    "london",
    "paris",
    "new york",
    "nyc",
    "bali",
    "san francisco",
    "chicago",
    "miami",
    "seattle",
    "boston",
    "las vegas",
    "denver",
    "atlanta",
  ]
  return destinations.find((dest) => message.includes(dest)) || null
}

export const generateAIResponse = (
  userMessage: string,
  userLocation: UserLocation,
): {
  content: string
  quickActions?: QuickAction[]
  tripTypeSelector?: boolean
  transportationSelector?: boolean
  destination?: string
} => {
  const message = userMessage.toLowerCase()
  const mentionedDestination = detectDestination(message)

  if (mentionedDestination) {
    const destinationName = mentionedDestination === "nyc" ? "new york" : mentionedDestination
    const destinationDisplay = destinationName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    return {
      content: `Great choice! ${destinationDisplay} is an amazing destination. Let me help you get there from ${userLocation.city}.`,
      transportationSelector: true,
      destination: destinationDisplay,
    }
  }

  // Default response for initial greeting
  return {
    content: `Hi! I'm FlightGPT, your AI travel assistant. Where would you like to go?`,
    quickActions: [
      { label: "Tokyo", action: "Tokyo" },
      { label: "London", action: "London" },
      { label: "Paris", action: "Paris" },
      { label: "New York", action: "New York" },
      { label: "Bali", action: "Bali" },
      { label: "San Francisco", action: "San Francisco" },
    ],
  }
}
