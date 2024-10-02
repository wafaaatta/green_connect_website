import React from 'react';
import { Eye, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface InfoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, icon }) => (
  <div className="p-4 rounded shadow bg-green-50">
    {icon}
    <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start mb-16">
          <div className="md:w-1/2 pr-8">
            <h1 className="text-6xl font-bold mb-6">{t('about.title')}</h1>
            <p className="text-xl mb-4">
              {t('about.description1')}
            </p>
            <p className="text-gray-600">
              {t('about.description2')}
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img src="/assets/images/plants-workshop/workshop-care.png" alt={t('about.imageAlt')} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            {t('about.tagline')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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