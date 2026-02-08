import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} KnowMyRights • Empowering citizens with
        accessible legal knowledge.
      </p>
      {/* <div className="footer-links">
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Privacy</a>
      </div> */}
    </footer>
  );
}
