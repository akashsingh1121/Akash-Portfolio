import React, { useRef, useEffect,useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdOutlineArrowOutward } from "react-icons/md";
import { MdOutlineArrowForward } from "react-icons/md";

const ProjectCard = ({ project, index, bgColor = "bg-white" }) => {
  const imageRef = useRef(null);
  const detailsRef = useRef(null);
  const [hovered, setHovered] = useState(false);


  useEffect(() => {
    // Image floating animation
    gsap.to(imageRef.current, {
      y: 40,
      x: index % 2 === 0 ? -40 : 40, // Alternate direction based on index
      rotation: 1,
      duration: 3,
      delay: index * 0.5, // Stagger the start time
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Text animation with ScrollTrigger
    const splitText = new SplitText(detailsRef.current, { type: "chars, lines" });
    gsap.from(splitText.lines, {
      y: 50,
      duration: 1,
      opacity: 0,
      ease: "back",
      stagger: { each: 0.2 },
      scrollTrigger: {
        trigger: detailsRef.current,
        start: "top 70%",
        end: "bottom 30%",
        markers: false,
      },
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === detailsRef.current) {
          trigger.kill();
        }
      });
    };
  }, [index]);

  const textColor = bgColor === "bg-white" ? "text-black" : "text-white";

  return (
    <div className={`w-[100vw] md:w-screen panel flex flex-col-reverse xl:flex-row items-center text-white text-4xl ${bgColor} md:p-8`}>
      <div className="max-md:h-[48%] max-md:w-[70%] max-xl:h-[55%] max-xl:w-[60%] xl:w-[30%] border-2 border-gray-500 xl:mx-28 max-xl:m-auto p-4 max-md:z-10" ref={imageRef}>
        <img
          src={project.image}
          alt={project.title}
          className="h-[100%] w-[100%] xl:w-[55vh] xl:h-[80vh] m-auto"
        />
      </div>
      <div className={`w-auto h-auto ${textColor} xl:w-[50%] max-xl:w-[80%] max-md:w-[90%] max-md:my-4`} ref={detailsRef}>
        <div className='flex max-md:justify-between'>
          <h3 className="font-bold max-md:text-[1.8rem] mona-sans-font md:m-4 cursor-pointer">
            {project.title}
          </h3>
          <a href={project.link} target='_blank'><button onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)} className='bg-gray-500 text-white rounded-3xl p-2 xl:mt-2'> {hovered ? <MdOutlineArrowForward /> : <MdOutlineArrowOutward />}</button></a>
        </div>

        <h3 className="text-gray-500 max-md:text-[1.5rem] font-bold md:m-4 mona-sans-font underline cursor-pointer">
          Description:
        </h3>
        <div className="mona-sans-font md:ml-4 xl:text-2xl max-md:text-[18px] max-lg:text-xl max-xl:text-3xl max-md:leading-[25px] mx-auto cursor-pointer">
          {project.description.map((desc, i) => (
            <p key={i} className="mb-2">
              {desc} <br />
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;