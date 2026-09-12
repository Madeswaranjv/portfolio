import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Award,
  Binary,
  BookOpen,
  Bot,
  Braces,
  Briefcase,
  Bug,
  ChefHat,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Cloud,
  Code2,
  Cpu,
  CreditCard,
  Database,
  FileDown,
  FileText,
  Folder,
  GitBranch,
  Globe,
  Grid,
  Home,
  KeyRound,
  Layers3,
  Mail,
  Maximize2,
  Menu,
  Minimize2,
  Moon,
  Network,
  Pause,
  Play,
  RotateCcw,
  Server,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Sun,
  Terminal,
  User,
  UserCheck,
  Utensils,
  Workflow,
  X,
  Zap,
} from 'lucide-react'
import { FaAws, FaCss3Alt, FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import {
  SiCplusplus,
  SiExpress,
  SiFastapi,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiPytorch,
  SiReact,
  SiRust,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from 'react-icons/si'
import { RiOpenaiFill } from 'react-icons/ri'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import MagnificationDock from './components/MagnificationDock'
import { FlipLink } from '@/components/ui/flip-links'
import { ExpandingCards } from '@/components/ui/expanding-cards'
import { FlippingCard } from '@/components/ui/flipping-card'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import './styles.css'

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || ''
const email = 'madeswaranjv@gmail.com'

const socials = [
  {
    label: 'LinkedIn',
    handle: 'in/madeswaranjv',
    icon: FaLinkedinIn,
    href: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/madeswaran-j-v-4909b8325',
    description: 'Professional Network & Experience',
  },
  {
    label: 'GitHub',
    handle: '@Madeswaranjv',
    icon: FaGithub,
    href: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME || 'Madeswaranjv'}`,
    description: 'Open Source Projects & Codebase',
  },
  {
    label: 'X / Twitter',
    handle: '@Madeswaranjv',
    icon: FaXTwitter,
    href: 'https://x.com/',
    description: 'Tech Thoughts & Engineering Updates',
  },
  {
    label: 'Instagram',
    handle: '@topstar_gaming20',
    icon: FaInstagram,
    href: 'https://www.instagram.com/topstar_gaming20/?hl=en',
    description: 'Personal Highlights & Creative Work',
  },
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
    file: '/certificates/aws-cloud practioner.pdf',
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

const skillRows = [
  skills.slice(0, 4), // Row 1: React, JavaScript, TypeScript, Node.js
  skills.slice(4, 8), // Row 2: Express, MongoDB, C++, Python
  skills.slice(8, 12), // Row 3: Git, Tailwind CSS, Next.js, AWS
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
    showcaseItems: [
      {
        id: 'v-safety',
        title: 'Safety Guard',
        description: 'Semantic safety boundaries intercepting LLM payloads.',
        imgSrc: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        icon: <ShieldCheck size={18} />,
        linkHref: 'https://github.com/Madeswaranjv',
      },
      {
        id: 'v-mcp',
        title: 'MCP Intercept',
        description: 'Execution interceptor for Model Context Protocol clients.',
        imgSrc: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80',
        icon: <Bot size={18} />,
        linkHref: 'https://github.com/Madeswaranjv',
      },
      {
        id: 'v-solver',
        title: 'Constraint AI',
        description: 'Dynamic solver preventing prompt injection attacks.',
        imgSrc: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
        icon: <Network size={18} />,
        linkHref: 'https://github.com/Madeswaranjv',
      },
      {
        id: 'v-audit',
        title: 'Audit Engine',
        description: 'Automated state rollback triggers & audit logging.',
        imgSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        icon: <Activity size={18} />,
        linkHref: 'https://github.com/Madeswaranjv',
      },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=85', caption: 'Veridic — Semantic Grounding Middleware' },
      { url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&auto=format&fit=crop&q=85', caption: 'Veridic — MCP Tool Interceptor Interface' },
      { url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=85', caption: 'Veridic — Heuristic Safety Graph & Constraint Verification' },
      { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=85', caption: 'Veridic — Telemetry & Automated Rollback Triggers' },
    ],
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
    showcaseItems: [
      {
        id: 'fd-storefront',
        title: 'Storefront',
        description: 'Luxury Gastronomy Storefront & Hero Landing Experience.',
        imgSrc: '/content/flavordash/flavordash-1.png',
        icon: <Utensils size={18} />,
        linkHref: 'https://restaurant-ordering-zeta.vercel.app/',
      },
      {
        id: 'fd-menu',
        title: 'AI Menu',
        description: 'Curated Masterpieces Menu & AI Culinary Planner.',
        imgSrc: '/content/flavordash/flavordash-2.png',
        icon: <ChefHat size={18} />,
        linkHref: 'https://restaurant-ordering-zeta.vercel.app/',
      },
      {
        id: 'fd-bag',
        title: 'Checkout',
        description: 'Culinary Bag & White-Glove Digital Invoice.',
        imgSrc: '/content/flavordash/flavordash-3.png',
        icon: <ShoppingBag size={18} />,
        linkHref: 'https://restaurant-ordering-zeta.vercel.app/',
      },
      {
        id: 'fd-auth',
        title: 'Profile',
        description: 'User Authentication & Culinary Profile Access.',
        imgSrc: '/content/flavordash/flavordash-4.png',
        icon: <UserCheck size={18} />,
        linkHref: 'https://restaurant-ordering-zeta.vercel.app/',
      },
    ],
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
    showcaseItems: [
      {
        id: 'hx-assistant',
        title: 'Assistant',
        description: 'Streaming clinical assistant & query reasoning.',
        imgSrc: '/content/healix/healix-1.png',
        icon: <Stethoscope size={18} />,
        linkHref: 'https://github.com/Madeswaranjv/Healix.git',
      },
      {
        id: 'hx-evidence',
        title: 'Evidence',
        description: 'Structured clinical evidence & RAG citations.',
        imgSrc: '/content/healix/healix-2.png',
        icon: <FileText size={18} />,
        linkHref: 'https://github.com/Madeswaranjv/Healix.git',
      },
      {
        id: 'hx-triage',
        title: 'Triage',
        description: 'Emergency symptom triage with CDC guidelines.',
        imgSrc: '/content/healix/healix-3.png',
        icon: <AlertTriangle size={18} />,
        linkHref: 'https://github.com/Madeswaranjv/Healix.git',
      },
      {
        id: 'hx-risk',
        title: 'Epidemiology',
        description: 'Epidemiological risk modeling & WHO analysis.',
        imgSrc: '/content/healix/healix-4.png',
        icon: <Globe size={18} />,
        linkHref: 'https://github.com/Madeswaranjv/Healix.git',
      },
    ],
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
    showcaseItems: [
      {
        id: 'cw-storefront',
        title: 'Artisanal',
        description: 'Handcrafted yarn dolls hero storefront.',
        imgSrc: '/content/craftywrap/craftywrap-hero.png',
        icon: <ShoppingBag size={18} />,
        linkHref: 'https://craftywrap.com',
      },
      {
        id: 'cw-collections',
        title: 'Collections',
        description: 'Filterable yarn collection & product grid.',
        imgSrc: '/content/craftywrap/craftywrap-collections.png',
        icon: <Grid size={18} />,
        linkHref: 'https://craftywrap.com',
      },
      {
        id: 'cw-auth',
        title: 'OAuth',
        description: 'Secure customer login & session modal.',
        imgSrc: '/content/craftywrap/craftywrap-3.png',
        icon: <KeyRound size={18} />,
        linkHref: 'https://craftywrap.com',
      },
      {
        id: 'cw-checkout',
        title: 'Checkout',
        description: 'Complete checkout & Razorpay payment gateway.',
        imgSrc: '/content/craftywrap/craftywrap-checkout.png',
        icon: <CreditCard size={18} />,
        linkHref: 'https://craftywrap.com',
      },
    ],
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
    showcaseItems: [
      {
        id: 'fg-fed',
        title: 'Federated',
        description: 'Decentralized clinical node training without raw data transfer.',
        imgSrc: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
        icon: <Network size={18} />,
        linkHref: 'https://github.com/Madeswaranjv',
      },
      {
        id: 'fg-gnn',
        title: 'Patient GNN',
        description: 'Patient-similarity graphs preserving clinical data sovereignty.',
        imgSrc: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=80',
        icon: <Binary size={18} />,
        linkHref: 'https://github.com/Madeswaranjv',
      },
      {
        id: 'fg-privacy',
        title: 'Privacy',
        description: 'Differential privacy mechanisms against model inversion attacks.',
        imgSrc: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop&q=80',
        icon: <ShieldCheck size={18} />,
        linkHref: 'https://github.com/Madeswaranjv',
      },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=85', caption: 'FedDermGNN — Federated Distributed Clinical Nodes' },
      { url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=1200&auto=format&fit=crop&q=85', caption: 'FedDermGNN — Patient-Similarity Graph Neural Networks' },
      { url: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200&auto=format&fit=crop&q=85', caption: 'FedDermGNN — Dermatological AI Diagnosis & Privacy Rails' },
    ],
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
    showcaseItems: [
      {
        id: 'ult-ast',
        title: 'AST Parser',
        description: 'Tree-sitter AST syntax parser generating code structural graphs.',
        imgSrc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
        icon: <Workflow size={18} />,
        linkHref: 'https://github.com/Madeswaranjv/UltraAI-Native-Operatingshell.git',
      },
      {
        id: 'ult-parallel',
        title: 'Parallel Scan',
        description: 'Sub-second multi-threaded worker pools and indexing.',
        imgSrc: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
        icon: <Cpu size={18} />,
        linkHref: 'https://github.com/Madeswaranjv/UltraAI-Native-Operatingshell.git',
      },
      {
        id: 'ult-shell',
        title: 'AI Shell',
        description: 'Terminal-first developer environment with contextual prompt piping.',
        imgSrc: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80',
        icon: <Terminal size={18} />,
        linkHref: 'https://github.com/Madeswaranjv/UltraAI-Native-Operatingshell.git',
      },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=85', caption: 'Ultra — Tree-sitter Codebase AST Graph Parsing' },
      { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=85', caption: 'Ultra — High-Throughput Multi-Threaded Code Indexing' },
      { url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&auto=format&fit=crop&q=85', caption: 'Ultra — AI-Native Shell Terminal Interface' },
    ],
  },
]

const sectionMotion = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
}

const skillCardStackVariants = {
  stacked: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
  unstacked: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: Math.floor(index / 4) * 0.12 + (index % 4) * 0.035,
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

function renderTechIcon(tech) {
  const normalized = tech.toLowerCase().trim()

  if (normalized.includes('react')) return <SiReact aria-hidden="true" />
  if (normalized.includes('vite')) return <SiVite aria-hidden="true" />
  if (normalized.includes('fastapi')) return <SiFastapi aria-hidden="true" />
  if (normalized.includes('python')) return <SiPython aria-hidden="true" />
  if (normalized.includes('chromadb') || normalized.includes('chroma')) {
    return (
      <svg viewBox="0 0 222 142" width="16" height="16" fill="currentColor" aria-hidden="true">
        <g transform="matrix(0.8644,0,0,0.8644,17.35,-11.81)">
          <ellipse fill="#ffde2d" cx="170.67" cy="81.92" rx="85.33" ry="81.92" />
          <ellipse fill="#327eff" cx="85.33" cy="81.92" rx="85.33" ry="81.92" />
          <path d="M170.67 81.92c0 45.24-38.21 81.92-85.33 81.92V81.92h85.33zm-85.34 0c0-45.24 38.21-81.92 85.34-81.92v81.92H85.33z" fill="#ff6446" />
        </g>
      </svg>
    )
  }
  if (normalized.includes('zustand')) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="13" r="8" />
        <path d="M5 6a3 3 0 0 1 3 3" />
        <path d="M19 6a3 3 0 0 0-3 3" />
        <circle cx="9.5" cy="11.5" r="1" fill="currentColor" />
        <circle cx="14.5" cy="11.5" r="1" fill="currentColor" />
        <path d="M10 15.5c.5.5 1.5 1 2 1s1.5-.5 2-1" />
        <ellipse cx="12" cy="14.5" rx="1.5" ry="1" fill="currentColor" />
      </svg>
    )
  }
  if (normalized.includes('tavily')) {
    return (
      <svg viewBox="0 0 110 110" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M77.07 0C88.32 0 93.95 0 98.24 2.18c3.76 1.93 6.86 4.98 8.8 8.77 2.18 4.28 2.18 9.9 2.18 21.13v44.83c0 11.23 0 16.85-2.18 21.13-1.93 3.76-4.99 6.85-8.8 8.78-4.29 2.18-9.92 2.18-21.18 2.18H32.15c-11.26 0-16.88 0-21.18-2.18-3.76-1.93-6.86-4.98-8.79-8.78C0 93.76 0 88.15 0 76.91V32.09C0 20.85 0 15.24 2.18 10.95c1.93-3.76 4.99-6.84 8.79-8.77C15.27 0 20.89 0 32.15 0h44.92zM46.43 60.24c-.6 0-1.16.1-1.72.35-.56.21-1.06.56-1.48.98l-8.58 8.6-2.29-2.28c-1.69-1.69-4.54-.84-5.06 1.48l-3.28 14.46c-.1.49-.1 1.02.04 1.51.14.49.39.95.77 1.3.35.35.81.63 1.3.77.5.14 1.02.14 1.52.04l14.42-3.27c2.32-.52 3.13-3.4 1.48-5.09l-2.29-2.28 8.58-8.6c.85-.84 1.3-2 1.3-3.2 0-1.19-.45-2.35-1.3-3.19l-.1-.1-.11-.11c-.42-.42-.91-.73-1.48-.98-.56-.21-1.12-.35-1.72-.35zm31.02-5.41c-2-1.26-4.61.18-4.61 2.57v3.23H54.42c.6 1.19.95 2.52.95 3.93 0 2.07-.74 3.93-1.94 5.4h19.38v3.23c0 2.39 2.6 3.83 4.64 2.57l12.52-7.9c.95-.6 1.41-1.58 1.41-2.56s-.46-1.97-1.41-2.57L77.45 54.83zm-30.57-34.58c-.49 0-1.02.14-1.44.39-.46.24-.81.6-.1.09 1.05L36.44 34.23c-1.27 2 .17 4.63 2.53 4.63h3.24v18.61c1.33-.88 2.95-1.41 4.68-1.41 1.72 0 3.34.53 4.68 1.41V38.86h3.23c2.4 0 3.84-2.63 2.54-4.63l-7.92-12.53c-.59-.95-1.58-1.41-2.53-1.41v-.04z" />
      </svg>
    )
  }
  if (normalized.includes('mcp')) {
    return (
      <svg viewBox="0 0 180 180" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round" aria-hidden="true">
        <path d="M23.6 85.3l62.6-62.6c8.6-8.7 22.7-8.7 31.3 0 8.6 8.7 8.6 22.7 0 31.3l-47.3 47.3" />
        <path d="M70.9 100.6l46.6-46.6c8.6-8.7 22.7-8.7 31.3 0l.3.3c8.7 8.7 8.7 22.7 0 31.3l-56.6 56.6c-2.9 2.9-2.9 7.6 0 10.4l11.6 11.7" />
        <path d="M101.9 38.3L55.6 84.6c-8.7 8.6-8.7 22.7 0 31.3 8.6 8.6 22.7 8.6 31.3 0l46.3-46.3" />
      </svg>
    )
  }
  if (normalized.includes('tool calling') || normalized.includes('llm')) return <Bot aria-hidden="true" />
  if (normalized.includes('semantic') || normalized.includes('verification')) return <ShieldCheck aria-hidden="true" />
  if (normalized.includes('node')) return <SiNodedotjs aria-hidden="true" />
  if (normalized.includes('express')) return <SiExpress aria-hidden="true" />
  if (normalized.includes('mongodb')) return <SiMongodb aria-hidden="true" />
  if (normalized.includes('tailwind')) return <SiTailwindcss aria-hidden="true" />
  if (normalized.includes('vercel')) return <SiVercel aria-hidden="true" />
  if (normalized.includes('mysql')) return <SiMysql aria-hidden="true" />
  if (normalized.includes('aws')) return <FaAws aria-hidden="true" />
  if (normalized.includes('css')) return <FaCss3Alt aria-hidden="true" />
  if (normalized.includes('pytorch')) return <SiPytorch aria-hidden="true" />
  if (normalized.includes('federated') || normalized.includes('graph')) return <Network aria-hidden="true" />
  if (normalized.includes('rust')) return <SiRust aria-hidden="true" />
  if (normalized.includes('tree-sitter')) return <Workflow aria-hidden="true" />
  if (normalized.includes('cli') || normalized.includes('terminal')) return <Terminal aria-hidden="true" />
  if (normalized.includes('ast') || normalized.includes('parsing')) return <Binary aria-hidden="true" />

  return <Code2 aria-hidden="true" />
}

function ProjectDetailsModal({ project, onClose }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const dialogRef = useRef(null)
  const dragStartY = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Isolate scroll so external Lenis listener on window doesn't capture or block mouse wheel/touch
  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    const handleScrollStop = (e) => {
      e.stopPropagation()
    }
    el.addEventListener('wheel', handleScrollStop, { passive: true })
    el.addEventListener('touchmove', handleScrollStop, { passive: true })
    return () => {
      el.removeEventListener('wheel', handleScrollStop)
      el.removeEventListener('touchmove', handleScrollStop)
    }
  }, [])

  if (!project) return null

  const githubUrl = project.github || 'https://github.com/Madeswaranjv'
  const liveUrl = project.liveUrl || project.live || project.url || null

  const toggleScale = (e) => {
    if (e) e.stopPropagation()
    setIsExpanded((prev) => !prev)
  }

  const handlePointerDown = (e) => {
    dragStartY.current = e.clientY
  }

  const handlePointerUp = (e) => {
    if (dragStartY.current === null) return
    const diffY = e.clientY - dragStartY.current
    // Dragged upwards -> scale up to expanded
    if (diffY < -30) {
      setIsExpanded(true)
    } else if (diffY > 30) {
      // Dragged downwards -> scale down
      setIsExpanded(false)
    }
    dragStartY.current = null
  }

  return (
    <AnimatePresence>
      <motion.div
        className="project-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        data-lenis-prevent="true"
      >
        <motion.div
          ref={dialogRef}
          className={`project-modal-dialog surface-card project-modal-bottom-sheet ${isExpanded ? 'is-expanded' : ''}`}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
        >
          {/* Top handle pill for bottom sheet - Pressing at the center scales the window */}
          <div
            className="project-modal-drag-pill-wrapper"
            onClick={toggleScale}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            role="button"
            tabIndex={0}
            aria-label={isExpanded ? 'Scale down sheet height' : 'Scale up sheet height'}
            title={isExpanded ? 'Press at center to scale down (50% screen)' : 'Press at center to scale up (expanded)'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggleScale(e)
              }
            }}
          >
            <span className={`project-modal-drag-pill ${isExpanded ? 'is-expanded' : ''}`} />
            <span className="project-modal-scale-hint">
              {isExpanded ? <ChevronDown size={13} aria-hidden="true" /> : <ChevronUp size={13} aria-hidden="true" />}
              <span>{isExpanded ? 'Scale Down' : 'Scale Up'}</span>
            </span>
          </div>

          {/* Modal Header */}
          <div className="project-modal-header">
            <div
              className="project-modal-header-centered"
              onClick={toggleScale}
              role="button"
              tabIndex={0}
              title="Press at center to scale window"
              style={{ cursor: 'pointer' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleScale(e)
                }
              }}
            >
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
            <div className="project-modal-header-actions">
              <button
                type="button"
                className="project-modal-scale-btn"
                onClick={toggleScale}
                aria-label={isExpanded ? 'Scale down window' : 'Scale up window'}
                title={isExpanded ? 'Scale Down (50vh)' : 'Scale Up (88vh)'}
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
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
                      {renderTechIcon(tech)}
                      <span>{tech}</span>
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

function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!certificate) return null

  const encodedUrl = certificate.file ? encodeURI(certificate.file) : null

  return (
    <AnimatePresence>
      <motion.div
        className="cert-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        data-lenis-prevent="true"
      >
        <motion.div
          className="cert-modal-dialog surface-card"
          initial={{ scale: 0.93, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 12 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
        >
          {/* Header */}
          <div className="cert-modal-header">
            <div className="cert-modal-meta">
              <div className="cert-modal-badge-row">
                <span className="cert-badge">{certificate.date}</span>
              </div>
              <h2 className="cert-modal-title">{certificate.name}</h2>
              <p className="cert-modal-issuer">{certificate.issuer}</p>
            </div>

            <div className="cert-modal-header-actions">
              {encodedUrl && (
                <>
                  <a
                    href={encodedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="cert-icon-btn"
                    title="Open live certificate in new tab"
                    aria-label="Open in new tab"
                  >
                    <ArrowUpRight size={17} />
                  </a>
                  <a
                    href={encodedUrl}
                    download
                    className="cert-icon-btn"
                    title="Download certificate PDF"
                    aria-label="Download PDF"
                  >
                    <FileDown size={17} />
                  </a>
                </>
              )}
              <button
                type="button"
                className="cert-modal-close"
                onClick={onClose}
                aria-label="Close certificate viewer"
                title="Close (Esc)"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body / PDF Viewer */}
          <div className="cert-modal-body">
            {encodedUrl ? (
              <div className="cert-preview-frame">
                <iframe
                  src={`${encodedUrl}#toolbar=1&navpanes=0`}
                  title={`${certificate.name} Credential`}
                  className="cert-iframe"
                />
              </div>
            ) : (
              <div className="cert-empty-state">
                <p>Live credential document verification in progress.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="cert-modal-footer">
            <span className="cert-modal-footer-caption">
              Issued by {certificate.issuer}
            </span>
            <div className="cert-modal-footer-actions">
              {encodedUrl && (
                <>
                  <a
                    href={encodedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="gold-button cert-modal-btn"
                  >
                    <span>Open Live Certificate</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={encodedUrl}
                    download
                    className="outline-button cert-modal-btn"
                  >
                    <FileDown size={14} />
                    <span>Download PDF</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function ProjectCard({ project, index = 0, onOpenLightbox, onOpenDetails }) {
  const showcaseItems = project.showcaseItems || (project.images ? project.images.map((img, i) => ({
    id: `${project.name}-${i}`,
    title: img.caption ? img.caption.split('—')[0].trim().split(' ')[0] : `Slide ${i + 1}`,
    description: img.caption || project.description,
    imgSrc: img.url,
    icon: <Sparkles size={18} />,
    linkHref: project.liveUrl || project.github || '#',
  })) : [])
  const hasShowcase = showcaseItems.length > 0
  const githubUrl = project.github || 'https://github.com/Madeswaranjv'
  const liveUrl = project.liveUrl || project.live || project.url || null

  return (
    <motion.div
      className="project-card"
      custom={index}
      variants={projectCardStackVariants}
    >
      {hasShowcase ? (
        <div className="project-visual-expanding">
          <ExpandingCards
            items={showcaseItems}
            defaultActiveIndex={0}
            direction="horizontal"
            onItemClick={(item, itemIdx) => {
              if (onOpenLightbox) {
                onOpenLightbox(project, itemIdx)
              }
            }}
          />
        </div>
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

const industrialExperiences = [
  {
    id: 'identifyou',
    role: 'Digital Engineer Trainee – (Stipend)',
    company: 'IdentifYou Technologies Private Ltd',
    location: 'Madurai, Tamil Nadu',
    period: 'Jun 2026 – Jul 2026',
    logo: '/content/identifyou.png',
    frontDescription:
      'Engineered scalable full-stack software modules with React.js frontend, Express.js backend, and MySQL database integration with real-time business logic debugging.',
    backTitle: 'Key Contributions & Engineering Scope',
    bullets: [
      'Worked on real–world software development tasks alongside the engineering team during the internship.',
      'Developed a module with React.js (Frontend), Express.js (Backend), MySQL (Database).',
      'Hands-on experience in real-time debugging business logic errors and optimizing data flows.',
    ],
    tech: [
      { name: 'React.js', icon: SiReact },
      { name: 'Express.js', icon: SiExpress },
      { name: 'MySQL', icon: SiMysql },
      { name: 'Full-Stack', icon: Layers3 },
      { name: 'Debugging', icon: Bug },
    ],
    buttonText: 'Flip to Overview',
  },
  {
    id: 'elysian',
    role: 'Software Developer Intern',
    company: 'Elysian Intelligence Business Solutions',
    location: 'Madurai / Remote',
    period: 'Jun 2025 – Jul 2025 (2 - weeks)',
    logo: '/content/elysian.png',
    frontDescription:
      'Architected scalable full-stack web solutions and backend services, handled real-time client state management, and optimized UI performance.',
    backTitle: 'Key Contributions & Architecture Scope',
    bullets: [
      'Engineered scalable full-stack web solutions and backend services for client projects.',
      'Handled real-time state management, UI component optimizations, and database interactions.',
      'Participated in core software architecture design and cross-functional feature development.',
    ],
    tech: [
      { name: 'Full-Stack Engineering', icon: Layers3 },
      { name: 'React', icon: SiReact },
      { name: 'Express / Node', icon: SiNodedotjs },
      { name: 'Database', icon: Database },
      { name: 'Web Performance', icon: Zap },
    ],
    buttonText: 'Flip to Overview',
  },
]

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

function SkillsRow({ rowSkills, rowIndex, initialActiveIndex = 0 }) {
  const [activeIdx, setActiveIdx] = useState(initialActiveIndex)

  return (
    <div className="skills-row">
      {rowSkills.map(({ name, icon: Icon, className }, colIndex) => {
        const globalIndex = rowIndex * 4 + colIndex
        const isActive = activeIdx === colIndex
        return (
          <motion.div
            key={name}
            className={`skill-card ${isActive ? 'is-active' : ''}`}
            onMouseEnter={() => setActiveIdx(colIndex)}
            onClick={() => setActiveIdx(colIndex)}
            custom={globalIndex}
            variants={skillCardStackVariants}
          >
            <div className={`skill-icon ${className}`}><Icon aria-hidden="true" /></div>
            <span className="skill-name">{name}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [lightboxState, setLightboxState] = useState({ isOpen: false, project: null, initialIndex: 0 })
  const [activeProjectDetails, setActiveProjectDetails] = useState(null)
  const [activeCertificate, setActiveCertificate] = useState(null)
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

  const lenisRef = useRef(null)

  // Initialize Lenis for smooth, cinematic, slightly slower page scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6, // Longer duration gives a smoother, slower momentum glide
      wheelMultiplier: 0.8, // Slightly lower distance per wheel tick for deliberate, silky scrolling
      touchMultiplier: 1.2,
      smoothWheel: true,
      infinite: false,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenisRef.current = lenis
    window.__lenis = lenis

    let animationFrameId
    function raf(time) {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }
    animationFrameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
      window.__lenis = null
      lenisRef.current = null
    }
  }, [])

  // Pause background scroll when any modal or drawer is active
  useEffect(() => {
    if (!lenisRef.current) return
    const isModalOpen =
      isLoading ||
      Boolean(activeProjectDetails) ||
      Boolean(activeCertificate) ||
      lightboxState.isOpen

    if (isModalOpen) {
      lenisRef.current.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenisRef.current.start()
      document.body.style.overflow = 'auto'
    }
  }, [isLoading, activeProjectDetails, activeCertificate, lightboxState.isOpen])

  // Handle all internal anchor clicks (#contact, #projects, etc.) with Lenis smooth scroll
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href === '#' || href.length <= 1) return

      const targetId = href.slice(1)
      const targetEl = document.getElementById(targetId)
      if (targetEl && window.__lenis) {
        e.preventDefault()
        window.__lenis.scrollTo(targetEl, {
          offset: -30,
          duration: 1.6,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
        window.history.pushState(null, '', href)
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

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
    if (lenisRef.current) {
      lenisRef.current.on('scroll', handleScroll)
    }
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (lenisRef.current) {
        lenisRef.current.off('scroll', handleScroll)
      }
    }
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

  const profileVideoRef = useRef(null)

  useEffect(() => {
    if (profileVideoRef.current) {
      profileVideoRef.current.defaultMuted = true
      profileVideoRef.current.muted = true
      profileVideoRef.current.play().catch(() => {
        // Autoplay policy prevented immediate playback; poster will render cleanly
      })
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
                  ref={profileVideoRef}
                  autoPlay
                  muted
                  playsInline
                  poster="/content/photo.png"
                  className="profile-smile-video"
                >
                  <source src="/content/profile_smile.webm" type="video/webm" />
                  <source src="/content/profile_smile.mp4" type="video/mp4" />
                  <img src="/content/photo.png" alt="Madeswaran JV" />
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
                  <span className="edu-chip-item">
                    <RiOpenaiFill aria-hidden="true" className="edu-chip-icon" />
                    <span>Artificial Intelligence &amp; Agents</span>
                  </span>
                  <span className="edu-chip-item">
                    <Binary aria-hidden="true" className="edu-chip-icon" />
                    <span>Data Structures &amp; Algorithms</span>
                  </span>
                  <span className="edu-chip-item">
                    <Database aria-hidden="true" className="edu-chip-icon" />
                    <span>Database Management Systems</span>
                  </span>
                  <span className="edu-chip-item">
                    <SiCplusplus aria-hidden="true" className="edu-chip-icon" />
                    <span>Object Oriented Programming (C++)</span>
                  </span>
                  <span className="edu-chip-item">
                    <Server aria-hidden="true" className="edu-chip-icon" />
                    <span>Operating Systems &amp; Networks</span>
                  </span>
                  <span className="edu-chip-item">
                    <Layers3 aria-hidden="true" className="edu-chip-icon" />
                    <span>Full-Stack Web Engineering</span>
                  </span>
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
          {skillRows.map((row, rIdx) => (
            <SkillsRow
              key={rIdx}
              rowSkills={row}
              rowIndex={rIdx}
              initialActiveIndex={rIdx % 4}
            />
          ))}
        </motion.div>
      </motion.section>

      {/* Solo Full-Width Industry Experience Section */}
      <motion.section className="section-shell experience-section" id="experience" {...sectionMotion}>
        <div className="section-heading">
          <h2>Industry <em>Experience</em></h2>
        </div>
        <div className="experience-flipping-grid">
          {industrialExperiences.map((exp) => (
            <FlippingCard
              key={exp.id}
              height={450}
              frontContent={
                <div className="flip-card-face-content flip-card-front-centered">
                  {/* Centered Bigger Company Logo */}
                  <div className="flip-exp-logo-card-center">
                    <img src={exp.logo} alt={`${exp.company} Logo`} className="flip-exp-logo-img" />
                  </div>

                  {/* Centered Bigger Company Name, Role, Location, and Plain White Duration Date */}
                  <div className="flip-exp-center-block">
                    <h3 className="flip-exp-company-big">{exp.company}</h3>
                    <h4 className="flip-exp-role-title">{exp.role}</h4>
                    <p className="flip-exp-location-text">{exp.location}</p>
                    <span className="flip-exp-date-white">{exp.period}</span>
                  </div>

                  {/* Centered Tech Chips */}
                  <div className="exp-tech-chips exp-tech-chips-centered">
                    {exp.tech.map(({ name, icon: Icon }) => (
                      <span key={name}>
                        <Icon aria-hidden="true" />
                        <span>{name}</span>
                      </span>
                    ))}
                  </div>

                  {/* Centered Flip Prompt Cue */}
                  <div className="flip-exp-cue-center">
                    <span>Hover or tap to flip card</span>
                    <RotateCcw size={12} aria-hidden="true" />
                  </div>
                </div>
              }
              backContent={
                <div className="flip-card-face-content">
                  <div className="flip-exp-back-header">
                    <span className="flip-exp-back-eyebrow">{exp.backTitle}</span>
                    <h3 className="flip-exp-back-role">{exp.role}</h3>
                    <p className="flip-exp-back-meta">
                      {exp.company} &middot; <span>{exp.period}</span>
                    </p>
                  </div>

                  <ul className="flip-exp-bullets">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx}>
                        <span className="highlight-bullet" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="exp-tech-chips">
                    {exp.tech.map(({ name, icon: Icon }) => (
                      <span key={name}>
                        <Icon aria-hidden="true" />
                        <span>{name}</span>
                      </span>
                    ))}
                  </div>

                  <div className="flip-exp-btn-wrap">
                    <button
                      type="button"
                      className="gold-button flip-exp-action-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      <span>{exp.buttonText}</span>
                      <RotateCcw size={13} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              }
            />
          ))}
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
          {certificates.map((cert, index) => {
            const { name, issuer, date, icon: Icon, className, file } = cert
            const hasLiveCert = Boolean(file)
            return (
              <motion.div
                className={`cert-card ${hasLiveCert ? 'has-live-cert' : ''}`}
                key={name}
                custom={index}
                variants={certCardStackVariants}
                onClick={() => setActiveCertificate(cert)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveCertificate(cert)
                  }
                }}
                title={hasLiveCert ? `Click to view live ${name} certificate` : `Click to view ${name} details`}
              >
                <div className={`cert-icon ${className}`}>
                  <Icon aria-hidden="true" />
                </div>
                <div>
                  <span className="cert-badge">{date}</span>
                  <h3>{name}</h3>
                  <p className="cert-issuer">{issuer}</p>
                  {hasLiveCert && (
                    <div className="cert-live-indicator">
                      <span>Live Certificate</span>
                      <ArrowUpRight size={11} />
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
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

      {activeCertificate && (
        <CertificateModal
          certificate={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}

      <motion.section className="section-shell contact-section" id="contact" {...sectionMotion}>
        <div className="contact-card">
          <div className="contact-info">
            <h2>Let&apos;s build something <em>considered.</em></h2>
            <p className="contact-description">
              Have an idea, project, or an opportunity you&apos;d like to discuss? Reach out directly via email or connect with me across my social profiles.
            </p>
            <a className="email-link" href={`mailto:${email}`}><Mail aria-hidden="true" /> {email}</a>
          </div>

          <div className="contact-social-showcase">
            <div className="flip-links-list">
              {socials.map(({ label, handle, icon: Icon, href }) => (
                <div
                  key={label}
                  className="flip-link-card-row"
                >
                  <div className="flip-link-header">
                    <div className="flip-link-icon-wrap" aria-hidden="true">
                      <Icon />
                    </div>
                    <span className="flip-link-handle">{handle}</span>
                  </div>
                  <div className="flip-link-action-row">
                    <FlipLink href={href} className="contact-flip-link">
                      {label}
                    </FlipLink>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flip-link-arrow-btn"
                      aria-label={`Open ${label} profile`}
                    >
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
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
