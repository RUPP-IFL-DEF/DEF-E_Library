import React from 'react';
import '../../theme/footer.css'; // Ensure you have the correct path to your CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">

                {/* Brand Section */}
                <div className="footer__brand">
                    <h2>IFL - Department of French</h2>
                    <p>Shaping Global Minds through Language & Culture</p>
                </div>

                {/* Navigation Links */}
                <div className="footer__links">
                    <a href="/" className="footer__link">Home</a>
                    <a href="/about" className="footer__link">About</a>
                    <a
                        href="https://royaluniversityphnompenh.blogspot.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer__link"
                    >
                        RUPP Blog
                    </a>
                </div>

                {/* Contact Info + Map */}
                <div className="footer__contact">
                    <p>📍 Russian Blvd, Phnom Penh, Cambodia</p>
                    <p>✉️ info@ifl.edu.kh</p>
                    <p>📞 +855 (0)23 123 456</p>
                    <div className="footer__map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2081.4997913104316!2d104.89096457896025!3d11.568417870330768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109519fe4077d69%3A0x20138e822e434660!2sRoyal%20University%20of%20Phnom%20Penh!5e0!3m2!1sen!2skh!4v1751864709362!5m2!1sen!2skh"
                            width="100%"
                            height="220"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Bottom Footer Text */}
            <div className="footer__bottom">
                <p>&copy; {new Date().getFullYear()} IFL Department of French. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
