"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink, Briefcase, GraduationCap, Award, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import resumeData from "@/data/resume.json";

const sectionVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export function ResumeCV() {
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div className="relative min-h-screen pb-24 text-slate-100 selection:bg-brand-pink selection:text-white">
      
      <div className="max-w-5xl mx-auto px-6 pt-24 space-y-24">
        
        {/* HEADER SECTION */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 text-center md:text-left"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-sm border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-sm font-bold tracking-wide">
            {resumeData.personal.title}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Hi, I'm <br className="md:hidden" />
            <span className="text-gradient drop-shadow-sm">{resumeData.personal.name}</span>
          </h1>
          
          <div className="pt-4 flex flex-wrap gap-4 items-center justify-center md:justify-start text-slate-300 text-sm md:text-base">
            <a href={`mailto:${resumeData.personal.contact.email}`} className="flex items-center gap-2 hover:text-white transition-colors flat-card px-4 py-2 rounded-md flat-card-hover">
              <Mail className="w-4 h-4 text-brand-pink" /> {resumeData.personal.contact.email}
            </a>
            <div className="flex items-center gap-2 flat-card px-4 py-2 rounded-md">
              <Phone className="w-4 h-4 text-brand-purple" /> {resumeData.personal.contact.phone}
            </div>
            <div className="flex items-center gap-2 flat-card px-4 py-2 rounded-md">
              <MapPin className="w-4 h-4 text-brand-cyan" /> {resumeData.personal.location}
            </div>
            <a href={`https://${resumeData.personal.contact.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors flat-card px-4 py-2 rounded-md flat-card-hover">
              <ExternalLink className="w-4 h-4 text-brand-blue" /> LinkedIn
            </a>
            <a href={`https://${resumeData.personal.contact.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors flat-card px-4 py-2 rounded-md flat-card-hover">
              <ExternalLink className="w-4 h-4 text-slate-400" /> GitHub
            </a>
          </div>
        </motion.header>

        {/* ABOUT SECTION */}
        <motion.section 
          variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          className="relative flat-card rounded-xl p-8 md:p-12 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="p-2 rounded-md bg-brand-purple text-white"><Code className="w-6 h-6" /></div>
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
            <span className="w-8 h-1 bg-gradient-to-r from-brand-pink to-brand-purple rounded-sm" />
            Core Technologies
          </h2>
          <div className="flex flex-wrap gap-3">
            {resumeData.skills.map((skill, i) => (
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                key={skill} 
                className="flat-card px-5 py-2.5 rounded-md text-sm font-semibold text-slate-200 hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-all cursor-default shadow-md"
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
            <div className="p-2 rounded-md bg-brand-pink text-white"><Briefcase className="w-6 h-6" /></div>
            Experience
          </h2>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-1 before:bg-gradient-to-b before:from-brand-purple before:via-brand-pink before:to-transparent">
            {resumeData.experience.map((job, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={i} 
                className="relative pl-12 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-[0.35rem] top-8 w-6 h-6 -translate-y-1/2 rounded-sm border-4 border-slate-900 bg-brand-purple z-10 transition-transform duration-300 group-hover:scale-125 group-hover:bg-brand-cyan" />
                
                {/* Card */}
                <div className="w-full flat-card p-6 rounded-xl group-hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex flex-col mb-3">
                    <span className="text-sm text-brand-cyan font-mono font-bold mb-1">{job.startDate} - {job.endDate}</span>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wide">{job.position}</h3>
                    <h4 className="text-brand-pink font-semibold">{job.company}</h4>
                    {job.location && <span className="text-xs text-slate-400 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3"/>{job.location}</span>}
                  </div>
                  {job.description && (
                    <p className="text-sm text-slate-300 leading-relaxed mt-4">
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
              <div className="p-2 rounded-md bg-brand-cyan text-white"><GraduationCap className="w-6 h-6" /></div>
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.education.map((edu, i) => (
                <div key={i} className="flat-card p-6 rounded-xl flat-card-hover transition-colors">
                  <span className="text-xs text-brand-cyan font-mono font-bold mb-1 block">{edu.startDate} - {edu.endDate}</span>
                  <h3 className="font-extrabold text-lg mb-1 leading-snug">{edu.degree}</h3>
                  <p className="text-slate-400 text-sm font-medium">{edu.institution}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Awards & Certs */}
          <motion.section 
            variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="p-2 rounded-md bg-yellow-500 text-white"><Award className="w-6 h-6" /></div>
              Achievements
            </h2>
            <div className="flat-card p-6 rounded-xl space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 border-b border-slate-700 pb-2">Certifications</h3>
                <ul className="space-y-2 mt-3">
                  {resumeData.certifications.map((cert, i) => (
                    <li key={i} className="text-sm text-slate-200 flex items-start gap-2 font-medium">
                      <span className="text-brand-cyan mt-1">■</span> {cert}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 border-b border-slate-700 pb-2">Awards</h3>
                <ul className="space-y-2 mt-3">
                  {resumeData.awards.map((award, i) => (
                    <li key={i} className="text-sm text-slate-200 flex items-start gap-2 font-medium">
                      <span className="text-brand-pink mt-1">■</span> {award}
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
