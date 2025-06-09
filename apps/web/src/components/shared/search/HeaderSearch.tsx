'use client';

import { useRef, useState } from 'react';

import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
import { Search } from 'lucide-react';

import { AdoptionEndTab, AdoptionStartTab, LocationTab, SpeciesTab } from './tabs';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/form/inputs';

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
      <motion.div
        className={'w-215 relative flex min-w-fit justify-center rounded-full bg-[#ebebeb98] p-1'}
        style={{ translateY, height, width }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      >
        <div
          className="flex-1/2 relative flex h-full min-w-fit cursor-pointer flex-col items-start justify-center rounded-full px-8"
          onClick={() => setSelectedTab('where')}
        >
          <span className="z-70 text-sm font-medium">Where</span>
          <motion.div className="z-70 text-gray-700" style={{ display: show ? 'block' : 'none' }}>
            <Input
              placeholder="Search locations..."
              className="ml-0 w-full"
              style={{ display: show ? 'block' : 'none' }}
            />
          </motion.div>
          {selectedTab === 'where' && (
            <motion.div
              layoutId="active-tab"
              className="z-60 absolute inset-0 bg-white"
              style={{ borderRadius: 1000 }}
            />
          )}
        </div>

        <div
          className="flex-1/3 relative flex h-full min-w-fit cursor-pointer flex-col items-start justify-center rounded-full px-8"
          onClick={() => setSelectedTab('adoptionStart')}
        >
          <span className="z-70 text-sm font-medium">Start Date</span>
          <motion.div className="z-70 text-gray-700" style={{ display: show ? 'block' : 'none' }}>
            Select Start Date
          </motion.div>
          {selectedTab === 'adoptionStart' && (
            <motion.div
              layoutId="active-tab"
              className="z-60 absolute inset-0 bg-white"
              style={{ borderRadius: 1000 }}
            />
          )}
        </div>

        <div
          className="flex-1/3 relative flex h-full min-w-fit cursor-pointer flex-col items-start justify-center rounded-full px-8"
          onClick={() => setSelectedTab('adoptionEnd')}
        >
          <span className="z-70 text-sm font-medium">End Date</span>
          <motion.div className="z-70 text-gray-700" style={{ display: show ? 'block' : 'none' }}>
            Select End Date
          </motion.div>
          {selectedTab === 'adoptionEnd' && (
            <motion.div
              layoutId="active-tab"
              className="z-60 absolute inset-0 bg-white"
              style={{ borderRadius: 1000 }}
            />
          )}
        </div>
        <div
          className="flex-1/2 relative flex h-full min-w-fit cursor-pointer flex-col items-start justify-center rounded-full px-8"
          onClick={() => setSelectedTab('species')}
        >
          <span className="z-70 text-sm font-medium">End Date</span>
          <motion.div className="z-70 text-gray-700" style={{ display: show ? 'block' : 'none' }}>
            Select End Date
          </motion.div>
          {selectedTab === 'species' && (
            <motion.div
              layoutId="active-tab"
              className="z-60 absolute inset-0 bg-white"
              style={{ borderRadius: 1000 }}
            />
          )}
        </div>
        {selectedTab === undefined && (
          <motion.div layoutId="active-tab" className="z-60 absolute inset-1 bg-white" style={{ borderRadius: 1000 }} />
        )}

        {/* <div className="pr-5">Species</div> */}
        {/* <motion.div className="z-70 text-gray-700" style={{ display: show ? 'block' : 'none' }}>
                Select Species
              </motion.div> */}
        {/* <div className="absolute right-0">
                <Button rounded className="h-full p-4">
                  <Search className="h-4 w-4" />
                  <motion.div className="text-white" style={{ display: show ? 'block' : 'none' }}>
                    <span className="text-sm font-semibold">Search</span>
                  </motion.div>
                </Button>
              </div> */}
        {/* </TabsTrigger> */}
      </motion.div>

      {/* <div className="mt-45 absolute z-20 min-h-[150px]">
        {selectedTab === 'where' && <LocationTab />}
        {selectedTab === 'adoptionStart' && <AdoptionStartTab dateRange={dateRange} setDateRange={setDateRange} />}
        {selectedTab === 'adoptionEnd' && <AdoptionEndTab dateRange={dateRange} setDateRange={setDateRange} />}
        {selectedTab === 'species' && (
          <SpeciesTab selectedSpecies={selectedSpecies} onSpeciesChange={handleSpeciesChange} />
        )}
      </div> */}
    </div>
  );
};

export { HeaderSearch };
