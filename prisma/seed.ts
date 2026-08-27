import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("DeployGuard123!", 12);
  await prisma.user.upsert({
    where: { email: "demo@deployguard.dev" },
    update: { passwordHash },
    create: { name: "DeployGuard Demo", email: "demo@deployguard.dev", passwordHash },
  });
  console.log("Seeded demo@deployguard.dev / DeployGuard123!");
}

main().finally(() => prisma.$disconnect());
