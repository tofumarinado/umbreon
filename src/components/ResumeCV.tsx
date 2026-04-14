"use client";

import React, { useState, createContext, useContext } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink, Briefcase, GraduationCap, Award, Code, Globe, Terminal } from "lucide-react";
import resumeDataEn from "@/data/resume.en.json";
import resumeDataEs from "@/data/resume.es.json";

const ResumeContext = createContext<any>(resumeDataEn);
const useResume = () => useContext(ResumeContext);

const sectionVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const HeaderSection = () => {
  const resumeData = useResume();
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="space-y-6 print:space-y-4 text-center md:text-left"
    >
      <div className="inline-block mb-4 print:mb-1 px-4 py-1.5 print:py-0.5 print:px-2 rounded-sm border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-sm print:text-[10px] font-bold tracking-wide uppercase">
        {resumeData.personal.title}
      </div>
      <h1 className="text-5xl md:text-7xl print:text-4xl font-extrabold tracking-tight print:leading-tight">
        <span className="print:hidden">Hi, I'm <br className="md:hidden" /></span>
        <span className="text-gradient drop-shadow-sm">{resumeData.personal.name}</span>
      </h1>

      <div className="pt-4 flex flex-wrap print:flex-col print:flex-nowrap gap-4 print:gap-1.5 items-center justify-center md:justify-start print:items-start text-slate-300 text-sm md:text-base">
        {resumeData.personal.contact.email && (
          <a href={`mailto:${resumeData.personal.contact.email}`} className="flex items-center gap-2 hover:text-white transition-colors flat-card px-4 py-2 print:!p-0 print:!border-none print:!shadow-none print:!bg-transparent rounded-md flat-card-hover w-full md:w-auto">
            <Mail className="w-4 h-4 print:w-3 print:h-3 text-brand-pink shrink-0" /> <span className="print:text-[10px] print:tracking-tight">{resumeData.personal.contact.email}</span>
          </a>
        )}
        {resumeData.personal.contact.phone && (
          <div className="flex items-center gap-2 flat-card px-4 py-2 print:!p-0 print:!border-none print:!shadow-none print:!bg-transparent rounded-md w-full md:w-auto">
            <Phone className="w-4 h-4 print:w-3 print:h-3 text-brand-purple shrink-0" /> <span className="print:text-[10px] print:tracking-tight">{resumeData.personal.contact.phone}</span>
          </div>
        )}
        {resumeData.personal.location && (
          <div className="flex items-center gap-2 flat-card px-4 py-2 print:!p-0 print:!border-none print:!shadow-none print:!bg-transparent rounded-md w-full md:w-auto">
            <MapPin className="w-4 h-4 print:w-3 print:h-3 text-brand-cyan shrink-0" /> <span className="print:text-[10px] print:tracking-tight">{resumeData.personal.location}</span>
          </div>
        )}
        <a href={`https://${resumeData.personal.contact.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors flat-card px-4 py-2 print:!p-0 print:!border-none print:!shadow-none print:!bg-transparent rounded-md flat-card-hover w-full md:w-auto">
          <ExternalLink className="w-4 h-4 print:w-3 print:h-3 text-brand-blue shrink-0" /> <span className="print:text-[10px] print:tracking-tight">LinkedIn</span>
        </a>
        <a href={`https://${resumeData.personal.contact.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors flat-card px-4 py-2 print:!p-0 print:!border-none print:!shadow-none print:!bg-transparent rounded-md flat-card-hover w-full md:w-auto">
          <ExternalLink className="w-4 h-4 print:w-3 print:h-3 text-slate-400 shrink-0" /> <span className="print:text-[10px] print:tracking-tight">GitHub</span>
        </a>
      </div>
    </motion.header>
  );
};

