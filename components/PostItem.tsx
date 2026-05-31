import Link from './Link'
import { formatDate } from 'pliny/utils/formatDate'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

interface PostItemProps {
  path: string
  date: string
  title: string
  tags: string[]
}

const PostItem = ({ path, date, title, tags }: PostItemProps) => (
  <article>
    <div className="space-y-2">
      <div className="space-y-3 xl:col-span-3">
        <div className="space-y-3">
          <div>
            <h2 className="py-2 text-2xl font-bold tracking-tight">
              <Link
                href={`/${path}`}
                className="text-gray-900 hover:text-violet-600 dark:text-gray-100"
              >
                {title}
              </Link>
            </h2>
            <div className="flex flex-wrap">
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          </div>
        </div>
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="dark:text-xyz-300 text-base leading-6 font-medium text-gray-500">
            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
          </dd>
        </dl>
      </div>
    </div>
  </article>
)

export default PostItem
