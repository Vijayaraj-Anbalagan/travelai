// components/FlightSearch.tsx
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { format } from 'date-fns';
import { FiCalendar, FiClock, FiArrowRight, FiUsers } from 'react-icons/fi';
import { FaPlane } from 'react-icons/fa';
import { MultiStepLoader } from '@/components/ui/multi-step-loader';

// Update interfaces to match the API response
interface Airline {
  name: string;
  logo: string;
}

interface Airport {
  name: string;
  id: string;
  time?: string;
}

interface Flight {
  departure_airport: Airport;
  arrival_airport: Airport;
  duration: number;
  airline: string;
  airline_logo?: string;
  travel_class?: string;
  flight_number?: string;
  price?: number;
  booking_token?: string;
  overnight?: boolean;
  type?: string;
}

interface Layover {
  duration: number;
  name: string;
  id: string;
  overnight?: boolean;
}

interface FlightResult {
  flights: Flight[];
  layovers?: Layover[];
  total_duration: number;
  price: number;
  type?: string;
  booking_token?: string;
  airline_logo?: string;
}

interface FlightSearchProps {
  userPreferences: {
    starting_place: string;
    destination: string;
    from_date: string;
    to_date: string;
    no_of_members: number;
  };
  onClose?: () => void;
}

const FlightSearch: React.FC<FlightSearchProps> = ({ userPreferences, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [flightResults, setFlightResults] = useState<{
    departure_code: string;
    arrival_code: string;
    from_city: string;
    to_city: string;
    flights: FlightResult[];
    other_flights: FlightResult[];
    airlines: Record<string, Airline>;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadingStates = [
    { text: `Finding flights from ${userPreferences.starting_place} to ${userPreferences.destination}...` },
    { text: "Scanning airlines for the best deals..." },
    { text: "Checking for direct and connecting flights..." },
    { text: "Comparing prices across different carriers..." },
    { text: "Finalizing your flight options..." }
  ];

  const searchFlights = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userPreferences),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch flight data');
      }
      
      const data = await response.json();
      setFlightResults(data);
    } catch (err) {
      console.error('Error searching flights:', err);
      setError('An error occurred while searching for flights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  const formatDuration = (minutes: number) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader className="border-b border-gray-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl text-gray-800">Flight Search</CardTitle>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500">
              Close
            </Button>
          )}
        </div>
        <CardDescription>
          Find the best flights for your trip from {userPreferences.starting_place} to {userPreferences.destination}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {!loading && !flightResults && !error && (
          <div className="text-center py-6">
            <div className="flex justify-center mb-4">
              <FaPlane className="text-6xl text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ready to Find Your Flight?</h3>
            <p className="text-gray-600 mb-6">Click below to search for flights matching your travel dates and preferences.</p>
            <Button 
              onClick={searchFlights}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Search Flights
            </Button>
          </div>
        )}
        
        {loading && (
          <div className="py-6">
            <MultiStepLoader loadingStates={loadingStates} loading={loading} />
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg my-4">
            <p>{error}</p>
            <Button 
              onClick={searchFlights}
              className="mt-4 bg-orange-500 hover:bg-orange-600"
              size="sm"
            >
              Try Again
            </Button>
          </div>
        )}
        
        {flightResults && (
          <div className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-lg flex justify-between items-center">
              <div className="flex items-center">
                <div className="text-xl font-semibold text-orange-800">
                  {flightResults.from_city} ({flightResults.departure_code})
                </div>
                <FiArrowRight className="mx-4 text-orange-500" />
                <div className="text-xl font-semibold text-orange-800">
                  {flightResults.to_city} ({flightResults.arrival_code})
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <span className="mr-4">
                  <FiCalendar className="inline mr-1" /> 
                  {format(new Date(userPreferences.from_date), 'MMM d, yyyy')}
                </span>
                <span>
                  <FiUsers className="inline mr-1" /> 
                  {userPreferences.no_of_members} {userPreferences.no_of_members === 1 ? 'Passenger' : 'Passengers'}
                </span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Best Flights</h3>
            
            {flightResults.flights && flightResults.flights.length > 0 ? (
              <div className="space-y-4">
                {flightResults.flights.map((flightResult, index) => {
                  // Get the first flight in this result for departure/arrival info
                  const firstFlight = flightResult.flights[0];
                  const lastFlight = flightResult.flights[flightResult.flights.length - 1];
                  
                  return (
                    <div 
                      key={index} 
                      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <div className="flex items-center space-x-3 mb-2 md:mb-0">
                          {flightResult.airline_logo ? (
                            <img 
                              src={flightResult.airline_logo} 
                              alt={firstFlight.airline || "Airline"}
                              className="h-8 w-8 object-contain mr-2"
                            />
                          ) : (
                            <FaPlane className="h-6 w-6 text-orange-500 mr-2" />
                          )}
                          <span className="text-gray-700 font-medium">
                            {firstFlight.airline || "Multiple airlines"}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-gray-600">
                            <FiClock className="text-orange-500" />
                            <span>{formatDuration(flightResult.total_duration)}</span>
                          </div>
                          <div className="text-lg font-bold text-orange-600">
                          ₹{flightResult.price}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-xl font-bold">{formatTime(firstFlight.departure_airport.time || '')}</div>
                              <div className="text-gray-600">{firstFlight.departure_airport.id}</div>
                            </div>
                            <div className="hidden md:block flex-1 px-4">
                              <div className="relative">
                                <div className="border-t-2 border-gray-300 border-dashed mx-4"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                  <FaPlane className="text-orange-500" />
                                </div>
                              </div>
                              <div className="text-center text-sm text-gray-500 mt-1">
                                {flightResult.type || (flightResult.flights.length > 1 ? 'Connection' : 'Direct')}
                              </div>
                            </div>
                            <div>
                              <div className="text-xl font-bold">{formatTime(lastFlight.arrival_airport.time || '')}</div>
                              <div className="text-gray-600">{lastFlight.arrival_airport.id}</div>
                            </div>
                          </div>
                          
                          {flightResult.layovers && flightResult.layovers.length > 0 && (
                            <div className="mt-2 text-sm text-gray-500">
                              <span className="font-medium">Layovers:</span>
                              {flightResult.layovers.map((layover, i) => (
                                <span key={i} className="ml-2">
                                  {layover.id} ({formatDuration(layover.duration)})
                                  {i < flightResult.layovers!.length - 1 ? ', ' : ''}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 md:mt-0">
                          <Button 
                            className="bg-orange-500 hover:bg-orange-600"
                            onClick={() => flightResult.booking_token && window.open(`https://www.google.com/flights?q=${flightResult.booking_token}`, '_blank')}
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No flights found for this route and dates.</p>
              </div>
            )}
            
            {flightResults.other_flights && flightResults.other_flights.length > 0 && (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-3">Other Options</h3>
                <div className="space-y-4">
                  {flightResults.other_flights.slice(0, 3).map((flightResult, index) => {
                    // Get the first flight in this result
                    const firstFlight = flightResult.flights[0];
                    
                    return (
                      <div 
                        key={index} 
                        className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-700">
                            {firstFlight.airline || "Multiple airlines"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-gray-600">{formatDuration(flightResult.total_duration)}</div>
                          <div className="text-orange-600 font-semibold">${flightResult.price}</div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-orange-300 text-orange-600 hover:bg-orange-50"
                            onClick={() => flightResult.booking_token && window.open(`https://www.google.com/flights?q=${flightResult.booking_token}`, '_blank')}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t border-gray-100 pt-4 flex justify-between">
        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50" onClick={onClose}>
          Back to Itinerary
        </Button>
        {flightResults && (
          <Button 
            onClick={searchFlights}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Refresh Results
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FlightSearch;