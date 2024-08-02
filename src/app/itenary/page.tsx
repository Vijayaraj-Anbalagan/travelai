'use client';
import React, { useState } from 'react';

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
    food_preferences: string;
    preferences: Preferences;
    transportation: string;
    no_of_members: number;
    group_type: string;
    hotel_preferences: string;
    budget: number;
    spots: string[];
};

export default function Home() {
    const [userPreferences, setUserPreferences] = useState<UserPreferences>({
        name: '',
        age: 0,
        no_of_days: 0,
        starting_place: '',
        destination: '',
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target as HTMLInputElement | HTMLSelectElement;
        const checked = type === 'checkbox' ? (event.target as HTMLInputElement).checked : false;
        setUserPreferences(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async () => {
        const response = await fetch('/api/generateItinerary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: userPreferences }),
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <div>
            <h1>Travel Itinerary Generator</h1>
            {/* Add form elements for all fields like below */}
            <input type="text" name="name" value={userPreferences.name} onChange={handleInputChange} placeholder="Name" />
            <input type="number" name="age" value={userPreferences.age} onChange={handleInputChange} placeholder="Age" />
            <input type="number" name="no_of_days" value={userPreferences.no_of_days} onChange={handleInputChange} placeholder="Number of days" />
            <input type="text" name="starting_place" value={userPreferences.starting_place} onChange={handleInputChange} placeholder="Starting place" />
            <input type="text" name="destination" value={userPreferences.destination} onChange={handleInputChange} placeholder="Destination" />
            <input type="text" name="food_preferences" value={userPreferences.food_preferences} onChange={handleInputChange} placeholder="Food preferences" />
            <input type="text" name="preferences.overall_trip" value={userPreferences.preferences.overall_trip} onChange={handleInputChange} placeholder="Overall trip" />
            <input type="text" name="transportation" value={userPreferences.transportation} onChange={handleInputChange} placeholder="Transportation" />
            <input type="number" name="no_of_members" value={userPreferences.no_of_members} onChange={handleInputChange} placeholder="Number of members" />
            <input type="text" name="group_type" value={userPreferences.group_type} onChange={handleInputChange} placeholder="Group type" />
            <input type="text" name="hotel_preferences" value={userPreferences.hotel_preferences} onChange={handleInputChange} placeholder="Hotel preferences" />
            <input type="number" name="budget" value={userPreferences.budget} onChange={handleInputChange} placeholder="Budget" />
            <input type="text" name="spots" value={userPreferences.spots} onChange={handleInputChange} placeholder="Spots" />
            <label>Activities</label>
            <input type="checkbox" name="preferences.amusement_parks" checked={userPreferences.preferences.amusement_parks} onChange={handleInputChange} />
            <input type="checkbox" name="preferences.clubbing" checked={userPreferences.preferences.clubbing} onChange={handleInputChange} />
            <input type="checkbox" name="preferences.physical_activities" checked={userPreferences.preferences.physical_activities} onChange={handleInputChange} />
            <input type="checkbox" name="preferences.sightseeing" checked={userPreferences.preferences.sightseeing} onChange={handleInputChange} />
            <label>Activities</label>
            <input type="checkbox" name="preferences.activities" value="swimming" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="trekking" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="skiing" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="paragliding" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="rafting" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="rock climbing" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="cycling" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="fishing" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="camping" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="bird watching" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="wildlife safari" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="shopping" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="museum" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="zoo" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="aquarium" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="theater" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="concert" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="pub" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="restaurant" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="cafe" onChange={handleInputChange} />
            <input type="checkbox" name="preferences.activities" value="bar" onChange={handleInputChange} />            
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
