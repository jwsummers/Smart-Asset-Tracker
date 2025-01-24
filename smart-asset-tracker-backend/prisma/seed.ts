import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const seedDemoUser = async () => {
  const demoEmail = 'demo@smrt.com';
  const demoPassword = 'demo123';

  const hashedPassword = await bcrypt.hash(demoPassword, 10);

  await prisma.user.upsert({
    where: { email: demoEmail },
    update: {},
    create: {
      email: demoEmail,
      password: hashedPassword,
    },
  });

  console.log('Demo user seeded!');
};

seedDemoUser()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
