import { useEffect, useRef } from 'react';
import { Mail, MessageSquare, Calendar } from 'lucide-react';
import gsap from 'gsap';

const CTASection = () => {
  const ctaRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // Animate CTA section
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 80%'
        }
      }
    );

    // Animate form elements
    gsap.fromTo(
      '.cta-form-element',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 70%'
        }
      }
    );
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container px-4 mx-auto">
        <div ref={ctaRef} className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Ready to Transform Your </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Business?
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have streamlined their operations with our ERP system.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="cta-form-element bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Free Trial</h3>
              <p className="text-muted-foreground mb-4">Try all features free for 14 days</p>
              <button className="w-full py-3 bg-primary text-white text-primary-foreground rounded-lg font-semibold hover:bg-primary-hover transition-colors">
                Sign Up Free
              </button>
            </div>

            <div className="cta-form-element bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Demo</h3>
              <p className="text-muted-foreground mb-4">See the system in action </p>
              <button className="w-full py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                Request Demo
              </button>
            </div>

            <div className="cta-form-element bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Consultation</h3>
              <p className="text-muted-foreground mb-4">Get personalized </p>
              <button className="w-full py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                Schedule Call
              </button>
            </div>
          </div>

          <div className="cta-form-element bg-card rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
            <p className="text-muted-foreground mb-6">Leave your details and we'll contact you within 24 hours</p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Company Name"
                className="px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <textarea
              placeholder="Tell us about your requirements..."
              rows="3"
              className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary mb-6"
            />
            
            <button className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary-hover transition-all text-white duration-300 transform hover:scale-[1.02]">
              Request Custom Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;