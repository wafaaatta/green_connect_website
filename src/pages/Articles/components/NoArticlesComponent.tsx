import { useTranslation } from "react-i18next"

const NoArticlesComponent = () => {
    const { t } = useTranslation()

    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold text-green-800">{t('articlesPage.noResults')}</h1>
        </div>
    )
}

export default NoArticlesComponent