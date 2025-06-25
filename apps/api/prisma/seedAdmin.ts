import bcrypt from 'bcrypt';

import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@petworld.com';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  console.log('Seeded admin:', admin);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
