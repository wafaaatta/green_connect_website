import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import AppImages from "../constants/app_images"
import Routes from "../constants/routes"

export default function Footer() {
  const { t } = useTranslation()

  const quickLinks: { name: string, path: string }[] = [
    { name: t('footer.home'), path: "/" },
    { name: t('footer.announces'), path: Routes.PAGES.ANNOUNCEMENTS },
    { name: t('footer.articles'), path: Routes.PAGES.ARTICLES },
    { name: t('footer.events'), path: Routes.PAGES.EVENTS },
    { name: t('footer.about'), path: Routes.PAGES.ABOUT },
  ]
  const legalLinks: { name: string, path: string }[] = [
    { name: t('footer.privacyPolicy'), path: Routes.PAGES.PRIVACY_POLICY }
  ]

  return (
    <footer className="bg-[#f3ecd6] text-[#2c7a51]" role="contentinfo">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2" aria-label={t('footer.homeAriaLabel')}>
              <img loading='lazy' src={AppImages.logo} className="h-32" alt={t('footer.logoAlt')} />
            </Link>
          </div>
          <nav className="flex flex-grow flex-wrap max-md:grid max-md:grid-cols-2 max-md:gap-4 justify-center md:space-x-8 " aria-label={t('footer.quickLinksAriaLabel')}>
            {quickLinks.map((item) => (
              <Link key={item.path} to={item.path} className="text-xl hover:underline focus:outline-none rounded">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-[#2c7a51] flex flex-col md:flex-row justify-between items-center text-base">
          <p className="mb-4 md:mb-0 max-md:text-center">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <nav className="flex flex-wrap justify-center space-x-6" aria-label={t('footer.legalLinksAriaLabel')}>
            {legalLinks.map((item) => (
              <Link key={item.path} to={item.path} className="hover:underline focus:outline-none rounded">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}