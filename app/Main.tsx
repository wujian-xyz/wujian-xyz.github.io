import Link from '@/components/Link'
import { ArrowRight, CalendarSync, SquareArrowOutUpRight } from 'lucide-react'
import HomePostItem from '@/components/HomePostItem'
import SocialIcon from '@/components/social-icons'
import projectsData from '@/data/projectsData'
import { Github } from '@/components/social-icons/icons'
import Image from '@/components/Image'
import { Authors, allAuthors } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import type { CoreContent } from 'pliny/utils/contentlayer'

const MAX_DISPLAY = 5

export default function Home({ posts }: { posts: CoreContent<Blog>[] }) {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const authorContent = coreContent(author)

  return (
    <div className="min-h-[calc(100vh-64px)] w-full pt-16">
      <div className="mx-auto flex min-h-40 max-w-2xl items-center py-6 xl:min-h-[calc(100vh-128px)] xl:max-w-6xl">
        <div className="grid w-full grid-cols-2 gap-6 xl:grid-cols-3">
          <div className="dark:bg-xyz-700 dark:border-xyz-900 relative col-span-2 overflow-hidden rounded-2xl border border-violet-200 bg-white pt-0 shadow-xs xl:col-span-1 xl:pt-[100%]">
            <div className="relative top-0 left-0 flex h-full w-full flex-col xl:absolute">
              <header className="dark:bg-xyz-700/50 flex items-center justify-between bg-gray-50 px-6 py-4">
                <h1 className="flex sm:leading-10">
                  <span className="mr-1 flex size-6 items-center justify-center text-violet-500">
                    <CalendarSync size={16} />
                  </span>
                  <span className="dark:text-xyz-200 text-base font-extrabold tracking-tight text-gray-600">
                    最新的
                  </span>
                </h1>
                <Link
                  href="/blog"
                  className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center text-gray-500"
                  aria-label="所有帖子"
                >
                  <ArrowRight size={16} />
                  <span className="text-sm">更多</span>
                </Link>
              </header>
              <ul className="dark:divide-xyz-900 flex-1 divide-y divide-violet-100 px-6 pt-1 pb-3">
                {!posts.length && '未找到帖子。'}
                {posts.slice(0, MAX_DISPLAY).map((post) => {
                  const { slug, ...other } = post
                  return (
                    <li key={slug} className="py-2">
                      <HomePostItem {...other} path={`blog/${slug}`} />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="dark:bg-xyz-700 dark:border-xyz-900 group relative overflow-hidden rounded-2xl border border-violet-200 bg-white pt-0 shadow-xs xl:pt-[100%]">
            <Link
              href={'/about'}
              className="absolute top-6 right-6 z-10 hidden text-violet-600 group-hover:block"
            >
              <SquareArrowOutUpRight size={16} />
            </Link>
            <div className="relative top-0 left-0 flex h-full w-full flex-col items-center justify-between px-4 py-4 xl:absolute">
              {projectsData.map((d, index) => {
                const display = index === 0 ? 'block' : 'hidden'
                return (
                  <div className={`h-full w-full ${display}`} key={index}>
                    <div className={`${d.imgSrc && 'h-full w-full'} flex flex-col overflow-hidden`}>
                      <div className="flex-1 overflow-hidden rounded-xl">
                        {d.imgSrc &&
                          (d.href ? (
                            <Link href={d.href} aria-label={`Link to ${d.title}`}>
                              <Image
                                alt={d.title}
                                src={d.imgSrc}
                                className="h-full w-full object-cover object-center"
                                width={334}
                                height={168}
                              />
                            </Link>
                          ) : (
                            <Image
                              alt={d.title}
                              src={d.imgSrc}
                              className="object-cover object-center"
                              width={334}
                              height={168}
                            />
                          ))}
                      </div>
                      <div className="w-full flex-1">
                        <h2 className="mt-4 mb-1 flex items-center justify-between px-2 text-2xl leading-8 font-bold tracking-tight">
                          {d.href ? (
                            <Link href={d.href} aria-label={`Link to ${d.title}`}>
                              {d.title}
                            </Link>
                          ) : (
                            d.title
                          )}
                          {d.href && (
                            <Link
                              href={d.href}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-base leading-6 font-medium"
                              aria-label={`Link to ${d.title}`}
                            >
                              <Github />
                            </Link>
                          )}
                        </h2>
                        <p className="prose dark:text-xyz-100 mb-2 max-w-none px-2 leading-6 text-gray-500">
                          {d.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="dark:bg-xyz-700 dark:border-xyz-900 group relative h-full rounded-2xl border border-violet-200 bg-white pt-0 shadow-xs xl:pt-[100%]">
            <Link
              href={'/about'}
              className="absolute top-6 right-6 z-10 hidden text-violet-600 group-hover:block"
            >
              <SquareArrowOutUpRight size={16} />
            </Link>
            <div className="relative top-0 left-0 flex w-full flex-col items-center space-x-2 py-8 xl:absolute">
              {authorContent.avatar && (
                <Image
                  src={authorContent.avatar}
                  alt="avatar"
                  width={156}
                  height={156}
                  className="size-30 rounded-full object-cover"
                />
              )}
              <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">
                {authorContent.name}
              </h3>
              <div className="text-gray-500 dark:text-gray-400">{authorContent.occupation}</div>
              <div className="text-gray-500 dark:text-gray-400">{authorContent.company}</div>
              <div className="flex space-x-3 pt-6">
                <SocialIcon size={24} kind="mail" href={`mailto:${authorContent.email}`} />
                <SocialIcon size={24} kind="github" href={authorContent.github} />
                <SocialIcon size={24} kind="juejin" href={authorContent.juejin} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
