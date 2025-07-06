"use client"

import { Minus, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TrainPassengerCounts } from "../types"

interface TrainPassengerSelectorProps {
  passengers: TrainPassengerCounts
  onPassengersChange: (passengers: TrainPassengerCounts) => void
}

export function TrainPassengerSelector({ passengers, onPassengersChange }: TrainPassengerSelectorProps) {
  const updatePassengerCount = (type: keyof TrainPassengerCounts, change: number) => {
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
      key: "adults" as keyof TrainPassengerCounts,
      label: "Adults",
      description: "Age 18-64",
      count: passengers.adults,
      minCount: 1,
    },
    {
      key: "children" as keyof TrainPassengerCounts,
      label: "Children",
      description: "Ages 2-17",
      count: passengers.children,
      minCount: 0,
    },
    {
      key: "seniors" as keyof TrainPassengerCounts,
      label: "Seniors",
      description: "Age 65+",
      count: passengers.seniors,
      minCount: 0,
    },
  ]

  const totalPassengers = passengers.adults + passengers.children + passengers.seniors

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
      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="text-xs text-green-700 space-y-1">
          <div>• Children under 2 travel free on adult's lap</div>
          <div>• Senior discounts available for ages 65+</div>
          <div>• Student discounts available with valid ID</div>
          <div>• Maximum 9 passengers per booking</div>
        </div>
      </div>
    </div>
  )
}
