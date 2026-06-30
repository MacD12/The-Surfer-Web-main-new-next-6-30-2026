'use client';
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  MapPin,
  Phone,
  Mail,
  User,
  FileText,
  Globe,
  Lock,
  BadgeCheck,
  ArrowRight
} from "lucide-react";
import { API_BASE_URL } from '@/lib/api';

// MPGS Configuration - Replace with your actual values
  const apiVersion = process.env.NEXT_PUBLIC_MPGS_API_VERSION || '61';
  const merchantId = process.env.NEXT_PUBLIC_MPGS_MERCHANT_ID || 'SURFERNOREUR';

// Get the correct MPGS URL based on environment
const getMPGSUrl = `https://cbcmpgs.gateway.mastercard.com/checkout/version/${apiVersion}/checkout.js`

const CheckoutPage = ({ bookingId }: { bookingId: string }) => {
  const router = useRouter();
  const [booking, setBooking] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
    confirmEmail: "",
    notes: "",
    agreed: false,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const scriptLoadAttempted = useRef(false);

  // Load MPGS script
  useEffect(() => {
    if (scriptLoadAttempted.current) return;
    scriptLoadAttempted.current = true;

    const loadMPGSScript = () => {
      // Check if script already exists
      if (window.Checkout) {
        setIsScriptLoaded(true);
        return;
      }

      // Create and load script
      const script = document.createElement("script");
      script.src = getMPGSUrl;
      script.async = true;
      script.onload = () => {
        console.log("MPGS script loaded successfully");
        setIsScriptLoaded(true);
      };
      script.onerror = () => {
        console.error("Failed to load MPGS script");
        setError("Payment system is currently unavailable. Please try again later.");
      };
      document.body.appendChild(script);
    };

    loadMPGSScript();

    return () => {
      // Cleanup if needed
    };
  }, []);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/bookings/${bookingId}`);
        setBooking(res.data);
        const traveller = res.data.travellerInfo?.[0] || {};
        setFormData(prev => ({
          ...prev,
          firstName: traveller.firstName || "",
          lastName: traveller.lastName || "",
          email: traveller.email || "",
          phone: traveller.phone || "",
          country: traveller.country || "",
        }));
      } catch (err) {
        console.error("Failed to fetch booking", err);
        setError("Unable to load booking details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";

    if (!formData.confirmEmail.trim()) errors.confirmEmail = "Please confirm your email";
    else if (formData.email !== formData.confirmEmail) errors.confirmEmail = "Emails do not match";

    if (!formData.country.trim()) errors.country = "Country is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.postalCode.trim()) errors.postalCode = "Postal code is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";

    if (!formData.agreed) errors.agreed = "You must agree to the terms and conditions";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      setError("Please fix the errors below");
      return;
    }

    // Check if MPGS is loaded
    if (!isScriptLoaded || !window.Checkout) {
      setError("Payment system is still loading. Please wait and try again.");
      return;
    }

    setSubmitting(true);

    try {
      const depositAmount = Math.round((booking.finalPrice || 0) * 0.25);

      // Step 1: Get the payment session from your backend
      const response = await axios.post(
        `${API_BASE_URL}/bookings/generate-payment-session`,
        {
          amount: depositAmount,
          currency: "EUR",
          orderId: booking._id,
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`,
        }
      );

      const { sessionId } = response.data;

      // Step 2: Configure and show MPGS payment
      window.Checkout.configure({
        session: {
          id: sessionId,
        },
        order: {
          amount: depositAmount,
          currency: "EUR",
          description: `Booking deposit for ${booking.travellerInfo?.[0]?.firstName || 'Guest'}`,
        },
        merchant: merchantId,
        interaction: {
          operation: "PURCHASE",
          merchant: {
            name: "The Surfer Weligama",
            address: {
              line1: "Weligama Beach",
              line2: "Sri Lanka",
            },
          },
          displayControl: {
            billingAddress: "HIDE",
          },
        },
      });

      // Handle payment completion
      window.Checkout.onPaymentCompleted = function(result) {
        console.log("Payment completed:", result);
        if (result.status === "SUCCESS") {
          // Update booking status
          axios.post(`${API_BASE_URL}/bookings/update-payment-status`, {
            bookingId: booking._id,
            paymentId: result.paymentId,
            status: "PAID"
          }).catch(console.error);

          router.push(`/payment-success?bookingId=${booking._id}`);
        } else {
          setError("Payment was not successful. Please try again.");
          setSubmitting(false);
        }
      };

      window.Checkout.onPaymentFailed = function(result) {
        console.error("Payment failed:", result);
        setError("Payment failed. Please try again or use a different payment method.");
        setSubmitting(false);
      };

      window.Checkout.showPaymentPage();

      // Reset submitting state if the payment page doesn't close properly
      setTimeout(() => {
        setSubmitting(false);
      }, 30000);

    } catch (err) {
      console.error("Payment initialization failed:", err);
      setError(
        err.response?.data?.message ||
        "Failed to initialize payment. Please try again."
      );
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-5 grid place-items-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0a67b3] to-cyan-500 shadow-lg shadow-cyan-500/30">
            <Loader2 className="w-7 h-7 animate-spin text-white" />
          </div>
          <div className="text-lg font-semibold text-slate-800">Loading your booking…</div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto bg-white rounded-[28px] border border-slate-100 ring-1 ring-slate-900/5 shadow-[0_30px_70px_-30px_rgba(2,132,199,0.4)] p-8 sm:p-10">
          <div className="mx-auto mb-5 grid place-items-center w-16 h-16 rounded-2xl bg-red-50">
            <AlertCircle className="w-9 h-9 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Not Found</h2>
          <p className="text-slate-600 mb-6">The booking you're looking for doesn't exist or may have been removed.</p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0a67b3] to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const depositAmount = Math.round((booking.finalPrice || 0) * 0.25);
  const dueAmount = (booking.finalPrice || 0) - depositAmount;

  const inputBase =
    "w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors";
  const inputCls = (hasError) =>
    `${inputBase} ${hasError ? 'border-red-300 bg-red-50' : 'border-slate-200'}`;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-32 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.24em] uppercase text-cyan-700 mb-4">
            <span className="block w-6 h-px bg-cyan-500" />
            Billing Details
            <span className="block w-6 h-px bg-cyan-500" />
          </span>
          <h1 className="text-[28px] leading-tight sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">Complete Your Booking</h1>
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">Secure your surf camp experience with a 25% deposit.</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-cyan-600" /> Instant confirmation</span>
            <span className="hidden sm:block w-px h-4 bg-slate-200" />
            <span className="inline-flex items-center gap-1.5"><Shield className="w-4 h-4 text-cyan-600" /> Encrypted payment</span>
            <span className="hidden sm:block w-px h-4 bg-slate-200" />
            <span className="inline-flex items-center gap-1.5"><Lock className="w-4 h-4 text-cyan-600" /> Mastercard secured</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-8">
            <div className="bg-white rounded-[28px] border border-slate-100 ring-1 ring-slate-900/5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_30px_60px_-28px_rgba(2,132,199,0.35)] overflow-hidden">
              <div className="px-6 sm:px-7 pt-6 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#0a67b3] to-cyan-500 text-white shadow-md shadow-cyan-500/30">
                    <CreditCard className="w-5 h-5" />
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-tight">Payment Summary</h2>
                    <p className="text-xs text-slate-400">Review before you pay</p>
                  </div>
                </div>
              </div>

              <div className="px-6 sm:px-7 py-5 space-y-1">
                <div className="flex justify-between items-center py-2 text-sm">
                  <span className="text-slate-500">Total Booking Amount</span>
                  <span className="font-semibold text-slate-800 tabular-nums">€{booking.finalPrice || 0}</span>
                </div>
                <div className="border-t border-dashed border-slate-200 pt-3 flex justify-between items-baseline">
                  <span className="text-slate-900 font-semibold">Final Amount</span>
                  <span className="text-2xl font-bold text-slate-900 tabular-nums">€{booking.finalPrice || 0}</span>
                </div>
              </div>

              <div className="px-6 sm:px-7 pb-5">
                <div className="relative rounded-2xl bg-gradient-to-br from-[#0a67b3] to-cyan-500 p-5 text-white shadow-lg shadow-cyan-500/30 overflow-hidden">
                  <div aria-hidden className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-white/10 blur-xl" />
                  <div className="relative">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100">Pay today · 25% deposit</div>
                    <div className="text-4xl font-bold tabular-nums leading-tight mt-1">€{depositAmount}</div>
                  </div>
                  <div className="relative mt-4 flex justify-between items-center border-t border-white/20 pt-3 text-sm">
                    <span className="text-cyan-100">Due on arrival</span>
                    <span className="font-semibold tabular-nums">€{dueAmount}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 sm:px-7 pb-6">
                <div className="bg-amber-50 border border-amber-200/70 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-800">
                      <strong>Important:</strong> The remaining balance of €{dueAmount} must be paid upon arrival at the surf camp.
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 sm:px-7 py-4 bg-slate-50/80 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-semibold text-slate-900 text-sm">Secure Payment</h3>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Mastercard Payment Gateway Services</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>PCI DSS compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 ring-1 ring-slate-900/5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_50px_-30px_rgba(2,132,199,0.3)]">
            <div className="flex items-center gap-3 mb-6">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#0a67b3] to-cyan-500 text-white shadow-md shadow-cyan-500/30">
                <User className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-slate-900">Billing Information</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    First Name *
                  </label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={inputCls(fieldErrors.firstName)}
                    placeholder="Enter your first name"
                  />
                  {fieldErrors.firstName && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {fieldErrors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Last Name *
                  </label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={inputCls(fieldErrors.lastName)}
                    placeholder="Enter your last name"
                  />
                  {fieldErrors.lastName && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {fieldErrors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputCls(fieldErrors.email)}
                    placeholder="your.email@example.com"
                  />
                  {fieldErrors.email && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Confirm Email *
                  </label>
                  <input
                    name="confirmEmail"
                    type="email"
                    value={formData.confirmEmail}
                    onChange={handleChange}
                    className={inputCls(fieldErrors.confirmEmail)}
                    placeholder="Confirm your email"
                  />
                  {fieldErrors.confirmEmail && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {fieldErrors.confirmEmail}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-600" />
                  Country / Region *
                </label>
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={inputCls(fieldErrors.country)}
                  placeholder="Enter your country"
                />
                {fieldErrors.country && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {fieldErrors.country}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-600" />
                  Street Address *
                </label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={inputCls(fieldErrors.address)}
                  placeholder="Enter your street address"
                />
                {fieldErrors.address && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {fieldErrors.address}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    City *
                  </label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={inputCls(fieldErrors.city)}
                    placeholder="Enter your city"
                  />
                  {fieldErrors.city && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {fieldErrors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Postal Code *
                  </label>
                  <input
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={inputCls(fieldErrors.postalCode)}
                    placeholder="Enter postal code"
                  />
                  {fieldErrors.postalCode && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {fieldErrors.postalCode}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-600" />
                  Phone Number *
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputCls(fieldErrors.phone)}
                  placeholder="Enter your phone number"
                />
                {fieldErrors.phone && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {fieldErrors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-600" />
                  Order Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputBase} border-slate-200 resize-none`}
                  placeholder="Any special requests or notes..."
                />
              </div>

              <div className="border-t border-slate-100 pt-5">
                <div className={`p-4 rounded-2xl transition-colors ${
                  fieldErrors.agreed ? 'bg-red-50 border border-red-200' : 'bg-slate-50'
                }`}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreed"
                      checked={formData.agreed}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 accent-cyan-600 focus:ring-cyan-500 rounded"
                    />
                    <div className="text-sm text-slate-700">
                      I have read and agree to the website{" "}
                      <a
                        href="https://thesurferweligama.com/terms-and-conditions/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-700 hover:text-cyan-800 font-medium underline"
                      >
                        terms and conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://thesurferweligama.com/privacy-policy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-700 hover:text-cyan-800 font-medium underline"
                      >
                        privacy policy
                      </a>
                      . *
                    </div>
                  </label>
                  {fieldErrors.agreed && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {fieldErrors.agreed}
                    </p>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-red-800">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !isScriptLoaded}
                className="group w-full bg-gradient-to-r from-[#0a67b3] to-cyan-500 text-white py-4 rounded-2xl cursor-pointer font-semibold hover:shadow-xl hover:shadow-cyan-500/40 shadow-lg shadow-cyan-500/30 disabled:from-slate-400 disabled:to-slate-500 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : !isScriptLoaded ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading Payment System...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pay Deposit · €{depositAmount}
                    <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-sm text-slate-400">
                <Lock className="w-3.5 h-3.5" />
                <span>You'll be redirected to our secure payment gateway</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;