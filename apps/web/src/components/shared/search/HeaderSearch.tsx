'use client';

import { useRef, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

import { AdoptionEndTab, AdoptionStartTab, LocationTab, SpeciesTab } from './tabs';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/form/inputs';

export type TabKeys = 'where' | 'adoptionStart' | 'adoptionEnd' | 'species' | undefined;

const HeaderSearch = () => {
  const pathname = usePathname();
  const router = useRouter();

  const scrollAnimate = pathname === '/';
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

  const rawWidth = useTransform(scrollYProgress, [0, 0.08], scrollAnimate ? [850, 250] : [250, 250]);
  const rawHeight = useTransform(scrollYProgress, [0, 0.08], scrollAnimate ? [80, 80] : [80, 80]);
  const rawTranslateY = useTransform(scrollYProgress, [0, 0.08], scrollAnimate ? [100, 0] : [0, 0]);

  const springOptions = { stiffness: 120, damping: 18 };

  const width = useSpring(rawWidth, springOptions);
  const height = useSpring(rawHeight, springOptions);
  const translateY = useSpring(rawTranslateY, springOptions);

  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollYProgress, 'change', latest => {
    if (!scrollAnimate) return;
    setShow(latest < 0.08);
    if (latest < 0.08) {
      setSelectedTab(undefined);
    }
  });

  const handleSearchClick = () => {
    router.push(`/pets?species=${selectedSpecies.join(',')}`);
  };
  return (
    <div className="relative mx-auto flex w-screen items-end justify-center" ref={scrollRef}>
      <motion.div
        className={'w-215 relative flex min-w-fit justify-center rounded-full bg-[#ebebeb98] p-2'}
        style={{ translateY, height, width }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      >
        <div
          className="flex-1/2 relative flex h-full min-w-fit cursor-pointer flex-col items-start justify-center rounded-full px-8"
          onClick={() => setSelectedTab('where')}
        >
          <motion.span
            className="z-70 text-sm font-medium"
            animate={{ y: show ? -8 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            Where
          </motion.span>
          <motion.div
            className="z-70 absolute top-7 mt-1 w-fit text-gray-700"
            initial={{ opacity: 0, y: 5 }}
            animate={{
              opacity: show ? 1 : 0,
              y: show ? 0 : 5,
              pointerEvents: show ? 'auto' : 'none',
            }}
            transition={{ duration: 0.2 }}
          >
            <Input placeholder="Search locations..." className="ml-0 w-20" />
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
          className="flex-1/4 relative flex h-full min-w-fit cursor-pointer flex-col items-start justify-center rounded-full px-8"
          onClick={() => setSelectedTab('adoptionStart')}
        >
          <motion.span
            className="z-70 text-sm font-medium"
            animate={{ y: show ? -8 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            Start Date
          </motion.span>
          <motion.div
            className="z-70 absolute top-7 mt-1 w-fit text-gray-700"
            initial={{ opacity: 0, y: 5 }}
            animate={{
              opacity: show ? 1 : 0,
              y: show ? 0 : 5,
              pointerEvents: show ? 'auto' : 'none',
            }}
            transition={{ duration: 0.2 }}
          >
            Select Date
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
          className="flex-1/4 relative flex h-full min-w-fit cursor-pointer flex-col items-start justify-center rounded-full px-8"
          onClick={() => setSelectedTab('adoptionEnd')}
        >
          <motion.span
            className="z-70 text-sm font-medium"
            animate={{ y: show ? -8 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            End Date
          </motion.span>
          <motion.div
            className="z-70 absolute top-7 mt-1 w-fit text-gray-700"
            initial={{ opacity: 0, y: 5 }}
            animate={{
              opacity: show ? 1 : 0,
              y: show ? 0 : 5,
              pointerEvents: show ? 'auto' : 'none',
            }}
            transition={{ duration: 0.2 }}
          >
            Select Date
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
          className="flex-1/2 relative flex h-full min-w-fit cursor-pointer flex-col items-start justify-center rounded-full px-8 pr-14"
          onClick={() => setSelectedTab('species')}
        >
          <motion.span
            className="z-70 text-sm font-medium"
            animate={{ y: show ? -8 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            Species
          </motion.span>
          <motion.div
            className="z-70 absolute top-7 mt-1 w-fit text-gray-700"
            initial={{ opacity: 0, y: 5 }}
            animate={{
              opacity: show ? 1 : 0,
              y: show ? 0 : 5,
              pointerEvents: show ? 'auto' : 'none',
            }}
            transition={{ duration: 0.2 }}
          >
            Select Species
          </motion.div>
          {selectedTab === 'species' && (
            <motion.div
              layoutId="active-tab"
              className="z-60 absolute inset-0 bg-white"
              style={{ borderRadius: 1000 }}
            />
          )}

          <div className="z-80 absolute right-0">
            <Button rounded className="h-full p-4" onClick={handleSearchClick}>
              <Search className="h-4 w-4" />
              <motion.div className="text-white" style={{ display: show ? 'block' : 'none' }}>
                <span className="z-90 text-sm font-semibold">Search</span>
              </motion.div>
            </Button>
          </div>
        </div>
        {selectedTab === undefined && (
          <motion.div layoutId="active-tab" className="z-60 absolute inset-2 bg-white" style={{ borderRadius: 1000 }} />
        )}
        <AnimatePresence mode="wait">
          {selectedTab && (
            <motion.div
              key={selectedTab}
              className="absolute z-20 mt-20 min-h-[150px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {selectedTab === 'where' && <LocationTab />}
              {selectedTab === 'adoptionStart' && (
                <AdoptionStartTab dateRange={dateRange} setDateRange={setDateRange} />
              )}
              {selectedTab === 'adoptionEnd' && <AdoptionEndTab dateRange={dateRange} setDateRange={setDateRange} />}
              {selectedTab === 'species' && (
                <SpeciesTab selectedSpecies={selectedSpecies} onSpeciesChange={handleSpeciesChange} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export { HeaderSearch };
