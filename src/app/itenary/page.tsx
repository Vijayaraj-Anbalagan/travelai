'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import Navbar from '@/components/ui/NavBar';
import { FiClock, FiMapPin, FiTruck, FiCoffee, FiMap, FiCalendar, FiUsers, FiDollarSign, FiSun, FiActivity, FiHome, FiDownload } from 'react-icons/fi';
import { MultiStepLoader } from '@/components/ui/multi-step-loader';
import { format, formatDistanceToNow, parseISO, differenceInDays } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FaPlane as FiPlane } from 'react-icons/fa';
import FlightSearch from '@/components/FlightSearch';
import { motion } from 'framer-motion';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from 'recharts';

// CountdownTimer component for pre-trip countdown feature
interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({ 
    days: 0, hours: 0, minutes: 0, seconds: 0 
  });
  const [milestones, setMilestones] = useState<string[]>([]);
  
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const target = parseISO(targetDate);
      const diff = target.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining({ days, hours, minutes, seconds });
    };
    
    // Generate trip preparation milestones based on the trip date
    const generateMilestones = () => {
      const target = parseISO(targetDate);
      const daysRemaining = differenceInDays(target, new Date());
      const newMilestones: string[] = [];
      
      if (daysRemaining > 30) {
        newMilestones.push("Book accommodation if not already done");
      }
      
      if (daysRemaining > 14) {
        newMilestones.push("Check visa requirements");
      }
      
      if (daysRemaining > 7) {
        newMilestones.push("Plan your itinerary details");
      }
      
      if (daysRemaining > 3) {
        newMilestones.push("Begin packing");
      }
      
      if (daysRemaining > 1) {
        newMilestones.push("Check-in for flights");
      }
      
      setMilestones(newMilestones.slice(0, 2)); // Show only the two most relevant milestones
    };
    
    calculateTimeRemaining();
    generateMilestones();
    
    const timer = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">Trip begins in:</p>
      <div className="flex justify-between items-center mb-3">
        <div className="flex-1 text-center bg-orange-50 p-2 rounded-l-md">
          <div className="text-xl font-bold text-orange-600">{timeRemaining.days}</div>
          <div className="text-xs text-gray-500">Days</div>
        </div>
        <div className="flex-1 text-center bg-orange-50 p-2">
          <div className="text-xl font-bold text-orange-600">{timeRemaining.hours}</div>
          <div className="text-xs text-gray-500">Hours</div>
        </div>
        <div className="flex-1 text-center bg-orange-50 p-2 rounded-r-md">
          <div className="text-xl font-bold text-orange-600">{timeRemaining.minutes}</div>
          <div className="text-xs text-gray-500">Mins</div>
        </div>
      </div>
      
      {milestones.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-medium text-gray-700 mb-1">Preparation milestones:</p>
          <ul className="text-xs text-gray-600">
            {milestones.map((milestone, index) => (
              <li key={index} className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                {milestone}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// BudgetItem component for visualizing budget breakdowns
interface BudgetItemProps {
  category: string;
  percentage: string;
  color: string;
}

const BudgetItem: React.FC<BudgetItemProps> = ({ category, percentage, color }) => {
  // Extract the percentage value (e.g. from "25% of total budget" -> 25)
  const numericPercentage = parseInt(percentage.replace(/[^0-9]/g, ''), 10) || 0;
  
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{category}</span>
        <span className="text-sm font-bold">{percentage}</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${numericPercentage}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    </div>
  );
};

// Types
type Preferences = {
  overall_trip: string;
  activities: string[];
  amusement_parks: boolean;
  clubbing: boolean;
  physical_activities: boolean;
  sightseeing: boolean;
};

type UserPreferences = {
  name: string;
  age: number;
  no_of_days: number;
  starting_place: string;
  destination: string;
  from_date: string;
  to_date: string;
  food_preferences: string;
  preferences: Preferences;
  transportation: string;
  no_of_members: number;
  group_type: string;
  hotel_preferences: string;
  budget: number;
  spots: string[];
};

// Enhanced interfaces for the enriched itinerary response
interface DestinationOverview {
  name: string;
  local_language: string;
  currency: string;
  timezone: string;
  best_areas: string[];
  local_tips: string[];
}

interface BudgetBreakdown {
  accommodation: string;
  food: string;
  activities: string;
  transportation: string;
  miscellaneous: string;
}

interface EmergencyContacts {
  local_emergency: string;
  police: string;
  hospital: string;
  tourist_police?: string;
}

interface WeatherForecast {
  temperature_range: string;
  conditions: string;
  packing_tips: string[];
}

interface Weather {
  forecast: string;
  temperature: string;
}

interface Activity {
  'Activity Title': string;
  'Activity Description': string;
  'Activity Type'?: string;
  'Activity Duration'?: string;
  'Must See/Do'?: string;
  'Crowd Level'?: string;
  'Photos'?: string[];
}

interface Transport {
  Mode: string;
  'Local booking app': string;
  'Estimated Cost'?: string;
  'Travel Duration'?: string;
}

interface Food {
  hotel: string;
  menu: string;
  cost: string;
  dietary_options?: string;
}

interface Details {
  transport: Transport;
  food: Food;
  stay: string;
  local_tips?: string[];
}

interface Schedule {
  time: string;
  activity: Activity;
  details: Details;
}

interface Day {
  day: string;
  date: string;
  weather?: Weather;
  schedule: Schedule[];
}

interface Itinerary {
  destination_overview?: DestinationOverview;
  budget_breakdown?: BudgetBreakdown;
  emergency_contacts?: EmergencyContacts;
  weather_forecast?: WeatherForecast;
  itinerary: Day[];
  packing_list?: string[];
}

// Activity categories with icons
const ACTIVITY_CATEGORIES = [
  { name: "Adventure", activities: ['trekking', 'skiing', 'paragliding', 'rafting', 'rock climbing', 'camping'] },
  { name: "Relaxation", activities: ['swimming', 'spa', 'beach', 'meditation', 'yoga'] },
  { name: "Culture", activities: ['museum', 'theater', 'concert', 'historical sites', 'local festivals'] },
  { name: "Nature", activities: ['bird watching', 'wildlife safari', 'hiking', 'fishing', 'botanical gardens'] },
  { name: "Entertainment", activities: ['amusement park', 'pub', 'clubbing', 'shopping', 'cinema'] },
  { name: "Food & Drink", activities: ['restaurant', 'cafe', 'bar', 'food tour', 'cooking class'] },
];

const GROUP_TYPES = ["Solo", "Couple", "Family with Kids", "Friends", "Business", "Senior", "Other"];
const HOTEL_PREFERENCES = ["Budget", "Mid-range", "Luxury", "Boutique", "Resort", "Homestay"];
const TRANSPORTATION_OPTIONS = ["Public Transport", "Rental Car", "Taxi/Ride-sharing", "Walking/Biking", "Guided Tours"];

const Home: React.FC = () => {
  const [formStep, setFormStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    name: '',
    age: 22,
    no_of_days: 3,
    starting_place: '',
    destination: '',
    from_date: '',
    to_date: '',
    food_preferences: '',
    preferences: {
      overall_trip: 'balanced',
      activities: [],
      amusement_parks: false,
      clubbing: false,
      physical_activities: false,
      sightseeing: false,
    },
    transportation: 'Public Transport',
    no_of_members: 1,
    group_type: 'Solo',
    hotel_preferences: 'Mid-range',
    budget: 1000,
    spots: [],
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [result, setResult] = useState<Itinerary>({ itinerary: [] });
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [showFlightSearch, setShowFlightSearch] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  // Calculate dates when date range changes
  useEffect(() => {
    if (dateRange.from) {
      setUserPreferences(prev => ({
        ...prev,
        from_date: format(dateRange.from as Date, 'yyyy-MM-dd')
      }));
    }
    if (dateRange.to) {
      setUserPreferences(prev => ({
        ...prev,
        to_date: format(dateRange.to as Date, 'yyyy-MM-dd')
      }));
    }
    if (dateRange.from && dateRange.to) {
      const diffTime = Math.abs((dateRange.to as Date).getTime() - (dateRange.from as Date).getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setUserPreferences(prev => ({
        ...prev,
        no_of_days: diffDays
      }));
    }
  }, [dateRange]);

  const loadingStates = [
    { text: "Finding hidden gems in " + userPreferences.destination + " just for you..." },
    { text: "Searching for " + userPreferences.hotel_preferences + " accommodations that match your style..." },
    { text: userPreferences.food_preferences ? "Hunting for the best " + userPreferences.food_preferences + " options..." : "Discovering local culinary delights..." },
    { text: "Optimizing your itinerary to fit within ₹" + userPreferences.budget + " budget..." },
    { text: "Creating your personalized adventure packed with " + userPreferences.preferences.activities.join(", ") },
    { text: "Almost ready! Putting the final touches on your dream trip..." }
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    const checked = type === 'checkbox' ? (event.target as HTMLInputElement).checked : false;
    setUserPreferences((prev) => {
      if (type === 'checkbox') {
        if (name.startsWith('preferences.activities')) {
          const activity = (event.target as HTMLInputElement).value;
          const newActivities = checked
            ? [...prev.preferences.activities, activity]
            : prev.preferences.activities.filter((act) => act !== activity);
          return {
            ...prev,
            preferences: { ...prev.preferences, activities: newActivities }
          };
        } else {
          return {
            ...prev,
            preferences: { ...prev.preferences, [name.split('.')[1]]: checked }
          };
        }
      } else {
        return {
          ...prev,
          [name]: value
        };
      }
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setUserPreferences((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTripTypeChange = (value: string) => {
    setUserPreferences((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, overall_trip: value }
    }));
  };

  const handleBudgetChange = (value: number[]) => {
    setUserPreferences((prev) => ({
      ...prev,
      budget: value[0]
    }));
  };

  // Next and previous step functions
  const nextStep = () => {
    if (formStep < 4) {
      setFormStep(formStep + 1);
      setProgress((formStep + 1) * 25);
    }
  };

  const prevStep = () => {
    if (formStep > 0) {
      setFormStep(formStep - 1);
      setProgress(formStep * 25);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: userPreferences }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const textData = await response.text();
      const data = JSON.parse(textData);
      setResult(data);
    } catch (error) {
      console.error('Error generating itinerary:', error);
      // Add a toast notification here for error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && result.itinerary.length > 0) {
      document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [loading, result]);

  // Form steps content
  const renderFormStep = () => {
    switch (formStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FiUsers className="text-orange-500 text-xl" />
                <h3 className="text-lg font-semibold">About You</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    type="text" 
                    name="name" 
                    value={userPreferences.name} 
                    onChange={handleInputChange} 
                    placeholder="John Doe" 
                    className="focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Your Age</Label>
                  <Input 
                    type="number" 
                    name="age" 
                    value={userPreferences.age} 
                    onChange={handleInputChange} 
                    placeholder="30" 
                    className="focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FiUsers className="text-orange-500 text-xl" />
                <h3 className="text-lg font-semibold">Group Details</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="no_of_members">Number of Travelers</Label>
                  <Input 
                    type="number" 
                    name="no_of_members" 
                    value={userPreferences.no_of_members} 
                    onChange={handleInputChange} 
                    placeholder="1" 
                    min="1"
                    className="focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="group_type">Type of Group</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('group_type', value)}
                    value={userPreferences.group_type}
                  >
                    <SelectTrigger className="focus:ring-orange-500 focus:border-orange-500">
                      <SelectValue placeholder="Select group type" />
                    </SelectTrigger>
                    <SelectContent>
                      {GROUP_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FiMap className="text-orange-500 text-xl" />
                <h3 className="text-lg font-semibold">Destination Details</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="starting_place">Starting From</Label>
                  <Input 
                    type="text" 
                    name="starting_place" 
                    value={userPreferences.starting_place} 
                    onChange={handleInputChange} 
                    placeholder="New York" 
                    className="focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input 
                    type="text" 
                    name="destination" 
                    value={userPreferences.destination} 
                    onChange={handleInputChange} 
                    placeholder="Paris" 
                    className="focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FiCalendar className="text-orange-500 text-xl" />
                <h3 className="text-lg font-semibold">Travel Dates</h3>
              </div>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-gray-300 hover:bg-orange-50 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <FiCalendar className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                          </>
                        ) : (
                          format(dateRange.from, "MMM d, yyyy")
                        )
                      ) : (
                        <span>Select your travel dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={new Date()}
                      selected={dateRange}
                      onSelect={(range) => setDateRange(range as { from: Date | undefined; to: Date | undefined })}
                      numberOfMonths={2}
                      className="rounded-md border bg-white shadow-lg"
                    />
                  </PopoverContent>
                </Popover>
                {dateRange.from && dateRange.to && (
                  <p className="text-sm text-gray-500 mt-2">
                    Duration: {userPreferences.no_of_days} day{userPreferences.no_of_days !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FiTruck className="text-orange-500 text-xl" />
                <h3 className="text-lg font-semibold">Transportation</h3>
              </div>
              <div>
                <Label htmlFor="transportation">Preferred Transportation</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('transportation', value)}
                  value={userPreferences.transportation}
                >
                  <SelectTrigger className="focus:ring-orange-500 focus:border-orange-500">
                    <SelectValue placeholder="Select transportation" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRANSPORTATION_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FiSun className="text-orange-500 text-xl" />
                <h3 className="text-lg font-semibold">Trip Style</h3>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <RadioGroup 
                  value={userPreferences.preferences.overall_trip}
                  onValueChange={handleTripTypeChange}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-2 bg-white rounded-lg p-3 border border-gray-200 hover:border-orange-400 cursor-pointer transition-all">
                    <RadioGroupItem value="relaxed" id="trip-relaxed" className="text-orange-500" />
                    <Label htmlFor="trip-relaxed" className="cursor-pointer">Relaxed & Chill</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-white rounded-lg p-3 border border-gray-200 hover:border-orange-400 cursor-pointer transition-all">
                    <RadioGroupItem value="balanced" id="trip-balanced" className="text-orange-500" />
                    <Label htmlFor="trip-balanced" className="cursor-pointer">Balanced Mix</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-white rounded-lg p-3 border border-gray-200 hover:border-orange-400 cursor-pointer transition-all">
                    <RadioGroupItem value="active" id="trip-active" className="text-orange-500" />
                    <Label htmlFor="trip-active" className="cursor-pointer">Active & Packed</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FiActivity className="text-orange-500 text-xl" />
                <h3 className="text-lg font-semibold">Activities</h3>
              </div>
              <div>
                <Tabs 
                  defaultValue={ACTIVITY_CATEGORIES[0].name.toLowerCase()} 
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
                    {ACTIVITY_CATEGORIES.map((category) => (
                      <TabsTrigger 
                        key={category.name} 
                        value={category.name.toLowerCase()}
                        className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {ACTIVITY_CATEGORIES.map((category) => (
                    <TabsContent 
                      key={category.name} 
                      value={category.name.toLowerCase()}
                      className="mt-0"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-lg">
                        {category.activities.map(activity => (
                          <div 
                            key={activity}
                            className={`flex items-center space-x-2 bg-white p-3 rounded-md border transition-all ${
                              userPreferences.preferences.activities.includes(activity)
                                ? 'border-orange-400 shadow-sm'
                                : 'border-gray-200 hover:border-orange-300'
                            }`}
                          >
                            <Checkbox 
                              id={activity} 
                              name="preferences.activities" 
                              value={activity}
                              checked={userPreferences.preferences.activities.includes(activity)}
                              onCheckedChange={(checked) => {
                                const newActivities = checked 
                                  ? [...userPreferences.preferences.activities, activity]
                                  : userPreferences.preferences.activities.filter(a => a !== activity);
                                setUserPreferences(prev => ({
                                  ...prev,
                                  preferences: { ...prev.preferences, activities: newActivities }
                                }));
                              }}
                              className="text-orange-500 focus:ring-orange-500"
                            />
                            <Label htmlFor={activity} className="capitalize cursor-pointer">{activity}</Label>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FiHome className="text-orange-500 text-xl" />
                <h3 className="text-lg font-semibold">Accommodation</h3>
              </div>
              <div>
                <Label htmlFor="hotel_preferences">Hotel Preference</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('hotel_preferences', value)}
                  value={userPreferences.hotel_preferences}
                >
                  <SelectTrigger className="focus:ring-orange-500 focus:border-orange-500">
                    <SelectValue placeholder="Select hotel preference" />
                  </SelectTrigger>
                  <SelectContent>
                    {HOTEL_PREFERENCES.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FiCoffee className="text-orange-500 text-xl" />
                <h3 className="text-lg font-semibold">Food Preferences</h3>
              </div>
              <div>
                <Label htmlFor="food_preferences">Dietary Preferences & Cuisine Interests</Label>
                <Textarea
                  name="food_preferences"
                  value={userPreferences.food_preferences}
                  onChange={handleInputChange}
                  placeholder="Vegetarian, seafood lover, interested in trying local cuisine, allergic to nuts, etc."
                  className="min-h-24 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FiDollarSign className="text-orange-500 text-xl" />
                  <h3 className="text-lg font-semibold">Budget</h3>
                </div>
                <span className="font-medium text-orange-600">₹{userPreferences.budget}</span>
              </div>
              <div className="px-2">
                <Slider
                  value={[userPreferences.budget]}
                  min={1000}
                  max={100000}
                  step={1000}
                  onValueChange={handleBudgetChange}
                  className="cursor-pointer"
                />
                <div className="flex justify-between mt-1 text-sm text-gray-500">
                  <span>₹1000</span>
                  <span>₹100,000</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderItineraryResults = () => {
    if (result.itinerary.length === 0) return null;
    
    return (
      <div id="result-section" className="max-w-6xl mx-auto mt-16">
        {result.destination_overview && (
          <div className="mb-8">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <CardTitle className="text-2xl">Destination Overview: {result.destination_overview.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Essential Information</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Language</p>
                          <p className="font-medium">{result.destination_overview.local_language}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Currency</p>
                          <p className="font-medium">{result.destination_overview.currency}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Timezone</p>
                          <p className="font-medium">{result.destination_overview.timezone}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Best Areas to Explore</h3>
                      <div className="flex flex-wrap gap-2">
                        {result.destination_overview.best_areas.map((area, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Local Tips</h3>
                    <ul className="space-y-2">
                      {result.destination_overview.local_tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Weather Section */}
                {result.weather_forecast && (
                  <div className="border-t border-gray-200 mt-6 pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Weather During Your Visit</h3>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Temperature Range</p>
                          <p className="font-medium text-lg">{result.weather_forecast.temperature_range}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Conditions</p>
                          <p className="font-medium text-lg">{result.weather_forecast.conditions}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Packing Tips</p>
                          <ul className="list-disc list-inside text-sm">
                            {result.weather_forecast.packing_tips.slice(0, 2).map((tip, i) => (
                              <li key={i}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Emergency Info */}
                {result.emergency_contacts && (
                  <div className="mt-4 bg-red-50 p-3 rounded-lg border border-red-100">
                    <h4 className="text-sm font-medium text-red-800 mb-1">Emergency Information</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-red-700">Emergency: </span>
                        <span>{result.emergency_contacts.local_emergency}</span>
                      </div>
                      <div>
                        <span className="text-red-700">Police: </span>
                        <span>{result.emergency_contacts.police}</span>
                      </div>
                      <div>
                        <span className="text-red-700">Hospital: </span>
                        <span>{result.emergency_contacts.hospital}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Budget Breakdown Visualization */}
        {result.budget_breakdown && (
          <div className="mb-8">
            <Card>
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <CardTitle className="text-xl">Budget Breakdown</CardTitle>
                <CardDescription className="text-green-100">
                  Estimated allocation of your ₹{userPreferences.budget} budget
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0 md:mr-6 w-full md:w-1/2 lg:w-1/3">
                    <div className="h-56 w-56 mx-auto relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Accommodation', value: parseInt(result.budget_breakdown.accommodation) },
                              { name: 'Food & Drinks', value: parseInt(result.budget_breakdown.food) },
                              { name: 'Activities', value: parseInt(result.budget_breakdown.activities) },
                              { name: 'Transportation', value: parseInt(result.budget_breakdown.transportation) },
                              { name: 'Miscellaneous', value: parseInt(result.budget_breakdown.miscellaneous) },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell key="Accommodation" fill="#8884d8" />
                            <Cell key="Food & Drinks" fill="#82ca9d" />
                            <Cell key="Activities" fill="#ffc658" />
                            <Cell key="Transportation" fill="#ff8042" />
                            <Cell key="Miscellaneous" fill="#8dd1e1" />
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2 lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <BudgetItem 
                      category="Accommodation" 
                      percentage={result.budget_breakdown.accommodation} 
                      color="bg-blue-500" 
                    />
                    <BudgetItem 
                      category="Food & Drinks" 
                      percentage={result.budget_breakdown.food} 
                      color="bg-yellow-500" 
                    />
                    <BudgetItem 
                      category="Activities" 
                      percentage={result.budget_breakdown.activities} 
                      color="bg-green-500" 
                    />
                    <BudgetItem 
                      category="Transportation" 
                      percentage={result.budget_breakdown.transportation} 
                      color="bg-purple-500" 
                    />
                    <BudgetItem 
                      category="Miscellaneous" 
                      percentage={result.budget_breakdown.miscellaneous} 
                      color="bg-gray-500" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Packing List */}
        {result.packing_list && result.packing_list.length > 0 && (
          <div className="mb-8">
            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <CardTitle className="text-xl">Packing List</CardTitle>
                <CardDescription className="text-purple-100">
                  Essential items to pack for your trip
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {result.packing_list.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-white p-3 rounded-md border border-gray-200">
                      <Checkbox id={`pack-item-${index}`} />
                      <Label htmlFor={`pack-item-${index}`} className="cursor-pointer">{item}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Itinerary */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
          <div className="w-full md:w-64 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-orange-500 text-white p-4">
              <h3 className="font-bold text-lg">Trip Overview</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Destination</p>
                <p className="font-medium">{result.destination_overview?.name || userPreferences.destination}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Dates</p>
                <p className="font-medium">
                  {userPreferences.from_date} to {userPreferences.to_date}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{userPreferences.no_of_days} days</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Travelers</p>
                <p className="font-medium">{userPreferences.no_of_members} ({userPreferences.group_type})</p>
              </div>
              
              {/* Pre-trip Countdown */}
              {userPreferences.from_date && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <CountdownTimer targetDate={userPreferences.from_date} />
                </div>
              )}
              
              <div className="space-y-1 mt-4">
                <Button
                  onClick={() => setShowFlightSearch(true)}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center w-full"
                >
                  <FiPlane className="mr-2" />
                  Find Flights
                </Button>
              </div>
              
              <div className="space-y-1 mt-2">
                <Button
                  variant="outline"
                  className="flex items-center w-full border-green-500 text-green-600 hover:bg-green-50"
                >
                  <FiDownload className="mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <Card>
              <div className="border-b border-gray-200">
                <Tabs defaultValue="timeline" className="w-full">
                  <TabsList className="flex bg-gray-100 p-0">
                    <TabsTrigger value="timeline" className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:shadow-none">
                      Timeline View
                    </TabsTrigger>
                    <TabsTrigger value="day-by-day" className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:shadow-none">
                      Day-by-Day
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="timeline" className="p-0">
                    <div className="p-4">
                      <div className="mb-6 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-800">Trip Timeline</h3>
                        <div className="flex items-center gap-2">
                          {result.itinerary.map((day, index) => (
                            <div 
                              key={index}
                              className={`w-3 h-3 rounded-full cursor-pointer ${selectedDay === index ? 'bg-orange-500' : 'bg-gray-300'}`}
                              onClick={() => setSelectedDay(index)}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Visual Trip Timeline */}
                      <div className="relative">
                        <div className="absolute top-0 bottom-0 left-12 border-l-2 border-gray-200" />
                        
                        {result.itinerary[selectedDay] && result.itinerary[selectedDay].schedule.map((schedule, scheduleIndex) => (
                          <div key={scheduleIndex} className="relative mb-8">
                            <div className="flex">
                              <div className="flex-shrink-0 w-24 pt-1 text-right">
                                <div className="font-semibold text-blue-700">{schedule.time}</div>
                                {schedule.activity['Activity Duration'] && (
                                  <div className="text-xs text-gray-500">{schedule.activity['Activity Duration']}</div>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-center ml-4 mr-4 relative">
                                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 z-10">
                                  {scheduleIndex === 0 ? (
                                    <FiSun className="h-6 w-6" />
                                  ) : schedule.activity['Activity Type']?.toLowerCase().includes('food') ? (
                                    <FiCoffee className="h-6 w-6" />
                                  ) : schedule.activity['Activity Type']?.toLowerCase().includes('transport') ? (
                                    <FiTruck className="h-6 w-6" />
                                  ) : (
                                    <FiActivity className="h-6 w-6" />
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex-grow pt-1">
                                <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                                  <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-3">
                                    <h4 className="font-bold text-lg text-blue-900">
                                      {schedule.activity['Activity Title']}
                                      {schedule.activity['Crowd Level'] && (
                                        <span className={`ml-2 text-xs px-2 py-1 rounded-full ${schedule.activity['Crowd Level'] === 'High' ? 'bg-red-100 text-red-700' : schedule.activity['Crowd Level'] === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                          {schedule.activity['Crowd Level']} crowd
                                        </span>
                                      )}
                                    </h4>
                                    {schedule.activity['Activity Type'] && (
                                      <p className="text-sm text-gray-500">{schedule.activity['Activity Type']}</p>
                                    )}
                                  </div>
                                  
                                  <div className="p-4">
                                    <p className="text-gray-700">{schedule.activity['Activity Description']}</p>
                                    
                                    {/* Must See/Do Callout */}
                                    {schedule.activity['Must See/Do'] && (
                                      <div className="mt-3 bg-yellow-50 p-3 rounded-md border border-yellow-100">
                                        <p className="text-sm font-semibold text-yellow-800">✨ Dont Miss: {schedule.activity['Must See/Do']}</p>
                                      </div>
                                    )}
                                    
                                    {/* Photo Spots */}
                                    {schedule.activity['Photos'] && schedule.activity['Photos'].length > 0 && (
                                      <div className="mt-3">
                                        <p className="text-sm font-medium text-gray-700 mb-1">📸 Photo Opportunities:</p>
                                        <div className="flex flex-wrap gap-1">
                                          {schedule.activity['Photos'].map((photo, i) => (
                                            <span key={i} className="bg-blue-50 text-blue-700 rounded-full px-2 py-0.5 text-xs">
                                              {photo}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* Transport & Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                                      <div className="bg-gray-50 p-3 rounded-lg flex items-start space-x-2">
                                        <FiTruck className="text-orange-500 mt-1 flex-shrink-0" />
                                        <div className="text-sm">
                                          <p className="font-medium text-gray-700">Transport</p>
                                          <p className="text-gray-600">{schedule.details.transport.Mode}</p>
                                          {schedule.details.transport['Estimated Cost'] && (
                                            <p className="text-gray-500 text-xs mt-1">
                                              Cost: {schedule.details.transport['Estimated Cost']}
                                            </p>
                                          )}
                                          {schedule.details.transport['Travel Duration'] && (
                                            <p className="text-gray-500 text-xs">
                                              Duration: {schedule.details.transport['Travel Duration']}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      
                                      <div className="bg-gray-50 p-3 rounded-lg flex items-start space-x-2">
                                        <FiCoffee className="text-orange-500 mt-1 flex-shrink-0" />
                                        <div className="text-sm">
                                          <p className="font-medium text-gray-700">Food</p>
                                          <p className="text-gray-600">
                                            {schedule.details.food?.hotel ? 
                                              `${schedule.details.food.hotel} - ${schedule.details.food.menu || 'Local cuisine'}` : 
                                              'Local dining options available'
                                            }
                                          </p>
                                          {schedule.details.food?.cost && (
                                            <p className="text-gray-500 text-xs mt-1">
                                              Cost: {schedule.details.food.cost}
                                            </p>
                                          )}
                                          {schedule.details.food?.dietary_options && (
                                            <p className="text-gray-500 text-xs">
                                              Options: {schedule.details.food.dietary_options}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      
                                      <div className="bg-gray-50 p-3 rounded-lg flex items-start space-x-2">
                                        <FiMapPin className="text-orange-500 mt-1 flex-shrink-0" />
                                        <div className="text-sm">
                                          <p className="font-medium text-gray-700">Accommodation</p>
                                          <p className="text-gray-600">{schedule.details.stay}</p>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {/* Local Tips */}
                                    {schedule.details.local_tips && schedule.details.local_tips.length > 0 && (
                                      <div className="mt-4 bg-blue-50 p-3 rounded-md">
                                        <p className="text-sm font-medium text-blue-800 mb-1">Local Tips:</p>
                                        <ul className="text-sm text-blue-700 list-disc pl-4 space-y-1">
                                          {schedule.details.local_tips.map((tip, i) => (
                                            <li key={i}>{tip}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="day-by-day" className="p-0">
                    <div className="overflow-x-auto">
                      <div className="flex space-x-2 p-2 mb-2">
                        {result.itinerary.map((day, index) => (
                          <Button
                            key={index}
                            variant={selectedDay === index ? "default" : "outline"}
                            className={`min-w-24 ${selectedDay === index ? 'bg-orange-500 hover:bg-orange-600' : 'hover:bg-orange-50'}`}
                            onClick={() => setSelectedDay(index)}
                          >
                            {day.day}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {result.itinerary[selectedDay] && (
                      <div className="p-4">
                        <div className="mb-6 border-b border-gray-200 pb-2">
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-blue-800">
                              {result.itinerary[selectedDay].day} - {result.itinerary[selectedDay].date}
                            </h3>
                            
                            {result.itinerary[selectedDay].weather && (
                              <div className="flex items-center text-sm bg-blue-50 px-3 py-1 rounded-full">
                                <span className="font-medium mr-1">
                                  {result.itinerary[selectedDay].weather.temperature}
                                </span>
                                <span className="text-gray-600">
                                  {result.itinerary[selectedDay].weather.forecast}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          {result.itinerary[selectedDay].schedule.map((schedule, scheduleIndex) => (
                            <div key={scheduleIndex} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                              <div className="border-b border-gray-100 bg-gradient-to-r from-orange-50 to-white p-4 flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                  <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                    <FiClock />
                                  </div>
                                  <span className="text-lg font-semibold text-blue-700">{schedule.time}</span>
                                </div>
                                <span className="text-xl font-bold text-blue-900">{schedule.activity['Activity Title']}</span>
                              </div>
                              
                              <div className="p-4">
                                <p className="text-gray-800 mb-4 leading-relaxed">{schedule.activity['Activity Description']}</p>
                                
                                {schedule.activity['Must See/Do'] && (
                                  <div className="mb-4 bg-yellow-50 p-3 rounded-md border border-yellow-100">
                                    <p className="text-sm font-semibold text-yellow-800">✨ Dont Miss: {schedule.activity['Must See/Do']}</p>
                                  </div>
                                )}
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                  <div className="bg-gray-50 p-3 rounded-lg flex items-start space-x-3">
                                    <FiTruck className="text-orange-500 mt-1 flex-shrink-0" />
                                    <div>
                                      <p className="font-medium text-gray-700">Transport</p>
                                      <p className="text-gray-600 text-sm">{schedule.details.transport.Mode}</p>
                                      {schedule.details.transport['Local booking app'] && (
                                        <p className="text-gray-500 text-xs mt-1">
                                          Book via: {schedule.details.transport['Local booking app']}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="bg-gray-50 p-3 rounded-lg flex items-start space-x-3">
                                    <FiCoffee className="text-orange-500 mt-1 flex-shrink-0" />
                                    <div>
                                      <p className="font-medium text-gray-700">Food</p>
                                      <p className="text-gray-600 text-sm">{schedule.details.food.hotel} - {schedule.details.food.menu}</p>
                                      <p className="text-gray-500 text-xs mt-1">
                                      Approx: {schedule.details.food.cost}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="bg-gray-50 p-3 rounded-lg flex items-start space-x-3">
                                    <FiMapPin className="text-orange-500 mt-1 flex-shrink-0" />
                                    <div>
                                      <p className="font-medium text-gray-700">Stay</p>
                                      <p className="text-gray-600 text-sm">{schedule.details.stay}</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="mt-4 flex justify-end">
                                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                                    Add to Favorites
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-400 text-white py-16 px-8 mt-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Perfect Travel Itinerary</h1>
          <p className="text-xl opacity-90 mb-8">Personalized travel plans powered by AI. Just tell us what you love.</p>
          {result.itinerary.length === 0 && (
            <div className="flex items-center justify-center space-x-4">
              <Button 
                variant="outline" 
                className="bg-white text-orange-600 hover:bg-orange-50 border-none"
                onClick={() => setFormStep(0)}
              >
                Start Planning
              </Button>
              <Button 
                variant="outline" 
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                See Examples
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <div className="mt-8">
            <MultiStepLoader loadingStates={loadingStates} loading={loading} />
          </div>
        ) : result.itinerary.length > 0 ? (
          renderItineraryResults()
        ) : (
          <Card className="mb-8">
            <CardHeader className="border-b border-gray-100">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-gray-800">Create Your Trip</CardTitle>
                <div className="text-sm font-medium text-gray-500">
                  Step {formStep + 1} of 4
                </div>
              </div>
              <CardDescription>
                Tell us your preferences to generate your perfect travel itinerary
              </CardDescription>
              <Progress value={progress} className="mt-2 h-2 bg-gray-100" />
            </CardHeader>
            
            <CardContent className="pt-6">
              {renderFormStep()}
            </CardContent>
            
            <CardFooter className="border-t border-gray-100 pt-4 flex justify-between">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                disabled={formStep === 0}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Back
              </Button>
              {formStep < 3 ? (
                <Button 
                  onClick={nextStep}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Continue
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Generate Itinerary
                </Button>
              )}
            </CardFooter>
          </Card>
        )}
      </div>
      
      {/* Features Section */}
      {!loading && result.itinerary.length === 0 && (
        <div className="bg-white py-16 px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Our Trip Planner</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMap className="text-orange-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Plans</h3>
                <p className="text-gray-600">Tailored itineraries based on your preferences, budget, and travel style.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiClock className="text-orange-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                <p className="text-gray-600">Create detailed day-by-day plans in seconds, not hours of research.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMapPin className="text-orange-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hidden Gems</h3>
                <p className="text-gray-600">Discover local favorites and off-the-beaten-path attractions.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Travela</h3>
            <p className="text-gray-400">AI-powered travel planning that creates personalized itineraries just for you.</p>
          </div>
          <div>
            <h4 className="font-medium mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-orange-300">Home</a></li>
              <li><a href="#" className="hover:text-orange-300">How It Works</a></li>
              <li><a href="#" className="hover:text-orange-300">Destinations</a></li>
              <li><a href="#" className="hover:text-orange-300">Reviews</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-orange-300">Help Center</a></li>
              <li><a href="#" className="hover:text-orange-300">Contact Us</a></li>
              <li><a href="#" className="hover:text-orange-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-300">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Stay Connected</h4>
            <p className="text-gray-400 mb-4">Sign up for travel tips and exclusive offers</p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-700 border-gray-600 text-white focus:ring-orange-500 focus:border-orange-500 rounded-r-none"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto border-t border-gray-700 mt-8 pt-8 text-gray-400 text-sm text-center">
          <p>© 2025 Travela. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;