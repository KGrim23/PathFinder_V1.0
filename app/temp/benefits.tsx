import Image from 'next/image'

export default function Benefits() {
  return (
    <section className="max-lg:container lg:max-w-screen-md lg:mx-auto xl:max-w-screen-lg grid grid-cols-1 gap-6 lg:gap-x-10 lg:gap-y-8 lg:grid-cols-2 mt-24 md:mt-52 lg:mt-28">
      <div className="grid grid-cols-1 grid-rows-[32px_20px_auto] lg:grid-cols-[44px_1fr] md:grid-rows-[28px_auto] gap-y-4 md:gap-x-6">
        <Image
          src="images/mentor-landing-page/icons/lasting-impact-icon.svg"
          alt="Make a lasting impact icon"
          width={44}
          height={44}
          className="w-8 h-8 xl:w-11 xl:h-11"
          priority
        />
        <h1 className="text-xl lg:text-2xl font-medium text-foreground">
          Make a lasting impact:
        </h1>
        <p className="lg:col-start-2 text-neutral-dark">
          Share your knowledge and experience to guide students through their
          academic and professional journeys, leaving a lasting impact on their
          lives.
        </p>
      </div>
      <div className="grid grid-cols-1 grid-rows-[32px_20px_auto] lg:grid-cols-[44px_1fr] md:grid-rows-[28px_auto] gap-y-4 md:gap-x-6">
        <Image
          src="images/mentor-landing-page/icons/personal-growth-icon.svg"
          alt="Personal growtht icon"
          width={44}
          height={44}
          className="w-8 h-8 xl:w-11 xl:h-11"
          priority
        />
        <h1 className="text-xl lg:text-2xl font-medium text-foreground">
          Personal growth:
        </h1>
        <p className="lg:col-start-2 text-neutral-dark">
          As a mentor, you&apos;ll have the opportunity to refine your
          leadership, communication, and coaching skills while gaining fresh
          perspectives from mentees.
        </p>
      </div>
      <div className="grid grid-cols-1 grid-rows-[32px_20px_auto] lg:grid-cols-[44px_1fr] md:grid-rows-[28px_auto] gap-y-4 md:gap-x-6">
        <Image
          src="images/mentor-landing-page/icons/expand-network-icon.svg"
          alt="Expand your Network icon"
          width={44}
          height={44}
          className="w-8 h-8 xl:w-11 xl:h-11"
          priority
        />
        <h1 className="text-xl lg:text-2xl font-medium text-foreground ">
          Expand your Network
        </h1>
        <p className="lg:col-start-2 text-neutral-dark">
          Expand your professional network through mentoring on our platform.
          Connect with industry leaders, stay ahead in your career, and pave the
          way for professional success.
        </p>
      </div>
      <div className="grid grid-cols-1 grid-rows-[32px_20px_auto] lg:grid-cols-[44px_1fr] md:grid-rows-[28px_auto] gap-y-4 md:gap-x-6">
        <Image
          src="images/mentor-landing-page/icons/earn-while-mentor-icon.svg"
          alt="Earn while you mentor icon"
          width={44}
          height={44}
          className="w-8 h-8 xl:w-11 xl:h-11"
          priority
        />
        <h1 className="text-xl lg:text-2xl font-medium text-foreground">
          Earn while you mentor:
        </h1>
        <p className="lg:col-start-2 text-neutral-dark">
          Turn your expertise into extra income by mentoring on our platform,
          leveraging your knowledge as a valuable asset while guiding students
          on their educational journey.
        </p>
      </div>
    </section>
  )
}
