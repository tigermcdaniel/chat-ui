import { Plane, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { UserLocation } from "@/types"

interface HeaderProps {
  userLocation: UserLocation
}

export function Header({ userLocation }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Plane className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">FlightGPT</h1>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="w-3 h-3" />
            <span>Currently in {userLocation.city}</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
            Online
          </Badge>
        </div>
      </div>
    </header>
  )
}
