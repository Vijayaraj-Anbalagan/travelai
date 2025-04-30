import dynamic from 'next/dynamic';
import React from 'react';

// Define a loading component to show while the globe is loading
const GlobeLoadingPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="h-[600px] w-full bg-gray-100 animate-pulse rounded-full opacity-50" />
  </div>
);

// Dynamically import the Globe component
const DynamicGlobe = dynamic(
  () => import('./Globe'),
  {
    loading: () => <GlobeLoadingPlaceholder />,
    ssr: false, // Disable server-side rendering for this component
  }
);

// Export the dynamic globe component with the same props as the original Globe
export default function LazyGlobe(props: any) {
  return <DynamicGlobe {...props} />;
}