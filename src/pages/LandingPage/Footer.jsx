import { useEffect, useRef } from 'react';
import { 
  Building2, Mail, Phone, MapPin, 
  Facebook, Twitter, Linkedin, Instagram 
} from 'lucide-react';
import gsap from 'gsap';

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    // Animate footer elements
    gsap.fromTo(
      '.footer-element',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%'
        }
      }
    );
  }, []);

  const footerLinks = {
    Product: ['Features', 'Pricing', 'Modules', 'API Docs', 'Status'],
    Company: ['About', 'Careers', 'Press', 'Blog', 'Partners'],
    Support: ['Help Center', 'Documentation', 'Community', 'Contact', 'Training'],
    Legal: ['Privacy', 'Terms', 'Security', 'Cookies', 'GDPR']
  };

  return (
    <footer ref={footerRef} className="bg-card border-t border-border">
      <div className="container px-4 mx-auto py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div className="footer-element">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="text-primary" size={32} />
              <span className="text-2xl font-bold">ERP System</span>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-md">
              Enterprise Resource Planning solution that transforms how businesses 
              manage their operations, finances, and growth.
            </p>
            
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full border border-input flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-colors"
                >
                  <Icon size={20} className="text-muted-foreground hover:text-primary" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="footer-element">
                <h3 className="font-semibold text-lg mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              { icon: Mail, text: 'support@erpsystem.com' },
              { icon: Phone, text: '+1 (555) 123-4567' },
              { icon: MapPin, text: '123 Business St, Suite 100, New York, NY' }
            ].map((item, index) => (
              <div key={index} className="footer-element flex items-center gap-3">
                <item.icon className="text-primary" size={20} />
                <span className="text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="footer-element text-center md:text-left border-t border-border pt-8">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} ERP System. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;