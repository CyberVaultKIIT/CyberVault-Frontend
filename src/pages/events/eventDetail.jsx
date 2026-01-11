import React, { useEffect, useRef, useState } from 'react'
import styles from './eventDetails.module.scss'
import { getEventById } from '../../services/eventServices'
import { useParams } from 'react-router-dom'



const Speakers = ({ speakers = [] }) => (
  <div className={styles.speakers}> 
    {speakers.map((s, i) => (
      <div key={s._id || i} className={styles.speakerItem}>
        <img src={s.imgURL || ''} alt={s.name || 'Speaker'} />
        <p>{s.name}</p>
      </div>
    ))}
  </div>
)

const SponsorsRow = ({ sponsors = [] }) => (
  <div className={styles.sponsorsRow}>
    {sponsors.map((s, i) => (
      <div key={i} className={styles.sponsorItem}>
        <img src={s.logo || ''} alt={s.name || 'Sponsor'} />
      </div>
    ))}
  </div>
)

// const ThreeDGallery = ({ images = [] }) => {
//   const containerRef = useRef(null)
//   const [isAuto, setIsAuto] = useState(true)

//   // duplicate the images to create a seamless loop
//   const doubled = images && images.length ? [...images, ...images] : []

//   useEffect(() => {
//     const el = containerRef.current
//     if (!el || !images || images.length === 0) return

//     let rafId
//     const speed = 0.5 // px per frame approx

//     const step = () => {
//       if (isAuto) {
//         // scroll and wrap when we've reached half (the duplicated boundary)
//         el.scrollLeft += speed
//         if (el.scrollLeft >= el.scrollWidth / 2) {
//           el.scrollLeft = 0
//         }
//       }
//       rafId = requestAnimationFrame(step)
//     }

//     rafId = requestAnimationFrame(step)
//     return () => cancelAnimationFrame(rafId)
//   }, [images, isAuto])

//   if (!images || images.length === 0) return null

//   return (
//     <div className={styles.galleryWrap}>
//       <div
//         className={styles.carousel}
//         ref={containerRef}
//         onMouseEnter={() => setIsAuto(false)}
//         onMouseLeave={() => setIsAuto(true)}
//         role="list"
//       >
//         {doubled.map((img, i) => (
//           <div
//             key={`${i}-${img}`}
//             role="listitem"
//             className={styles.card}
//             style={{ backgroundImage: `url(${img})` }}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

const Testimonials = ({ items = [] }) => {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % items.length), 3000)
    return () => clearInterval(id)
  }, [items.length])

  return (
    <div className={styles.testimonials}>
      <div className={styles.testGrid}>
        {items.map((t, i) => (
          <div key={i} className={`${styles.testCard} ${i === idx ? styles.active : ''}`}>
            <p className={styles.testText}>{t.text}</p>
            <p className={styles.testAuthor}>{t.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const EventDetail = ({}) => {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams();

  const getPosterUrl = (poster) => {
    if (!poster) return null
    if (typeof poster === 'string') return poster
    if (typeof poster === 'object') {
      if (poster.image1) return poster.image1
      if (poster.image2) return poster.image2
      if (poster.url) return poster.url
      if (poster.src) return poster.src
      const first = Object.values(poster).find(v => typeof v === 'string')
      return first || null
    }
    return null
  }

  const getDateTime = (ev) => {
    if (!ev) return { dateStr: null, timeStr: null }
    // prefer eventInfo sub-object if present
    const info = ev.eventInfo || ev
    // common date/time keys
    const candidates = ['date', 'eventDate', 'startDate', 'datetime', 'time']
    let dateVal = null
    for (const k of candidates) {
      if (info[k]) { dateVal = info[k]; break }
    }

    if (!dateVal) return { dateStr: null, timeStr: null }

    // if time is separate
    const timeVal = info.time || info.startTime || ev.time || null

    // try parse dateVal
    const parsed = typeof dateVal === 'number' ? new Date(dateVal) : Date.parse(String(dateVal))
    if (!Number.isNaN(parsed)) {
      const d = new Date(parsed)
      const dateStr = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
      const timeStr = timeVal || d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
      return { dateStr, timeStr }
    }

    // fallback to raw strings
    return { dateStr: String(dateVal), timeStr: timeVal ? String(timeVal) : null }
  }

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        const data = await getEventById(id);
        if (!mounted) return
        // adjust if API wraps event in data.event
        setEvent(data?.event || data)
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [id])

  if (loading) return <div className={styles.loading}>Loading...</div>
  if (!event) return <div className={styles.empty}>Event not found</div>

  // normalize fields according to backend schema
  const speakers = event.speakers || event.eventInfo?.speakers || []
  const sponsors = event.sponsors || []
  const images = event.images || event.gallery || event.eventInfo?.images || []
  const testimonials = event.testimonials || []

  // poster/url extraction
  const posterUrl = (() => {
    // try poster object first
    const p = event.poster || null
    const fromPoster = getPosterUrl(p)
    if (fromPoster) return fromPoster
    // fallback to images array
    if (images && images.length) return images[0]
    // fallback to eventInfo image keys
    const ei = event.eventInfo || {}
    if (ei.image) return ei.image
    if (ei.images && ei.images.length) return ei.images[0]
    return null
  })()

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.badge}>LIVE</span>
          <h1 className={styles.title}>{event.title}</h1>
          <p className={styles.description}>{event.description}</p>
          {
            (() => {
              const { dateStr, timeStr } = getDateTime(event)
              const location = event.location || event.venue || event.place || null
              if (!dateStr && !timeStr && !location) return null
              return (
                <div className={styles.meta}>
                  {dateStr && <div><strong>{dateStr}</strong></div>}
                  {timeStr && <div>{timeStr}</div>}
                  {location && <div>{location}</div>}
                </div>
              )
            })()
          }
          <button className={styles.register}>REGISTER</button>
          {speakers && speakers.length > 0 ? (
            <>
              <h4 className={styles.speakersTitle}>SPEAKERS</h4>
              <Speakers speakers={speakers} />
            </>
          ) : null}
        </div>

        <div className={styles.heroRight}>
          {posterUrl ? (
            <img src={posterUrl} alt={event.eventInfo?.title || event.title || 'Event poster'} className={styles.posterImg} />
          ) : (
            <div className={styles.posterPlaceholder}>No image</div>
          )}
        </div>
      </div>

      <SponsorsRow sponsors={sponsors} />

      {/* <ThreeDGallery images={images} /> */}

      <Testimonials items={testimonials} />

      {
        (() => {
          const href = event.eventInfo?.instagram || event.social?.instagram || '#'
          return (
            <a className={styles.followBlock} href={href} target="_blank" rel="noopener noreferrer">
              <h2>FOLLOW FOR MORE</h2>
            </a>
          )
        })()
      }
    </div>
  )
}

export default EventDetail
