import { NextResponse } from "next/server";
import { defaultDailyRecipes, DailyRecipe } from "@/data/dailyRecipes";

// Dedicated persistent Cloud DB endpoint for recipes
const CLOUD_DB_RECIPES_URL = "https://api.restful-api.dev/objects/ff808181a067127101a095ed0c0601d4";

let localMemoryRecipes: DailyRecipe[] = [...defaultDailyRecipes];

async function fetchAllRecipes(): Promise<DailyRecipe[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(CLOUD_DB_RECIPES_URL, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.data && Array.isArray(json.data.recipes) && json.data.recipes.length > 0) {
        localMemoryRecipes = json.data.recipes;
        return localMemoryRecipes;
      }
    }
  } catch (e) {
    console.warn("Cloud DB recipes fetch error:", e);
  }

  return localMemoryRecipes;
}

async function persistRecipesToCloud(recipes: DailyRecipe[]) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    await fetch(CLOUD_DB_RECIPES_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "delicious-meats-recipes",
        data: { recipes }
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
  } catch (e) {
    console.error("Cloud DB recipes persist error:", e);
  }
}

// GET /api/recipes
export async function GET() {
  const recipes = await fetchAllRecipes();
  return NextResponse.json({ success: true, recipes }, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

// POST /api/recipes (Update full recipe list)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !Array.isArray(body.recipes)) {
      return NextResponse.json({ error: "Invalid recipe data" }, { status: 400 });
    }

    localMemoryRecipes = body.recipes;
    await persistRecipesToCloud(body.recipes);

    return NextResponse.json({ success: true, recipes: localMemoryRecipes }, {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  } catch (e) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
