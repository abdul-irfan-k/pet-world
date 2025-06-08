'use client';

import { useRef, useState } from 'react';

import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
import { Search } from 'lucide-react';

import { AdoptionEndTab, AdoptionStartTab, LocationTab, SpeciesTab } from './tabs';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/form/inputs';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type TabKeys = 'where' | 'adoptionStart' | 'adoptionEnd' | 'species' | undefined;

const HeaderSearch = () => {
  const [selectedTab, setSelectedTab] = useState<TabKeys>(undefined);

  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  });

  const handleSpeciesChange = (species: string, isChecked: boolean) => {
    setSelectedSpecies(prev => (isChecked ? [...prev, species] : prev.filter(s => s !== species)));
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const rawWidth = useTransform(scrollYProgress, [0, 0.08], [860, 200]);
  const rawHeight = useTransform(scrollYProgress, [0, 0.08], [80, 40]);
  const rawTranslateY = useTransform(scrollYProgress, [0, 0.08], [100, 0]);

  const springOptions = { stiffness: 120, damping: 18 };

  const width = useSpring(rawWidth, springOptions);
  const height = useSpring(rawHeight, springOptions);
  const translateY = useSpring(rawTranslateY, springOptions);

  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollYProgress, 'change', latest => {
    setShow(latest < 0.08);
  });

  return (
    <div className="mx-auto flex w-screen items-end justify-center" ref={scrollRef}>
      <Tabs
        defaultValue="where"
        value={selectedTab}
        //eslint-disable-next-line
        //@ts-ignore
        onValueChange={setSelectedTab}
      >
        <motion.div
          className="w-215 flex justify-center rounded-full bg-gray-100"
          style={{ width, translateY, height }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        >
          <TabsList className="h-full w-full rounded-full">
            <TabsTrigger
              className="flex-1/2 flex w-full flex-col items-start justify-center rounded-full px-8"
              value="where"
            >
              Where
              <motion.div className="text-gray-400" style={{ display: show ? 'block' : 'none' }}>
                <Input
                  placeholder="Search locations..."
                  className="ml-0 w-full"
                  style={{ display: show ? 'block' : 'none' }}
                />
              </motion.div>
            </TabsTrigger>

            <TabsTrigger
              className="flex-1/4 flex flex-col items-start justify-center rounded-full px-8"
              value="adoptionStart"
            >
              Start Date
              <motion.div className="text-gray-400" style={{ display: show ? 'block' : 'none' }}>
                Select Start Date
              </motion.div>
            </TabsTrigger>

            <TabsTrigger
              className="flex-1/4 flex flex-col items-start justify-center rounded-full px-8"
              value="adoptionEnd"
            >
              End Date
              <motion.div className="text-gray-400" style={{ display: show ? 'block' : 'none' }}>
                Select End Date
              </motion.div>
            </TabsTrigger>

            <TabsTrigger
              className="flex-1/2 relative flex flex-col items-start justify-center rounded-full px-8"
              value="species"
            >
              <div className="pr-5">Species</div>
              <motion.div className="text-gray-400" style={{ display: show ? 'block' : 'none' }}>
                Select Species
              </motion.div>
              <div className="absolute right-0">
                <Button rounded className="h-full p-4">
                  <Search className="h-4 w-4" />
                  <motion.div className="text-white" style={{ display: show ? 'block' : 'none' }}>
                    <span className="text-sm font-semibold">Search</span>
                  </motion.div>
                </Button>
              </div>
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <div className="mt-45 absolute z-20 min-h-[150px]">
          {selectedTab === 'where' && <LocationTab />}
          {selectedTab === 'adoptionStart' && <AdoptionStartTab dateRange={dateRange} setDateRange={setDateRange} />}
          {selectedTab === 'adoptionEnd' && <AdoptionEndTab dateRange={dateRange} setDateRange={setDateRange} />}
          {selectedTab === 'species' && (
            <SpeciesTab selectedSpecies={selectedSpecies} onSpeciesChange={handleSpeciesChange} />
          )}
        </div>
      </Tabs>
    </div>
  );
};

export { HeaderSearch };
