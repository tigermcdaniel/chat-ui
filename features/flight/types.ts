// Flight-specific types
export interface Flight {
  id: string
  airline: string
  logo: string
  departure: { time: string; airport: string }
  arrival: { time: string; airport: string }
  duration: string
  stops: string
  price: number
  dates: string
}

export interface PassengerCounts {
  adults: number
  children: number
  infantsInLap: number
  infantsInSeat: number
}

export type CabinClass = "economy" | "premium-economy" | "business" | "first"

// Date selection interface
export interface DateInfo {
  departureDate: string
  returnDate?: string
}
