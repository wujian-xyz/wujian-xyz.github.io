import Image from './Image'
import Link from './Link'
import { Github } from './social-icons/icons'

import { ReactNode } from 'react'

interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
  display?: string
}

const Card = ({ title, description, imgSrc, href, display = 'block' }: CardProps) => (
  <div className={`w-full p-4 md:w-1/2 ${display}`}>
    <div
      className={`${
        imgSrc && 'h-full'
      } dark:border-xyz-800 overflow-hidden rounded-xl border-2 border-violet-100/60`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={668}
              height={336}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="px-6 py-4">
        <h2 className="mb-1 text-2xl leading-8 font-bold tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose dark:text-xyz-100 mb-2 max-w-none leading-6 text-gray-500">
          {description}
        </p>
        {href && (
          <Link
            href={href}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-base leading-6 font-medium"
            aria-label={`Link to ${title}`}
          >
            <Github />
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
