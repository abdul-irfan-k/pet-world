import React from 'react';

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  Plus,
  Search,
  Settings2,
  Upload,
} from 'lucide-react';

import { columns } from '@/components/admin/users/UserColumn';
import UsersTable from '@/components/admin/users/UserTable';
import { Button } from '@/components/ui/button';

const users = [
  {
    id: 1,
    name: 'Liam Smith',
    email: 'smith@example.com',
    role: 'Project Manager',
    status: 'Active',
    joinedDate: '24 Jun 2024, 9:23 pm',
    twoFactorAuth: 'Enabled',
  },
  {
    id: 2,
    name: 'Noah Anderson',
    email: 'anderson@example.com',
    role: 'UX Designer',
    status: 'Active',
    joinedDate: '15 Mar 2023, 2:45 pm',
    twoFactorAuth: 'Enabled',
  },
  {
    id: 3,
    name: 'Isabella Garcia',
    email: 'garcia@example.com',
    role: 'Front-End Developer',
    status: 'Inactive',
    joinedDate: '10 Apr 2022, 11:30 am',
    twoFactorAuth: 'Enabled',
  },
  {
    id: 4,
    name: 'William Clark',
    email: 'clark@example.com',
    role: 'Product Owner',
    status: 'Active',
    joinedDate: '28 Feb 2023, 6:15 pm',
    twoFactorAuth: 'Enabled',
  },
  {
    id: 5,
    name: 'James Hall',
    email: 'hall@example.com',
    role: 'Business Analyst',
    status: 'Active',
    joinedDate: '19 May 2024, 7:55 am',
    twoFactorAuth: 'Enabled',
  },
  {
    id: 6,
    name: 'Benjamin Lewis',
    email: 'lewis@example.com',
    role: 'Data Analyst',
    status: 'Active',
    joinedDate: '03 Jan 2024, 12:05 pm',
    twoFactorAuth: 'Enabled',
  },
  {
    id: 7,
    name: 'Amelia Davis',
    email: 'davis@example.com',
    role: 'UX Designer',
    status: 'Inactive',
    joinedDate: '21 Jul 2023, 8:40 pm',
    twoFactorAuth: 'Enabled',
  },
  {
    id: 8,
    name: 'Emma Johnson',
    email: 'johnson@example.com',
    role: 'UX Designer',
    status: 'Active',
    joinedDate: '16 Sep 2023, 3:25 pm',
    twoFactorAuth: 'Enabled',
  },
  {
    id: 9,
    name: 'Olivia Brown',
    email: 'brown@example.com',
    role: 'Marketing Specialist',
    status: 'Active',
    joinedDate: '04 Nov 2022, 9:50 am',
    twoFactorAuth: 'Enabled',
  },
  {
    id: 10,
    name: 'Ava Williams',
    email: 'williams@example.com',
    role: 'Software Engineer',
    status: 'Active',
    joinedDate: '30 Dec 2023, 4:35 pm',
    twoFactorAuth: 'Enabled',
  },
  {
    id: 11,
    name: 'Sophia Jones',
    email: 'jones@example.com',
    role: 'Front-End Developer',
    status: 'Active',
    joinedDate: '05 Jun 2023, 7:10 pm',
    twoFactorAuth: 'Enabled',
  },
  {
    id: 12,
    name: 'Mia Miller',
    email: 'moller@example.com',
    role: 'Security Analyst',
    status: 'Inactive',
    joinedDate: '12 Aug 2022, 1:00 pm',
    twoFactorAuth: 'Enabled',
  },
  {
    id: 13,
    name: 'Lucas Young',
    email: 'young@example.com',
    role: 'Front-End Developer',
    status: 'Active',
    joinedDate: '17 Oct 2023, 10:20 am',
    twoFactorAuth: 'Enabled',
  },
  {
    id: 14,
    name: 'Alexander Wright',
    email: 'wright@example.com',
    role: 'DevOps Engineer',
    status: 'Active',
    joinedDate: '08 Feb 2023, 5:45 pm',
    twoFactorAuth: 'Enabled',
  },
  {
    id: 15,
    name: 'Harper Martinez',
    email: 'martinez@example.com',
    role: 'System Architect',
    status: 'Active',
    joinedDate: '27 Jul 2024, 6:30 am',
    twoFactorAuth: 'Enabled',
  },
];

const AdminUserManagementPage = () => {
  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            User management{' '}
            <span className="text-sm font-normal text-gray-500">74</span>
          </h2>
          <p className="text-sm text-gray-600">
            Manage your team members and their account permissions here.
          </p>
        </div>
        <Button variant="primary" size="default">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Table
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:bg-gray-100"
          >
            Board
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:bg-gray-100"
          >
            List
          </Button>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search"
              className="focus:border-brand-500 focus:ring-brand-500 block w-full rounded-md border border-gray-300 py-1.5 pl-9 pr-3 text-sm placeholder-gray-400"
            />
          </div>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4" />
            <span>Hide</span>
          </Button>
          <Button variant="outline" size="sm">
            <Settings2 className="h-4 w-4" />
            <span>Customize</span>
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="mb-4 flex items-center space-x-3">
        <Button variant="outline" size="sm">
          <span>Role</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <span>2F Auth</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-brand-600 hover:bg-brand-50"
        >
          <Plus className="h-4 w-4" />
          <span>Add filter</span>
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <UsersTable
          columns={columns}
          //eslint-disable-next-line
          //@ts-ignore
          data={users}
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Rows per page:{' '}
          <select className="focus:border-brand-500 focus:ring-brand-500 mx-1 rounded-md border-gray-300 shadow-sm sm:text-sm">
            <option>15</option>
          </select>{' '}
          1-15 of 380 rows
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            disabled
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            disabled
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="sm" className="px-3 py-1.5 text-sm">
            1
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100"
          >
            2
          </Button>
          <span className="px-1.5 py-1.5 text-sm text-gray-500">...</span>
          <Button
            variant="ghost"
            size="sm"
            className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100"
          >
            5
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:bg-gray-100"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:bg-gray-100"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagementPage;
