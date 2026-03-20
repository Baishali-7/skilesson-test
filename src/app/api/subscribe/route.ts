import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const STRIPE_PLANS = {
  explorer: {
    monthly: "price_1TBxsCPbVfeAMgS30pPNAU7T",
    annual: "price_1TBxtYPbVfeAMgS3xxC79Vyt",
  },
  summit: {
    monthly: "price_1TBxvwPbVfeAMgS3NBOlI8DQ",
    annual: "price_1TBxvwPbVfeAMgS3dLv18i4y",
  },
  apex: {
    monthly: "price_1TBxwmPbVfeAMgS392KboTQp",
    annual: "price_1TBxwmPbVfeAMgS3qFiJLmvE",
  },
} as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { userId, packageId, billingCycle, trialEnabled } = body;

    // ✅ Validate input
    if (!userId || !packageId) {
      return NextResponse.json(
        { success: false, error: "userId and planId are required." },
        { status: 400 }
      );
    }

    const cycle = billingCycle || "monthly";

    const priceId =
      STRIPE_PLANS[packageId as keyof typeof STRIPE_PLANS][
        cycle as "monthly" | "annual"
      ];

    if (!priceId) {
      return NextResponse.json(
        { success: false, error: "Invalid plan or billing cycle." },
        { status: 400 }
      );
    }

    // 🚨 IMPORTANT FIX IS HERE
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      // ❌ REMOVE metadata from here (optional, but not needed)
      // metadata: { userId, planId, billingCycle },

      // ✅ MUST BE HERE
      subscription_data: {
        metadata: {
          userId,
          packageId,
          billingCycle: cycle,
        },
        trial_period_days: trialEnabled ? 7 : undefined,
      },

      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    });

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (err) {
    console.error("❌ Subscribe error:", err);

    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
