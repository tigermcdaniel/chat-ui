"use client"

import { Plane, Train, Bus, Car, Ship, MapPin, Clock, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { TransportationMode } from "@/types"

interface TransportationSelectorProps {
  destination: string
  fromCity: string
  onTransportationSelect: (mode: TransportationMode) => void
}

export function TransportationSelector({ destination, fromCity, onTransportationSelect }: TransportationSelectorProps) {
  const transportationModes = [
    {
      id: "plane" as TransportationMode,
      label: "Flight",
      icon: <Plane className="w-6 h-6" />,
      description: "Fastest option",
      duration: "3-15 hours",
      priceRange: "$200-2000",
      pros: ["Fastest", "Long distances", "Global reach"],
      cons: ["Airport security", "Weather delays", "Carbon footprint"],
      popular: true,
      color: "blue",
      available: true,
    },
    {
      id: "train" as TransportationMode,
      label: "Train",
      icon: <Train className="w-6 h-6" />,
      description: "Scenic & comfortable",
      duration: "2-24 hours",
      priceRange: "$50-500",
      pros: ["Scenic views", "City center to center", "Comfortable"],
      cons: ["Limited routes", "Slower than flying", "Weather dependent"],
      popular: false,
      color: "green",
      available: true,
    },
    {
      id: "bus" as TransportationMode,
      label: "Bus",
      icon: <Bus className="w-6 h-6" />,
      description: "Most affordable",
      duration: "4-48 hours",
      priceRange: "$20-200",
      pros: ["Very affordable", "Frequent departures", "No booking fees"],
      cons: ["Longest travel time", "Limited comfort", "Traffic delays"],
      popular: false,
      color: "orange",
      available: false,
    },
    {
      id: "car" as TransportationMode,
      label: "Drive",
      icon: <Car className="w-6 h-6" />,
      description: "Complete flexibility",
      duration: "Variable",
      priceRange: "$50-300",
      pros: ["Complete control", "Stop anywhere", "Luggage freedom"],
      cons: ["Driving fatigue", "Parking costs", "Fuel expenses"],
      popular: false,
      color: "purple",
      available: false,
    },
    {
      id: "ferry" as TransportationMode,
      label: "Ferry",
      icon: <Ship className="w-6 h-6" />,
      description: "Unique experience",
      duration: "2-24 hours",
      priceRange: "$30-400",
      pros: ["Unique experience", "Vehicle transport", "Ocean views"],
      cons: ["Weather dependent", "Limited routes", "Motion sickness"],
      popular: false,
      color: "teal",
      available: false,
    },
  ]

  const getColorClasses = (color: string, isSelected = false) => {
    const colors = {
      blue: {
        bg: isSelected ? "bg-blue-50" : "bg-white",
        border: isSelected ? "border-blue-500 ring-2 ring-blue-500" : "border-gray-200 hover:border-blue-300",
        icon: isSelected ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600",
        badge: "bg-blue-100 text-blue-700",
        button: "bg-blue-600 hover:bg-blue-700",
      },
      green: {
        bg: isSelected ? "bg-green-50" : "bg-white",
        border: isSelected ? "border-green-500 ring-2 ring-green-500" : "border-gray-200 hover:border-green-300",
        icon: isSelected ? "bg-green-500 text-white" : "bg-green-100 text-green-600",
        badge: "bg-green-100 text-green-700",
        button: "bg-green-600 hover:bg-green-700",
      },
      orange: {
        bg: isSelected ? "bg-orange-50" : "bg-white",
        border: isSelected ? "border-orange-500 ring-2 ring-orange-500" : "border-gray-200 hover:border-orange-300",
        icon: isSelected ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-600",
        badge: "bg-orange-100 text-orange-700",
        button: "bg-orange-600 hover:bg-orange-700",
      },
      purple: {
        bg: isSelected ? "bg-purple-50" : "bg-white",
        border: isSelected ? "border-purple-500 ring-2 ring-purple-500" : "border-gray-200 hover:border-purple-300",
        icon: isSelected ? "bg-purple-500 text-white" : "bg-purple-100 text-purple-600",
        badge: "bg-purple-100 text-purple-700",
        button: "bg-purple-600 hover:bg-purple-700",
      },
      teal: {
        bg: isSelected ? "bg-teal-50" : "bg-white",
        border: isSelected ? "border-teal-500 ring-2 ring-teal-500" : "border-gray-200 hover:border-teal-300",
        icon: isSelected ? "bg-teal-500 text-white" : "bg-teal-100 text-teal-600",
        badge: "bg-teal-100 text-teal-700",
        button: "bg-teal-600 hover:bg-teal-700",
      },
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">How would you like to get to {destination}?</h3>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>From {fromCity}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transportationModes.map((mode) => {
          const colorClasses = getColorClasses(mode.color)

          return (
            <Card
              key={mode.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${colorClasses.border} ${colorClasses.bg} ${
                !mode.available ? "opacity-75" : ""
              }`}
              onClick={() => onTransportationSelect(mode.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses.icon}`}>
                        {mode.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{mode.label}</h4>
                        <p className="text-sm text-gray-600">{mode.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {mode.popular && <Badge className={colorClasses.badge}>Popular</Badge>}
                      {!mode.available && (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{mode.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{mode.priceRange}</span>
                    </div>
                  </div>

                  {/* Pros */}
                  <div>
                    <h5 className="text-xs font-medium text-gray-700 mb-2">Advantages:</h5>
                    <div className="space-y-1">
                      {mode.pros.slice(0, 2).map((pro, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                          <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Select Button */}
                  <Button
                    className={`w-full ${colorClasses.button} text-white ${
                      !mode.available ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      onTransportationSelect(mode.id)
                    }}
                  >
                    {mode.available ? `Choose ${mode.label}` : "Coming Soon"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Additional Info */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          I'll help you find the best options and book your trip once you select your preferred transportation method.
        </p>
      </div>
    </div>
  )
}
