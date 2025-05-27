'use client';
import Image from 'next/image';

import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';

import type { User } from '@/types/User';

import { Button } from '@/components/ui/button';

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        className="text-brand-600 focus:ring-brand-500 h-4 w-4 rounded border-gray-300"
        checked={table.getIsAllPageRowsSelected()}
        onChange={value =>
          table.toggleAllPageRowsSelected(!!value.target.checked)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="text-brand-600 focus:ring-brand-500 h-4 w-4 rounded border-gray-300"
        checked={row.getIsSelected()}
        onChange={value => row.toggleSelected(!!value.target.checked)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Full name',
  },
  {
    accessorKey: 'profileImage',
    header: 'Profile Image',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Image
          src={user.profileImage || '/user-profile.png'}
          alt={user.name ?? 'User profile image'}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: () => 'User',
  },

  {
    accessorKey: 'isDisabled',
    header: 'Disabled',
    cell: ({ row }) => (row.getValue('isDisabled') ? 'Yes' : 'No'),
  },
  {
    accessorKey: 'isVerified',
    header: 'Verified',
    cell: ({ row }) => (row.getValue('isVerified') ? 'Yes' : 'No'),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-brand-600 hover:text-brand-700"
          >
            <Edit className="mr-1 h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="mr-1 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
