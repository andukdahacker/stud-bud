import { PrismaClient, Prisma } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function seed() {
  const hashedPassword = await argon2.hash("Ducdeptraino4@");

  const seedUsersData: Prisma.UserCreateInput[] = [
    {
      username: "anduc",
      email: "duc@gmail.com",
      password: hashedPassword,
      isVerified: true,
      profile: {
        create: {
          profile_bio: "Hi",
        },
      },
    },
    {
      username: "mai",
      email: "mai@gmail.com",
      password: hashedPassword,
      isVerified: true,
      profile: {
        create: {
          profile_bio: "Hi",
        },
      },
    },
    {
      username: "son",
      email: "son@gmail.com",
      password: hashedPassword,
      isVerified: true,
      profile: {
        create: {
          profile_bio: "Hi",
        },
      },
    },
    {
      username: "thinh",
      email: "thinh@gmail.com",
      password: hashedPassword,
      isVerified: true,
      profile: {
        create: {
          profile_bio: "Hi",
        },
      },
    },
    {
      username: "minh",
      email: "minh@gmail.com",
      password: hashedPassword,
      isVerified: true,
      profile: {
        create: {
          profile_bio: "Hi",
        },
      },
    },
    {
      username: "lam",
      email: "lam@gmail.com",
      password: hashedPassword,
      isVerified: true,
      profile: {
        create: {
          profile_bio: "Hi",
        },
      },
    },
    {
      username: "linh",
      email: "linh@gmail.com",
      password: hashedPassword,
      isVerified: true,
      profile: {
        create: {
          profile_bio: "Hi",
        },
      },
    },
    {
      username: "kien",
      email: "kien@gmail.com",
      password: hashedPassword,
      isVerified: true,
      profile: {
        create: {
          profile_bio: "Hi",
        },
      },
    },
    {
      username: "nhi",
      email: "nhi@gmail.com",
      password: hashedPassword,
      isVerified: true,
      profile: {
        create: {
          profile_bio: "Hi",
        },
      },
    },
    {
      username: "yen",
      email: "yen@gmail.com",
      password: hashedPassword,
      isVerified: true,
      profile: {
        create: {
          profile_bio: "Hi",
        },
      },
    },
    {
      username: "tu",
      email: "tu@gmail.com",
      password: hashedPassword,
      isVerified: true,
      profile: {
        create: {
          profile_bio: "Hi",
        },
      },
    },
  ];
  console.log("Started seeding...");

  for (const i of seedUsersData) {
    const user = await prisma.user.create({
      data: i,
    });

    console.log(`Created user with username: ${user.username}`);
  }

  console.log(`Seeding is completed. Created ${seedUsersData.length} users `);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
