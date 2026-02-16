/**
 * Supabase Edge Function: send-email
 *
 * Handles contact form submissions:
 *  1. Verifies reCAPTCHA v3 token
 *  2. Inserts submission into contact_submissions table
 *  3. Sends admin notification email via Resend
 *  4. Sends user thank-you email via Resend
 *
 * Required secrets (set via `supabase secrets set`):
 *  - RESEND_API_KEY
 *  - RECAPTCHA_SECRET
 *  - ADMIN_EMAIL (e.g. admin@seerdenergy.com)
 *
 * Auto-available in Edge Functions:
 *  - SUPABASE_URL
 *  - SUPABASE_SERVICE_ROLE_KEY
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─── Secrets ───────────────────────────────────────────
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const RECAPTCHA_SECRET = Deno.env.get("RECAPTCHA_SECRET")!;
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "admin@seerdenergy.com";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// ─── CORS ──────────────────────────────────────────────
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

// ─── Email Templates ───────────────────────────────────

function adminEmailTemplate(
    name: string,
    email: string,
    message: string,
    date: string
): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f4f5f7;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#2E3A59 0%,#1a2236 100%);padding:32px 40px;">
      <h1 style="color:#F2C230;font-size:20px;margin:0;">⚡ Seerd Energy</h1>
      <p style="color:#8a9bc0;font-size:13px;margin:8px 0 0;">New Contact Form Submission</p>
    </div>

    <!-- Body -->
    <div style="padding:32px 40px;">
      <h2 style="color:#2E3A59;font-size:18px;margin:0 0 24px;">New Inquiry Received</h2>

      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #e6e6e6;color:#556685;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;width:100px;">Name</td>
          <td style="padding:12px 0;border-bottom:1px solid #e6e6e6;color:#2E3A59;font-size:15px;">${name}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #e6e6e6;color:#556685;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Email</td>
          <td style="padding:12px 0;border-bottom:1px solid #e6e6e6;color:#2E3A59;font-size:15px;">
            <a href="mailto:${email}" style="color:#2E3A59;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;color:#556685;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;vertical-align:top;">Message</td>
          <td style="padding:12px 0;color:#2E3A59;font-size:15px;line-height:1.6;">${message}</td>
        </tr>
      </table>

      <div style="margin-top:32px;">
        <a href="mailto:${email}?subject=Re: Your inquiry to Seerd Energy"
           style="display:inline-block;background:#F2C230;color:#2E3A59;padding:12px 28px;border-radius:4px;font-weight:600;font-size:14px;text-decoration:none;">
          Reply to ${name} →
        </a>
      </div>

      <p style="margin-top:24px;color:#8a9bc0;font-size:12px;">Received on ${date}</p>
    </div>

    <!-- Footer -->
    <div style="background:#f4f5f7;padding:20px 40px;border-top:1px solid #e6e6e6;">
      <p style="color:#8a9bc0;font-size:12px;margin:0;">This is an automated notification from your Seerd Energy website contact form.</p>
    </div>
  </div>
</body>
</html>`;
}

function userThankYouTemplate(name: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f4f5f7;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#2E3A59 0%,#1a2236 100%);padding:40px;text-align:center;">
      <h1 style="color:#F2C230;font-size:22px;margin:0;">⚡ Seerd Energy</h1>
      <p style="color:#c5cee0;font-size:14px;margin:12px 0 0;">Industrial Supply Reliability</p>
    </div>

    <!-- Body -->
    <div style="padding:40px;">
      <h2 style="color:#2E3A59;font-size:20px;margin:0 0 16px;">Thank you, ${name}!</h2>

      <p style="color:#556685;font-size:15px;line-height:1.7;margin:0 0 20px;">
        We've received your message and appreciate you reaching out to us.
      </p>

      <div style="background:#f0f3f8;border-left:4px solid #F2C230;padding:20px 24px;border-radius:0 4px 4px 0;margin:24px 0;">
        <p style="color:#2E3A59;font-size:15px;line-height:1.6;margin:0;font-weight:500;">
          A member of our team will review your inquiry and get in touch within
          <strong>1 business day</strong>.
        </p>
      </div>

      <p style="color:#556685;font-size:15px;line-height:1.7;margin:24px 0 0;">
        In the meantime, feel free to explore our capabilities and learn more about how we support
        mission-critical supply chains.
      </p>

      <div style="margin-top:32px;text-align:center;">
        <a href="https://seerdenergy.com/services.html"
           style="display:inline-block;background:#F2C230;color:#2E3A59;padding:12px 32px;border-radius:4px;font-weight:600;font-size:14px;text-decoration:none;">
          View Our Capabilities
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:linear-gradient(135deg,#2E3A59 0%,#1a2236 100%);padding:32px 40px;text-align:center;">
      <p style="color:#8a9bc0;font-size:13px;margin:0 0 8px;">Seerd Energy Ltd.</p>
      <p style="color:#6b7fa8;font-size:12px;margin:0;">Industrial Zone, Sector 4 · London, UK</p>
      <p style="color:#6b7fa8;font-size:12px;margin:8px 0 0;">
        <a href="mailto:info@seerdenergy.com" style="color:#8a9bc0;">info@seerdenergy.com</a>
      </p>
      <div style="margin-top:16px;border-top:1px solid #3F4E73;padding-top:16px;">
        <p style="color:#556685;font-size:11px;margin:0;">© 2026 Seerd Energy. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// ─── Main Handler ──────────────────────────────────────

serve(async (req) => {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { name, email, message, recaptchaToken } = await req.json();

        // ── 1. Validate input ────────────────────────────
        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ error: "Name, email, and message are required." }),
                {
                    status: 400,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        // ── 2. Verify reCAPTCHA ──────────────────────────
        if (recaptchaToken) {
            const verifyRes = await fetch(
                `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}`,
                { method: "POST" }
            );
            const verifyData = await verifyRes.json();

            if (!verifyData.success || verifyData.score < 0.5) {
                return new Response(
                    JSON.stringify({ error: "reCAPTCHA verification failed." }),
                    {
                        status: 400,
                        headers: { ...corsHeaders, "Content-Type": "application/json" },
                    }
                );
            }
        }

        // ── 3. Insert into database ──────────────────────
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

        const { error: dbError } = await supabase
            .from("contact_submissions")
            .insert({ name, email, message });

        if (dbError) {
            console.error("DB insert error:", dbError);
            // Continue anyway — email is more important than DB
        }

        // ── 4. Send admin notification email ─────────────
        const now = new Date().toLocaleString("en-GB", {
            dateStyle: "full",
            timeStyle: "short",
            timeZone: "Asia/Kolkata",
        });

        const adminRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "Seerd Energy <onboarding@resend.dev>",
                to: [ADMIN_EMAIL],
                subject: `New Contact: ${name} — Seerd Energy`,
                html: adminEmailTemplate(name, email, message, now),
            }),
        });

        if (!adminRes.ok) {
            console.error("Admin email failed:", await adminRes.text());
        }

        // ── 5. Send user thank-you email ─────────────────
        const userRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "Seerd Energy <onboarding@resend.dev>",
                to: [email],
                subject: "Thank you for contacting Seerd Energy",
                html: userThankYouTemplate(name),
            }),
        });

        if (!userRes.ok) {
            console.error("User email failed:", await userRes.text());
        }

        // ── 6. Return success ────────────────────────────
        return new Response(
            JSON.stringify({
                success: true,
                message: "Submission received. Emails sent.",
            }),
            {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Edge Function error:", error);
        return new Response(
            JSON.stringify({ error: error.message || "Internal server error" }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
});
