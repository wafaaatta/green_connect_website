import React from 'react';
import { Eye, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface InfoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, icon }) => (
  <div className="p-4 rounded shadow bg-green-100">
    {icon}
    <h3 className="text-2xl heading-font font-semibold mt-4 mb-2">{title}</h3>
    <p className="text-gray-600 body-font">{description}</p>
  </div>
);

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start mb-16">
          <div className="md:w-1/2 pr-8">
            <h1 className="text-5xl text-green-800 font-bold mb-6 heading-font">{t('about.title')}</h1>
            <p className="text-2xl mb-4 heading-font">
              {t('about.description1')}
            </p>
            <p className="text-gray-600 body-font">
              {t('about.description2')}
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img src="/assets/images/plants-workshop/workshop-care.png" alt={t('about.imageAlt')} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-green-800 heading-font">
            {t('about.tagline')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto body-font">
            {t('about.taglineDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <InfoCard 
            title={t('about.missionTitle')}
            description={t('about.missionDescription')}
            icon={<Eye className="text-green-500 w-8 h-8" />}
          />
          <InfoCard 
            title={t('about.visionTitle')}
            description={t('about.visionDescription')}
            icon={<RefreshCw className="text-green-500 w-8 h-8" />}
          />
        </div>
      </div>
    </section>
  );
};

export default About;