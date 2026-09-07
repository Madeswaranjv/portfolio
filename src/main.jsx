import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  ArrowUpRight,
  Award,
  BookOpen,
  Bot,
  Braces,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code2,
  Cpu,
  Database,
  FileDown,
  Folder,
  GitBranch,
  Home,
  Layers3,
  Mail,
  Maximize2,
  Menu,
  Moon,
  Pause,
  Play,
  Server,
  Sun,
  User,
  X,
  Zap,
} from 'lucide-react'
import { FaAws, FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import {
  SiCplusplus,
  SiExpress,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import MagnificationDock from './components/MagnificationDock'
import './styles.css'

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || ''
const email = import.meta.env.VITE_CONTACT_EMAIL || 'madeswaranjv@gmail.com'

const socials = [
  { label: 'LinkedIn', icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/madeswaran-j-v-4909b8325' },
  { label: 'GitHub', icon: FaGithub, href: 'https://github.com/Madeswaranjv' },
  { label: 'X / Twitter', icon: FaXTwitter, href: 'https://x.com/' },
  { label: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/topstar_gaming20/?hl=en' },
]

const navItems = [
  { label: 'Home', href: '#home', icon: Home, showOnMobile: true },
  { label: 'About', href: '#about', icon: User, showOnMobile: true },
  { label: 'Education', href: '#education', icon: BookOpen, showOnMobile: false },
  { label: 'Skills', href: '#skills', icon: Braces, showOnMobile: true },
  { label: 'Experience', href: '#experience', icon: Briefcase, showOnMobile: false },
  { label: 'Projects', href: '#projects', icon: Folder, showOnMobile: true },
  { label: 'Certificates', href: '#certificates', icon: Award, showOnMobile: false },
  { label: 'Contact', href: '#contact', icon: Mail, showOnMobile: true },
]

const certificates = [
  {
    name: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services',
    date: '2026',
    icon: Cloud,
    className: 'aws-cert',
  },
  {
    name: 'AWS Cloud Foundations',
    issuer: 'AWS Academy',
    date: '2026',
    icon: Server,
    className: 'cloud-cert',
  },
  {
    name: 'AI Systems & LLM Agents',
    issuer: 'Deep Learning & MCP',
    date: '2026',
    icon: Bot,
    className: 'ai-cert',
  },
  {
    name: 'Full-Stack Web Engineering',
    issuer: 'Modern Web Stack',
    date: '2025',
    icon: Layers3,
    className: 'fullstack-cert',
  },
  {
    name: 'Continuous Learner in AI',
    issuer: 'Research & System Design',
    date: 'Ongoing',
    icon: Award,
    className: 'learning-cert',
  },
]

const certCardStackVariants = {
  stacked: (index) => {
    const total = certificates.length
    const reverseIndex = total - 1 - index
    return {
      x: `calc(${reverseIndex} * (100% + 0.45rem))`,
      y: reverseIndex * -2,
      rotate: reverseIndex * 1.5,
      scale: 1 - reverseIndex * 0.012,
      zIndex: index + 1,
      opacity: index === total - 1 ? 1 : 0.88,
    }
  },
  unstacked: (index) => {
    const total = certificates.length
    const reverseIndex = total - 1 - index
    return {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      zIndex: 1,
      opacity: 1,
      transition: {
        duration: 0.75,
        delay: reverseIndex * 0.045,
        ease: [0.16, 1, 0.3, 1],
      },
    }
  },
}


const skills = [
  { name: 'React', icon: SiReact, className: 'react' },
  { name: 'JavaScript', icon: SiJavascript, className: 'javascript' },
  { name: 'TypeScript', icon: SiTypescript, className: 'typescript' },
  { name: 'Node.js', icon: SiNodedotjs, className: 'node' },
  { name: 'Express', icon: SiExpress, className: 'express' },
  { name: 'MongoDB', icon: SiMongodb, className: 'mongodb' },
  { name: 'C++', icon: SiCplusplus, className: 'cpp' },
  { name: 'Python', icon: SiPython, className: 'python' },
  { name: 'Git', icon: SiGit, className: 'git' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, className: 'tailwind' },
  { name: 'Next.js', icon: SiNextdotjs, className: 'next' },
  { name: 'AWS', icon: FaAws, className: 'aws' },
]

const developmentProjects = [
  {
    name: 'Veridic',
    type: 'AI Agent Safety',
    description: 'Semantic grounding middleware that validates tool calls beyond schema correctness.',
    longDescription: 'Veridic is an AI agent safety and semantic grounding middleware that inspects, reasons over, and validates LLM tool calls beyond shallow schema correctness. Acting as an execution interceptor for Model Context Protocol (MCP) clients, it prevents catastrophic tool hallucination, prompt injection bypasses, and unauthorized state mutation in automated environments.',
    highlights: [
      'Intercepts MCP and function calling payloads before execution to evaluate semantic safety boundaries.',
      'Employs dynamic constraint solvers and heuristic safety graphs to detect adversarial prompt attacks.',
      'Maintains real-time audit logs and automated state rollback triggers for mission-critical agent workflows.',
    ],
    techStack: ['Python', 'MCP Protocol', 'FastAPI', 'LLM Tool Calling', 'Semantic Verification'],
    className: 'veridic',
    mark: 'V',
    github: 'https://github.com/Madeswaranjv',
  },
  {
    name: 'FlavourDash',
    type: 'Full-stack Platform',
    description: 'Luxury restaurant ordering with real-time operations and menu-grounded AI planning.',
    longDescription: 'FlavourDash is an end-to-end luxury gastronomic ordering platform engineered for seamless culinary experiences. It merges white-glove digital checkout workflows, real-time kitchen operations, and menu-grounded AI recommendations into a responsive, high-performance web system.',
    highlights: [
      'Real-time order lifecycle tracking and kitchen display management with instant operational updates.',
      'Interactive AI-assisted culinary planner providing bespoke dish pairings based on dietary preferences.',
      'Role-based authentication, dynamic menu filtering, and custom white-glove invoice generation.',
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Vercel'],
    className: 'flavordash',
    mark: 'FD',
    github: 'https://github.com/Madeswaranjv/RestaurantOrdering.git',
    liveUrl: 'https://restaurant-ordering-zeta.vercel.app/',
    images: [
      {
        url: '/content/flavordash/flavordash-1.png',
        caption: 'Luxury Gastronomy Storefront & Hero Landing',
      },
      {
        url: '/content/flavordash/flavordash-2.png',
        caption: 'Curated Masterpieces Culinary Menu & AI Planner',
      },
      {
        url: '/content/flavordash/flavordash-3.png',
        caption: 'Culinary Bag & White-Glove Checkout Invoice',
      },
      {
        url: '/content/flavordash/flavordash-4.png',
        caption: 'User Sign In & Culinary Profile Access',
      },
    ],
  },
  {
    name: 'Healix',
    type: 'Clinical AI Platform',
    description: 'Full-stack clinical intelligence assistant featuring streaming LLM reasoning, live medical search, and patient profile grounding.',
    longDescription: 'Healix is a comprehensive full-stack clinical intelligence platform and AI health assistant. Powered by Cortex M3, it provides real-time SSE token streaming, multi-format medical document ingestion (PDFs, Word docs, lab reports), live clinical web retrieval via Tavily, and patient clinical profile safety grounding.',
    highlights: [
      'High-concurrency FastAPI backend with SSE streaming for low-latency clinical query responses.',
      'Multi-document parsing and vector embeddings in ChromaDB for medical report RAG lookups.',
      'Clinical safety rails, emergency symptom triage workflows, and WHO/CDC guideline cross-referencing.',
    ],
    techStack: ['React', 'Vite', 'FastAPI', 'Python', 'ChromaDB', 'Zustand', 'Tavily API'],
    className: 'healix',
    mark: 'HX',
    logo: '/content/healix/healix-logo.png',
    github: 'https://github.com/Madeswaranjv/Healix.git',
    images: [
      {
        url: '/content/healix/healix-1.png',
        caption: 'Healix Clinical Assistant — Medical Query Interface',
      },
      {
        url: '/content/healix/healix-2.png',
        caption: 'Structured Clinical Evidence & Public Health Impact',
      },
      {
        url: '/content/healix/healix-3.png',
        caption: 'Emergency Triage & Reliable CDC Guidelines Reference',
      },
      {
        url: '/content/healix/healix-4.png',
        caption: 'Epidemiological Risk Modeling & WHO Pandemic Analysis',
      },
    ],
  },
  {
    name: 'CraftyWrap',
    type: 'E-commerce',
    description: 'An AWS-deployed handmade-yarn storefront with OAuth and category browsing.',
    longDescription: 'CraftyWrap is a dedicated e-commerce web platform deployed on AWS infrastructure, specialized for handcrafted artisanal yarn dolls and bespoke knitting collections. It features secure OAuth authentication, dynamic catalog browsing, personalized customer wishlists, and an optimized checkout experience.',
    highlights: [
      'Full-stack storefront architecture containerized and deployed across AWS cloud services.',
      'Secure user authentication with social OAuth login and token-based session verification.',
      'Dynamic client-side category filtering, inventory management, and modular authentication modals.',
    ],
    techStack: ['React', 'Express.js', 'MySQL', 'AWS EC2 / S3', 'Node.js', 'CSS Modules'],
    className: 'craftywrap',
    mark: 'CW',
    logo: '/content/craftywrap/craftywrap-logo.png',
    github: 'https://github.com/Madeswaranjv/CraftyWrap.git',
    liveUrl: 'https://craftywrap.com',
    images: [
      {
        url: '/content/craftywrap/craftywrap-hero.png',
        caption: 'Storefront Homepage — Handcrafted Yarn Dolls',
      },
      {
        url: '/content/craftywrap/craftywrap-collections.png',
        caption: 'Our Collections Catalog & Filterable Product Grid',
      },
      {
        url: '/content/craftywrap/craftywrap-3.png',
        caption: 'User Login & Account Authentication Modal',
      },
      {
        url: '/content/craftywrap/craftywrap-checkout.png',
        caption: 'Complete Checkout & Razorpay Online Payment',
      },
    ],
  },
]

const otherProjects = [
  {
    name: 'FedDermGNN',
    type: 'Medical AI Research',
    description: 'Federated learning with patient-similarity graphs for skin disease diagnosis.',
    longDescription: 'FedDermGNN is a privacy-preserving medical AI research platform utilizing federated graph neural networks for multi-site dermatological disease diagnosis. By constructing patient-similarity graphs across distributed clinical nodes without centralizing sensitive patient imaging data, it achieves state-of-the-art diagnostic accuracy while upholding strict clinical privacy and data sovereignty standards.',
    highlights: [
      'Decentralized federated training across clinical nodes without centralizing raw patient images.',
      'Patient-similarity graph neural networks (GNNs) capturing inter-case topological and clinical feature correlations.',
      'Robust differential privacy mechanisms safeguarding against model inversion and reconstruction attacks.',
    ],
    techStack: ['PyTorch', 'PyTorch Geometric', 'Federated Learning', 'Graph Neural Networks', 'Python'],
    className: 'fedderm',
    mark: 'FG',
    github: 'https://github.com/Madeswaranjv',
  },
  {
    name: 'Ultra',
    type: 'AI-Native Shell',
    description: 'AI-native operating shell analyzing codebases via Tree-sitter AST parsing, parallel scanning, and structural indexing.',
    longDescription: 'Ultra is an AI-native operating shell and developer environment built for deep codebase comprehension. By integrating Tree-sitter AST parsing, multi-threaded parallel scanning, and structural code indexing, Ultra allows developers and autonomous agents to explore and refactor large code repositories with lightning speed.',
    highlights: [
      'Tree-sitter AST parser generates comprehensive structural syntax graphs for multi-language repositories.',
      'High-throughput multi-threaded worker pools for instantaneous sub-second symbol lookups.',
      'Terminal-first developer interface with contextual AI prompt piping and automated diff generation.',
    ],
    techStack: ['Rust', 'Tree-sitter', 'Python', 'CLI Architecture', 'AST Parsing'],
    className: 'ultra',
    mark: 'ULT',
    github: 'https://github.com/Madeswaranjv/UltraAI-Native-Operatingshell.git',
  },
]

const sectionMotion = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
}

const skillCardStackVariants = {
  stacked: (index) => ({
    x: `calc(${(11 - index)} * (100% + 0.45rem))`,
    y: (11 - index) * -2,
    rotate: (11 - index) * 1.5,
    scale: 1 - (11 - index) * 0.012,
    zIndex: index + 1,
    opacity: index === 11 ? 1 : 0.88,
  }),
  unstacked: (index) => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    zIndex: 1,
    opacity: 1,
    transition: {
      duration: 0.75,
      delay: (11 - index) * 0.045,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const projectCardStackVariants = {
  stacked: (index) => ({
    x: `calc(-1 * ${index} * (100% + 1rem))`,
    y: index * -2.5,
    rotate: index * -1.8,
    scale: 1 - index * 0.015,
    zIndex: 10 - index,
    opacity: index === 0 ? 1 : 0.88,
  }),
  unstacked: (index) => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    zIndex: 1,
    opacity: 1,
    transition: {
      duration: 0.75,
      delay: index * 0.055,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

function SocialLinks({ className = '' }) {
  return (
    <div className={`social-links ${className}`}>
      {socials.map(({ label, icon: Icon, href }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
          <Icon aria-hidden="true" strokeWidth={1.7} />
        </a>
      ))}
    </div>
  )
}

function ProjectImageSlideshow({ images, projectMark, className, onOpenLightbox }) {
  const [[currentIndex, direction], setPage] = useState([0, 1])

  useEffect(() => {
    if (!images || images.length === 0) return

    const timer = setInterval(() => {
      setPage(([prevIdx]) => [(prevIdx + 1) % images.length, 1])
    }, 3000)

    return () => clearInterval(timer)
  }, [images])

  if (!images || images.length === 0) {
    return (
      <div className={`project-visual ${className}`}>
        <span className="project-grid" />
        <span className="project-mark">{projectMark}</span>
        <span className="project-orbit" />
      </div>
    )
  }

  const currentImg = images[currentIndex]

  const handleDotClick = (e, index) => {
    e.stopPropagation()
    e.preventDefault()
    const dir = index > currentIndex ? 1 : -1
    setPage([index, dir])
  }

  const handleZoom = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (onOpenLightbox) {
      onOpenLightbox(currentIndex)
    }
  }

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  }

  return (
    <div
      className="project-visual-slideshow"
      onClick={handleZoom}
      title="Click to expand full screen"
    >
      <div className="slideshow-stage">
        <AnimatePresence custom={direction} mode="popLayout" initial={false}>
          <motion.img
            key={currentIndex}
            src={currentImg.url}
            alt={currentImg.caption || 'Project screenshot'}
            className="project-slideshow-img"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>
      </div>

      <div className="slideshow-overlay-gradient" />

      <div className="slideshow-dots-bar">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`slideshow-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={(e) => handleDotClick(e, idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <button
        type="button"
        className="slideshow-zoom-btn"
        onClick={handleZoom}
        aria-label="Enlarge screenshot"
        title="View full screen"
      >
        <Maximize2 size={12} />
      </button>
    </div>
  )
}

function ProjectLightboxModal({ project, initialIndex = 0, onClose }) {
  const [[currentIndex, direction], setPage] = useState([initialIndex, 0])
  const images = project?.images || []

  useEffect(() => {
    setPage([initialIndex, 0])
  }, [initialIndex])

  const paginate = (newDirection) => {
    let nextIndex
    if (newDirection > 0) {
      nextIndex = (currentIndex + 1) % images.length
    } else {
      nextIndex = (currentIndex - 1 + images.length) % images.length
    }
    setPage([nextIndex, newDirection])
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') paginate(-1)
      if (e.key === 'ArrowRight') paginate(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, images.length, onClose])

  if (!project || images.length === 0) return null

  const currentImg = images[currentIndex]

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
    }),
  }

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="lightbox-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="lightbox-header">
            <div className="lightbox-title">
              <h3>{project.name}</h3>
              <span>
                {currentIndex + 1} / {images.length}
              </span>
            </div>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={onClose}
              aria-label="Close viewer"
            >
              <X size={18} />
            </button>
          </div>

          <div
            className="lightbox-image-wrapper"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const clickX = e.clientX - rect.left
              if (clickX < rect.width * 0.4) {
                paginate(-1)
              } else {
                paginate(1)
              }
            }}
            style={{ cursor: 'pointer' }}
            title="Click photo to cycle"
          >
            <AnimatePresence custom={direction} mode="popLayout" initial={false}>
              <motion.img
                key={currentIndex}
                src={currentImg.url}
                alt={currentImg.caption || project.name}
                className="lightbox-image"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
          </div>

          <div className="lightbox-footer">
            <p className="lightbox-caption">{currentImg.caption}</p>

            <div className="lightbox-controls">
              <button
                type="button"
                className="lightbox-nav-btn"
                onClick={() => paginate(-1)}
                aria-label="Previous image"
                title="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                className="lightbox-nav-btn"
                onClick={() => paginate(1)}
                aria-label="Next image"
                title="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function ProjectDetailsModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!project) return null

  const githubUrl = project.github || 'https://github.com/Madeswaranjv'
  const liveUrl = project.liveUrl || project.live || project.url || null

  return (
    <AnimatePresence>
      <motion.div
        className="project-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="project-modal-dialog surface-card"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="project-modal-header">
            <div>
              <span className="project-modal-eyebrow">{project.type}</span>
              <div className="project-modal-title-row">
                <div className={`project-modal-mark ${project.className} ${project.logo ? 'has-custom-logo' : ''}`}>
                  {project.logo ? (
                    <img src={project.logo} alt={`${project.name} Logo`} className="project-modal-logo-img" />
                  ) : (
                    project.mark
                  )}
                </div>
                <h2>{project.name}</h2>
              </div>
            </div>
            <button
              type="button"
              className="project-modal-close"
              onClick={onClose}
              aria-label="Close details"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="project-modal-body">
            <div className="project-modal-section">
              <h4 className="project-modal-section-title">Overview</h4>
              <p className="project-modal-long-desc">
                {project.longDescription || project.description}
              </p>
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div className="project-modal-section">
                <h4 className="project-modal-section-title">Key Architectural Features</h4>
                <ul className="project-modal-highlights">
                  {project.highlights.map((item, idx) => (
                    <li key={idx}>
                      <span className="highlight-bullet" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.techStack && project.techStack.length > 0 && (
              <div className="project-modal-section">
                <h4 className="project-modal-section-title">Technologies &amp; Architecture</h4>
                <div className="project-modal-chips">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="project-modal-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="project-modal-footer">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="gold-button project-modal-action-btn"
                title="Visit Live Deployment"
              >
                <span>Visit Live Website</span>
                <ArrowUpRight size={15} />
              </a>
            )}
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="outline-button project-modal-action-btn"
              title="View Repository on GitHub"
            >
              <FaGithub size={15} />
              <span>View Source Code</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function ProjectCard({ project, index = 0, onOpenLightbox, onOpenDetails }) {
  const hasImages = project.images && project.images.length > 0
  const githubUrl = project.github || 'https://github.com/Madeswaranjv'
  const liveUrl = project.liveUrl || project.live || project.url || null

  return (
    <motion.div
      className="project-card"
      custom={index}
      variants={projectCardStackVariants}
    >
      {hasImages ? (
        <ProjectImageSlideshow
          images={project.images}
          projectMark={project.mark}
          className={project.className}
          onOpenLightbox={(imgIndex) => onOpenLightbox && onOpenLightbox(project, imgIndex)}
        />
      ) : (
        <div className={`project-visual ${project.className}`}>
          <span className="project-grid" />
          <span className="project-mark">{project.mark}</span>
          <span className="project-orbit" />
        </div>
      )}
      <div
        className="project-copy project-copy-clickable"
        onClick={() => onOpenDetails && onOpenDetails(project)}
        role="button"
        tabIndex={0}
        aria-label={`View detailed description for ${project.name}`}
      >
        <p className="eyebrow">{project.type}</p>
        <div className="project-title-row">
          <h3>{project.name}</h3>
          <div className="project-action-links" onClick={(e) => e.stopPropagation()}>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.name} GitHub Repository`}
              title="View Repository on GitHub"
              className="project-github-link"
            >
              <FaGithub aria-hidden="true" />
            </a>
            <a
              href={liveUrl || "#contact"}
              target={liveUrl ? "_blank" : undefined}
              rel={liveUrl ? "noreferrer" : undefined}
              aria-label={liveUrl ? `Visit ${project.name} live website` : `Contact about ${project.name}`}
              title={liveUrl ? "Visit Live Website" : "Contact about this project"}
              className="project-arrow-link"
            >
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <p>{project.description}</p>
        <div className="project-details-indicator">
          <span>Read More Details</span>
          <ArrowUpRight size={11} aria-hidden="true" />
        </div>
      </div>
    </motion.div>
  )
}

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 300)
          return 100
        }
        const diff = Math.floor(Math.random() * 12) + 6
        return Math.min(prev + diff, 100)
      })
    }, 70)

    return () => clearInterval(timer)
  }, [onComplete])

  const perimeter = 288
  const strokeOffset = perimeter - (perimeter * progress) / 100

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="loading-content">
        <motion.div
          className="loading-box-wrapper"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg className="loading-box-svg" viewBox="0 0 80 80" width="90" height="90">
            <rect
              x="4"
              y="4"
              width="72"
              height="72"
              fill="none"
              stroke="rgba(200, 164, 90, 0.15)"
              strokeWidth="2.5"
            />
            <rect
              x="4"
              y="4"
              width="72"
              height="72"
              fill="none"
              stroke="var(--gold, #c8a45a)"
              strokeWidth="3"
              strokeDasharray={perimeter}
              strokeDashoffset={strokeOffset}
              style={{
                transition: 'stroke-dashoffset 0.1s linear',
                filter: 'drop-shadow(0 0 8px rgba(200, 164, 90, 0.6))',
              }}
            />
          </svg>
          <span className="loading-box-letter">M</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

