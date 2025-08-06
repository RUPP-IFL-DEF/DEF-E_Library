import React from 'react';
import Header from '../../components/section/Header';
import Footer from '../../components/section/Footer';
import './About.css';

const About = () => {
    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="about__hero">
                <img
                    src="/front.jpg"
                    alt="Institute of Foreign Languages"
                    className="about__hero-image"
                />
                <div className="about__hero-overlay">
                    <h1 className="about__hero-title">Institute of Foreign Languages</h1>
                    <p className="about__hero-subtitle">Shaping Global Minds through French Language and Culture</p>
                </div>
            </section>

            {/* Main Content */}
            <main className="about__content">

                {/* About Department */}
                <section className="about__section">
                    <div className="about__block">
                        <h2 className="about__heading">About the Department</h2>
                        <p className="about__paragraph">
                            The Department of French at the Institute of Foreign Languages (IFL), Royal University of Phnom Penh (RUPP), offers a comprehensive program designed to develop proficiency in the French language while fostering an in-depth understanding of French culture. Our courses aim to prepare students for global career opportunities by equipping them with both linguistic and cultural competence.
                        </p>
                    </div>
                </section>

                {/* Academic Programs */}
                <section className="about__section">
                    <h2 className="about__heading">Our Academic Programs</h2>

                    <div className="about__block">
                        <h3 className="about__subheading">Bachelor of Arts in French</h3>
                        <p className="about__paragraph">
                            A four-year program combining theoretical knowledge and practical application of the French language. In year three, students choose specializations: Teaching, Translation, Linguistics, Journalism, or Tourism.
                        </p>
                    </div>

                    <div className="about__block">
                        <h3 className="about__subheading">Master of Translation Science</h3>
                        <p className="about__paragraph">
                            This graduate program offers advanced training in translation theory and practice for those seeking careers as professional translators.
                        </p>
                    </div>

                    <div className="about__block">
                        <a
                            href="https://royaluniversityphnompenh.blogspot.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="about__link"
                        >
                            Learn more at royaluniversityphnompenh.blogspot.com
                        </a>
                    </div>
                </section>

                {/* Resources */}
                <section className="about__section">
                    <div className="about__block">
                        <h2 className="about__heading">Resources & Facilities</h2>
                        <p className="about__paragraph">
                            The French Library at IFL offers a wide range of educational materials including textbooks, magazines, audio-visual content, and digital resources. It's an essential hub for learning and research.
                        </p>
                    </div>
                </section>

                {/* Affiliations */}
                <section className="about__section">
                    <h2 className="about__heading">Our Affiliations</h2>
                    <div className="about__affiliations">
                        <img
                            src="ASEAN.png"
                            alt="ASEAN University Network"
                            className="about__affiliation-logo"
                        />
                        <img
                            src="fron.png"
                            alt="Agence Universitaire de la Francophonie"
                            className="about__affiliation-logo"
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default About;