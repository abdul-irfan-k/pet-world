'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetStripeAccountQuery, useOnboardStripeAccountMutation } from '@/lib/api/paymentApi';

const PaymentsPage = () => {
  const { mutate } = useOnboardStripeAccountMutation();

  const { data: stripeAccount } = useGetStripeAccountQuery();
  const handleAddPaymentMethod = () => {
    mutate({
      origin: window.location.origin,
    });
  };
  return (
    <div className="w-150 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl">Payment Methods</h1>
      </div>
      <Tabs defaultValue="payments" className="w-full">
        <TabsList>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
        </TabsList>

        <TabsContent value="payments" className="flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Your payments</h2>
            <p className="text-gray-600">Keep track of all your payments and refunds.</p>
            <Button variant={'black'} size={'lg'} className="w-fit">
              Manage payments
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Payment methods</h2>
            <p className="text-gray-600">Add and manage your payment methods using our secure payment system.</p>
            <div className="flex items-center justify-between rounded-md border p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-6 w-10 items-center justify-center rounded bg-gray-200">VISA</div>
                <div>
                  <p className="font-semibold">VISA </p>
                  <p className="text-sm text-gray-500">Expiration: 10/2028</p>
                </div>
              </div>
            </div>
            <Button variant={'black'} size={'lg'} className="w-fit">
              Add payment method
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="payouts" className="flex flex-col gap-4">
          <h1 className="text-2xl">How you get paid</h1>
          <p>
            Payouts are how you receive funds from your sales. You can set up your bank account or other payout methods
            here.
          </p>

          {stripeAccount?.data.accounts.map(account => {
            return (
              <Card key={account.id}>
                <CardContent className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <span className="text-lg">
                        {account.individual?.first_name} {account.individual?.last_name}
                      </span>
                      <span className="text-muted-foreground">Default</span>
                      <span className="text-muted-foreground">Pending</span>
                    </div>
                    <span>{account.email}</span>
                  </div>
                  <Button variant={'outline'}>Edit</Button>
                </CardContent>
              </Card>
            );
          })}
          <Card>
            <CardContent className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <span className="text-lg">Paypal</span>
                  <span className="text-muted-foreground">Default</span>
                  <span className="text-muted-foreground">Pending</span>
                </div>
                <span>paypaluser@gmail.com</span>
              </div>
              <Button variant={'outline'}>Edit</Button>
            </CardContent>
          </Card>

          <Button variant={'black'} size={'lg'} className="w-fit" onClick={handleAddPaymentMethod}>
            Add payout method
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentsPage;
