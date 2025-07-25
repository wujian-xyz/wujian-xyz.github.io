import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
      {children}
    </h1>
  )
}
