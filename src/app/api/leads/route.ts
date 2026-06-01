import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface Lead {
  name: string;
  email: string;
  mobile: string;
  city: string;
  helpWith: string;
  grossIncome: number;
  potentialSaving: number;
  recommendedRegime: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Lead;
    const { name, email, mobile, helpWith } = body;

    if (!name || !email || !mobile) {
      return NextResponse.json(
        { error: "Name, email and mobile are required" },
        { status: 400 }
      );
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number" },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    await sendLeadEmail(body);

    return NextResponse.json({
      success: true,
      message: "Thank you! A tax expert will reach out to you soon.",
    });
  } catch (err) {
    console.error("Lead error:", err);
    // Smooth UX even if email backend isn't configured
    return NextResponse.json({
      success: true,
      message: "Thank you! A tax expert will reach out to you soon.",
    });
  }
}

async function sendLeadEmail(lead: Lead) {
  const to = process.env.NOTIFY_EMAIL;
  if (!process.env.RESEND_API_KEY || !to) {
    console.log("Email not configured — lead captured in logs:", lead);
    return;
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM || "BachatGuru <onboarding@resend.dev>";
    const inr = (n: number) => "₹" + Math.round(n || 0).toLocaleString("en-IN");

    await resend.emails.send({
      from,
      to,
      subject: `💰 New Tax Lead - ${lead.name} | Can save ${inr(lead.potentialSaving)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color:#4f46e5; border-bottom:2px solid #4f46e5; padding-bottom:10px;">
            New Tax Advisory Lead — BachatGuru
          </h2>
          <table style="width:100%; border-collapse:collapse; margin-top:16px;">
            <tr style="background:#eef2ff;"><td style="padding:10px; font-weight:bold; border:1px solid #ddd;">Name</td><td style="padding:10px; border:1px solid #ddd;">${lead.name}</td></tr>
            <tr><td style="padding:10px; font-weight:bold; border:1px solid #ddd;">Email</td><td style="padding:10px; border:1px solid #ddd;">${lead.email}</td></tr>
            <tr style="background:#eef2ff;"><td style="padding:10px; font-weight:bold; border:1px solid #ddd;">Mobile</td><td style="padding:10px; border:1px solid #ddd;">${lead.mobile}</td></tr>
            <tr><td style="padding:10px; font-weight:bold; border:1px solid #ddd;">City</td><td style="padding:10px; border:1px solid #ddd;">${lead.city || "Not specified"}</td></tr>
            <tr style="background:#eef2ff;"><td style="padding:10px; font-weight:bold; border:1px solid #ddd;">Needs help with</td><td style="padding:10px; border:1px solid #ddd;">${lead.helpWith || "Not specified"}</td></tr>
            <tr><td style="padding:10px; font-weight:bold; border:1px solid #ddd;">Annual Income</td><td style="padding:10px; border:1px solid #ddd;">${inr(lead.grossIncome)}</td></tr>
            <tr style="background:#eef2ff;"><td style="padding:10px; font-weight:bold; border:1px solid #ddd;">Potential Tax Saving</td><td style="padding:10px; border:1px solid #ddd;">${inr(lead.potentialSaving)}</td></tr>
            <tr><td style="padding:10px; font-weight:bold; border:1px solid #ddd;">Recommended Regime</td><td style="padding:10px; border:1px solid #ddd;">${lead.recommendedRegime}</td></tr>
          </table>
          <p style="margin-top:16px; color:#666; font-size:12px;">Captured via BachatGuru tax-saving planner.</p>
        </div>
      `,
    });
    console.log("Lead email sent");
  } catch (err) {
    console.error("Resend failed:", err);
  }
}
