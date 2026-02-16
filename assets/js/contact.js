/**
 * Contact Form Handler
 * Submits to Supabase Edge Function with reCAPTCHA v3
 *
 * SETUP: Replace the placeholders below with your actual values.
 */

// ── Configuration ────────────────────────────────────────
// Safe to expose: this is your Supabase project URL
const SUPABASE_URL = "https://YOUR_PROJECT_REF.supabase.co";

// The Edge Function endpoint
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/send-email`;

// Safe to expose: the anon key is used for auth headers
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY_HERE";

// reCAPTCHA v3 site key (public)
const RECAPTCHA_SITE_KEY = "PLACEHOLDER_SITE_KEY";

// ── Form Handler ─────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
    }
});

async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const statusEl = document.getElementById("form-status");

    // Reset status
    statusEl.className = "status-msg";
    statusEl.textContent = "";

    // Set loading state
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    try {
        // 1. Get reCAPTCHA token
        let token = "";
        if (window.grecaptcha) {
            token = await new Promise((resolve) => {
                grecaptcha.ready(() => {
                    grecaptcha
                        .execute(RECAPTCHA_SITE_KEY, { action: "submit" })
                        .then(resolve);
                });
            });
        } else {
            console.warn("reCAPTCHA not loaded, sending without token");
        }

        // 2. Prepare payload
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.recaptchaToken = token;

        // 3. Send to Supabase Edge Function
        const response = await fetch(EDGE_FUNCTION_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                apikey: SUPABASE_ANON_KEY,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Failed to send message");
        }

        // 4. Success
        showStatus(
            statusEl,
            "Message sent successfully! Check your email for a confirmation.",
            "success"
        );
        form.reset();
    } catch (error) {
        console.error("Form Error:", error);
        showStatus(
            statusEl,
            "Failed to send message. Please try again or email us directly.",
            "error"
        );
    } finally {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
    }
}

function showStatus(el, msg, type) {
    el.textContent = msg;
    el.classList.add(type);
}
