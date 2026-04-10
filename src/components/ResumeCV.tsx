"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink, Briefcase, GraduationCap, Award, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import resumeData from "@/data/resume.json";

function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-brand-purple rounded-full mix-blend-screen filter blur-[100px] opacity-20"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.25, 0.1],
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 right-1/4 w-[30rem] h-[30rem] bg-brand-pink rounded-full mix-blend-screen filter blur-[120px] opacity-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-cyan rounded-full mix-blend-screen filter blur-[100px] opacity-20"
      />
    </div>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

export function ResumeCV() {
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div className="relative min-h-screen pb-24 text-slate-100 selection:bg-brand-pink selection:text-white">
      <BackgroundOrbs />
      
      <div className="max-w-5xl mx-auto px-6 pt-24 space-y-24">
        
        {/* HEADER SECTION */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 text-center md:text-left"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-sm font-medium tracking-wide">
            {resumeData.personal.title}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Hi, I'm <br className="md:hidden" />
            <span className="text-gradient drop-shadow-sm">{resumeData.personal.name}</span>
          </h1>
          
          <div className="pt-4 flex flex-wrap gap-4 items-center justify-center md:justify-start text-slate-300 text-sm md:text-base">
            <a href={`mailto:${resumeData.personal.contact.email}`} className="flex items-center gap-2 hover:text-white transition-colors glass px-4 py-2 rounded-full glass-hover">
              <Mail className="w-4 h-4 text-brand-pink" /> {resumeData.personal.contact.email}
            </a>
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <Phone className="w-4 h-4 text-brand-purple" /> {resumeData.personal.contact.phone}
            </div>
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4 text-brand-cyan" /> {resumeData.personal.location}
            </div>
            <a href={`https://${resumeData.personal.contact.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors glass px-4 py-2 rounded-full glass-hover">
              <ExternalLink className="w-4 h-4 text-brand-blue" /> LinkedIn
            </a>
            <a href={`https://${resumeData.personal.contact.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors glass px-4 py-2 rounded-full glass-hover">
              <ExternalLink className="w-4 h-4 text-slate-400" /> GitHub
            </a>
          </div>
        </motion.header>

        {/* ABOUT SECTION */}
        <motion.section 
          variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          className="relative glass rounded-3xl p-8 md:p-12 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-brand-purple/20"><Code className="w-6 h-6 text-brand-purple" /></div>
            About Me
          </h2>
          <div className="text-slate-300 leading-relaxed space-y-4 md:text-lg">
            {resumeData.personal.summary.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </motion.section>

        {/* SKILLS SECTION */}
        <motion.section 
          variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-2xl font-bold mb-8 pl-4 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-gradient-to-r from-brand-pink to-brand-purple rounded-full" />
            Core Technologies
          </h2>
          <div className="flex flex-wrap gap-3">
            {resumeData.skills.map((skill, i) => (
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                key={skill} 
                className="glass px-5 py-2.5 rounded-full text-sm font-medium text-slate-200 border-white/10 hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-all cursor-default shadow-lg shadow-black/20"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* EXPERIENCE SECTION */}
        <motion.section 
          variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-brand-pink/20"><Briefcase className="w-6 h-6 text-brand-pink" /></div>
            Experience
          </h2>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:md:ml-7 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-purple before:via-brand-pink before:to-transparent">
            {resumeData.experience.map((job, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={i} 
                className={cn(
                  "relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                )}
              >
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-brand-purple shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-125 group-hover:bg-brand-cyan" />
                
                {/* Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl group-hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex flex-col mb-3">
                    <span className="text-sm text-brand-cyan font-mono mb-1">{job.startDate} - {job.endDate}</span>
                    <h3 className="text-lg font-bold text-white">{job.position}</h3>
                    <h4 className="text-slate-400 font-medium">{job.company}</h4>
                    {job.location && <span className="text-xs text-slate-500 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3"/>{job.location}</span>}
                  </div>
                  {job.description && (
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {job.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* TWO COLUMN BOTTOM (Education & Awards) */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          <motion.section 
            variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-cyan/20"><GraduationCap className="w-6 h-6 text-brand-cyan" /></div>
              Education
            </h2>
            <div className="space-y-4 shadow-xl">
              {resumeData.education.map((edu, i) => (
                <div key={i} className="glass p-6 rounded-2xl glass-hover transition-colors">
                  <span className="text-xs text-brand-pink font-mono mb-1 block">{edu.startDate} - {edu.endDate}</span>
                  <h3 className="font-bold text-lg mb-1">{edu.degree}</h3>
                  <p className="text-slate-400 text-sm">{edu.institution}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Awards & Certs */}
          <motion.section 
            variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/20"><Award className="w-6 h-6 text-yellow-500" /></div>
              Achievements
            </h2>
            <div className="glass p-6 rounded-2xl space-y-6">
              <div>
                <h3 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-3">Certifications</h3>
                <ul className="space-y-2">
                  {resumeData.certifications.map((cert, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-brand-cyan mt-1">▹</span> {cert}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <h3 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-3">Awards</h3>
                <ul className="space-y-2">
                  {resumeData.awards.map((award, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-brand-pink mt-1">▹</span> {award}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>
        </div>

      </div>
    </div>
  );
}
