import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

const speciesList = [
  { id: 'dog', icon: '🐶', name: 'Dog' },
  { id: 'cat', icon: '🐱', name: 'Cat' },
  { id: 'rabbit', icon: '🐰', name: 'Rabbit' },
  { id: 'other', icon: '🐾', name: 'Other' },
];

interface Props {
  selectedSpecies: string[];
  onSpeciesChange: (species: string, isChecked: boolean) => void;
}

const SpeciesTab = ({ selectedSpecies, onSpeciesChange }: Props) => {
  return (
    <div className="w-110 rounded-2xl bg-white py-4 shadow-2xl">
      <ScrollArea className="max-h-150 h-auto px-4">
        <h3 className="mb-2 text-sm font-semibold">Select Species</h3>
        <div className="space-y-3">
          {speciesList.map(s => (
            <div key={s.id} className="flex cursor-pointer items-center space-x-3 rounded-md p-2 hover:bg-gray-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 text-xl">{s.icon}</div>
              <div className="flex-grow">
                <label htmlFor={s.id} className="font-medium">
                  {s.name}
                </label>
              </div>
              <Checkbox
                id={s.id}
                checked={selectedSpecies.includes(s.name)}
                onCheckedChange={(checked: boolean) => onSpeciesChange(s.name, checked)}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
export { SpeciesTab };
