'use client';
import React from 'react';

import { Headset, LineChart, MessageCircle } from 'lucide-react';
import { AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area } from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const earningsData = [
  { period: 'Jul', earnings: 500 },
  { period: 'Aug', earnings: 750 },
  { period: 'Sep', earnings: 900 },
  { period: 'Oct', earnings: 300 },
];
const AdopterEarningsPage = () => {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <LineChart className="mr-2 h-5 w-5 text-green-600" />
          <h1 className="text-xl font-medium text-gray-800">Earnings Dashboard</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="lg" className="rounded-md">
              Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>New Feature Access</DropdownMenuItem>
            <DropdownMenuItem>All Adoptions</DropdownMenuItem>
            <DropdownMenuItem>Earnings</DropdownMenuItem>
            <DropdownMenuItem>Offer a New Pet</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="completed">
        <TabsList className="mb-6 grid w-full max-w-3xl grid-cols-5 gap-2 rounded-md bg-gray-50 p-2">
          <TabsTrigger value="completed">Completed (0)</TabsTrigger>
          <TabsTrigger value="inprogress">In Progress (0)</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming (0)</TabsTrigger>
          <TabsTrigger value="requests">New Requests (0)</TabsTrigger>
          <TabsTrigger value="review">Pending Review (0)</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardContent className="px-4">
            <p className="mb-1 text-sm text-gray-500">Total Earnings</p>
            <p className="text-2xl font-bold text-gray-800">₹4,500</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardContent className="px-4">
            <p className="mb-1 text-sm text-gray-500">Pending Earnings</p>
            <p className="text-2xl font-bold text-gray-800">₹1,200</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardContent className="px-4">
            <p className="mb-1 text-sm text-gray-500">In Progress</p>
            <p className="text-2xl font-bold text-gray-800">₹800</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-medium text-gray-800">Earnings Over Time</h2>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={earningsData}>
                <XAxis dataKey="period" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Area type="monotone" dataKey="earnings" stroke="#22c55e" fill="#bbf7d0" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="mb-2 flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-green-600" />
              <h3 className="font-medium text-gray-800"> Chat with a Mentor Adopter</h3>
            </div>
            <p className="text-sm text-gray-600">Need guidance? Reach out to experienced adopters for tips and help.</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="mb-2 flex items-center">
              <Headset className="mr-2 h-5 w-5 text-green-600" />
              <h3 className="font-medium text-gray-800"> Contact Adopter Support</h3>
            </div>
            <p className="text-sm text-gray-600">
              For any issues regarding adoption or payments, our team is ready to help.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdopterEarningsPage;
