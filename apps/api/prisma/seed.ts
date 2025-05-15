import { hash } from 'bcrypt';

import { PrismaClient } from '../src/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: await hash('securepassword123', 10),
        userId: 'user-1',
      },
      {
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        password: await hash('anotherpassword456', 10),
        userId: 'user-2',
      },
      {
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        password: await hash('password789', 10),
        userId: 'user-3',
      },
    ],
  });
  console.log('Dummy users created.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
