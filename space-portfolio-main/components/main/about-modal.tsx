"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaGraduationCap, FaBriefcase, FaCode, FaHeart } from "react-icons/fa";
import { MdLocationOn, MdEmail } from "react-icons/md";
import { RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";

const skills = [
  // Frontend
  { name: "React.js", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "Redux", category: "Frontend" },
  { name: "HTML / CSS", category: "Frontend" },
  { name: "React Native", category: "Frontend" },
  // Backend
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "MongoDB", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "MySQL", category: "Backend" },
  { name: "Firebase", category: "Backend" },
  { name: "Prisma", category: "Backend" },
  { name: "GraphQL", category: "Backend" },
  // Tools
  { name: "Docker", category: "Tools" },
  { name: "Git / GitHub", category: "Tools" },
  { name: "Figma", category: "Tools" },
  { name: "VS Code", category: "Tools" },
];

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "from-purple-500 to-blue-500",
  Backend: "from-cyan-500 to-teal-500",
  Tools: "from-pink-500 to-orange-400",
};

export const AboutModal = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"about" | "skills" | "experience">("about");

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] px-6 font-semibold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        View My Work
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[rgba(112,66,248,0.4)] bg-[rgba(3,0,20,0.95)] shadow-2xl shadow-[#7042f8]/20"
            >
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition z-10 p-1"
              >
                <FaTimes size={20} />
              </button>

              {/* Header */}
              <div className="p-8 pb-0">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    AT
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Akarsh Tripathi</h2>
                    <p className="text-purple-400 font-medium">Full Stack Developer</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-3 mb-4">
                  <span className="flex items-center gap-1"><MdLocationOn className="text-purple-400" /> India</span>
                  <a href="mailto:akarshofcx@gmail.com" className="flex items-center gap-1 hover:text-purple-400 transition">
                    <MdEmail className="text-purple-400" /> akarshofcx@gmail.com
                  </a>
                  <a href="https://github.com/akarshxs" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-purple-400 transition">
                    <RxGithubLogo className="text-purple-400" /> akarshxs
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-purple-400 transition">
                    <RxLinkedinLogo className="text-purple-400" /> LinkedIn
                  </a>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 border-b border-[rgba(112,66,248,0.2)] pb-0">
                  {(["about", "skills", "experience"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-2.5 text-sm font-medium capitalize transition rounded-t-lg ${
                        activeTab === tab
                          ? "text-white border-b-2 border-purple-500 bg-[rgba(112,66,248,0.1)]"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8 pt-6">
                <AnimatePresence mode="wait">
                  {activeTab === "about" && (
                    <motion.div
                      key="about"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-5"
                    >
                      <p className="text-gray-300 leading-relaxed">
                        Hi! I&apos;m <span className="text-purple-400 font-semibold">Akarsh Tripathi</span>, a passionate Full Stack Software Engineer who loves building scalable, high-performance web applications. I specialize in the React / Next.js ecosystem paired with modern backends.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        I enjoy crafting seamless user experiences from pixel-perfect UIs to robust API architectures. Whether it&apos;s a real-time app, a 3D interactive portfolio, or a data-driven dashboard, I bring both creativity and technical rigor to every project.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        {[
                          { icon: <FaCode className="text-purple-400" />, label: "Focus", value: "Full Stack Development" },
                          { icon: <FaHeart className="text-pink-400" />, label: "Passion", value: "Clean Code & UX Design" },
                          { icon: <FaGraduationCap className="text-cyan-400" />, label: "Learning", value: "Cloud, AI & DevOps" },
                          { icon: <FaBriefcase className="text-green-400" />, label: "Status", value: "Open to Opportunities" },
                        ].map(({ icon, label, value }) => (
                          <div key={label} className="flex items-start gap-3 bg-[rgba(255,255,255,0.04)] rounded-xl p-4 border border-[rgba(112,66,248,0.15)]">
                            <span className="text-lg mt-0.5">{icon}</span>
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
                              <p className="text-white font-medium text-sm">{value}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <a
                        href="https://docs.google.com/document/d/1Yc58gazrB4peT5f6BC4xFXBv_g7C0-oc7mxMl2v6Clk/export?format=pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-2 button-primary py-2 px-6 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition"
                      >
                        Download CV →
                      </a>
                    </motion.div>
                  )}

                  {activeTab === "skills" && (
                    <motion.div
                      key="skills"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-5"
                    >
                      {(["Frontend", "Backend", "Tools"] as const).map((cat) => (
                        <div key={cat}>
                          <h3 className={`text-sm font-bold uppercase tracking-widest mb-3 text-transparent bg-clip-text bg-gradient-to-r ${CATEGORY_COLORS[cat]}`}>
                            {cat}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {skills.filter((s) => s.category === cat).map((skill) => (
                              <motion.span
                                key={skill.name}
                                whileHover={{ scale: 1.08 }}
                                className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-200 border border-[rgba(112,66,248,0.35)] bg-[rgba(112,66,248,0.08)] hover:border-purple-400 hover:bg-[rgba(112,66,248,0.18)] transition cursor-default"
                              >
                                {skill.name}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === "experience" && (
                    <motion.div
                      key="experience"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-6"
                    >
                      {[
                        {
                          role: "Full Stack Developer",
                          company: "Freelance / Personal Projects",
                          period: "2022 – Present",
                          color: "from-purple-500 to-cyan-500",
                          points: [
                            "Built full-stack web apps using Next.js, Node.js, MongoDB & PostgreSQL",
                            "Developed 3D interactive portfolios with React Three Fiber & Three.js",
                            "Integrated payment gateways, REST & GraphQL APIs",
                            "Deployed projects on Vercel, Netlify & AWS",
                          ],
                        },
                        {
                          role: "Frontend Developer",
                          company: "Open Source Contributions",
                          period: "2021 – 2022",
                          color: "from-pink-500 to-orange-400",
                          points: [
                            "Contributed UI components to open-source React projects",
                            "Implemented responsive designs using Tailwind CSS & Material UI",
                            "Worked with Redux & React Query for state management",
                            "Collaborated via GitHub on multi-developer codebases",
                          ],
                        },
                        {
                          role: "Student & Self-Learner",
                          company: "B.Tech Computer Science",
                          period: "2020 – Present",
                          color: "from-cyan-500 to-teal-500",
                          points: [
                            "Studying core CS fundamentals: DSA, OS, DBMS, Networks",
                            "Building real-world projects to apply academic knowledge",
                            "Pursuing certifications in cloud computing & DevOps",
                          ],
                        },
                      ].map((exp) => (
                        <div key={exp.role} className="relative pl-5 border-l-2 border-[rgba(112,66,248,0.3)]">
                          <div className={`absolute left-[-6px] top-1.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br ${exp.color}`} />
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                            <div>
                              <h4 className="text-white font-semibold">{exp.role}</h4>
                              <p className={`text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r ${exp.color}`}>{exp.company}</p>
                            </div>
                            <span className="text-xs text-gray-500 shrink-0 bg-[rgba(255,255,255,0.04)] px-3 py-1 rounded-full border border-[rgba(112,66,248,0.15)]">
                              {exp.period}
                            </span>
                          </div>
                          <ul className="space-y-1.5">
                            {exp.points.map((pt) => (
                              <li key={pt} className="text-gray-400 text-sm flex items-start gap-2">
                                <span className="text-purple-500 mt-1 shrink-0">▸</span>
                                {pt}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
