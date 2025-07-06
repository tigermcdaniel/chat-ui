import type { UserLocation, TravelTime, QuickAction, TripType, TransportationMode } from "@/types"
import type { TrainPassengerCounts, TrainClass } from "../types"
import { generateTrainTravelTimes } from "../data"

export const generateTransportationResponse = (
  destination: string,
  transportationMode: TransportationMode,
  userLocation: UserLocation,
): { content: string; trainTripSelector?: boolean; quickActions?: QuickAction[] } => {
  return {
    content: `Excellent choice! Train travel to ${destination} offers scenic views and comfort. Let me help you find the best train options based on your trip type, class, and number of passengers.`,
    trainTripSelector: true,
  }
}

export const generateTrainTravelTimesResponse = (
  destination: string,
  tripType: TripType,
  passengers: TrainPassengerCounts,
  trainClass: TrainClass,
  userLocation: UserLocation,
): { content: string; travelTimes: TravelTime[]; quickActions: QuickAction[] } => {
  const travelTimes = generateTrainTravelTimes(destination)
  const destinationDisplay = destination.charAt(0).toUpperCase() + destination.slice(1)

  // Calculate total passengers
  const totalPassengers = passengers.adults + passengers.children + passengers.seniors

  // Train class multipliers for train pricing
  const trainClassMultipliers = {
    coach: 1,
    business: 1.8,
    "first-class": 2.5,
    sleeper: 3.2,
  }

  // Adjust pricing for train travel
  const adjustedTravelTimes = travelTimes.map((time) => {
    let basePrice = time.price

    // Trip type adjustment
    if (tripType === "one-way") {
      basePrice = Math.round(basePrice * 0.6)
    } else if (tripType === "multi-destination") {
      basePrice = Math.round(basePrice * 1.4)
    }

    // Train class adjustment
    basePrice = Math.round(basePrice * trainClassMultipliers[trainClass])

    // Passenger count adjustment for trains
    const adultPrice = basePrice
    const childPrice = Math.round(basePrice * 0.5) // 50% discount for children
    const seniorPrice = Math.round(basePrice * 0.85) // 15% discount for seniors

    const totalPrice =
      passengers.adults * adultPrice + passengers.children * childPrice + passengers.seniors * seniorPrice

    return {
      ...time,
      price: totalPrice,
    }
  })

  const tripTypeText =
    tripType === "one-way" ? "one-way" : tripType === "round-trip" ? "round-trip" : "multi-destination"

  const trainClassText = {
    coach: "Coach",
    business: "Business Class",
    "first-class": "First Class",
    sleeper: "Sleeper Car",
  }[trainClass]

  const passengerText = totalPassengers === 1 ? "1 passenger" : `${totalPassengers} passengers`

  return {
    content: `Perfect! Here are the 5 best ${tripTypeText} train travel periods from ${userLocation.city} to ${destinationDisplay} for ${passengerText} in ${trainClassText} in the next 6 months. I've analyzed prices, scenic routes, and travel comfort:`,
    travelTimes: adjustedTravelTimes,
    quickActions: [
      {
        label: `Book ${adjustedTravelTimes[0]?.month} train`,
        action: `book ${tripTypeText} ${trainClassText} train to ${destinationDisplay} in ${adjustedTravelTimes[0]?.month}`,
      },
      { label: "Compare all routes", action: `compare train routes to ${destinationDisplay}` },
      { label: "Set price alert", action: `set train price alert for ${destinationDisplay}` },
      { label: "Route details", action: `train route details to ${destinationDisplay}` },
      { label: "Change train details", action: `change train trip type for ${destinationDisplay}` },
    ],
  }
}
