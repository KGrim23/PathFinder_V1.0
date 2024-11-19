export default function CommonQuestions() {
  return (
    <section id="questions">
      <h1 className="px-1 mb-4 text-3xl font-medium text-center text-primary lg:text-4xl">
        Common Questions
      </h1>
      <div className="max-lg:container lg:max-w-screen-md lg:mx-auto xl:max-w-screen-lg flex flex-col gap-8">
        <div className="flex flex-col gap-3 items-start">
          <h1 className="text-xl font-medium text-foreground lg:text-2xl">
            How does it work?
          </h1>
          <p className="text-neutral-dark">
            Expand your professional network through mentoring on our platform.
            Aplentify uses AI to match mentors with mentees based on
            personalized profiles. Mentors provide guidance, while mentees
            access tailored support for their development, facilitating
            effortless connections and growth.
          </p>
        </div>
        <div className="flex flex-col gap-3 items-start">
          <h1 className="text-xl font-medium text-foreground lg:text-2xl">
            How do we approve mentors?
          </h1>
          <p className="text-neutral-dark">
            Connect with like-minded professionals, educators, and students
            within our vibrant mentorship community, expanding your network and
            fostering valuable relationships.
          </p>
        </div>
        <div className="flex flex-col gap-3 items-start">
          <h1 className="text-xl font-medium text-foreground lg:text-2xl">
            How much should I charge?
          </h1>
          <p className="text-neutral-dark">
            Determine your mentorship rate based on your expertise and value.
            Keep it competitive yet accessible, fostering trust for a rewarding
            mentorship journey.
          </p>
        </div>
      </div>
    </section>
  )
}
