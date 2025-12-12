import React, { useEffect, useState } from 'react';
import { Search, MapPin, Shield, CheckCircle, Smartphone, Zap, Code, Wrench, Paintbrush, Truck, Camera, PenTool, Mic, Star, Users, ArrowRight, Briefcase } from 'lucide-react';
import { PageView } from '../types';

interface HomeProps {
  onNavigate: (page: PageView) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      
      {/* Hero Section with Parallax Feel */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1588645062867-a2e6dc90d984?q=80&w=2070&auto=format&fit=crop')", // Image of Indian Market/Street life
            transform: `translateY(${offset * 0.5}px)`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-50 dark:to-gray-900 z-10"></div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
          <div className="animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-accent/20 border border-accent text-accent font-semibold text-sm mb-4 backdrop-blur-sm">
              🇮🇳 India's #1 Gig Marketplace
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Kaam Milega. <span className="text-accent">Samman Milega.</span><br/>
              <span className="text-2xl md:text-4xl font-medium text-gray-200 mt-2 block">
                Connecting India's Talent, One Gig at a Time.
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto drop-shadow-md">
              From expert plumbers in Mumbai to web developers in Bangalore. Find work or hire helpers securely with GigneX.
            </p>

            {/* Search Bar */}
            <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2 transition-all transform hover:scale-[1.01] duration-300">
              <div className="flex-grow flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 md:py-4 transition-colors">
                <MapPin className="text-gray-400 dark:text-gray-300 w-5 h-5 mr-3 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Location (e.g. Delhi)" 
                  className="bg-transparent border-none outline-none w-1/3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm border-r border-gray-300 pr-2 mr-2"
                />
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2 hidden md:block"></div>
                <Search className="text-gray-400 dark:text-gray-300 w-5 h-5 mr-3 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search for 'Electrician' or 'Logo Design'..." 
                  className="bg-transparent border-none outline-none w-full text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <Mic className="text-primary w-5 h-5 cursor-pointer hover:scale-110 transition-transform ml-2" />
              </div>
              <button 
                onClick={() => onNavigate('find-gigs')}
                className="bg-gradient-to-r from-primary to-green-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-all active:scale-95 whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Pattern Divider */}
      <div className="h-4 bg-repeat-x opacity-20 relative z-30 -mt-2" style={{ backgroundImage: 'radial-gradient(circle, #ff9500 2px, transparent 2.5px)', backgroundSize: '20px 20px' }}></div>

      {/* Dual Pathways Section */}
      <section className="py-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 -mt-24">
            
            {/* Local Services Card */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-t-4 border-accent">
              <div className="h-40 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop" 
                  alt="Local Worker" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Wrench className="w-6 h-6 text-accent" /> Local Services
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                  Find trusted help near you. Plumbers, Electricians, Painters, and more.
                </p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { name: 'Repair', icon: Wrench },
                    { name: 'Paint', icon: Paintbrush },
                    { name: 'Shift', icon: Truck },
                  ].map((s) => (
                    <div key={s.name} className="flex flex-col items-center justify-center p-2 bg-orange-50 dark:bg-orange-900/10 rounded-lg text-center">
                      <s.icon className="w-6 h-6 text-accent mb-1" />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{s.name}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => onNavigate('find-gigs')} className="w-full py-3 bg-accent/10 hover:bg-accent hover:text-white text-accent font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                  Book Service <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Online Freelancing Card */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-t-4 border-secondary">
              <div className="h-40 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Office Worker" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Code className="w-6 h-6 text-secondary" /> Online Gigs
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                  Work from anywhere. Web Development, Design, Writing, and Marketing.
                </p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { name: 'Code', icon: Code },
                    { name: 'Design', icon: PenTool },
                    { name: 'Mktg', icon: Smartphone },
                  ].map((s) => (
                    <div key={s.name} className="flex flex-col items-center justify-center p-2 bg-blue-50 dark:bg-blue-900/10 rounded-lg text-center">
                      <s.icon className="w-6 h-6 text-secondary mb-1" />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{s.name}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => onNavigate('find-gigs')} className="w-full py-3 bg-secondary/10 hover:bg-secondary hover:text-white text-secondary font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                  Find Projects <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Workers / "Hamare Heroes" Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Hamare Heroes (Our Heroes)</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Meet the hardworking professionals building a better India.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Raju Bhai', role: 'Electrician', rating: 4.9, img: 'https://images.unsplash.com/photo-1541577141970-eebc83ebe30e?q=80&w=1887&auto=format&fit=crop', jobs: '120+' },
              { name: 'Sunita Devi', role: 'Tailor & Designer', rating: 4.8, img: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?q=80&w=2070&auto=format&fit=crop', jobs: '85+' },
              { name: 'Amit Kumar', role: 'Web Developer', rating: 5.0, img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop', jobs: '45+' },
              { name: 'Vikram Singh', role: 'Carpenter', rating: 4.7, img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop', jobs: '200+' },
            ].map((worker, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-600">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white dark:border-gray-600 shadow-md">
                  <img src={worker.img} alt={worker.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{worker.name}</h3>
                <span className="text-primary text-sm font-medium mb-2">{worker.role}</span>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-300">
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-current" /> {worker.rating}</span>
                  <span>{worker.jobs} Jobs</span>
                </div>
                <button className="mt-4 text-sm font-semibold text-secondary hover:underline">View Profile</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-16 bg-accent/5 dark:bg-accent/10 border-y border-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Workers', value: '5 Lakh+', color: 'text-secondary' },
              { label: 'Monthly Gigs', value: '50,000+', color: 'text-primary' },
              { label: 'Secure Payments', value: '₹100 Cr+', color: 'text-accent' },
              { label: 'Happy Users', value: '98%', color: 'text-gray-800 dark:text-white' },
            ].map((stat) => (
              <div key={stat.label} className="text-center group cursor-default">
                <div className={`text-3xl md:text-5xl font-bold mb-2 ${stat.color} transition-transform group-hover:scale-110 duration-300`}>{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden bg-dark dark:bg-black">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #14a800 25%, transparent 25%, transparent 75%, #14a800 75%, #14a800), linear-gradient(45deg, #14a800 25%, transparent 25%, transparent 75%, #14a800 75%, #14a800)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Shuruat Karein? (Ready to Start?)</h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
            Whether you want to earn extra income or need a helping hand, GigneX is your trusted partner. 
            Join the revolution today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
               onClick={() => onNavigate('auth')}
               className="bg-primary hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-green-900/50"
            >
              <Zap className="w-5 h-5" /> Join as a Worker
            </button>
            <button 
               onClick={() => onNavigate('post-gig')}
               className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:text-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              <Briefcase className="w-5 h-5" /> Post a Gig
            </button>
          </div>
        </div>
      </section>

      {/* Tailwind Custom Animations Style */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;