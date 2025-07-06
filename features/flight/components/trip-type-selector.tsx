"use client"

import { useState } from "react"
import {
  Plane,
  ArrowLeftRight,
  MapPin,
  Users,
  ChevronDown,
  ChevronUp,
  Edit,
  Crown,
  Calendar,
  CalendarDays,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PassengerSelector } from "./passenger-selector"
import { CabinClassSelector } from "./cabin-class-selector"
import type { TripType } from "@/types"
import type { PassengerCounts, CabinClass } from "../types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FlightTripTypeSelectorProps {
  destination: string
  fromCity: string
  onTripTypeSelect: (
    tripType: TripType,
    passengers: PassengerCounts,
    cabinClass: CabinClass,
    dateInfo?: { departureDate: string; returnDate: string } | null,
  ) => void
}

export function FlightTripTypeSelector({ destination, fromCity, onTripTypeSelect }: FlightTripTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<TripType>("round-trip")
  const [passengers, setPassengers] = useState<PassengerCounts>({
    adults: 1,
    children: 0,
    infantsInLap: 0,
    infantsInSeat: 0,
  })
  const [cabinClass, setCabinClass] = useState<CabinClass>("economy")
  const [isExpanded, setIsExpanded] = useState(false)

  const [dateOption, setDateOption] = useState<"flexible" | "specific">("flexible")
  const [departureDate, setDepartureDate] = useState("")
  const [returnDate, setReturnDate] = useState("")

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
      icon: <Plane className="w-4 h-4" />,
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

  const cabinClasses = {
    economy: { label: "Economy", icon: <Plane className="w-4 h-4" /> },
    "premium-economy": { label: "Premium Economy", icon: <Crown className="w-4 h-4" /> },
    business: { label: "Business", icon: <Crown className="w-4 h-4" /> },
    first: { label: "First Class", icon: <Crown className="w-4 h-4" /> },
  }

  const handleTypeSelect = (type: TripType) => {
    setSelectedType(type)
  }

  const handlePassengersChange = (newPassengers: PassengerCounts) => {
    setPassengers(newPassengers)
  }

  const handleCabinClassChange = (newCabinClass: CabinClass) => {
    setCabinClass(newCabinClass)
  }

  const handleContinue = () => {
    const dateInfo = dateOption === "specific" ? { departureDate, returnDate } : null
    onTripTypeSelect(selectedType, passengers, cabinClass, dateInfo)
  }

  const getTotalPassengers = () => {
    return passengers.adults + passengers.children + passengers.infantsInLap + passengers.infantsInSeat
  }

  const getPassengerSummary = () => {
    const parts = []
    if (passengers.adults > 0) parts.push(`${passengers.adults} adult${passengers.adults > 1 ? "s" : ""}`)
    if (passengers.children > 0) parts.push(`${passengers.children} child${passengers.children > 1 ? "ren" : ""}`)
    if (passengers.infantsInLap > 0)
      parts.push(`${passengers.infantsInLap} infant${passengers.infantsInLap > 1 ? "s" : ""} (lap)`)
    if (passengers.infantsInSeat > 0)
      parts.push(`${passengers.infantsInSeat} infant${passengers.infantsInSeat > 1 ? "s" : ""} (seat)`)
    return parts.join(", ")
  }

  const getSelectedTripType = () => {
    return tripTypes.find((t) => t.id === selectedType)
  }

  const getSelectedCabinClass = () => {
    return cabinClasses[cabinClass]
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Great choice! How would you like to fly to {destination}?
        </h3>
        <p className="text-sm text-gray-600">I'll find the best flight periods and pricing based on your preferences</p>
      </div>

      <Card className="border-gray-200">
        <CardContent className="p-4">
          {/* Compact Summary View */}
          {!isExpanded && (
            <div className="space-y-4">
              {/* Trip Type Summary */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
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

              {/* Cabin Class Summary */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    {getSelectedCabinClass()?.icon}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{getSelectedCabinClass()?.label}</div>
                    <div className="text-sm text-gray-500">
                      {cabinClass === "economy" && "Standard seating & service"}
                      {cabinClass === "premium-economy" && "Extra legroom & amenities"}
                      {cabinClass === "business" && "Lie-flat seats & priority"}
                      {cabinClass === "first" && "Ultimate luxury experience"}
                    </div>
                  </div>
                </div>
                {cabinClass === "economy" && (
                  <div className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
              </div>

              {/* Date Summary - add this after Cabin Class Summary */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    {dateOption === "flexible" ? (
                      <CalendarDays className="w-4 h-4 text-green-600" />
                    ) : (
                      <Calendar className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {dateOption === "flexible" ? "Flexible Dates" : "Specific Dates"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {dateOption === "flexible"
                        ? "Find best time to travel"
                        : departureDate
                          ? `${departureDate}${selectedType === "round-trip" && returnDate ? ` - ${returnDate}` : ""}`
                          : "Select your dates"}
                    </div>
                  </div>
                </div>
                {dateOption === "flexible" && (
                  <div className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                    Recommended
                  </div>
                )}
              </div>

              {/* Expand Button */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(true)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
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
                <h4 className="text-base font-medium text-gray-900">Flight Details</h4>
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
                          ? "ring-2 ring-blue-500 border-blue-500 bg-blue-50"
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
                              selectedType === type.id ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {type.icon}
                          </div>

                          <div>
                            <h6 className="text-sm font-medium text-gray-900">{type.label}</h6>
                            <p className="text-xs text-gray-500">{type.description}</p>
                          </div>

                          {selectedType === type.id && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-3">Travel Dates</h5>
                <div className="space-y-4">
                  {/* Date Option Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Card
                      className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
                        dateOption === "flexible"
                          ? "ring-2 ring-blue-500 border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setDateOption("flexible")}
                    >
                      <CardContent className="p-3 text-center">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                            Recommended
                          </div>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              dateOption === "flexible" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <CalendarDays className="w-4 h-4" />
                          </div>
                          <div>
                            <h6 className="text-sm font-medium text-gray-900">Flexible Dates</h6>
                            <p className="text-xs text-gray-500">Find the best time to travel</p>
                          </div>
                          {dateOption === "flexible" && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
                        dateOption === "specific"
                          ? "ring-2 ring-blue-500 border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setDateOption("specific")}
                    >
                      <CardContent className="p-3 text-center">
                        <div className="flex flex-col items-center space-y-2">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              dateOption === "specific" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div>
                            <h6 className="text-sm font-medium text-gray-900">Specific Dates</h6>
                            <p className="text-xs text-gray-500">I know when I want to travel</p>
                          </div>
                          {dateOption === "specific" && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Specific Date Inputs */}
                  {dateOption === "specific" && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="departure-date" className="text-sm font-medium text-gray-700">
                            Departure Date
                          </Label>
                          <Input
                            id="departure-date"
                            type="date"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full"
                          />
                        </div>
                        {selectedType === "round-trip" && (
                          <div className="space-y-2">
                            <Label htmlFor="return-date" className="text-sm font-medium text-gray-700">
                              Return Date
                            </Label>
                            <Input
                              id="return-date"
                              type="date"
                              value={returnDate}
                              onChange={(e) => setReturnDate(e.target.value)}
                              min={departureDate || new Date().toISOString().split("T")[0]}
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>
                      {selectedType === "round-trip" && departureDate && !returnDate && (
                        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded p-2">
                          Please select a return date for your round-trip flight.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Flexible Dates Info */}
                  {dateOption === "flexible" && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <CalendarDays className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div className="text-sm text-blue-700">
                          <div className="font-medium mb-1">I'll find the best travel times for you!</div>
                          <div className="text-xs space-y-1">
                            <div>• Analyze prices across the next 6 months</div>
                            <div>• Consider weather, events, and crowds</div>
                            <div>• Show you the top 5 travel periods</div>
                            <div>• Help you save money and have a better trip</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Cabin Class Selection */}
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-3">Cabin Class</h5>
                <CabinClassSelector selectedClass={cabinClass} onClassChange={handleCabinClassChange} compact={false} />
              </div>

              {/* Passenger Selection */}
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-3">Passengers</h5>
                <PassengerSelector passengers={passengers} onPassengersChange={handlePassengersChange} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Continue Button */}
      <div className="flex flex-col items-center gap-3 pt-2">
        <div className="text-sm text-gray-600 text-center">
          <div className="font-medium">
            {getSelectedTripType()?.label} • {getSelectedCabinClass()?.label} • {getTotalPassengers()} passenger
            {getTotalPassengers() > 1 ? "s" : ""}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {getPassengerSummary()} •{" "}
            {dateOption === "flexible"
              ? "Flexible dates"
              : departureDate
                ? `${departureDate}${selectedType === "round-trip" && returnDate ? ` - ${returnDate}` : ""}`
                : "Select dates"}
          </div>
        </div>
        <Button
          onClick={handleContinue}
          disabled={dateOption === "specific" && (!departureDate || (selectedType === "round-trip" && !returnDate))}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {dateOption === "flexible" ? "Find Best Flight Times" : "Search Flights"}
        </Button>
      </div>
    </div>
  )
}
