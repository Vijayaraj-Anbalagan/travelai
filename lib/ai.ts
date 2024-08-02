// // pages/api/generateItinerary.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { GoogleGenerativeAI } from '@google/generative-ai';



// type ItineraryRequest = {
//     user: string;
//     prompt: string;
// };

// type ItineraryResponse = {
//     itinerary: any[];
// };

// export default function handler(req: NextApiRequest, res: NextApiResponse<ItineraryResponse>) {
   
//     if (req.method === 'POST') {
//         const apiKey = process.env.GEMINI_API_KEY as string;
//         const genAI = new GoogleGenerativeAI(apiKey);
    
//         const model = genAI.getGenerativeModel({
//           model: 'gemini-1.5-flash',
//         });
    
//         const generationConfig = {
//           temperature: 1,
//           topP: 0.95,
//           topK: 64,
//           maxOutputTokens: 8192,
//           responseMimeType: 'text/plain',
//         };
    
//         const { user, prompt }: ItineraryRequest = req.body;
    
//         const chatSession = model.startChat({
//           generationConfig,
//           history: [
//             {
//               role: 'user',
//               parts: [{ text: JSON.stringify({ user, prompt }) }],
//             },
//           ],
//         });
    
    
        