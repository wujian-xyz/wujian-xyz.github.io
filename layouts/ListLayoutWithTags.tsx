'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import tagData from 'app/tag-data.json'
import CardTitle from '@/components/CardTitle'
import PostItem from '@/components/PostItem'
import { Rss } from 'lucide-react'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+\/?$/, '') // Remove any trailing /page
    .replace(/\/$/, '') // Remove trailing slash
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 border-t border-violet-100 bg-gray-50 px-9 py-5 md:space-y-5 dark:border-gray-700 dark:bg-gray-900/50">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            上一页
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            上一页
          </Link>
        )}
        <span>
          {currentPage} / {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            下一页
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            下一页
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div className="fixed top-16 bottom-16 z-0 hidden max-w-6xl -translate-x-60 xl:block">
        <div className="dark:border-xyz-900 dark:shadow-xyz-900/40 h-full max-h-screen w-60 overflow-auto border-violet-100 p-6 sm:block">
          <div className="xyz-scrollbar h-full w-full overflow-x-hidden">
            {pathname.startsWith('/blog') ? (
              <h3 className="text-primary-500 py-1 font-bold uppercase">所有帖子</h3>
            ) : (
              <Link
                href={`/blog`}
                className="hover:text-primary-500 dark:hover:text-primary-500 py-1 font-bold text-gray-700 uppercase dark:text-gray-300"
              >
                所有帖子
              </Link>
            )}
            <ul className="block">
              {sortedTags.map((t) => {
                return (
                  <li key={t} className="my-1 mr-2">
                    {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                      <h3 className="text-primary-500 flex items-center justify-between px-2 py-1 text-sm font-bold uppercase">
                        <span>{t}</span>
                        <span className="dark:bg-xyz-700 mx-2 h-[1px] flex-1 bg-gray-200"></span>
                        <span>{tagCounts[t]}</span>
                      </h3>
                    ) : (
                      <Link
                        href={`/tags/${slug(t)}`}
                        className="hover:text-primary-500 dark:hover:text-primary-500 dark:text-xyz-300 flex items-center justify-between rounded-sm py-1 text-sm font-medium text-gray-500 uppercase"
                        aria-label={`View posts tagged ${t}`}
                      >
                        <span>{t}</span>
                        <span className="dark:bg-xyz-700 mx-2 h-[1px] flex-1 bg-gray-200"></span>
                        <span>{tagCounts[t]}</span>
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="relative z-2 w-full">
        <CardTitle title={title} icon={<Rss size={22} />} />
        <div className="dark:border-xyz-900 dark:shadow-xyz-900/40 block w-full overflow-auto border-b border-violet-100 px-6 py-5 xl:hidden">
          <div className="xyz-scrollbar h-full w-full overflow-x-hidden">
            {pathname.startsWith('/blog') ? (
              <h3 className="text-primary-500 px-2 py-1 font-bold uppercase">所有帖子</h3>
            ) : (
              <Link
                href={`/blog`}
                className="hover:text-primary-500 dark:hover:text-primary-500 px-2 py-1 font-bold text-gray-700 uppercase dark:text-gray-300"
              >
                所有帖子
              </Link>
            )}
            <ul className="flex flex-wrap">
              {sortedTags.map((t) => {
                return (
                  <li key={t} className="my-1 mr-2">
                    {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                      <h3 className="text-primary-500 inline px-2 py-1 text-sm font-bold uppercase">
                        {`${t} (${tagCounts[t]})`}
                      </h3>
                    ) : (
                      <Link
                        href={`/tags/${slug(t)}`}
                        className="hover:text-primary-500 dark:hover:text-primary-500 rounded-sm px-2 py-1 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
                        aria-label={`View posts tagged ${t}`}
                      >
                        {`${t} (${tagCounts[t]})`}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:space-x-24">
          <div>
            <ul className="dark:divide-xyz-900 divide-y divide-violet-100 px-9 pt-1 pb-3">
              {displayPosts.map((post) => {
                const { path } = post
                return (
                  <li key={path} className="py-4">
                    <PostItem {...post} />
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