const AboutSection = () => {
  const resumeData = useResume();
  return (
    <motion.section
      variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
      className="relative flat-card rounded-xl p-8 md:p-12 print:!p-0 print:!bg-transparent print:!border-none print:!shadow-none overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none print:hidden" />
      <h2 className="text-2xl print:text-xl font-bold mb-6 print:mb-3 flex items-center gap-3 print:gap-0 print:border-b print:border-slate-700 print:pb-2 print:text-slate-100">
        <div className="p-2 print:hidden rounded-md bg-brand-purple text-white"><Code className="w-6 h-6" /></div>
        {resumeData.ui.about}
      </h2>
      <div className="text-slate-300 print:text-slate-200 leading-relaxed space-y-4 print:space-y-2 md:text-lg print:text-[13px]">
        {resumeData.personal.summary.split('\n').map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </motion.section>
  );
};

const SkillsSection = () => {
  const resumeData = useResume();
  const allSkills = new Map<string, number>();
  resumeData.experience.forEach((job: any) => {
    if (job.skills) {
      job.skills.forEach((skill: any) => {
        const current = allSkills.get(skill.name) || 0;
        allSkills.set(skill.name, current + skill.years);
      });
    }
  });

  const globalSkills = Array.from(allSkills.entries())
    .map(([name, years]) => ({ name, years: Math.ceil(years) }))
    .sort((a, b) => b.years - a.years);

  return (
    <motion.section
      variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
    >
      <h2 className="text-2xl print:text-lg font-bold mb-8 print:mb-3 flex items-center gap-3 print:gap-0 print:border-b print:border-slate-700 print:pb-2 print:text-slate-100">
        <div className="p-2 print:hidden rounded-md bg-indigo-500 text-white"><Terminal className="w-6 h-6" /></div>
        {resumeData.ui.skills}
      </h2>
      <div className="flex flex-wrap gap-3 print:gap-1.5">
        {globalSkills.map((skill) => (
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            key={skill.name}
            className="flat-card px-4 py-2 print:px-1.5 print:py-0.5 rounded-md text-sm print:text-[10px] print:font-bold font-semibold text-slate-200 hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-all cursor-default shadow-md flex items-center gap-2 print:gap-1"
          >
            <span>{skill.name}</span>
            <span className="text-xs print:text-[8px] text-brand-cyan/80 font-mono bg-black/20 print:bg-transparent px-1.5 py-0.5 rounded-sm">{skill.years} {skill.years === 1 ? 'yr' : 'yrs'}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const ExperienceSection = () => {
  const resumeData = useResume();
  return (
    <motion.section
      variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
      className="print:break-inside-auto print:block"
    >
      <h2 className="text-2xl print:text-xl font-bold mb-10 print:mb-4 flex items-center gap-3 print:gap-0 print:border-b print:border-slate-700 print:pb-2 print:text-slate-100">
        <div className="p-2 print:hidden rounded-md bg-brand-pink text-white"><Briefcase className="w-6 h-6" /></div>
        {resumeData.ui.experience}
      </h2>

      <div className="space-y-8 print:space-y-3 relative before:absolute print:before:hidden before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-1 before:bg-gradient-to-b before:from-brand-purple before:via-brand-pink before:to-transparent print:break-inside-auto print:block">
        {resumeData.experience.map((job: any, i: number) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            key={i}
            className="relative pl-12 print:pl-0 group print:break-inside-avoid-page"
          >
            {/* Timeline dot */}
            <div className="absolute print:hidden left-[0.35rem] print:left-[0.2rem] top-8 print:top-5 w-6 h-6 print:w-3 print:h-3 -translate-y-1/2 rounded-sm border-4 print:border-[2px] border-slate-900 bg-brand-purple z-10 transition-transform duration-300 group-hover:scale-125 group-hover:bg-brand-cyan" />

            {/* Card */}
            <div className="w-full flat-card p-6 print:p-4 rounded-xl group-hover:-translate-y-1 transition-transform duration-300">
              <div className="flex flex-col mb-3 print:mb-1.5">
                <span className="text-sm print:text-[10px] text-brand-cyan font-mono font-bold mb-1 print:mb-0.5">{job.startDate} - {job.endDate}</span>
                <h3 className="text-lg print:text-sm font-bold text-white uppercase tracking-wide print:leading-tight">{job.position}</h3>
                <h4 className="text-brand-pink font-semibold print:text-xs print:mt-0.5 print:leading-tight">{job.company}</h4>
                {job.location && <span className="text-xs text-slate-400 mt-1 print:mt-0 print:hidden flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>}
              </div>
              {job.description && (
                <div className="text-sm print:text-[11px] text-slate-300 leading-relaxed mt-4 print:mt-1.5 space-y-1.5">
                  {job.description.split('\n').map((line: string, idx: number) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              )}
              {job.skills && (
                <div className="mt-4 flex flex-wrap gap-2 print:mt-1.5 print:gap-1">
                  {job.skills.map((s: any, idx: number) => (
                    <span key={idx} className="text-xs print:text-[8px] font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded print:px-1 print:bg-transparent print:border print:border-brand-cyan/30">
                      {s.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const EducationSection = () => {
  const resumeData = useResume();
  return (
    <motion.section
      variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
    >
      <h2 className="text-2xl print:text-xl font-bold mb-6 print:mb-3 flex items-center gap-3 print:gap-0 print:border-b print:border-slate-700 print:pb-2 print:text-slate-100">
        <div className="p-2 print:hidden rounded-md bg-brand-cyan text-white"><GraduationCap className="w-6 h-6" /></div>
        {resumeData.ui.education}
      </h2>
      <div className="space-y-4 print:space-y-2">
        {resumeData.education.map((edu: any, i: number) => (
          <div key={i} className="flat-card p-6 print:p-3 print:px-4 rounded-xl flat-card-hover transition-colors print:break-inside-avoid">
            <span className="text-xs print:text-[10px] text-brand-cyan font-mono font-bold mb-1 print:mb-0 block">{edu.startDate} - {edu.endDate}</span>
            <h3 className="font-extrabold text-lg print:text-sm lg:text-lg mb-1 leading-snug">{edu.degree}</h3>
            <p className="text-slate-400 text-sm print:text-[11px] font-medium">{edu.institution}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

const AchievementsSection = () => {
  const resumeData = useResume();
  return (
    <motion.section
      variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
    >
      <h2 className="text-2xl print:text-xl font-bold mb-6 print:mb-3 flex items-center gap-3 print:gap-0 print:border-b print:border-slate-700 print:pb-2 print:text-slate-100">
        <div className="p-2 print:hidden rounded-md bg-yellow-500 text-white"><Award className="w-6 h-6" /></div>
        {resumeData.ui.achievements}
      </h2>
      <div className="flat-card p-6 print:!p-0 print:!bg-transparent print:!border-none print:!shadow-none rounded-xl space-y-6 print:space-y-3">
        <div>
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 print:mb-1 border-b border-slate-700 pb-2 print:pb-1">
            {resumeData.ui.certifications}
          </h3>
          <ul className="space-y-2 print:space-y-1 mt-3 print:mt-1">
            {resumeData.certifications.map((cert: string, i: number) => (
              <li key={i} className="text-sm print:text-[11px] text-slate-200 flex items-start gap-2 font-medium print:break-inside-avoid">
                <span className="text-brand-cyan mt-1 print:mt-0">■</span> {cert}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 print:mb-1 border-b border-slate-700 pb-2 print:pb-1">
            {resumeData.ui.awards}
          </h3>
          <ul className="space-y-4 print:space-y-2 mt-3 print:mt-1">
            {resumeData.awards.map((award: any, i: number) => (
              <li key={i} className="text-sm flex items-start gap-2 print:break-inside-avoid-page">
                <span className="text-brand-pink mt-0.5 shrink-0">■</span>
                <div className="w-full">
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <span className="text-slate-200 font-bold leading-tight">{award.title}</span>
                    {award.year && <span className="text-brand-cyan text-xs font-mono font-bold mt-0.5">{award.year}</span>}
                  </div>
                  <div className="text-slate-400 text-xs leading-relaxed">{award.description}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export function ResumeCV() {
  const [lang, setLang] = useState<"EN" | "ES">("EN");
  const resumeData = lang === "EN" ? resumeDataEn : resumeDataEs;

  return (
    <ResumeContext.Provider value={resumeData}>
      <div className="relative min-h-screen print:min-h-0 print:h-auto print:overflow-visible pb-24 text-slate-100 selection:bg-brand-pink selection:text-white">

        {/* Language Toggle Button */}
        <button
          onClick={() => setLang(lang === 'EN' ? 'ES' : 'EN')}
          className="fixed top-6 right-6 print:hidden z-50 flex items-center gap-2 bg-slate-800/80 backdrop-blur-md border border-slate-700/50 hover:border-brand-cyan/50 p-2.5 rounded-full hover:bg-slate-700 transition-all shadow-lg"
          aria-label="Toggle language"
        >
          <Globe className="w-5 h-5 text-brand-cyan" />
          <span className="text-xs font-bold uppercase w-5 text-center">{lang}</span>
        </button>

        {/* STANDARD WEB VIEW (Hidden heavily on print) */}
        <div className="max-w-5xl mx-auto px-6 pt-24 space-y-24 print:hidden">
          <HeaderSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <div className="grid md:grid-cols-2 gap-8 print:hidden">
            <EducationSection />
            <AchievementsSection />
          </div>
        </div>

        {/* DEDICATED PRINT VIEW - TWO COLUMN SIDEBAR */}
        <div className="hidden print:block max-w-[1200px] mx-auto px-6 pt-6">
          {/* Left Column Sidebar */}
          <div className="float-left w-[33%] space-y-8 pr-6 border-r border-slate-800 pb-12">
            <HeaderSection />
            <SkillsSection />
            <AchievementsSection />
          </div>

          {/* Right Main Content */}
          <div className="ml-[36%] w-[64%] space-y-6 block">
            <AboutSection />
            <ExperienceSection />
            <EducationSection />
          </div>
        </div>

      </div>
    </ResumeContext.Provider>
  );
}
