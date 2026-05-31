import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

import { Github } from '@/components/social-icons/icons'

const editUrl = (path: string) => `${siteMetadata.siteRepo}/blob/main/data/${path}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, slug, date, title, tags } = content

  return (
    <>
      <SectionContainer>
        <article>
          <div className="dark:divide-xyz-900 divide-y divide-violet-100">
            <header className="py-6">
              <div className="space-y-1 text-center">
                <dl className="space-y-10">
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="dark:text-xyz-200 text-base leading-6 font-medium text-gray-500">
                      <time dateTime={date}>
                        {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                      </time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <PageTitle>{title}</PageTitle>
                </div>
              </div>
            </header>
            <div className="dark:divide-xyz-900 grid-rows-[auto_1fr] divide-y divide-violet-100 pb-8">
              <dl className="py-3 xl:hidden">
                <dt className="sr-only">Authors</dt>
                <dd>
                  <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
                    {authorDetails.map((author) => (
                      <li className="flex items-center space-x-2" key={author.name}>
                        {author.avatar && (
                          <Image
                            src={author.avatar}
                            width={32}
                            height={32}
                            alt="头像"
                            className="size-8 rounded-full object-cover"
                          />
                        )}
                        <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                          <dt className="sr-only">Name</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                          <dt className="sr-only">Twitter</dt>
                        </dl>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>
              <div className="dark:divide-xyz-900 divide-y divide-violet-100">
                <div className="prose dark:prose-invert max-w-none pt-10 pb-8">{children}</div>
                <div className="dark:text-xyz-300 flex justify-center py-4 text-sm text-gray-700 hover:text-violet-600 xl:hidden">
                  <span className="flex items-center justify-center">
                    <Github className="size-4" />
                  </span>
                  <Link className="ml-1" href={editUrl(filePath)}>
                    在GitHub上查看
                  </Link>
                </div>

                {siteMetadata.comments && (
                  <div
                    className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
                    id="comment"
                  >
                    <Comments slug={slug} />
                  </div>
                )}
              </div>
              <footer>
                <div className="dark:divide-xyz-900 divide-y divide-violet-100 text-sm leading-5 font-medium">
                  {tags && (
                    <div className="py-4">
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        标签
                      </h2>
                      <div className="flex flex-wrap">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                  )}
                  {(next || prev) && (
                    <div className="flex justify-between space-y-4 space-x-4 py-4 max-sm:flex-col">
                      {prev && prev.path && (
                        <div className="flex-1">
                          <h4 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                            上一篇文章
                          </h4>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                            <Link href={`/${prev.path}`}>{prev.title}</Link>
                          </div>
                        </div>
                      )}
                      {next && next.path && (
                        <div className="flex-1">
                          <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                            下一篇文章
                          </h2>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                            <Link href={`/${next.path}`}>{next.title}</Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </article>
      </SectionContainer>
    </>
  )
}
