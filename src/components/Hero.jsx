import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import ProjectCard from "../Card/ProjectCard";
import Skills from "./Skills";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  const horizontalRef = useRef(null);
  const aboutRef = useRef(null);
  const imageRef = useRef(null);
  const [marginTop, setMarginTop] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Projects data
  const projects = [
     {
      title: "Ramen Kuraku",
      image: "ramen.png",
       link: "https://ramenkuraku.com/",
      description: [
        "Ramen Kuraku is a modern restaurant website designed to showcase authentic Japanese cuisine and attract dine-in customers.",
        "I worked as a frontend developer, building responsive pages using HTML, CSS, and JavaScript.",
        "Focused on creating a clean UI, engaging food presentation, and smooth navigation across devices.",
        "Implemented layout optimizations to enhance user experience and site performance."
      ]
    },
    {
      title: "RoofPros Plus",
      image: "roofpro1 (1).jpg",
      link: "https://roofpros.plus/",
      description: [
        "RoofPros Plus is a professional roofing service website designed for showcasing projects and handling customer inquiries.",
        "I built the entire frontend and backend from scratch using HTML, CSS, JavaScript, and PHP.",
        "Implemented a custom admin panel to manage gallery images and contact submissions.",
        "Focused on responsive design, SEO-friendly code, and optimized performance across all devices."
      ]
    },
    {
      title: "ViewZen Jewellery",
      image: "viewzen.png",
       link: "http://viewzen.com/",
      description: [
        "ViewZen Jewellery is a premium online jewellery store designed to showcase and sell high-end collections with a luxurious user experience.",
        "I developed the frontend using HTML, CSS, and JavaScript, and integrated APIs for dynamic product listing and filtering.",
        "Built responsive product listing and detail pages with features like image zoom, metal/stone filters, and smooth UI transitions."
      ]
    }
  ];

  // Background colors for alternating panels
  const panelBackgrounds = ["bg-white", "bg-grey", "bg-white"];

  // Check if device is desktop
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Hero animation
  useGSAP(() => {
    const split = new SplitText(".name", { type: "chars" });
    const chars = split.chars;
    const center = Math.floor(chars.length / 2);
    chars.forEach((char, i) => {
      const fromLeft = i < center;
      gsap.from(char, {
        x: fromLeft ? -100 : 100,
        y: 100,
        opacity: 0,
        scaleY: 2,
        ease: "bounce.out(0.2, 0.1)",
        duration: 1.5,
        delay: 0.5 + Math.abs(i - center) * 0.05,
      });
    });

    

    const splitWater = new SplitText(".water-text", { type: "chars, lines" });
    gsap.from(splitWater.lines, {
      y: 50,
      duration: 1,
      opacity: 0,
      delay: 2,
      ease: "back",
      stagger: { each: 0.3 },
    });

    gsap.to(splitWater.chars, {
      x: 30,
      duration: 1,
      delay: 4,
      repeat: -1,
      yoyo: true,
      ease: "expo.inOut",
      stagger: { each: 0.05, from: "random" },
    });

    const splitthanks = new SplitText(".thanks-text", { type: "chars, lines" });
    gsap.from(splitthanks.lines, {
      y: 50,
      duration: 1,
      opacity: 0,
      delay: 3,
      ease: "back",
      stagger: { each: 0.3 },
    });

    // Fixed about section animation
    const splitabout = new SplitText(aboutRef.current, { type: "lines, chars" });
    gsap.from(splitabout.lines, {
      x: (i) => (i % 2 === 0 ? -250 : 250),
      y: 200,
      opacity: 0,
      duration: 2,
      ease: "power3.out",
      stagger: 0.2,
      yoyo: true,
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 40%",
        end: "bottom 60%",
        markers: false,
      },
    });

    gsap.to(imageRef.current, {
      y: 30,
      x: 40,
      rotation: 1,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });
   
  }, []);

  // Fixed Horizontal scroll effect
  useEffect(() => {
    if (!isDesktop) return;

    const container = horizontalRef.current;
    if (!container) return;

    const panels = container.querySelectorAll(".panel");
    if (!panels.length) return;

    // Clean up previous ScrollTrigger instances for this container
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === container) {
        trigger.kill();
      }
    });

    // Wait for next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      const totalWidth = panels.length * window.innerWidth;

      const horizontalTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${totalWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          refreshPriority: -1,
          onUpdate: self => {
            console.log("Scroll progress:", self.progress);
          }
        },
      });

      ScrollTrigger.refresh();
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [isDesktop]);

  useEffect(() => {
    const updateMargin = () => {
      setMarginTop(window.innerHeight / 4);
    };

    updateMargin();
    window.addEventListener("resize", updateMargin);
    return () => window.removeEventListener("resize", updateMargin);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-black">
      {/* Hero Section */}
      <div className="flex flex-col justify-center py-6 px-4 md:py-4">
        <div className="leading-none w-full">
          <h1 className="xl:text-[12rem] max-md:text-[2.8rem] md:text-[6rem] font-semibold text-white text-left mona-sans-font name hover:text-lime-500 transition cursor-pointer">
            AkashParihar
          </h1>
          <p className="text-white xl:text-6xl max-md:text-2xl  md:text-4xl text-left mona-sans-font water-text hover:text-lime-500 transition cursor-pointer">
            WANT TO DISCUSS <br /> A NEW PROJECT?
          </p>
          <a href="#contact">
            <button className="my-4 text-lime-500 text-lg md:text-2xl rounded-[5rem] font-bold border-2 border-lime-950 p-2 md:p-4 mona-sans-font">
              Send me an e-mail
            </button>
          </a>
        </div>

        <div className="max-sm:pt-32 max-md:pt-44 max-lg:pt-[32%] max-xl:pt-[12%] md:text-xl" style={{ marginTop }}>
          <p className="text-white mona-sans-font mt-10 m-2 font-medium thanks-text  xl:text-xl hover:text-lime-500 transition">
            THANKS FOR YOUR VISIT! <br />
            <span className="text-gray-600 text-base">
              YOU CAN CHECK OUT MY NETWORKS <br />
              TO FOLLOW MY NEW PROJECTS
            </span>
          </p>
          <div className="xl:flex justify-between w-full text-white p-2 mona-sans-font mt-6 ">
            <div className="flex gap-6">
              <a href="https://github.com/akashsingh1121" target="_blank" rel="noopener noreferrer"><p className="hover:text-lime-500 transition cursor-pointer">GITHUB</p></a>
              <a href="https://www.linkedin.com/in/akashparihar0/" target="_blank" rel="noopener noreferrer"><p className="hover:text-lime-500 transition cursor-pointer">LINKEDIN</p></a>
            </div>
            <p>DESIGNED BY CLARISSE MICHARD</p>
          </div>
        </div>
      </div>

      {/* About section */}
      <div className="xl:h-[106vh] relative flex justify-between py-8" id="about">
        <div className="absolute max-md:top-6 xl:top-56 xl:left-10 z-10 p-4">
          
          <h3
            ref={aboutRef}
            className="max-md:text-xl text-4xl xl:text-[6rem] w-full font-semibold text-white  pt-8 mona-sans-font tracking-wide leading-none cursor-pointer"
          >
            <span className="block"><span className="poppins-font">Hey!</span> I'm Akash,</span>
            <span className="block xl:ml-40 ml-4">twenty-four years old</span>
            <span className="block ml-4">front-end developer. Currently</span>
            <span className="block xl:ml-40 ml-4 ">based in India.</span>
          </h3>
        </div>
        <div className="h-full xl:w-[40%] max-md:w-[85%] xl:ml-auto max-xl:m-auto max-xl:w-[80%] max-xl:p-8">
          <img src="/akash.jpeg" ref={imageRef} alt="" />
        </div>
      </div>

      {/* SKILLS */}
     <Skills/>

      {/* Projects Section with ProjectCard Component */}
      <div ref={horizontalRef} className="overflow-hidden bg-neutral-900" id="projects">
        <div className="flex max-md:flex-col md:w-max md:h-[100vh]">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              project={project}
              index={index}
              bgColor={panelBackgrounds[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}