const aboutPassageText = `I'm Madeswaran JV, a third-year Computer Science Engineering student at Thiagarajar College of Engineering, focused on AI agents, full-stack development, and backend engineering. I've worked as an intern at IdentifYou Technologies Private Ltd and Elysian Intelligence Business Solutions, and I build end-to-end systems — from agent-trust middleware to real-time ordering platforms with role-based auth and live updates. I'm currently working on Veridic, a semantic grounding layer for MCP tool calls, alongside Healix, a full-stack clinical intelligence platform.`

function AboutPassageReader({ text }) {
  const [activeCharIndex, setActiveCharIndex] = useState(-1)
  const [hasStarted, setHasStarted] = useState(false)
  const containerRef = useRef(null)

  const wordData = useMemo(() => {
    let globalIndex = 0
    return text.split(' ').map((word) => {
      const letters = word.split('').map((char) => ({
        char,
        index: globalIndex++,
      }))
      globalIndex++ // space count
      return { word, letters }
    })
  }, [text])

  const totalChars = useMemo(() => {
    return wordData.reduce((acc, w) => acc + w.letters.length + 1, 0) - 1
  }, [wordData])

  useEffect(() => {
    const handleCheckScroll = () => {
      if (!containerRef.current || hasStarted) return
      const rect = containerRef.current.getBoundingClientRect()
      if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0) {
        setHasStarted(true)
      }
    }

    window.addEventListener('scroll', handleCheckScroll, { passive: true })
    handleCheckScroll()

    return () => window.removeEventListener('scroll', handleCheckScroll)
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    setActiveCharIndex(0)
    const interval = setInterval(() => {
      setActiveCharIndex((prev) => {
        if (prev >= totalChars + 6) {
          clearInterval(interval)
          return totalChars + 10
        }
        return prev + 1
      })
    }, 42)

    return () => clearInterval(interval)
  }, [hasStarted, totalChars])

  return (
    <p ref={containerRef} className="about-reading-passage">
      {wordData.map((wordObj, wIdx) => (
        <span key={wIdx} className="word-group">
          {wordObj.letters.map(({ char, index }) => {
            const isGoldWave = index <= activeCharIndex && index >= activeCharIndex - 4
            const isPast = index < activeCharIndex - 4
            return (
              <span
                key={index}
                className={`reading-char ${isGoldWave ? 'char-gold-wave' : ''} ${isPast ? 'char-read' : ''}`}
              >
                {char}
              </span>
            )
          })}
        </span>
      ))}
    </p>
  )
}

