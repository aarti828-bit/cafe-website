import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { cafe, gallery, menuCategories, menuItems, reviews } from './cafeData.js'
import './styles.css'

const iconNames = {
  home: 'home', story: 'auto_stories', menu: 'restaurant_menu', gallery: 'photo_library',
  reviews: 'reviews', contact: 'mail', call: 'call', location: 'location_on', hours: 'schedule',
  coffee: 'local_cafe', directions: 'near_me', close: 'close', arrow: 'arrow_forward',
}

function Icon({ name, children }) {
  return <span className="material-symbols-outlined" aria-hidden="true">{iconNames[name] || children || name}</span>
}

function SectionHeading({ eyebrow, title, children, centered = false }) {
  return <div className={`section-heading ${centered ? 'centered' : ''}`}>
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {children && <p>{children}</p>}
  </div>
}

function whatsappUrl(message) {
  const number = cafe.whatsappNumber.replace(/\D/g, '')
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : ''
}

function WhatsAppLink({ className = 'button button-accent', message = `Hello, I would like to know more about ${cafe.name} and the cafe menu.` }) {
  const href = whatsappUrl(message)
  return href
    ? <a className={className} href={href} target="_blank" rel="noreferrer"><Icon>chat</Icon>WhatsApp us</a>
    : <a className={className} href="#contact"><Icon>chat</Icon>WhatsApp setup needed</a>
}

const navigation = [
  ['story', 'Our story'], ['menu', 'Menu'], ['gallery', 'Gallery'], ['reviews', 'Reviews'], ['contact', 'Contact'],
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  return <>
    <header className="site-header">
      <a className="brand" href="#top" onClick={() => setMenuOpen(false)} aria-label={`${cafe.name}, home`}>
        <span className="brand-mark"><Icon name="coffee" /></span>
        <span><strong>{cafe.name}</strong><small>Cafe</small></span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <div className="header-actions">
        {cafe.phoneNumber
          ? <a className="phone-link" href={`tel:${cafe.phoneNumber}`}><Icon name="call" /><span>Call us</span></a>
          : <a className="phone-link" href="#contact"><Icon name="call" /><span>Contact</span></a>}
        <a className="button button-dark header-book" href="#reservation">Plan a visit</a>
        <button className="icon-button menu-toggle" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
      </div>
    </header>
    {menuOpen && <nav className="mobile-menu" aria-label="Mobile navigation">
      {navigation.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<Icon name="arrow" /></a>)}
    </nav>}
  </>
}

function Hero() {
  return <section className="hero wrap" id="top">
    <div className="hero-copy">
      <span className="status-pill"><i /> Cafe website demo</span>
      <h1>{cafe.headline}</h1>
      <p>{cafe.tagline}</p>
      <div className="hero-actions">
        <a className="button button-accent" href="#menu"><Icon>restaurant_menu</Icon>View menu</a>
        <WhatsAppLink className="button button-soft" />
      </div>
      <div className="hero-notes"><span><Icon>verified</Icon>Thoughtfully made</span><span><Icon>bakery_dining</Icon>Made for slow moments</span></div>
      <div className="hero-highlights" aria-label="Cafe highlights">
        {cafe.highlights.map((item) => <span key={item}>{item}</span>)}
      </div>
    </div>
    <div className="hero-image">
      <img src={cafe.images.hero} alt={cafe.images.heroAlt} fetchPriority="high" />
      <div className="batch-note"><span className="batch-icon"><Icon name="coffee" /></span><span><strong>A little time, well spent</strong><small>{cafe.shortDescription}</small></span></div>
    </div>
  </section>
}

function Story() {
  const methods = [
    ['filter_alt', 'Thoughtful sourcing', 'A menu guided by good ingredients and the changing seasons.'],
    ['local_cafe', 'Made to order', 'An easy-going cup, made just the way you like it.'],
    ['bakery_dining', 'Fresh from the kitchen', 'Fresh favorites for a slow morning or an afternoon treat.'],
    ['favorite', 'A welcoming place', 'Coffee is even better shared around a welcoming table.'],
  ]
  return <section className="section section-muted" id="story"><div className="wrap">
    <SectionHeading eyebrow="A place to settle in" title={cafe.storyTitle}>{cafe.story}</SectionHeading>
    <div className="method-heading"><h3>The details make the difference</h3><span>Made with intention</span></div>
    <div className="methods">{methods.map(([icon, title, text]) => <article className="method-card" key={title}><span className="method-icon"><Icon>{icon}</Icon></span><div><h4>{title}</h4><p>{text}</p></div></article>)}</div>
  </div></section>
}

