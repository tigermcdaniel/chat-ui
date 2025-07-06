import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, DollarSign, Crown } from "lucide-react"
import { PriceTimeline } from "./price-timeline"
import type { Flight } from "../types"

interface FlightListProps {
  flights: Flight[]
  fromCity: string
  toCity: string
  month: string
  year?: string
}

export function FlightList({ flights, fromCity, toCity, month, year = "2025" }: FlightListProps) {
  // Calculate average price for timeline
  const averagePrice = Math.round(flights.reduce((sum, flight) => sum + flight.price, 0) / flights.length)
  const minPrice = Math.min(...flights.map((f) => f.price))
  const maxPrice = Math.max(...flights.map((f) => f.price))

  // Find cheapest flight
  const cheapestFlight = flights.find((flight) => flight.price === minPrice)

  // Find best flight (balance of price, duration, and airline quality)
  const getBestFlight = () => {
    // Score flights based on multiple factors
    const scoredFlights = flights.map((flight) => {
      // Price score (lower price = higher score, max 40 points)
      const priceScore = Math.max(0, 40 - ((flight.price - minPrice) / (maxPrice - minPrice)) * 40)

      // Duration score (shorter duration = higher score, max 30 points)
      const durationMinutes =
        Number.parseInt(flight.duration.split("h")[0]) * 60 +
        Number.parseInt(flight.duration.split("h")[1]?.split("m")[0] || "0")
      const minDuration = Math.min(
        ...flights.map((f) => {
          const mins =
            Number.parseInt(f.duration.split("h")[0]) * 60 +
            Number.parseInt(f.duration.split("h")[1]?.split("m")[0] || "0")
          return mins
        }),
      )
      const maxDuration = Math.max(
        ...flights.map((f) => {
          const mins =
            Number.parseInt(f.duration.split("h")[0]) * 60 +
            Number.parseInt(f.duration.split("h")[1]?.split("m")[0] || "0")
          return mins
        }),
      )
      const durationScore = Math.max(0, 30 - ((durationMinutes - minDuration) / (maxDuration - minDuration)) * 30)

      // Airline quality score (max 20 points)
      const airlineScores: { [key: string]: number } = {
        Delta: 20,
        United: 18,
        American: 16,
        JetBlue: 17,
        Southwest: 15,
        Alaska: 16,
      }
      const airlineScore = airlineScores[flight.airline] || 10

      // Stops score (nonstop = full points, max 10 points)
      const stopsScore = flight.stops === "Nonstop" ? 10 : 5

      return {
        ...flight,
        totalScore: priceScore + durationScore + airlineScore + stopsScore,
      }
    })

    return scoredFlights.reduce((best, current) => (current.totalScore > best.totalScore ? current : best))
  }

  const bestFlight = getBestFlight()

  return (
    <div className="mt-4 space-y-4">
      {/* Header */}
      <div className="text-lg font-medium text-gray-900">
        Here are the available flights for {month} {year} from {fromCity} to {toCity}:
      </div>

      {/* Price Timeline */}
      <PriceTimeline
        destination={toCity}
        currentPrice={averagePrice}
        typicalPrice={averagePrice + 10}
        minPrice={Math.round(minPrice * 0.8)}
        maxPrice={Math.round(maxPrice * 1.2)}
        savings={26}
      />

      {/* Flight Results */}
      <div className="space-y-3">
        {flights.map((flight) => {
          const isBestFlight = flight.id === bestFlight.id
          const isCheapestFlight = flight.id === cheapestFlight?.id
          const isHighlighted = isBestFlight || isCheapestFlight

          return (
            <Card
              key={flight.id}
              className={`transition-all duration-200 ${
                isHighlighted
                  ? "ring-2 shadow-lg hover:shadow-xl" +
                    (isBestFlight ? " ring-blue-500 bg-blue-50" : " ring-green-500 bg-green-50")
                  : "hover:shadow-md"
              }`}
            >
              <CardContent className="p-4">
                {/* Badges for highlighted flights */}
                {isHighlighted && (
                  <div className="flex gap-2 mb-3">
                    {isBestFlight && (
                      <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Best Flight
                      </Badge>
                    )}
                    {isCheapestFlight && (
                      <Badge className="bg-green-600 hover:bg-green-700 text-white">
                        <DollarSign className="w-3 h-3 mr-1" />
                        Cheapest
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  {/* Airline Info */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isHighlighted ? "bg-white shadow-sm" : "bg-gray-100"
                      }`}
                    >
                      <img
                        src={flight.logo || "/placeholder.svg?height=24&width=24&text=" + flight.airline.charAt(0)}
                        alt={flight.airline}
                        className="w-6 h-6 rounded"
                      />
                    </div>
                    <div>
                      <div className={`font-medium ${isHighlighted ? "text-gray-900" : "text-gray-900"}`}>
                        {flight.airline}
                        {isBestFlight && <Crown className="w-4 h-4 inline ml-2 text-blue-600" />}
                      </div>
                      <div className={`text-sm ${isHighlighted ? "text-gray-600" : "text-gray-500"}`}>
                        {flight.stops}
                      </div>
                    </div>
                  </div>

                  {/* Flight Times */}
                  <div className="flex items-center gap-8">
                    {/* Departure */}
                    <div className="text-center">
                      <div className={`text-xl font-semibold ${isHighlighted ? "text-gray-900" : "text-gray-900"}`}>
                        {flight.departure.time}
                      </div>
                      <div className={`text-sm ${isHighlighted ? "text-gray-600" : "text-gray-500"}`}>
                        {flight.departure.airport}
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="text-center px-4">
                      <div className={`text-sm mb-1 ${isHighlighted ? "text-gray-600" : "text-gray-500"}`}>
                        {flight.duration}
                      </div>
                      <div
                        className={`border-t relative w-16 ${isHighlighted ? "border-gray-400" : "border-gray-300"}`}
                      >
                        <div
                          className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${
                            isHighlighted ? "bg-gray-400" : "bg-gray-300"
                          }`}
                        ></div>
                      </div>
                      <div className={`text-sm mt-1 ${isHighlighted ? "text-gray-600" : "text-gray-500"}`}>
                        {flight.stops}
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="text-center">
                      <div className={`text-xl font-semibold ${isHighlighted ? "text-gray-900" : "text-gray-900"}`}>
                        {flight.arrival.time}
                      </div>
                      <div className={`text-sm ${isHighlighted ? "text-gray-600" : "text-gray-500"}`}>
                        {flight.arrival.airport}
                      </div>
                    </div>
                  </div>

                  {/* Price and Select */}
                  <div className="text-right">
                    <div
                      className={`text-2xl font-bold ${
                        isCheapestFlight ? "text-green-700" : isBestFlight ? "text-blue-700" : "text-gray-900"
                      }`}
                    >
                      ${flight.price}
                    </div>
                    <div className={`text-sm mb-3 ${isHighlighted ? "text-gray-600" : "text-gray-500"}`}>
                      Round trip
                    </div>
                    <Button
                      className={`px-6 py-2 ${
                        isBestFlight
                          ? "bg-blue-600 hover:bg-blue-700"
                          : isCheapestFlight
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-600 hover:bg-gray-700"
                      } text-white`}
                    >
                      Select
                    </Button>
                  </div>
                </div>

                {/* Dates */}
                <div className={`mt-3 pt-3 border-t ${isHighlighted ? "border-gray-200" : "border-gray-100"}`}>
                  <div className={`text-sm ${isHighlighted ? "text-gray-600" : "text-gray-500"}`}>{flight.dates}</div>
                </div>

                {/* Why this is the best/cheapest flight */}
                {isHighlighted && (
                  <div
                    className={`mt-3 p-3 rounded-lg ${
                      isBestFlight ? "bg-blue-100 border border-blue-200" : "bg-green-100 border border-green-200"
                    }`}
                  >
                    <div className={`text-sm font-medium mb-1 ${isBestFlight ? "text-blue-800" : "text-green-800"}`}>
                      {isBestFlight ? "Why this is the best flight:" : "Why this is the cheapest:"}
                    </div>
                    <div className={`text-xs ${isBestFlight ? "text-blue-700" : "text-green-700"}`}>
                      {isBestFlight && (
                        <span>
                          Perfect balance of price, flight time, and airline quality • {flight.stops} • Reliable airline
                        </span>
                      )}
                      {isCheapestFlight && !isBestFlight && (
                        <span>
                          Lowest price available for this route • Save ${maxPrice - flight.price} vs most expensive
                          option
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
