import type { UserLocation, TravelTime, QuickAction, TripType, TransportationMode, DateInfo } from "@/types"
import type { PassengerCounts, CabinClass } from "../types"
import { generateFlightTravelTimes } from "../data"

export const generateTransportationResponse = (
  destination: string,
  transportationMode: TransportationMode,
  userLocation: UserLocation,
): { content: string; tripTypeSelector?: boolean; quickActions?: QuickAction[] } => {
  return {
    content: `Perfect! Flying to ${destination} is a great choice. Let me help you find the best flight options based on your trip type, cabin class, and number of passengers.`,
    tripTypeSelector: true,
  }
}

export const generateTravelTimesResponse = (
  destination: string,
  tripType: TripType,
  passengers: PassengerCounts,
  cabinClass: CabinClass,
  userLocation: UserLocation,
  dateInfo?: DateInfo | null,
): { content: string; travelTimes: TravelTime[]; quickActions: QuickAction[] } => {
  const travelTimes = generateFlightTravelTimes(destination)
  const destinationDisplay = destination.charAt(0).toUpperCase() + destination.slice(1)

  // Calculate total passengers
  const totalPassengers = passengers.adults + passengers.children + passengers.infantsInLap + passengers.infantsInSeat

  // Cabin class multipliers for flight pricing
  const cabinMultipliers = {
    economy: 1,
    "premium-economy": 1.5,
    business: 3,
    first: 5,
  }

  // Adjust pricing based on trip type, passenger count, and cabin class
  const adjustedTravelTimes = travelTimes.map((time) => {
    let basePrice = time.price

    // Trip type adjustment
    if (tripType === "one-way") {
      basePrice = Math.round(basePrice * 0.6)
    } else if (tripType === "multi-destination") {
      basePrice = Math.round(basePrice * 1.4)
    }

    // Cabin class adjustment
    basePrice = Math.round(basePrice * cabinMultipliers[cabinClass])

    // Passenger count adjustment for flights
    const adultPrice = basePrice
    const childPrice = Math.round(basePrice * 0.75) // 25% discount for children
    const infantSeatPrice = Math.round(basePrice * 0.1) // 90% discount for infants in seat
    // Infants in lap are typically free

    const totalPrice =
      passengers.adults * adultPrice + passengers.children * childPrice + passengers.infantsInSeat * infantSeatPrice

    return {
      ...time,
      price: totalPrice,
    }
  })

  const tripTypeText =
    tripType === "one-way" ? "one-way" : tripType === "round-trip" ? "round-trip" : "multi-destination"

  const cabinClassText = {
    economy: "Economy",
    "premium-economy": "Premium Economy",
    business: "Business",
    first: "First Class",
  }[cabinClass]

  const passengerText = totalPassengers === 1 ? "1 passenger" : `${totalPassengers} passengers`

  // Different content based on whether dates are specified
  const content = dateInfo
    ? `Perfect! I found flights for your ${tripTypeText} trip from ${userLocation.city} to ${destinationDisplay} for ${passengerText} in ${cabinClassText} class on ${dateInfo.departureDate}${dateInfo.returnDate ? ` returning ${dateInfo.returnDate}` : ""}. Here are your options:`
    : `Excellent choice! Here are the 5 best ${tripTypeText} flight periods from ${userLocation.city} to ${destinationDisplay} for ${passengerText} in ${cabinClassText} class in the next 6 months. I've analyzed prices, weather, crowds, and local events:`

  const quickActions = dateInfo
    ? [
        { label: "Book this flight", action: `book ${tripTypeText} ${cabinClassText} flight to ${destinationDisplay}` },
        { label: "Change dates", action: `change dates for ${destinationDisplay}` },
        { label: "See flexible dates", action: `flexible dates to ${destinationDisplay}` },
        { label: "Set price alert", action: `set price alert for ${destinationDisplay}` },
      ]
    : [
        {
          label: `Book ${adjustedTravelTimes[0]?.month} trip`,
          action: `book ${tripTypeText} ${cabinClassText} flight to ${destinationDisplay} in ${adjustedTravelTimes[0]?.month}`,
        },
        { label: "Compare all months", action: `compare all months for ${destinationDisplay}` },
        { label: "Set price alert", action: `set price alert for ${destinationDisplay}` },
        { label: "Weather details", action: `weather forecast ${destinationDisplay}` },
        { label: "Change trip details", action: `change trip type for ${destinationDisplay}` },
      ]

  return {
    content,
    travelTimes: adjustedTravelTimes,
    quickActions,
  }
}
