"use client"

import { useState } from "react"
import { Calendar, MapPin, Train, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrainList } from "./train-list"
import type { TravelTime } from "@/types"

interface TrainTravelTimeCardProps {
  time: TravelTime
  index: number
  fromLocation?: string
  toLocation?: string
  fromCity?: string
  toCity?: string
}

export function TrainTravelTimeCard({
  time,
  index,
  fromLocation = "Los Angeles Union Station",
  toLocation = "New York Penn Station",
  fromCity = "Los Angeles",
  toCity = "New York",
}: TrainTravelTimeCardProps) {
  const [showTrains, setShowTrains] = useState(false)

  // Mock train data for each travel time
  const mockTrains = [
    {
      id: "1",
      operator: "Amtrak",
      logo: "/placeholder.svg?height=24&width=24&text=AMT",
      departure: { time: "8:30 AM", station: "Union Station" },
      arrival: { time: "7:45 PM", station: "Penn Station" },
      duration: "11h 15m",
      stops: "3 stops",
      price: 180,
      dates: `${time.period.split(" - ")[0]}, 2025 - ${time.period.split(" - ")[1]}, 2025`,
      trainType: "Northeast Regional",
      amenities: ["Wi-Fi", "Café Car", "Power Outlets"],
    },
    {
      id: "2",
      operator: "Amtrak",
      logo: "/placeholder.svg?height=24&width=24&text=AMT",
      departure: { time: "2:15 PM", station: "Union Station" },
      arrival: { time: "1:30 AM+1", station: "Penn Station" },
      duration: "11h 15m",
      stops: "3 stops",
      price: 165,
      dates: `${time.period.split(" - ")[0]}, 2025 - ${time.period.split(" - ")[1]}, 2025`,
      trainType: "Northeast Regional",
      amenities: ["Wi-Fi", "Café Car", "Power Outlets"],
    },
    {
      id: "3",
      operator: "Amtrak",
      logo: "/placeholder.svg?height=24&width=24&text=AMT",
      departure: { time: "6:45 AM", station: "Union Station" },
      arrival: { time: "5:55 PM", station: "Penn Station" },
      duration: "11h 10m",
      stops: "2 stops",
      price: 220,
      dates: `${time.period.split(" - ")[0]}, 2025 - ${time.period.split(" - ")[1]}, 2025`,
      trainType: "Acela Express",
      amenities: ["Wi-Fi", "Business Class Café", "Power Outlets", "First Class Service"],
    },
    {
      id: "4",
      operator: "Amtrak",
      logo: "/placeholder.svg?height=24&width=24&text=AMT",
      departure: { time: "10:30 PM", station: "Union Station" },
      arrival: { time: "9:45 AM+1", station: "Penn Station" },
      duration: "11h 15m",
      stops: "4 stops",
      price: 145,
      dates: `${time.period.split(" - ")[0]}, 2025 - ${time.period.split(" - ")[1]}, 2025`,
      trainType: "Silver Star",
      amenities: ["Wi-Fi", "Café Car", "Sleeper Cars Available"],
    },
  ]

  const handleSeeTrains = () => {
    setShowTrains(!showTrains)
  }

  return (
    <div>
      <Card className="hover:shadow-lg transition-shadow border border-gray-200">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Travel Period</h3>
            <span className="text-sm font-medium text-gray-600">Best Train Deals</span>
          </div>

          {/* Location and Date Info */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* From */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-0.5">
                <MapPin className="w-5 h-5 text-green-500 fill-green-100" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">From</div>
                <div className="text-sm text-gray-600">{fromLocation}</div>
              </div>
            </div>

            {/* To */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-0.5">
                <MapPin className="w-5 h-5 text-blue-500 fill-blue-100" />
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
              onClick={handleSeeTrains}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              <span className="mr-2">See Trains</span>
              {showTrains ? <ChevronUp className="w-4 h-4" /> : <Train className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Expandable Train List */}
      {showTrains && (
        <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
          <TrainList trains={mockTrains} fromCity={fromCity} toCity={toCity} month={time.month} />
        </div>
      )}
    </div>
  )
}
