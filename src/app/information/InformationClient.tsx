'use client';
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Globe,
  Phone,
  Package as PackageIcon,
  BedDouble,
  PlaneLanding,
  PlaneTakeoff,
  Hash,
  Calendar,
  Clock,
  Send,
  Check,
  AlertCircle,
  Info,
  Users,
  MapPin,
  Loader2,
} from 'lucide-react';

import Summary from '@/components/booking_engine/Summary';
import { API_BASE_URL } from '@/lib/api';
import BookingNavbar from '@/components/booking_engine/BookingNavbar';
import BookingFooter from '@/components/booking_engine/BookingFooter';

/* ---------------- storage helpers (unchanged) ---------------- */
const storageHelpers = {
  safeSetItem: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`localStorage set failed for ${key}:`, error);
      return false;
    }
  },
  safeGetItem: (key: string, defaultValue: any = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`localStorage get failed for ${key}:`, error);
      return defaultValue;
    }
  },
};

type Traveller = {
  firstName: string;
  lastName: string;
  email: string;
  confirmedEmail: string;
  country: string;
  countryCode: string;
  phone: string;
  package: string;
  room: string;
  arrivalFlightNumber: string;
  arrivalFlightDate: string;
  arrivalFlightTime: string;
  departureFlightNumber: string;
  departureFlightDate: string;
  departureFlightTime: string;
};

