import { ScrollArea } from '@/components/ui/scroll-area';

const suggestedLocations = [
  { id: 'nearby', icon: '✈️', name: 'Nearby', description: 'Within 10 km' },
  { id: 'north-goa', icon: '🏠', name: 'North Goa, Goa', description: 'About 30 km away' },
  { id: 'madikeri', icon: '🏠', name: 'Madikeri, Karnataka', description: 'Around 250 km away' },
  { id: 'bengaluru', icon: '🏠', name: 'Bengaluru, Karnataka', description: 'Approximately 350 km away' },
  { id: 'calangute', icon: '🏠', name: 'Calangute, Goa', description: 'About 35 km away' },
  { id: 'puducherry', icon: '🏠', name: 'Puducherry, Puducherry', description: 'Roughly 300 km away' },
  { id: 'south-goa', icon: '🏠', name: 'South Goa, Goa', description: 'Around 40 km away' },
  { id: 'ooty', icon: '🏞️', name: 'Ooty, Tamil Nadu', description: 'About 270 km away' },
  { id: 'mysuru', icon: '🏰', name: 'Mysuru, Karnataka', description: 'Around 150 km away' },
  { id: 'mumbai', icon: '🌆', name: 'Mumbai, Maharashtra', description: 'Approximately 600 km away' },
  { id: 'alappuzha', icon: '🚤', name: 'Alappuzha, Kerala', description: 'About 700 km away' },
  { id: 'chikmagalur', icon: '🌄', name: 'Chikmagalur, Karnataka', description: 'Around 250 km away' },
];

const LocationTab = () => {
  return (
    <div className="w-110 rounded-2xl bg-white py-4 shadow-2xl">
      <ScrollArea className="h-150 px-4">
        <h3 className="mb-2 text-sm font-semibold">Suggested locations</h3>
        <div className="space-y-3">
          {suggestedLocations.map(location => (
            <div
              key={location.id}
              className="flex cursor-pointer items-center space-x-3 rounded-md p-2 hover:bg-gray-100"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 text-xl">
                {location.icon}
              </div>
              <div>
                <p className="font-medium">{location.name}</p>
                <p className="text-sm text-gray-500">{location.description}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
export { LocationTab };