function Menu() {
  const [active, setActive] = useState('all')
  const visible = active === 'all' ? menuItems : menuItems.filter((item) => item.category === active)
  const downloadMenu = () => {
    const text = `${cafe.name} - Demo Menu\n\n${menuItems.map((item) => `${item.name} ${item.price}\n${item.description}`).join('\n\n')}`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'cafe-demo-menu.txt'
    link.click()
    URL.revokeObjectURL(url)
  }
  return <section className="section wrap" id="menu">
    <SectionHeading eyebrow="The menu · demo prices" title="Something good, any time">Browse the sample menu. Replace names, descriptions, photos, and prices in <code>src/cafeData.js</code>.</SectionHeading>
    <div className="tabs" role="tablist" aria-label="Filter menu by category">
      {menuCategories.map(([value, label]) => <button type="button" key={value} onClick={() => setActive(value)} className={active === value ? 'active' : ''} role="tab" aria-selected={active === value}>{label}</button>)}
    </div>
    <div className="menu-grid">{visible.map((item) => <article className="menu-card" key={item.name}>
      <img src={item.image} alt={item.alt} loading="lazy" />
      <div className="menu-card-copy"><div className="menu-title"><h3>{item.name}</h3><strong>{item.price}</strong></div>
        <span className="menu-category">{item.category}</span><p>{item.description}</p>
      </div>
    </article>)}</div>
    <div className="download-strip"><span className="download-icon"><Icon>download</Icon></span><div><h3>Take the demo menu with you</h3><p>Downloads as a simple text file for easy editing.</p></div><button className="button button-dark" type="button" onClick={downloadMenu}><Icon>download</Icon>Download menu</button></div>
  </section>
}

function Gallery() {
  const [selected, setSelected] = useState(null)
  return <section className="section section-muted" id="gallery"><div className="wrap">
    <SectionHeading eyebrow="A look around" title="The cafe, in moments">Demo photography for the layout. Add the cafe's own images in <code>src/cafeData.js</code>.</SectionHeading>
    <div className="gallery-grid">{gallery.map((item, index) => <button type="button" className={`gallery-item gallery-${index}`} key={item.label} onClick={() => setSelected(item)} aria-label={`View ${item.label}`}><img src={item.src} alt={item.alt} loading="lazy"/><span>{item.label}</span></button>)}</div>
  </div>{selected && <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.label} onClick={() => setSelected(null)}><button className="icon-button close-lightbox" aria-label="Close image" onClick={() => setSelected(null)}><Icon name="close" /></button><img src={selected.src} alt={selected.alt} onClick={(event) => event.stopPropagation()}/><p>{selected.label}</p></div>}</section>
}

function Reviews() {
  return <section className="section wrap" id="reviews">
    <div className="reviews-heading"><SectionHeading eyebrow="Guest notes · samples" title="Kind words, coming soon">These are clearly marked placeholders. Replace them with genuine reviews and get permission before publishing.</SectionHeading></div>
    <div className="review-grid">{reviews.map((review) => <article className="review-card" key={review.id}><span className="sample-label">Sample Review</span><div className="stars" aria-label={`${review.stars} out of 5 sample rating`}>{'★'.repeat(review.stars)}</div><p>“{review.text}”</p><div className="reviewer"><span>{review.initials}</span><div><strong>{review.name}</strong><small>Demo testimonial</small></div></div></article>)}</div>
  </section>
}

