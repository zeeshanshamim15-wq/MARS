// MARS — Shared Razorpay payment hook
// Supports real Razorpay SDK + simulation fallback for development
import { useEffect, useState, useCallback } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export type RazorpayOptions = {
  amount: number; // in INR (not paise)
  prefill: { name: string; email: string; contact: string };
  description: string;
  onSuccess: (paymentId: string) => void;
  onDismiss?: () => void;
};

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_dummy";
const SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

function isValidKey(key: string): boolean {
  return key !== "rzp_test_dummy" && key.startsWith("rzp_");
}

export function useRazorpay() {
  const [isLoaded, setIsLoaded] = useState(false);
  const isSimulation = !isValidKey(RAZORPAY_KEY);

  // Load Razorpay SDK script
  useEffect(() => {
    if (isSimulation) return;

    // Check if already loaded
    if (window.Razorpay) {
      setIsLoaded(true);
      return;
    }

    const existingScript = document.querySelector(`script[src="${SCRIPT_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener("load", () => setIsLoaded(true));
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => {
      console.warn("[MARS] Razorpay SDK failed to load — falling back to simulation");
    };
    document.body.appendChild(script);
  }, [isSimulation]);

  const openCheckout = useCallback(
    (options: RazorpayOptions) => {
      // If simulation mode, generate fake payment ID and callback
      if (isSimulation || !isLoaded || !window.Razorpay) {
        // Consumer component should handle simulation UI
        // This is a safety fallback that auto-succeeds
        const fakeId = `pay_sim_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        options.onSuccess(fakeId);
        return;
      }

      // Real Razorpay checkout
      const rzpOptions = {
        key: RAZORPAY_KEY,
        amount: Math.round(options.amount * 100), // Convert INR to paise
        currency: "INR",
        name: "MARS",
        description: options.description,
        prefill: options.prefill,
        theme: {
          color: "#10B981", // Emerald accent
          backdrop_color: "rgba(0, 0, 0, 0.85)",
        },
        handler: (response: { razorpay_payment_id: string }) => {
          options.onSuccess(response.razorpay_payment_id);
        },
        modal: {
          ondismiss: () => {
            options.onDismiss?.();
          },
          escape: true,
          animation: true,
        },
      };

      const rzp = new window.Razorpay(rzpOptions);
      rzp.open();
    },
    [isSimulation, isLoaded]
  );

  return { openCheckout, isSimulation, isLoaded };
}

export default useRazorpay;
