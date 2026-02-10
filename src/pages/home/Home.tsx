import { Link } from 'react-router-dom';
import { useState } from 'react';
import Calendar from '../../components/modals/Calendar';

export default function Home() {
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <>
      {/* Hero section */}
      <section className="hero d-flex align-items-center justify-content-center text-center">
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

      <div className="container">
        {/* Top Destinations */}
        <section>
          <div>
            <hr></hr>
            <h2>Top Destinations</h2>
          </div>
          <div>
            <div>
              <img
                src="src/assets/images/home/destinations/bali.jpg"
                alt="A luxury resort with a pool by the sea"
                height={50}
              ></img>
              <p>Bali</p>
              <p>Indonesia</p>
            </div>
            <div>
              <img
                src="src/assets/images/home/destinations/dubai.jpg"
                alt="The Atlantis luxury resort in Dubai"
                height={50}
              ></img>
              <p>Dubai</p>
              <p>UAE</p>
            </div>
            <div>
              <img
                src="src/assets/images/home/destinations/honolulu.jpg"
                alt="A luxury resort with palm trees and a beach club"
                height={50}
              ></img>
              <p>Honolulu</p>
              <p>Hawaii</p>
            </div>
            <div>
              <img
                src="src/assets/images/home/destinations/marrakesh.jpg"
                alt="A luxury resort with Moroccan architecture"
                height={50}
              ></img>
              <p>Marrakesh</p>
              <p>Morocco</p>
            </div>
            <div>
              <img
                src="src/assets/images/home/destinations/phuket.jpg"
                alt="A luxury resort with a pool in the tropics"
                height={50}
              ></img>
              <p>Phuket</p>
              <p>Thailand</p>
            </div>
            <div>
              <img
                src="src/assets/images/home/destinations/santorini.jpg"
                alt="Houses in Santorini overlooking the sea"
                height={50}
              ></img>
              <p>Santorini</p>
              <p>Greece</p>
            </div>
          </div>
        </section>

        {/* Highest rated */}
        <section>
          <div>
            <hr></hr>
            <h2>Highest rated</h2>
          </div>
          {/* Venues (dynamically generated) */}
          <div className="rated-container"></div>
        </section>

        {/* View all venues */}
        <section>
          <div>
            <hr></hr>
            <h2>Discover exceptional places to stay</h2>
          </div>
          <div>
            <img
              src="src/assets/images/home/venues/venues1.jpg"
              alt="A resort with trees and a pool in the courtyard"
              height={50}
            ></img>
            <div>
              <p>
                From intimate retreats to refined city escapes, explore carefully selected venues
                designed for comfort, style, and unforgettable stays.
              </p>
            </div>
            <Link to="/venues">
              <img
                src="src/assets/images/home/venues/venues2.jpg"
                alt="A luxury resort with a pool and sunbeds at sundown"
                height={50}
              ></img>
              <p>View all venues</p>
            </Link>
            <img
              src="src/assets/images/home/venues/venues3.jpg"
              alt="Multiple luxury resorts on the beach"
              height={50}
            ></img>
            <div>
              <p>
                Built for modern travellers, <strong>Holidaze</strong> combines luxury destinations
                with a seamless booking experience, all in one place.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
