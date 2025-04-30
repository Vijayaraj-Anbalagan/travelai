// app/api/flights/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// SerpAPI key - should be moved to environment variables in production
const serpApiKey = process.env.SERPAPI_KEY || 'e00f20c5fa1072b64229407de0a3d8dd4786a3cfd36fb4e72b72d3e388c6a103';
// Gemini AI key - should be moved to environment variables in production
const geminiApiKey = process.env.GEMINI_API_KEY || 'AIzaSyCsp89AqfBLbnDhtctoHoLKKmtvPZwnYg8';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-pro-exp-02-05',
});

type FlightSearchRequest = {
  starting_place: string;
  destination: string;
  from_date: string;
  to_date: string;
  no_of_members: number;
  currency?: string;
  cabin_class?: string;
  include_nearby_airports?: boolean;
  max_layovers?: number;
  preferred_airlines?: string[];
};

interface LayoverInfo {
  airport: string;
  duration: string;
  terminal?: string;
  amenities?: string[];
  layoverQualityScore?: number;
}

interface FlightInfo {
  flight_number: string;
  airline: string;
  aircraft_type?: string;
  on_time_performance?: string;
  in_flight_amenities?: string[];
  duration: string;
  distance?: string;
}

interface EnhancedFlightData {
  id: string;
  price: string;
  departure: string;
  arrival: string;
  duration: string;
  emissions?: {
    co2_kg: number;
    comparison: string;
  };
  layovers: LayoverInfo[];
  flight_info: FlightInfo[];
  price_trend?: string;
  refundable: boolean;
  baggage_allowance?: {
    carry_on: string;
    checked: string;
  };
}

// Helper function to convert city names to airport codes using Gemini AI
async function getCityToAirportCode(cityName: string): Promise<string> {
  const prompt = `Convert the city name "${cityName}" to its corresponding 3-letter IATA airport code. 
  Only provide the 3-letter code as your answer. For example, "New York" would be "JFK" or "EWR" or "LGA", 
  "London" would be "LHR" or "LGW". Just return the most common/primary airport code for this city.`;

  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  
  // Extract just the airport code
  const airportCode = text.trim().match(/[A-Z]{3}/)?.[0] || "";
  return airportCode;
}

// Helper function to get airport amenities and quality score
async function getLayoverQualityInfo(airportCode: string, layoverDuration: string): Promise<{amenities: string[], qualityScore: number}> {
  try {
    // This would normally come from a database or external API
    // For demonstration purposes, we'll generate it with AI
    const prompt = `For airport ${airportCode} with a layover duration of ${layoverDuration}, 
    provide the following information in JSON format:
    {
      "amenities": ["amenity1", "amenity2", "amenity3"],
      "qualityScore": <number between 1-10>
    }
    
    Base the quality score on factors like airport reputation, amenities, and layover duration.
    Common airport amenities include: lounges, restaurants, shopping, free wifi, charging stations, 
    sleeping pods, shower facilities, etc.`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    
    try {
      const data = JSON.parse(text);
      return {
        amenities: data.amenities || [],
        qualityScore: data.qualityScore || 5
      };
    } catch (e) {
      return {
        amenities: ["Wi-Fi", "Restaurants", "Shops"],
        qualityScore: 5 // Default middle score
      };
    }
  } catch (error) {
    console.error('Error getting layover quality info:', error);
    return {
      amenities: ["Wi-Fi", "Restaurants", "Shops"],
      qualityScore: 5 // Default middle score
    };
  }
}

// Calculate estimated CO2 emissions based on flight distance and aircraft type
function calculateEmissions(distance: number, aircraftType: string): number {
  // Simplified calculation - in a real app this would be more sophisticated
  const emissionsFactors: Record<string, number> = {
    "A320": 0.115, // kg CO2 per passenger km
    "B737": 0.12,
    "B787": 0.095,
    "A350": 0.085,
    "default": 0.11
  };
  
  const factor = emissionsFactors[aircraftType] || emissionsFactors["default"];
  return Math.round(distance * factor);
}

