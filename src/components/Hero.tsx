import { TiLocation } from "react-icons/ti"
import Button from "./shared/Button"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap";

const Hero = () => {
  const backgroundVideo = useRef<HTMLVideoElement>(null);
  const totalVideos = 4;
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [isMouseMoving, setIsMouseMoving] = useState<boolean>(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const timeOutMouseRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextIndex = (currentIndex + 1) % totalVideos;

  const handleMouseEvent = (e: MouseEvent) => {
    // setIsMouseMoving(true);
    if (!backgroundVideo.current) return;
    if (timeOutMouseRef.current) clearTimeout(timeOutMouseRef.current);
    timeOutMouseRef.current = setTimeout(() => {
      // setIsMouseMoving(false);
      gsap.to(backgroundVideo.current, { autoAlpha: 0, duration: 0.5 })
    }, 1000)

    gsap.to(backgroundVideo.current, { autoAlpha: 1 });

    const { clientX, clientY } = e;

    const maxOffSetX = 100;
    const maxOffSetY = 200;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const constrainedX = Math.min(Math.max(clientX, centerX - maxOffSetX), centerX + maxOffSetX);
    const constrainedY = Math.min(Math.max(clientY, centerY - maxOffSetY), centerY + maxOffSetY);

    const polygonClipPath = `polygon(
      ${Math.max(constrainedX - 100, 0)}px ${Math.max(constrainedY - 100, 0)}px,
      ${Math.min(constrainedX + 100, window.innerWidth)}px ${Math.max(constrainedY - 100, 0)}px,
      ${Math.min(constrainedX + 100, window.innerWidth)}px ${Math.min(constrainedY + 100, window.innerHeight)}px,
      ${Math.max(constrainedX - 100, 0)}px ${Math.min(constrainedY + 100, window.innerHeight)}px
    )`;
    gsap.to(backgroundVideo.current, {
      clipPath: polygonClipPath,
      duration: 0.3,
      ease: "power1.out"
    })

  };

  const handleNextVideo = () => {
    setCurrentIndex(nextIndex);
    const animatedVideo = `#video-${nextIndex}`;
    const videos = ["#video-0", "#video-1", "#video-2", "#video-3"].filter(v => v !== animatedVideo);
    gsap.set(animatedVideo, {
      zIndex: 30,
      width: "16rem",
      height: "16rem"
    })
    const currentVideo: HTMLVideoElement | null = document.querySelector(animatedVideo);
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
      currentVideo.play();
    }
    gsap.set(videos, { zIndex: 20 });

    gsap.to(animatedVideo, {
      clipPath: "polygon(0% 0%,100% 0%,100% 100% ,0% 100)",
      width: "100%",
      height: "100%",
      transformOrigin: "center center"
    })
  }

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    hero.addEventListener("mousemove", handleMouseEvent);

    return () => hero.removeEventListener("mousemove", handleMouseEvent);
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: "#video-frame",
          markers: true
        }
      })
    })
    return () => ctx.revert();
  }, [])
  return (
    <section className="relative h-dvh w-screen">
      <div ref={heroRef} className="relative overflow-hidden bg-blue-50 h-dvh">
        {/* Videos */}
        <div id="video-frame" className="absolute inset-0 w-full h-full">
          <video onClick={handleNextVideo}
            ref={backgroundVideo}
            className="invisible object-cover h-full w-full absolute inset-0 cursor-pointer z-50"
            src={`/videos/hero-${nextIndex}.mp4`}
            autoPlay muted loop />

          {Array.from({ length: totalVideos }, (_, index) => (
            <video
              key={index}
              id={`video-${index}`}
              className="object-cover h-full w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10"
              src={`/videos/hero-${index}.mp4`}
              autoPlay muted loop />
          ))}
        </div>

        {/* <div className="size-64 absolute bg-blue-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "></div> */}

        {/* Bottom text - White Layer */}
        <h1 className="special-font absolute z-10 bottom-5 lg:text-[12rem] uppercase sm:right-10 text-blue-50 font-zentry font-black">g<b>a</b>ming</h1>
      </div>
      {/* Top Text - White Layer */}
      <div className="flex flex-col items-start px-5 gap-3 absolute top-10 left-10 z-40">
        <h2 className="special-font lg:text-[12rem] uppercase sm:left-10 text-white font-zentry font-black">redifi<b>n</b></h2>
        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">Enter The  Metgame Layer
          <br />
          unleash the play economy
        </p>
        <Button LeftIcon={<TiLocation />} text="watch trailer" />
      </div>
      {/* Bottom Text - Black Layer */}
      <h2 className="special-font absolute z-40 bottom-5 lg:text-[12rem] uppercase sm:right-10 text-black font-zentry font-black">g<b>a</b>ming</h2>
    </section>
  )
}

export default Hero