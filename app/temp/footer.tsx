import Image from 'next/image'
import Link from 'next/link'
import FooterForm from './footer-form'

export default function Footer() {
  return (
    <footer className="bg-primary text-white w-full p-10">
      <div className="grid grid-cols-1 gap-4 justify-between md:gap-8 md:grid-cols-2 max-lg:container lg:grid-cols-[1fr_auto] xl:grid-cols-[475px_auto] lg:max-w-screen-md lg:mx-auto xl:max-w-screen-lg">
        <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
          <Image
            src="icons/logo-icon.svg"
            alt="Aplentify logo icon"
            width={44}
            height={44}
            className="w-9 h-9"
            priority
          />
          <p className="text-xs">
            With Aplentify as catalyst for growth, embark on a journey of
            self-discovery and empowerment, where every achivement becomes a
            stepping stone towards a brighter future.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:col-start-1">
          <h1 className="font-semibold mt-4 mb-2 md:mt-0">
            Start Exploring Opportunities
          </h1>
          <FooterForm />
        </div>
        <div className="flex flex-col gap-4 border-y-2 border-white py-10 md:border-y-0 md:border-l-2 md:px-10 md:py-0">
          <nav>
            <ul className="flex flex-col gap-6">
              <li>
                <Link
                  href="/"
                  className="font-medium tracking-wider  hover:underline"
                >
                  About
                </Link>
              </li>
              <div>
                <li>
                  <Link
                    href="/signup"
                    className="font-medium tracking-wider  hover:underline"
                  >
                    Become a mentor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/skills"
                    className="font-medium tracking-wider hover:underline"
                  >
                    Find mentors
                  </Link>
                </li>
              </div>
              <li>
                <Link
                  href="#questions"
                  className="font-medium tracking-wider hover:underline"
                >
                  Common questions
                </Link>
              </li>
              <div>
                <li>
                  <Link
                    href="/fair-use-policy"
                    className="tracking-wider hover:underline"
                  >
                    Fair use policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="tracking-wider hover:underline"
                  >
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="tracking-wider hover:underline"
                  >
                    Terms of service
                  </Link>
                </li>
              </div>
            </ul>
          </nav>
        </div>
        <div className="flex gap-3">
          <Link href="https://www.facebook.com/profile.php?id=61559895923657">
            <Image
              src="icons/facebook-white-icon.svg"
              alt="Facebook link"
              width={20}
              height={20}
              priority
            />
          </Link>

          <Link href="https://www.linkedin.com/company/aplentify">
            <Image
              src="icons/linkedin-white-icon.svg"
              alt="LinkedIn link"
              width={20}
              height={20}
              priority
            />
          </Link>
          <Link href="https://www.instagram.com/aplentify_">
            <Image
              src="icons/instagram-white-icon.svg"
              alt="Instagram link"
              width={20}
              height={20}
              priority
            />
          </Link>
          {/* <Link href="">
            <Image
              src="icons/x-white-icon.svg"
              alt="X link"
              width={20}
              height={20}
              priority
            />
          </Link> */}
        </div>
      </div>
    </footer>
  )
}
