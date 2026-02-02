import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className="container">
        {/* Hero */}
        <section>
          <div>
            <img
              src="src/assets/images/home/hero.jpg"
              alt="A luxury resort with a pool"
              height={300}
            ></img>
          </div>
          <div>
            <h1>EXCEPTIONAL STAYS, THOUGHTFULLY CURATED</h1>
            <h2>Book unique venues in destinations around the world.</h2>
            <div>
              <form>
                <input placeholder="Location" />
                <input placeholder="Check-in / Check-out" />
                <input placeholder="Guests" />
                <button type="button">Search</button>
              </form>
            </div>
          </div>
        </section>

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
