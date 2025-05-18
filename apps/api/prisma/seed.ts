import { hash } from 'bcrypt';

import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: await hash('securepassword123', 10),
        userName: 'alicejohnson',
      },
      {
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        password: await hash('anotherpassword456', 10),
        userName: 'bobsmith',
      },
      {
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        password: await hash('password789', 10),
        userName: 'charliebrown',
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
