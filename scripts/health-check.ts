/**
 * Health Check Script for AI Portfolio API
 * Run this script to test API endpoints and services
 */

import { Redis } from "@upstash/redis";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { OpenAIEmbeddings } from "@langchain/openai";

async function checkOpenAI() {
  try {
    console.log("🔍 Checking OpenAI API...");
    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
    });

    await embeddings.embedQuery("test");
    console.log("✅ OpenAI API: Working");
    return true;
  } catch (error) {
    console.error(
      "❌ OpenAI API: Failed",
      error instanceof Error ? error.message : error,
    );
    return false;
  }
}

async function checkRedis() {
  try {
    console.log("🔍 Checking Redis cache...");
    const redis = Redis.fromEnv();
    await redis.set("health-check", "test", { ex: 60 });
    const result = await redis.get("health-check");

    if (result === "test") {
      console.log("✅ Redis Cache: Working");
      return true;
    } else {
      console.error("❌ Redis Cache: Data mismatch");
      return false;
    }
  } catch (error) {
    console.error(
      "❌ Redis Cache: Failed",
      error instanceof Error ? error.message : error,
    );
    return false;
  }
}

async function checkAstraDB() {
  try {
    console.log("🔍 Checking AstraDB...");
    const endpoint = process.env.ASTRA_DB_ENDPOINT || "";
    const token = process.env.ASTRA_DB_APPLICATION_TOKEN || "";
    const collection = process.env.ASTRA_DB_COLLECTION || "";

    if (!endpoint || !token || !collection) {
      console.error("❌ AstraDB: Missing environment variables");
      return false;
    }

    const client = new DataAPIClient(token);
    const db = client.db(endpoint);
    const coll = db.collection(collection);

    await coll.options();
    console.log("✅ AstraDB: Working");
    return true;
  } catch (error) {
    console.error(
      "❌ AstraDB: Failed",
      error instanceof Error ? error.message : error,
    );
    return false;
  }
}

async function checkChatAPI() {
  try {
    console.log("🔍 Checking Chat API...");
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "Hello, this is a health check test.",
          },
        ],
      }),
    });

    if (response.ok) {
      console.log("✅ Chat API: Working");
      return true;
    } else {
      console.error(
        `❌ Chat API: HTTP ${response.status} - ${response.statusText}`,
      );
      return false;
    }
  } catch (error) {
    console.error(
      "❌ Chat API: Failed",
      error instanceof Error ? error.message : error,
    );
    return false;
  }
}

async function runHealthCheck() {
  console.log("🏥 AI Portfolio Health Check");
  console.log("=".repeat(40));

  const checks = [
    { name: "OpenAI API", fn: checkOpenAI },
    { name: "Redis Cache", fn: checkRedis },
    { name: "AstraDB", fn: checkAstraDB },
    { name: "Chat API", fn: checkChatAPI },
  ];

  const results = [];

  for (const check of checks) {
    try {
      const result = await check.fn();
      results.push({ name: check.name, success: result });
    } catch (error) {
      console.error(`❌ ${check.name}: Unexpected error`, error);
      results.push({ name: check.name, success: false });
    }
  }

  console.log("\n📊 Health Check Summary");
  console.log("=".repeat(40));

  const successful = results.filter((r) => r.success).length;
  const total = results.length;

  results.forEach((result) => {
    console.log(`${result.success ? "✅" : "❌"} ${result.name}`);
  });

  console.log(`\n🎯 Overall: ${successful}/${total} services working`);

  if (successful === total) {
    console.log("🎉 All services are healthy!");
    process.exit(0);
  } else {
    console.log("⚠️  Some services need attention.");
    process.exit(1);
  }
}

// Run the health check
runHealthCheck().catch((error) => {
  console.error("💥 Health check failed to run:", error);
  process.exit(1);
});