function Reservation() {
  const [selection, setSelection] = useState({ party: '1-2 guests', time: '10:00 AM', seat: 'Cafe table' })
  const [message, setMessage] = useState('')
  const update = (key, value) => setSelection((current) => ({ ...current, [key]: value }))
  const submit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const request = `Hello, I would like to ask about a table at ${cafe.name}. Name: ${form.get('name')}. Date: ${form.get('date')}. Time: ${selection.time}. Party: ${selection.party}. Seating: ${selection.seat}. Phone: ${form.get('phone')}. Notes: ${form.get('requests') || 'None'}.`
    const href = whatsappUrl(request)
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer')
      setMessage('WhatsApp opened with your request. Your table is not booked until the cafe confirms directly.')
    } else {
      setMessage('Demo only: add a real WhatsApp number in src/cafeData.js to send this request.')
    }
  }
  return <section className="section section-muted" id="reservation"><div className="wrap narrow">
    <SectionHeading eyebrow="Plan a visit · inquiry only" title="Save yourself a seat" centered>Use this form to start a conversation with the cafe. It does not make or confirm a reservation.</SectionHeading>
    <form className="booking-card" onSubmit={submit}>
      <fieldset><legend>Party size</legend><div className="option-grid four">{['1-2 guests', '3-4 guests', '5-8 guests', 'Large party'].map((item) => <button type="button" className={selection.party === item ? 'selected' : ''} key={item} onClick={() => update('party', item)}>{item}</button>)}</div></fieldset>
      <fieldset><legend>Date and time preference</legend><input className="date-input" name="date" type="date" min={new Date().toISOString().slice(0, 10)} required/><div className="time-options">{['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'].map((item) => <button type="button" className={selection.time === item ? 'selected' : ''} key={item} onClick={() => update('time', item)}>{item}</button>)}</div></fieldset>
      <fieldset><legend>Seating preference</legend><div className="option-grid three">{['Cafe table', 'Window seat', 'Outdoor table'].map((item) => <button type="button" className={selection.seat === item ? 'selected' : ''} key={item} onClick={() => update('seat', item)}>{item}</button>)}</div></fieldset>
      <div className="input-grid"><label>Your name<input required name="name" type="text" autoComplete="name" placeholder="Your name"/></label><label>Phone number<input required name="phone" type="tel" autoComplete="tel" placeholder="Your number"/></label></div>
      <label>Notes for the cafe<textarea name="requests" rows="3" placeholder="Optional"/></label>
      <button className="button button-accent submit-button" type="submit"><Icon>chat</Icon>Continue in WhatsApp</button>
      <p className="form-note"><Icon>info</Icon> This demo sends no data unless a real WhatsApp number is configured.</p>
      {message && <p className="form-success" role="status">{message}</p>}
    </form>
  </div></section>
}

