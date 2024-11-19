import Image from 'next/image'
import RegistrationImage from '@/public/images/mentor-landing-page/registration.jpg'
import RegistrationImageMobile from '@/public/images/mentor-landing-page/registration-mobile.jpeg'
import Link from 'next/link'

export default function Registration() {
  return (
    <section className="grid gap-12">
      <Image
        src={RegistrationImageMobile}
        alt="Registration process image"
        width={372}
        height={471}
        className="w-full block sm:hidden mt-16"
        priority
      />
      <Image
        src={RegistrationImage}
        alt="Registration process image"
        width={1440}
        height={471}
        className="2xl:max-w-screen-lg 2xl:mx-auto w-full hidden sm:block mt-14"
        priority
      />
      <h1 className="max-lg:container text-2xl font-semibold text-center text-primary lg:text-3xl">
        Mentoring Registration Process
      </h1>
      <div className="max-lg:container lg:max-w-screen-lg lg:mx-auto grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
        <div className="grid grid-cols-1 md:grid-rows-[40px_32px_auto] gap-2 justify-items-center">
          <Image
            width={32}
            height={32}
            className="w-8 h-8 mb-1"
            src="images/mentor-landing-page/icons/questionnare-icon.svg"
            alt="Questionnare icon"
            priority
          />

          <h1 className="text-xl font-semibold text-foreground">
            Fill in the questionnaire
          </h1>
          <p className="text-neutral-dark text-sm text-center max-w-sm md:max-w-screen-sm lg:max-w-screen-lg">
            Get started in seconds! Share your skills and experience, and
            we&apos;ll ensure seamless matching with the right students.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-rows-[40px_32px_auto] gap-2 justify-items-center">
          <Image
            width={32}
            height={32}
            className="w-8 h-8 mb-1"
            src="images/mentor-landing-page/icons/calendar-icon.svg"
            alt="Calendar icon"
            priority
          />

          <h1 className="text-xl font-semibold text-foreground">
            Link your calendar
          </h1>
          <p className="text-neutral-dark text-sm text-center max-w-sm md:max-w-screen-sm lg:max-w-screen-lg">
            Sync your calendar to ensure hassle-free scheduling and avoid
            conflicts with your existing commitments.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-rows-[40px_32px_auto] gap-2 justify-items-center">
          <Image
            width={32}
            height={32}
            className="w-8 h-8 mb-1"
            src="images/mentor-landing-page/icons/availability-icon.svg"
            alt="Availability icon"
            priority
          />

          <h1 className="text-xl font-semibold text-foreground">
            Set your availability
          </h1>
          <p className="text-neutral-dark text-sm text-center max-w-sm md:max-w-screen-sm lg:max-w-screen-lg">
            Tailor your availability so that students can easily book sessions
            that work for both of you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-rows-[40px_32px_auto] gap-2 justify-items-center">
          <Image
            width={32}
            height={32}
            className="w-8 h-8 mb-1"
            src="images/mentor-landing-page/icons/make-difference-icon.svg"
            alt="Make a difference icon"
            priority
          />

          <h1 className="text-xl font-semibold text-foreground">
            Make a difference!
          </h1>
          <p className="text-neutral-dark text-sm text-center max-w-sm md:max-w-screen-sm lg:max-w-screen-lg">
            Empower students by sharing your knowledge and guidance, making a
            positive impact on their academic journey.
          </p>
        </div>
      </div>

      <Link
        href="/register"
        className="grid place-content-center mx-auto rounded-lg bg-primary text-white font-semibold tracking-wider px-6 py-2.5 text-sm md:text-lg md:px-8 md:py-0 md:h-12 hover:animate-pulse"
      >
        Become a mentor
      </Link>
    </section>
  )
}
