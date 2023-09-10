import React from "react";
import { Link } from "react-router-dom";
import '../css/home.css'; // Import your custom CSS file

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{ backgroundColor: "#27005D" }}>
        <div className="container mx-auto text-center text-white py-20">
          <h1 className="text-4xl font-bold mb-4">Welcome to .CODES</h1>
          <p className="text-lg mb-8">
            Your Gateway to the World of Coding
          </p>
          <Link
            to="/editor"
            className="btn-primary"
            style={{ backgroundColor: "#9400FF" }}
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">About Us</h2>
          <p className="text-lg mb-8">
            We are a dedicated platform for code enthusiasts, offering a
            comprehensive set of coding resources and tools.
          </p>
          <Link
            to="/about"
            className="text-primary hover:underline"
            style={{ color: "#27005D" }}
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-16" style={{ backgroundColor: "#AED2FF" }}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="feature bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Interactive Learning</h3>
              <p className="text-gray-700">
                Learn to code through hands-on, interactive tutorials and
                projects.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="feature bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Code Editor</h3>
              <p className="text-gray-700">
                Practice coding in a feature-rich code editor that supports
                multiple languages.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="feature bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-700">
                Connect with a thriving community of coders to collaborate and
                share knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
