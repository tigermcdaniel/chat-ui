import { Sun, Snowflake } from "lucide-react"
import type { TravelTime } from "@/types"

export const generateFlightTravelTimes = (destination: string): TravelTime[] => {
  const destinations: Record<string, TravelTime[]> = {
    tokyo: [
      {
        id: "1",
        month: "March",
        period: "Mar 15 - Mar 25",
        price: 680,
        priceChange: -15,
        weather: "Cherry Blossom Season",
        weatherIcon: <Sun className="w-4 h-4 text-pink-500" />,
        highlights: ["Cherry blossoms peak", "Perfect weather", "Spring festivals"],
        reason: "Peak cherry blossom season with ideal weather",
        bestFor: ["Photography", "Culture", "Romance"],
      },
      {
        id: "2",
        month: "January",
        period: "Jan 10 - Jan 20",
        price: 520,
        priceChange: -35,
        weather: "Cool & Clear",
        weatherIcon: <Snowflake className="w-4 h-4 text-blue-500" />,
        highlights: ["Lowest prices", "Clear skies", "Winter illuminations"],
        reason: "Best value with beautiful winter scenery",
        bestFor: ["Budget travel", "Winter sports", "Hot springs"],
      },
      {
        id: "3",
        month: "May",
        period: "May 5 - May 15",
        price: 720,
        priceChange: -8,
        weather: "Mild Spring",
        weatherIcon: <Sun className="w-4 h-4 text-green-500" />,
        highlights: ["Golden Week", "Perfect temperatures", "Green season"],
        reason: "Ideal weather after cherry blossom crowds",
        bestFor: ["Hiking", "Outdoor activities", "Sightseeing"],
      },
      {
        id: "4",
        month: "October",
        period: "Oct 20 - Oct 30",
        price: 650,
        priceChange: -20,
        weather: "Autumn Colors",
        weatherIcon: <Sun className="w-4 h-4 text-orange-500" />,
        highlights: ["Fall foliage", "Comfortable weather", "Harvest season"],
        reason: "Beautiful autumn colors and comfortable temperatures",
        bestFor: ["Nature", "Food tours", "Photography"],
      },
      {
        id: "5",
        month: "February",
        period: "Feb 1 - Feb 10",
        price: 480,
        priceChange: -40,
        weather: "Winter",
        weatherIcon: <Snowflake className="w-4 h-4 text-blue-400" />,
        highlights: ["Cheapest flights", "Plum blossoms", "Winter sports"],
        reason: "Lowest prices of the year with unique winter experiences",
        bestFor: ["Budget travel", "Skiing", "Hot springs"],
      },
    ],
    london: [
      {
        id: "1",
        month: "May",
        period: "May 10 - May 20",
        price: 450,
        priceChange: -25,
        weather: "Spring Bloom",
        weatherIcon: <Sun className="w-4 h-4 text-green-500" />,
        highlights: ["Perfect weather", "Blooming parks", "Longer days"],
        reason: "Ideal weather with blooming gardens and comfortable temperatures",
        bestFor: ["Sightseeing", "Parks", "Walking tours"],
      },
      {
        id: "2",
        month: "September",
        period: "Sep 5 - Sep 15",
        price: 420,
        priceChange: -30,
        weather: "Mild Autumn",
        weatherIcon: <Sun className="w-4 h-4 text-orange-500" />,
        highlights: ["Great weather", "Fewer crowds", "Cultural season"],
        reason: "Perfect weather with fewer tourists and cultural events",
        bestFor: ["Museums", "Theatre", "Culture"],
      },
      {
        id: "3",
        month: "March",
        period: "Mar 1 - Mar 10",
        price: 380,
        priceChange: -35,
        weather: "Early Spring",
        weatherIcon: <Sun className="w-4 h-4 text-yellow-500" />,
        highlights: ["Low prices", "Spring arrival", "Daffodil season"],
        reason: "Great value as spring begins with mild weather",
        bestFor: ["Budget travel", "Museums", "Indoor activities"],
      },
      {
        id: "4",
        month: "June",
        period: "Jun 15 - Jun 25",
        price: 520,
        priceChange: -10,
        weather: "Early Summer",
        weatherIcon: <Sun className="w-4 h-4 text-yellow-400" />,
        highlights: ["Long days", "Warm weather", "Festival season"],
        reason: "Longest days of the year with warm, pleasant weather",
        bestFor: ["Outdoor activities", "Festivals", "Evening strolls"],
      },
      {
        id: "5",
        month: "February",
        period: "Feb 10 - Feb 20",
        price: 320,
        priceChange: -45,
        weather: "Winter",
        weatherIcon: <Snowflake className="w-4 h-4 text-blue-500" />,
        highlights: ["Lowest prices", "Cozy pubs", "Winter sales"],
        reason: "Best deals of the year with cozy indoor experiences",
        bestFor: ["Budget travel", "Museums", "Shopping"],
      },
    ],
    paris: [
      {
        id: "1",
        month: "April",
        period: "Apr 15 - Apr 25",
        price: 520,
        priceChange: -20,
        weather: "Spring in Paris",
        weatherIcon: <Sun className="w-4 h-4 text-pink-500" />,
        highlights: ["Perfect weather", "Blooming trees", "Café season"],
        reason: "Classic spring in Paris with perfect weather for strolling",
        bestFor: ["Romance", "Cafés", "Photography"],
      },
      {
        id: "2",
        month: "October",
        period: "Oct 1 - Oct 10",
        price: 480,
        priceChange: -25,
        weather: "Golden Autumn",
        weatherIcon: <Sun className="w-4 h-4 text-orange-500" />,
        highlights: ["Beautiful colors", "Comfortable temps", "Harvest season"],
        reason: "Stunning autumn colors with comfortable walking weather",
        bestFor: ["Photography", "Wine tours", "Museums"],
      },
      {
        id: "3",
        month: "May",
        period: "May 20 - May 30",
        price: 580,
        priceChange: -15,
        weather: "Late Spring",
        weatherIcon: <Sun className="w-4 h-4 text-green-500" />,
        highlights: ["Warm days", "Long evenings", "Outdoor dining"],
        reason: "Perfect for outdoor dining and evening Seine walks",
        bestFor: ["Dining", "Romance", "River cruises"],
      },
      {
        id: "4",
        month: "September",
        period: "Sep 10 - Sep 20",
        price: 450,
        priceChange: -30,
        weather: "Early Autumn",
        weatherIcon: <Sun className="w-4 h-4 text-yellow-500" />,
        highlights: ["Great weather", "Fewer tourists", "Cultural events"],
        reason: "Excellent weather with fewer crowds and cultural season",
        bestFor: ["Culture", "Art", "Fashion"],
      },
      {
        id: "5",
        month: "March",
        period: "Mar 5 - Mar 15",
        price: 420,
        priceChange: -35,
        weather: "Early Spring",
        weatherIcon: <Sun className="w-4 h-4 text-blue-400" />,
        highlights: ["Good value", "Mild weather", "Fewer crowds"],
        reason: "Great value with pleasant weather and smaller crowds",
        bestFor: ["Budget travel", "Museums", "Shopping"],
      },
    ],
    "new york": [
      {
        id: "1",
        month: "October",
        period: "Oct 15 - Oct 25",
        price: 280,
        priceChange: -25,
        weather: "Fall Foliage",
        weatherIcon: <Sun className="w-4 h-4 text-orange-500" />,
        highlights: ["Perfect weather", "Central Park colors", "Comfortable temps"],
        reason: "Ideal weather with stunning fall colors in Central Park",
        bestFor: ["Sightseeing", "Photography", "Walking"],
      },
      {
        id: "2",
        month: "May",
        period: "May 1 - May 10",
        price: 320,
        priceChange: -15,
        weather: "Spring Bloom",
        weatherIcon: <Sun className="w-4 h-4 text-green-500" />,
        highlights: ["Mild weather", "Blooming parks", "Outdoor activities"],
        reason: "Beautiful spring weather perfect for exploring the city",
        bestFor: ["Parks", "Outdoor dining", "Broadway"],
      },
      {
        id: "3",
        month: "September",
        period: "Sep 5 - Sep 15",
        price: 300,
        priceChange: -20,
        weather: "Early Fall",
        weatherIcon: <Sun className="w-4 h-4 text-yellow-500" />,
        highlights: ["Great weather", "Fashion Week", "Cultural events"],
        reason: "Perfect weather with exciting cultural events",
        bestFor: ["Fashion", "Culture", "Dining"],
      },
      {
        id: "4",
        month: "April",
        period: "Apr 10 - Apr 20",
        price: 340,
        priceChange: -10,
        weather: "Spring",
        weatherIcon: <Sun className="w-4 h-4 text-pink-500" />,
        highlights: ["Cherry blossoms", "Mild temps", "Easter season"],
        reason: "Cherry blossoms in bloom with comfortable temperatures",
        bestFor: ["Photography", "Parks", "Museums"],
      },
      {
        id: "5",
        month: "February",
        period: "Feb 1 - Feb 10",
        price: 220,
        priceChange: -40,
        weather: "Winter",
        weatherIcon: <Snowflake className="w-4 h-4 text-blue-500" />,
        highlights: ["Lowest prices", "Winter activities", "Cozy indoor venues"],
        reason: "Best deals with unique winter NYC experiences",
        bestFor: ["Budget travel", "Museums", "Broadway"],
      },
    ],
    bali: [
      {
        id: "1",
        month: "May",
        period: "May 1 - May 15",
        price: 850,
        priceChange: -20,
        weather: "Dry Season Start",
        weatherIcon: <Sun className="w-4 h-4 text-yellow-500" />,
        highlights: ["Perfect weather", "Less crowded", "Great value"],
        reason: "Start of dry season with fewer crowds and great weather",
        bestFor: ["Beaches", "Temples", "Nature"],
      },
      {
        id: "2",
        month: "June",
        period: "Jun 10 - Jun 20",
        price: 920,
        priceChange: -10,
        weather: "Ideal Dry Season",
        weatherIcon: <Sun className="w-4 h-4 text-orange-500" />,
        highlights: ["Perfect conditions", "Sunny days", "Low humidity"],
        reason: "Peak dry season with ideal beach and temple weather",
        bestFor: ["Beaches", "Surfing", "Photography"],
      },
      {
        id: "3",
        month: "September",
        period: "Sep 1 - Sep 10",
        price: 780,
        priceChange: -25,
        weather: "Late Dry Season",
        weatherIcon: <Sun className="w-4 h-4 text-yellow-400" />,
        highlights: ["Great weather", "Good prices", "Fewer tourists"],
        reason: "Excellent weather with better prices as peak season ends",
        bestFor: ["Budget travel", "Relaxation", "Culture"],
      },
      {
        id: "4",
        month: "April",
        period: "Apr 15 - Apr 25",
        price: 720,
        priceChange: -30,
        weather: "Transition Season",
        weatherIcon: <Sun className="w-4 h-4 text-green-500" />,
        highlights: ["Good weather", "Lower prices", "Lush landscapes"],
        reason: "Transition to dry season with lush green landscapes",
        bestFor: ["Nature", "Photography", "Wellness"],
      },
      {
        id: "5",
        month: "July",
        period: "Jul 5 - Jul 15",
        price: 980,
        priceChange: 5,
        weather: "Peak Dry Season",
        weatherIcon: <Sun className="w-4 h-4 text-red-500" />,
        highlights: ["Perfect weather", "Peak season", "All activities available"],
        reason: "Peak season with guaranteed perfect weather",
        bestFor: ["All activities", "Guaranteed sun", "Peak experience"],
      },
    ],
  }

  return destinations[destination.toLowerCase()] || []
}
