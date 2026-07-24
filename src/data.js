export const profile = {
  name: "Mugume Martin",
  firstName: "Mugume",
  lastName: "Martin",
  title: "Data Engineer & Intelligence Specialist",
  tagline: "Turning messy program data into decisions that matter.",
  location: "Kampala, Uganda",
  email: "mugumeanalysis@gmail.com",
  linkedin: "linkedin.com/in/martin-mugume/",
  currentRole: "Data Analyst @ Outbox - NSSF Hi Innovator Program",
  about:
    "I build the data systems behind better program decisions: dashboards, validation pipelines, M&E reporting, and automation for entrepreneurship and impact programs.",
};

export const stats = [
  { value: "6+", label: "Dashboards Built" },
  { value: "3+", label: "Years Experience" },
  { value: "500+", label: "Businesses Tracked" },
  { value: "6+", label: "Projects Delivered" },
];

export const skills = [
  { name: "Power BI", level: 95, category: "BI" },
  { name: "Python / pandas", level: 90, category: "Engineering" },
  { name: "Excel / Sheets", level: 92, category: "BI" },
  { name: "KoboToolbox", level: 88, category: "Collection" },
  { name: "Data Automation", level: 85, category: "Engineering" },
  { name: "M&E Systems", level: 90, category: "Analytics" },
  { name: "Django", level: 72, category: "Engineering" },
  { name: "Data Scraping", level: 80, category: "Engineering" },
];

export const projects = [
  {
    title: "OCA Dashboard",
    tag: "Power BI / M&E",
    featured: true,
    accent: "green",
    metric: "12 ESOs",
    desc:
      "Organizational Capacity Assessment dashboard evaluating entrepreneurship support organizations across maturity areas.",
    impact: "Helped stakeholders identify which ESOs needed targeted support.",
    chart: [62, 84, 45, 92, 73, 58, 78],
  },
  {
    title: "Academy Dashboard",
    tag: "Power BI / Learning",
    featured: true,
    accent: "blue",
    metric: "Real-time",
    desc:
      "Learner progress dashboard for cohort participation, course completion, and training outcome visibility.",
    impact: "Gave program managers live insight into learning progress.",
    chart: [38, 52, 64, 71, 76, 82, 89],
  },
  {
    title: "Seed Funding Dashboard",
    tag: "Power BI / Finance",
    accent: "amber",
    metric: "Funding",
    desc:
      "Tracks funding distribution across supported businesses and connects disbursement data to post-funding progress.",
    impact: "Enabled transparent reporting on funding impact.",
    chart: [42, 76, 55, 81, 48, 69, 88],
  },
  {
    title: "Email Fraud Detection",
    tag: "Python / Data Quality",
    accent: "rose",
    metric: "Risk flags",
    desc:
      "Python tool detecting suspicious registrations through typo domains, disposable addresses, and sequence patterns.",
    impact: "Surfaced fake registrations before enrollment decisions.",
    chart: [26, 44, 39, 68, 51, 74, 63],
  },
  {
    title: "Portfolio Dashboard",
    tag: "Power BI / Program",
    accent: "violet",
    metric: "500+ SMEs",
    desc:
      "Single view of supported businesses, cohort trends, KPIs, business health, and reporting indicators.",
    impact: "Improved management reporting across the portfolio.",
    chart: [55, 48, 67, 72, 61, 86, 79],
  },
  {
    title: "WhatsApp Learning Platform",
    tag: "Twilio / Text.it / BI",
    accent: "teal",
    metric: "Scaled",
    desc:
      "Digital learning workflow with quiz logic, learner tracking, certificate automation, and ESO dashboards.",
    impact: "Supported scalable course delivery through WhatsApp.",
    chart: [30, 46, 54, 66, 73, 80, 91],
  },
];

export const services = [
  {
    icon: "chart",
    title: "Power BI Dashboards",
    desc: "Interactive dashboards for program monitoring, funding, and impact reporting.",
  },
  {
    icon: "code",
    title: "Python Data Analysis",
    desc: "Data cleaning, automation scripts, validation pipelines, and exploratory analysis.",
  },
  {
    icon: "shield",
    title: "Data Quality Systems",
    desc: "Fraud detection, validation logic, and data integrity frameworks for program data.",
  },
  {
    icon: "clipboard",
    title: "M&E System Design",
    desc: "Indicator tracking, result measurement frameworks, and evidence-based reporting tools.",
  },
  {
    icon: "message",
    title: "Digital Learning Systems",
    desc: "WhatsApp-based course delivery with learner progress and certificate automation.",
  },
  {
    icon: "book",
    title: "Data Capacity Building",
    desc: "Training teams on analytics tools, data quality, and data-driven decision-making.",
  },
];

export const writing = [
  {
    title: "Why Your Program Data Is Lying to You",
    label: "Data Quality",
    desc: "How unvalidated data collection leads to wrong program decisions, and how to fix it.",
  },
  {
    title: "Building Dashboards That Actually Get Used",
    label: "Business Intelligence",
    desc: "The difference between dashboards that sit in a folder and ones that change team behavior.",
  },
  {
    title: "M&E in the Age of Automation",
    label: "M&E / Africa",
    desc: "How automation tools are changing monitoring and evaluation for impact programs.",
  },
];
