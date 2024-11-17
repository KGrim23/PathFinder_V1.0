import About01 from '@/public/images/about-01.jpeg'
import HeroImage01 from '@/public/images/mentor-landing-page/hero-image-1.jpg'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroHome() {
  return (
    <section className="w-full h-[580px] md:h-[950px] lg:h-[540px] xl:h-[600px] mt-14 md:mt-24 flex flex-col items-center gap-12 pt-20 lg:p-20 lg:gap-24 relative bg-gradient-to-bl from-[hsla(181,66%,49%,0.3)] to-[rgba(83,92,232,0.09)]">
      <div className="container flex flex-col items-center">
        {/* Hero content */}
        <div className="flex flex-col gap-2 text-center max-w-sm md:max-w-xl lg:max-w-screen-sm">
          <h1 className="text-foreground text-2xl font-semibold  leading-tight md:text-[48px]">
            Inspire. Educate. Mentor
          </h1>
          <div className="flex flex-col gap-5 items-center">
            <p className="text-neutral-dark text-xs  md:text-2xl">
              Fuel the aspirations of of tomorrow&apos;s leaders and shape the
              future of university students.
            </p>
            <Link
              href="/register"
              className="rounded-lg bg-primary text-white font-semibold tracking-wider px-6 py-2.5 text-sm md:text-lg md:px-14 md:py-4 hover:animate-pulse"
            >
              Become a mentor
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 max-w-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg gap-4 lg:gap-14 lg:grid-cols-2">
        <Image
          src={About01}
          alt="Mentor and Mentee"
          className="border-2 border-white w-full rounded-xl xl:rounded-3xl"
          priority
        />
        <Image
          src={HeroImage01}
          alt="Mentor"
          className="border-2 border-white w-full rounded-xl xl:rounded-3xl"
          priority
        />
        
      </div>
    </section>
  )
}
