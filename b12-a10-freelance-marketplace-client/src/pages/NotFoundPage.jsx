import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="container form-wrap">
      <div className="form-card">
        <h2>404 - Page Not Found</h2>
        <p>The route you visited does not exist.</p>
        <Link className="btn" to="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
