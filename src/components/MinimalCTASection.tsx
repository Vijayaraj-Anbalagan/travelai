import { Card, CardContent } from "./ui/card";

export const MinimalCTASection = () => (
    <div className="w-full max-w-4xl mx-auto px-4 py-20">
      <Card className="bg-white/60 backdrop-blur-sm border border-orange-500/20">
        <CardContent className="p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-700 mb-6">
            Join Us in Reimagining Travel
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of the journey as we transform the future of travel planning. 
            Sign up to get early access and shape the future of Travela.
          </p>
          <button className="px-8 py-3 bg-orange-500 text-white rounded-full font-semibold 
                            hover:bg-orange-600 transition-colors">
            Join the Waitlist
          </button>
        </CardContent>
      </Card>
    </div>
  );
  
  