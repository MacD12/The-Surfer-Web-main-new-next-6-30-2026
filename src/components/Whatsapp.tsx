'use client';
import { useState } from "react";
import { MessageCircleMore } from "lucide-react";
import { API_BASE_URL } from "../config/api";

const Whatsapp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    whatsapp: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required";
    } else if (!/^\+?\d{7,15}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = "Enter a valid number with country code";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/whatsapp-inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert("We will get back to you within few hours!");
        setFormData({ name: "", email: "", country: "", whatsapp: "", message: "" });
        setIsOpen(false);
      } else {
        alert("Failed to send message. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative z-50">
      {/* WhatsApp Button */}
      <div
        className="fixed bottom-10 right-5 w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center text-xl cursor-pointer shadow-md hover:scale-105 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircleMore size={24} />
      </div>

      {/* WhatsApp Form */}
      <div
        className={`fixed bottom-[6rem] right-5 w-72 bg-white rounded-lg p-4 shadow-md transition-all duration-300 ease-in-out transform ${isOpen ? "translate-y-0 opacity-100 visible" : "translate-y-5 opacity-0 invisible"
          }`}
      >
        <h3 className="text-center text-sm font-semibold text-gray-700 mb-2">
          WhatsApp Inquiry
        </h3>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded text-sm ${errors.name ? "border-red-500" : "border-gray-300"} text-black`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded text-sm ${errors.email ? "border-red-500" : "border-gray-300"} text-black`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="text"
              name="country"
              placeholder="Enter your country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full p-2 border rounded text-sm ${errors.country ? "border-red-500" : "border-gray-300"} text-black`}
            />
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
          </div>

          <div>
            <input
              type="text"
              name="whatsapp"
              placeholder="WhatsApp number with country code"
              value={formData.whatsapp}
              onChange={handleChange}
              className={`w-full p-2 border rounded text-sm ${errors.whatsapp ? "border-red-500" : "border-gray-300"} text-black`}
            />
            {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-2 border rounded text-sm h-20 resize-none ${errors.message ? "border-red-500" : "border-gray-300"} text-black`}
            ></textarea>
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-2 bg-[#25D366] text-white rounded font-semibold text-sm hover:bg-[#1ebe57] transition-all ${submitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Whatsapp;
