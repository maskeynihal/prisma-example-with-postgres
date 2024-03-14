import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

async function createUser() {
  const user = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@prisma.io",
      posts: {
        create: {
          title: "Hello World",
        },
      },
    },
  });
  console.log(user);
}

async function main() {
  // await createUser();

  const users = await prisma.user.findMany({
    //@ts-ignore
    relationLoadStrategy: "join", // or 'query',
    include: {
      posts: true,
    },
  });

  console.dir({ users }, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
