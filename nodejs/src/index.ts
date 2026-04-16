import "dotenv/config";
import { createExpressApp } from "./routes/express/index.js";
import { createFastifyApp } from "./routes/fastify/index.js";

async function main() {
  // express on 3333
  const expressApp = createExpressApp();
  const EXPRESS_PORT = 3333;
  expressApp.listen(EXPRESS_PORT, () => {
    console.log(`🚀 Express server running on http://localhost:${EXPRESS_PORT}`);
    console.log(`📖 Express Docs: http://localhost:${EXPRESS_PORT}/docs`);
  });

  // fastify on 3334
  const fastifyApp = await createFastifyApp();
  const FASTIFY_PORT = 3334;
  try {
    await fastifyApp.listen({ port: FASTIFY_PORT });
    console.log(`🚀 Fastify server running on http://localhost:${FASTIFY_PORT}`);
    console.log(`📖 Fastify Docs: http://localhost:${FASTIFY_PORT}/docs`);
  } catch (err) {
    console.error("Error starting Fastify server:", err);
    process.exit(1);
  }
}

main();
