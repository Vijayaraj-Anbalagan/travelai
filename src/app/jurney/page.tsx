'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from '@/components/ui/NavBar';
import { FiClock, FiMapPin, FiTruck, FiCoffee } from 'react-icons/fi';
import { MultiStepLoader } from '@/components/ui/multi-step-loader';

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

interface Itinerary {
  itinerary: Day[];
}

interface Day {
  day: string;
  date: string;
  schedule: Schedule[];
}

interface Schedule {
  time: string;
  activity: Activity;
  details: Details;
}

interface Activity {
  'Activity Title': string;
  'Activity Description': string;
}

interface Details {
  transport: Transport;
  food: Food;
  stay: string;
}

interface Transport {
  Mode: string;
  'Local booking app': string;
}

interface Food {
  hotel: string;
  menu: string;
  cost: string;
}

const Home: React.FC = () => {
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    name: '',
    age: 0,
    no_of_days: 0,
    starting_place: '',
    destination: '',
    from_date: '',
    to_date: '',
    food_preferences: '',
    preferences: {
      overall_trip: '',
      activities: [],
      amusement_parks: false,
      clubbing: false,
      physical_activities: false,
      sightseeing: false,
    },
    transportation: '',
    no_of_members: 0,
    group_type: '',
    hotel_preferences: '',
    budget: 0,
    spots: [],
  });

  const [result, setResult] = useState<Itinerary>({ itinerary: [] });
  const [loading, setLoading] = useState(false);

  const loadingStates = [
    { text: "Surfing over the Local for spots that tickle your interests!" },
    { text: "Peeking through hotel windows (not literally!) to find you the perfect room..." },
    { text: "Sniffing out the tastiest treats in town... Hope your hungry!" },
    { text: "Wrapping up on Your Budget , so your wallet doesn't have to!" },
    { text: "Putting all the pieces together to create your dream adventure." },
    { text: "Hold tight, wer nearly there!" }
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

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setLoading(true);
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
    setLoading(false);
    document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!loading && result.itinerary.length > 0) {
      document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [loading, result]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Navbar />
      <h1 className="text-3xl font-bold text-center text-orange-500 mt-10 mb-5">Travel Itinerary Generator</h1>
      {loading ? (
        <MultiStepLoader loadingStates={loadingStates} loading={loading} />
      ) : (
        <Card className="max-w-4xl mx-auto">
         <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>User Preferences</CardTitle>
          <CardDescription>Fill out the form to generate your travel itinerary</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input type="text" name="name" value={userPreferences.name} onChange={handleInputChange} placeholder="Name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input type="number" name="age" value={userPreferences.age} onChange={handleInputChange} placeholder="Age" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="no_of_days">Number of days</Label>
              <Input type="number" name="no_of_days" value={userPreferences.no_of_days} onChange={handleInputChange} placeholder="Number of days" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="starting_place">Starting place</Label>
              <Input type="text" name="starting_place" value={userPreferences.starting_place} onChange={handleInputChange} placeholder="Starting place" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input type="text" name="destination" value={userPreferences.destination} onChange={handleInputChange} placeholder="Destination" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from_date">From Date</Label>
              <Input type="date" name="from_date" value={userPreferences.from_date} onChange={handleInputChange} placeholder="From Date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to_date">To Date</Label>
              <Input type="date" name="to_date" value={userPreferences.to_date} onChange={handleInputChange} placeholder="To Date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="food_preferences">Food preferences</Label>
              <Input type="text" name="food_preferences" value={userPreferences.food_preferences} onChange={handleInputChange} placeholder="Food preferences" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transportation">Transportation</Label>
              <Input type="text" name="transportation" value={userPreferences.transportation} onChange={handleInputChange} placeholder="Transportation" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="no_of_members">Number of members</Label>
              <Input type="number" name="no_of_members" value={userPreferences.no_of_members} onChange={handleInputChange} placeholder="Number of members" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group_type">Group type</Label>
              <Input type="text" name="group_type" value={userPreferences.group_type} onChange={handleInputChange} placeholder="Group type" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hotel_preferences">Hotel preferences</Label>
              <Input type="text" name="hotel_preferences" value={userPreferences.hotel_preferences} onChange={handleInputChange} placeholder="Hotel preferences" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input type="number" name="budget" value={userPreferences.budget} onChange={handleInputChange} placeholder="Budget" />
            </div>
          </div>
          <div className="space-y-4">
            <Label>Activities</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {[
                'swimming', 'trekking', 'skiing', 'paragliding', 'rafting', 'rock climbing', 'cycling', 'fishing', 'camping', 'bird watching',
                'wildlife safari', 'shopping', 'museum', 'zoo', 'aquarium', 'theater', 'concert', 'pub', 'restaurant', 'cafe', 'bar','amusement park'
              ].map(activity => (
                <div key={activity} className="flex items-center space-x-2 capitalize">
                  <Checkbox id={activity} name="preferences.activities" value={activity} />
                  <Label htmlFor={activity}>{activity}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmit} className='bg-orange-500 hover:bg-orange-600'>
            Submit
          </Button>
        </CardFooter>
      </Card>

      <div id="result-section" className="p-4 mt-10">
        {result.itinerary.map((day, dayIndex) => (
          <Card key={dayIndex} className="mb-10">
            <CardHeader>
              <CardTitle className="text-blue-800 text-3xl">{day.day} - {day.date}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {day.schedule.map((schedule, scheduleIndex) => (
                <div key={scheduleIndex} className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <FiClock className="text-orange-500" />
                      <span className="text-lg font-semibold text-blue-700">{schedule.time}</span>
                    </div>
                    <span className="text-xl font-bold text-blue-900">{schedule.activity['Activity Title']}</span>
                  </div>
                  <p className="text-gray-800 mb-4">{schedule.activity['Activity Description']}</p>
                  <div className="flex items-center space-x-4">
                    <FiTruck className="text-orange-500" />
                    <div className="text-gray-700">
                      <strong>Transport:</strong> {schedule.details.transport.Mode}
                      {schedule.details.transport['Local booking app'] && <span> (Booking App: {schedule.details.transport['Local booking app']})</span>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FiCoffee className="text-orange-500" />
                    <div className="text-gray-700 gap-2">
                      <strong>Food: </strong> {schedule.details.food.hotel} - {schedule.details.food.menu}
                      <strong> Cost:</strong> {schedule.details.food.cost}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FiMapPin className="text-orange-500" />
                    <div className="text-gray-700">
                      <strong>Stay:</strong> {schedule.details.stay}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
        </Card>
      )}
    </div>
  );
};

export default Home;
