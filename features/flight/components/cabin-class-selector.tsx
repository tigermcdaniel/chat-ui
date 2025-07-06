"use client"

import { Plane, Crown, Star, Gem } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { CabinClass } from "../types"

interface CabinClassSelectorProps {
  selectedClass: CabinClass
  onClassChange: (cabinClass: CabinClass) => void
  compact?: boolean
}

export function CabinClassSelector({ selectedClass, onClassChange, compact = false }: CabinClassSelectorProps) {
  const cabinClasses = [
    {
      id: "economy" as CabinClass,
      label: "Economy",
      icon: <Plane className="w-4 h-4" />,
      description: "Standard seating",
      popular: true,
      priceMultiplier: 1,
      benefits: [
        "Standard seat with basic legroom",
        "Carry-on bag included",
        "In-flight entertainment",
        "Complimentary snacks and beverages",
      ],
    },
    {
      id: "premium-economy" as CabinClass,
      label: "Premium Economy",
      icon: <Star className="w-4 h-4" />,
      description: "Extra legroom & amenities",
      popular: false,
      priceMultiplier: 1.5,
      benefits: [
        "Extra legroom and wider seats",
        "Priority boarding",
        "Enhanced meal service",
        "Premium entertainment system",
        "Additional baggage allowance",
      ],
    },
    {
      id: "business" as CabinClass,
      label: "Business",
      icon: <Crown className="w-4 h-4" />,
      description: "Lie-flat seats & priority",
      popular: false,
      priceMultiplier: 3,
      benefits: [
        "Lie-flat seats with direct aisle access",
        "Airport lounge access",
        "Priority check-in and boarding",
        "Premium dining with chef-curated meals",
        "Dedicated flight attendant service",
        "Amenity kit and luxury bedding",
      ],
    },
    {
      id: "first" as CabinClass,
      label: "First Class",
      icon: <Gem className="w-4 h-4" />,
      description: "Ultimate luxury experience",
      popular: false,
      priceMultiplier: 5,
      benefits: [
        "Private suites with sliding doors",
        "Exclusive first-class lounge access",
        "Chauffeur service to/from airport",
        "Multi-course gourmet dining",
        "Personal concierge service",
        "Premium amenity kit and pajamas",
        "On-demand dining and bar service",
      ],
    },
  ]

  const selectedClassData = cabinClasses.find((c) => c.id === selectedClass)

  if (compact) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {cabinClasses.map((cabinClass) => (
          <Card
            key={cabinClass.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
              selectedClass === cabinClass.id
                ? "ring-2 ring-blue-500 border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onClassChange(cabinClass.id)}
          >
            <CardContent className="p-2 text-center">
              <div className="flex flex-col items-center space-y-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    selectedClass === cabinClass.id ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {cabinClass.icon}
                </div>
                <div className="text-xs font-medium text-gray-900">{cabinClass.label}</div>
                {selectedClass === cabinClass.id && (
                  <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
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
          {cabinClasses.map((cabinClass) => (
            <Card
              key={cabinClass.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
                selectedClass === cabinClass.id
                  ? "ring-2 ring-blue-500 border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => onClassChange(cabinClass.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  {cabinClass.popular && (
                    <div className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                      Popular
                    </div>
                  )}

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      selectedClass === cabinClass.id ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {cabinClass.icon}
                  </div>

                  <div className="flex-1">
                    <h6 className="text-sm font-medium text-gray-900">{cabinClass.label}</h6>
                    <p className="text-xs text-gray-500">{cabinClass.description}</p>
                  </div>

                  {selectedClass === cabinClass.id && (
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

      {/* Selected Class Benefits - Only show for selected class */}
      {selectedClassData && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
              {selectedClassData.icon}
            </div>
            <h6 className="font-medium text-blue-900">{selectedClassData.label} includes:</h6>
          </div>
          <div className="space-y-1">
            {selectedClassData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-blue-700">
                <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
