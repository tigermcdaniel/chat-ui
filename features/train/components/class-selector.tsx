"use client"

import { Train, Crown, Star, Bed } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { TrainClass } from "../types"

interface TrainClassSelectorProps {
  selectedClass: TrainClass
  onClassChange: (trainClass: TrainClass) => void
  compact?: boolean
}

export function TrainClassSelector({ selectedClass, onClassChange, compact = false }: TrainClassSelectorProps) {
  const trainClasses = [
    {
      id: "coach" as TrainClass,
      label: "Coach",
      icon: <Train className="w-4 h-4" />,
      description: "Standard seating",
      popular: true,
      priceMultiplier: 1,
      benefits: [
        "Comfortable reclining seats",
        "Large windows for scenic views",
        "Overhead luggage storage",
        "Access to café car",
        "Free Wi-Fi on most routes",
      ],
    },
    {
      id: "business" as TrainClass,
      label: "Business Class",
      icon: <Star className="w-4 h-4" />,
      description: "Extra space & amenities",
      popular: false,
      priceMultiplier: 1.8,
      benefits: [
        "Wider seats with extra legroom",
        "Complimentary snacks and beverages",
        "Priority boarding",
        "Power outlets at every seat",
        "Access to quiet car",
        "Dedicated business class lounge",
      ],
    },
    {
      id: "first-class" as TrainClass,
      label: "First Class",
      icon: <Crown className="w-4 h-4" />,
      description: "Premium comfort",
      popular: false,
      priceMultiplier: 2.5,
      benefits: [
        "Spacious leather seats",
        "Complimentary meals and drinks",
        "Dedicated first-class car",
        "At-seat meal service",
        "Premium amenity kit",
        "Exclusive lounge access",
        "Priority customer service",
      ],
    },
    {
      id: "sleeper" as TrainClass,
      label: "Sleeper Car",
      icon: <Bed className="w-4 h-4" />,
      description: "Private accommodation",
      popular: false,
      priceMultiplier: 3.2,
      benefits: [
        "Private room with bed",
        "Personal bathroom facilities",
        "All meals included",
        "Dedicated sleeping car attendant",
        "Fresh linens and towels",
        "Shower facilities available",
        "Priority boarding and departure",
      ],
    },
  ]

  const selectedClassData = trainClasses.find((c) => c.id === selectedClass)

  if (compact) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {trainClasses.map((trainClass) => (
          <Card
            key={trainClass.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
              selectedClass === trainClass.id
                ? "ring-2 ring-green-500 border-green-500 bg-green-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onClassChange(trainClass.id)}
          >
            <CardContent className="p-2 text-center">
              <div className="flex flex-col items-center space-y-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    selectedClass === trainClass.id ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {trainClass.icon}
                </div>
                <div className="text-xs font-medium text-gray-900">{trainClass.label}</div>
                {selectedClass === trainClass.id && (
                  <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Class Selection Grid */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {trainClasses.map((trainClass) => (
            <Card
              key={trainClass.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
                selectedClass === trainClass.id
                  ? "ring-2 ring-green-500 border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => onClassChange(trainClass.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  {trainClass.popular && (
                    <div className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                      Popular
                    </div>
                  )}

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      selectedClass === trainClass.id ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {trainClass.icon}
                  </div>

                  <div className="flex-1">
                    <h6 className="text-sm font-medium text-gray-900">{trainClass.label}</h6>
                    <p className="text-xs text-gray-500">{trainClass.description}</p>
                  </div>

                  {selectedClass === trainClass.id && (
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

      {/* Selected Class Benefits - Only show for selected class */}
      {selectedClassData && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
              {selectedClassData.icon}
            </div>
            <h6 className="font-medium text-green-900">{selectedClassData.label} includes:</h6>
          </div>
          <div className="space-y-1">
            {selectedClassData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-green-700">
                <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
