import { Link } from 'react-router-dom';
import Calendar from '../../components/modals/Calendar';
import { useEffect, useRef, useState } from 'react';
import { endpoints } from '../../config/api';
import { apiFetch } from '../../utils/api';
import type { Venue } from '../../types/venue.types';
import VenueCardHome from '../../components/cards/VenueCardHome';

import scrollIcon from '../../assets/icons/scroll-icon.png';
import heroImage from '../../assets/images/home/hero.jpg';
import bali from '../../assets/images/home/destinations/bali.jpg';
import dubai from '../../assets/images/home/destinations/dubai.jpg';
import honolulu from '../../assets/images/home/destinations/honolulu.jpg';
import marrakesh from '../../assets/images/home/destinations/marrakesh.jpg';
import phuket from '../../assets/images/home/destinations/phuket.jpg';
import santorini from '../../assets/images/home/destinations/santorini.jpg';
import venues1 from '../../assets/images/home/venues/venues1.jpg';
import venues2 from '../../assets/images/home/venues/venues2.jpg';
import venues3 from '../../assets/images/home/venues/venues3.jpg';

export default function Home() {
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [ratedVenues, setRatedVenues] = useState<Venue[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right'): void => {
    if (!scrollRef.current) return;

    const scrollAmount = 400;

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    async function fetchVenues() {
      try {
        const venues = await apiFetch<Venue[]>(`${endpoints.venues}?limit=20`);

        const sorted = venues.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 10);

        setRatedVenues(sorted);
      } catch (error) {
        console.error(error);
      }
    }

    fetchVenues();
  }, []);

  return (
    <>
      {/* Hero section */}
      <section
        className="hero d-flex align-items-center justify-content-center text-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-content text-white position-relative d-flex flex-column align-items-center w-100 px-3 px-md-0">
          <h1 className="fw-bold mb-4">EXCEPTIONAL STAYS, THOUGHTFULLY CURATED</h1>
          <p className="hero-text h3 fw-medium mb-4">
            Book unique venues in destinations around the world.
          </p>

          <form className="hero-form d-flex flex-column flex-md-row bg-white align-items-stretch rounded-4 p-3 gap-2">
            {/* Location */}
            <input className="form-control flex-fill" placeholder="Location" />

            {/* Check-in */}
            <input
              type="text"
              className="form-control flex-fill"
              placeholder="Check-in"
              readOnly
              value={dateFrom ? dateFrom.toLocaleDateString() : ''}
              onClick={() => setShowCalendar(true)}
            />

            {/* Check-out */}
            <input
              type="text"
              className="form-control flex-fill"
              placeholder="Check-out"
              readOnly
              value={dateTo ? dateTo.toLocaleDateString() : ''}
              onClick={() => setShowCalendar(true)}
            />

            {/* Guests */}
            <input className="form-control" placeholder="Guests" />

            {/* Search */}
            <button className="btn btn-cta px-4" type="button">
              Search
            </button>
          </form>

          {/* Calendar modal */}
          {showCalendar && (
            <Calendar
              bookings={[]}
              onClose={() => setShowCalendar(false)}
              onSelectRange={(from, to) => {
                setDateFrom(from);
                setDateTo(to);
              }}
            />
          )}
        </div>
      </section>

      {/* Top Destinations */}
      <section className="mb-5 mt-5">
        <div className="d-flex align-items-center gap-3 mb-3">
          <h2 className="mb-2 ps-5">Top Destinations</h2>
          <hr className="flex-grow-1 me-4" />
        </div>

        <div className="destinations-scroll d-flex gap-4 overflow-auto pb-2">
          {[
            { img: bali, city: 'Bali', country: 'Indonesia' },
            { img: dubai, city: 'Dubai', country: 'UAE' },
            { img: honolulu, city: 'Honolulu', country: 'Hawaii' },
            { img: marrakesh, city: 'Marrakesh', country: 'Morocco' },
            { img: phuket, city: 'Phuket', country: 'Thailand' },
            { img: santorini, city: 'Santorini', country: 'Greece' },
          ].map((destination) => (
            <div key={destination.city} className="text-center flex-shrink-0 destination-item">
              <img src={destination.img} alt={destination.city} className="destination-img" />
              <p className="mb-0 fw-medium mt-2">{destination.city}</p>
              <small className="text-muted">{destination.country}</small>
            </div>
          ))}
        </div>
      </section>

      {/* Highest rated */}
      <section className="highest-rated">
        <div className="d-flex align-items-center gap-3 mb-3">
          <hr className="flex-grow-1 ms-4" />
          <h2 className="mb-2 pe-5">Highest rated</h2>
        </div>
        <div className="rated-wrapper">
          <button type="button" className="scroll-btn left" onClick={() => scroll('left')}>
            <img src={scrollIcon} alt="Scroll left" />
          </button>

          <div className="rated-scroll" ref={scrollRef}>
            {ratedVenues.map((venue: Venue) => (
              <VenueCardHome key={venue.id} venue={venue} />
            ))}
          </div>

          <button type="button" className="scroll-btn right" onClick={() => scroll('right')}>
            <img src={scrollIcon} alt="Scroll right" />
          </button>
        </div>
      </section>

      {/* View all venues */}
      <section className="mb-5">
        <div className="mb-4 d-flex align-items-center justify-content-center gap-3">
          <hr className="title-line" />
          <h2 className="fw-semibold text-center m-0">Discover exceptional places to stay</h2>
          <hr className="title-line" />
        </div>

        <div className="container">
          <div className="row g-4 mb-5">
            <div className="col-12 col-lg-4 p-0">
              <div className="image-wrapper">
                <img src={venues1} alt="Beautiful luxury resort" className="img-fluid" />

                <div className="info-box mt-4">
                  <p>
                    From intimate retreats to refined city escapes, explore carefully selected
                    venues designed for comfort, style, and unforgettable stays.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4 p-0">
              <Link to="/venues" className="image-wrapper d-block text-decoration-none">
                <img src={venues2} alt="Beautiful luxury resort" className="img-fluid" />

                <div className="home-overlay"></div>

                <div className="overlay-text">View all venues</div>
              </Link>
            </div>

            <div className="col-12 col-lg-4 p-0">
              <div className="image-wrapper">
                <div className="info-box mb-4">
                  <p>
                    Built for modern travellers, <strong>Holidaze</strong> combines luxury
                    destinations with a seamless booking experience, all in one place.
                  </p>
                </div>
                <img src={venues3} alt="Beautiful luxury resort" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
