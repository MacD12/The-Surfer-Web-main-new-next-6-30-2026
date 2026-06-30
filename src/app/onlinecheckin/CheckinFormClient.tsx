'use client';
import { useEffect, useRef, useState, useCallback } from 'react'
import axios from 'axios'
import { Save, Download, Upload, Eraser, Calendar, User, Package, Gauge, Waves, ClipboardList, PenLine, CheckCircle } from 'lucide-react'
import { API_BASE_URL } from '@/lib/api'

// jspdf (~250 KiB gz), html2canvas (~50 KiB gz) and browser-image-compression
// (~30 KiB gz) are loaded on demand inside the handlers below so the initial
// check-in page bundle doesn't include them.

const initialData = {
  checkinDate: '', checkoutDate: '', name: '', address: '', passportNumber: '', country: '', mobile: '',
  emergencyContact: '', emergencyRelation: '', email: '', dob: { mm: '', dd: '', yyyy: '' },
  package: '', experience: '',
  swimmingAbility: { m50: false, m100: false, m400: false, cantSwim: false },
  dietary: '', readAgreeMedia: false, finalAgree: false
}

// Validation patterns
const EMAIL_REGEX = /^\S+@\S+\.\S+$/
const PHONE_REGEX = /^\+?\d[\d\s-]{5,}$/

// Shared input styling — premium, on brand (cyan focus ring).
const FIELD =
  'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors'

// FormField Component (single definition outside main component)
function FormField({
  label,
  error,
  required = false,
  className = '',
  children,
  htmlFor
}) {
  return (
    <div className={className}>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
        {error && <div className="text-xs text-red-600 mt-1 font-semibold normal-case tracking-normal">{error}</div>}
      </label>
      {children}
    </div>
  )
}

// Section wrapper — premium card with gradient icon chip header.
function Section({ title, icon, children }) {
  return (
    <section className="bg-white rounded-[28px] border border-slate-100 ring-1 ring-slate-900/5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_50px_-30px_rgba(2,132,199,0.3)] p-6 sm:p-7">
      <div className="flex items-center gap-3 mb-6">
        <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#0a67b3] to-cyan-500 text-white shadow-md shadow-cyan-500/30">
          {icon}
        </span>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </section>
  )
}

