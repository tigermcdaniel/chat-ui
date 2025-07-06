// Train-specific types
export interface Train {
  id: string
  operator: string
  logo: string
  departure: { time: string; station: string }
  arrival: { time: string; station: string }
  duration: string
  stops: string
  price: number
  dates: string
  trainType: string
  amenities: string[]
}

export interface TrainPassengerCounts {
  adults: number
  children: number
  seniors: number
}

export type TrainClass = "coach" | "business" | "first-class" | "sleeper"
