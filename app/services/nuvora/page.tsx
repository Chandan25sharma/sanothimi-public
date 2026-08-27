'use client';
import ServicePageLayout, { type ServicePageData } from '@/components/ServicePageLayout';

const DATA: ServicePageData = {
  category: 'School ERP',
  status: 'live',
  icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  ),
  titleKey: 'svc.1.title',
  descKey: 'svc.1.desc',
  highlights: ['1 Month Free Trial', '5+ Schools Onboarded', 'Mobile App Included'],
  heroImage: '/services/service-01.png',

  /* 02. THE PROBLEM */
  problem: {
    kicker: 'The Challenge',
    title: 'Schools shouldn\'t have to run on spreadsheets.',
    desc: 'Admissions, attendance, fees, examinations and communication often live in separate systems, separate registers, and separate spreadsheets. NUVORA brings them together into one connected environment.',
  },

  /* 04. CORE MODULES */
  modules: [
    { number: '01', title: 'Student Management', desc: 'Centralize student profiles, admissions, guardians, documents and academic records in one place.', image: '/services/modules/nuvora-01.jpg' },
    { number: '02', title: 'Fees & Finance', desc: 'Manage fee structures, invoices, payments, outstanding balances and financial reporting.', image: '/services/modules/nuvora-02.jpg' },
    { number: '03', title: 'Attendance', desc: 'Track daily attendance across classes with instant visibility for administrators and parents.', image: '/services/modules/nuvora-03.jpg' },
    { number: '04', title: 'Examination', desc: 'Manage exams, grading, results and report cards from one connected academic workflow.', image: '/services/modules/nuvora-04.jpg' },
    { number: '05', title: 'Parent Portal', desc: 'Keep parents connected with attendance, results, fees and important school updates.', image: '/services/modules/nuvora-05.jpg' },
    { number: '06', title: 'Communication', desc: 'Connect schools, teachers, students and guardians through centralized messaging and notices.', image: '/services/modules/nuvora-06.jpg' },
  ],

  /* Kept as a fallback source — unused while `modules` is supplied */
  capabilities: [
    { title: 'Automated Fee Collection', desc: 'Generate invoices, track dues, and reconcile payments without manual spreadsheets.' },
    { title: 'Exam & Result Management', desc: 'Digitize grading, publish report cards, and track academic progress term over term.' },
    { title: 'Parent Portal', desc: 'Give guardians real-time visibility into attendance, fees, and results from any device.' },
    { title: 'Digital Attendance', desc: 'Replace paper registers with biometric or app-based check-ins synced instantly.' },
  ],

  /* 05. HOW IT CONNECTS */
  workflow: [
    { number: '01', title: 'Admissions', desc: 'Register students and create their complete digital profiles.' },
    { number: '02', title: 'Daily Operations', desc: 'Manage attendance, classes, teachers and student activities.' },
    { number: '03', title: 'Finance', desc: 'Generate fees, collect payments and monitor outstanding balances.' },
    { number: '04', title: 'Academics', desc: 'Manage examinations, grades and academic performance.' },
    { number: '05', title: 'Parents', desc: 'Give guardians access to the information that matters to them.' },
  ],

  /* 06. WHO USES IT */
  audiences: [
    { title: 'School Administrators', desc: 'Get one operational view across students, finance, academics and staff.' },
    { title: 'Teachers', desc: 'Manage attendance, classes, examinations and student information.' },
    { title: 'Parents', desc: 'Stay informed about attendance, results, fees and school communication.' },
    { title: 'Students', desc: 'Access relevant academic information and school services digitally.' },
  ],

  /* 07. RELIABILITY */
  reliability: ['Zero Data Loss', '99.9% Uptime SLA', 'Daily Backups', 'Role-Based Access'],

  /* 08. WHY IT MATTERS */
  panelKicker: 'Why NUVORA',
  panelTitle: 'One connected platform for the entire school.',
  panelDesc: 'NUVORA Core replaces disconnected registers and spreadsheets with a centralized digital system designed for administrators, teachers, students and parents.',

  /* 09. IMPLEMENTATION */
  implementation: [
    { title: 'Configure', desc: 'Set up classes, fee structures and roles around how your school actually runs.' },
    { title: 'Migrate', desc: 'Move existing student, staff and financial records into NUVORA safely.' },
    { title: 'Train', desc: 'Hands-on onboarding for administrators, teachers and office staff.' },
    { title: 'Launch', desc: 'Go live with support on standby through your first full term.' },
  ],

  /* 10. CTA */
  ctaTitle: 'Bring NUVORA\nto Your School',
  ctaSub: 'Join the schools already running admissions, fees, attendance and academics on one connected platform.',
};

export default function NuvoraPage() {
  return <ServicePageLayout data={DATA} />;
}
