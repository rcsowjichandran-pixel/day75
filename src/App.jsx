import { useState } from 'react'
import './App.css'
import PortfolioPreview from './PortfolioPreview.jsx'

const themeOptions = [
  { value: 'modern', label: 'Modern', detail: 'Soft & polished' },
  { value: 'minimalist', label: 'Minimalist', detail: 'Quietly confident' },
  { value: 'creative', label: 'Creative', detail: 'A little unexpected' },
]

function App() {
  const [portfolio, setPortfolio] = useState({
    personalInfo: { name: '', title: '', bio: '', email: '' },
    skills: [],
    skillDraft: '',
    projects: [],
  })
  const [selectedTheme, setSelectedTheme] = useState('modern')
  const [isEditing, setIsEditing] = useState(true)

  const updatePersonalInfo = (field, value) => {
    setPortfolio((current) => ({
      ...current,
      personalInfo: { ...current.personalInfo, [field]: value },
    }))
  }

  const addSkill = (event) => {
    event.preventDefault()
    const skill = portfolio.skillDraft.trim()
    if (!skill) return

    setPortfolio((current) => ({
      ...current,
      skills: [...current.skills, skill],
      skillDraft: '',
    }))
  }

  const removeSkill = (indexToRemove) => {
    setPortfolio((current) => ({
      ...current,
      skills: current.skills.filter((_, index) => index !== indexToRemove),
    }))
  }

  const updateProject = (projectId, field, value) => {
    setPortfolio((current) => ({
      ...current,
      projects: current.projects.map((project) =>
        project.id === projectId ? { ...project, [field]: value } : project,
      ),
    }))
  }

  const addProject = () => {
    setPortfolio((current) => ({
      ...current,
      projects: [
        ...current.projects,
        { id: crypto.randomUUID(), title: '', description: '', url: '' },
      ],
    }))
  }

  const removeProject = (projectId) => {
    setPortfolio((current) => ({
      ...current,
      projects: current.projects.filter((project) => project.id !== projectId),
    }))
  }

  const { personalInfo, skills, projects } = portfolio

  return (
    <main className={isEditing ? 'app-shell' : 'preview-app-shell'}>
      <header className="topbar">
        <a className="brand" href={isEditing ? '#home' : '#portfolio-top'} aria-label="Petal home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <path d="M20 20C9 19 9 8 20 7c7 5 7 9 0 13Z" />
              <path d="M20 20c1-11 12-11 13 0-5 7-9 7-13 0Z" />
              <path d="M20 20c11 1 11 12 0 13-7-5-7-9 0-13Z" />
              <path d="M20 20C19 31 8 31 7 20c5-7 9-7 13 0Z" />
              <circle cx="20" cy="20" r="2.5" />
            </svg>
          </span>
          <span className="brand-name">petal<span>.</span></span>
        </a>
        <div className="topbar-note">
          <span className="save-dot" />
          {isEditing ? 'Your little corner of the internet, in progress' : 'Your portfolio is ready to bloom'}
        </div>
        <button className="topbar-link" type="button" onClick={() => setIsEditing((editing) => !editing)}>
          {isEditing ? 'Generate Portfolio' : 'Back to Form'}
          <span aria-hidden="true">{isEditing ? '↗' : '←'}</span>
        </button>
      </header>

      {isEditing ? (
        <>
          <section className="intro" id="home">
        <div className="intro-copy">
          <span className="eyebrow"><span /> YOUR PORTFOLIO, YOUR WAY</span>
          <h1>A lovely place<br />to <em>begin.</em></h1>
          <p>Gather the things you do best. We’ll make them look like you.</p>
        </div>
        <div className="intro-art" aria-hidden="true">
          <span className="art-sun" />
          <span className="art-stem" />
          <span className="art-leaf art-leaf-one" />
          <span className="art-leaf art-leaf-two" />
          <span className="art-flower"><i /><i /><i /><i /><b /></span>
          <span className="art-sparkle sparkle-one">✳</span>
          <span className="art-sparkle sparkle-two">✦</span>
        </div>
          </section>

          <div className="workspace grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.86fr)]">
        <section className="editor" aria-label="Portfolio editor">
          <div className="editor-heading">
            <div>
              <span className="eyebrow">THE GOOD STUFF</span>
              <h2>Make it yours</h2>
            </div>
            <span className="edit-stamp" aria-hidden="true">✳</span>
          </div>

          <section className="form-section" aria-labelledby="about-heading">
            <div className="section-title">
              <span className="section-number">01</span>
              <div>
                <h3 id="about-heading">A little about you</h3>
                <p>Start with the essentials.</p>
              </div>
            </div>
            <div className="field-grid grid grid-cols-1 sm:grid-cols-2">
              <label className="field field-wide">
                <span>Your name</span>
                <input
                  type="text"
                  placeholder="e.g. Jamie Parker"
                  value={personalInfo.name}
                  onChange={(event) => updatePersonalInfo('name', event.target.value)}
                />
              </label>
              <label className="field field-wide">
                <span>What do you do?</span>
                <input
                  type="text"
                  placeholder="e.g. Product designer & dreamer"
                  value={personalInfo.title}
                  onChange={(event) => updatePersonalInfo('title', event.target.value)}
                />
              </label>
              <label className="field field-wide">
                <span>Your email</span>
                <input
                  type="email"
                  placeholder="e.g. hello@jamieparker.com"
                  value={personalInfo.email}
                  onChange={(event) => updatePersonalInfo('email', event.target.value)}
                />
                <small className="field-hint">Shown as your contact link on the finished portfolio.</small>
              </label>
              <label className="field field-wide">
                <span>Your short story</span>
                <textarea
                  placeholder="A few words about what you love to make..."
                  rows="3"
                  value={personalInfo.bio}
                  onChange={(event) => updatePersonalInfo('bio', event.target.value)}
                />
              </label>
            </div>
          </section>

          <section className="form-section" aria-labelledby="skills-heading">
            <div className="section-title">
              <span className="section-number">02</span>
              <div>
                <h3 id="skills-heading">Your superpowers</h3>
                <p>The things you bring to the table.</p>
              </div>
            </div>
            <form className="add-row" onSubmit={addSkill}>
              <label className="visually-hidden" htmlFor="skill-input">Add a skill</label>
              <input
                id="skill-input"
                type="text"
                placeholder="e.g. Illustration"
                value={portfolio.skillDraft}
                onChange={(event) =>
                  setPortfolio((current) => ({ ...current, skillDraft: event.target.value }))
                }
              />
              <button className="small-add-button" type="submit">
                <span aria-hidden="true">+</span> Add
              </button>
            </form>
            {skills.length > 0 ? (
              <ul className="skill-list">
                {skills.map((skill, index) => (
                  <li className="skill-chip" key={`${skill}-${index}`}>
                    <span className="skill-sparkle" aria-hidden="true">✳</span>
                    {skill}
                    <button
                      type="button"
                      className="remove-skill"
                      aria-label={`Remove ${skill}`}
                      onClick={() => removeSkill(index)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-note">Your skills will find a home here.</p>
            )}
          </section>

          <section className="form-section project-form-section" aria-labelledby="projects-heading">
            <div className="section-title section-title-with-action">
              <span className="section-number">03</span>
              <div>
                <h3 id="projects-heading">Things you’ve made</h3>
                <p>Little (or big) things you’re proud of.</p>
              </div>
              <button className="outline-add-button" type="button" onClick={addProject}>
                <span aria-hidden="true">+</span> Add project
              </button>
            </div>

            {projects.length === 0 ? (
              <button className="project-empty" type="button" onClick={addProject}>
                <span className="empty-project-icon" aria-hidden="true">↗</span>
                <span><strong>Nothing here just yet</strong><small>Add your first project to get started.</small></span>
                <span className="empty-project-plus" aria-hidden="true">+</span>
              </button>
            ) : (
              <div className="project-edit-list">
                {projects.map((project, index) => (
                  <article className="project-edit-card" key={project.id}>
                    <div className="project-edit-top">
                      <span className="project-index">PROJECT {String(index + 1).padStart(2, '0')}</span>
                      <button
                        className="text-button remove-project"
                        type="button"
                        onClick={() => removeProject(project.id)}
                        aria-label={`Remove project ${index + 1}`}
                      >
                        Remove
                      </button>
                    </div>
                    <label className="field">
                      <span>Project title</span>
                      <input
                        type="text"
                        placeholder="e.g. The Sunday Journal"
                        value={project.title}
                        onChange={(event) => updateProject(project.id, 'title', event.target.value)}
                      />
                    </label>
                    <label className="field">
                      <span>A few details</span>
                      <textarea
                        placeholder="What did you make, and why?"
                        rows="2"
                        value={project.description}
                        onChange={(event) =>
                          updateProject(project.id, 'description', event.target.value)
                        }
                      />
                    </label>
                    <label className="field">
                      <span>Project link <small>OPTIONAL</small></span>
                      <input
                        type="url"
                        placeholder="https://"
                        value={project.url}
                        onChange={(event) => updateProject(project.id, 'url', event.target.value)}
                      />
                    </label>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="form-section theme-section" aria-labelledby="theme-heading">
            <div className="section-title">
              <span className="section-number">04</span>
              <div>
                <h3 id="theme-heading">Set the mood</h3>
                <p>Pick a look that feels like you.</p>
              </div>
            </div>
            <div className="theme-options" role="group" aria-label="Portfolio theme">
              {themeOptions.map((theme) => (
                <button
                  type="button"
                  className={`theme-option theme-${theme.value}${selectedTheme === theme.value ? ' selected' : ''}`}
                  key={theme.value}
                  aria-pressed={selectedTheme === theme.value}
                  onClick={() => setSelectedTheme(theme.value)}
                >
                  <span className="theme-swatch" aria-hidden="true">
                    <i /><i /><i />
                  </span>
                  <span className="theme-option-copy">
                    <strong>{theme.label}</strong>
                    <small>{theme.detail}</small>
                  </span>
                  <span className="theme-check" aria-hidden="true">✓</span>
                </button>
              ))}
            </div>
          </section>
          <p className="editor-footnote"><span aria-hidden="true">♡</span> Made with a little bit of you.</p>
        </section>

            <PortfolioPreview
              portfolio={portfolio}
              selectedTheme={selectedTheme}
              compact
            />
          </div>
        </>
      ) : (
        <PortfolioPreview portfolio={portfolio} selectedTheme={selectedTheme} />
      )}
    </main>
  )
}

export default App
