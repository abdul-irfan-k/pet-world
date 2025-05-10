import React, { FC } from 'react';
import { Button } from '../ui/button';
import { Filter, SlidersHorizontal } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}
interface PetListingHeaderProps {
  title: string;
  count?: number;
  breadCrumbItems: BreadcrumbItem[];
}

const PetListingHeader: FC<PetListingHeaderProps> = ({
  breadCrumbItems,
  title,
  count,
}) => {
  return (
    <div className="flex flex-col py-6 gap-1">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            {breadCrumbItems.map((path, index) => (
              <div key={index} className="flex items-center">
                <BreadcrumbItem>
                  {path.href ? (
                    <BreadcrumbLink href={path.href}>
                      {path.label}
                    </BreadcrumbLink>
                  ) : (
                    <span className="font-medium text-black">{path.label}</span>
                  )}
                </BreadcrumbItem>
                {index < breadCrumbItems.length - 1 && <BreadcrumbSeparator />}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-2xl leading-[32px] font-medium flex gap-2">
            {title}
            <span>{`(${count})`}</span>
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
          <Button
            variant={'ghost'}
            className="text-[16px] leading-[24px] w-full sm:w-auto"
          >
            Hide Filters <SlidersHorizontal />
          </Button>
          <Button
            variant={'ghost'}
            className="text-[16px] leading-[24px] w-full sm:w-auto"
          >
            Sort by: <Filter />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { PetListingHeader };
