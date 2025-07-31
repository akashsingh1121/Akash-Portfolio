import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useState } from "react";
import { CgClose,CgMenu  } from "react-icons/cg";
import HoverButton from "../Card/HoverButton";


const Navbar = () => {
 const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-between items-center w-full text-white h-[8vh] border-b border-white mona-sans-font p-6 relative max-md:sticky top-0 z-20">
      {/* Logo */}
      <p className="mona-sans-font logo hover:text-lime-500 transition-colors duration-300 cursor-pointer">
        akashsingh.
      </p>

      {/* Desktop Menu */}
      <div className="hidden xl:flex justify-between items-center w-[25%]">
       
        <a href="#about">
          {/* <h3 className="hover:text-lime-500 transition-colors duration-300 cursor-pointer">
            ABOUT
          </h3> */}
          <HoverButton label={"ABOUT"}/>
        </a>
         <a href="#skills">
          {/* <h3 className="hover:text-lime-500 transition-colors duration-300 cursor-pointer">
            PROJECTS
          </h3> */}
          <HoverButton label={"SKILLS"}/>
        </a> 
        <a href="#projects">
          {/* <h3 className="hover:text-lime-500 transition-colors duration-300 cursor-pointer">
            PROJECTS
          </h3> */}
          <HoverButton label={"PROJECTS"}/>
        </a>
        <a href="#contact">
          {/* <h3 className="hover:text-lime-500 transition-colors duration-300 cursor-pointer">
            CONTACT
          </h3> */}
          <HoverButton label={"CONTACT"}/>
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="xl:hidden hover:text-lime-500 transition-colors duration-300 z-50"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <CgClose size={24} /> : <CgMenu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40 xl:hidden" onClick={toggleMenu} />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-[8vh] left-0 w-full bg-black border-b border-white transform transition-transform duration-300 ease-in-out z-50 xl:hidden overflow-hidden ${
        isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className={`flex flex-col ${!isMenuOpen ? 'hidden': 'block'}`}>
          
          
          <a 
            href="#about" 
            className="hover:text-lime-500 transition-colors duration-300 text-lg py-4 px-6 border-b border-white block"
            onClick={toggleMenu}
          >
            ABOUT
          </a>
          <a 
            href="#skills" 
            className="hover:text-lime-500 transition-colors duration-300 text-lg py-4 px-6 border-b border-white block"
            onClick={toggleMenu}
          >
            SKILLS
          </a>
          <a 
            href="#projects" 
            className="hover:text-lime-500 transition-colors duration-300 text-lg py-4 px-6 border-b border-white block"
            onClick={toggleMenu}
          >
            PROJECTS
          </a>
          <a 
            href="#contact" 
            className="hover:text-lime-500 transition-colors duration-300 text-lg py-4 px-6 block"
            onClick={toggleMenu}
          >
            CONTACT
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar