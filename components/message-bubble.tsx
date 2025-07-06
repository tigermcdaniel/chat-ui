"use client"

import { Sparkles } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TransportationSelector } from "./transportation-selector"
import { FlightTripTypeSelector } from "@/features/flight/components/trip-type-selector"
import { TrainTripSelector } from "@/features/train/components/trip-type-selector"
import { FlightTravelTimeCard } from "@/features/flight/components/travel-time-card"
import { TrainTravelTimeCard } from "@/features/train/components/travel-time-card"
import type { Message, TripType, TransportationMode, UserLocation } from "@/types"
import type { PassengerCounts, CabinClass } from "@/features/flight/types"
import type { TrainPassengerCounts, TrainClass } from "@/features/train/types"
import type { DateInfo } from "@/features/flight/types"

interface MessageBubbleProps {
  message: Message
  onQuickAction: (action: string) => void
  onTripTypeSelect?: (
    tripType: TripType,
    destination: string,
    passengers: PassengerCounts,
    cabinClass: CabinClass,
    dateInfo?: DateInfo | null,
  ) => void
  onTrainTripSelect?: (
    tripType: TripType,
    destination: string,
    passengers: TrainPassengerCounts,
    trainClass: TrainClass,
  ) => void
  onTransportationSelect?: (mode: TransportationMode, destination: string) => void
  userLocation?: UserLocation
  currentTransportationMode?: TransportationMode | null
}

export function MessageBubble({
  message,
  onQuickAction,
  onTripTypeSelect,
  onTransportationSelect,
  userLocation,
  onTrainTripSelect,
  currentTransportationMode,
}: MessageBubbleProps) {
  const handleTripTypeSelect = (
    tripType: TripType,
    passengers: PassengerCounts,
    cabinClass: CabinClass,
    dateInfo?: DateInfo | null,
  ) => {
    if (onTripTypeSelect && message.destination) {
      onTripTypeSelect(tripType, message.destination, passengers, cabinClass, dateInfo)
    }
  }

  const handleTransportationSelect = (mode: TransportationMode) => {
    if (onTransportationSelect && message.destination) {
      onTransportationSelect(mode, message.destination)
    }
  }

  const handleTrainTripSelect = (tripType: TripType, passengers: TrainPassengerCounts, trainClass: TrainClass) => {
    if (onTrainTripSelect && message.destination) {
      onTrainTripSelect(tripType, message.destination, passengers, trainClass)
    }
  }

  return (
    <div className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
      {message.type === "assistant" && (
        <Avatar className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600">
          <AvatarFallback className="text-white text-sm">
            <Sparkles className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`max-w-3xl ${message.type === "user" ? "order-first" : ""}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            message.type === "user" ? "bg-blue-600 text-white ml-auto" : "bg-white border border-gray-200"
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>

        {/* Transportation Selector */}
        {message.transportationSelector && userLocation && message.destination && (
          <div className="mt-4">
            <TransportationSelector
              destination={message.destination}
              fromCity={userLocation.city}
              onTransportationSelect={handleTransportationSelect}
            />
          </div>
        )}

        {/* Train Trip Selector */}
        {message.trainTripSelector && userLocation && message.destination && (
          <div className="mt-4">
            <TrainTripSelector
              destination={message.destination}
              fromCity={userLocation.city}
              onTripTypeSelect={handleTrainTripSelect}
            />
          </div>
        )}

        {/* Flight Trip Type Selector */}
        {message.tripTypeSelector && userLocation && message.destination && (
          <div className="mt-4">
            <FlightTripTypeSelector
              destination={message.destination}
              fromCity={userLocation.city}
              onTripTypeSelect={handleTripTypeSelect}
            />
          </div>
        )}

        {/* Travel Times - Use appropriate component based on transportation mode */}
        {message.travelTimes && (
          <div className="mt-4 space-y-3">
            {message.travelTimes.map((time, index) =>
              message.transportationMode === "train" ? (
                <TrainTravelTimeCard key={time.id} time={time} index={index} />
              ) : (
                <FlightTravelTimeCard key={time.id} time={time} index={index} />
              ),
            )}
          </div>
        )}

        {/* Quick Actions */}
        {message.quickActions && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onQuickAction(action.action)}
                className="text-xs bg-gray-50 hover:bg-gray-100"
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}

        <div className="text-xs text-gray-400 mt-2">
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      {message.type === "user" && (
        <Avatar className="w-8 h-8 bg-gray-600">
          <AvatarFallback className="text-white text-sm">You</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