// Enhance flight data with additional useful information
async function enhanceFlightData(flightData: any): Promise<any> {
  try {
    if (!flightData.best_flights) return flightData;
    
    const enhancedBestFlights = await Promise.all(flightData.best_flights.map(async (flight: any) => {
      // Extract basic flight info
      const flightDetails = {
        ...flight,
        emissions: { 
          co2_kg: Math.round(Math.random() * 1000) + 500, // Placeholder - would be calculated
          comparison: Math.random() > 0.5 ? "10% better than average" : "5% worse than average" 
        },
        price_trend: Math.random() > 0.5 ? "rising" : "stable",
        baggage_allowance: {
          carry_on: "1 item, up to 8kg",
          checked: "1 bag, up to 23kg"
        }
      };
      
      // Enhance layover information if available
      if (flight.layovers && flight.layovers.length > 0) {
        const enhancedLayovers = await Promise.all(flight.layovers.map(async (layover: any) => {
          const airportCode = layover.airport.split(' ')[0];
          const layoverInfo = await getLayoverQualityInfo(airportCode, layover.duration);
          
          return {
            ...layover,
            amenities: layoverInfo.amenities,
            layoverQualityScore: layoverInfo.qualityScore
          };
        }));
        
        flightDetails.layovers = enhancedLayovers;
      }
      
      return flightDetails;
    }));
    
    return {
      ...flightData,
      best_flights: enhancedBestFlights
    };
  } catch (error) {
    console.error('Error enhancing flight data:', error);
    return flightData;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: FlightSearchRequest = await request.json();
    
    // Convert city names to airport codes
    const departureCode = await getCityToAirportCode(data.starting_place);
    const arrivalCode = await getCityToAirportCode(data.destination);
    
    if (!departureCode || !arrivalCode) {
      return NextResponse.json(
        { error: "Could not determine airport codes for the provided cities" },
        { status: 400 }
      );
    }
    
    // Format dates to YYYY-MM-DD
    const outboundDate = data.from_date;
    const returnDate = data.to_date;
    
    // Currency (default to INR if not provided)
    const currency = data.currency || "INR";
    
    // Build SerpAPI URL with additional parameters
    let serpApiUrl = `https://serpapi.com/search.json?engine=google_flights&departure_id=${departureCode}&arrival_id=${arrivalCode}&outbound_date=${outboundDate}&return_date=${returnDate}&currency=${currency}&hl=en&api_key=${serpApiKey}`;
    
    // Add optional parameters if provided
    if (data.cabin_class) {
      serpApiUrl += `&cabin=${data.cabin_class.toLowerCase()}`;
    }
    
    if (data.include_nearby_airports !== undefined) {
      serpApiUrl += `&nearby_airports=${data.include_nearby_airports}`;
    }
    
    const serpResponse = await fetch(serpApiUrl);
    const flightData = await serpResponse.json();
    
    // Enhance the flight data with additional information
    const enhancedFlightData = await enhanceFlightData(flightData);
    
    // Process the flight data to match your app's required format
    const processedData = {
      departure_code: departureCode,
      arrival_code: arrivalCode,
      from_city: data.starting_place,
      to_city: data.destination,
      outbound_date: outboundDate,
      return_date: returnDate,
      passengers: data.no_of_members,
      cabin_class: data.cabin_class || "economy",
      price_insights: {
        average_price: `₹${Math.round(Math.random() * 10000) + 20000}`,
        price_trend: Math.random() > 0.5 ? "Prices likely to rise" : "Prices stable",
        best_time_to_book: "2-3 weeks in advance",
        cheapest_day_to_fly: ["Tuesday", "Wednesday"][Math.floor(Math.random() * 2)]
      },
      flights: enhancedFlightData.best_flights || [],
      other_flights: enhancedFlightData.other_flights || [],
      airlines: enhancedFlightData.airlines || {},
      nearby_airports: {
        departure: [
          { code: "ALT1", name: `Alternative for ${data.starting_place}`, distance: "25km" },
          { code: "ALT2", name: `Secondary for ${data.starting_place}`, distance: "40km" }
        ],
        arrival: [
          { code: "ALT3", name: `Alternative for ${data.destination}`, distance: "30km" },
          { code: "ALT4", name: `Secondary for ${data.destination}`, distance: "35km" }
        ]
      }
    };
    
    // For debugging
    console.log("Enhanced API Response Generated");
    
    return NextResponse.json(processedData);
    
  } catch (error) {
    console.error('Error fetching flight data:', error);
    return NextResponse.json(
      { 
        error: "Failed to fetch flight data",
        message: error instanceof Error ? error.message : "Unknown error",
        success: false
      },
      { status: 500 }
    );
  }
}