import type React from "react"

// Core app types
export interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  travelTimes?: TravelTime[]
  quickActions?: QuickAction[]
  tripTypeSelector?: boolean
  transportationSelector?: boolean
  trainTripSelector?: boolean
  destination?: string
  transportationMode?: TransportationMode
}

export interface QuickAction {
  label: string
  action: string
}

export interface UserLocation {
  city: string
  airport: string
  country: string
}

export type TransportationMode = "plane" | "train" | "bus" | "car" | "ferry"

export type TripType = "one-way" | "round-trip" | "multi-destination"

// Travel time interface (shared across features)
export interface TravelTime {
  id: string
  month: string
  period: string
  price: number
  priceChange: number
  weather: string
  weatherIcon: React.ReactNode
  highlights: string[]
  reason: string
  bestFor: string[]
}