function IdentifYouIllustration() {
  return (
    <motion.div
      className="exp-illustration-card exp-illustration-right exp-diagram-widget"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="stock-illustration-container">
        <img
          src="/content/developer_stock_illustration.png"
          alt="Developer at computer desk illustration"
          className="stock-illustration-img"
        />
      </div>
    </motion.div>
  )
}

function ElysianIllustration() {
  return (
    <motion.div
      className="exp-illustration-card exp-illustration-left exp-diagram-widget"
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    >
      <div className="stock-illustration-container">
        <img
          src="/content/developer_stock_illustration.png"
          alt="Developer at computer desk illustration"
          className="stock-illustration-img"
        />
      </div>
    </motion.div>
  )
}

function ScrambleWord({ word, className, baseDelay = 150, duration = 2400 }) {
  const MORPH_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const [displayedChars, setDisplayedChars] = useState(() =>
    word.split('').map(() => MORPH_CHARSET[Math.floor(Math.random() * MORPH_CHARSET.length)])
  )
  const [lockedIndices, setLockedIndices] = useState(() => new Set())

  useEffect(() => {
    let frameId
    const startTime = performance.now() + baseDelay
    const targetLetters = word.split('')
    const totalCount = targetLetters.length

    const updateFrame = (now) => {
      const elapsed = now - startTime
      if (elapsed < 0) {
        frameId = requestAnimationFrame(updateFrame)
        return
      }

      const progress = Math.min(elapsed / duration, 1)
      const newlyLocked = new Set()

      const nextChars = targetLetters.map((targetChar, i) => {
        if (targetChar === ' ') return ' '
        const charLockThreshold = (i + 1) / (totalCount + 0.3)
        if (progress >= charLockThreshold || progress >= 1) {
          newlyLocked.add(i)
          return targetChar
        }
        return MORPH_CHARSET[Math.floor(Math.random() * MORPH_CHARSET.length)]
      })

      setDisplayedChars(nextChars)
      setLockedIndices(newlyLocked)

      if (progress < 1) {
        frameId = requestAnimationFrame(updateFrame)
      } else {
        setDisplayedChars(targetLetters)
        setLockedIndices(new Set(targetLetters.map((_, i) => i)))
      }
    }

    frameId = requestAnimationFrame(updateFrame)
    return () => cancelAnimationFrame(frameId)
  }, [word, baseDelay, duration])

  return (
    <span className={className}>
      {displayedChars.map((char, index) => {
        const isLocked = lockedIndices.has(index)
        return (
          <motion.span
            key={index}
            className={`scramble-char-slot ${isLocked ? 'is-locked' : 'is-scrambling'}`}
            initial={{ opacity: 0, scale: 3.2, filter: 'blur(20px)', z: 200 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', z: 0 }}
            transition={{
              duration: 2.2,
              delay: (baseDelay + index * 45) / 1000,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              display: 'inline-block',
              transformOrigin: 'center center',
            }}
          >
            {char}
          </motion.span>
        )
      })}
    </span>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [lightboxState, setLightboxState] = useState({ isOpen: false, project: null, initialIndex: 0 })
  const [activeProjectDetails, setActiveProjectDetails] = useState(null)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sectionIds = ['home', 'about', 'education', 'skills', 'experience', 'projects', 'certificates', 'contact']
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220
      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const dockItems = useMemo(() => {
    const navDockItems = navItems.map(({ label, href, icon: Icon }) => {
      const sectionId = href.replace('#', '')
      return {
        label,
        href,
        icon: <Icon />,
        isActive: activeSection === sectionId,
      }
    })

    return [
      {
        label: 'Download Resume',
        href: '/3rdyearresume.pdf',
        download: 'Madeswaran_JV_Resume.pdf',
        icon: <FileDown />,
        className: 'dock-resume-btn',
      },
      { isDivider: true },
      ...navDockItems,
      { isDivider: true },
      {
        label: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
        onClick: toggleTheme,
        icon: theme === 'dark' ? <Sun /> : <Moon />,
      },
    ]
  }, [activeSection, theme])

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isLoading])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <main>
      <header className="site-header">
        <MagnificationDock items={dockItems} />
      </header>

      <section className="hero section-shell" id="home">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.15 } },
          }}
        >
          <motion.p
            className="kicker"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span /> Available for meaningful work
          </motion.p>

          <motion.h1 className="hero-title-animated">
            <ScrambleWord word="Madeswaran" className="name-first" baseDelay={950} duration={2400} />{' '}
            <ScrambleWord word="JV" className="name-last" baseDelay={1250} duration={2200} />
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Third-year CS Engineering student building AI agents and full-stack systems — from
            semantic-grounding middleware for MCP tools to production-style ordering platforms.
          </motion.p>
          
          <motion.div
            className="hero-cta-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <a className="gold-button" href="#contact">Let&apos;s Talk <ArrowUpRight aria-hidden="true" /></a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SocialLinks className="hero-socials" />
          </motion.div>
        </motion.div>

        <motion.div
          className="portrait-stage"
          initial={{
            opacity: 0,
            y: -650,
            rotateX: 65,
            rotateY: -30,
            rotateZ: 20,
            scale: 0.6,
          }}
          animate={{
            opacity: [0, 1, 1, 1, 1],
            y: [-650, 28, -12, 5, 0],
            rotateX: [65, -16, 7, -2, 0],
            rotateY: [-30, 9, -3, 1, 0],
            rotateZ: [20, -6, 2, 0, 0],
            scale: [0.6, 1.06, 0.97, 1.01, 1],
          }}
          transition={{
            duration: 2.1,
            delay: 1.05,
            times: [0, 0.52, 0.74, 0.88, 1],
            ease: 'easeOut',
          }}
        >
          <motion.div
            className="portrait-halo halo-one"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.05, ease: 'easeOut' }}
          />
          <motion.div
            className="portrait-halo halo-two"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.45 }}
            transition={{ duration: 1.4, delay: 2.15, ease: 'easeOut' }}
          />
          <div className="portrait-frame">
            <div className="portrait-card-3d">
              <div className="portrait-face portrait-front">
                <video
                  autoPlay
                  muted
                  playsInline
                  poster="/content/myphoto.png"
                  className="profile-smile-video"
                >
                  <source src="/content/profile_smile.mp4" type="video/mp4" />
                  <img src="/content/profile_smile.gif" alt="Madeswaran JV" />
                </video>
              </div>
              <div className="portrait-face portrait-back">
                <img src="/content/hoverphoto.png" alt="Madeswaran JV Avatar" />
              </div>
            </div>
          </div>
          <motion.p
            className="portrait-caption"
            initial={{ opacity: 0, y: 35, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
          >
            CS ENGINEERING / AI SYSTEMS
          </motion.p>
        </motion.div>
      </section>

      <motion.section className="section-shell" id="about" {...sectionMotion}>
        <div className="section-heading">
          <h2>About <em>Me</em></h2>
        </div>
        <article className="about-card surface-card">
          <AboutPassageReader text={aboutPassageText} />
        </article>
      </motion.section>

      {/* Solo Full-Width Education Section */}
      <motion.section className="section-shell education-section" id="education" {...sectionMotion}>
        <div className="section-heading">
          <h2>Academic <em>Education</em></h2>
        </div>
        <article className="education-solo-card surface-card">
          <div className="education-solo-body">
            <div className="education-solo-info">
              <div className="education-degree-header">
                <span className="edu-tag">Undergraduate Degree</span>
                <h3>B.E. Computer Science &amp; Engineering</h3>
                <h4>Thiagarajar College of Engineering</h4>
                <p className="edu-location-text">Madurai, Tamil Nadu &middot; Autonomous Institution</p>
              </div>

              <div className="edu-badges-row">
                <span className="edu-badge-highlight">CGPA 8.54 / 10.0</span>
                <span className="edu-badge-normal">3rd Year &middot; Batch 2024 - 2028</span>
                <span className="edu-badge-normal">Full-Time Campus Program</span>
              </div>

              <div className="edu-description-block">
                <p>
                  Pursuing a Bachelor of Engineering in Computer Science with a strong core in AI Systems, Agentic Middleware,
                  Data Structures, Database Engineering, and High-Performance Web Architectures.
                </p>
              </div>

              <div className="edu-coursework-group">
                <p className="edu-coursework-title">Key Core Subjects &amp; Focus Areas:</p>
                <div className="edu-chips-wrap">
                  <span className="edu-chip-item">Artificial Intelligence &amp; Agents</span>
                  <span className="edu-chip-item">Data Structures &amp; Algorithms</span>
                  <span className="edu-chip-item">Database Management Systems</span>
                  <span className="edu-chip-item">Object Oriented Programming (C++)</span>
                  <span className="edu-chip-item">Operating Systems &amp; Networks</span>
                  <span className="edu-chip-item">Full-Stack Web Engineering</span>
                </div>
              </div>
            </div>

            <div className="education-solo-logo">
              <div className="tce-logo-solo-frame">
                <img src="/content/tcelogo.png" alt="Thiagarajar College of Engineering Logo" className="tce-solo-img" />
                <span className="tce-logo-caption">TCE Madurai</span>
              </div>
            </div>
          </div>
        </article>
      </motion.section>

      {/* Solo Full-Width Skills Section */}
      <motion.section className="section-shell skills-section" id="skills" {...sectionMotion}>
        <div className="section-heading section-heading-inline">
          <div>
            <h2>Skills &amp; <em>Technologies</em></h2>
          </div>
          <p className="section-note">Building across the stack, with an eye on systems that hold up in production.</p>
        </div>
        <motion.div
          className="skills-grid"
          initial="stacked"
          whileInView="unstacked"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skills.map(({ name, icon: Icon, className }, index) => (
            <motion.div
              className="skill-card"
              key={name}
              custom={index}
              variants={skillCardStackVariants}
            >
              <div className={`skill-icon ${className}`}><Icon aria-hidden="true" /></div>
              <span>{name}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Solo Full-Width Industry Experience Section */}
      <motion.section className="section-shell experience-section" id="experience" {...sectionMotion}>
        <div className="section-heading">
          <h2>Industry <em>Experience</em></h2>
        </div>
        <div className="experience-solo-container surface-card">
          {/* IdentifYou Internship - Top (Left-aligned Logo, Top-Right Duration, Bottom-Right Illustration) */}
          <div className="experience-entry-card experience-left-aligned">
            <div className="experience-entry-header">
              <div className="company-solo-logo-frame">
                <img src="/content/identifyou.png" alt="IdentifYou Technologies Logo" className="company-solo-img" />
              </div>
              <div className="company-solo-meta">
                <div className="company-title-line">
                  <h3>Digital Engineer Trainee &ndash; (Stipend)</h3>
                  <span className="exp-duration-badge">Jun 2026 &ndash; Jul 2026</span>
                </div>
                <h4 className="company-name">IdentifYou Technologies Private Ltd</h4>
                <p className="company-location">Madurai, Tamil Nadu</p>
              </div>
            </div>
            <div className="experience-entry-body">
              <ul className="exp-bullets-list">
                <li>Worked on real–world software development tasks alongside the engineering team during the internship.</li>
                <li>Developed a module with React.js (Frontend), Express.js (Backend), MySQL (Database).</li>
                <li>Had a good experience on real-time debugging business logic errors.</li>
              </ul>
              <div className="exp-tech-chips">
                <span>React.js</span>
                <span>Express.js</span>
                <span>MySQL</span>
                <span>Full-Stack</span>
                <span>Debugging</span>
              </div>
            </div>

            {/* Bottom Right Corner Illustration for IdentifYou */}
            <IdentifYouIllustration />
          </div>

          <div className="experience-solo-divider" />

          {/* Elysian Internship - Bottom (Right-aligned Logo, Top-Left Duration, Bottom-Left Illustration) */}
          <div className="experience-entry-card experience-right-aligned">
            <div className="experience-entry-header flex-row-reverse">
              <div className="company-solo-logo-frame">
                <img src="/content/elysian.png" alt="Elysian Intelligence Logo" className="company-solo-img" />
              </div>
              <div className="company-solo-meta text-right">
                <div className="company-title-line flex-row-reverse">
                  <h3>Software Developer Intern</h3>
                  <span className="exp-duration-badge">Jun 2025 &ndash; Jul 2025 (2- weeks)</span>
                </div>
                <h4 className="company-name">Elysian Intelligence Business Solutions</h4>
              </div>
            </div>
            <div className="experience-entry-body text-right-body">
              <ul className="exp-bullets-list exp-bullets-right">
                <li>Engineered scalable full-stack web solutions and backend services for client projects.</li>
                <li>Handled real-time state management, UI component optimizations, and database interactions.</li>
                <li>Participated in core software architecture design and cross-functional feature development.</li>
              </ul>
              <div className="exp-tech-chips flex-end">
                <span>Full-Stack Engineering</span>
                <span>React</span>
                <span>Express / Node</span>
                <span>Database Engineering</span>
                <span>Web Performance</span>
              </div>
            </div>

            {/* Bottom Left Corner Illustration for EIBS */}
            <ElysianIllustration />
          </div>
        </div>
      </motion.section>

      <motion.section className="section-shell certificates-section" id="certificates" {...sectionMotion}>
        <div className="section-heading section-heading-inline">
          <div>
            <h2>Certifications &amp; <em>Courses</em></h2>
          </div>
          <p className="section-note">Verified industry credentials, cloud certifications, and technical courses.</p>
        </div>
        <motion.div
          className="certificates-grid"
          initial="stacked"
          whileInView="unstacked"
          viewport={{ once: true, amount: 0.2 }}
        >
          {certificates.map(({ name, issuer, date, icon: Icon, className }, index) => (
            <motion.div
              className="cert-card"
              key={name}
              custom={index}
              variants={certCardStackVariants}
            >
              <div className={`cert-icon ${className}`}>
                <Icon aria-hidden="true" />
              </div>
              <div>
                <span className="cert-badge">{date}</span>
                <h3>{name}</h3>
                <p className="cert-issuer">{issuer}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>


      <motion.section className="section-shell projects-section" id="projects" {...sectionMotion}>
        <div className="section-heading">
          <h2>My <em>Projects</em></h2>
        </div>
        <div className="project-group surface-card">
          <div className="project-group-heading">
            <div><p className="eyebrow">01</p><h3>Development Projects</h3></div>
            <p>Systems, products, and experiments built to solve tangible problems.</p>
          </div>
          <motion.div
            className="project-row"
            initial="stacked"
            whileInView="unstacked"
            viewport={{ once: true, amount: 0.2 }}
          >
            {developmentProjects.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={index}
                onOpenLightbox={(proj, imgIdx) =>
                  setLightboxState({ isOpen: true, project: proj, initialIndex: imgIdx })
                }
                onOpenDetails={(proj) => setActiveProjectDetails(proj)}
              />
            ))}
          </motion.div>
        </div>
        <div className="project-group surface-card research-group">
          <div className="project-group-heading">
            <div><p className="eyebrow">02</p><h3>Other Projects / Research</h3></div>
            <p>Exploring reliable developer tooling and applied machine learning.</p>
          </div>
          <motion.div
            className="project-row"
            initial="stacked"
            whileInView="unstacked"
            viewport={{ once: true, amount: 0.2 }}
          >
            {otherProjects.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={index}
                onOpenLightbox={(proj, imgIdx) =>
                  setLightboxState({ isOpen: true, project: proj, initialIndex: imgIdx })
                }
                onOpenDetails={(proj) => setActiveProjectDetails(proj)}
              />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {lightboxState.isOpen && (
        <ProjectLightboxModal
          project={lightboxState.project}
          initialIndex={lightboxState.initialIndex}
          onClose={() => setLightboxState({ isOpen: false, project: null, initialIndex: 0 })}
        />
      )}

      {activeProjectDetails && (
        <ProjectDetailsModal
          project={activeProjectDetails}
          onClose={() => setActiveProjectDetails(null)}
        />
      )}

      <motion.section className="section-shell contact-section" id="contact" {...sectionMotion}>
        <div className="contact-card">
          <div className="contact-info">
            <h2>Let&apos;s build something <em>considered.</em></h2>
            <a className="email-link" href={`mailto:${email}`}><Mail aria-hidden="true" /> {email}</a>
            <SocialLinks className="contact-socials" />
          </div>

          <div className="contact-illustration" aria-hidden="true">
            <div className="contact-halo halo-primary" />
            <div className="contact-halo halo-secondary" />

            <div className="illustration-card main-code-card">
              <div className="card-header-bar">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
                <span className="card-title">veridic_engine.cpp</span>
              </div>
              <div className="card-code-body">
                <p><span className="code-keyword">#include</span> &lt;<span className="code-str">memory</span>&gt;</p>
                <p><span className="code-keyword">#include</span> <span className="code-str">&quot;agent_trust.hpp&quot;</span></p>
                <p><span className="code-keyword">auto</span> <span className="code-var">agent</span> = <span className="code-class">std</span>::<span className="code-fn">make_unique</span>&lt;<span className="code-class">AgentTrustSystem</span>&gt;();</p>
                <p><span className="code-var">agent</span>-&gt;<span className="code-fn">verifyGrounding</span>(<span className="code-str">&quot;SECURE&quot;</span>);</p>
              </div>
            </div>

            <motion.div
              className="illustration-badge float-badge-one"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Bot className="badge-icon" />
              <div>
                <strong>AI Systems &amp; Agents</strong>
                <span>MCP &amp; Middleware</span>
              </div>
            </motion.div>

            <motion.div
              className="illustration-badge float-badge-two"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <Braces className="badge-icon" />
              <div>
                <strong>Full-Stack Engineering</strong>
                <span>Node.js &middot; React &middot; AWS</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <footer className="site-footer section-shell">
        <p>© 2026 All Rights Reserved</p>
        <p>Developed by <span>Madeswaran JV</span></p>
      </footer>
    </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
