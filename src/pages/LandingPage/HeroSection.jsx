import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const navigate = useNavigate();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Hero animations
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
    );

    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.4, ease: 'back.out(1.7)' }
    );

    // Background elements animation
    gsap.to('.hero-bg-element', {
      y: 30,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-16"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="hero-bg-element absolute rounded-full bg-primary/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            ref={titleRef} 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="block text-foreground">Streamline Your Business</span>
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              With Modern ERP
            </span>
          </h1>
          
          <p 
            ref={subtitleRef} 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            All-in-one enterprise resource planning system that integrates finance, 
            inventory, sales, HR, and more into a single unified platform.
          </p>
          
          <div 
            ref={ctaRef} 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary-hover transition-all duration-300 text-white transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
              Start Free Trial
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            
            <button onClick={()=> navigate('/login')} className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold text-lg hover:bg-primary/10 transition-all duration-300 flex items-center gap-2">
              Book Demo
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Real-time Analytics', value: '100%' },
              { label: 'Modules', value: '8+' },
              { label: 'Integration', value: 'Seamless' },
              { label: 'Support', value: '24/7' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="stat-item opacity-0"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;