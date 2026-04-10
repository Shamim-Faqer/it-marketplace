export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>Copyright © {new Date().getFullYear()} Freelance MarketPlace. All rights reserved.</p>
        <a className="x-link" href="https://x.com" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.9 2H22l-6.77 7.73L23.2 22h-6.25l-4.9-6.42L6.3 22H3.2l7.25-8.28L.8 2h6.4l4.43 5.84L18.9 2zm-1.1 18h1.73L6.26 3.9H4.4L17.8 20z" />
          </svg>
          <span>Follow on X</span>
        </a>
      </div>
    </footer>
  );
}
