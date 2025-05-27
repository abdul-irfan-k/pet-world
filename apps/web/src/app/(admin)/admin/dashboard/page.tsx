import {
  PawPrint,
  Users,
  Heart,
  Calendar,
  TrendingUp,
  Plus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
            <Button variant="primary" size="default">
              <Plus className="h-4 w-4" />
              Add a new Pet
            </Button>
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">
                  Total Adoptions
                </h3>
                <Heart className="text-brand-500 h-5 w-5" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-gray-900">2,350</p>
                <p className="text-xs text-gray-500">+20.1% from last month</p>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">
                  Available Pets
                </h3>
                <PawPrint className="text-brand-500 h-5 w-5" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-gray-900">573</p>
                <p className="text-xs text-gray-500">+12 new this week</p>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">
                  Active Adopters
                </h3>
                <Users className="text-brand-500 h-5 w-5" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-gray-900">1,234</p>
                <p className="text-xs text-gray-500">+8.2% from last month</p>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">
                  Adoption Rate
                </h3>
                <TrendingUp className="text-brand-500 h-5 w-5" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-gray-900">85%</p>
                <p className="text-xs text-gray-500">+4.3% from last month</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4 rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Adoptions
                </h3>
                <p className="text-sm text-gray-500">
                  Latest successful pet adoptions in your area
                </p>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-brand-100 h-12 w-12 rounded-full" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Max the Golden Retriever
                        </p>
                        <p className="text-sm text-gray-500">
                          Adopted by Sarah Johnson
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">2 days ago</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-3 rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Upcoming Events
                </h3>
                <p className="text-sm text-gray-500">
                  Pet adoption events and activities
                </p>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 border-b border-gray-100 pb-4 last:border-0"
                  >
                    <Calendar className="text-brand-500 h-5 w-5" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Weekend Adoption Drive
                      </p>
                      <p className="text-sm text-gray-500">
                        Saturday, 10:00 AM
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
