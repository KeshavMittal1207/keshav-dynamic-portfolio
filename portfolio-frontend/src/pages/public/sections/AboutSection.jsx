import { FiMail, FiMapPin, FiPhone, FiCpu, FiBookOpen, FiLayers } from 'react-icons/fi';

export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="section py-24 px-6 md:px-20 max-w-6xl mx-auto relative z-10 transition-colors duration-500 select-text"
    >
      <div className="eyebrow block text-[11px] font-bold uppercase tracking-[2.5px] text-accent mb-2">
        About Me
      </div>
      <h2 className="sec-title font-display text-[clamp(26px,3vw,40px)] font-bold tracking-[-1px] text-text-main mb-12">
        From High-Concurrency Backend Systems to Agentic AI
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Bio Text & Unified Contacts (7 columns) */}
        <div className="lg:col-span-7">
          <div className="glass-card p-8 flex flex-col justify-between h-full">
            <div className="about-text text-[14.5px] sm:text-[15px] text-brand-gray leading-[1.8] space-y-5">
              <p>
                I am a results-driven Backend &amp; Software Development Engineer with expertise in architecting high-concurrency Java microservices, event-driven architectures with Apache Kafka, and production-grade Agentic AI workflows using LangGraph and LLMs.
              </p>
              <p>
                My focus lies in building scalable enterprise solutions—from designing multi-service Spring Boot platforms with Redis caching and Spring Security RBAC to engineering native Human-in-the-Loop AI state graphs with Pydantic validation schemas. I am committed to writing clean, maintainable code, optimizing database performance, and delivering resilient software.
              </p>
            </div>

            {/* Quick Contacts Bar */}
            <div className="quick-contacts-bar select-none">
              <div className="qc-item">
                <div className="qc-icon"><FiMail /></div>
                <a href="mailto:keshavmittal1207@gmail.com" className="text-text-main font-bold">
                  keshavmittal1207@gmail.com
                </a>
              </div>
              
              <div className="qc-divider"></div>
              
              <div className="qc-item">
                <div className="qc-icon"><FiMapPin /></div>
                <span className="text-text-main font-bold">Delhi, India</span>
              </div>
              
              <div className="qc-divider"></div>
              
              <div className="qc-item">
                <div className="qc-icon"><FiPhone /></div>
                <a href="tel:+918700007682" className="text-text-main font-bold">
                  +91-8700007682
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Highlights & Focus (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="text-[11px] font-bold text-accent uppercase tracking-[2px] mb-1 select-none">
            Highlights &amp; Focus
          </div>
          
          {/* Card 1: Education */}
          <div className="glass-card p-5 flex items-start gap-4 border-l-4 border-l-accent hover:border-accent/40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-accent/8 text-accent flex items-center justify-center shrink-0 select-none">
              <FiBookOpen size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-[14.5px] text-text-main">Education &amp; Academic Excellence</h4>
              <p className="text-[12.5px] text-brand-gray leading-relaxed">
                B.Tech in Computer Science &amp; Engineering at Dr. Akhilesh Das Gupta Institute of Professional Studies with an impressive <strong>GPA of 8.56</strong>.
              </p>
            </div>
          </div>

          {/* Card 2: Microservices & Event-Driven Systems */}
          <div className="glass-card p-5 flex items-start gap-4 border-l-4 border-l-cyan hover:border-cyan/40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-cyan/8 text-cyan flex items-center justify-center shrink-0 select-none">
              <FiLayers size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-[14.5px] text-text-main">Microservices &amp; Event-Driven Architecture</h4>
              <p className="text-[12.5px] text-brand-gray leading-relaxed">
                Building scalable Spring Boot microservices, Spring Cloud Gateway routing, Kafka event pipelines and Redis caching.
              </p>
            </div>
          </div>

          {/* Card 3: Agentic AI & Systems */}
          <div className="glass-card p-5 flex items-start gap-4 border-l-4 border-l-pink hover:border-pink/40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-pink/8 text-pink flex items-center justify-center shrink-0 select-none">
              <FiCpu size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-[14.5px] text-text-main">Production Agentic AI Systems</h4>
              <p className="text-[12.5px] text-brand-gray leading-relaxed">
                Architecting multi-node Agentic AI systems with LangGraph StateGraph, LangChain, Evaluator-Optimizer loops, Checkpointer , Store and Human-in-the-Loop state persistence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
