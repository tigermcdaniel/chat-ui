"use client"

import { useState } from "react"
import { Star, ChevronDown, ChevronUp, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface PriceTimelineProps {
  destination: string
  currentPrice: number
  typicalPrice: number
  minPrice: number
  maxPrice: number
  savings: number
}

export function PriceTimeline({
  destination,
  currentPrice,
  typicalPrice,
  minPrice,
  maxPrice,
  savings,
}: PriceTimelineProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Comprehensive price history data spanning 60 days
  const priceHistory = [
    { date: "60 days ago", price: 235, label: "60 days ago" },
    { date: "57 days ago", price: 230, label: "" },
    { date: "54 days ago", price: 228, label: "" },
    { date: "51 days ago", price: 225, label: "" },
    { date: "48 days ago", price: 220, label: "48 days ago" },
    { date: "45 days ago", price: 218, label: "" },
    { date: "42 days ago", price: 215, label: "" },
    { date: "39 days ago", price: 212, label: "" },
    { date: "36 days ago", price: 210, label: "" },
    { date: "34 days ago", price: 208, label: "34 days ago" },
    { date: "32 days ago", price: 205, label: "" },
    { date: "30 days ago", price: 210, label: "" },
    { date: "28 days ago", price: 215, label: "" },
    { date: "26 days ago", price: 212, label: "" },
    { date: "24 days ago", price: 208, label: "" },
    { date: "22 days ago", price: 195, label: "" },
    { date: "20 days ago", price: 185, label: "20 days ago" },
    { date: "18 days ago", price: 190, label: "" },
    { date: "16 days ago", price: 195, label: "" },
    { date: "14 days ago", price: 200, label: "" },
    { date: "12 days ago", price: 205, label: "" },
    { date: "10 days ago", price: 240, label: "" },
    { date: "8 days ago", price: 235, label: "" },
    { date: "6 days ago", price: 230, label: "6 days ago" },
    { date: "4 days ago", price: 225, label: "" },
    { date: "2 days ago", price: 220, label: "" },
    { date: "Today", price: currentPrice, label: "Today" },
  ]

  const maxHistoryPrice = Math.max(...priceHistory.map((p) => p.price))
  const minHistoryPrice = Math.min(...priceHistory.map((p) => p.price))
  const priceRange = maxHistoryPrice - minHistoryPrice

  // Calculate position for current price on slider
  const sliderRange = maxPrice - minPrice
  const currentPricePosition = ((currentPrice - minPrice) / sliderRange) * 100

  // Generate SVG path for the price line
  const generatePath = () => {
    const width = 100 // percentage
    const height = 100 // percentage

    const points = priceHistory.map((point, index) => {
      const x = (index / (priceHistory.length - 1)) * width
      const y = height - ((point.price - minHistoryPrice) / priceRange) * height
      return { x, y, price: point.price }
    })

    // Create smooth curve using SVG path
    let path = `M ${points[0].x} ${points[0].y}`

    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1]
      const currentPoint = points[i]

      // Add smooth curve between points
      const cpx1 = prevPoint.x + (currentPoint.x - prevPoint.x) * 0.5
      const cpy1 = prevPoint.y
      const cpx2 = prevPoint.x + (currentPoint.x - prevPoint.x) * 0.5
      const cpy2 = currentPoint.y

      path += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${currentPoint.x} ${currentPoint.y}`
    }

    return { path, points }
  }

  const { path, points } = generatePath()

  // Generate area fill path
  const generateAreaPath = () => {
    const firstPoint = points[0]
    const lastPoint = points[points.length - 1]
    return `${path} L ${lastPoint.x} 100 L ${firstPoint.x} 100 Z`
  }

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">
              The cheapest time to book is usually earlier, up to 6 months before takeoff
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>

        {/* Savings Info */}
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          <span>
            Prices during this time for similar trips to {destination} are ${savings} cheaper on average.
          </span>
          <Info className="w-4 h-4 text-gray-400" />
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-6 space-y-6">
            {/* Current Price Status */}
            <div>
              <h4 className="text-base font-medium text-gray-900 mb-3">Prices are currently typical for your search</h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>The least expensive flights for similar trips to {destination}</span>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-sm text-gray-600">
                  usually cost between ${minPrice}–{maxPrice}.
                </div>

                {/* Price Range Slider */}
                <div className="relative mt-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>${minPrice}</span>
                    <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                      ${currentPrice} is typical
                    </div>
                    <span>${maxPrice}</span>
                  </div>

                  {/* Slider Track */}
                  <div className="relative h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full">
                    {/* Current Price Indicator */}
                    <div
                      className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-md"
                      style={{ left: `${Math.max(2, Math.min(98, currentPricePosition))}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price History Chart */}
            <div>
              <h4 className="text-base font-medium text-gray-900 mb-4">Price history for this search</h4>

              <div className="relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 w-12 py-2">
                  <span>${Math.round(maxHistoryPrice)}</span>
                  <span>${Math.round((maxHistoryPrice + minHistoryPrice) / 2)}</span>
                  <span>${Math.round(minHistoryPrice)}</span>
                </div>

                {/* Chart area */}
                <div className="ml-14 relative h-40 bg-white rounded border border-gray-100">
                  {/* Grid lines */}
                  <div className="absolute inset-2">
                    <div className="absolute top-0 left-0 right-0 border-t border-gray-200"></div>
                    <div className="absolute top-1/2 left-0 right-0 border-t border-gray-200"></div>
                    <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200"></div>
                  </div>

                  {/* Price line chart */}
                  <svg className="absolute inset-2 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Fill area under line */}
                    <path d={generateAreaPath()} fill="rgba(59, 130, 246, 0.1)" stroke="none" />

                    {/* Price line */}
                    <path d={path} fill="none" stroke="#3B82F6" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />

                    {/* Data points */}
                    {points.map((point, index) => (
                      <circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r="0.8"
                        fill="#3B82F6"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))}
                  </svg>
                </div>

                {/* X-axis labels */}
                <div className="ml-14 mt-2 flex justify-between text-xs text-gray-500">
                  <span>60 days ago</span>
                  <span>48 days ago</span>
                  <span>34 days ago</span>
                  <span>20 days ago</span>
                  <span>6 days ago</span>
                  <span>Today</span>
                </div>
              </div>

              {/* Price insights */}
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="font-medium text-green-800">Lowest Price</div>
                  <div className="text-green-600">${minHistoryPrice} (22 days ago)</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="font-medium text-red-800">Highest Price</div>
                  <div className="text-red-600">${maxHistoryPrice} (10 days ago)</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
