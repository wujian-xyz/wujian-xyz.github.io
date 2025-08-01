import Link from './Link'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="dark:border-xyz-900/80 mx-auto flex w-full items-center justify-center space-x-4 border-t border-violet-100 py-5">
        <div className="flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <div>
            <Link href="/about">{siteMetadata.author}</Link>
          </div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
          <div>{` • `}</div>
          <Link href="/tags">所有标签</Link>
          <div>{` • `}</div>
          <Link href="/feed.xml">RSS</Link>
        </div>
      </div>
    </footer>
  )
}
