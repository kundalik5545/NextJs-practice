const { PrismaClient } = require("@prisma/client");

const globalForPrisma = globalThis;

const db = globalForPrisma.prisma || new PrismaClient();
// const db =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ["query", "info", "warn", "error"],
//   });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

module.exports = { db };
