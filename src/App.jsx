import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
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

  const [loginError, setLoginError] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy credentials
    if (email === "test@example.com" && password === "123456") {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("role", "admin");
      setLoggedIn(true);
      setShowLogin(false);
      setLoginError("");
      window.location.href = "/dashboard";
    } else {
      setLoginError("Invalid email or password!");
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
  return (
    <div className="font-sans text-paragraph flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between py-9 px-8">
        <h1 className="text-3xl  text-shadow-lg font-semibold text-title">
          {" "}
          <span className="text-primary">Awww</span>some.
        </h1>
        <nav className="hidden md:flex items-center gap-8 text-textSecondary font-medium">
          <a href="#" className="text-primary text-shadow-lg font-semibold">
            Home
          </a>
          <a className="text-shadow-lg" href="#">
            About us
          </a>
          <a className="text-shadow-lg" href="#">
            Services
          </a>
          <a className="text-shadow-lg" href="#">
            News
          </a>
          <a
            href="#"
            className="bg-primary hover:bg-primaryHover text-white px-6 py-2 rounded-sm font-semibold"
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
      </header>

      {/* Hero */}
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            {loginError && (
              <div className="mb-4 flex items-center gap-2 bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9zm-9 4h.01"></path></svg>
                <span>{loginError}</span>
                <button onClick={() => setLoginError("")} className="ml-auto text-red-500 hover:text-red-700">&times;</button>
              </div>
            )}
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
                <div className="flex gap-2">
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

      <section className="grid md:grid-cols-5 items-start gap-32 px-20 py-9 ">
        <div className="col-span-2">
          <h2 className="text-h1 mb-4 text-title leading-snug text-shadow-lg">
            We do the work you stay focused on your customers.
          </h2>
          <p className="text-textSecondary mb-6 leading-8">
            Awwwsome. is a digital agency passionate about storytelling, visual
            design, and technology. We collaborate with companies small to large
            around the world to help them engage their audiences and build brand
            awareness.
          </p>
          <p className="text-textSecondary my-6 leading-8">
            Our team can create amazing web experiences, beginning with deep
            market research, practical strategies, and professional execution.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="bg-primary text-white px-8 py-3 rounded-sm  hover:bg-primaryHover font-semibold"
            >
              Explore Projects
            </a>
            <a
              href="#"
              className="bg-primaryLight text-primary px-8 py-3 rounded-sm font-semibold"
            >
              About Us
            </a>
          </div>
        </div>
        <div className="flex justify-center col-span-3">
          <img
            src="/src/assets/hero-image.svg"
            alt="Illustration"
            className="w-[550px] h-auto"
          />
        </div>
      </section>

      {/* What We Do */}
      <section className="px-20 py-9 bg-white text-center">
        <h3 className="text-h2 mb-12 text-title">What we do</h3>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="flex items-center flex-col gap-6">
            <div className="p-6 rounded-xl card bg-accentOrange">
              <img
                src="/src/assets/icons/app.svg"
                className="w-[50px] h-auto "
              />
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-lg  text-title">
                Web Application
              </h4>
              <p className="text-textSecondary text-sm">
                Platform independent business solutions for maximum availability
              </p>
            </div>
          </div>
          <div className="flex items-center flex-col gap-6">
            <div className="p-6 rounded-xl card bg-accentBlue">
              <img
                src="/src/assets/icons/seo.svg"
                className="w-[50px] h-auto "
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
                src="/src/assets/icons/game.svg"
                className="w-[50px] h-auto "
              />
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-lg  text-title">
                Game Development{" "}
              </h4>
              <p className="text-textSecondary text-sm">
                Interactive games with perfect graphics{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center flex-col gap-6">
            <div className="p-6 rounded-xl card bg-accentPurple">
              <img
                src="/src/assets/icons/cloud.svg"
                className="w-[50px] h-auto "
              />
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-lg  text-title">
                Iot/ AI/ RObotic{" "}
              </h4>
              <p className="text-textSecondary text-sm">
                Advanced autonomous technologies to make life simple{" "}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="px-20 py-16 bg-gray-50">
        <div className="flex flex-col gap-10">
          <div>
            <h3 className="text-h2 mb-4 text-center text-title">Latest News</h3>
            <p className="text-textSecondary mb-6 text-center">
              Insights, thoughts, industry trends, marketing tips, eDesign news,
              nerdy stuff, it's all here.{" "}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                date: "November 10, 2021",
                title: "LaserNetUs Website Launch",
                desc: "LaserNetUs has a new brand identity and website designed by eDesign Interactive. The homepage is dynamic and eye-catching. The website aims to highlight the innovative nature of high-intensity laser technology",
                image: "/src/assets/blog/tshirt.png",
              },
              {
                date: "February 21, 2021",
                title:
                  "How we helped an Orthopedic Practice Increase their traffic",
                desc: "We are honored and excited to be working with The Orthopedic Institute of New Jersey, the largest practice in northwest New Jersey.",
                image: "/src/assets/blog/website.png",
              },
              {
                date: "July 03, 2021",
                title: "The Increasing importance of Web Accessibilitys",
                desc: "Is your website accessible to visitors with impairments?",
                image: "/src/assets/blog/accessibility.png",
              },
            ].map((post, idx) => (
              <div key={idx} className=" rounded-md  overflow-hidden">
                <img
                  src={post.image}
                  alt="images"
                  className={
                    idx === 2
                      ? "w-full h-[300px] object-cover object-center"
                      : "w-full h-[300px] object-cover object-left-top"
                  }
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
        <div className="text-center mt-16">
          <a
            href="#"
            className="bg-primary text-white px-8 py-3  rounded-sm font-semibold  hover:bg-primaryHover"
          >
            View All
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-footerBg text-footerText px-20 py-20">
        <div className="grid md:grid-cols-6 justify-between w-full">
          <div className="col-span-3">
            <h4 className="text-white font-bold mb-4 text-h1">Awwwsome.</h4>
            <p className="text-sm w-[400px]">
              Our team can create amazing web experiences, beginning with deep
              market research, practical strategies, and professional execution.
            </p>
          </div>
          <div className="col-span-3 flex gap-36  justify-start">
            <div className="">
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
      <div className="text-center text-sm  bg-lastFooter py-4">
        © 2022 Awwwsome Designers
      </div>
    </div>
  );
};

export default App;
