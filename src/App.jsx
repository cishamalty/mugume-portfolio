import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { profile, projects, services, skills, stats, writing } from "./data";

const navItems = ["About", "Work", "Services", "Writing", "Contact"];

const iconPaths = {
  chart: (
    <>
      <rect x="4" y="10" width="3.5" height="10" rx="1" />
      <rect x="10.25" y="5" width="3.5" height="15" rx="1" />
      <rect x="16.5" y="8" width="3.5" height="12" rx="1" />
    </>
  ),
  code: (
    <>
      <path d="m8 17-5-5 5-5" />
      <path d="m16 7 5 5-5 5" />
      <path d="m14 4-4 16" />
    </>
  ),
  shield: <path d="M12 21s7-3.7 7-9.5V5.8L12 3 5 5.8v5.7C5 17.3 12 21 12 21Z" />,
  clipboard: (
    <>
      <rect x="6" y="5" width="12" height="17" rx="2" />
      <rect x="9" y="2" width="6" height="5" rx="1.5" />
      <path d="M9 12h6M9 16h5" />
    </>
  ),
  message: <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />,
  book: (
    <>
      <path d="M4 4h6a3 3 0 0 1 3 3v16a3 3 0 0 0-3-3H4Z" />
      <path d="M20 4h-6a3 3 0 0 0-3 3v16a3 3 0 0 1 3-3h6Z" />
    </>
  ),
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 5.3-8 11-8 11S4 15.3 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  linkedIn: (
    <>
      <path d="M6 10v10" />
      <path d="M10 20v-5.5a4 4 0 0 1 8 0V20" />
      <path d="M18 20v-5" />
      <circle cx="6" cy="6" r="1.5" />
    </>
  ),
};

