import { useState, useEffect } from 'react';
import { getProjects, resolveUrl, sortItemsByDate, parseDemoLinks } from '../../../api/services';
import { FiSearch, FiGithub, FiExternalLink, FiEye, FiInfo, FiX, FiCalendar, FiLayers } from 'react-icons/fi';

export default function ProjectsSection({ projects: initialProjects, onPreview }) {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (initialProjects) {
      setProjects(sortItemsByDate(initialProjects, 'createdDate'));
      setIsLoading(false);
    } else {
      setIsLoading(true);
      getProjects({ page: 0, size: 100 })
        .then((res) => {
          if (res.data?.content) {
            setProjects(sortItemsByDate(res.data.content, 'createdDate'));
          }
        })
        .catch(console.error)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [initialProjects]);

  // Close project details modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter projects by search query
  const filteredData = projects.filter((item) => {
    const term = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      (item.techStack || '').toLowerCase().includes(term) ||
      (item.shortDescription || '').toLowerCase().includes(term) ||
      (item.detailedDescription || '').toLowerCase().includes(term)
    );
  });

  // Calculate local client-side pagination
  const pageSize = 4;
  const totalFilteredPages = Math.ceil(filteredData.length / pageSize) || 1;
  const currentPage = Math.min(page, totalFilteredPages - 1);
  const activePage = currentPage >= 0 ? currentPage : 0;
  const paginatedData = filteredData.slice(activePage * pageSize, (activePage + 1) * pageSize);

  const ProjectsSkeleton = () => (
    <div className="proj-grid grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
      {[1, 2].map((n) => (
        <div key={n} className="pj border border-brand-border/40 rounded-3xl overflow-hidden bg-brand-surface/60 backdrop-blur-md flex flex-col h-[320px]">
          {/* Cover image skeleton */}
          <div className="skeleton w-full h-[140px] opacity-40" />
          {/* Card body skeleton */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="skeleton w-1/3 h-5 rounded-lg opacity-80" />
                <div className="skeleton w-1/4 h-3.5 rounded-lg opacity-60" />
              </div>
              <div className="skeleton w-full h-4 rounded-lg opacity-60" />
              <div className="skeleton w-5/6 h-4 rounded-lg opacity-60" />
            </div>
            <div className="space-y-3 mt-4">
              <div className="flex gap-2">
                <div className="skeleton w-12 h-6 rounded-md opacity-75" />
                <div className="skeleton w-16 h-6 rounded-md opacity-75" />
                <div className="skeleton w-14 h-6 rounded-md opacity-75" />
              </div>
              <div className="flex gap-2.5">
                <div className="skeleton w-20 h-8 rounded-xl opacity-80" />
                <div className="skeleton w-24 h-8 rounded-xl opacity-80" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section 
      id="projects" 
      className="section py-24 px-6 md:px-20 max-w-6xl mx-auto relative z-10 transition-colors duration-500 select-text"
    >
      <div className="eyebrow block text-[11px] font-bold uppercase tracking-[2.5px] text-accent mb-2">
        Projects
      </div>
      <h2 className="sec-title font-display text-[clamp(26px,3vw,40px)] font-bold tracking-[-1px] text-text-main mb-6">
        Featured Works
      </h2>

      {/* Search Input */}
      <div className="proj-search flex items-center gap-2.5 bg-brand-surface border border-brand-border rounded-xl px-4 py-3 mb-8 select-none">
        <FiSearch size={16} className="text-brand-muted shrink-0" />
        <input 
          type="text" 
          placeholder="Search projects, tech stack, or descriptions..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0); // Reset page on filter
          }}
          className="flex-1 border-none bg-transparent outline-none font-sans text-[14px] text-brand-gray placeholder-brand-muted"
        />
      </div>

      {/* Grid or Skeleton Loader */}
      {isLoading ? (
        <ProjectsSkeleton />
      ) : (
        <div className="proj-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedData.length === 0 ? (
            <div className="md:col-span-2 text-center py-12 text-slate-400 font-medium select-none text-sm bg-white/5 border border-brand-border/60 rounded-3xl">
              {search ? "No projects matched your criteria." : "No projects uploaded yet."}
            </div>
          ) : (
            paginatedData.map((project) => {
              const photoUrl = project.imageUrl ? resolveUrl(project.imageUrl) : '';
              const demoLinks = parseDemoLinks(project.liveLink);

              return (
                <div key={project.id} className="pj flex flex-col bg-brand-surface border border-brand-border/40 rounded-3xl overflow-hidden shadow-lg select-text h-full min-h-[320px] transition-all duration-300 hover:border-brand-border/80">
                  {/* Cover Image Container (140px height) */}
                  {photoUrl ? (
                    <div 
                      className="pj-img h-[140px] flex items-center justify-center relative overflow-hidden select-none bg-brand-bg border-b border-brand-border/40 cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <img 
                        src={photoUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                      <div className="pj-img-label">Click for Details</div>
                    </div>
                  ) : (
                    // Aesthetic placeholder gradient if no image uploaded
                    <div 
                      onClick={() => setSelectedProject(project)}
                      className="h-[120px] bg-gradient-to-tr from-accent/10 to-cyan/10 border-b border-brand-border/45 flex items-center justify-center select-none font-display font-semibold text-brand-muted text-[13px] tracking-wide cursor-pointer hover:bg-accent/15 transition-all"
                    >
                      Click to View Overview
                    </div>
                  )}

                  {/* Body */}
                  <div className="pj-body p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="pj-top flex justify-between items-start gap-2.5 mb-2.5">
                        <h3 
                          onClick={() => setSelectedProject(project)}
                          className="pj-title font-display text-[16.5px] font-bold text-text-main leading-[1.2] cursor-pointer hover:text-accent transition-colors"
                        >
                          {project.title}
                        </h3>
                        <span className="pj-date text-[10px] font-bold text-brand-muted uppercase tracking-wider whitespace-nowrap bg-accent/8 border border-brand-border/50 px-2 py-0.5 rounded-md">
                          {project.createdDate || 'DEC 2025'}
                        </span>
                      </div>

                      <p className="pj-desc text-[13.5px] text-brand-gray leading-[1.65] mb-4 line-clamp-3">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div>
                      <div className="pj-tags flex flex-wrap gap-1.5 mb-4.5 select-none">
                        {(project.techStack || '').split(',')
                          .map((tech) => tech.trim())
                          .filter(Boolean)
                          .map((tech) => (
                            <span key={tech} className="pj-tag">
                              {tech}
                            </span>
                          ))}
                      </div>

                      {/* Actions */}
                      <div className="pj-actions flex flex-wrap gap-2 select-none">
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="pj-btn inline-flex items-center gap-1.5 font-medium cursor-pointer"
                          title="View Full Detailed Overview"
                        >
                          <FiInfo size={13} /> Details
                        </button>

                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noreferrer" className="pj-btn inline-flex items-center gap-1.5">
                            <FiGithub size={13} /> GitHub
                          </a>
                        )}

                        {demoLinks.slice(0, 2).map((demo, idx) => (
                          <a key={idx} href={demo.url} target="_blank" rel="noreferrer" className="pj-btn live inline-flex items-center gap-1.5">
                            <FiExternalLink size={13} /> {demo.label}
                          </a>
                        ))}

                        {demoLinks.length > 2 && (
                          <button 
                            onClick={() => setSelectedProject(project)}
                            className="pj-btn live inline-flex items-center gap-1.5"
                          >
                            +{demoLinks.length - 2} Demos
                          </button>
                        )}

                        {photoUrl && (
                          <button 
                            onClick={() => onPreview(photoUrl)}
                            className="pj-btn prev inline-flex items-center gap-1.5 cursor-pointer"
                            title="Preview Image"
                          >
                            <FiEye size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {!isLoading && totalFilteredPages > 1 && (
        <div className="pagination flex items-center justify-center gap-2 mt-10 select-none">
          <button 
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={activePage === 0}
            className="pg disabled:opacity-40"
          >
            ‹
          </button>
          
          {[...Array(totalFilteredPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`pg ${activePage === i ? 'on' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          
          <button 
            onClick={() => setPage((p) => Math.min(totalFilteredPages - 1, p + 1))}
            disabled={activePage === totalFilteredPages - 1}
            className="pg disabled:opacity-40"
          >
            ›
          </button>
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md transition-opacity duration-300 select-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
        >
          <div className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 select-text text-left animate-fadeIn">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-brand-bg/80 border border-brand-border text-brand-muted hover:text-text-main hover:bg-brand-bg flex items-center justify-center transition-all z-20 cursor-pointer"
              title="Close (Esc)"
            >
              <FiX size={18} />
            </button>

            {/* Header Image (if exists) */}
            {selectedProject.imageUrl && (
              <div className="relative h-[190px] sm:h-[230px] rounded-2xl overflow-hidden border border-brand-border/50 bg-brand-bg">
                <img 
                  src={resolveUrl(selectedProject.imageUrl)} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    const imgUrl = resolveUrl(selectedProject.imageUrl);
                    setSelectedProject(null);
                    onPreview(imgUrl);
                  }}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-black/85 transition-all cursor-pointer"
                >
                  <FiEye size={13} /> View Cover
                </button>
              </div>
            )}

            {/* Title & Metadata */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-text-main leading-snug">
                  {selectedProject.title}
                </h3>
                {selectedProject.createdDate && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent bg-accent/10 border border-brand-border/60 px-3 py-1 rounded-full uppercase tracking-wider">
                    <FiCalendar size={12} />
                    {selectedProject.createdDate}
                  </span>
                )}
              </div>

              {/* Tech Stack Badges */}
              {selectedProject.techStack && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedProject.techStack.split(',')
                    .map((tech) => tech.trim())
                    .filter(Boolean)
                    .map((tech) => (
                      <span key={tech} className="pj-tag text-xs">
                        {tech}
                      </span>
                    ))}
                </div>
              )}
            </div>

            {/* Short description overview */}
            {selectedProject.shortDescription && (
              <div className="p-4 rounded-2xl bg-accent/5 border border-brand-border/50 text-sm text-brand-gray leading-relaxed font-medium">
                {selectedProject.shortDescription}
              </div>
            )}

            {/* Detailed Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <FiLayers size={13} />
                Detailed Overview
              </h4>
              <div className="text-[14px] sm:text-[14.5px] text-brand-gray leading-[1.8] space-y-3 whitespace-pre-line font-normal">
                {selectedProject.detailedDescription || selectedProject.shortDescription || "No detailed description provided."}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-brand-border/60">
              {selectedProject.githubLink && (
                <a 
                  href={selectedProject.githubLink} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="pj-btn inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl"
                >
                  <FiGithub size={15} /> GitHub Repository
                </a>
              )}
              
              {parseDemoLinks(selectedProject.liveLink).map((demo, idx) => (
                <a 
                  key={idx}
                  href={demo.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="pj-btn live inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl"
                >
                  <FiExternalLink size={15} /> {demo.label}
                </a>
              ))}

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="ml-auto px-4 py-2 text-xs font-semibold text-brand-muted hover:text-text-main transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
