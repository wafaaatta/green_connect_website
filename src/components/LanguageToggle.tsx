import { Globe } from 'lucide-react'
import { getLanguage, setLanguage } from '../utils/language'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const LanguageToggle = () => {
  const [currentLanguage, setCurrentLanguage] = useState(getLanguage())
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    setLanguage(i18n, currentLanguage === 'en' ? 'fr' : 'en')
    setCurrentLanguage(currentLanguage === 'en' ? 'fr' : 'en')
  }
  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-100 transition duration-150 ease-in-out"
      aria-label={`Change language to ${currentLanguage === 'en' ? 'French' : 'English'}`}
    >
      <Globe className="h-5 w-5" />
      <span>{currentLanguage === 'en' ? 'FR' : 'EN'}</span>
    </button>
  )
}

export default LanguageToggle