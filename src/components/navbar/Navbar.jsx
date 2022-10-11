import "./navbar.scss";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <ul>
          <Link className="link" to="/"><li>Home</li></Link>
          <Link className="link" to="/posts/type/latest"><li>Latest Auctions</li></Link>
          <Link className="link" to="/posts/type/onGoing"><li>On Going Auctions</li></Link>
          <Link className="link" to="/posts/type/featured"><li>Featured Auction</li></Link>
          <Link className="link" to="/posts/type/upcoming"><li>Upcoming Auctions</li></Link>
          <Link className="link" to="/posts/type/closing"><li>Closing Auctions</li></Link>
          <Link className="link" to="/posts/type/closed"><li>Closed Auctions</li></Link>
          <Link className="link" to="/"><li>Contact Us</li></Link>
        </ul>
      </div>
    </div>
  )
}
