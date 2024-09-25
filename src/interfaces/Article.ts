import ArticleCategory from "./ArticleCategory"

interface Article {
    id: number
    title: string
    content: string
    image: string
    views: number
    articleCategory: ArticleCategory
}

export default Article