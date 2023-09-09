import React from "react";
import '../css/about.css'; // Import your custom CSS file

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container mx-auto text-center text-white py-20">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg mb-8">
            Discover Our Story and Mission
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="about-content py-16">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
              <p className="text-lg mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vivamus consectetur lacus in risus congue, in facilisis libero
                auctor. Sed eget tellus ut purus hendrerit cursus ac eu erat.
                Integer scelerisque mi ac turpis blandit, non tristique tellus
                volutpat.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
              <p className="text-lg mb-8">
                Our mission is to provide a platform for individuals to learn,
                practice, and master coding skills. We believe in empowering
                aspiring coders and fostering a vibrant coding community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
