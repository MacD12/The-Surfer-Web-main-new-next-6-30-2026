'use client';
import React, { useState } from "react";
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from "framer-motion";

export default function ImprintClient() {
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
                        Imprint
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
                    Disclaimer:
                </motion.h2>

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
                        <p className="font-semibold text-lg">Liability for content</p>
                        <p className="text-xs sm:text-sm lg:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                           The contents of our pages were created with great care. However, we cannot guarantee that 
                           the content is correct, complete or up-to-date. As a service provider, we are responsible 
                           for our own content on these pages according to Section 7, Paragraph 1 of the German 
                           Telemedia Act (TMG). According to §§ 8 to 10 TMG, however, we as a service provider are not 
                           obliged to monitor transmitted or stored third-party information or to investigate circumstances 
                           that indicate illegal activity. Obligations to remove or block the use of information according 
                           to general laws remain unaffected. However, liability in this regard is only possible from the 
                           point in time at which knowledge of a specific infringement of the law is known. As soon as we 
                           become aware of any violations of the law, we will remove this content immediately.
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-semibold text-lg">Liability for links</p>
                        <p className="text-xs sm:text-sm lg:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                           Our offer contains links to external third-party websites, the content of which we have no influence on. 
                           Therefore we cannot assume any liability for this external content. The respective provider or operator 
                           of the pages is always responsible for the content of the linked pages. The linked pages were checked 
                           for possible legal violations at the time of linking. Illegal content was not recognizable at the 
                           time of linking. However, a permanent control of the content of the linked pages is not reasonable 
                           without concrete evidence of an infringement. As soon as we become aware of legal violations, we will 
                           remove such links immediately.
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-semibold text-lg">Copyright</p>
                        <p className="text-xs sm:text-sm lg:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                           The content and works on these pages created by the site operators are subject to German copyright law. 
                           The duplication, editing, distribution and any kind of exploitation outside the limits of copyright 
                           require the written consent of the respective author or creator. Downloads and copies of this site are 
                           only permitted for private, non-commercial use. Insofar as the content on this site was not created by 
                           the operator, the copyrights of third parties are observed. In particular contents of third parties are 
                           marked as such. Should you nevertheless become aware of a copyright infringement, we ask that you inform 
                           us accordingly. As soon as we become aware of legal violations, we will remove such content immediately.
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-semibold text-lg">Privacy</p>
                        <p className="text-xs sm:text-sm lg:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                           Our website can usually be used without providing any personal data. Insofar as personal data 
                           (e.g. name, address or e-mail addresses) is collected on our website, this is always done on a 
                           voluntary basis as far as possible. This data will not be passed on to third parties without your 
                           express consent. We would like to point out that data transmission on the Internet 
                           (e.g. when communicating by e-mail) can have security gaps. A complete protection of the data 
                           against access by third parties is not possible. <br/> The use of contact data published as part of 
                           the imprint obligation by third parties to send unsolicited advertising and information material 
                           is hereby expressly prohibited. The site operators expressly reserve the right to take legal action 
                           in the event of unsolicited advertising being sent, such as spam e-mails.
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-semibold text-lg">Google Analytics</p>
                        <p className="text-xs sm:text-sm lg:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                           This website uses Google Analytics, a web analytics service provided by Google Inc. (”Google”). 
                           Google Analytics uses so-called ”cookies”, text files that are stored on your computer and enable an 
                           analysis of your use of the website. The information generated by the cookie about your use of this 
                           website (including your IP address) is transmitted to a Google server in the USA and stored there. 
                           Google will use this information to evaluate your use of the website, to compile reports on website 
                           activity for website operators and to provide other services related to website activity and internet 
                           usage. Google may also transfer this information to third parties if required to do so by law or if 
                           third parties process this data on behalf of Google. Under no circumstances will Google associate 
                           your IP address with other Google data. You can prevent the installation of cookies by setting your 
                           browser software accordingly; however, we advise you disclose that in this case you may not be able 
                           to use all functions of this website to their full extent. By using this website, you consent to 
                           the processing of data about you by Google in the manner and for the purposes set out above.
                        </p>
                    </motion.div>

                </motion.div>
            </div>

            <Footer />
        </div>
    );
};


