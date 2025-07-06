"use client"

import { useState } from "react"
import { Train, ArrowLeftRight, MapPin, Users, ChevronDown, ChevronUp, Edit, Crown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrainPassengerSelector } from "./passenger-selector"
import { TrainClassSelector } from "./class-selector"
import type { TripType } from "@/types"
import type { TrainPassengerCounts, TrainClass } from "../types"

interface TrainTripSelectorProps {
  destination: string
  fromCity: string
  onTripTypeSelect: (tripType: TripType, passengers: TrainPassengerCounts, trainClass: TrainClass) => void
}

export function TrainTripSelector({ destination, fromCity, onTripTypeSelect }: TrainTripSelectorProps) {
  const [selectedType, setSelectedType] = useState<TripType>("round-trip")
  const [passengers, setPassengers] = useState<TrainPassengerCounts>({
    adults: 1,
    children: 0,
    seniors: 0,
  })
  const [trainClass, setTrainClass] = useState<TrainClass>("coach")
  const [isExpanded, setIsExpanded] = useState(false)

  const tripTypes = [
    {
      id: "round-trip" as TripType,
      label: "Round trip",
      icon: <ArrowLeftRight className="w-4 h-4" />,
      description: "Return to your departure city",
      popular: true,
    },
    {
      id: "one-way" as TripType,
      label: "One way",
      icon: <Train className="w-4 h-4" />,
      description: "Single direction travel",
      popular: false,
    },
    {
      id: "multi-destination" as TripType,
      label: "Multi-destination",
      icon: <MapPin className="w-4 h-4" />,
      description: "Visit multiple cities",
      popular: false,
    },
  ]

  const trainClasses = {
    coach: { label: "Coach", icon: <Train className="w-4 h-4" /> },
    business: { label: "Business Class", icon: <Crown className="w-4 h-4" /> },
    "first-class": { label: "First Class", icon: <Crown className="w-4 h-4" /> },
    sleeper: { label: "Sleeper Car", icon: <Crown className="w-4 h-4" /> },
  }

  const handleTypeSelect = (type: TripType) => {
    setSelectedType(type)
  }

  const handlePassengersChange = (newPassengers: TrainPassengerCounts) => {
    setPassengers(newPassengers)
  }

  const handleTrainClassChange = (newTrainClass: TrainClass) => {
    setTrainClass(newTrainClass)
  }

  const handleContinue = () => {
    onTripTypeSelect(selectedType, passengers, trainClass)
  }

  const getTotalPassengers = () => {
    return passengers.adults + passengers.children + passengers.seniors
  }

  const getPassengerSummary = () => {
    const parts = []
    if (passengers.adults > 0) parts.push(`${passengers.adults} adult${passengers.adults > 1 ? "s" : ""}`)
    if (passengers.children > 0) parts.push(`${passengers.children} child${passengers.children > 1 ? "ren" : ""}`)
    if (passengers.seniors > 0) parts.push(`${passengers.seniors} senior${passengers.seniors > 1 ? "s" : ""}`)
    return parts.join(", ")
  }

  const getSelectedTripType = () => {
    return tripTypes.find((t) => t.id === selectedType)
  }

  const getSelectedTrainClass = () => {
    return trainClasses[trainClass]
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Perfect! How would you like to travel by train to {destination}?
        </h3>
        <p className="text-sm text-gray-600">I'll find the best train routes and pricing based on your preferences</p>
      </div>

      <Card className="border-gray-200">
        <CardContent className="p-4">
          {/* Compact Summary View */}
          {!isExpanded && (
            <div className="space-y-4">
              {/* Trip Type Summary */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    {getSelectedTripType()?.icon}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{getSelectedTripType()?.label}</div>
                    <div className="text-sm text-gray-500">{getSelectedTripType()?.description}</div>
                  </div>
                </div>
                {getSelectedTripType()?.popular && (
                  <div className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
              </div>

              {/* Passenger Summary */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {getTotalPassengers()} passenger{getTotalPassengers() > 1 ? "s" : ""}
                    </div>
                    <div className="text-sm text-gray-500">{getPassengerSummary()}</div>
                  </div>
                </div>
              </div>

              {/* Train Class Summary */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    {getSelectedTrainClass()?.icon}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{getSelectedTrainClass()?.label}</div>
                    <div className="text-sm text-gray-500">
                      {trainClass === "coach" && "Standard comfortable seating"}
                      {trainClass === "business" && "Extra space & amenities"}
                      {trainClass === "first-class" && "Premium comfort & service"}
                      {trainClass === "sleeper" && "Private accommodation"}
                    </div>
                  </div>
                </div>
                {trainClass === "coach" && (
                  <div className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
              </div>

              {/* Expand Button */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(true)}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Change selection
                </Button>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          )}

          {/* Expanded Detail View */}
          {isExpanded && (
            <div className="space-y-6">
              {/* Collapse Button */}
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium text-gray-900">Train Trip Details</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Collapse
                </Button>
              </div>

              {/* Trip Type Selection */}
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-3">Trip Type</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {tripTypes.map((type) => (
                    <Card
                      key={type.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
                        selectedType === type.id
                          ? "ring-2 ring-green-500 border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleTypeSelect(type.id)}
                    >
                      <CardContent className="p-3 text-center">
                        <div className="flex flex-col items-center space-y-2">
                          {type.popular && (
                            <div className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                              Popular
                            </div>
                          )}

                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              selectedType === type.id ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {type.icon}
                          </div>

                          <div>
                            <h6 className="text-sm font-medium text-gray-900">{type.label}</h6>
                            <p className="text-xs text-gray-500">{type.description}</p>
                          </div>

                          {selectedType === type.id && (
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Train Class Selection */}
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-3">Train Class</h5>
                <TrainClassSelector selectedClass={trainClass} onClassChange={handleTrainClassChange} compact={false} />
              </div>

              {/* Passenger Selection */}
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-3">Passengers</h5>
                <TrainPassengerSelector passengers={passengers} onPassengersChange={handlePassengersChange} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Continue Button */}
      <div className="flex flex-col items-center gap-3 pt-2">
        <div className="text-sm text-gray-600 text-center">
          <div className="font-medium">
            {getSelectedTripType()?.label} • {getSelectedTrainClass()?.label} • {getTotalPassengers()} passenger
            {getTotalPassengers() > 1 ? "s" : ""}
          </div>
          <div className="text-xs text-gray-500 mt-1">{getPassengerSummary()}</div>
        </div>
        <Button onClick={handleContinue} className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg">
          Find Best Train Times
        </Button>
      </div>
    </div>
  )
}
