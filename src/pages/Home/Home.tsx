import ContactSection from './components/ContactSection'
import FeaturesSection from './components/FeaturesSection'
import CommunityAnnounces from './components/CommunityAnnounces'
import HomeArticles from './components/HomeArticles'
import HomeHero from './components/HomeHero'
import HomeEvents from './components/HomeEvents'

const HomePage = () => {


  

  return (
    <>
      <HomeHero />
      <FeaturesSection />
      <CommunityAnnounces />
      <HomeArticles />
      <HomeEvents />
      <ContactSection />
    </>
  )
}

export default HomePage