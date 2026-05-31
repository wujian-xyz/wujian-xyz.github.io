import friendsData from '@/data/friendsData'
import { genPageMetadata } from 'app/seo'
import CardTitle from '@/components/CardTitle'
import { Heart } from 'lucide-react'
import MainContainer from '@/layouts/MainContainer'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = genPageMetadata({ title: '友链' })

export default function Friends() {
  return (
    <MainContainer>
      <div className="w-full">
        <CardTitle title="友链" icon={<Heart size={20} />}>
          <p className="dark:text-xyz-200 text-lg leading-7 text-gray-500">友情链接</p>
        </CardTitle>
        <div className="px-9 py-8">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {friendsData.map((friend) => (
              <li
                key={friend.title}
                className="dark:bg-xyz-700 dark:border-xyz-900 flex items-center gap-4 rounded-xl border border-violet-200 bg-white p-6 shadow-xs transition-all hover:border-violet-400"
              >
                <Image
                  src={friend.avatar}
                  alt={friend.title}
                  width={56}
                  height={56}
                  className="size-14 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-bold text-gray-900 dark:text-gray-100">
                    {friend.title}
                  </h3>
                  <p className="dark:text-xyz-200 truncate text-sm text-gray-500">
                    {friend.description}
                  </p>
                </div>
                <Link
                  href={friend.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:text-primary-600 shrink-0 text-sm font-medium"
                >
                  访问
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainContainer>
  )
}
