import type {
  Achievement,
  BlogPost,
  Experience,
  Project,
  Service,
  Skill, SoftSkill, Testimonial,
} from '@/types';

export const experiences: Experience[] = [
  {
    id: 1,
    title: 'Flagship ERP Launch',
    company: 'Sanothimi Technologies',
    duration: '2023 – Present',
    icon: '🚀',
    responsibilities: [
      'Launched SchoolSathi, a comprehensive School Management System now used by 50+ institutions',
      'Implemented automated billing and financial reporting modules for educational institutions',
      'Integrated real-time parent-teacher communication portals across mobile and web platforms',
      'Developed a robust student information system (SIS) handling 20,000+ active records',
    ],
    achievement: '🌟 Successfully digitized 50+ schools within the first 12 months',
  },
  {
    id: 2,
    title: 'Finance & Business Suite Expansion',
    company: 'Sanothimi Solutions',
    duration: '2021 – 2023',
    icon: '📊',
    responsibilities: [
      'Engineered a cloud-based accounting tool tailored for local business compliance in Nepal',
      'Built custom inventory management systems for retail and wholesale distributors',
      'Developed VAT and Tax reporting modules to simplify regulatory filing for SMEs',
      'Collaborated with 100+ business owners to refine UX for non-technical users',
    ],
    achievement: '📈 40% improvement in operational efficiency for client businesses',
  },
  {
    id: 3,
    title: 'Core Infrastructure Development',
    company: 'Sanothimi Tech',
    duration: '2025 – 2026',
    icon: '🏗️',
    responsibilities: [
      'Architected the central Sanothimi Cloud platform for high scalability and 99.9% uptime',
      'Established secure data migration protocols for transition from legacy paper systems',
      'Implemented end-to-end encryption for sensitive financial and student data',
      'Built a modular SaaS framework allowing for rapid feature deployment across products',
    ],
    achievement: '🔐 Achieved enterprise-grade security standards for data protection',
  },
];

export const achievements: Achievement[] = [
  { id: 1, icon: '🏫', year: '2024', title: 'Top Educational Tech Provider', description: 'Recognized as the most innovative School ERP provider in the region for our flagship SchoolSathi platform.', metric: '🏆 #1 Rated School ERP' },
  { id: 2, icon: '👥', year: '2023', title: '10,000+ Daily Active Users', description: 'Our platform ecosystem successfully supports over 10,000 teachers, students, and admins every single day.', metric: '📈 10K+ DAU' },
  { id: 3, icon: '💼', year: '2022', title: '500+ Businesses Empowered', description: 'Successfully implemented business tools and financial systems for over 500 SMEs across different sectors.', metric: '💰 500+ Clients' },
  { id: 4, icon: '🌍', year: '2023', title: 'National Digitization Award', description: 'Awarded for significant contribution to the digital transformation of rural and urban educational institutions.', metric: '🎖️ Excellence Award' },
  { id: 5, icon: '🛡️', year: '2021', title: 'Data Security Certification', description: 'Achieved international standards for cloud data security and privacy protection for our SaaS infrastructure.', metric: '✅ ISO Certified' },
  { id: 6, icon: '🚀', year: '2024', title: 'Silicon Valley Incubation', description: 'Selected for the regional tech acceleration program for high-growth potential SaaS startups.', metric: '🔥 High Growth' },
];

export const services: Service[] = [
  { id: 1, icon: '🏫', title: 'School ERP (SchoolSathi)', description: 'Complete management system for admissions, attendance, exams, and billing. Integrated mobile app for parents and teachers.' },
  { id: 2, icon: '💰', title: 'Finance & Accounting', description: 'Cloud-based accounting software tailored for local business needs. Automated ledgers, VAT reports, and financial statements.' },
  { id: 3, icon: '🏢', title: 'Business Management Suite', description: 'End-to-end tools for inventory, sales, and employee management. Real-time dashboards for data-driven decision making.' },
  { id: 4, icon: '📊', title: 'Business Intelligence', description: 'Advanced analytics and reporting tools to gain deep insights into your operational performance and growth trends.' },
  { id: 5, icon: '🔐', title: 'Enterprise Security', description: 'Secure cloud hosting, regular backups, and role-based access control to keep your organizational data safe and private.' },
  { id: 6, icon: '🛠️', title: 'Custom Software Solutions', description: 'Bespoke software development tailored to the unique workflow and challenges of your specific business or institution.' },
];

