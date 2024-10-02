"use client"
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

import React from 'react'
import { Navigation } from '../components/nav'
import Particles from '../components/particles'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FaLinkedin, FaTwitter, FaFileDownload, FaEnvelope, FaWhatsapp } from 'react-icons/fa'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import Footer from '../components/Footer'
import partners from '../data/partners.json'
import teamMembers from '../data/team.json'


  const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 100 });
  
    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
  
    const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
    const style = { maskImage, WebkitMaskImage: maskImage };
  
    return (
      <div
        onMouseMove={onMouseMove}
        className="overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600"
      >
        <div className="pointer-events-none">
          <div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
          <motion.div
            className="absolute inset-0 z-10 bg-gradient-to-br opacity-100 via-zinc-100/10 transition duration-1000 group-hover:opacity-50"
            style={style}
          />
          <motion.div
            className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
            style={style}
          />
        </div>
        {children}
      </div>
    );
  };
  
  const SectionArticle: React.FC<{ title: string; content: string }> = ({ title, content }) => {
    const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 100 });
  
    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLElement>) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
  
    const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.2), transparent)`;
    const style = { maskImage, WebkitMaskImage: maskImage };
  
    return (
      <motion.article
        onMouseMove={onMouseMove}
        className="relative p-6 bg-gradient-to-tl from-slate-800 via-zinc-800/20 to-black shadow-lg rounded-lg overflow-hidden group"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pointer-events-none absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-br opacity-100 from-zinc-100/10 via-transparent to-transparent transition duration-1000 group-hover:opacity-50"
          style={style}
        />
        <motion.div
          className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
          style={style}
        />
        <h2 className="text-xl font-semibold mb-4 text-[#FFD700] group-hover:text-white">{title}</h2>
        <p className="text-slate-100 group-hover:text-gray-300">{content}</p>
      </motion.article>
    );
  };

const page = () => {
    const pathname = usePathname();

    const pageVariants = {
      hidden: {
        opacity: 0,
        y: 50, // Start from 50px below
      },
      visible: {
        opacity: 1,
        y: 0, // Move to its final position
        transition: {
          duration: 2, // Animation duration (2 seconds)
          ease: "easeOut", // Easing function
        },
      },
    };

  return (
    <div className=" bg-gradient-to-tl from-slate-400 via-zinc-100/20 to-slate-200">
			<Navigation pathName={pathname} />

      <div className="h-16 md:h-24"></div>
      
			<Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={100} />

      <motion.div
      className="bg-gradient-to-tl from-slate-400 via-zinc-100/20 to-slate-200"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      >
        <div className="px-4 py-8 mx-auto max-w-7xl">  
        {/* Title Section */}
          <section className="text-center my-12">
            <h1 className="text-4xl font-bold bg-black border-4 border-black rounded-lg text-white p-4 inline-block">About Us</h1>
          </section>

          {/* Prelude, Vision, Design Method */}
          <section className="grid gap-12 md:grid-cols-3">
            <SectionArticle
              title="Prelude"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <SectionArticle
              title="Vision"
              content="Our vision is to innovate and lead in our industry."
            />
            <SectionArticle
              title="Design Method"
              content="We follow a user-centered design approach."
            />
          </section>

          <section className="my-6 px-4 sm:px-6 md:px-8 lg:px-12">
        <section className="text-center my-12">
          <h1 className="text-4xl font-bold bg-black border-4 border-black rounded-lg text-white p-4 inline-block">Our Partners</h1>
        </section>
        <div className="flex flex-wrap justify-center gap-6">
          {partners.map(partner => (
            <motion.div
              key={partner.id}
              className="relative overflow-hidden rounded-xl shadow-lg group w-full sm:w-72 md:w-60 lg:w-72 xl:w-80"
              whileHover={{
                scale: 1.05,
                rotateX: 10,
                rotateY: -10,
                transition: { duration: 0.2 },
              }}
              style={{
                backgroundImage: `url(${partner.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "350px",
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-bold">{partner.name}</h3>
                <p className="mt-1 text-sm">{partner.designation}</p>
                <p className="mt-1 text-sm">{partner.role}</p>
                <p className="mt-1 text-xs">{partner.qualification}</p>
                <div className="flex justify-center gap-4 mt-4">
                  {partner.social.linkedin && (
                    <Link href={partner.social.linkedin} passHref target="_blank" rel="noopener noreferrer">
                      <span className="text-blue-600 hover:text-blue-800 transition-colors">
                        <FaLinkedin className="text-2xl" />
                      </span>
                    </Link>
                  )}
                  {partner.social.linkedin && (
                    <Link href={partner.social.linkedin} passHref target="_blank" rel="noopener noreferrer">
                      <span className="text-blue-400 hover:text-blue-600 transition-colors">
                        <FaTwitter className="text-2xl" />
                      </span>
                    </Link>
                  )}
                  {partner.social.email && (
                    <Link href={`mailto:${partner.social.email}`} passHref>
                      <span className="text-red-500 hover:text-red-700 transition-colors">
                        <FaEnvelope className="text-2xl" />
                      </span>
                    </Link>
                  )}
                  {partner.social.whatsapp && (
                    <Link href={`https://wa.me/${partner.social.whatsapp}`} passHref target="_blank" rel="noopener noreferrer">
                      <span className="text-green-500 hover:text-green-700 transition-colors">
                        <FaWhatsapp className="text-2xl" />
                      </span>
                    </Link>
                  )}
                </div>
                <Link href={partner.resumeLink} passHref className="mt-4 bg-[#FFD700] text-black py-2 px-4 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
                  <FaFileDownload className="mr-2" />
                  Download Resume
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
          </section>

          {/* Teams Section */}
          <section className="my-12">
            <section className="text-center my-12">
              <h1 className="text-4xl font-bold bg-black border-4 border-black rounded-lg text-white p-4 inline-block">Our Team</h1>
              <p className="text-white mb-6 text-center">Meet the talented individuals who make our company great.</p>
            </section>
            <div className="grid gap-6 md:grid-cols-3">
              {teamMembers.map(member => (
                <Card key={member.id}>
                  <div className="relative group">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      width={500} 
                      height={250} 
                      className="rounded-lg transition-transform duration-300 transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 rounded-lg">
                      <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                      <p className="text-sm mb-1">{member.role}</p>
                      <p className="text-xs mb-2">{member.qualification}</p>
                      {/* <p className="text-sm text-center mb-3">{member.description}</p> */}
                      
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Download  Button */}
          <section className="my-12 text-center">
            <Link href="/ADCL Portfolio A4.pdf" className="bg-black text-[#FFD700] py-3 px-6 rounded-lg text-lg hover:bg-blue-600 transition-colors">
              Download Company Profile
            </Link>
          </section>

          {/* Address and Opening Hours */}
          <section className="my-12 text-center">
            <h2 className="text-2xl font-bold text-[#FFD700] mb-4">Contact Address</h2>
            <p className="text-zinc-300">147 Motijheel C/A, (2nd Floor), Sultan Building Dhaka-1000</p>
            <p className="text-white mt-2">Opening Hours: Sunday-Thursday 9am - 5pm</p>
          </section>
        </div>
      </motion.div>

      <Footer/>
    </div>
  )
}

export default page