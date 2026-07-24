import { useState, useEffect } from 'react';
import { getSkills } from '../../../api/services';
import { FiCode, FiCpu, FiCpu as FiBot, FiDatabase, FiShield, FiTool } from 'react-icons/fi';

const categoryConfig = {
  LANGUAGES: { 
    label: 'Languages', 
    icon: <FiCode size={16} />, 
    bg: 'var(--pill-bg-indigo)', 
    pillClass: '',
    borderColor: 'var(--pill-tx-indigo)'
  },
  BACKEND: { 
    label: 'Backend & Microservices', 
    icon: <FiCpu size={16} />, 
    bg: 'var(--pill-bg-orange)', 
    pillClass: 'o',
    borderColor: 'var(--pill-tx-orange)'
  },
  AI: { 
    label: 'AI & Agentic Systems', 
    icon: <FiBot size={16} />, 
    bg: 'var(--pill-bg-cyan)', 
    pillClass: 'g',
    borderColor: 'var(--pill-tx-cyan)'
  },
  DATA: { 
    label: 'Data & Messaging', 
    icon: <FiDatabase size={16} />, 
    bg: 'var(--pill-bg-blue)', 
    pillClass: 'b',
    borderColor: 'var(--pill-tx-blue)'
  },
  ARCHITECTURE: { 
    label: 'Architecture & Security', 
    icon: <FiShield size={16} />, 
    bg: 'var(--pill-bg-pink)', 
    pillClass: 'p',
    borderColor: 'var(--pill-tx-pink)'
  },
  TOOLS: { 
    label: 'Developer Tools & DevOps', 
    icon: <FiTool size={16} />, 
    bg: 'var(--pill-bg-slate)', 
    pillClass: 's',
    borderColor: 'var(--pill-tx-slate)'
  }
};

const fallbackData = {
  LANGUAGES: ['Java 21', 'Python 3.10+', 'SQL', 'HTML5', 'CSS3', 'JavaScript'],
  BACKEND: ['Spring Boot 3', 'Spring Cloud (Eureka, Gateway, Config)', 'REST APIs', 'Spring Security', 'OpenFeign', 'FastAPI', 'JPA/Hibernate'],
  AI: ['LangGraph v0.2+', 'LangChain', 'LLMs', 'Agentic AI Workflows', 'Checkpointer (Short Term Memory)' , 'Store (Long Term Memory) ' , 'Human-in-the-Loop (HITL)', 'Pydantic v2'],
  DATA: ['Apache Kafka', 'Redis Caching', 'MySQL', 'H2 Database'],
  ARCHITECTURE: ['Microservices', 'Event-Driven Architecture', 'REST API Design', 'Role-Based Access Control (RBAC)', 'JWT Security'],
  TOOLS: ['Docker', 'Docker Compose', 'Git', 'Maven', 'Postman']
};

export default function SkillsSection({ skills: initialSkills }) {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (initialSkills) {
      setSkills(initialSkills);
    } else {
      getSkills()
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setSkills(res.data);
          }
        })
        .catch(console.error);
    }
  }, [initialSkills]);

  const groupedSkills = skills.reduce((acc, skill) => {
    const name = skill.name ? skill.name.trim() : '';
    if (!name) return acc;
    let cat = skill.category ? skill.category.toUpperCase() : 'TOOLS';
    if (cat === 'FRONTEND' || cat === 'CORE') cat = 'LANGUAGES';
    if (cat === 'DATABASES') cat = 'DATA';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(name);
    return acc;
  }, {});

  const categories = ['LANGUAGES', 'BACKEND', 'AI', 'DATA', 'ARCHITECTURE', 'TOOLS'];

  return (
    <section id="skills" className="section py-20 px-6 md:px-20 relative z-10 transition-colors duration-500">
      <div className="eyebrow block text-[11px] font-bold uppercase tracking-[2.5px] text-accent mb-2 select-none">
        Technical Skills
      </div>
      <h2 className="sec-title font-display text-[clamp(26px,3vw,40px)] font-bold tracking-[-1px] text-text-main mb-2">
        Tech Stack &amp; Technical Capabilities
      </h2>
      <p className="sec-sub text-[14px] text-brand-muted mb-6 max-w-[580px] select-none">
        Core languages, enterprise microservices frameworks, AI agentic libraries, data streaming, and DevOps tools.
      </p>

      <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((catKey) => {
          const config = categoryConfig[catKey] || categoryConfig.TOOLS;
          const skillList = (groupedSkills[catKey] && groupedSkills[catKey].length > 0)
            ? groupedSkills[catKey]
            : (fallbackData[catKey] || []);

          return (
            <div 
              key={catKey} 
              className="sk-card flex flex-col justify-start select-none"
              style={{ borderLeft: `3px solid ${config.borderColor}` }}
            >
              <div className="sk-head flex items-center gap-2.5 mb-3.5">
                <div 
                  className="sk-ico w-9 h-9 rounded-[11px] flex items-center justify-center text-[18px]"
                  style={{ background: config.bg, color: config.borderColor }}
                >
                  {config.icon}
                </div>
                <span className="sk-cat font-display text-[13px] font-bold text-text-main uppercase tracking-[0.5px]">
                  {config.label}
                </span>
              </div>

              <div className="sk-pills flex flex-wrap gap-1.5">
                {skillList.map((skill) => (
                  <span 
                    key={skill} 
                    className={`pill ${config.pillClass}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
