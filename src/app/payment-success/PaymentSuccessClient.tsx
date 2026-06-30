'use client';
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { CheckCircle2 as FaCheckCircle, FileDown as FaFileDownload, Home as FaHome } from "lucide-react";
import { API_BASE_URL } from '@/lib/api';

const PaymentSuccess = () => {
    const searchParams = useSearchParams();
    const bookingId = searchParams?.get("bookingId") ?? null;
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [emailSent, setEmailSent] = useState(false);
    const receiptRef = useRef(null);
    const router = useRouter();
    const hasRunRef = useRef(false);

    // 1. Fetch booking
    const fetchBooking = async () => {
        if (!bookingId) {
            setLoading(false);
            return;
        }
        
        try {
            const res = await axios.get(
                `${API_BASE_URL}/bookings/${bookingId}`
            );
            setBooking(res.data);
        } catch (err) {
            console.error("Error fetching booking:", err);
        } finally {
            setLoading(false);
        }
    };

    // 2. Send confirmation
    const sendConfirmation = async () => {
        if (!bookingId) return;
        
        try {
            await axios.post(
                `${API_BASE_URL}/bookings/send-paid-email`,
                { id: bookingId }
            );
            setEmailSent(true);
        } catch (err) {
            console.error("Failed to send paid email:", err);
        }
    };

    // 3. Screenshot and download as PDF.
    //    jspdf + html2canvas combined are ~350 KiB gzipped, so we only pull
    //    them in when the user actually triggers the receipt download.
    const downloadScreenshotPdf = async () => {
        const element = receiptRef.current;
        if (!element) return;

        const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
            import("html2canvas"),
            import("jspdf"),
        ]);

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            letterRendering: true,
        });

        const imgData = canvas.toDataURL("image/png", 1.0);

        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // Add margins
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Center the image on the page
        const xPos = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;
        
        pdf.addImage(imgData, "PNG", xPos, 10, pdfWidth, pdfHeight);
        pdf.save(`The-Surfer-Booking-${bookingId.slice(-6)}.pdf`);
    };

    useEffect(() => {
        if (bookingId && !hasRunRef.current) {
            hasRunRef.current = true;
            fetchBooking();
            sendConfirmation();

            // Automatically redirect to home after 60 seconds
            const timer = setTimeout(() => {
                router.push("/");
            }, 60000);

            return () => clearTimeout(timer);
        }
    }, [bookingId]);

    useEffect(() => {
        if (booking) {
            const timer = setTimeout(() => downloadScreenshotPdf(), 1500);
            return () => clearTimeout(timer);
        }
    }, [booking]);

    if (loading) return <div className="status-message">Loading payment details...</div>;
    if (!booking) return <div className="status-message error">Booking not found.</div>;

    const t = booking.travellerInfo?.[0] || {};
    const formattedDate = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-EU', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className="payment-success-container" style={{ 
            padding: "40px 20px", 
            fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif", 
            maxWidth: "1000px",
            margin: "0 auto",
            color: "#333"
        }}>
            <div style={{ 
                textAlign: "center", 
                marginBottom: "40px",
                padding: "20px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)"
            }}>
                <FaCheckCircle style={{ 
                    fontSize: "60px", 
                    color: "#28a745", 
                    marginBottom: "15px" 
                }} />
                <h1 style={{ 
                    color: "#2c3e50", 
                    marginBottom: "10px",
                    fontWeight: "600"
                }}>
                    Payment Successful
                </h1>
                <p style={{ 
                    fontSize: "18px", 
                    color: "#555",
                    marginBottom: "20px"
                }}>
                    Thank you for your booking, <strong>{t.firstName} {t.lastName}</strong>.
                </p>
                
                <div style={{ 
                    display: "flex", 
                    justifyContent: "center",
                    gap: "15px",
                    marginTop: "20px"
                }}>
                    <button 
                        onClick={downloadScreenshotPdf}
                        style={{
                            padding: "10px 20px",
                            background: "#0a67a9",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "15px",
                            transition: "all 0.3s"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = "#084b7a"}
                        onMouseOut={(e) => e.currentTarget.style.background = "#0a67a9"}
                    >
                        <FaFileDownload /> Download Receipt
                    </button>
                    
                    <button 
                        onClick={() => router.push("/")}
                        style={{
                            padding: "10px 20px",
                            background: "#6c757d",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "15px",
                            transition: "all 0.3s"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = "#5a6268"}
                        onMouseOut={(e) => e.currentTarget.style.background = "#6c757d"}
                    >
                        <FaHome /> Return Home
                    </button>
                </div>
            </div>

            {/* Professional Receipt Section */}
            <div
                ref={receiptRef}
                style={{
                    margin: "30px auto",
                    padding: "30px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "10px",
                    backgroundColor: "#ffffff",
                    width: "100%",
                    maxWidth: "800px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                {/* Watermark */}
                <div style={{
                    position: "absolute",
                    opacity: "0.05",
                    fontSize: "120px",
                    fontWeight: "bold",
                    color: "#0a67a9",
                    transform: "rotate(-30deg)",
                    top: "50%",
                    left: "50%",
                    transformOrigin: "center",
                    zIndex: "0",
                    pointerEvents: "none"
                }}>
                    PAID
                </div>
                
                {/* Header */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px",
                    borderBottom: "1px solid #eee",
                    paddingBottom: "20px",
                    position: "relative",
                    zIndex: "1"
                }}>
                    <div>
                        <img 
                            src="/logo.png" 
                            alt="The Surfer Logo" 
                            style={{ 
                                maxWidth: "180px",
                                height: "auto"
                            }} 
                        />
                        <p style={{ 
                            marginTop: "5px",
                            color: "#666",
                            fontSize: "14px"
                        }}>
                            No 65, Wadanawatte, Pelena, 81700, Weligama, Sri Lanka
                        </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <h2 style={{ 
                            color: "#2c3e50",
                            margin: "0",
                            fontSize: "24px"
                        }}>
                            INVOICE
                        </h2>
                        <p style={{ 
                            margin: "5px 0 0",
                            color: "#666",
                            fontSize: "14px"
                        }}>
                            #{booking._id.slice(-6)}
                        </p>
                    </div>
                </div>
                
                {/* Client and Payment Info */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "30px",
                    position: "relative",
                    zIndex: "1"
                }}>
                    <div>
                        <h3 style={{ 
                            color: "#0a67a9",
                            marginBottom: "10px",
                            fontSize: "16px"
                        }}>
                            BILLED TO
                        </h3>
                        <p style={{ margin: "5px 0" }}><strong>{t.firstName} {t.lastName}</strong></p>
                        <p style={{ margin: "5px 0" }}>{t.email}</p>
                        <p style={{ margin: "5px 0" }}>{t.countryCode} {t.phone}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <h3 style={{ 
                            color: "#0a67a9",
                            marginBottom: "10px",
                            fontSize: "16px"
                        }}>
                            PAYMENT DETAILS
                        </h3>
                        <p style={{ margin: "5px 0" }}><strong>Date:</strong> {formattedDate}</p>
                        <p style={{ margin: "5px 0" }}><strong>Status:</strong> <span style={{ color: "#28a745" }}>Paid</span></p>
                        <p style={{ margin: "5px 0" }}><strong>Method:</strong> Credit Card</p>
                    </div>
                </div>
                
                {/* Booking Details */}
                <div style={{
                    marginBottom: "30px",
                    position: "relative",
                    zIndex: "1"
                }}>
                    <h3 style={{ 
                        color: "#0a67a9",
                        marginBottom: "15px",
                        fontSize: "16px",
                        paddingBottom: "5px",
                        borderBottom: "1px solid #eee"
                    }}>
                        BOOKING DETAILS
                    </h3>
                    
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px"
                    }}>
                        <div>
                            <p style={{ margin: "8px 0" }}><strong>Camp:</strong> {booking.selectedCamp}</p>
                            <p style={{ margin: "8px 0" }}><strong>Room:</strong> {booking.selectedRooms?.join(", ") || "N/A"}</p>
                            <p style={{ margin: "8px 0" }}><strong>Package:</strong> {booking.selectedPackages?.join(", ") || "N/A"}</p>
                        </div>
                        <div>
                            <p style={{ margin: "8px 0" }}><strong>Dates:</strong> {booking.dateRange}</p>
                            <p style={{ margin: "8px 0" }}><strong>Guests:</strong> {booking.travellerInfo?.length || 1}</p>
                        </div>
                    </div>
                </div>
                
                {/* Add-ons */}
                {booking.addons?.length > 0 && (
                    <div style={{
                        marginBottom: "30px",
                        position: "relative",
                        zIndex: "1"
                    }}>
                        <h3 style={{ 
                            color: "#0a67a9",
                            marginBottom: "15px",
                            fontSize: "16px",
                            paddingBottom: "5px",
                            borderBottom: "1px solid #eee"
                        }}>
                            ADDITIONAL SERVICES
                        </h3>
                        <ul style={{ 
                            margin: "0",
                            paddingLeft: "20px"
                        }}>
                            {booking.addons.map((addon, index) => (
                                <li key={index} style={{ margin: "5px 0" }}>
                                    {addon.title || addon}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {/* Payment Summary */}
                <div style={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    padding: "20px",
                    marginBottom: "30px",
                    position: "relative",
                    zIndex: "1"
                }}>
                    <h3 style={{ 
                        color: "#0a67a9",
                        marginBottom: "15px",
                        fontSize: "16px"
                    }}>
                        PAYMENT SUMMARY
                    </h3>
                    
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px"
                    }}>
                        <span>Subtotal:</span>
                        <span>{formatCurrency((booking.finalPrice || 0) * 0.25)}</span>
                    </div>
                    
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px"
                    }}>
                        <span>Tax (0%):</span>
                        <span>{formatCurrency(0)}</span>
                    </div>
                    
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "15px",
                        paddingTop: "15px",
                        borderTop: "1px solid #ddd",
                        fontWeight: "bold",
                        fontSize: "18px"
                    }}>
                        <span>Total Paid:</span>
                        <span>{formatCurrency((booking.finalPrice || 0) * 0.25)}</span>
                    </div>
                </div>
                
                {/* Footer */}
                <div style={{
                    textAlign: "center",
                    color: "#666",
                    fontSize: "14px",
                    borderTop: "1px solid #eee",
                    paddingTop: "20px",
                    position: "relative",
                    zIndex: "1"
                }}>
                    <p>Thank you for choosing The Surfer!</p>
                    <p>For any questions, please contact info@thesurferweligama.com</p>
                    <p style={{ marginTop: "15px" }}>
                        This is an automated receipt. {emailSent && "A confirmation mail has been sent to your email."}
                    </p>
                </div>
            </div>

            <div style={{ 
                textAlign: "center", 
                marginTop: "40px",
                color: "#666",
                fontSize: "14px"
            }}>
                <p>You will be automatically redirected to the home page in 60 seconds...</p>
            </div>
        </div>
    );
};

export default PaymentSuccess;