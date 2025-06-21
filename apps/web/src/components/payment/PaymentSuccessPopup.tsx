import React from 'react';

import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti-boom';

const PaymentSuccessPopup = () => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen flex-col items-center justify-center">
      <div className="relative z-10 mx-auto flex aspect-[4/3] w-[60%] items-center justify-center rounded-lg bg-white">
        <div className="z-20 flex flex-col items-center">
          <CheckCircle color="#4CAF50" size={32} strokeWidth={2} />;
          <span className="mt-[-10] text-xl font-medium">Payment Made successfully</span>
        </div>
        <div>
          <Confetti
            mode="fall"
            particleCount={40}
            shapeSize={14}
            fadeOutHeight={0.8}
            colors={['#ff577f', '#ff884b', '#ffd384', '#fff9b0']}
            className="relative"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      <div className="fixed left-0 top-0 h-screen w-screen" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
    </div>
  );
};

export { PaymentSuccessPopup };
