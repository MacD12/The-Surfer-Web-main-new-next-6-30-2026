'use client';
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import {
  Calendar,
  MapPin,
  User,
  Mail,
  Package,
  Bed,
  Plus,
  CreditCard,
  ArrowRight,
  Star,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  Lock,
  BadgeCheck,
  Sparkles
} from "lucide-react";
import { API_BASE_URL } from '@/lib/api';

const PaymentRequest = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Fix: Safely get bookingId with null check
  const bookingId = searchParams?.get("bookingId") ?? null;

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) {
        setError("No booking ID provided. Please check your payment link.");
        setLoading(false);
        setNotFound(true);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/bookings/${bookingId}`);
        setBooking(res.data);
      } catch (err) {
        console.error("Booking not found", err);
        setError("Unable to load booking details. The booking may have expired or been cancelled.");
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleSubmitPayment = () => {
    if (booking?._id) {
      router.push(`/checkout/${booking._id}`);
    }
  };

  //dateRange = Oct 22, 2025 - Oct 24, 2025
  const formatDateRange = (dateRange) => {
    if (!dateRange) return "Not specified";
    const [start, end] = dateRange.split(" - ");
    return `${start} to ${end}`;
  };

  const calculateNights = (dateRange) => {
    if (!dateRange) return 0;
    const [start, end] = dateRange.split(" - ");
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-5 grid place-items-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0a67b3] to-cyan-500 shadow-lg shadow-cyan-500/30">
            <Loader2 className="w-7 h-7 animate-spin text-white" />
          </div>
          <div className="text-lg font-semibold text-slate-800">Loading your booking…</div>
          <div className="text-sm text-slate-500 mt-1">Preparing your payment details</div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto bg-white rounded-[28px] border border-slate-100 ring-1 ring-slate-900/5 shadow-[0_30px_70px_-30px_rgba(2,132,199,0.4)] p-8 sm:p-10">
          <div className="mx-auto mb-5 grid place-items-center w-16 h-16 rounded-2xl bg-red-50">
            <AlertCircle className="w-9 h-9 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Not Found</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0a67b3] to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  if (!booking) {
    return null;
  }

  const {
    travellerInfo,
    selectedCamp,
    dateRange,
    selectedPackages,
    selectedRooms,
    addons,
    finalPrice,
    totalPrice,
    discount,
    note,
  } = booking;

  const traveller = travellerInfo?.[0] || {};
  const nights = calculateNights(dateRange);
  const depositAmount = Math.round((finalPrice || 0) * 0.25);
  const dueAmount = (finalPrice || 0) - depositAmount;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 overflow-hidden">
      {/* Decorative brand glow — purely cosmetic */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-32 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.24em] uppercase text-cyan-700 mb-4">
            <span className="block w-6 h-px bg-cyan-500" />
            Secure Checkout
            <span className="block w-6 h-px bg-cyan-500" />
          </span>
          <h1 className="text-[28px] leading-tight sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Complete Your Booking Payment
          </h1>
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">
            Reserve your spot at {selectedCamp || 'The Surfer'} with a simple 25% deposit.
          </p>

          {/* Trust strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-cyan-600" /> Instant confirmation</span>
            <span className="hidden sm:block w-px h-4 bg-slate-200" />
            <span className="inline-flex items-center gap-1.5"><Shield className="w-4 h-4 text-cyan-600" /> Encrypted payment</span>
            <span className="hidden sm:block w-px h-4 bg-slate-200" />
            <span className="inline-flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-cyan-600" /> Free cancellation · 30 days</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* Booking Summary */}
          <div className="lg:col-span-3 space-y-6">
            <SectionCard>
              <SectionHeading icon={<User className="w-5 h-5" />} title="Guest Information" />

              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                <InfoItem
                  icon={<User className="w-4 h-4" />}
                  label="Full Name"
                  value={`${traveller.firstName || ''} ${traveller.lastName || ''}`.trim() || "Not provided"}
                />
                <InfoItem
                  icon={<Calendar className="w-4 h-4" />}
                  label="Stay Duration"
                  value={`${nights} night${nights !== 1 ? 's' : ''}`}
                />
                <InfoItem
                  icon={<Mail className="w-4 h-4" />}
                  label="Email"
                  value={traveller.email || "Not provided"}
                />
                <InfoItem
                  icon={<Calendar className="w-4 h-4" />}
                  label="Dates"
                  value={formatDateRange(dateRange)}
                />
                <InfoItem
                  icon={<MapPin className="w-4 h-4" />}
                  label="Camp Location"
                  value={selectedCamp || "Not specified"}
                />
                {traveller.phone && (
                  <InfoItem
                    icon={<Phone className="w-4 h-4" />}
                    label="Phone"
                    value={traveller.phone}
                  />
                )}
              </div>
            </SectionCard>

            {/* Booking Details */}
            <SectionCard>
              <SectionHeading icon={<Package className="w-5 h-5" />} title="Booking Details" />

              <div className="divide-y divide-slate-100 [&>*]:py-6 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0">
                {/* Packages */}
                {selectedPackages && selectedPackages.length > 0 && (
                  <DetailSection
                    icon={<Package className="w-4 h-4" />}
                    title="Surf Packages"
                    items={selectedPackages}
                  />
                )}

                {/* Rooms */}
                {selectedRooms && selectedRooms.length > 0 && (
                  <DetailSection
                    icon={<Bed className="w-4 h-4" />}
                    title="Accommodation"
                    items={selectedRooms}
                  />
                )}

                {note && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      Note
                    </h3>
                    <p className="text-slate-600 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-relaxed">{note}</p>
                  </div>
                )}

                {/* Addons */}
                {addons && addons.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-emerald-600" />
                      Additional Services
                    </h3>
                    <div className="space-y-2">
                      {addons.map((addon, index) => (
                        <div key={index} className="flex justify-between items-center rounded-2xl bg-slate-50 px-4 py-3">
                          <span className="text-slate-700 text-sm font-medium">{addon.title}</span>
                          {addon.price && (
                            <span className="font-semibold text-slate-900 tabular-nums">€{addon.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </SectionCard>
          </div>

          {/* Order Summary — consolidated premium sticky panel */}
          <div className="lg:col-span-2 lg:sticky lg:top-8">
            <div className="bg-white rounded-[28px] border border-slate-100 ring-1 ring-slate-900/5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_30px_60px_-28px_rgba(2,132,199,0.35)] overflow-hidden">
              {/* Panel header */}
              <div className="px-6 sm:px-7 pt-6 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#0a67b3] to-cyan-500 text-white shadow-md shadow-cyan-500/30">
                    <CreditCard className="w-5 h-5" />
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-tight">Order Summary</h2>
                    <p className="text-xs text-slate-400">Review before you pay</p>
                  </div>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="px-6 sm:px-7 py-5 space-y-1">
                <div className="flex justify-between items-center py-2 text-sm">
                  <span className="text-slate-500">Total Amount</span>
                  <span className="font-semibold text-slate-800 tabular-nums">€{totalPrice || 0}</span>
                </div>

                {discount && discount > 0 && (
                  <div className="flex justify-between items-center py-2 text-sm">
                    <span className="text-slate-500">Discount ({discount}%)</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 tabular-nums">
                      <span className="text-[10px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md">Saved</span>
                      -€{(totalPrice || 0) - (finalPrice || 0)}
                    </span>
                  </div>
                )}

                <div className="border-t border-dashed border-slate-200 mt-2 pt-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-900 font-semibold">Final Amount</span>
                    <span className="text-2xl font-bold text-slate-900 tabular-nums">€{finalPrice || 0}</span>
                  </div>
                </div>
              </div>

              {/* Deposit hero */}
              <div className="px-6 sm:px-7 pb-5">
                <div className="relative rounded-2xl bg-gradient-to-br from-[#0a67b3] to-cyan-500 p-5 text-white shadow-lg shadow-cyan-500/30 overflow-hidden">
                  <div aria-hidden className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-white/10 blur-xl" />
                  <div className="relative flex items-end justify-between">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100">Pay today · 25% deposit</div>
                      <div className="text-4xl font-bold tabular-nums leading-tight mt-1">€{depositAmount}</div>
                    </div>
                  </div>
                  <div className="relative mt-4 flex justify-between items-center border-t border-white/20 pt-3 text-sm">
                    <span className="text-cyan-100">Due on arrival</span>
                    <span className="font-semibold tabular-nums">€{dueAmount}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="px-6 sm:px-7 pb-6">
                <button
                  onClick={handleSubmitPayment}
                  className="group w-full bg-gradient-to-r from-[#0a67b3] to-cyan-500 text-white cursor-pointer py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
                >
                  <CreditCard className="w-5 h-5" />
                  Pay Deposit · €{depositAmount}
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Redirects to our secure payment gateway</span>
                </div>
              </div>

              {/* Secure footer */}
              <div className="px-6 sm:px-7 py-4 bg-slate-50/80 border-t border-slate-100">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <SecureBadge icon={<Lock className="w-4 h-4" />} label="256-bit SSL" />
                  <SecureBadge icon={<Shield className="w-4 h-4" />} label="PCI DSS" />
                  <SecureBadge icon={<BadgeCheck className="w-4 h-4" />} label="Secure gateway" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200/70 rounded-[28px] p-6 sm:p-7 mt-8">
          <div className="flex items-start gap-4">
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex-shrink-0">
              <AlertCircle className="w-5 h-5" />
            </span>
            <div className="text-amber-900 flex-1">
              <h3 className="font-semibold mb-3">Good to know</h3>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-amber-800/90">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                  Your booking is reserved once the 25% deposit is paid
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                  The remaining balance of €{dueAmount} is due upon arrival
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                  You'll receive a confirmation email after successful payment
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                  Free cancellation up to 30 days before check-in
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const SectionCard = ({ children }) => (
  <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-slate-100 ring-1 ring-slate-900/5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_50px_-30px_rgba(2,132,199,0.3)]">
    {children}
  </div>
);

const SectionHeading = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#0a67b3] to-cyan-500 text-white shadow-md shadow-cyan-500/30">
      {icon}
    </span>
    <h2 className="text-lg font-bold text-slate-900">{title}</h2>
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <span className="grid place-items-center w-9 h-9 rounded-lg bg-cyan-50 text-cyan-600 flex-shrink-0">{icon}</span>
    <div className="flex-1 min-w-0">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">{label}</div>
      <div className="text-slate-900 font-medium break-words">{value}</div>
    </div>
  </div>
);

const DetailSection = ({ icon, title, items }) => (
  <div>
    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
      <span className="text-cyan-600">{icon}</span>
      {title}
    </h3>
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2.5 rounded-2xl bg-slate-50 px-4 py-2.5 text-slate-700">
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#0a67b3] to-cyan-500 flex-shrink-0"></span>
          <span className="text-sm font-medium">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

const SecureBadge = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-1 text-slate-500">
    <span className="text-emerald-600">{icon}</span>
    <span className="text-[10px] font-semibold tracking-tight">{label}</span>
  </div>
);

// Add missing Phone icon component
const Phone = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export default PaymentRequest;