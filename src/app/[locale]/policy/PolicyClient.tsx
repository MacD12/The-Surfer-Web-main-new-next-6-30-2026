'use client';
import React, { useState } from "react";
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from "framer-motion";

export default function PolicyClient() {
    return (
        <div>
            <div className='relative min-h-screen mb-4 flex items-center w-full overflow-hidden bg-gray-900' id='Header'>
                <Image
                    src="/terms.jpg"
                    alt=""
                    fill
                    priority
                    fetchPriority="high"
                    sizes="100vw"
                    className="object-cover object-center"
                />
                <Navbar />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/55 pointer-events-none" />
                <div className='container relative z-10 text-center mx-auto py-4 px-4 sm:px-6 md:px-20 lg:px-32 text-white'>
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className='font-[montserrat] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[100px] inline-block max-w-full sm:max-w-3xl font-bold tracking-tight leading-[1.02] pt-18 mt-16 sm:mt-8 md:-mt-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
                    >
                        Privacy Policy
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
                        className='mt-6 sm:mt-8 flex justify-center'
                    >
                        <span className='block h-[3px] w-14 sm:w-20 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.55)]' />
                    </motion.div>
                </div>
            </div>

            <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">

                <motion.h2
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-neutral-400 mb-8 md:mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Privacy Policy for The surfer
                </motion.h2>
                 <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-xs sm:text-sm lg:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto mb-6">
                            At The Surfer Weligama, accessible from https://thesurferweligama.com, one of our 
                            main priorities is the privacy of our visitors. This Privacy Policy document contains 
                            types of information that is collected and recorded by The Surfer Weligama and how 
                            we use it. If you have additional questions or require more information about our 
                            Privacy Policy, do not hesitate to contact us. This Privacy Policy applies only to 
                            our online activities and is valid for visitors to our website with regards to the 
                            information that they shared and/or collect in The Surfer Weligama. This policy is 
                            not applicable to any information collected offline or via channels other than this 
                            website. Our Privacy Policy was created with the help of the 
                            <a className="text-blue-500" href="https://www.privacypolicygenerator.info/" target="_blank" rel="noopener noreferrer"> Free Privacy Policy Generator</a>.
                        </p>
                    </motion.div>

                <motion.div
                    className="space-y-6 text-neutral-400"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-semibold text-lg">Consent</p>
                        <p className="text-xs sm:text-sm lg:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-semibold text-lg">Information we collect</p>
                        <p className="text-xs sm:text-sm lg:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                            The personal information that you are asked to provide, and the reasons why you are asked to provide
                            it, will be made clear to you at the point we ask you to provide your personal information. <br /> If you
                            contact us directly, we may receive additional information about you such as your name, email address,
                            phone number, the contents of the message and/or attachments you may send us, and any other information
                            you may choose to provide.  <br />When you register for an Account, we may ask for your contact information,
                            including items such as name, company name, address, email address, and telephone number.
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-semibold text-lg">How we use your information</p>
                        <p className="text-xs sm:text-sm lg:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                            We use the information we collect in various ways, including to:
                        </p>
                        <ul className="list-disc list-inside text-xs sm:text-sm lg:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                            <li>Provide, operate, and maintain our website</li>
                            <li>Improve, personalize, and expand our website</li>
                            <li>Understand and analyze how you use our website</li>
                            <li>Develop new products, services, features, and functionality</li>
                            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                            <li>Send you emails</li>
                            <li>Find and prevent fraud</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-semibold text-lg">Log Files</p>
                        <p className="text-xs sm:text-sm lg:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                            The Surfer Weligama follows a standard procedure of using log files. These files log visitors when
                            they visit websites. All hosting companies do this and a part of hosting services’ analytics.
                            The information collected by log files include internet protocol (IP) addresses, browser type,
                            Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the
                            number of clicks. These are not linked to any information that is personally identifiable. The
                            purpose of the information is for analyzing trends, administering the site, tracking users’
                            movement on the website, and gathering demographic information.
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-semibold text-lg">Cookies and Web Beacons</p>
                        <p className="text-xs sm:text-sm lg:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                            Like any other website, The Surfer Weligama uses ‘cookies’. These cookies are used to store
                            information including visitors’ preferences, and the pages on the website that the visitor
                            accessed or visited. The information is used to optimize the users’ experience by
                            customizing our web page content based on visitors’ browser type and/or other information.
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-semibold text-lg">Advertising Partners Privacy Policies</p>
                        <p className="text-xs sm:text-sm lg:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                            You may consult this list to find the Privacy Policy for each of the advertising partners
                            of The Surfer Weligama. Third-party ad servers or ad networks uses technologies like cookies,
                            JavaScript, or Web Beacons that are used in their respective advertisements and links that
                            appear on The Surfer Weligama, which are sent directly to users’ browser. They automatically
                            receive your IP address when this occurs. These technologies are used to measure the
                            effectiveness of their advertising campaigns and/or to personalize the advertising content
                            that you see on websites that you visit. <br /> Note that The Surfer Weligama has no access to
                            or control over these cookies that are used by third-party advertisers.
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-semibold text-lg">Third Party Privacy Policies</p>
                        <p className="text-xs sm:text-sm lg:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                            The Surfer Weligama’s Privacy Policy does not apply to other advertisers or websites.
                            Thus, we are advising you to consult the respective Privacy Policies of these third-party
                            ad servers for more detailed information. It may include their practices and instructions
                            about how to opt-out of certain options. You can choose to disable cookies through your
                            individual browser options. To know more detailed information about cookie management
                            with specific web browsers, it can be found at the browsers’ respective websites.
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-semibold text-lg">CCPA Privacy Rights (Do Not Sell My Personal Information)</p>
                        <p className="text-xs sm:text-sm lg:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                            Under the CCPA, among other rights, California consumers have the right to: <br />
                            Request that a business that collects a consumer’s personal data disclose the
                            categories and specific pieces of personal data that a business has collected
                            about consumers.
                            <br />Request that a business delete any personal data about the consumer that a
                            business has collected.
                            <br />Request that a business that sells a consumer’s personal data, not
                            sell the consumer’s personal data.
                            <br />If you make a request, we have one month to respond to you. If you
                            would like to exercise any of these rights, please contact us.
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-semibold text-lg">GDPR Data Protection Rights</p>
                        <p className="text-xs sm:text-sm lg:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                            We would like to make sure you are fully aware of all of your data protection
                            rights. Every user is entitled to the following: <br />
                            The right to access – You have the right to request copies of your personal data.
                            We may charge you a small fee for this service. The right to rectification – You have the
                            right to request that we correct any information you believe is inaccurate. You also have
                            the right to request that we complete the information you believe is incomplete.
                            <br />The right to erasure – You have the right to request that we erase your personal data,
                            under certain conditions.
                            <br />The right to restrict processing – You have the right to request that we restrict the 
                            processing of your personal data, under certain conditions.
                            <br />The right to object to processing – You have the right to object to our processing of 
                            your personal data, under certain conditions.
                            <br />The right to data portability – You have the right to request that we transfer the data 
                            that we have collected to another organization, or directly to you, under certain conditions.
                            <br />If you make a request, we have one month to respond to you. If you would like to exercise 
                            any of these rights, please contact us.
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-semibold text-lg">Children’s Information</p>
                        <p className="text-xs sm:text-sm lg:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                            Another part of our priority is adding protection for children while using the 
                            internet. We encourage parents and guardians to observe, participate in, and/or 
                            monitor and guide their online activity. <br/> The Surfer Weligama does not knowingly 
                            collect any Personal Identifiable Information from children under the age of 13. 
                            If you think that your child provided this kind of information on our website, 
                            we strongly encourage you to contact us immediately and we will do our best efforts 
                            to promptly remove such information from our records.
                        </p>
                    </motion.div>

                </motion.div>
            </div>

            <Footer />
        </div>
    );
};


