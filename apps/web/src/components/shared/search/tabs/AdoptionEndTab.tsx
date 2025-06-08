import { Calendar } from '@/components/ui/calendar';

interface Props {
  dateRange: { from: Date; to: Date };
  setDateRange: (range: { from: Date; to: Date }) => void;
}
const AdoptionEndTab = ({ dateRange, setDateRange }: Props) => {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-2xl">
      <h3 className="mb-2 text-sm font-semibold">Select Adoption End Date</h3>
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
  );
};
export { AdoptionEndTab };
