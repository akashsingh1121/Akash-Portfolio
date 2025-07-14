import Hero from "./components/Hero";
// import Skills from "./sections/Skills";
// import Projects from "./sections/Projects";
// import Contact from "./sections/Contact";
import "./index.css"
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";

function App() {
  return (
    <div className="scroll-smooth">
      <Navbar/>
      <Hero />
      <ContactForm/>
    </div>
  );
}

export default App;