function Contact() {
  const [status, setStatus] = useState('')
  const sendEmail = (event) => {
    event.preventDefault()
    if (!cafe.email) {
      setStatus('Demo only: add a real cafe email in src/cafeData.js before using this form.')
      return
    }
    const form = new FormData(event.currentTarget)
    const subject = `Cafe website inquiry from ${form.get('name')}`
    const body = `Name: ${form.get('name')}\nReply email: ${form.get('email')}\n\n${form.get('message')}`
    window.location.href = `mailto:${cafe.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('Your email app is ready with this message. Nothing is sent by the website.')
  }
  return <section className="section wrap" id="contact">
    <SectionHeading eyebrow="Get in touch" title="We would love to hear from you">For a question, a visit, or anything else, use the contact details below.</SectionHeading>
    <div className="contact-grid"><div className="contact-details">
      <div className="contact-card call-card"><span className="contact-icon"><Icon name="call" /></span><div><small>Phone</small><strong>{cafe.phoneDisplay || 'Add client phone number'}</strong></div>{cafe.phoneNumber ? <a className="button button-dark" href={`tel:${cafe.phoneNumber}`}>Call now</a> : <a className="button button-dark" href="#contact">Setup needed</a>}</div>
      <div className="contact-card"><h3><Icon name="hours"/>Opening hours</h3>{cafe.hours.days.map((day) => <p key={day.label}><span>{day.label}</span><strong>{day.hours}</strong></p>)}<small className="demo-note">{cafe.hours.isDemo ? 'Demo hours · replace before launch' : ''}</small></div>
      <div className="contact-card"><h3><Icon>mail</Icon>Contact details</h3><p><span>Email</span><strong>{cafe.email || 'Add client email'}</strong></p><p><span>WhatsApp</span><strong>{cafe.whatsappNumber ? 'Number configured' : 'Add client number'}</strong></p>{cafe.instagramUrl && <p><span>Instagram</span><a href={cafe.instagramUrl} target="_blank" rel="noreferrer">Visit profile</a></p>}</div>
    </div><form className="inquiry-form" onSubmit={sendEmail}><h3>Send a note</h3><label>Your name<input required name="name" type="text" autoComplete="name"/></label><label>Email address<input required name="email" type="email" autoComplete="email"/></label><label>How can we help?<textarea required name="message" rows="4"/></label><button className="button button-dark" type="submit"><Icon>send</Icon>Prepare email</button>{status && <p className="form-success" role="status">{status}</p>}</form></div>
  </section>
}

function Location() {
  return <section className="section section-muted" id="location"><div className="wrap">
    <SectionHeading eyebrow="Find the cafe" title="Come by for a while">Address and directions are intentionally left for the cafe owner to configure.</SectionHeading>
    <div className="location-card"><div className="map-art" role="img" aria-label={cafe.address ? `Map for ${cafe.address}` : 'Decorative map placeholder; cafe address not configured'}><span className="map-road road-one"/><span className="map-road road-two"/><span className="map-pin"><Icon name="location"/></span><span className="map-label">{cafe.address ? cafe.name : 'Address to be added'}</span></div><div className="location-info"><h3><Icon name="location"/>{cafe.name}</h3><p>{cafe.address || 'Add the cafe address in src/cafeData.js before launch.'}</p><ul><li><Icon>schedule</Icon>Check current hours before visiting</li><li><Icon>directions_walk</Icon>Neighborhood cafe</li></ul>{cafe.mapsUrl ? <a className="button button-accent" href={cafe.mapsUrl} target="_blank" rel="noreferrer"><Icon name="directions"/>Get directions</a> : <span className="button button-disabled" aria-disabled="true"><Icon name="directions"/>Directions setup needed</span>}</div></div>
  </div></section>
}

function Footer() {
  return <footer className="site-footer"><div className="wrap">
    <div className="newsletter"><div><span className="eyebrow">A good place to begin</span><h2>Make room for a little coffee</h2><p>Browse the menu or get in touch to plan a visit.</p></div><div className="footer-cta"><a className="button button-accent" href="#menu">Explore the menu</a><WhatsAppLink className="button button-soft"/></div></div>
    <div className="footer-grid"><div><a className="brand footer-brand" href="#top"><span className="brand-mark"><Icon name="coffee"/></span><span><strong>{cafe.name}</strong><small>Cafe</small></span></a><p>{cafe.shortDescription}</p></div><div><h3>Explore</h3><a href="#story">Our story</a><a href="#menu">Menu</a><a href="#gallery">Gallery</a></div><div><h3>Visit</h3><a href="#reservation">Plan a visit</a><a href="#location">Directions</a><a href="#contact">Contact</a></div><div><h3>Contact</h3>{cafe.phoneNumber ? <a href={`tel:${cafe.phoneNumber}`}>{cafe.phoneDisplay || cafe.phoneNumber}</a> : <span>Phone number to be added</span>}{cafe.email ? <a href={`mailto:${cafe.email}`}>{cafe.email}</a> : <span>Email to be added</span>}{cafe.instagramUrl && <a href={cafe.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>}<small>{cafe.hours.days[0].hours}{cafe.hours.isDemo ? ' · Demo hours' : ''}</small></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {cafe.name}</span><span>Demo template · customize before launch</span></div>
  </div></footer>
}

function MobileBar() {
  return <nav className="mobile-bar" aria-label="Quick navigation"><a href="#top"><Icon name="home"/><span>Home</span></a><a href="#menu"><Icon name="menu"/><span>Menu</span></a><a href="#reservation"><Icon>event</Icon><span>Visit</span></a><a href="#location"><Icon name="directions"/><span>Find us</span></a><a href={cafe.phoneNumber ? `tel:${cafe.phoneNumber}` : '#contact'}><Icon name="call"/><span>Call</span></a></nav>
}

function App() {
  useEffect(() => {
    const title = `${cafe.name} | Coffee, Food & Good Company`
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', cafe.tagline)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', cafe.tagline)
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', cafe.images.hero)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', cafe.tagline)
    document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', cafe.images.hero)
  }, [])
  return <><Header/><main><Hero/><Story/><Menu/><Gallery/><Reviews/><Reservation/><Contact/><Location/></main><Footer/><MobileBar/></>
}

createRoot(document.getElementById('root')).render(<StrictMode><App/></StrictMode>)