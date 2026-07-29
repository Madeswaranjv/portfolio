import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Bot,
  Braces,
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
  Menu,
  Moon,
  Server,
  Sun,
  User,
  X,
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
import './styles.css'

const email = 'madeswaranjv@gmail.com'

const socials = [
  { label: 'LinkedIn', icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/madeswaran-j-v-4909b8325' },
  { label: 'GitHub', icon: FaGithub, href: 'https://github.com/Madeswaranjv' },
  { label: 'X / Twitter', icon: FaXTwitter, href: 'https://x.com/' },
  { label: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/topstar_gaming20/?hl=en' },
]

const navItems = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Skills', href: '#skills', icon: Braces },
  { label: 'Certificates', href: '#certificates', icon: Award },
  { label: 'Projects', href: '#projects', icon: Folder },
  { label: 'Contact', href: '#contact', icon: Mail },
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
    className: 'veridic',
    mark: 'V',
  },
  {
    name: 'FlavorDash',
    type: 'Full-stack Platform',
    description: 'Luxury restaurant ordering with real-time operations and menu-grounded AI planning.',
    className: 'flavordash',
    mark: 'FD',
  },
  {
    name: 'FedDermGNN',
    type: 'Medical AI Research',
    description: 'Federated learning with patient-similarity graphs for skin disease diagnosis.',
    className: 'fedderm',
    mark: 'FG',
  },
  {
    name: 'CraftyWrap',
    type: 'E-commerce',
    description: 'An AWS-deployed handmade-yarn storefront with OAuth and category browsing.',
    className: 'craftywrap',
    mark: 'CW',
  },
]

const otherProjects = [
  {
    name: 'Go Schema Validator',
    type: 'Backend Tooling',
    description: 'A reserved space for the upcoming schema validation project.',
    className: 'go-validator',
    mark: 'GO',
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

function ProjectCard({ project, index = 0 }) {
  return (
    <motion.a
      className="project-card"
      href="#contact"
      aria-label={`View ${project.name} project`}
      custom={index}
      variants={projectCardStackVariants}
    >
      <div className={`project-visual ${project.className}`}>
        <span className="project-grid" />
        <span className="project-mark">{project.mark}</span>
        <span className="project-orbit" />
      </div>
      <div className="project-copy">
        <p className="eyebrow">{project.type}</p>
        <div className="project-title-row">
          <h3>{project.name}</h3>
          <ArrowUpRight aria-hidden="true" />
        </div>
        <p>{project.description}</p>
      </div>
    </motion.a>
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

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="loading-content">
        <motion.div
          className="loading-logo"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="loading-mark">M</span>
          <h2>MADESWARAN <em>JV</em></h2>
        </motion.div>
        <div className="loading-bar-container">
          <motion.div
            className="loading-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="loading-meta">
          <p className="loading-tagline">AI AGENTS &middot; FULL-STACK &middot; SYSTEMS</p>
        </div>
      </div>
    </motion.div>
  )
}

const aboutPassageText = `I'm Madeswaran JV, a third-year Computer Science Engineering student at Thiagarajar College of Engineering, focused on AI agents, full-stack development, and backend engineering. I've worked as an intern at IdentifYou Technologies Private Ltd and Elysian Intelligence Business Solutions, and I build end-to-end systems — from agent-trust middleware to real-time ordering platforms with role-based auth and live updates. I'm currently working on Veridic, a semantic grounding layer for MCP tool calls, alongside a federated-learning research project on medical imaging.`

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

function App() {
  const [isLoading, setIsLoading] = useState(true)
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
        <nav className="nav-shell" aria-label="Primary navigation">
          <a
            className="resume-link"
            href="/3rdyearresume.pdf"
            download="Madeswaran_JV_Resume.pdf"
            aria-label="Download Resume"
            title="Download Resume"
          >
            <FileDown aria-hidden="true" strokeWidth={1.8} />
            <span className="resume-text">Download Resume</span>
          </a>
          <div className="nav-links">
            {navItems.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} aria-label={label} title={label}>
                <Icon aria-hidden="true" strokeWidth={1.7} />
                <span className="nav-label">{label}</span>
              </a>
            ))}
          </div>
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun aria-hidden="true" strokeWidth={1.8} /> : <Moon aria-hidden="true" strokeWidth={1.8} />}
          </button>
        </nav>
      </header>

      <section className="hero section-shell" id="home">
        <motion.div className="hero-copy" initial="hidden" animate="visible" variants={{
          hidden: { opacity: 0, y: 25 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
        }}>
          <p className="kicker"><span /> Available for meaningful work</p>
          <motion.h1
            className="hero-title-animated"
            initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="name-first">Madeswaran</span>{' '}
            <span className="name-last">JV</span>
          </motion.h1>
          <p className="hero-description">
            Third-year CS Engineering student building AI agents and full-stack systems — from
            semantic-grounding middleware for MCP tools to production-style ordering platforms.
          </p>
          <a className="gold-button" href="#contact">Let&apos;s Talk <ArrowUpRight aria-hidden="true" /></a>
          <SocialLinks className="hero-socials" />
        </motion.div>

        <motion.div className="portrait-stage" initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}>
          <div className="portrait-halo halo-one" />
          <div className="portrait-halo halo-two" />
          <div className="portrait-frame">
            <div className="portrait-card-3d">
              <div className="portrait-face portrait-front">
                <img src="/content/myphoto.png" alt="Madeswaran JV" />
              </div>
              <div className="portrait-face portrait-back">
                <img src="/content/hoverphoto.png" alt="Madeswaran JV Avatar" />
              </div>
            </div>
          </div>
          <p className="portrait-caption">CS ENGINEERING / AI SYSTEMS</p>
        </motion.div>
      </section>

      <motion.section className="section-shell" id="about" {...sectionMotion}>
        <div className="section-heading">
          <h2>About <em>Me</em></h2>
        </div>
        <article className="about-card surface-card">
          <AboutPassageReader text={aboutPassageText} />
        </article>
        <div className="fact-grid-separated">
          <div className="fact-card surface-card">
            <BookOpen aria-hidden="true" />
            <div>
              <h3>Education</h3>
              <ul>
                <li>B.E. Computer Science Engineering</li>
                <li>Thiagarajar College of Engineering</li>
                <li>CGPA 8.60 · Third Year</li>
              </ul>
            </div>
          </div>
          <div className="fact-card surface-card">
            <Bot aria-hidden="true" />
            <div>
              <h3>Industry Experience &amp; Focus</h3>
              <ul>
                <li>Interned at IdentifYou &amp; Elysian Intelligence</li>
                <li>Building Agentic AI Middleware (Veridic)</li>
                <li>Medical AI &amp; Federated Learning Research</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

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
              <ProjectCard key={project.name} project={project} index={index} />
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
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
            <motion.div
              className="coming-soon"
              custom={otherProjects.length}
              variants={projectCardStackVariants}
            >
              <span>+</span>
              <p>More work<br />in progress</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

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
                <span className="card-title">veridic_middleware.ts</span>
              </div>
              <div className="card-code-body">
                <p><span className="code-keyword">const</span> <span className="code-var">agent</span> = <span className="code-keyword">new</span> <span className="code-class">AgentTrustSystem</span>()</p>
                <p><span className="code-var">agent</span>.<span className="code-fn">verifyGrounding</span>(&#123; <span className="code-prop">status</span>: <span className="code-str">&apos;SECURE&apos;</span> &#125;)</p>
                <div className="status-indicator-pill">
                  <span className="pulse-dot" /> SYSTEM ACTIVE &middot; READY TO BUILD
                </div>
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
