import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const images = {
  hero: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1800&q=85',
  latte: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80',
  bakery: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80',
  bar: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
  interior: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=80',
  patio: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80',
}

const menuItems = [
  { name: 'Spanish Cortado', category: 'espresso', price: '$4.75', badge: 'Signature', description: 'Double ristretto cut with velvety steamed whole milk and Ceylon cinnamon.', tags: ['Double Ristretto', '4.5 oz'] },
  { name: 'Honey Cinnamon Oat Latte', category: 'espresso', price: '$5.85', badge: 'Best Seller', description: 'House espresso, organic oat milk, wild raw clover honey and freshly ground cinnamon bark.', tags: ['Vegan Base', 'Hot or Iced'] },
  { name: 'Cold Brew Nitro Float', category: 'brews', price: '$6.50', badge: 'Signature', description: '24-hour Ethiopian cold brew poured on draft, capped with Madagascar vanilla cream.', tags: ['Microfoam Top', 'Slow Steeped'] },
  { name: 'Truffle Avocado Sourdough', category: 'brunch', price: '$12.50', badge: 'Chef Pick', description: 'Poached farm egg, crushed Haas avocado, microgreens and Umbrian black truffle oil.', tags: ['Sourdough 48h', 'Cage-Free Egg'] },
  { name: 'Almond Frangipane Croissant', category: 'bakery', price: '$5.25', badge: 'Best Seller', description: 'Double-baked flaky French butter pastry with vanilla almond cream and sliced almonds.', tags: ['Baked at 5 AM', 'French Butter'] },
  { name: 'Smoked Salmon & Dill Brioche', category: 'brunch', price: '$13.80', description: 'Cured Atlantic salmon, herbed cream cheese, pickled red onion and caper berries.', tags: ['Wild Cured', 'Brioche Bun'] },
]

const gallery = [
  { src: images.latte, label: 'Latte Art', alt: 'Tulip latte art in a ceramic cup' },
  { src: images.bakery, label: 'Fresh Bakes', alt: 'Golden almond croissants and pastries' },
  { src: images.bar, label: 'Barista Counter', alt: 'Espresso bar with coffee equipment' },
  { src: images.interior, label: 'Cafe Sanctuary', alt: 'Sunlit communal cafe seating' },
  { src: images.patio, label: 'Garden Patio', alt: 'Sunny cafe patio with plants' },
]

function Icon({ children }) { return <span className="material-symbols-outlined" aria-hidden="true">{children}</span> }
function SectionHeading({ eyebrow, title, children, centered = false }) {
  return <div className={`section-heading ${centered ? 'centered' : ''}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</div>
}

function Header({ menuOpen, setMenuOpen }) {
  const go = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
  return <>
    <header className="site-header">
      <a className="brand" href="#top" onClick={() => setMenuOpen(false)}><span className="brand-mark"><Icon>local_cafe</Icon></span><span><strong>Brew House</strong><small>Cafe</small></span></a>
      <nav className={`desktop-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
        {['story', 'menu', 'gallery', 'reservation', 'contact'].map((item) => <button key={item} onClick={() => go(item)}>{item === 'story' ? 'Our Story' : item[0].toUpperCase() + item.slice(1)}</button>)}
      </nav>
      <div className="header-actions"><a className="phone-link" href="tel:+15552342739"><Icon>call</Icon><span>Call us</span></a><button className="button button-dark header-book" onClick={() => go('reservation')}>Book a table</button><button className="icon-button menu-toggle" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}><Icon>{menuOpen ? 'close' : 'menu'}</Icon></button></div>
    </header>
    {menuOpen && <div className="mobile-menu">{['story', 'menu', 'gallery', 'reservation', 'contact'].map((item) => <button key={item} onClick={() => go(item)}>{item === 'story' ? 'Our Story' : item[0].toUpperCase() + item.slice(1)}<Icon>arrow_forward</Icon></button>)}</div>}
  </>
}

function Hero() {
  return <section className="hero wrap" id="top"><div className="hero-copy"><span className="status-pill"><i /> Micro-roastery & bakery</span><h1>Artisanal roasts & <em>heartcrafted</em> moments.</h1><p>Locally roasted single-origin coffees, fresh gourmet sourdough pastries, and a warm sanctuary tucked into the heart of the city.</p><div className="hero-actions"><a className="button button-accent" href="#menu"><Icon>restaurant_menu</Icon>View menu</a><a className="button button-soft" href="#reservation"><Icon>calendar_month</Icon>Book a table</a></div><div className="hero-notes"><span><Icon>verified</Icon>Direct-trade beans</span><span><Icon>bakery_dining</Icon>Baked daily</span></div></div><div className="hero-image"><img src={images.hero} alt="Barista pouring latte art at Brew House Cafe" loading="eager"/><div className="batch-note"><span className="batch-icon"><Icon>local_fire_department</Icon></span><span><strong>Daily batch #104 active</strong><small>Ethiopia Yirgacheffe · Bergamot & wild jasmine</small></span></div></div></section>
}

