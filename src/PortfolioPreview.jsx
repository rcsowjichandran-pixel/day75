import './PortfolioPreview.css'

const getSafeProjectUrl = (value) => {
  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null
  } catch {
    return null
  }
}

function PortfolioPreview({ portfolio, selectedTheme, compact = false }) {
  const { personalInfo, skills, projects } = portfolio
  const displayName = personalInfo.name.trim() || 'Your name'
  const initials = personalInfo.name.trim()
    ? personalInfo.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
    : 'YN'
  const email = personalInfo.email.trim()

  if (compact) {
    return (
      <aside className="preview-column" id="portfolio-preview" aria-label="Live portfolio preview">
        <div className="preview-toolbar">
          <div className="preview-label">
            <span className="live-dot" />
            <span>YOUR LIVE PREVIEW</span>
          </div>
          <span className="preview-caption">A little peek ✳</span>
        </div>
        <article className={`portfolio-card preview-${selectedTheme}`}>
          <div className="preview-decoration" aria-hidden="true">
            <span className="preview-blob" />
            <span className="preview-orbit" />
          </div>
          <div className="preview-content">
            <div className="preview-card-top">
              <span className="preview-monogram">p<span>.</span></span>
              <span className="preview-availability"><i /> OPEN TO LOVELY THINGS</span>
            </div>
            <div className="profile-block">
              <div className="avatar" aria-label={`Initials: ${initials}`}>{initials}</div>
              <span className="profile-kicker">HELLO THERE, I’M</span>
              <h2 className="preview-name">{displayName}<span>.</span></h2>
              <p className="preview-title">
                {personalInfo.title || 'A title that feels like you'}
              </p>
              <p className="preview-bio">
                {personalInfo.bio || 'Your story goes here. A small introduction to the things you love and the work you do.'}
              </p>
            </div>

            <div className="preview-divider"><span>✳</span></div>

            <section className="preview-section">
              <div className="preview-section-heading">
                <span>THE THINGS I DO</span><i />
              </div>
              {skills.length > 0 ? (
                <ul className="preview-skill-list">
                  {skills.map((skill, index) => (
                    <li key={`${skill}-preview-${index}`}>{skill}</li>
                  ))}
                </ul>
              ) : (
                <p className="preview-placeholder">Your superpowers will show up here.</p>
              )}
            </section>

            <section className="preview-section preview-projects-section">
              <div className="preview-section-heading">
                <span>SELECTED LITTLE THINGS</span><i />
              </div>
              {projects.length > 0 ? (
                <div className="preview-project-list">
                  {projects.map((project, index) => {
                    const projectUrl = getSafeProjectUrl(project.url)
                    return (
                      <article className="preview-project" key={`${project.id}-preview`}>
                        <span className={`project-marker marker-${index % 3}`} aria-hidden="true">
                          {['✳', '◒', '✿'][index % 3]}
                        </span>
                        <div>
                          <h3>{project.title || 'Untitled project'}</h3>
                          <p>{project.description || 'A little more about this project goes here.'}</p>
                          {projectUrl && (
                            <a className="project-link" href={projectUrl} target="_blank" rel="noreferrer">
                              Take a peek <span aria-hidden="true">↗</span>
                            </a>
                          )}
                        </div>
                      </article>
                    )
                  })}
                </div>
              ) : (
                <p className="preview-placeholder">The things you make will live here.</p>
              )}
            </section>

            <footer className="preview-footer">
              <span>MADE WITH INTENTION</span><span>✿</span>
            </footer>
          </div>
        </article>
        <p className="preview-footnote"><span aria-hidden="true">↗</span> Changes appear here as you go.</p>
      </aside>
    )
  }

  return (
    <article className={`portfolio-page portfolio-page-${selectedTheme}`}>
      <div className="portfolio-page-orb portfolio-page-orb-one" aria-hidden="true" />
      <div className="portfolio-page-orb portfolio-page-orb-two" aria-hidden="true" />
      <div className="portfolio-page-inner mx-auto w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[min(940px,calc(100%-88px))]">
        <div className="portfolio-page-nav">
          <a className="portfolio-page-brand" href="#portfolio-top" aria-label="Back to top">
            <span>p</span><i>.</i>
          </a>
          <span className="portfolio-page-nav-note"><i /> AVAILABLE FOR WHAT’S NEXT</span>
        </div>

        <header className="portfolio-hero grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr]" id="portfolio-top">
          <div className="portfolio-hero-copy">
            <span className="portfolio-overline"><i /> A LITTLE INTRODUCTION</span>
            <h1>{displayName}<span className="portfolio-period">.</span></h1>
            <p className="portfolio-hero-title">{personalInfo.title || 'A title that feels like you'}</p>
            <p className="portfolio-hero-bio">
              {personalInfo.bio || 'Your story goes here. A small introduction to the things you love and the work you do.'}
            </p>
            {email ? (
              <a className="portfolio-contact-button" href={`mailto:${email}`}>
                Say hello <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <p className="portfolio-contact-hint">Add your email in the editor to make it easy to say hello.</p>
            )}
          </div>
          <div className="portfolio-hero-art" aria-hidden="true">
            <span className="hero-art-ring" />
            <span className="hero-art-disc" />
            <span className="hero-art-initials">{initials}</span>
            <span className="hero-art-sparkle">✳</span>
            <span className="hero-art-caption">MADE OF MANY LITTLE THINGS</span>
          </div>
          <span className="portfolio-hero-index" aria-hidden="true">01 / 03</span>
        </header>

        <section className="portfolio-page-section portfolio-skills-section">
          <div className="portfolio-section-intro">
            <span className="portfolio-overline">02 — THE GOOD STUFF</span>
            <h2>Things I do<br /><em>with feeling.</em></h2>
          </div>
          <div className="portfolio-skill-grid grid grid-cols-1 sm:grid-cols-2">
            {skills.length > 0 ? skills.map((skill, index) => (
              <div className="portfolio-skill-card" key={`${skill}-full-${index}`}>
                <span className="portfolio-skill-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="portfolio-skill-name">{skill}</span>
                <span className="portfolio-skill-sparkle" aria-hidden="true">{['✳', '✿', '✦'][index % 3]}</span>
              </div>
            )) : (
              <p className="portfolio-empty-note">Your skills will find a home here.</p>
            )}
          </div>
        </section>

        <section className="portfolio-page-section portfolio-work-section">
          <div className="portfolio-section-intro">
            <span className="portfolio-overline">03 — MADE ALONG THE WAY</span>
            <h2>A few things<br /><em>out in the world.</em></h2>
          </div>
          {projects.length > 0 ? (
            <div className="portfolio-work-grid grid grid-cols-1 sm:grid-cols-2">
              {projects.map((project, index) => {
                const projectUrl = getSafeProjectUrl(project.url)
                return (
                  <article className={`portfolio-work-card portfolio-work-card-${index % 3}${selectedTheme === 'minimalist' ? ' grid grid-cols-[104px_1fr] sm:grid-cols-[180px_1fr]' : ''}`} key={project.id}>
                    <div className="portfolio-work-art" aria-hidden="true">
                      <span>{['✳', '◒', '✿'][index % 3]}</span>
                      <small>NO. {String(index + 1).padStart(2, '0')}</small>
                    </div>
                    <div className="portfolio-work-copy">
                      <span className="portfolio-work-index">A LITTLE PROJECT</span>
                      <h3>{project.title || 'Untitled project'}</h3>
                      <p>{project.description || 'A little more about this project goes here.'}</p>
                      {projectUrl && (
                        <a href={projectUrl} target="_blank" rel="noreferrer">
                          Take a closer look <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <p className="portfolio-empty-note">The things you make will live here.</p>
          )}
        </section>

        <footer className="portfolio-page-footer">
          <div>
            <span className="portfolio-overline">A NOTE BEFORE YOU GO</span>
            <h2>Let’s make something<br /><em>meaningful.</em></h2>
          </div>
          <div className="portfolio-footer-contact">
            {email ? (
              <a href={`mailto:${email}`}>
                <span>GET IN TOUCH</span>
                {email}
                <i aria-hidden="true">↗</i>
              </a>
            ) : (
              <p>Add your email in the editor to share your contact details here.</p>
            )}
          </div>
          <div className="portfolio-footer-bottom">
            <span>MADE WITH INTENTION <i>✿</i></span>
            <a href="#portfolio-top">BACK TO TOP ↑</a>
          </div>
        </footer>
      </div>
    </article>
  )
}

export default PortfolioPreview
