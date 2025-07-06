import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, DollarSign, Crown, Wifi, Coffee, Zap } from "lucide-react"
import { TrainPriceTimeline } from "./price-timeline"
import type { Train } from "../types"

interface TrainListProps {
  trains: Train[]
  fromCity: string
  toCity: string
  month: string
  year?: string
}

export function TrainList({ trains, fromCity, toCity, month, year = "2025" }: TrainListProps) {
  // Calculate average price for timeline
  const averagePrice = Math.round(trains.reduce((sum, train) => sum + train.price, 0) / trains.length)
  const minPrice = Math.min(...trains.map((t) => t.price))
  const maxPrice = Math.max(...trains.map((t) => t.price))

  // Find cheapest train
  const cheapestTrain = trains.find((train) => train.price === minPrice)

  // Find best train (balance of price, duration, and amenities)
  const getBestTrain = () => {
    const scoredTrains = trains.map((train) => {
      // Price score (lower price = higher score, max 40 points)
      const priceScore = Math.max(0, 40 - ((train.price - minPrice) / (maxPrice - minPrice)) * 40)

      // Duration score (shorter duration = higher score, max 30 points)
      const durationMinutes =
        Number.parseInt(train.duration.split("h")[0]) * 60 +
        Number.parseInt(train.duration.split("h")[1]?.split("m")[0] || "0")
      const minDuration = Math.min(
        ...trains.map((t) => {
          const mins =
            Number.parseInt(t.duration.split("h")[0]) * 60 +
            Number.parseInt(t.duration.split("h")[1]?.split("m")[0] || "0")
          return mins
        }),
      )
      const maxDuration = Math.max(
        ...trains.map((t) => {
          const mins =
            Number.parseInt(t.duration.split("h")[0]) * 60 +
            Number.parseInt(t.duration.split("h")[1]?.split("m")[0] || "0")
          return mins
        }),
      )
      const durationScore = Math.max(0, 30 - ((durationMinutes - minDuration) / (maxDuration - minDuration)) * 30)

      // Amenities score (max 20 points)
      const amenityScore = Math.min(20, train.amenities.length * 5)

      // Stops score (fewer stops = higher score, max 10 points)
      const stopsCount = Number.parseInt(train.stops.split(" ")[0]) || 0
      const maxStops = Math.max(...trains.map((t) => Number.parseInt(t.stops.split(" ")[0]) || 0))
      const stopsScore = Math.max(0, 10 - (stopsCount / maxStops) * 10)

      return {
        ...train,
        totalScore: priceScore + durationScore + amenityScore + stopsScore,
      }
    })

    return scoredTrains.reduce((best, current) => (current.totalScore > best.totalScore ? current : best))
  }

  const bestTrain = getBestTrain()

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wi-fi":
        return <Wifi className="w-3 h-3" />
      case "café car":
      case "business class café":
        return <Coffee className="w-3 h-3" />
      case "power outlets":
        return <Zap className="w-3 h-3" />
      default:
        return <Star className="w-3 h-3" />
    }
  }

  return (
    <div className="mt-4 space-y-4">
      {/* Header */}
      <div className="text-lg font-medium text-gray-900">
        Here are the available trains for {month} {year} from {fromCity} to {toCity}:
      </div>

      {/* Train Price Timeline */}
      <TrainPriceTimeline
        destination={toCity}
        currentPrice={averagePrice}
        typicalPrice={averagePrice + 15}
        minPrice={Math.round(minPrice * 0.8)}
        maxPrice={Math.round(maxPrice * 1.2)}
        savings={35}
      />

      {/* Train Results */}
      <div className="space-y-3">
        {trains.map((train) => {
          const isBestTrain = train.id === bestTrain.id
          const isCheapestTrain = train.id === cheapestTrain?.id
          const isHighlighted = isBestTrain || isCheapestTrain

          return (
            <Card
              key={train.id}
              className={`transition-all duration-200 ${
                isHighlighted
                  ? "ring-2 shadow-lg hover:shadow-xl" +
                    (isBestTrain ? " ring-green-500 bg-green-50" : " ring-blue-500 bg-blue-50")
                  : "hover:shadow-md"
              }`}
            >
              <CardContent className="p-4">
                {/* Badges for highlighted trains */}
                {isHighlighted && (
                  <div className="flex gap-2 mb-3">
                    {isBestTrain && (
                      <Badge className="bg-green-600 hover:bg-green-700 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Best Train
                      </Badge>
                    )}
                    {isCheapestTrain && (
                      <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
                        <DollarSign className="w-3 h-3 mr-1" />
                        Cheapest
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  {/* Train Operator Info */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isHighlighted ? "bg-white shadow-sm" : "bg-gray-100"
                      }`}
                    >
                      <img
                        src={train.logo || "/placeholder.svg?height=24&width=24&text=" + train.operator.charAt(0)}
                        alt={train.operator}
                        className="w-6 h-6 rounded"
                      />
                    </div>
                    <div>
                      <div className={`font-medium ${isHighlighted ? "text-gray-900" : "text-gray-900"}`}>
                        {train.operator}
                        {isBestTrain && <Crown className="w-4 h-4 inline ml-2 text-green-600" />}
                      </div>
                      <div className={`text-sm ${isHighlighted ? "text-gray-600" : "text-gray-500"}`}>
                        {train.trainType} • {train.stops}
                      </div>
                    </div>
                  </div>

                  {/* Train Times */}
                  <div className="flex items-center gap-8">
                    {/* Departure */}
                    <div className="text-center">
                      <div className={`text-xl font-semibold ${isHighlighted ? "text-gray-900" : "text-gray-900"}`}>
                        {train.departure.time}
                      </div>
                      <div className={`text-sm ${isHighlighted ? "text-gray-600" : "text-gray-500"}`}>
                        {train.departure.station}
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="text-center px-4">
                      <div className={`text-sm mb-1 ${isHighlighted ? "text-gray-600" : "text-gray-500"}`}>
                        {train.duration}
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
                        {train.stops}
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="text-center">
                      <div className={`text-xl font-semibold ${isHighlighted ? "text-gray-900" : "text-gray-900"}`}>
                        {train.arrival.time}
                      </div>
                      <div className={`text-sm ${isHighlighted ? "text-gray-600" : "text-gray-500"}`}>
                        {train.arrival.station}
                      </div>
                    </div>
                  </div>

                  {/* Price and Select */}
                  <div className="text-right">
                    <div
                      className={`text-2xl font-bold ${
                        isCheapestTrain ? "text-blue-700" : isBestTrain ? "text-green-700" : "text-gray-900"
                      }`}
                    >
                      ${train.price}
                    </div>
                    <div className={`text-sm mb-3 ${isHighlighted ? "text-gray-600" : "text-gray-500"}`}>
                      Round trip
                    </div>
                    <Button
                      className={`px-6 py-2 ${
                        isBestTrain
                          ? "bg-green-600 hover:bg-green-700"
                          : isCheapestTrain
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-600 hover:bg-gray-700"
                      } text-white`}
                    >
                      Select
                    </Button>
                  </div>
                </div>

                {/* Amenities */}
                <div className={`mt-3 pt-3 border-t ${isHighlighted ? "border-gray-200" : "border-gray-100"}`}>
                  <div className="flex items-center gap-4">
                    <div className={`text-sm font-medium ${isHighlighted ? "text-gray-700" : "text-gray-600"}`}>
                      Amenities:
                    </div>
                    <div className="flex items-center gap-3">
                      {train.amenities.slice(0, 4).map((amenity, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-1 text-xs ${
                            isHighlighted ? "text-gray-600" : "text-gray-500"
                          }`}
                        >
                          {getAmenityIcon(amenity)}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className={`mt-2 pt-2 border-t ${isHighlighted ? "border-gray-200" : "border-gray-100"}`}>
                  <div className={`text-sm ${isHighlighted ? "text-gray-600" : "text-gray-500"}`}>{train.dates}</div>
                </div>

                {/* Why this is the best/cheapest train */}
                {isHighlighted && (
                  <div
                    className={`mt-3 p-3 rounded-lg ${
                      isBestTrain ? "bg-green-100 border border-green-200" : "bg-blue-100 border border-blue-200"
                    }`}
                  >
                    <div className={`text-sm font-medium mb-1 ${isBestTrain ? "text-green-800" : "text-blue-800"}`}>
                      {isBestTrain ? "Why this is the best train:" : "Why this is the cheapest:"}
                    </div>
                    <div className={`text-xs ${isBestTrain ? "text-green-700" : "text-blue-700"}`}>
                      {isBestTrain && (
                        <span>
                          Perfect balance of price, travel time, and amenities • {train.trainType} • Great onboard
                          services
                        </span>
                      )}
                      {isCheapestTrain && !isBestTrain && (
                        <span>
                          Lowest price available for this route • Save ${maxPrice - train.price} vs most expensive
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
