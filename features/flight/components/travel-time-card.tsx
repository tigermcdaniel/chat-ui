"use client"

import { useState } from "react"
import { Calendar, MapPin, Plane, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FlightList } from "./flight-list"
import type { TravelTime } from "@/types"

interface FlightTravelTimeCardProps {
  time: TravelTime
  index: number
  fromLocation?: string
  toLocation?: string
  fromCity?: string
  toCity?: string
}

export function FlightTravelTimeCard({
  time,
  index,
  fromLocation = "Los Angeles (LAX)",
  toLocation = "New York (JFK)",
  fromCity = "Los Angeles",
  toCity = "New York",
}: FlightTravelTimeCardProps) {
  const [showFlights, setShowFlights] = useState(false)

  // Mock flight data for each travel time
  const mockFlights = [
    {
      id: "1",
      airline: "Delta",
      logo: "/placeholder.svg?height=24&width=24&text=DL",
      departure: { time: "8:30 AM", airport: "JFK" },
      arrival: { time: "11:45 AM", airport: "LAX" },
      duration: "3h 15m",
      stops: "Nonstop",
      price: 351,
      dates: `${time.period.split(" - ")[0]}, 2025 - ${time.period.split(" - ")[1]}, 2025`,
    },
    {
      id: "2",
      airline: "United",
      logo: "/placeholder.svg?height=24&width=24&text=UA",
      departure: { time: "10:15 AM", airport: "JFK" },
      arrival: { time: "1:45 PM", airport: "LAX" },
      duration: "3h 30m",
      stops: "Nonstop",
      price: 324,
      dates: `${time.period.split(" - ")[0]}, 2025 - ${time.period.split(" - ")[1]}, 2025`,
    },
    {
      id: "3",
      airline: "American",
      logo: "/placeholder.svg?height=24&width=24&text=AA",
      departure: { time: "2:20 PM", airport: "JFK" },
      arrival: { time: "5:35 PM", airport: "LAX" },
      duration: "3h 15m",
      stops: "Nonstop",
      price: 289,
      dates: `${time.period.split(" - ")[0]}, 2025 - ${time.period.split(" - ")[1]}, 2025`,
    },
    {
      id: "4",
      airline: "JetBlue",
      logo: "/placeholder.svg?height=24&width=24&text=B6",
      departure: { time: "6:45 PM", airport: "JFK" },
      arrival: { time: "9:55 PM", airport: "LAX" },
      duration: "3h 10m",
      stops: "Nonstop",
      price: 312,
      dates: `${time.period.split(" - ")[0]}, 2025 - ${time.period.split(" - ")[1]}, 2025`,
    },
  ]

  const handleSeeFlights = () => {
    setShowFlights(!showFlights)
  }

  return (
    <div>
      <Card className="hover:shadow-lg transition-shadow border border-gray-200">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Travel Period</h3>
            <span className="text-sm font-medium text-gray-600">Best Deals</span>
          </div>

          {/* Location and Date Info */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* From */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-0.5">
                <MapPin className="w-5 h-5 text-blue-500 fill-blue-100" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">From</div>
                <div className="text-sm text-gray-600">{fromLocation}</div>
              </div>
            </div>

            {/* To */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-0.5">
                <MapPin className="w-5 h-5 text-green-500 fill-green-100" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">To</div>
                <div className="text-sm text-gray-600">{toLocation}</div>
              </div>
            </div>

            {/* Dates */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-0.5">
                <Calendar className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">Dates</div>
                <div className="text-sm text-gray-600">{time.period}</div>
              </div>
            </div>
          </div>

          {/* Price and Button */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500 mr-2">Starting from</span>
              <span className="text-2xl font-bold text-gray-900">${time.price}</span>
            </div>
            <Button
              onClick={handleSeeFlights}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg"
            >
              <span className="mr-2">See Flights</span>
              {showFlights ? <ChevronUp className="w-4 h-4" /> : <Plane className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Expandable Flight List */}
      {showFlights && (
        <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
          <FlightList flights={mockFlights} fromCity={fromCity} toCity={toCity} month={time.month} />
        </div>
      )}
    </div>
  )
}