export default function CheckinForm() {
  const [data, setData] = useState(initialData)
  const [passportFile, setPassportFile] = useState(null)
  const [passportPreview, setPassportPreview] = useState(null)
  const [passportIsImage, setPassportIsImage] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const signatureTouched = useRef(false)
  const [submitted, setSubmitted] = useState(false)

  // Memoized validation function
  const validate = useCallback(() => {
    const e = {}
    const req = v => v !== undefined && v !== null && String(v).trim().length > 0

    if (!req(data.checkinDate)) e.checkinDate = 'Required'
    if (!req(data.checkoutDate)) e.checkoutDate = 'Required'
    if (!req(data.name)) e.name = 'Required'
    if (!req(data.address)) e.address = 'Required'
    if (!req(data.passportNumber)) e.passportNumber = 'Required'
    if (!passportFile) e.passport = 'Passport BIO page required'
    if (passportFile && !(passportFile.type.startsWith('image/') || passportFile.type === 'application/pdf')) {
      e.passport = 'Only image or PDF allowed'
    }
    if (!req(data.country)) e.country = 'Required'
    if (!PHONE_REGEX.test(data.mobile || '')) e.mobile = 'Use +countrycode number'
    if (!PHONE_REGEX.test(data.emergencyContact || '')) e.emergencyContact = 'Use +countrycode number'
    if (!req(data.emergencyRelation)) e.emergencyRelation = 'Required'
    if (!EMAIL_REGEX.test(data.email || '')) e.email = 'Invalid email'

    // Date validation
    const mm = parseInt(data.dob.mm)
    const dd = parseInt(data.dob.dd)
    const yyyy = parseInt(data.dob.yyyy)
    const isValidDate = mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31 && yyyy >= 1900 && yyyy <= new Date().getFullYear()
    if (!(data.dob.mm && data.dob.dd && data.dob.yyyy && isValidDate)) e.dob = 'Valid date required'

    if (!req(data.package)) e.package = 'Select one'
    if (!req(data.experience)) e.experience = 'Select one'
    if (!Object.values(data.swimmingAbility).some(v => v)) e.swim = 'Select at least one'
    if (!data.readAgreeMedia) e.readAgreeMedia = 'Required'
    if (!data.finalAgree) e.finalAgree = 'Required'
    if (!signatureTouched.current) e.signature = 'Signature required'

    setErrors(e)
    return Object.keys(e).length === 0
  }, [data, passportFile, signatureTouched.current])

  // Handle passport file upload
  const handlePassport = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Compression options
    const options = {
      maxSizeMB: 1, // target max size (e.g. 1MB)
      maxWidthOrHeight: 1920, // resize if bigger than 1920px
      useWebWorker: true,
    };

    try {
      const { default: imageCompression } = await import("browser-image-compression");
      const compressedFile = await imageCompression(file, options);
      setPassportFile(compressedFile);

      const isImg = compressedFile.type.startsWith("image/");
      setPassportIsImage(isImg);

      const reader = new FileReader();
      reader.onload = () => setPassportPreview(reader.result);
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Image compression failed:", error);
    }
  }, []);

  // Canvas setup
  useEffect(() => {
    const c = canvasRef.current
    if (!c) return

    const setupCanvas = () => {
      const ctx = c.getContext('2d')
      const dpr = window.devicePixelRatio || 1
      const rect = c.getBoundingClientRect()

      c.width = rect.width * dpr
      c.height = rect.height * dpr
      ctx.scale(dpr, dpr)

      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = '#0a67b3'
    }

    setupCanvas()

    // Handle resize
    const resizeObserver = new ResizeObserver(setupCanvas)
    resizeObserver.observe(c)

    return () => resizeObserver.disconnect()
  }, [])

  // Signature functions
  const pointerPos = useCallback((e) => {
    const r = canvasRef.current.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }, [])

  const onPointerDown = useCallback((e) => {
    e.preventDefault()
    drawing.current = true
    signatureTouched.current = true
    canvasRef.current.setPointerCapture?.(e.pointerId)
    const { x, y } = pointerPos(e)
    const ctx = canvasRef.current.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(x, y)
  }, [pointerPos])

  const onPointerMove = useCallback((e) => {
    if (!drawing.current) return
    e.preventDefault()
    const { x, y } = pointerPos(e)
    const ctx = canvasRef.current.getContext('2d')
    ctx.lineTo(x, y)
    ctx.stroke()
  }, [pointerPos])

  const onPointerUp = useCallback((e) => {
    if (!drawing.current) return
    e.preventDefault()
    drawing.current = false
    canvasRef.current.releasePointerCapture?.(e.pointerId)
  }, [])

  const clearCanvas = useCallback(() => {
    const c = canvasRef.current
    const ctx = c.getContext('2d')
    ctx.clearRect(0, 0, c.width, c.height)
    signatureTouched.current = false
  }, [])

  const getSignatureDataURL = useCallback(() => {
    return canvasRef.current.toDataURL('image/png')
  }, [])

  // Input handlers (memoized)
  const handleCheckinDate = useCallback((e) => {
    setData(prev => ({ ...prev, checkinDate: e.target.value }))
  }, [])

  const handleCheckoutDate = useCallback((e) => {
    setData(prev => ({ ...prev, checkoutDate: e.target.value }))
  }, [])

  const handleName = useCallback((e) => {
    setData(prev => ({ ...prev, name: e.target.value }))
  }, [])

  const handleAddress = useCallback((e) => {
    setData(prev => ({ ...prev, address: e.target.value }))
  }, [])

  const handlePassportNumber = useCallback((e) => {
    setData(prev => ({ ...prev, passportNumber: e.target.value }))
  }, [])

  const handleCountry = useCallback((e) => {
    setData(prev => ({ ...prev, country: e.target.value }))
  }, [])

  const handleMobile = useCallback((e) => {
    setData(prev => ({ ...prev, mobile: e.target.value }))
  }, [])

  const handleEmergencyContact = useCallback((e) => {
    setData(prev => ({ ...prev, emergencyContact: e.target.value }))
  }, [])

  const handleEmergencyRelation = useCallback((e) => {
    setData(prev => ({ ...prev, emergencyRelation: e.target.value }))
  }, [])

  const handleEmail = useCallback((e) => {
    setData(prev => ({ ...prev, email: e.target.value }))
  }, [])

  const handleDietary = useCallback((e) => {
    setData(prev => ({ ...prev, dietary: e.target.value }))
  }, [])

  const handleDOBChange = useCallback((field, value) => {
    if (value && !/^\d*$/.test(value)) return
    const limits = { mm: 2, dd: 2, yyyy: 4 }
    if (value.length > limits[field]) return
    setData(prev => ({
      ...prev,
      dob: { ...prev.dob, [field]: value }
    }))
  }, [])

  const handleDateInput = useCallback((field, value, nextField) => {
    handleDOBChange(field, value)
    if (value.length === (field === 'yyyy' ? 4 : 2) && nextField) {
      document.querySelector(`input[name="${nextField}"]`)?.focus()
    }
  }, [handleDOBChange])

  // Generate current date for date inputs max attribute
  const getCurrentDate = () => {
    const now = new Date()
    return now.toISOString().split('T')[0]
  }

  // PDF generation
  const downloadPDF = useCallback(async () => {
    if (!validate()) {
      alert('Please fix validation errors before downloading PDF')
      return
    }

    setIsDownloading(true)
    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas'),
      ])

      const esc = s => String(s ?? '').replace(/[&<>"']/g, m =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]))

      const fmtDOB = d => [d?.mm, d?.dd, d?.yyyy].filter(Boolean).join(' / ')
      const swim = Object.entries(data.swimmingAbility || {})
        .filter(([, v]) => v)
        .map(([k]) => k === 'm50' ? '50 METERS' : k === 'm100' ? '100 METERS' : k === 'm400' ? '400 METERS +' : "CAN'T SWIM")
        .join(', ')

      const nowStr = new Date().toLocaleString()

      let root = document.getElementById('pdf-root')
      if (!root) {
        root = document.createElement('div')
        root.id = 'pdf-root'
        root.style.position = 'absolute'
        root.style.left = '-9999px'
        document.body.appendChild(root)
      }
      root.innerHTML = ''

      // PDF Styles
      const styles = `
      <style>
        .pdf-page {
          width: 210mm;
          min-height: 297mm;
          padding: 20mm;
          margin: 0 auto;
          background: white;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
          font-size: 12px;
          line-height: 1.4;
          color: #333;
        }
        .pdf-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #2563eb;
        }
        .pdf-title {
          font-size: 18px;
          font-weight: bold;
          color: #1e40af;
        }
        .pdf-sub {
          font-size: 14px;
          color: #64748b;
          font-weight: 600;
        }
        .pdf-section-title {
          font-size: 16px;
          font-weight: bold;
          color: #1e293b;
          margin: 20px 0 15px 0;
          padding-bottom: 8px;
          border-bottom: 1px solid #e2e8f0;
        }
        .pdf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 15px;
        }
        .pdf-grid-1 {
          grid-column: 1 / -1;
        }
        .pdf-label {
          font-weight: 600;
          color: #475569;
          font-size: 11px;
          margin-bottom: 4px;
        }
        .pdf-value {
          padding: 8px 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          min-height: 20px;
          font-size: 11px;
        }
        .pdf-box {
          padding: 15px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #f8fafc;
          margin-bottom: 15px;
        }
        .pdf-kv {
          display: grid;
          gap: 10px;
        }
        .pdf-kv > div {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 15px;
          align-items: start;
        }
        .pdf-img {
          max-width: 100%;
          height: auto;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
        }
        .pdf-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          padding-top: 15px;
          border-top: 1px solid #e2e8f0;
          font-size: 10px;
          color: #64748b;
        }
        .pdf-page-break {
          page-break-after: always;
        }
      </style>
    `

      const p1 = document.createElement('div')
      p1.className = 'pdf-page'
      p1.innerHTML = styles + `
      <div class="pdf-header">
        <img src="https://thesurfersurfcamps.com/logo.png" style="width:36px;height:36px" />
        <div>
          <div class="pdf-title">The Surfer Surfcamp Sri Lanka</div>
          <div class="pdf-sub">OFFICIAL CHECK-IN FORM</div>
        </div>
      </div>
      <div class="pdf-section-title">Guest & Contact Information</div>
      <div class="pdf-grid">
        <div><div class="pdf-label">Check In</div><div class="pdf-value">${esc(data.checkinDate)}</div></div>
        <div><div class="pdf-label">Check Out</div><div class="pdf-value">${esc(data.checkoutDate)}</div></div>
        <div><div class="pdf-label">Name</div><div class="pdf-value">${esc(data.name)}</div></div>
        <div><div class="pdf-label">Date of Birth (MM / DD / YYYY)</div><div class="pdf-value">${esc(fmtDOB(data.dob))}</div></div>
        <div><div class="pdf-label">Country of Origin</div><div class="pdf-value">${esc(data.country)}</div></div>
        <div class="pdf-grid-1"><div class="pdf-label">Home Address</div><div class="pdf-value">${esc(data.address)}</div></div>
        <div><div class="pdf-label">Passport Number</div><div class="pdf-value">${esc(data.passportNumber)}</div></div>
        <div><div class="pdf-label">Email Address</div><div class="pdf-value">${esc(data.email)}</div></div>
        <div><div class="pdf-label">Mobile (+Country Code)</div><div class="pdf-value">${esc(data.mobile)}</div></div>
        <div><div class="pdf-label">Emergency Contact (+Country Code)</div><div class="pdf-value">${esc(data.emergencyContact)}</div></div>
        <div class="pdf-grid-1"><div class="pdf-label">Emergency Contact Person & Relation</div><div class="pdf-value">${esc(data.emergencyRelation)}</div></div>
      </div>
      <div class="pdf-section-title">Passport BIO Page</div>
      <div class="pdf-box">
        ${passportPreview && passportIsImage ?
          `<img class="pdf-img" src="${passportPreview}" style="max-width:100%;height:auto;" />` :
          `<div class="pdf-value">Attached file${passportPreview ? ' (PDF or non-image)' : ' (not provided)'}</div>`}
      </div>
      <div class="pdf-footer">
        <span>The Surfer - Official Check-in</span>
        <span>Generated: ${esc(nowStr)} • Page 1 / 2</span>
      </div>
    `
      root.appendChild(p1)

      const sig = getSignatureDataURL()
      const p2 = document.createElement('div')
      p2.className = 'pdf-page'
      p2.innerHTML = styles + `
      <div class="pdf-header">
        <img src="https://thesurfersurfcamps.com/logo.png" style="width:36px;height:36px" />
        <div>
          <div class="pdf-title">The Surfer Surfcamp Sri Lanka</div>
          <div class="pdf-sub">OFFICIAL CHECK-IN FORM</div>
        </div>
      </div>
      <div class="pdf-section-title">Surf Details</div>
      <div class="pdf-kv pdf-box">
        <div>
          <div class="pdf-label">Surf Package</div>
          <div class="pdf-value">${esc(data.package)}</div>
        </div>
        <div>
          <div class="pdf-label">Prior Surf Experience</div>
          <div class="pdf-value">${esc(data.experience)}</div>
        </div>
        <div>
          <div class="pdf-label">Swimming Ability</div>
          <div class="pdf-value">${esc(swim || '-')}</div>
        </div>
      </div>
      <div class="pdf-section-title">Diet & Consents</div>
      <div class="pdf-kv pdf-box">
        <div>
          <div class="pdf-label">Dietary Requirement</div>
          <div class="pdf-value">${esc(data.dietary || 'None')}</div>
        </div>
        <div>
          <div class="pdf-label">Media Consent</div>
          <div class="pdf-value">${data.readAgreeMedia ? 'Yes' : 'No'}</div>
        </div>
        <div>
          <div class="pdf-label">Final Declaration</div>
          <div class="pdf-value">${data.finalAgree ? 'Yes' : 'No'}</div>
        </div>
      </div>
      <div class="pdf-section-title">Signature</div>
      <div class="pdf-box">
        ${sig ? `<img class="pdf-img" style="max-height:120px;max-width:100%" src="${sig}" />` :
          `<div class="pdf-value">No signature captured.</div>`}
      </div>
      <div class="pdf-footer">
        <span>The Surfer - Official Check-in</span>
        <span>Generated: ${esc(nowStr)} • Page 2 / 2</span>
      </div>
    `
      root.appendChild(p2)

      const pdf = new jsPDF({
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      })

      for (const [index, page] of [p1, p2].entries()) {
        if (index > 0) pdf.addPage()

        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: '#ffffff',
          logging: false,
          width: p1.offsetWidth,
          height: p1.offsetHeight
        })

        const imgData = canvas.toDataURL('image/png', 1.0)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        // Calculate aspect ratio to maintain proportions
        const imgWidth = canvas.width
        const imgHeight = canvas.height
        const ratio = imgWidth / imgHeight
        let width = pdfWidth
        let height = pdfWidth / ratio

        if (height > pdfHeight) {
          height = pdfHeight
          width = pdfHeight * ratio
        }

        pdf.addImage(imgData, 'PNG', 0, 0, width, height, '', 'MEDIUM')
      }

      // Clean up
      document.body.removeChild(root)

      pdf.save(`The-Surfer-Checkin-${data.name.replace(/\s+/g, '-')}-${Date.now()}.pdf`)

    } catch (error) {
      console.error('PDF generation failed:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }, [data, passportPreview, passportIsImage, validate, getSignatureDataURL])

  // Form submission
  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const submitToServer = useCallback(async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("payload", JSON.stringify(data));

      // Convert signature from DataURL → File
      if (getSignatureDataURL()) {
        const signatureFile = dataURLtoFile(getSignatureDataURL(), "signature.png");
        formData.append("signature", signatureFile);
      }

      if (passportFile) formData.append("passport", passportFile);

      const res = await axios.post(API_BASE_URL + "/forms/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Submitted successfully!");
      setSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert(error.response?.data?.message || "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [data, passportFile, validate, getSignatureDataURL]);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault()
    if (validate()) {
      await submitToServer()
    } else {
      alert('Please fill all required fields before submitting')
    }
  }, [validate, submitToServer])

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 pb-24 overflow-hidden">
      {/* Decorative brand glow — purely cosmetic */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-32 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="relative max-w-2xl md:max-w-4xl mx-auto px-4 md:px-6 space-y-6 pt-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur rounded-[28px] border border-slate-100 ring-1 ring-slate-900/5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_50px_-30px_rgba(2,132,199,0.3)] px-5 sm:px-7 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left Section */}
            <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
              <img
                src="/logo.png"
                alt="The Surfer Logo"
                className="w-28 h-14 object-contain mx-auto md:mx-0"
              />
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
                  <span className="block w-4 h-px bg-cyan-500" />
                  Online Check-in
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">The Surfer Surfcamp Sri Lanka</h1>
              </div>
            </div>

            {/* Buttons */}
            <div className="hidden md:flex gap-2" data-pdf-hide="true">
              <button
                onClick={downloadPDF}
                disabled={isDownloading}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 cursor-pointer font-semibold text-slate-700 hover:border-cyan-400 hover:text-cyan-700 inline-flex items-center disabled:opacity-50 justify-center gap-2 transition-colors duration-200 disabled:cursor-not-allowed"
              >
                <Download size={16} /> {isDownloading ? "Preparing..." : "Download PDF"}
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || submitted}
                className="rounded-xl bg-gradient-to-r from-[#0a67b3] to-cyan-500 text-white px-6 py-3 font-semibold cursor-pointer shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-0.5 disabled:from-slate-400 disabled:to-slate-500 disabled:shadow-none disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 transition-all duration-200"
              >
                <Save size={16} /> {isSubmitting ? "Submitting..." : submitted ? "Submitted" : "Submit"}
              </button>
            </div>
          </div>
        </div>

        <form id="form-capture" className="space-y-6" onSubmit={handleSubmit}>
          {/* Guest Information Section */}
          <Section title="Guest Information" icon={<User className="w-5 h-5" />}>
            <div className="grid gap-6 md:grid-cols-2">

              <FormField label="CHECK IN" error={errors.checkinDate} required>
                <div className="relative">
                  <input
                    type="date"
                    className={`${FIELD} pr-10`}
                    value={data.checkinDate}
                    onChange={handleCheckinDate}
                    min={getCurrentDate()}
                  />
                </div>
              </FormField>

              <FormField label="CHECK OUT" error={errors.checkoutDate} required>
                <div className="relative">
                  <input
                    type="date"
                    className={`${FIELD} pr-10`}
                    value={data.checkoutDate}
                    onChange={handleCheckoutDate}
                    min={getCurrentDate()}
                  />
                </div>
              </FormField>

              <FormField label="FULL NAME" error={errors.name} required className="md:col-span-2">
                <input
                  className={FIELD}
                  value={data.name}
                  onChange={handleName}
                  placeholder="As shown on passport"
                />
              </FormField>

              <FormField label="COMPLETE ADDRESS" error={errors.address} required className="md:col-span-2">
                <input
                  className={FIELD}
                  value={data.address}
                  onChange={handleAddress}
                  placeholder="Street, City, State, Postal Code"
                />
              </FormField>

              <FormField label="PASSPORT NUMBER" error={errors.passportNumber} required>
                <input
                  className={FIELD}
                  value={data.passportNumber}
                  onChange={handlePassportNumber}
                  placeholder="e.g., AB1234567"
                />
              </FormField>

              <FormField label="PASSPORT BIO PAGE" error={errors.passport} required>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <label className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-3 font-semibold text-slate-700 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700 inline-flex items-center gap-2 cursor-pointer transition-colors duration-200">
                      <Upload size={16} /> Upload Passport
                      <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handlePassport} />
                    </label>
                    {passportPreview && <span className="inline-flex items-center gap-1 text-sm text-emerald-600 font-medium"><CheckCircle className="w-4 h-4" /> Uploaded</span>}
                  </div>
                  {passportPreview && (
                    passportIsImage ?
                      <img alt="Passport preview" src={passportPreview} className="w-full max-h-64 object-contain rounded-xl border-2 border-dashed border-slate-200 mt-2" /> :
                      <div className="bg-slate-50 rounded-xl p-4 mt-2 border border-slate-200">
                        <div className="text-sm text-slate-600">PDF document uploaded successfully</div>
                      </div>
                  )}
                </div>
              </FormField>

              <FormField label="COUNTRY OF ORIGIN" error={errors.country} required>
                <input
                  className={FIELD}
                  value={data.country}
                  onChange={handleCountry}
                  placeholder="e.g., United States"
                />
              </FormField>

              <FormField label="MOBILE NUMBER" error={errors.mobile} required>
                <input
                  className={FIELD}
                  value={data.mobile}
                  onChange={handleMobile}
                  placeholder="+94 77 123 4567"
                />
              </FormField>

              <FormField label="EMERGENCY CONTACT NUMBER" error={errors.emergencyContact} required>
                <input
                  className={FIELD}
                  value={data.emergencyContact}
                  onChange={handleEmergencyContact}
                  placeholder="+94 77 987 6543"
                />
              </FormField>

              <FormField label="EMERGENCY CONTACT DETAILS" error={errors.emergencyRelation} required className="md:col-span-2">
                <input
                  className={FIELD}
                  value={data.emergencyRelation}
                  onChange={handleEmergencyRelation}
                  placeholder="Full name and relationship (e.g., Sarah Johnson - Mother)"
                />
              </FormField>

              <FormField label="EMAIL ADDRESS" error={errors.email} required>
                <input
                  className={FIELD}
                  type="email"
                  value={data.email}
                  onChange={handleEmail}
                  placeholder="your.email@example.com"
                />
              </FormField>

              <FormField label="DATE OF BIRTH" error={errors.dob} required>
                <div className="space-y-2">
                  <div className="text-xs text-slate-400">Month / Day / Year</div>
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      name="dob-mm"
                      className={`${FIELD} text-center`}
                      placeholder="MM"
                      inputMode="numeric"
                      maxLength={2}
                      value={data.dob.mm}
                      onChange={e => handleDateInput('mm', e.target.value, 'dob-dd')}
                    />
                    <input
                      name="dob-dd"
                      className={`${FIELD} text-center`}
                      placeholder="DD"
                      inputMode="numeric"
                      maxLength={2}
                      value={data.dob.dd}
                      onChange={e => handleDateInput('dd', e.target.value, 'dob-yyyy')}
                    />
                    <input
                      name="dob-yyyy"
                      className={`${FIELD} text-center`}
                      placeholder="YYYY"
                      inputMode="numeric"
                      maxLength={4}
                      value={data.dob.yyyy}
                      onChange={e => handleDOBChange('yyyy', e.target.value)}
                    />
                  </div>
                </div>
              </FormField>
            </div>
          </Section>

          {/* Surf Package Selection */}
          <Section title="Surf package You Have Booked" icon={<Package className="w-5 h-5" />}>
            {errors.package && <div className="text-sm text-red-600 font-medium bg-red-50 px-3 py-2 rounded-lg mb-4">{errors.package}</div>}
            <div className="space-y-3">
              {[
                { value: 'FULL SURF LESSON PACKAGE', desc: '11 surf sessions' },
                { value: 'MODERATE SURF GUIDING PACKAGE', desc: '06 surf guiding sessions - for intermediate plus to Advance surfers' },
                { value: 'MODERATE SURF LESSON PACKAGE', desc: '6 surf lessons' },
                { value: 'SURF AND YOGA PACKAGE', desc: '6 surf lessons + daily yoga sessions' }
              ].map(pkg => {
                const active = data.package === pkg.value
                return (
                  <label key={pkg.value} className={`flex items-start gap-3 p-4 border rounded-2xl cursor-pointer transition-all duration-200 ${active ? 'border-cyan-500 bg-cyan-50/60 ring-1 ring-cyan-500/30' : 'border-slate-200 hover:border-cyan-300 hover:bg-slate-50'}`}>
                    <input
                      type="radio"
                      name="package"
                      className='mt-1 w-4 h-4 accent-cyan-600'
                      checked={data.package === pkg.value}
                      onChange={() => setData(prev => ({ ...prev, package: pkg.value }))}
                    />
                    <div>
                      <span className="font-semibold text-slate-900">{pkg.value.split(' (')[0]}</span>
                      {pkg.desc && <span className="text-slate-500 text-sm block mt-1">{pkg.desc}</span>}
                    </div>
                  </label>
                )
              })}
            </div>
          </Section>

          {/* Surf Experience */}
          <Section title="Surf Experience Level" icon={<Gauge className="w-5 h-5" />}>
            {errors.experience && <div className="text-sm text-red-600 font-medium bg-red-50 px-3 py-2 rounded-lg mb-4">{errors.experience}</div>}
            <div className="space-y-3">
              {[
                {
                  level: 'BEGINNER',
                  desc: 'Complete beginner or only surfed a few times. Learning basics of paddling, standing up, and wave catching.'
                },
                {
                  level: 'BEGINNER TO INTERMEDIATE',
                  desc: 'Can paddle confidently, catch green waves, and perform turtle rolls. Working on turning and wave selection.'
                },
                {
                  level: 'INTERMEDIATE',
                  desc: 'Can catch green waves independently and perform basic turns (left & right). Comfortable in 2-4 foot waves.'
                },
                {
                  level: 'INTERMEDIATE PLUS TO ADVANCED',
                  desc: 'Experienced in reef breaks, confident surfing up to 6 foot waves. Working on advanced maneuvers and barrel riding.'
                }
              ].map(exp => {
                const active = data.experience === exp.level
                return (
                  <label key={exp.level} className={`flex items-start gap-3 p-4 border rounded-2xl cursor-pointer transition-all duration-200 ${active ? 'border-cyan-500 bg-cyan-50/60 ring-1 ring-cyan-500/30' : 'border-slate-200 hover:border-cyan-300 hover:bg-slate-50'}`}>
                    <input
                      type="radio"
                      name="experience"
                      className='mt-1 w-4 h-4 accent-cyan-600'
                      checked={data.experience === exp.level}
                      onChange={() => setData(prev => ({ ...prev, experience: exp.level }))}
                    />
                    <div>
                      <span className="font-semibold text-slate-900">{exp.level}</span>
                      <span className="text-slate-500 text-sm block mt-1">{exp.desc}</span>
                    </div>
                  </label>
                )
              })}
            </div>
          </Section>

          {/* Swimming Ability */}
          <Section title="Swimming Ability Assessment *" icon={<Waves className="w-5 h-5" />}>
            {errors.swim && <div className="text-sm text-red-600 font-medium bg-red-50 px-3 py-2 rounded-lg mb-4">{errors.swim}</div>}
            <div className="grid gap-3 md:grid-cols-2">
              {[
                { key: 'm50', label: '50 Meters Confidently' },
                { key: 'm100', label: '100 Meters Comfortably' },
                { key: 'm400', label: '400+ Meters (Strong Swimmer)' },
                { key: 'cantSwim', label: 'Non-Swimmer / Beginner' }
              ].map(opt => {
                const active = data.swimmingAbility[opt.key]
                return (
                  <label key={opt.key} className={`flex items-center gap-3 p-3.5 border rounded-2xl cursor-pointer transition-all duration-200 ${active ? 'border-cyan-500 bg-cyan-50/60' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <input
                      type="checkbox"
                      className='w-4 h-4 accent-cyan-600'
                      checked={data.swimmingAbility[opt.key]}
                      onChange={() => setData(prev => ({
                        ...prev,
                        swimmingAbility: { ...prev.swimmingAbility, [opt.key]: !prev.swimmingAbility[opt.key] }
                      }))}
                    />
                    <span className="text-slate-700 font-medium">{opt.label}</span>
                  </label>
                )
              })}
            </div>
          </Section>

          {/* Dietary & Agreements */}
          <Section title="Dietary Requirements & Agreements" icon={<ClipboardList className="w-5 h-5" />}>
            <div className="space-y-6">
              <FormField label="DIETARY REQUIREMENTS & ALLERGIES">
                <input
                  className={FIELD}
                  value={data.dietary}
                  onChange={handleDietary}
                  placeholder="e.g., Vegetarian, nut allergy, gluten-free, lactose intolerant, etc."
                />
                <div className="text-xs text-slate-400 mt-1.5">Leave blank if no specific requirements</div>
                <div className="text-sm mt-1 text-red-500">Please inform our staff of your dietary requirements each time you place your food order.</div>
              </FormField>

              <div className="bg-amber-50 border border-amber-200/70 rounded-2xl p-5">
                <h3 className="font-semibold text-amber-900 mb-3">⚕️ Medical Conditions & Liability Waiver</h3>
                <div className="text-sm text-amber-800 space-y-2">
                  <p>The Customer hereby declares that the Customer does not suffer from any medical
                    condition which may prevent the Customer undertaking the surf camp, including but
                    not limited to acrophobia, epilepsy, dizziness, limb or back injury, angina or
                    other heart condition, severe or uncontrolled asthma, visual impairment,
                    depression or recovering from recent surgery.
                  </p>
                  <p>Customer agree that The Surfer Surfcamp not reliable for any injuries,
                    accidents can occur during customer training period neither a refund
                    because they re unable to complete their training course due to any
                    occurred medical conditions or accidents during their stay.
                    </p>
                    <p>
                      Customer agree that surf lessons may be cancelled due to weather or surf
                      conditions deemed unsafe or unsuitable . In such cases, I acknowledge that
                      no refund will be provided, and any rescheduling is subject to availability.
                    </p>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200/70 rounded-2xl p-5">
                <h3 className="font-semibold text-purple-900 mb-3">📸 Media Consent Agreement</h3>
                <div className="text-sm text-purple-800">
                  <p>I grant permission for photos and videos taken during my stay to be used for marketing purposes including website, social media, and promotional materials without additional compensation.</p>
                </div>
                <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/60 cursor-pointer transition-colors duration-200 mt-3">
                  <input
                    type="checkbox"
                    className='mt-1 w-4 h-4 accent-cyan-600'
                    checked={data.readAgreeMedia}
                    onChange={() => setData(prev => ({ ...prev, readAgreeMedia: !prev.readAgreeMedia }))}
                  />
                  <span className="text-slate-700">I understand and agree to the media consent terms</span>
                  {errors.readAgreeMedia && <div className="text-sm text-red-600 font-medium bg-red-50 px-3 py-2 rounded-lg ml-2">{errors.readAgreeMedia}</div>}
                </label>
              </div>

              <div className="bg-emerald-50 border border-emerald-200/70 rounded-2xl p-5">
                <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/60 cursor-pointer transition-colors duration-200">
                  <input
                    type="checkbox"
                    className='mt-1 w-4 h-4 accent-cyan-600'
                    checked={data.finalAgree}
                    onChange={() => setData(prev => ({ ...prev, finalAgree: !prev.finalAgree }))}
                  />
                  <span className="text-slate-700 font-medium">I agree to the terms and conditions above</span>
                  {errors.finalAgree && <div className="text-sm text-red-600 font-medium bg-red-50 px-3 py-2 rounded-lg ml-2">{errors.finalAgree}</div>}
                </label>
              </div>
            </div>
          </Section>

          {/* Digital Signature */}
          <Section title="Digital Signature" icon={<PenLine className="w-5 h-5" />}>
            <div className="space-y-3">
              <p className="text-slate-500 text-sm">Please sign in the box below using your mouse or touchscreen. Your signature will be included in your submission and the generated PDF.</p>
              {errors.signature && <div className="text-sm text-red-600 font-medium bg-red-50 px-3 py-2 rounded-lg">{errors.signature}</div>}

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <canvas
                  ref={canvasRef}
                  className="w-full h-64 bg-white rounded-xl border-2 border-dashed border-slate-300 touch-none"
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                />
                <div className="flex items-center justify-between mt-4">
                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 cursor-pointer font-semibold text-slate-700 hover:border-cyan-400 hover:text-cyan-700 inline-flex items-center justify-center gap-2 transition-colors duration-200"
                  >
                    <Eraser size={16} /> Clear Signature
                  </button>
                  <div className="text-sm text-slate-400">Signature will be saved as digital image</div>
                </div>
              </div>
            </div>
          </Section>
        </form>

        {/* Mobile Actions */}
        <div className="mobile-sticky-actions md:hidden" data-pdf-hide="true">
          <div className="grid grid-cols-2 gap-3 p-4 bg-white border-t border-slate-100">
            <button
              onClick={downloadPDF}
              disabled={isDownloading}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 hover:border-cyan-400 hover:text-cyan-700 inline-flex items-center cursor-pointer justify-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={16} /> {isDownloading ? 'Preparing...' : 'Download PDF'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || submitted}
              className="rounded-xl bg-gradient-to-r from-[#0a67b3] to-cyan-500 text-white px-5 py-3 font-semibold shadow-lg shadow-cyan-500/30 disabled:from-slate-400 disabled:to-slate-500 disabled:shadow-none disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 transition-all duration-200"
            >
              <Save size={16} /> {isSubmitting ? 'Submitting...' : submitted ? 'Submitted' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
