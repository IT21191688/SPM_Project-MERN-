import React from "react";
import { Link } from "react-router-dom";
import '../css/home.css'; // Import your custom CSS file
import { useState, useEffect } from "react";


const Home = () => {
  const [sentences, setSentences] = useState([
    "Your Gateway to the World of Coding",
    "Unlock the Power of Code",
    "Learn, Code, Collaborate",
  ]);

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true); // To toggle the cursor

  const fullText = "Welcome to EduCode"; // The complete text to be typed
  const typingSpeed = 100; // Typing speed (milliseconds per character)
  const cursorBlinkSpeed = 50; // Cursor blink speed (milliseconds)

  const changeSentence = () => {
    const newIndex =
      currentSentenceIndex === sentences.length - 1 ? 0 : currentSentenceIndex + 1;
    setCurrentSentenceIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(changeSentence, 5000); // Change sentence every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentSentenceIndex]);

  useEffect(() => {
    let currentIndex = 0;
    let isRepeating = false;

    const startTyping = () => {
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          isRepeating = true;
          setTimeout(() => {
            currentIndex = 0;
            setTypedText("");
            isRepeating = false;
          },); // Wait for 2 seconds and then reset
        }
      }, typingSpeed);

      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev); // Toggle the cursor state
      }, cursorBlinkSpeed);

      return () => {
        clearInterval(typingInterval);
        clearInterval(cursorInterval);
      };
    };

    startTyping(); // Start typing when the component mounts

    const repeatTyping = () => {
      if (!isRepeating) {
        startTyping();
      }
    };

    const repeatInterval = setInterval(repeatTyping, 3000);

    return () => {
      clearInterval(repeatInterval);
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundColor: "#27005D",
          height: "500px", // Fixed height
          overflow: "hidden",
          position: "inherit", // Add this for absolute positioning
        }}
      >
        <div
          className="container mx-auto text-center text-white py-20"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Center the content
          }}
        >
          <h1 className="text-4xl font-bold mb-4">
            {typedText}
            <span className={showCursor ? "cursor" : ""}></span>
          </h1>
          <br />
          <p className="text-lg mb-4">{sentences[currentSentenceIndex]}</p>
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
