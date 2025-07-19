import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ImLocation2 } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  const horizontalRef = useRef(null);
  const aboutRef = useRef(null);
  const imageRef = useRef(null);
  const project1 = useRef(null);
  const project2 = useRef(null);
  const project3 = useRef(null);
  const [marginTop, setMarginTop] = useState(0);
const [isDesktop, setIsDesktop] = useState(false);

// Check if device is desktop
  useEffect(() => {
    console.log(isDesktop)
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024) // lg breakpoint (1024px)
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
      x: (i) => (i % 2 === 0 ? -250 : 250), // even lines from left, odd from right
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


    gsap.to(project1.current, {
      y: 40,
      x: -40,
      rotation: 1,
      duration: 3,
      delay: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });


    gsap.to(project2.current, {
      y: 40,
      x: 40,
      rotation: 1,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });

    gsap.to(project3.current, {
      y: 40,
      x: -40,
      rotation: 1,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });

    const splitproject1 = new SplitText(".pro1-details", { type: "chars, lines" });
    gsap.from(splitproject1.lines, {
      y: 50,
      duration: 1,
      opacity: 0,
      ease: "back",
      stagger: { each: 0.2 },
      scrollTrigger: {
        trigger: ".pro1-details",
        start: "top 70%",
        end: "bottom 30%",
        markers: false,
      },
    });


  }, []);

  // Horizontal scroll
  useEffect(() => {
     if (!isDesktop ) return

    const container = horizontalRef.current;
    if (!container) return;

    const panels = container.querySelectorAll(".panel");
    if (!panels.length) return;

    // Kill only horizontal scroll triggers, not all triggers
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === container) {
        trigger.kill();
      }
    });

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => "+=" + container.offsetWidth,
        invalidateOnRefresh: true,
      },
    });
  }, []);

  useEffect(() => {
    const updateMargin = () => {
      setMarginTop(window.innerHeight / 4); // 50% of window height
    };

    updateMargin();
    window.addEventListener("resize", updateMargin);

    return () => window.removeEventListener("resize", updateMargin);
  }, []);


  return (
    <div className="w-full overflow-x-hidden bg-black">
      {/* ✅ Hero Section */}
      <div className="flex flex-col justify-center py-6 px-4 md:py-4">
        <div className="leading-none w-full">
          <h1 className="xl:text-[12rem] max-md:text-[2.8rem] md:text-[6rem] font-semibold text-white text-left mona-sans-font name hover:text-lime-500 transition">
            AkashParihar
          </h1>
          <p className="text-white xl:text-6xl max-md:text-2xl  md:text-4xl text-left mona-sans-font water-text hover:text-lime-500 transition">
            WANT TO DISCUSS <br /> A NEW PROJECT?
          </p>
          <a href="#contact">
            <button className="my-4 text-lime-500 text-lg md:text-2xl rounded-[5rem] font-bold border-2 border-lime-950 p-2 md:p-4 mona-sans-font">
              Send me an e-mail
            </button></a>
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
              <a href="https://github.com/akashsingh1121"><p className="hover:text-lime-500 transition cursor-pointer">GITHUB</p></a>
              <a href="https://www.linkedin.com/in/akashparihar0/"><p className="hover:text-lime-500 transition cursor-pointer">LINKEDIN</p></a>
            </div>
            <p>DESIGNED BY CLARISSE MICHARD</p>
          </div>
        </div>
      </div>

      {/* ✅ About section with proper spacing */}
      <div className="xl:h-[106vh] relative flex justify-between py-8" id="about">
        <div className="absolute max-md:top-6 xl:top-56 xl:left-10 z-10 p-4">
          <h2
            ref={aboutRef}
            className="max-md:text-xl text-4xl xl:text-[6rem] w-full font-semibold text-white leading-none pt-8 mona-sans-font poppins-font
poppins-font"
          >
            <span className="block"><span className="">Hey!</span> I'm Akash,</span>
            <span className="block xl:ml-40 ml-4">twenty-four years old</span>
            <span className="block ml-4">front-end developer. Currently</span>
            <span className="block xl:ml-40 ml-4 ">based in India.</span>
          </h2>
        </div>
        <div className="h-full xl:w-[40%] max-md:w-[85%] xl:ml-auto max-xl:m-auto max-xl:w-[80%] max-xl:p-8">
          <img src="/akash.jpeg" ref={imageRef} alt="" />
        </div>
      </div>

      {/* ✅ Horizontal Scroll Section */}
      <div ref={horizontalRef} className="overflow-hidden bg-neutral-900" id="projects">
        <div className="flex max-md:flex-col md:w-max md:h-[100vh]">


          <div className="w-[100vw] panel flex flex-col-reverse xl:flex-row items-center text-white text-4xl bg-white md:p-8">
            <div className="max-md:h-[48%] max-md:w-[70%] max-xl:h-[55%] max-xl:w-[60%] xl:w-[30%] border-2 border-gray-500 xl:mx-28 max-xl:m-auto p-4 " ref={project1}>
              <img src="roofpro1 (1).jpg" alt="" className="h-[100%] w-[100%] xl:w-[55vh] xl:h-[80vh] m-auto" />
            </div>
            <div className="w-auto h-auto text-black xl:w-[50%] pro1-details max-xl:w-[80%] max-md:w-[90%] max-md:my-4">
              <h3 className="font-bold max-md:text-[1.8rem] mona-sans-font md:m-4 ">RoofPros Plus</h3>
              <h3 className="text-gray-500 max-md:text-[1.5rem] font-bold md:m-4 mona-sans-font underline">Description:</h3>
              <p className="mona-sans-font md:ml-4 xl:text-2xl max-md:text-[18px] max-lg:text-xl max-xl:text-3xl max-md:leading-[25px] mx-auto">
                RoofPros Plus is a professional roofing service website designed for showcasing projects and handling customer inquiries. <br />
                I built the entire frontend and backend from scratch using HTML, CSS, JavaScript, and PHP. <br />
                Implemented a custom admin panel to manage gallery images and contact submissions. <br />
                Focused on responsive design, SEO-friendly code, and optimized performance across all devices. <br />
              </p>
            </div>
          </div>


          <div className="w-[100vw] panel flex flex-col-reverse xl:flex-row items-center text-white text-4xl bg-grey md:p-8">
            <div className="max-md:h-[48%] max-md:w-[70%] max-xl:h-[55%] max-xl:w-[60%] xl:w-[30%] border-2 border-gray-500 xl:mx-28 max-xl:m-auto p-4" ref={project2}>
              <img src="ramen.png" alt="" className="h-[100%] w-[100%] xl:w-[55vh] xl:h-[80vh] m-auto" />
            </div>
            <div className="w-auto h-auto text-white xl:w-[50%] pro1-details max-xl:w-[80%] max-md:w-[90%] max-md:my-4">
              <h3 className="font-bold max-md:text-[1.8rem] mona-sans-font md:m-4 ">Ramen Kuraku</h3>
              <h3 className="text-gray-500 max-md:text-[1.5rem] font-bold md:m-4 mona-sans-font underline">Description:</h3>
              <p className="mona-sans-font md:ml-4 xl:text-2xl max-md:text-[18px] max-lg:text-xl max-xl:text-3xl max-md:leading-[25px] mx-auto">
                Ramen Kuraku is a modern restaurant website designed to showcase authentic Japanese cuisine and attract dine-in customers. <br />
                I worked as a frontend developer, building responsive pages using HTML, CSS, and JavaScript. <br />
                Focused on creating a clean UI, engaging food presentation, and smooth navigation across devices. <br />
                Implemented layout optimizations to enhance user experience and site performance.
              </p>
            </div>
          </div>


          <div className="w-[100vw] panel flex flex-col-reverse xl:flex-row items-center text-white text-4xl bg-white md:p-8">
            <div className="max-md:h-[48%] max-md:w-[70%] max-xl:h-[55%] max-xl:w-[60%] xl:w-[30%] border-2 border-gray-500 xl:mx-28 max-xl:m-auto p-4" ref={project3}>
              <img src="viewzen.png" alt="" className="h-[100%] w-[100%] xl:w-[55vh] xl:h-[80vh] m-auto" />
            </div>
            <div className="w-auto h-auto text-black xl:w-[50%] pro1-details max-xl:w-[80%] max-md:w-[90%] max-md:my-4">
              <h3 className="font-bold max-md:text-[1.8rem] mona-sans-font md:m-4 ">ViewZen Jewellery</h3>
              <h3 className="text-gray-500 max-md:text-[1.5rem] font-bold md:m-4 mona-sans-font underline">Description:</h3>
              <p className="mona-sans-font md:ml-4 xl:text-2xl max-md:text-[18px] max-lg:text-xl max-xl:text-3xl max-md:leading-[25px] mx-auto">
                ViewZen Jewellery is a premium online jewellery store designed to showcase and sell high-end collections with a luxurious user experience. <br />
                I developed the frontend using HTML, CSS, and JavaScript, and integrated APIs for dynamic product listing and filtering. <br />
                Built responsive product listing and detail pages with features like image zoom, metal/stone filters, and smooth UI transitions. <br />

              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

