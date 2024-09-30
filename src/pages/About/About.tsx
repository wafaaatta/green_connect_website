import React from 'react';
import { Eye, RefreshCw } from 'lucide-react';

interface InfoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    {icon}
    <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const About = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start mb-16">
          <div className="md:w-1/2 pr-8">
            <h1 className="text-6xl font-bold mb-6">About us</h1>
            <p className="text-xl mb-4">
            GreenConnect is an innovative platform created for plant lovers, designed to bring together a passionate community to share, donate, and exchange plants and gardening knowledge.
            </p>
            <p className="text-gray-600">
            Born from a love for plants and a desire to promote sustainability, GreenConnect is a unique online space where users can offer and adopt plants for free. It serves as a bridge between gardeners, enabling them to share their resources, advice, and enthusiasm with one another.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img src="/src/assets/apartment.jpg" alt="Decorative plant" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Together, let's cultivate a green future!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our passionate commitment to a greener and more sustainable world, guided by our vision and mission.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <InfoCard 
            title="Our Mission" 
            description="We are committed to promoting an ecological culture by raising awareness among citizens about the importance of a healthy environment and a life in harmony with nature."
            icon={<Eye className="text-green-500 w-8 h-8" />}
          />
          <InfoCard 
            title="Our Vision" 
            description="A future where every home is a living ecosystem that respects the environment, where nature and humans coexist in perfect harmony."
            icon={<RefreshCw className="text-green-500 w-8 h-8" />}
          />
        </div>

        <div className="w-full">
          <img src="/src/assets/apartment.jpg"alt="Hands planting" className="w-full h-64 object-cover rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  );
};

export default About;