"use client"

import { Minus, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PassengerCounts } from "../types"

interface PassengerSelectorProps {
  passengers: PassengerCounts
  onPassengersChange: (passengers: PassengerCounts) => void
}

export function PassengerSelector({ passengers, onPassengersChange }: PassengerSelectorProps) {
  const updatePassengerCount = (type: keyof PassengerCounts, change: number) => {
    const newCount = Math.max(0, passengers[type] + change)

    // Ensure at least 1 adult
    if (type === "adults" && newCount < 1) return

    // Limit maximum passengers
    if (newCount > 9) return

    onPassengersChange({
      ...passengers,
      [type]: newCount,
    })
  }

  const passengerTypes = [
    {
      key: "adults" as keyof PassengerCounts,
      label: "Adults",
      description: "Age 12+",
      count: passengers.adults,
      minCount: 1,
    },
    {
      key: "children" as keyof PassengerCounts,
      label: "Children",
      description: "Ages 2-11",
      count: passengers.children,
      minCount: 0,
    },
    {
      key: "infantsInLap" as keyof PassengerCounts,
      label: "Infants",
      description: "In lap, under 2",
      count: passengers.infantsInLap,
      minCount: 0,
    },
    {
      key: "infantsInSeat" as keyof PassengerCounts,
      label: "Infants",
      description: "In seat, under 2",
      count: passengers.infantsInSeat,
      minCount: 0,
    },
  ]

  const totalPassengers = passengers.adults + passengers.children + passengers.infantsInLap + passengers.infantsInSeat

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-900">Total: {totalPassengers} passengers</span>
      </div>

      <div className="space-y-3">
        {passengerTypes.map((type) => (
          <div key={type.key} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{type.label}</div>
              <div className="text-xs text-gray-500">{type.description}</div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-7 h-7 p-0 rounded-full bg-white"
                onClick={() => updatePassengerCount(type.key, -1)}
                disabled={type.count <= type.minCount}
              >
                <Minus className="w-3 h-3" />
              </Button>

              <span className="w-6 text-center text-sm font-medium text-gray-900">{type.count}</span>

              <Button
                variant="outline"
                size="sm"
                className="w-7 h-7 p-0 rounded-full bg-white"
                onClick={() => updatePassengerCount(type.key, 1)}
                disabled={type.count >= 9}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Passenger Rules Info */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="text-xs text-blue-700 space-y-1">
          <div>• Each adult can travel with 1 infant in lap</div>
          <div>• Children and infants in seat require their own seat</div>
          <div>• Maximum 9 passengers per booking</div>
        </div>
      </div>
    </div>
  )
}
