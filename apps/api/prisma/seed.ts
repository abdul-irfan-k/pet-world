import { PrismaClient } from '../src/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: 'securepassword123',
        userId: 'user-1',
      },
      {
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        password: 'anotherpassword456',
        userId: 'user-2',
      },
      {
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        password: 'password789',
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
