import { Link } from 'react-router-dom';

export default function VenueDetail() {
  return (
    <>
      <div className="container">
        <div>
          <Link to="/"></Link>
          <Link to="/venues"></Link>
          <p className=""></p>
        </div>

        {/* Venue details (dynamically generated) */}
        <section className="venue-details-container"></section>
      </div>
    </>
  );
}
