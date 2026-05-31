import Link from './Link'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

interface HomePostItemProps {
  path: string
  date: string
  title: string
  tags: string[]
}

const HomePostItem = ({ path, date, title, tags }: HomePostItemProps) => (
  <article>
    <div className="space-y-2">
      <div className="xl:col-span-3">
        <div>
          <h2 className="py-1 text-base font-bold tracking-tight">
            <Link
              href={`/${path}`}
              className="text-gray-900 hover:text-violet-600 dark:text-gray-100"
            >
              {title}
            </Link>
          </h2>
        </div>
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="dark:text-xyz-300 text-sm leading-6 font-medium text-gray-500">
            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
          </dd>
        </dl>
      </div>
    </div>
  </article>
)

export default HomePostItem