export const projects: Project[] = [
  {
    id: 1, tag: 'Education', tagIcon: '🎓',
    title: 'City Academy Digital Overhaul',
    description: 'Full-scale implementation of SchoolSathi ERP across 3 campuses, digitizing 5,000+ student records and automating all fee collections.',
    bgGradient: 'from-[#D91E36] to-[#001C44]',
    metrics: [{ value: '100%', label: 'Cashless Billing' }, { value: '2 hrs', label: 'Daily saved/Staff' }, { value: '0', label: 'Data Errors' }],
  },
  {
    id: 2, tag: 'Wholesale', tagIcon: '📦',
    title: 'Grand Distributors Inventory Sync',
    description: 'Deployment of real-time inventory and sales tracking system across 5 warehouse locations, reducing stock discrepancies significantly.',
    bgGradient: 'from-[#001C44] to-[#000E22]',
    metrics: [{ value: '95%', label: 'Stock Accuracy' }, { value: '30%', label: 'Sales Increase' }, { value: 'Real-time', label: 'Updates' }],
  },
  {
    id: 3, tag: 'Healthcare', tagIcon: '🏥',
    title: 'Regional Clinic Finance System',
    description: 'Custom financial management suite for a network of medical clinics, ensuring HIPAA-level data security and efficient billing workflows.',
    bgGradient: 'from-[#1e1e1e] to-[#2d2d2d]',
    metrics: [{ value: '40%', label: 'Faster Billing' }, { value: 'Secure', label: 'Cloud Storage' }, { value: 'Verified', label: 'Compliance' }],
  },
  {
    id: 4, tag: 'Expansion', tagIcon: '🌐',
    title: 'Cross-Border SaaS Deployment',
    description: 'Scaled our business management tools to support multiple currencies and international tax regulations for regional expansion.',
    bgGradient: 'from-[#EE2B47] to-[#8B0E1B]',
    metrics: [{ value: '5+', label: 'Countries' }, { value: 'Multi', label: 'Currency' }, { value: '24/7', label: 'Global Support' }],
  },
];

export const technicalSkills: Skill[] = [
  { name: 'SaaS Architecture', level: 95 },
  { name: 'Cloud Infrastructure (AWS/Azure)', level: 90 },
  { name: 'ERP System Design', level: 98 },
  { name: 'Financial Algorithm Dev', level: 96 },
  { name: 'Data Security & Encryption', level: 92 },
  { name: 'API Integrations', level: 94 },
  { name: 'Database Scalability', level: 88 },
];

export const softSkills: SoftSkill[] = [
  { icon: '🧠', name: 'Strategic Planning' }, { icon: '🤝', name: 'Client Support' },
  { icon: '🎯', name: 'User-Centric Design' }, { icon: '⚡', name: 'Agile Development' },
  { icon: '👥', name: 'Team Mentorship' }, { icon: '🗣️', name: 'Business Consulting' },
  { icon: '📋', name: 'Implementation' }, { icon: '🔐', name: 'Ethical Standards' },
  { icon: '📅', name: 'Scalability Focus' }, { icon: '🌍', name: 'Global Vision' },
];

export const testimonials: Testimonial[] = [
  { id: 1, initials: 'SM', quote: "The SchoolSathi platform completely transformed our administrative workflow. We saved 15+ hours a week on fee collections alone. Sanothimi doesn't just provide software; they provide a solution that truly understands the education sector.", name: 'Sarah Mitchell', title: 'Principal, BrightPath Academy' },
  { id: 2, initials: 'RK', quote: "Implementing Sanothimi's Finance suite was the best decision for our growing business. The real-time dashboards allowed us to make informed decisions that boosted our revenue by 25% within six months.", name: 'Raj Kumar', title: 'CEO, NovaPay Logistics' },
  { id: 3, initials: 'LP', quote: "We were struggling with inventory management across multiple locations until we switched to Sanothimi. Their cloud systems are fast, reliable, and incredibly easy to use. Our stock accuracy is now at 99%.", name: 'Laura Peterson', title: 'Operations Director, Meridian Retail' },
  { id: 4, initials: 'DW', quote: "As a startup, we needed a scalable business suite that wouldn't break the bank. Sanothimi provided enterprise-level tools at a fraction of the cost. Their support team is exceptional and always responsive.", name: 'David Wong', title: 'Founder, Pacific Rim Tech' },
  { id: 5, initials: 'AB', quote: "The security and reliability of Sanothimi's infrastructure give us complete peace of mind. Knowing our sensitive patient billing data is encrypted and backed up allows us to focus on healthcare, not IT issues.", name: 'Angela Brooks', title: 'Board Director, Heritage Clinic Partners' },
];

export const blogPosts: BlogPost[] = [
  { id: 1, tag: 'EdTech', date: 'Mar 10, 2025', readTime: '8 min read', title: 'The Future of Education: How ERPs are Shaping 21st Century Schools', excerpt: 'Discover how digitizing administrative tasks allows educators to focus on what matters most — teaching and student outcomes...', bgGradient: 'from-[#D91E36] to-[#001C44]' },
  { id: 2, tag: 'FinTech', date: 'Feb 15, 2025', readTime: '6 min read', title: 'Why Every Small Business Needs a Cloud-Based Accounting System', excerpt: 'Transitioning from legacy systems to the cloud isn\'t just about convenience — it\'s about data security, accuracy, and growth...', bgGradient: 'from-[#001C44] to-[#000E22]' },
  { id: 3, tag: 'Security', date: 'Jan 22, 2025', readTime: '10 min read', title: 'Protecting Institutional Data: A Deep Dive into SaaS Security Standards', excerpt: 'Encryption, role-based access, and regular audits — learn how Sanothimi ensures the highest level of safety for your data...', bgGradient: 'from-[#1e1e1e] to-[#2d2d2d]' },
];
