import type { NextApiRequest, NextApiResponse } from 'next';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

type ItineraryRequest = {
  user: string;
  prompt: string;
};

export async function POST(request: NextRequest, response: NextApiResponse) {
  const data = await request.json();
  const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyAIO77977F9aqKudDVzWhlW6zHsLf4VC0k';
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-pro-exp-02-05',
  });

  // Enhanced prompt with more detailed requirements
  const prompt = `
  Create a personalized ${data.user.no_of_days}-days itinerary for ${data.user.no_of_days} starting from ${data.user.from_date} and to ${data.user.to_date}, a ${data.user.age}years old, ${data.user.food_preferences} ${data.user.group_type.toLowerCase()} traveling from ${data.user.starting_place} to ${data.user.destination} on a budget of ${data.user.budget}. 
  
  Trip style preferences: ${data.user.preferences.overall_trip}
  Selected activities: ${data.user.preferences.activities.join(', ')}
  Transportation preference: ${data.user.transportation}
  Accommodation preference: ${data.user.hotel_preferences}
  
  The itinerary should include:
  1. A balance of popular attractions and hidden local gems
  2. Appropriate activities considering the weather for those dates
  3. Local cultural insights and tips (language phrases, customs, etc.)
  4. Time-efficient routing between locations
  5. Realistic timing for activities considering travel time
  
  Provide details such as daily_activities, timings, food, transport, and accommodation. Ensure to include local insights.
  
  Format your response as valid JSON with the following structure. Make sure all strings are properly escaped and there are no trailing commas:
  
  {
   "destination_overview": {
     "name": "Full name of the destination",
     "local_language": "Primary language spoken",
     "currency": "Local currency name and code",
     "timezone": "Timezone information",
     "best_areas": ["Area 1", "Area 2"],
     "local_tips": ["Practical tip 1", "Practical tip 2", "Cultural tip"]
   },
   "budget_breakdown": {
     "accommodation": "X% of total budget",
     "food": "X% of total budget",
     "activities": "X% of total budget",
     "transportation": "X% of total budget",
     "miscellaneous": "X% of total budget"
   },
   "emergency_contacts": {
     "local_emergency": "Emergency number",
     "police": "Police number",
     "hospital": "Nearest hospital name and contact",
     "tourist_police": "Tourist police number if applicable"
   },
   "weather_forecast": {
     "temperature_range": "Expected temperature range during visit",
     "conditions": "Expected weather conditions",
     "packing_tips": ["Tip 1", "Tip 2", "Tip 3"]
   },
   "itinerary": [
     {
       "day": "Day 1",
       "date": "YYYY-MM-DD",
       "weather": {
         "forecast": "Brief weather forecast",
         "temperature": "Expected temperature range"
       },
       "schedule": [
         {
           "time": "HH:MM",
           "activity": {
             "Activity Title": "Title of the activity",
             "Activity Description": "What the activity is and all the necessary details",
             "Activity Type": "Cultural/Adventure/Relaxation/Food/Shopping/etc.",
             "Activity Duration": "How long this activity takes",
             "Must See/Do": "Highlight what not to miss during this activity",
             "Crowd Level": "Expected crowd level (Low/Medium/High)",
             "Photos": ["Type of great photo opportunity 1", "Type of great photo opportunity 2"]
           },
           "details": {
             "transport": {
               "Mode": "Transport Mode by means of public or private transport",
               "Local booking app": "recommend if they are looking apart from other transport mode such like auto, cabs and so",
               "Estimated Cost": "Cost in local currency",
               "Travel Duration": "Time to reach"
             },
             "food": {
               "hotel": "Here give me a real hotel name which is popular in that particular area according to their food preference",
               "menu": "Food Items which is the speciality of that particular hotel or restaurant like most seller, or best seller",
               "cost": "Cost Range per person in inr",
               "dietary_options": "Vegetarian/Vegan/Gluten-free availability"
             },
             "stay": "give me Hotel Name within the nearby location with amenities present there.",
             "local_tips": ["Useful tip 1", "Useful tip 2"]
           }
         }
       ]
     }
   ],
   "packing_list": ["Essential item 1", "Essential item 2", "Essential item 3", "Weather-appropriate item 1", "Location-specific item"]
  }
  
  Do not include any explanation or additional text outside the JSON. The output must be valid JSON that can be parsed with JSON.parse().`;

  const generationConfig = {
    temperature: 0.8,
    topP: 0.9,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
  };

  console.log('Processing user data for itinerary generation...');
  try {
    // First attempt with detailed JSON structure
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [
            {
              text: 'I need a valid JSON response for an itinerary. Please ensure the JSON is properly formatted with no syntax errors.',
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(prompt);
    const textResponse = await result.response.text(); 
    
    // Try to parse the JSON response
    try {
      // Clean up the response by removing any markdown code block markers
      let cleanedResponse = textResponse.replace(/```json\s*|\s*```/g, '');
      
      // Remove any text before or after the JSON object
      cleanedResponse = cleanedResponse.trim();
      if (cleanedResponse.indexOf('{') > 0) {
        cleanedResponse = cleanedResponse.substring(cleanedResponse.indexOf('{'));
      }
      if (cleanedResponse.lastIndexOf('}') < cleanedResponse.length - 1) {
        cleanedResponse = cleanedResponse.substring(0, cleanedResponse.lastIndexOf('}') + 1);
      }

      // Validate the JSON by parsing it
      const parsedResponse = JSON.parse(cleanedResponse);
      
      // If we get here, the JSON is valid
      return new NextResponse(JSON.stringify(parsedResponse), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      });
    } catch (parseError) {
      console.error('Error parsing AI response as JSON:', parseError);
      console.log('Failed response content:', textResponse.substring(0, 200) + '...');
      
      // Fall back to a simpler API call
      return fallbackItineraryRequest(data, model, generationConfig);
    }
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: "Failed to generate itinerary. Please try again later.",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
}

// Fallback function with a simpler prompt if the detailed one fails
async function fallbackItineraryRequest(data: { user: { no_of_days: any; starting_place: any; destination: any; from_date: any; }; }, model: GenerativeModel, generationConfig: { temperature: number; topP: number; topK: number; maxOutputTokens: number; responseMimeType: string; }) {
  console.log('Using fallback itinerary generation method...');
  try {
    const simplePrompt = `
    Create a very simple ${data.user.no_of_days}-day itinerary for traveling from ${data.user.starting_place} to ${data.user.destination}. 
    
    Format your response as VALID JSON with the following structure:
    
    {
      "itinerary": [
        {
          "day": "Day 1",
          "date": "${data.user.from_date}",
          "schedule": [
            {
              "time": "Morning",
              "activity": {
                "Activity Title": "Title of the activity",
                "Activity Description": "Brief description"
              },
              "details": {
                "transport": {
                  "Mode": "Transport mode",
                  "Local booking app": "App name"
                },
                "food": {
                  "hotel": "Restaurant name",
                  "menu": "Recommended food",
                  "cost": "Cost estimate"
                },
                "stay": "Hotel name"
              }
            },
            {
              "time": "Afternoon",
              "activity": {
                "Activity Title": "Another activity",
                "Activity Description": "Brief description"
              },
              "details": {
                "transport": {
                  "Mode": "Transport mode",
                  "Local booking app": "App name"
                },
                "food": {
                  "hotel": "Restaurant name",
                  "menu": "Recommended food",
                  "cost": "Cost estimate"
                },
                "stay": "Hotel name"
              }
            }
          ]
        }
      ]
    }
    
    Provide ONLY the JSON, no other text or explanation. Make sure it's valid JSON that can be parsed with JSON.parse().`;
    
    const chatSession = model.startChat({ 
      generationConfig: {
        ...generationConfig,
        temperature: 0.6, // Lower temperature for more predictable outputs
      } 
    });
    const result = await chatSession.sendMessage(simplePrompt);
    const textResponse = await result.response.text();
    
    try {
      // Clean up the response
      let cleanedResponse = textResponse.replace(/```json\s*|\s*```/g, '');
      cleanedResponse = cleanedResponse.trim();
      
      // Extract just the JSON part
      if (cleanedResponse.indexOf('{') > 0) {
        cleanedResponse = cleanedResponse.substring(cleanedResponse.indexOf('{'));
      }
      if (cleanedResponse.lastIndexOf('}') < cleanedResponse.length - 1) {
        cleanedResponse = cleanedResponse.substring(0, cleanedResponse.lastIndexOf('}') + 1);
      }

      // Manual fallback if all else fails - create a minimal valid response
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(cleanedResponse);
      } catch (e) {
        console.error('Even fallback response is not valid JSON, creating minimal structure');
        
        // Create a minimal valid itinerary structure
        parsedResponse = {
          itinerary: [
            {
              day: "Day 1",
              date: data.user.from_date,
              schedule: [
                {
                  time: "Morning",
                  activity: {
                    "Activity Title": `Explore ${data.user.destination}`,
                    "Activity Description": "Start your trip with a leisurely exploration of the main attractions."
                  },
                  details: {
                    transport: {
                      "Mode": "Walking",
                      "Local booking app": "N/A"
                    },
                    food: {
                      hotel: "Local café",
                      menu: "Local cuisine",
                      cost: "Budget-friendly"
                    },
                    stay: `Hotel in ${data.user.destination}`
                  }
                }
              ]
            }
          ]
        };
      }
      
      return new NextResponse(JSON.stringify(parsedResponse), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      });
    } catch (fallbackError) {
      console.error('Critical error in fallback itinerary generation:', fallbackError);
      
      // Absolute last resort - return an empty but valid structure
      const emptyResponse = {
        itinerary: [],
        error: "We're experiencing technical difficulties. Please try again later."
      };
      
      return new NextResponse(JSON.stringify(emptyResponse), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200, // Still returning 200 to avoid breaking the UI
      });
    }
  } catch (error) {
    console.error('Error in fallback itinerary generation:', error);
    
    const errorResponse = {
      itinerary: [],
      error: "We're experiencing technical difficulties. Please try again later."
    };
    
    return new NextResponse(JSON.stringify(errorResponse), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200, // Still returning 200 to avoid breaking the UI
    });
  }
}
