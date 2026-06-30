'use client';
import Header from '@/components/contact/Header';
import GetInTouch from '@/components/contact/GetInTouch';
import Form from '@/components/contact/form';
import Contact from '@/components/contact/Contact';
import Map from '@/components/contact/Map';
import Inquiries from '@/components/contact/Inquiries';
import Policy from '@/components/contact/Policy';
import { Footer } from '@/components/Footer';

export default function ContactClient() {
  return (
    <div>
      <Header />
      <GetInTouch />
      <Form />
      <Contact />
      <Map />
      <Inquiries />
      <div className="max-w-3xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
      <Policy />
      <Footer />
    </div>
  );
}
