const currYear = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h4>© {currYear} Hungry Dine</h4>
        <h4>
          Made with 💗 by{" "}
          <strong>
            <a
              href="https://github.com/ruthwik31"
              /*target="_blank"
              rel="noopener noreferrer"*/
              style={{
                color: "inherit",
                textDecoration: "none",
                cursor: "progress",
              }}
            >
              RUTHWIK🐅
            </a>
          </strong>
        </h4>
      </div>
      <ul className="footer-nav">
        <li>Privacy Policy</li>
        <li>Terms and conditions</li>
        <li>Contact Us</li>
      </ul>
      <div className="footer-right">
        <p>123 Food city,Hyderabad 505001</p>
      </div>
    </footer>
  );
};
export default Footer;