const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const txs = await prisma.transaction.findMany({});
  console.log("TOTAL TRANSACTIONS:", txs.length);
  txs.forEach((t, i) => {
    console.log(`[${i}] Title: "${t.title}", Amount: ${t.amount}, Date Field: "${t.date}", CreatedAt Field: "${t.createdAt}"`);
  });
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
