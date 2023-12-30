import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'

// Can be imported from a shared config
export const locales = ['en', 'id'] as const
export const defaultLocale = 'en' as const
export const localePrefix = 'always' // Default
export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`@/messages/${locale}.ts`)).default,
  }
})

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix })
