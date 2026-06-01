import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { QrCode } from 'lucide-react'
import HeaderScroll from './HeaderScroll'

const Header = () => {
  return (
    <div
      id="header"
      className="dark:border-xyz-900 fixed top-0 left-0 z-10 w-full border-b border-violet-100 transition-all duration-200"
    >
      <HeaderScroll />
      <header className="z-20 mx-auto flex w-full max-w-2xl items-center justify-between px-6 py-4 transition-all duration-200">
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-1">
              <QrCode />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 items-center text-xl font-semibold text-gray-800 sm:flex dark:text-gray-300">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
            {/* <sup className="ml-1 text-gray-500">beta</sup> */}
          </div>
        </Link>
        <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
          <div className="no-scrollbar hidden items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
          </div>
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </header>
    </div>
  )
}

export default Header
