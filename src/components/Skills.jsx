import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const skillData = [
    {
        category: "FRONTEND",
        color: "bg-lime-500",
        percentColor: "text-lime-400",
        skills: [
            { name: "HTML", desc: "Semantic Markup", level: 91 },
            { name: "CSS", desc: "Modern Styling", level: 91 },
            { name: "JavaScript", desc: "ES6+ Features", level: 80 },
            { name: "React", desc: "Component Library", level: 80 }
        ]
    },
    {
        category: "BACKEND",
        color: "bg-lime-500",
        percentColor: "text-lime-400",
        skills: [
            { name: "Node.js", desc: "Server Runtime", level: 70 },
            { name: "Express", desc: "Web Framework", level: 70 },
            { name: "MongoDB", desc: "Database", level: 70 }
        ]
    },
    {
        category: "ADDITIONAL EXPERTISE",
        color: "bg-lime-500",
        percentColor: "text-lime-400",
        skills: [
            { name: "Responsive Design", desc: "Mobile First Approach", level: 91 },
            { name: "Performance", desc: "Optimization & SEO", level: 80 },
            { name: "GIT", desc: "Version Control", level: 80 }
        ]
    }
]

const Skills = () => {
    const skillRef = useRef(null);

    useGSAP(() => {
        // Headline SKILLS & EXPERTISE (lines from left/right)
        const splitskill = new SplitText(skillRef.current, { type: 'lines' });
        gsap.from(splitskill.lines, {
            x: (i) => (i === 0 ? -250 : 250),
            opacity: 0,
            duration: 2,
            ease: 'back.out',
            stagger: 0.2,
            scrollTrigger: {
                trigger: skillRef.current,
                start: 'top 80%',
                end: 'bottom 60%',
                toggleActions: 'play none none reverse',
                markers: false,
            },
        });

        // Animate inner skill titles with SplitText, for a typing-in effect
        document.querySelectorAll(".skills-title").forEach((el) => {
            const split = new SplitText(el, { type: "chars" });
            gsap.from(split.chars, {
                opacity: 0,
                y: 20,
                stagger: 0.05,
                duration: 0.5,
                delay: 0.4,
                ease: "back",
                scrollTrigger: {
                    trigger: el,
                    start: "bottom 90%",
                }
            });
        });

        // Animate skill name (wavy word-by-word)
        document.querySelectorAll(".skill-item").forEach((el, idx) => {
            const split = new SplitText(el, { type: "chars" });
            gsap.from(split.chars, {
                opacity: 0,
                y: (i) => 30 * Math.sin(i / 2),
                x: (i) => 30 * Math.cos(i / 2),
                rotate: (i) => i % 2 === 0 ? 10 : -10,
                stagger: 0.046,
                delay: 0.15 + idx * 0.08,
                duration: 0.55,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                }
            });
        });

        // Animate skill bar width from 0 to % level
        document.querySelectorAll(".skill-bar").forEach(el => {
            const percent = el.dataset.level;
            gsap.fromTo(el,
                { width: 0, opacity: 0 },
                {
                    width: percent + '%', opacity: 1,
                    duration: 1.15, ease: "expo.out",
                    scrollTrigger: {
                        trigger: el.parentElement,
                        start: "top 90%",
                    }
                }
            );
        });
    });

    return (
        <div className="xl:m-12" id='skills'>
            <div className="xl:p-8 p-4">
                {/* Headline */}
                <h2 ref={skillRef} className="text-4xl sm:text-3xl md:text-4xl
          lg:text-9xl xl:text-[10rem] font-bold text-white mona-sans-font
          leading-none p-2 cursor-pointer">
                    <span>SKILLS &</span>
                    <span className="ml-8 lg:ml-56 text-lime-500">EXPERTISE</span>
                </h2>
                <p className="text-gray-400 text-md md:text-xl md:mt-6 ml-2 mona-sans-font skill-item cursor-pointer">
                    TECHNOLOGIES I WORK WITH TO CREATE <br />
                    <span className="text-white">AMAZING DIGITAL EXPERIENCES</span>
                </p>
            </div>
            <div className="flex max-md:flex-col font-bold justify-around md:my-16 max-md:px-8 max-md:pb-8 max-md:gap-4">
                {skillData.map((cat, i) => (
                    <div className='skills-col' key={i}>
                        <h3 className={`skills-title text-2xl md:text-3xl xl:text-4xl tracking-widest max-md:mt-8 md:mb-5 text-lime-500 cursor-pointer`}>
                            {cat.category}
                        </h3>
                        {cat.skills.map((skill, idx) => (
                            <div className="md:p-4 p-2" key={idx}>
                                <h4 className="text-white font-semibold text-md md:text-lg mona-sans-font skill-item">
                                    {skill.name}
                                </h4>
                                <div className="flex items-center">
                                    <div
                                        className={`skill-bar ${cat.color} h-1 w-0 mt-1 rounded`}
                                        style={{
                                            transition: "width 0.8s cubic-bezier(.77,0,.18,1)",
                                            maxWidth: "100%",
                                        }}
                                        data-level={skill.level}
                                    ></div>
                                    <span className={`ml-3 text-xs font-bold ${cat.percentColor}`}>{skill.level}%</span>
                                </div>
                                <p className="text-gray-400 text-sm mt-1 skill-item">{skill.desc}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Skills
