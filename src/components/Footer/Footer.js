import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
    <hr />
      <div className="footer__top">
        <h3>Back To Top</h3>
      </div>

      <div className="footer__center">
        <div className="footer__links">
          <div>
            <p>Get to know us</p>
            <ul style={{ listStyleType: "none" }}>
              <li>
                <a
                  className="footer__link"
                  href="https://www.aboutamazon.in/?utm_source=gateway&utm_medium=footer"
                >
                  About us
                </a>
              </li>
              <li>
                <a className="footer__link" href="https://amazon.jobs/en/">
                  Careers
                </a>
              </li>
              <li>
                <a
                  className="footer__link"
                  href="https://press.aboutamazon.in/?utm_source=gateway&utm_medium=footer"
                >
                  Press release
                </a>
              </li>
              <li>
                <a
                  className="footer__link"
                  href="https://www.amazon.in/b?ie=UTF8&node=8872558031&ref_=footer_cares"
                >
                  Amazon cares
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p>Connect with us</p>
            <ul style={{ listStyleType: "none" }}>
              <li>
                <a
                  className="footer__link"
                  href="https://www.facebook.com/AmazonIN"
                >
                  facebook
                </a>
              </li>
              <li>
                <a className="footer__link" href="https://twitter.com/AmazonIN">
                  Twitter
                </a>
              </li>
              <li>
                <a
                  className="footer__link"
                  href="https://www.instagram.com/amazondotin/"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p>Let us Help You</p>
            <ul style={{ listStyleType: "none" }}>
              <li>
                <a
                  className="footer__link"
                  href="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=GDFU3JS5AL6SYHRD&ref_=footer_covid"
                >
                  COVID-19
                </a>
              </li>
              <li>
                <a
                  className="footer__link"
                  href="https://www.amazon.in/spr/returns"
                >
                  Return Center
                </a>
              </li>
              <li>
                <a
                  className="footer__link"
                  href="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=200507590&ref_=footer_gw_m_b_he"
                >
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>
        <img
          className="footer__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="footer-log"
        />
      </div>

      <div className="footer__bottom">
        <p>Conditions of use & sale</p>
        <p>
          <a
            className="footer__link"
            href="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=200534380&ref_=footer_privacy"
          >
            Privacy Notice
          </a>
        </p>
        <p> &copy; self-created-@taurusilver7--2021</p>
      </div>
    </div>
  );
};

export default Footer;
