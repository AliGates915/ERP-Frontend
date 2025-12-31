import { useEffect, useRef } from 'react';
import { 
  BarChart3, Package, Users, ShoppingCart, 
  Building2, Factory, Target, FileText 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: BarChart3,
    title: 'Finance & Accounting',
    description: 'Complete financial management with real-time reporting and analytics',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Package,
    title: 'Inventory Management',
    description: 'Track stock levels, automate reordering, and manage warehouses',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: ShoppingCart,
    title: 'Sales & CRM',
    description: 'Manage customer relationships, orders, and sales pipeline',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Building2,
    title: 'Procurement',
    description: 'Streamline purchasing, vendor management, and supply chain',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Users,
    title: 'Human Resources',
    description: 'Employee management, payroll, attendance, and recruitment',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'Production planning, quality control, and work orders',
    color: 'from-amber-500 to-yellow-500'
  },
  {
    icon: Target,
    title: 'Project Management',
    description: 'Plan, track, and manage projects with resource allocation',
    color: 'from-rose-500 to-red-500'
  },
  {
    icon: FileText,
    title: 'Reporting & Analytics',
    description: 'Custom dashboards, KPIs, and business intelligence',
    color: 'from-teal-500 to-green-500'
  }
];

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Animate cards on scroll
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    // Animate section title
    gsap.fromTo(
      '.section-title',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        }
      }
    );
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Comprehensive </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ERP Modules
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything your business needs in one integrated platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                ref={addToRefs}
                className="group bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white" size={24} />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                
                <div className="flex items-center text-primary font-medium">
                  <span className="text-sm">Learn more</span>
                  <div className="ml-2 w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">
                    →
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workflow visualization */}
        <div className="mt-20 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Seamless Workflow Integration</h3>
          <div className="relative">
           
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
              {[
                { step: 'Sales Order', desc: 'Create order' },
                { step: 'Inventory', desc: 'Auto stock update' },
                { step: 'Finance', desc: 'Generate invoice' },
                { step: 'Procurement', desc: 'Reorder stock' },
                { step: 'HR', desc: 'Commission tracking' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto bg-background border-2 border-primary rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">{index + 1}</span>
                  </div>
                  <h4 className="font-semibold mb-1">{item.step}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;