function Story() {
  const methods = [['filter_alt', 'V60 Pour-Over', 'Japanese spiral extraction highlighting delicate floral and citrus notes.'], ['compress', 'AeroPress Immersion', 'Total submersion pressure brew yielding rich mouthfeel with gentle acidity.'], ['ac_unit', '24hr Kyoto Cold Drip', 'Drop-by-drop ice extraction crafting cacao sweetness and silk-smooth body.'], ['local_cafe', 'Slayer 9-Bar Espresso', 'Fine-tuned pre-infusion producing golden crema with dense hazelnut notes.']]
  return <section className="section section-muted" id="story"><div className="wrap"><SectionHeading eyebrow="Our story & heritage" title="Born from a sacred obsession with the bean">Brew House Cafe was founded in 2018 with a singular ambition: to treat coffee as an agricultural treasure rather than a hurried commodity.</SectionHeading><div className="stats"><div><strong>12+</strong><span>Single origins</span></div><div><strong>100%</strong><span>Grade-1 Arabica</span></div><div><strong>4.9★</strong><span>850+ reviews</span></div><div><strong>2018</strong><span>Master roasted</span></div></div><div className="method-heading"><h3>Mastery over four brew expressions</h3><span>Crafted with intention</span></div><div className="methods">{methods.map(([icon, title, text]) => <article className="method-card" key={title}><span className="method-icon"><Icon>{icon}</Icon></span><div><h4>{title}</h4><p>{text}</p></div></article>)}</div></div></section>
}