function Icon({ name, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

function slug(label) {
  return label.toLowerCase();
}

function App() {
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      let current = "About";
      for (const item of navItems) {
        const el = document.getElementById(slug(item));
        if (el && el.getBoundingClientRect().top <= 160) {
          current = item;
        }
      }

      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  function goTo(item) {
    document.getElementById(slug(item))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <div className="site-shell">
      <Nav active={active} goTo={goTo} scrolled={scrolled} />
      <button className="mobile-menu-button" type="button" onClick={() => setMenuOpen(true)}>
        <Icon name="menu" />
        <span>Menu</span>
      </button>
      {menuOpen && <MobileMenu active={active} goTo={goTo} onClose={() => setMenuOpen(false)} />}

      <main>
        <Hero goTo={goTo} />
        <Stats />
        <Skills />
        <Projects />
        <Services />
        <Writing />
        <Contact />
      </main>

      <footer className="footer">
        <span>{profile.name}.</span>
        <span>{currentYear} / Data Engineer & Intelligence Specialist</span>
      </footer>
    </div>
  );
}

function Nav({ active, goTo, scrolled }) {
  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`} aria-label="Main navigation">
      <button className="nav__brand" type="button" onClick={() => goTo("About")}>
        MM
      </button>
      <div className="nav__links">
        {navItems.map((item) => (
          <button
            key={item}
            className={active === item ? "is-active" : ""}
            type="button"
            onClick={() => goTo(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <button className="button button--dark nav__cta" type="button" onClick={() => goTo("Contact")}>
        Hire Me
        <Icon name="arrow" size={16} />
      </button>
    </nav>
  );
}

function MobileMenu({ active, goTo, onClose }) {
  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation">
      <button className="mobile-menu__close" type="button" onClick={onClose} aria-label="Close navigation">
        <Icon name="close" size={28} />
      </button>
      {navItems.map((item) => (
        <button
          key={item}
          className={active === item ? "is-active" : ""}
          type="button"
          onClick={() => goTo(item)}
        >
          {item}
        </button>
      ))}
      <button className="button button--dark" type="button" onClick={() => goTo("Contact")}>
        Hire Me
        <Icon name="arrow" size={16} />
      </button>
    </div>
  );
}

function Hero({ goTo }) {
  return (
    <section className="hero" id="about">
      <div className="hero__content reveal">
        <div className="eyebrow">
          <Icon name="pin" size={15} />
          {profile.location}
        </div>
        <h1>
          {profile.firstName}
          <span>{profile.lastName}.</span>
        </h1>
        <p className="hero__title">{profile.title}</p>
        <p className="hero__tagline">"{profile.tagline}"</p>
        <p className="hero__about">{profile.about}</p>
        <div className="hero__actions">
          <button className="button button--dark" type="button" onClick={() => goTo("Work")}>
            View Work
            <Icon name="arrow" size={16} />
          </button>
          <button className="button button--light" type="button" onClick={() => goTo("Contact")}>
            Get in Touch
          </button>
        </div>
        <div className="status-pill">
          <span />
          {profile.currentRole}
        </div>
      </div>

      <DashboardHero />
    </section>
  );
}

function DashboardHero() {
  return (
    <div className="dashboard-hero reveal reveal--late" aria-label="Portfolio dashboard preview">
      <div className="dashboard-hero__top">
        <div>
          <span>Program Health</span>
          <strong>Portfolio Overview</strong>
        </div>
        <div className="dashboard-hero__badge">Live</div>
      </div>
      <div className="dashboard-hero__stats">
        <MiniMetric value="84%" label="Data Quality" />
        <MiniMetric value="512" label="Tracked SMEs" />
        <MiniMetric value="18" label="Risk Flags" />
      </div>
      <div className="dashboard-hero__grid">
        <div className="line-panel">
          <div className="line-panel__header">
            <span>Completion trend</span>
            <strong>+22%</strong>
          </div>
          <svg viewBox="0 0 260 110" role="img" aria-label="Line chart preview">
            <path className="grid-line" d="M10 88H250M10 56H250M10 24H250" />
            <path className="area" d="M12 86 C45 80 55 61 82 64 C112 68 121 35 152 39 C185 43 195 20 248 24 V104 H12 Z" />
            <path className="line" d="M12 86 C45 80 55 61 82 64 C112 68 121 35 152 39 C185 43 195 20 248 24" />
          </svg>
        </div>
        <div className="rank-panel">
          {["ESO readiness", "Learner progress", "Funding follow-up"].map((label, index) => (
            <div key={label}>
              <span>{label}</span>
              <div>
                <i style={{ width: `${82 - index * 13}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniMetric({ value, label }) {
  return (
    <div className="mini-metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Stats() {
  return (
    <section className="stats-band" aria-label="Key numbers">
      {stats.map((item) => (
        <div className="stat" key={item.label}>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </section>
  );
}

function SectionIntro({ number, label, title, text }) {
  return (
    <div className="section-intro">
      <div className="section-mark">
        <span>{number}</span>
        <i />
        <span>{label}</span>
      </div>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Skills() {
  return (
    <section className="section" aria-label="Technical skills">
      <SectionIntro number="01" label="Toolkit" title="Technical Skills" />
      <div className="skills-grid">
        {skills.map((skill) => (
          <div className="skill" key={skill.name}>
            <div>
              <span>{skill.name}</span>
              <em>{skill.category}</em>
            </div>
            <div className="skill__track">
              <i style={{ width: `${skill.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section section--work" id="work">
      <SectionIntro
        number="02"
        label="Selected Work"
        title="Project Dashboard"
        text="Dashboards, validation systems, and digital learning tools built for real program teams."
      />
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className={`project-card project-card--${project.accent} ${project.featured ? "project-card--featured" : ""}`}>
      <div className="project-card__visual" aria-hidden="true">
        <div className="project-card__screen">
          <div className="project-card__screen-top">
            <span>{project.metric}</span>
            <i />
          </div>
          <div className="project-card__bars">
            {project.chart.map((height, index) => (
              <span key={`${project.title}-${height}-${index}`} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="project-card__body">
        <span className="tag">{project.tag}</span>
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="impact">
          <Icon name="arrow" size={15} />
          <span>{project.impact}</span>
        </div>
      </div>
    </article>
  );
}

function Services() {
  return (
    <section className="section" id="services">
      <SectionIntro
        number="03"
        label="Services"
        title="How I Help"
        text="Focused support for teams that need clean data, useful dashboards, and reliable reporting systems."
      />
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <div className="service-card__icon">
              <Icon name={service.icon} size={21} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Writing() {
  return (
    <section className="section" id="writing">
      <SectionIntro
        number="04"
        label="Writing"
        title="Notes in Progress"
        text="Short, practical pieces on analytics, data quality, and M&E systems."
      />
      <div className="writing-grid">
        {writing.map((post) => (
          <article className="writing-card" key={post.title}>
            <span className="tag">{post.label}</span>
            <h3>{post.title}</h3>
            <p>{post.desc}</p>
            <span className="writing-card__date">Coming soon</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section" id="contact">
      <SectionIntro number="05" label="Contact" title="Got a data system to build?" />
      <p>
        Looking to build a dashboard, automate a data pipeline, or design a practical M&E system? I am available for
        freelance and consulting work across Africa and beyond.
      </p>
      <div className="contact__actions">
        <a className="button button--dark" href={`mailto:${profile.email}`}>
          <Icon name="mail" size={17} />
          Send an Email
        </a>
        <a className="button button--light" href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer">
          <Icon name="linkedIn" size={17} />
          LinkedIn
        </a>
      </div>
      <div className="contact__chips">
        <span>Kampala, Uganda</span>
        <span>Open to Remote</span>
        <span>Available Now</span>
      </div>
    </section>
  );
}

export default App;
