'use client';

import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/form/inputs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type SuggestedLocation = {
  id: string;
  icon: string;
  name: string;
  description: string;
};

const suggestedLocations: SuggestedLocation[] = [
  { id: 'nearby', icon: '✈️', name: 'Nearby', description: 'Within 10 km' },
  { id: 'north-goa', icon: '🏠', name: 'North Goa, Goa', description: 'About 30 km away' },
  { id: 'madikeri', icon: '🏠', name: 'Madikeri, Karnataka', description: 'Around 250 km away' },
  {
    id: 'bengaluru',
    icon: '🏠',
    name: 'Bengaluru, Karnataka',
    description: 'Approximately 350 km away',
  },
  { id: 'calangute', icon: '🏠', name: 'Calangute, Goa', description: 'About 35 km away' },
  { id: 'puducherry', icon: '🏠', name: 'Puducherry, Puducherry', description: 'Roughly 300 km away' },
  { id: 'south-goa', icon: '🏠', name: 'South Goa, Goa', description: 'Around 40 km away' },
  { id: 'ooty', icon: '🏞️', name: 'Ooty, Tamil Nadu', description: 'About 270 km away' },
  { id: 'mysuru', icon: '🏰', name: 'Mysuru, Karnataka', description: 'Around 150 km away' },
  { id: 'mumbai', icon: '🌆', name: 'Mumbai, Maharashtra', description: 'Approximately 600 km away' },
  { id: 'alappuzha', icon: '🚤', name: 'Alappuzha, Kerala', description: 'About 700 km away' },
  { id: 'chikmagalur', icon: '🌄', name: 'Chikmagalur, Karnataka', description: 'Around 250 km away' },
];

type Species = {
  id: string;
  icon: string;
  name: string;
};

const speciesList: Species[] = [
  { id: 'dog', icon: '🐶', name: 'Dog' },
  { id: 'cat', icon: '🐱', name: 'Cat' },
  { id: 'rabbit', icon: '🐰', name: 'Rabbit' },
  { id: 'other', icon: '🐾', name: 'Other' },
];

type TabKeys = 'where' | 'adoptionStart' | 'adoptionEnd' | 'species';

export function SearchTabs() {
  const [selectedTab, setSelectedTab] = useState<TabKeys>('where');

  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  });

  const handleSpeciesChange = (species: string, isChecked: boolean) => {
    setSelectedSpecies(prev => (isChecked ? [...prev, species] : prev.filter(s => s !== species)));
  };
  const tabContents = {
    where: (
      <motion.div
        key="where"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-110 rounded-2xl bg-white py-4 shadow-2xl"
      >
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
      </motion.div>
    ),
    adoptionStart: (
      <motion.div
        key="adoptionStart"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl bg-white p-8 shadow-2xl"
      >
        <div className=" ">
          <h3 className="mb-2 text-sm font-semibold">Select Adoption Date Range</h3>
          <Calendar
            mode="single"
            numberOfMonths={2}
            classNames={{ months: 'flex flex-col sm:flex-row gap-16' }}
            //eslint-disable-next-line
            //@ts-ignore
            onSelect={value => setDateRange({ ...dateRange, from: value })}
            initialFocus
            selected={dateRange.from}
          />
        </div>
      </motion.div>
    ),
    adoptionEnd: (
      <motion.div
        key="adoptionEnd"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl bg-white p-8 shadow-2xl"
      >
        <div className=" ">
          <h3 className="mb-2 text-sm font-semibold">Select Adoption Date Range</h3>
          <Calendar
            mode="single"
            numberOfMonths={2}
            classNames={{ months: 'flex flex-col sm:flex-row gap-16' }}
            //eslint-disable-next-line
            //@ts-ignore
            onSelect={value => setDateRange({ ...dateRange, to: value })}
            initialFocus
            selected={dateRange.to}
          />
        </div>
      </motion.div>
    ),
    species: (
      <motion.div
        key="species"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-110 rounded-2xl bg-white py-4 shadow-2xl"
      >
        <ScrollArea className="max-h-150 h-auto px-4">
          <h3 className="mb-2 text-sm font-semibold">Select Species</h3>
          <div className="space-y-3">
            {speciesList.map(s => (
              <div key={s.id} className="flex cursor-pointer items-center space-x-3 rounded-md p-2 hover:bg-gray-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 text-xl">
                  {s.icon}
                </div>
                <div className="flex-grow">
                  <label htmlFor={s.id} className="font-medium">
                    {s.name}
                  </label>
                </div>
                <Checkbox
                  id={s.id}
                  checked={selectedSpecies.includes(s.name)}
                  onCheckedChange={(isChecked: boolean) => handleSpeciesChange(s.name, isChecked)}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </motion.div>
    ),
  };

  return (
    <div className="mx-auto flex w-screen justify-center">
      <Tabs
        defaultValue="where"
        value={selectedTab}
        //eslint-disable-next-line
        //@ts-ignore
        onValueChange={setSelectedTab}
      >
        <TabsList className="w-215 flex h-20 justify-center rounded-full bg-gray-100">
          <TabsTrigger
            className="flex-1/2 flex w-full flex-col items-start justify-center rounded-full px-8"
            value="where"
          >
            Where
            <Input placeholder="Search locations..." className="ml-0 w-full" />
          </TabsTrigger>
          <TabsTrigger
            className="flex-1/4 flex flex-col items-start justify-center rounded-full px-8"
            value="adoptionStart"
          >
            Start Date
            <span className="text-gray-400">Select Start Date</span>
          </TabsTrigger>
          <TabsTrigger
            className="flex-1/4 flex flex-col items-start justify-center rounded-full px-8"
            value="adoptionEnd"
          >
            Start Date
            <span className="text-gray-400">Select End Date</span>
          </TabsTrigger>
          <TabsTrigger
            className="flex-1/2 relative flex flex-col items-start justify-center rounded-full px-8"
            value="species"
          >
            Species
            <span className="text-gray-400">Select Species</span>
            <div className="absolute right-0">
              <Button rounded>
                <Search className="h-4 w-4" />
                <span className="text-sm font-semibold">Search</span>
              </Button>
            </div>
          </TabsTrigger>
        </TabsList>

        <div className="absolute z-20 mt-20 min-h-[150px]">
          <AnimatePresence mode="wait">{tabContents[selectedTab]}</AnimatePresence>
        </div>
      </Tabs>
    </div>
  );
}