function Menu() {
  const [active, setActive] = useState('all')
  const visible = active === 'all' ? menuItems : menuItems.filter((item) => item.category === active)
  const downloadMenu = () => { const blob = new Blob(['Brew House Cafe - Seasonal Menu\n\n' + menuItems.map((item) => `${item.name} ${item.price}\n${item.description}`).join('\n\n')], { type: 'text/plain' }); const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'brew-house-seasonal-menu.txt'; link.click(); URL.revokeObjectURL(link.href) }
  return <section className="section wrap" id="menu"><SectionHeading eyebrow="Seasonal offerings" title="The curated cafe menu">Crafted using biodynamic farm milks, house-reduced syrups, and heirloom grains.</SectionHeading><div className="tabs" role="tablist">{[['all', 'All highlights'], ['espresso', 'Espresso & coffee'], ['brews', 'Artisan brews & teas'], ['bakery', 'Bakery & pastries'], ['brunch', 'Brunch & savory']].map(([value, label]) => <button className={active === value ? 'active' : ''} key={value} onClick={() => setActive(value)} role="tab" aria-selected={active === value}>{label}</button>)}</div><div className="menu-grid">{visible.map((item) => <article className="menu-card" key={item.name}><div><div className="menu-title"><h3>{item.name}</h3>{item.badge && <span>{item.badge}</span>}<strong>{item.price}</strong></div><p>{item.description}</p></div><div className="tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div><div className="download-strip"><span className="download-icon"><Icon>picture_as_pdf</Icon></span><div><h3>Download full seasonal menu</h3><p>Complete specialty list, allergen guide & tasting notes.</p></div><button className="button button-dark" onClick={downloadMenu}><Icon>download</Icon>Download menu</button></div></section>
}

function Gallery() {
  const [selected, setSelected] = useState(null)
  return <section className="section section-muted" id="gallery"><div className="wrap"><SectionHeading eyebrow="Visual atmosphere" title="Scenes from Brew House">Rich roasted aromas, laughter across walnut communal tables, and quiet focus.</SectionHeading><div className="gallery-grid">{gallery.map((item, index) => <button className={`gallery-item gallery-${index}`} key={item.label} onClick={() => setSelected(item)}><img src={item.src} alt={item.alt} loading="lazy"/><span>{item.label}</span></button>)}</div></div>{selected && <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.label} onClick={() => setSelected(null)}><button className="icon-button close-lightbox" aria-label="Close image" onClick={() => setSelected(null)}><Icon>close</Icon></button><img src={selected.src} alt={selected.alt} onClick={(event) => event.stopPropagation()}/><p>{selected.label}</p></div>}</section>
}

function Reviews() {
  const reviews = [['ER', 'Elena Rostova', 'Food & gastronomy critic', 'Hands down the smoothest flat white in town. The sourdough brunch is unbeatable, and the care they pour into each origin is evident in every sip.'], ['MC', 'Marcus Chen', 'Architect & daily regular', 'My daily ritual. Cozy ambiance, stellar playlist, and baristas who remember my cortado before I reach the counter.'], ['SL', 'Sophia Lindqvist', 'Product designer', 'The almond croissant and cold brew nitro float combo has genuinely ruined all other coffee shops for me.']]
  return <section className="section wrap"><div className="reviews-heading"><SectionHeading eyebrow="Kind words" title="Loved by local purists" /><div className="rating"><strong>★ 4.9</strong><span>850+ Google & Yelp reviews</span></div></div><div className="review-grid">{reviews.map(([initials, name, role, text]) => <article className="review-card" key={name}><div className="stars">★★★★★</div><p>“{text}”</p><div className="reviewer"><span>{initials}</span><div><strong>{name}</strong><small>{role}</small></div></div></article>)}</div></section>
}

function Reservation() {
  const [selection, setSelection] = useState({ party: '1-2 Guests', time: '9:00 AM', seat: 'Main Dining' })
  const [submitted, setSubmitted] = useState(false)
  const update = (key, value) => setSelection({ ...selection, [key]: value })
  const submit = (event) => { event.preventDefault(); setSubmitted(true) }
  return <section className="section section-muted" id="reservation"><div className="wrap narrow"><SectionHeading eyebrow="Reserve your table" title="Unrushed coffee & dining" centered>We reserve 40% of our tables for walk-ins and 60% for reservations. Guarantee your spot.</SectionHeading><form className="booking-card" onSubmit={submit}><fieldset><legend>1. Select party size</legend><div className="option-grid four">{['1-2 Guests', '3-4 Guests', '5-8 Guests', 'Large Party'].map((item) => <button type="button" className={selection.party === item ? 'selected' : ''} key={item} onClick={() => update('party', item)}><Icon>{item === 'Large Party' ? 'celebration' : item.startsWith('1') ? 'person' : item.startsWith('3') ? 'group' : 'groups'}</Icon>{item}</button>)}</div></fieldset><fieldset><legend>2. Select date & time slot</legend><input className="date-input" type="date" min={new Date().toISOString().slice(0, 10)} required /> <div className="time-options">{['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM', '6:00 PM'].map((item) => <button type="button" className={selection.time === item ? 'selected' : ''} key={item} onClick={() => update('time', item)}>{item}</button>)}</div></fieldset><fieldset><legend>3. Seating preference</legend><div className="option-grid three">{['Main Dining', 'Window Nook', 'Sunny Patio'].map((item) => <button type="button" className={selection.seat === item ? 'selected' : ''} key={item} onClick={() => update('seat', item)}><Icon>{item === 'Main Dining' ? 'table_restaurant' : item === 'Window Nook' ? 'chair' : 'deck'}</Icon>{item}</button>)}</div></fieldset><div className="input-grid"><label>Full name<input required name="name" type="text" placeholder="Your name" /></label><label>Phone number<input required name="phone" type="tel" placeholder="(555) 234-2739" /></label></div><label>Special requests<textarea name="requests" rows="3" placeholder="Dietary needs or accessibility requests (optional)" /></label><button className="button button-accent submit-button" type="submit"><Icon>check_circle</Icon>Book a table now</button>{submitted ? <p className="form-success" role="status"><Icon>verified</Icon>Thanks! We have your request for {selection.time}. We will confirm by phone shortly.</p> : <p className="form-note"><Icon>verified</Icon>Instant confirmation · No cancellation fee up to 1 hour prior</p>}</form></div></section>
}

function Contact() {
  const [sent, setSent] = useState(false)
  return <section className="section wrap" id="contact"><SectionHeading eyebrow="Get in touch" title="We would love to host you">Questions about catering, private cuppings, or bulk coffee orders?</SectionHeading><div className="contact-grid"><div className="contact-details"><div className="contact-card call-card"><span className="contact-icon"><Icon>call</Icon></span><div><small>Direct line</small><strong>(555) 234-BREW</strong></div><a className="button button-dark" href="tel:+15552342739">Call now</a></div><div className="contact-card"><h3><Icon>schedule</Icon>Opening hours</h3><p><span>Monday – Friday</span><strong>7:00 AM – 8:00 PM</strong></p><p><span>Saturday – Sunday</span><strong>8:00 AM – 9:00 PM</strong></p></div><div className="contact-card"><h3><Icon>mail</Icon>Direct inquiries</h3><p>General: <a href="mailto:hello@brewhousecafe.com">hello@brewhousecafe.com</a></p><p>Press & events: <a href="mailto:events@brewhousecafe.com">events@brewhousecafe.com</a></p></div></div><form className="inquiry-form" onSubmit={(event) => { event.preventDefault(); setSent(true); event.currentTarget.reset() }}><h3>Send a note</h3><label>Your name<input required type="text" /></label><label>Email address<input required type="email" /></label><label>How can we help?<textarea required rows="4" /></label><button className="button button-dark" type="submit"><Icon>send</Icon>Submit inquiry</button>{sent && <p className="form-success" role="status">Thanks, your note is on its way.</p>}</form></div></section>
}

function Location() { return <section className="section section-muted" id="directions"><div className="wrap"><SectionHeading eyebrow="Find us" title="Located in historic Downtown">Easily accessible by transit, foot, and bicycle with validated rear guest parking.</SectionHeading><div className="location-card"><div className="map-art"><span className="map-road road-one" /><span className="map-road road-two" /><span className="map-pin"><Icon>location_on</Icon></span><span className="map-label">Downtown Historic District</span></div><div className="location-info"><h3><Icon>location_on</Icon>Brew House Cafe</h3><p>424 Artisan Way, Downtown Historic District</p><ul><li><Icon>local_parking</Icon>Free 2-hour validated parking</li><li><Icon>accessible</Icon>Full ADA accessibility</li><li><Icon>directions_bike</Icon>Covered bicycle racks</li></ul><a className="button button-accent" href="https://www.google.com/maps/search/?api=1&query=424+Artisan+Way+Downtown" target="_blank" rel="noreferrer"><Icon>near_me</Icon>Get directions</a></div></div></div></section> }

function Footer() { const [joined, setJoined] = useState(false); return <footer className="site-footer"><div className="wrap"><div className="newsletter"><div><span className="eyebrow">Secret tasting club</span><h2>15% off your first coffee bag</h2><p>Private cupping invitations, roast drops, and recipe secrets.</p></div><form onSubmit={(event) => { event.preventDefault(); setJoined(true); event.currentTarget.reset() }}><input aria-label="Email address" type="email" placeholder="Enter your email" required /><button className="button button-accent" type="submit">{joined ? 'You are in' : 'Join club'}</button></form></div><div className="footer-grid"><div><a className="brand footer-brand" href="#top"><span className="brand-mark"><Icon>local_cafe</Icon></span><span><strong>Brew House</strong><small>Cafe</small></span></a><p>Where every cup tells an artisanal story. Roasting specialty Arabica daily with dignity, intention, and joy.</p></div><div><h3>Quick links</h3><a href="#menu">Curated menu</a><a href="#reservation">Reservations</a><a href="mailto:events@brewhousecafe.com">Private catering</a></div><div><h3>Standards</h3><a href="#story">Direct-trade ethics</a><a href="#menu">Roast date guarantee</a><a href="#contact">Accessibility</a></div><div><h3>Connect</h3><div className="socials"><a href="https://instagram.com" aria-label="Instagram"><Icon>photo_camera</Icon></a><a href="https://spotify.com" aria-label="Spotify"><Icon>graphic_eq</Icon></a><a href="https://facebook.com" aria-label="Facebook"><Icon>share</Icon></a></div><small>@brewhousecafe · Downtown sanctuary</small></div></div><div className="footer-bottom"><span>© 2026 Brew House Cafe. All rights reserved.</span><span>Always fresh · Never compromised</span></div></div></footer> }

function MobileBar() { return <nav className="mobile-bar" aria-label="Quick navigation"><a href="#top"><Icon>local_cafe</Icon><span>Home</span></a><a href="#menu"><Icon>restaurant_menu</Icon><span>Menu</span></a><a href="#reservation"><Icon>calendar_today</Icon><span>Reserve</span></a><a href="#directions"><Icon>near_me</Icon><span>Directions</span></a><a href="tel:+15552342739"><Icon>phone_in_talk</Icon><span>Call</span></a></nav> }

function App() { const [menuOpen, setMenuOpen] = useState(false); return <><Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} /><main><Hero /><Story /><Menu /><Gallery /><Reviews /><Reservation /><Contact /><Location /></main><Footer /><MobileBar /></> }

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
