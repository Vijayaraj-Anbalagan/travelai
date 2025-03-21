import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

type ItineraryRequest = {
  user: string;
  prompt: string;
};

export async function POST(request: NextRequest, response: NextApiResponse) {
  const data = await request.json();
  const apiKey = 'AIzaSyAIO77977F9aqKudDVzWhlW6zHsLf4VC0k';
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-pro-exp-02-05',
  });

  const prompt = `
  Create a personalized ${data.user.no_of_days}-days itinerary for ${data.user.no_of_days} starting from ${data.user.from_date} and to ${data.user.to_date}, a ${data.user.age}years old, ${data.user.food_preferences} couple traveling from ${data.user.starting_place} to ${data.user.destination} on a budget of ${data.user.budget}. The itinerary should focus on sightseeing and physical activities, including amusement parks and clubbing. Provide details such as daily_activities, timings, food, transport, and accommodation. Ensure to include local insights, and give the following in the bellow format. Provide the response as JSON only. Do not provide the notes in response"
  {
   "itinerary": [
     {
       "day": "day_number",
       "date": "YYYY-MM-DD",
       "schedule": [
         {
           "time": "HH:MM",
           "activity": {
             "Activity Title": "Title of the activity ",
             "Activity Description": "What the activity is and all the necessary details"
           },
           "details": {
             "transport": {
               "Mode": "Transport Mode by means of public or private transport",
               "Local booking app": "recommend if they are looking apart from other transport mode such like auto, cabs and so"
             },
             "food": {
               "hotel": "Here give me a real hotel name which is popular in that particular area according to their food preference",
               "menu": "Food Items which is the speciality of that particular hotel or restaurant like most seller , or best seller ",
               "cost": "Cost Range per person in inr"
             },
             "stay": "give me Hotel Name within the nearby location with amenities present there."
           }
         }
       ]
     }
   ]
  }`;

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
  };

  console.log('UserData', data);
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
        parts: [
          {
            text: 'Hii',
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  const textResponse = await result.response.text(); // Get the raw text
  console.log('Full API Response Text:', textResponse); // Log the full response

  return new NextResponse(textResponse, {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  });
}
