import { useState, useEffect } from 'react';
import { Menu, X, Building2 } from 'lucide-react';
import gsap from 'gsap';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Animate navbar on load
    gsap.fromTo(
      '.navbar-element',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8 }
    );

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Features', 'Benefits', 'Modules', 'Pricing', 'Contact'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/80 backdrop-blur-md border-b border-border' 
        : 'bg-transparent'
    }`}>
      <div className="container px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="navbar-element flex items-center gap-3">
            <Building2 className="text-primary" size={28} />
            <span className="text-xl font-bold">ERP System</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className="navbar-element text-foreground hover:text-primary transition-colors font-medium"
              >
                {item}
              </a>
            ))}
            
            <div className="navbar-element flex items-center gap-4">
              <button className="px-6 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                Sign In
              </button>
              <button className="px-6 py-2 text-white bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-hover transition-colors">
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden navbar-element"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="py-2 text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <button className="py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                  Sign In
                </button>
                <button className="py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-hover transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;