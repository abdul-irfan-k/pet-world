import { Footer, Header } from '@/components/shared';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="w-full h-full min-h-screen">
      <Header />

      <div className="mx-auto text-center w-[50%] flex flex-col items-center  mb-6 py-16">
        <div className="relative w-[250px] h-[250px] ">
          <Image src={'/not-found.jpeg'} alt="not-found" fill />
        </div>
        <h1 className="text-9xl font-semibold text-gray-900 mb-4">404</h1>
        <p className="text-gray-500 max-w-md">
          {"Oops! The page you're looking for doesn't exist or has been moved."}
        </p>
        <div className="mt-6 flex gap-4">
          <Button className="bg-black text-white px-4 py-2 rounded-md hover:opacity-90">
            Go back
          </Button>
          <Button className="bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-200">
            Report problem
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
