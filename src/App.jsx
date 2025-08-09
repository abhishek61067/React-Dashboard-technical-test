import React, { useState, useEffect } from "react";
import heroImage from "./assets/hero-image.svg";
import appIcon from "./assets/icons/app.svg";
import seoIcon from "./assets/icons/seo.svg";
import gameIcon from "./assets/icons/game.svg";
import cloudIcon from "./assets/icons/cloud.svg";
import tshirtImg from "./assets/blog/tshirt.png";
import websiteImg from "./assets/blog/website.png";
import accessibilityImg from "./assets/blog/accessibility.png";
import { FiMenu, FiX } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // Check login status on page load and handle redirect state
  useEffect(() => {
    const status = localStorage.getItem("loggedIn");
    if (status === "true") {
      setLoggedIn(true);
    }
    // If redirected with state.loggedIn === false, open login modal
    if (location && location.state && location.state.loggedIn === false) {
      setShowLogin(true);
    }
  }, [location]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy credentials
    if (email === "test@example.com" && password === "123456") {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("role", "admin");
      setLoggedIn(true);
      setShowLogin(false);
      window.location.href = "/dashboard";
    } else {
      alert("Invalid email or password!");
    }
  };

  const handleLoginAsUser = () => {
    setEmail("user@example.com");
    setPassword("userpass");
    // Simulate login as user
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", "user");
    setLoggedIn(true);
    setShowLogin(false);
    window.location.href = "/dashboard";
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
  };
  // Scroll to section handler
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileNavOpen(false);
    }
  };

  // Custom scroll handler for anchor links to offset fixed navbar
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100; // Offset for fixed navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setMobileNavOpen(false);
    }
  };

  return (
    <div className="font-sans text-paragraph flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white  flex flex-col md:flex-row items-center justify-between py-6 px-4 md:py-9 md:px-8">
        <div className="flex w-full md:w-auto items-center justify-between">
          <h1 className="text-2xl md:text-3xl text-shadow-lg font-semibold text-title">
            <span className="text-primary">Awww</span>some.
          </h1>
          {/* Hamburger icon for mobile */}
          <button
            className="md:hidden text-2xl text-primary focus:outline-none"
            aria-label="Open navigation menu"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            {mobileNavOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-textSecondary font-medium mt-4 md:mt-0">
          <a
            href="#hero-section"
            className="text-primary text-shadow-lg font-semibold"
            onClick={(e) => handleNavClick(e, "hero-section")}
          >
            Home
          </a>
          <a
            className="text-shadow-lg font-normal text-paragraph"
            href="#hero-section"
            onClick={(e) => handleNavClick(e, "hero-section")}
          >
            About us
          </a>
          <a
            className="text-shadow-lg font-normal text-paragraph"
            href="#what-we-do-section"
            onClick={(e) => handleNavClick(e, "what-we-do-section")}
          >
            Services
          </a>
          <a
            className="text-shadow-lg font-normal text-paragraph"
            href="#latest-news-section"
            onClick={(e) => handleNavClick(e, "latest-news-section")}
          >
            News
          </a>
          <a
            href="#footer-section"
            className="bg-primary hover:bg-primaryHover text-white px-6 py-2 rounded-sm font-semibold"
            onClick={(e) => handleNavClick(e, "footer-section")}
          >
            Contact
          </a>
          {/* Login / Logout Button */}
          {!loggedIn ? (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-primaryLight text-primary px-6 py-2 rounded-sm font-semibold"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="border border-primary text-title px-6 py-2 rounded-sm font-semibold"
            >
              Logout
            </button>
          )}
        </nav>
        {/* Mobile nav dropdown */}
        {mobileNavOpen && (
          <nav className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center gap-4 py-6 z-40 md:hidden animate-fade-in">
            <a
              href="#hero-section"
              className="text-primary text-shadow-lg font-semibold"
              onClick={(e) => handleNavClick(e, "hero-section")}
            >
              Home
            </a>
            <a
              className="text-shadow-lg"
              href="#hero-section"
              onClick={(e) => handleNavClick(e, "hero-section")}
            >
              About us
            </a>
            <a
              className="text-shadow-lg"
              href="#what-we-do-section"
              onClick={(e) => handleNavClick(e, "what-we-do-section")}
            >
              Services
            </a>
            <a
              className="text-shadow-lg"
              href="#latest-news-section"
              onClick={(e) => handleNavClick(e, "latest-news-section")}
            >
              News
            </a>
            <a
              href="#footer-section"
              className="bg-primary hover:bg-primaryHover text-white px-6 py-2 rounded-sm font-semibold"
              onClick={(e) => handleNavClick(e, "footer-section")}
            >
              Contact
            </a>
            {/* Login / Logout Button */}
            {!loggedIn ? (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setMobileNavOpen(false);
                }}
                className="bg-primaryLight text-primary px-6 py-2 rounded-sm font-semibold"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileNavOpen(false);
                }}
                className="border border-primary text-title px-6 py-2 rounded-sm font-semibold"
              >
                Logout
              </button>
            )}
          </nav>
        )}
      </header>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg w-[95vw] max-w-xs sm:max-w-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded"
                  >
                    Login as Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="border border-primary px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleLoginAsUser}
                  className="bg-primaryLight text-primary px-4 py-2 rounded font-semibold mt-2"
                >
                  Login as User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="pt-[110px] md:pt-[120px] w-full">
        {" "}
        {/* Add padding to offset fixed navbar */}
        <section
          id="hero-section"
          className="grid grid-cols-1 md:grid-cols-5 items-start gap-8 md:gap-32 px-4 sm:px-8 md:px-20 py-6 md:py-9 w-full"
        >
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl sm:text-3xl md:text-h1 mb-4 text-title leading-snug text-shadow-lg">
              We do the work you stay focused on your customers.
            </h2>
            <p className="text-textSecondary mb-6 leading-8">
              Awwwsome. is a digital agency passionate about storytelling,
              visual design, and technology. We collaborate with companies small
              to large around the world to help them engage their audiences and
              build brand awareness.
            </p>
            <p className="text-textSecondary my-6 leading-8">
              Our team can create amazing web experiences, beginning with deep
              market research, practical strategies, and professional execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="bg-primary text-white px-6 sm:px-8 py-3 rounded-sm  hover:bg-primaryHover font-semibold text-center"
              >
                Explore Projects
              </a>
              <a
                href="#"
                className="bg-primaryLight text-primary px-6 sm:px-8 py-3 rounded-sm font-semibold text-center"
              >
                About Us
              </a>
            </div>
          </div>
          <div className="flex justify-center col-span-1 md:col-span-3 mt-8 md:mt-0">
            <img
              src={heroImage}
              alt="Illustration"
              className="w-full max-w-xs sm:max-w-md md:w-[550px] h-auto"
            />
          </div>
        </section>
        {/* What We Do */}
        <section
          id="what-we-do-section"
          className="px-4 sm:px-8 md:px-20 py-6 md:py-9 bg-white text-center w-full"
        >
          <h3 className="text-xl sm:text-2xl md:text-h2 mb-8 md:mb-12 text-title">
            What we do
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="flex items-center flex-col gap-6">
              <div className="p-6 rounded-xl card bg-accentOrange">
                <img
                  src={appIcon}
                  className="w-[50px] h-auto "
                  alt="App Icon"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-lg  text-title">
                  Web Application
                </h4>
                <p className="text-textSecondary text-sm">
                  Platform independent business solutions for maximum
                  availability
                </p>
              </div>
            </div>
            <div className="flex items-center flex-col gap-6">
              <div className="p-6 rounded-xl card bg-accentBlue">
                <img
                  src={seoIcon}
                  className="w-[50px] h-auto "
                  alt="SEO Icon"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-lg  text-title">SEO </h4>
                <p className="text-textSecondary text-sm">
                  Let the world find you on top of others
                </p>
              </div>
            </div>
            <div className="flex items-center flex-col gap-6">
              <div className="p-6 rounded-xl card bg-accentYellow">
                <img
                  src={gameIcon}
                  className="w-[50px] h-auto "
                  alt="Game Icon"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-lg  text-title">
                  Game Development
                </h4>
                <p className="text-textSecondary text-sm">
                  Interactive games with perfect graphics
                </p>
              </div>
            </div>
            <div className="flex items-center flex-col gap-6">
              <div className="p-6 rounded-xl card bg-accentPurple">
                <img
                  src={cloudIcon}
                  className="w-[50px] h-auto "
                  alt="Cloud Icon"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-lg  text-title">
                  Iot/ AI/ Robotic
                </h4>
                <p className="text-textSecondary text-sm">
                  Advanced autonomous technologies to make life simple
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Blog */}
        <section
          id="latest-news-section"
          className="px-4 sm:px-8 md:px-20 py-10 md:py-16 bg-gray-50 w-full"
        >
          <div className="flex flex-col gap-8 md:gap-10">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-h2 mb-4 text-center text-title">
                Latest News
              </h3>
              <p className="text-textSecondary mb-6 text-center">
                Insights, thoughts, industry trends, marketing tips, eDesign
                news, nerdy stuff, it's all here.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  date: "November 10, 2021",
                  title: "LaserNetUs Website Launch",
                  desc: "LaserNetUs has a new brand identity and website designed by eDesign Interactive. The homepage is dynamic and eye-catching. The website aims to highlight the innovative nature of high-intensity laser technology",
                  image: tshirtImg,
                },
                {
                  date: "February 21, 2021",
                  title:
                    "How we helped an Orthopedic Practice Increase their traffic",
                  desc: "We are honored and excited to be working with The Orthopedic Institute of New Jersey, the largest practice in northwest New Jersey.",
                  image: websiteImg,
                },
                {
                  date: "July 03, 2021",
                  title: "The Increasing importance of Web Accessibilitys",
                  desc: "Is your website accessible to visitors with impairments?",
                  image: accessibilityImg,
                },
              ].map((post, idx) => (
                <div key={idx} className="rounded-md overflow-hidden ">
                  <img
                    src={post.image}
                    alt="images"
                    className="w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover object-center"
                  />
                  <div className="py-4">
                    <p className="text-sm text-textSecondary mb-2 font-medium">
                      {post.date}
                    </p>
                    <h4 className="font-semibold mb-2 text-title text-md">
                      {post.title}
                    </h4>
                    <p className="text-textSecondary text-sm">{post.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-10 md:mt-16">
            <a
              href="#"
              className="bg-primary text-white px-6 sm:px-8 py-3  rounded-sm font-semibold  hover:bg-primaryHover"
            >
              View All
            </a>
          </div>
        </section>
        {/* Footer */}
        <footer
          id="footer-section"
          className="bg-footerBg text-footerText px-4 sm:px-8 md:px-20 py-10 md:py-20 w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-0 justify-between w-full">
            <div className="col-span-1 md:col-span-3 mb-8 md:mb-0">
              <h4 className="text-white font-bold mb-4 text-xl md:text-h1">
                Awwwsome.
              </h4>
              <p className="text-sm max-w-xs md:w-[400px]">
                Our team can create amazing web experiences, beginning with deep
                market research, practical strategies, and professional
                execution.
              </p>
            </div>
            {/* Responsive links: 2 columns per row on mobile/tablet, 3 columns on desktop */}
            <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:flex md:flex-row gap-8 md:gap-36 justify-start">
              <div>
                <h5 className="text-white font-semibold mb-4">About Us</h5>
                <ul className="space-y-2 text-sm">
                  <li>Works</li>
                  <li>Strategy</li>
                  <li>Releases</li>
                  <li>Press</li>
                  <li>Mission</li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-semibold mb-4">Customers</h5>
                <ul className="space-y-2 text-sm">
                  <li>Trending</li>
                  <li>Popular</li>
                  <li>Customers</li>
                  <li>Features</li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-semibold mb-4">Support</h5>
                <ul className="space-y-2 text-sm">
                  <li>Developers</li>
                  <li>Support</li>
                  <li>Customer Service</li>
                  <li>Guide</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        <div className="text-center text-sm  bg-lastFooter py-4 w-full">
          © 2022 Awwwsome Designers
        </div>
      </div>
    </div>
  );
};

export default App;