const Information = () => {
  const [selectedCamp, setSelectedCamp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<string>('');
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);
  const [personCount, setPersonCount] = useState(0);
  const [formData, setFormData] = useState<Traveller[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [shouldReload, setShouldReload] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      localStorage.setItem('test', '1');
      localStorage.removeItem('test');
    } catch {
      setAlertMessage(
        'Your browser does not support saving booking details. Please switch to normal mode or update iOS.',
      );
      setShowAlert(true);
    }

    setDateRange(storageHelpers.safeGetItem('dateRange', '') || '');
    setTotalPrice(storageHelpers.safeGetItem('totalPrice', 0) || 0);
    setSelectedAddons(storageHelpers.safeGetItem('addons', []) || []);
    setIsSubmitted(storageHelpers.safeGetItem('isSubmitted', false) || false);

    const storedCamp = localStorage.getItem('selectedCamp');
    if (storedCamp) setSelectedCamp(storedCamp);

    const storedPackages = storageHelpers.safeGetItem('selectedPackages', []) || [];
    if (storedPackages.length > 0) {
      setSelectedPackages(storedPackages);
      const totalPersons = storedPackages.reduce((sum: number, pkg: string) => {
        const count = parseInt(pkg.split(' x ')[0], 10);
        return sum + (Number.isFinite(count) ? count : 0);
      }, 0);
      setPersonCount(totalPersons);
    }

    const storedRooms = storageHelpers.safeGetItem('selectedRooms', []) || [];
    if (storedRooms.length > 0) setSelectedRooms(storedRooms);

    const storedTravellers = storageHelpers.safeGetItem('travellerInfo', []) || [];
    if (storedTravellers.length > 0) setFormData(storedTravellers);
  }, []);

  // Initialize form by personCount if empty
  useEffect(() => {
    if (personCount > 0 && formData.length === 0) {
      setFormData(
        Array.from({ length: personCount }, () => ({
          firstName: '',
          lastName: '',
          email: '',
          confirmedEmail: '',
          country: '',
          countryCode: '',
          phone: '',
          package: '',
          room: '',
          arrivalFlightNumber: '',
          arrivalFlightDate: '',
          arrivalFlightTime: '',
          departureFlightNumber: '',
          departureFlightDate: '',
          departureFlightTime: '',
        })),
      );
    }
  }, [personCount, formData.length]);

  /* ---------- country list ---------- */
  const countries = useMemo(
    () => [
      { name: 'Afghanistan', code: '+93' }, { name: 'Albania', code: '+355' }, { name: 'Algeria', code: '+213' },
      { name: 'Andorra', code: '+376' }, { name: 'Angola', code: '+244' }, { name: 'Antigua and Barbuda', code: '+1-268' },
      { name: 'Argentina', code: '+54' }, { name: 'Armenia', code: '+374' }, { name: 'Australia', code: '+61' },
      { name: 'Austria', code: '+43' }, { name: 'Azerbaijan', code: '+994' }, { name: 'Bahamas', code: '+1-242' },
      { name: 'Bahrain', code: '+973' }, { name: 'Bangladesh', code: '+880' }, { name: 'Barbados', code: '+1-246' },
      { name: 'Belarus', code: '+375' }, { name: 'Belgium', code: '+32' }, { name: 'Belize', code: '+501' },
      { name: 'Benin', code: '+229' }, { name: 'Bhutan', code: '+975' }, { name: 'Bolivia', code: '+591' },
      { name: 'Bosnia and Herzegovina', code: '+387' }, { name: 'Botswana', code: '+267' }, { name: 'Brazil', code: '+55' },
      { name: 'Brunei', code: '+673' }, { name: 'Bulgaria', code: '+359' }, { name: 'Burkina Faso', code: '+226' },
      { name: 'Burundi', code: '+257' }, { name: 'Cambodia', code: '+855' }, { name: 'Cameroon', code: '+237' },
      { name: 'Canada', code: '+1' }, { name: 'Cape Verde', code: '+238' }, { name: 'Central African Republic', code: '+236' },
      { name: 'Chad', code: '+235' }, { name: 'Chile', code: '+56' }, { name: 'China', code: '+86' },
      { name: 'Colombia', code: '+57' }, { name: 'Comoros', code: '+269' }, { name: 'Congo (Brazzaville)', code: '+242' },
      { name: 'Congo (Kinshasa)', code: '+243' }, { name: 'Costa Rica', code: '+506' }, { name: 'Croatia', code: '+385' },
      { name: 'Cuba', code: '+53' }, { name: 'Cyprus', code: '+357' }, { name: 'Czech Republic', code: '+420' },
      { name: 'Denmark', code: '+45' }, { name: 'Djibouti', code: '+253' }, { name: 'Dominica', code: '+1-767' },
      { name: 'Dominican Republic', code: '+1-809' }, { name: 'Ecuador', code: '+593' }, { name: 'Egypt', code: '+20' },
      { name: 'El Salvador', code: '+503' }, { name: 'Equatorial Guinea', code: '+240' }, { name: 'Eritrea', code: '+291' },
      { name: 'Estonia', code: '+372' }, { name: 'Eswatini', code: '+268' }, { name: 'Ethiopia', code: '+251' },
      { name: 'Fiji', code: '+679' }, { name: 'Finland', code: '+358' }, { name: 'France', code: '+33' },
      { name: 'Gabon', code: '+241' }, { name: 'Gambia', code: '+220' }, { name: 'Georgia', code: '+995' },
      { name: 'Germany', code: '+49' }, { name: 'Ghana', code: '+233' }, { name: 'Greece', code: '+30' },
      { name: 'Grenada', code: '+1-473' }, { name: 'Guatemala', code: '+502' }, { name: 'Guinea', code: '+224' },
      { name: 'Guinea-Bissau', code: '+245' }, { name: 'Guyana', code: '+592' }, { name: 'Haiti', code: '+509' },
      { name: 'Honduras', code: '+504' }, { name: 'Hungary', code: '+36' }, { name: 'Iceland', code: '+354' },
      { name: 'India', code: '+91' }, { name: 'Indonesia', code: '+62' }, { name: 'Iran', code: '+98' },
      { name: 'Iraq', code: '+964' }, { name: 'Ireland', code: '+353' }, { name: 'Israel', code: '+972' },
      { name: 'Italy', code: '+39' }, { name: 'Ivory Coast', code: '+225' }, { name: 'Jamaica', code: '+1-876' },
      { name: 'Japan', code: '+81' }, { name: 'Jordan', code: '+962' }, { name: 'Kazakhstan', code: '+7' },
      { name: 'Kenya', code: '+254' }, { name: 'Kiribati', code: '+686' }, { name: 'Kuwait', code: '+965' },
      { name: 'Kyrgyzstan', code: '+996' }, { name: 'Laos', code: '+856' }, { name: 'Latvia', code: '+371' },
      { name: 'Lebanon', code: '+961' }, { name: 'Lesotho', code: '+266' }, { name: 'Liberia', code: '+231' },
      { name: 'Libya', code: '+218' }, { name: 'Liechtenstein', code: '+423' }, { name: 'Lithuania', code: '+370' },
      { name: 'Luxembourg', code: '+352' }, { name: 'Madagascar', code: '+261' }, { name: 'Malawi', code: '+265' },
      { name: 'Malaysia', code: '+60' }, { name: 'Maldives', code: '+960' }, { name: 'Mali', code: '+223' },
      { name: 'Malta', code: '+356' }, { name: 'Marshall Islands', code: '+692' }, { name: 'Mauritania', code: '+222' },
      { name: 'Mauritius', code: '+230' }, { name: 'Mexico', code: '+52' }, { name: 'Micronesia', code: '+691' },
      { name: 'Moldova', code: '+373' }, { name: 'Monaco', code: '+377' }, { name: 'Mongolia', code: '+976' },
      { name: 'Montenegro', code: '+382' }, { name: 'Morocco', code: '+212' }, { name: 'Mozambique', code: '+258' },
      { name: 'Myanmar', code: '+95' }, { name: 'Namibia', code: '+264' }, { name: 'Nauru', code: '+674' },
      { name: 'Nepal', code: '+977' }, { name: 'Netherlands', code: '+31' }, { name: 'New Zealand', code: '+64' },
      { name: 'Nicaragua', code: '+505' }, { name: 'Niger', code: '+227' }, { name: 'Nigeria', code: '+234' },
      { name: 'North Korea', code: '+850' }, { name: 'North Macedonia', code: '+389' }, { name: 'Norway', code: '+47' },
      { name: 'Oman', code: '+968' }, { name: 'Pakistan', code: '+92' }, { name: 'Palau', code: '+680' },
      { name: 'Panama', code: '+507' }, { name: 'Papua New Guinea', code: '+675' }, { name: 'Paraguay', code: '+595' },
      { name: 'Peru', code: '+51' }, { name: 'Philippines', code: '+63' }, { name: 'Poland', code: '+48' },
      { name: 'Portugal', code: '+351' }, { name: 'Qatar', code: '+974' }, { name: 'Romania', code: '+40' },
      { name: 'Russia', code: '+7' }, { name: 'Rwanda', code: '+250' }, { name: 'Saint Kitts and Nevis', code: '+1-869' },
      { name: 'Saint Lucia', code: '+1-758' }, { name: 'Saint Vincent and the Grenadines', code: '+1-784' },
      { name: 'Samoa', code: '+685' }, { name: 'San Marino', code: '+378' }, { name: 'Sao Tome and Principe', code: '+239' },
      { name: 'Saudi Arabia', code: '+966' }, { name: 'Senegal', code: '+221' }, { name: 'Serbia', code: '+381' },
      { name: 'Seychelles', code: '+248' }, { name: 'Sierra Leone', code: '+232' }, { name: 'Singapore', code: '+65' },
      { name: 'Slovakia', code: '+421' }, { name: 'Slovenia', code: '+386' }, { name: 'Solomon Islands', code: '+677' },
      { name: 'Somalia', code: '+252' }, { name: 'South Africa', code: '+27' }, { name: 'South Korea', code: '+82' },
      { name: 'South Sudan', code: '+211' }, { name: 'Spain', code: '+34' }, { name: 'Sri Lanka', code: '+94' },
      { name: 'Sudan', code: '+249' }, { name: 'Suriname', code: '+597' }, { name: 'Sweden', code: '+46' },
      { name: 'Switzerland', code: '+41' }, { name: 'Syria', code: '+963' }, { name: 'Taiwan', code: '+886' },
      { name: 'Tajikistan', code: '+992' }, { name: 'Tanzania', code: '+255' }, { name: 'Thailand', code: '+66' },
      { name: 'Togo', code: '+228' }, { name: 'Tonga', code: '+676' }, { name: 'Trinidad and Tobago', code: '+1-868' },
      { name: 'Tunisia', code: '+216' }, { name: 'Turkey', code: '+90' }, { name: 'Turkmenistan', code: '+993' },
      { name: 'Tuvalu', code: '+688' }, { name: 'Uganda', code: '+256' }, { name: 'Ukraine', code: '+380' },
      { name: 'United Arab Emirates', code: '+971' }, { name: 'United Kingdom', code: '+44' }, { name: 'United States', code: '+1' },
      { name: 'Uruguay', code: '+598' }, { name: 'Uzbekistan', code: '+998' }, { name: 'Vanuatu', code: '+678' },
      { name: 'Vatican City', code: '+379' }, { name: 'Venezuela', code: '+58' }, { name: 'Vietnam', code: '+84' },
      { name: 'Yemen', code: '+967' }, { name: 'Zambia', code: '+260' }, { name: 'Zimbabwe', code: '+263' },
    ],
    [],
  );

  const codes = useMemo(
    () => Array.from(new Set(countries.map((c) => c.code))).sort((a, b) => a.localeCompare(b)).map((code) => ({ code })),
    [countries],
  );

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [name]: value };
      return next;
    });
  };

  const handleCountryChange = (index: number, value: string) => {
    const found = countries.find((c) => c.name === value);
    setFormData((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        country: value,
        countryCode: found?.code || next[index].countryCode,
      };
      return next;
    });
  };

  const emailMismatch =
    formData.length > 0 &&
    !!formData[0].confirmedEmail &&
    formData[0].email !== formData[0].confirmedEmail;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailMismatch) return;

    const allFieldsFilled = formData.every((data, index) => {
      if (index === 0) {
        return Boolean(
          data.firstName?.trim() &&
            data.lastName?.trim() &&
            data.email?.trim() &&
            data.confirmedEmail?.trim() &&
            data.country?.trim() &&
            data.countryCode?.trim() &&
            data.phone?.trim() &&
            data.package?.trim() &&
            data.room?.trim(),
        );
      }
      return Boolean(
        data.firstName?.trim() && data.lastName?.trim() && data.package?.trim() && data.room?.trim(),
      );
    });

    if (!allFieldsFilled) {
      setAlertMessage('Please fill in all required fields.');
      setShowAlert(true);
      return;
    }

    setIsLoading(true);
    const bookingData = {
      selectedCamp,
      dateRange,
      selectedPackages,
      selectedRooms,
      addons: selectedAddons,
      totalPrice,
      travellerInfo: formData,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);

      if (response.status === 201) {
        try {
          await axios.post(`${API_BASE_URL}/bookings/send-confirmation`, bookingData);
        } catch (emailError) {
          console.error('Confirmation email failed:', emailError);
        }
        const ok1 = storageHelpers.safeSetItem('travellerInfo', formData);
        const ok2 = storageHelpers.safeSetItem('isSubmitted', true);

        let successMessage =
          'Thank you for your booking request. We will contact you via email within 24 hours.';
        if (!ok1 || !ok2) {
          successMessage += ' (Note: Some preferences could not be saved locally due to browser restrictions)';
        }
        setAlertMessage(successMessage);
        setShowAlert(true);
        setShouldReload(true);
      } else {
        setAlertMessage('Failed to save booking. Please try again.');
        setShouldReload(false);
        setShowAlert(true);
      }
    } catch (error: any) {
      console.error('Error saving booking:', error.response?.data || error.message);

      let errorMessage = 'Error saving booking. Please try again.';
      if (error.response?.data?.error) {
        errorMessage = `Booking issue: ${error.response.data.error}`;
      } else if (error.response) {
        if (error.response.status >= 500) {
          errorMessage = 'Our servers are temporarily unavailable. Please try again in a few minutes.';
        } else if (error.response.status === 404) {
          errorMessage = 'Booking service is currently unavailable. Please try again later.';
        } else {
          errorMessage = 'Server error occurred. Please try again.';
        }
      } else if (error.request) {
        if (!navigator.onLine) {
          errorMessage = 'You appear to be offline. Please check your internet connection and try again.';
        } else if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
          errorMessage = 'Request timed out. This might be due to a slow internet connection or server issues.';
        } else if (error.message === 'Network Error') {
          errorMessage =
            'Network connection failed. This could be due to:\n• Poor internet connection\n• Firewall or VPN blocking the request\n• Server maintenance\n\nPlease check your connection and try again.';
        } else {
          errorMessage = 'Network connection issue. Please check your internet connection and try again.';
        }
      } else {
        errorMessage = 'An unexpected error occurred. Please try again.';
      }
      if (error.message?.includes('localStorage') || error.message?.includes('quota')) {
        errorMessage = 'Booking completed! There was a minor issue saving your preferences, but your booking was successful.';
      }
      setAlertMessage(errorMessage);
      setShouldReload(false);
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const traveller = formData[0] || ({} as Traveller);
  const hasPickup = selectedAddons.some((a) => a.title === 'Airport Pick-up');
  const hasDrop = selectedAddons.some((a) => a.title === 'Airport Drop');

  return (
    <>
      <BookingNavbar />

      <main className="min-h-screen bg-gradient-to-b from-white via-cyan-50/30 to-white pt-[110px] sm:pt-[120px] pb-[130px] sm:pb-[140px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-7 sm:mb-9 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-700">
              <span className="block w-5 h-px bg-cyan-500" />
              Booking · Final Step
              <span className="block w-5 h-px bg-cyan-500" />
            </span>
            <h1 className="mt-1.5 font-[montserrat] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
              Contact Details
            </h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
              className="mt-3 flex justify-center"
            >
              <span className="block h-[3px] w-12 sm:w-14 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
            </motion.div>
            <p className="mt-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
              Just one more step - tell us how to reach you, and we'll send your payment link within 24 hours.
            </p>
          </motion.div>

          {/* Booking banner */}
          {personCount > 0 && (
            <motion.div
              className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-br from-cyan-50/60 via-white to-white ring-1 ring-cyan-100/70 shadow-sm px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Users className="w-4 h-4 text-cyan-700" strokeWidth={2.25} />
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">
                  Guests
                </span>
                <span className="font-[montserrat] font-bold text-gray-800 tabular-nums">
                  {personCount}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 text-cyan-700" strokeWidth={2.25} />
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">
                  Camp
                </span>
                <span className="font-[montserrat] font-bold text-gray-800">
                  {selectedCamp || '-'}
                </span>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {/* LEFT - Form sections */}
            <motion.div
              className="lg:col-span-8 space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Contact Details */}
                <FormCard icon={User} eyebrow="Step 01" title="Contact Details">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InputField
                      icon={User}
                      label="First Name"
                      type="text"
                      name="firstName"
                      value={traveller.firstName || ''}
                      onChange={(e) => handleChange(0, e)}
                      placeholder="First name"
                      required
                    />
                    <InputField
                      icon={User}
                      label="Last Name"
                      type="text"
                      name="lastName"
                      value={traveller.lastName || ''}
                      onChange={(e) => handleChange(0, e)}
                      placeholder="Last name"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    <InputField
                      icon={Mail}
                      label="Email"
                      type="email"
                      name="email"
                      value={traveller.email || ''}
                      onChange={(e) => handleChange(0, e)}
                      placeholder="name@example.com"
                    />
                    <div>
                      <InputField
                        icon={Mail}
                        label="Confirm Email"
                        type="email"
                        name="confirmedEmail"
                        value={traveller.confirmedEmail || ''}
                        onChange={(e) => handleChange(0, e)}
                        placeholder="Re-enter email"
                        onPaste={(e) => e.preventDefault()}
                        onDrop={(e) => e.preventDefault()}
                        error={emailMismatch}
                      />
                      {emailMismatch && (
                        <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" strokeWidth={2.5} />
                          Emails don't match.
                        </p>
                      )}
                    </div>
                  </div>
                </FormCard>

                {/* Country & Phone */}
                <FormCard icon={Globe} eyebrow="Step 02" title="Country & Phone">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-6">
                      <SelectField
                        icon={Globe}
                        label="Country"
                        name="country"
                        value={traveller.country || ''}
                        onChange={(e) => handleCountryChange(0, e.target.value)}
                      >
                        <option value="">Select country</option>
                        {countries.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </SelectField>
                    </div>
                    <div className="sm:col-span-3">
                      <SelectField
                        icon={Hash}
                        label="Code"
                        name="countryCode"
                        value={traveller.countryCode || ''}
                        onChange={(e) => handleChange(0, e)}
                      >
                        <option value="">Code</option>
                        {codes.map((cc) => (
                          <option key={cc.code} value={cc.code}>
                            {cc.code}
                          </option>
                        ))}
                      </SelectField>
                    </div>
                    <div className="sm:col-span-3">
                      <InputField
                        icon={Phone}
                        label="Phone"
                        type="tel"
                        name="phone"
                        value={traveller.phone || ''}
                        onChange={(e) => handleChange(0, e)}
                        placeholder="712345678"
                      />
                    </div>
                  </div>
                </FormCard>

                {/* Your Selections (read-only) - shows ALL packages + ALL rooms
                    selected in earlier steps, not just the first traveller's. */}
                <FormCard icon={PackageIcon} eyebrow="Step 03" title="Your Selections">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold tracking-[0.18em] uppercase text-cyan-700 mb-1.5">
                        Surf Packages
                      </label>
                      <ul className="space-y-1.5 rounded-xl bg-cyan-50/40 ring-1 ring-cyan-100 px-3 py-2.5">
                        {selectedPackages.length > 0 ? (
                          selectedPackages.map((pkg, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-gray-800"
                            >
                              <PackageIcon
                                className="w-4 h-4 mt-0.5 text-cyan-600 shrink-0"
                                strokeWidth={2}
                              />
                              <span>{pkg}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-gray-400">Auto-filled</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold tracking-[0.18em] uppercase text-cyan-700 mb-1.5">
                        Rooms
                      </label>
                      <ul className="space-y-1.5 rounded-xl bg-cyan-50/40 ring-1 ring-cyan-100 px-3 py-2.5">
                        {selectedRooms.length > 0 ? (
                          selectedRooms.map((room, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-gray-800"
                            >
                              <BedDouble
                                className="w-4 h-4 mt-0.5 text-cyan-600 shrink-0"
                                strokeWidth={2}
                              />
                              <span>{room}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-gray-400">Auto-filled</li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] text-gray-500 flex items-center gap-1.5">
                    <Info className="w-3 h-3 text-cyan-500" strokeWidth={2.5} />
                    These fields are set from your previous steps and can't be edited here.
                  </p>
                </FormCard>

                {/* Arrival info (if addon selected) */}
                {hasPickup && (
                  <FormCard icon={PlaneLanding} eyebrow="Arrival" title="Arrival Information">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <InputField
                        icon={Hash}
                        label="Flight Number"
                        type="text"
                        name="arrivalFlightNumber"
                        value={traveller.arrivalFlightNumber || ''}
                        readOnly
                        placeholder="e.g. QR 654"
                      />
                      <InputField
                        icon={Calendar}
                        label="Flight Date"
                        type="date"
                        name="arrivalFlightDate"
                        value={traveller.arrivalFlightDate || ''}
                        readOnly
                      />
                      <InputField
                        icon={Clock}
                        label="Flight Time"
                        type="time"
                        name="arrivalFlightTime"
                        value={traveller.arrivalFlightTime || ''}
                        readOnly
                      />
                    </div>
                  </FormCard>
                )}

                {/* Departure info (if addon selected) */}
                {hasDrop && (
                  <FormCard icon={PlaneTakeoff} eyebrow="Departure" title="Departure Information">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <InputField
                        icon={Hash}
                        label="Flight Number"
                        type="text"
                        name="departureFlightNumber"
                        value={traveller.departureFlightNumber || ''}
                        readOnly
                        placeholder="e.g. QR 655"
                      />
                      <InputField
                        icon={Calendar}
                        label="Flight Date"
                        type="date"
                        name="departureFlightDate"
                        value={traveller.departureFlightDate || ''}
                        readOnly
                      />
                      <InputField
                        icon={Clock}
                        label="Flight Time"
                        type="time"
                        name="departureFlightTime"
                        value={traveller.departureFlightTime || ''}
                        readOnly
                      />
                    </div>
                  </FormCard>
                )}

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitted || isLoading || emailMismatch}
                    className={`group inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
                      isSubmitted || isLoading || emailMismatch
                        ? 'bg-gray-100 text-gray-400 ring-1 ring-gray-200 cursor-not-allowed'
                        : 'bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white shadow-lg shadow-[#0a67b3]/30 hover:shadow-xl hover:shadow-[#0a67b3]/50 hover:scale-[1.02] active:scale-100'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        Submitting…
                        <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                      </>
                    ) : isSubmitted ? (
                      <>
                        Booking Request Submitted
                        <Check className="w-4 h-4" strokeWidth={2.5} />
                      </>
                    ) : (
                      <>
                        Submit Booking Request
                        <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.25} />
                      </>
                    )}
                  </button>

                  <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-cyan-50/50 ring-1 ring-cyan-100/60 px-3.5 py-3">
                    <Info className="w-4 h-4 mt-0.5 text-cyan-700 shrink-0" strokeWidth={2.25} />
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Once your booking request is submitted, we will verify availability and send you a <strong>payment link within 24 hours</strong> to confirm your reservation.
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>

            {/* RIGHT - Summary aside */}
            <motion.aside
              className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
            >
              <div className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-md overflow-hidden">
                <Summary
                  dateRange={dateRange}
                  selectedPackages={selectedPackages}
                  selectedRooms={selectedRooms}
                  totalPrice={totalPrice}
                  addons={selectedAddons}
                />
              </div>
            </motion.aside>
          </div>
        </div>
      </main>

      {/* Alert Modal */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowAlert(false);
              if (shouldReload) window.location.reload();
            }}
          >
            <motion.div
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-gray-200"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full ${
                  shouldReload
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {shouldReload ? (
                    <Check className="w-5 h-5" strokeWidth={2.5} />
                  ) : (
                    <AlertCircle className="w-5 h-5" strokeWidth={2.5} />
                  )}
                </div>
                <p className="flex-1 text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                  {alertMessage}
                </p>
              </div>
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowAlert(false);
                    if (shouldReload) window.location.reload();
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white text-sm font-semibold shadow-md shadow-cyan-500/25 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  OK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingFooter />
    </>
  );
};

/* ---------------- FormCard ---------------- */
const FormCard = ({
  icon: Icon,
  eyebrow,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    layout
    className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-md p-5 sm:p-6"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/25">
        <Icon className="w-4 h-4 text-white" strokeWidth={2.25} />
      </div>
      <div>
        <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
          {eyebrow}
        </span>
        <h3 className="font-[montserrat] text-sm sm:text-base font-bold tracking-tight text-gray-800 leading-tight">
          {title}
        </h3>
      </div>
    </div>
    {children}
  </motion.div>
);

/* ---------------- InputField ---------------- */
const InputField = ({
  icon: Icon,
  label,
  error,
  readOnly,
  ...inputProps
}: {
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  error?: boolean;
  readOnly?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-1">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon
          className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none ${
            readOnly ? 'text-gray-300' : 'text-cyan-500'
          }`}
          strokeWidth={2.25}
        />
      )}
      <input
        {...inputProps}
        readOnly={readOnly}
        className={`w-full rounded-xl py-2.5 text-xs sm:text-sm shadow-sm ring-1 transition-all duration-200 focus:outline-none focus:ring-2 ${
          Icon ? 'pl-8 pr-3' : 'px-3'
        } ${
          error
            ? 'bg-white ring-red-300 focus:ring-red-300 text-gray-800'
            : readOnly
            ? 'bg-gray-50 ring-gray-200 text-gray-600 cursor-not-allowed'
            : 'bg-white ring-gray-200 hover:ring-gray-300 focus:ring-cyan-300 text-gray-800'
        }`}
      />
    </div>
  </div>
);

/* ---------------- SelectField ---------------- */
const SelectField = ({
  icon: Icon,
  label,
  children,
  ...selectProps
}: {
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div>
    <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-1">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cyan-500 pointer-events-none"
          strokeWidth={2.25}
        />
      )}
      <select
        {...selectProps}
        className={`w-full appearance-none rounded-xl py-2.5 text-xs sm:text-sm shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition-all duration-200 ${
          Icon ? 'pl-8 pr-8' : 'pl-3 pr-8'
        } ${selectProps.value ? 'text-gray-800' : 'text-gray-400'} bg-white`}
      >
        {children}
      </select>
      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
    </div>
  </div>
);

export default Information;
