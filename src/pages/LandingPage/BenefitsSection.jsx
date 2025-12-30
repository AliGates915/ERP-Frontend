import { useEffect, useRef } from "react";
import {
  CheckCircle,
  Zap,
  Link as LinkIcon,
  Eye,
  TrendingUp,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Zap,
    title: "Automation",
    description:
      "Reduce manual work with automated processes across all departments",
    stats: "70% faster processes",
  },
  {
    icon: LinkIcon,
    title: "Integration",
    description: "Seamlessly connect finance, HR, inventory, and sales modules",
    stats: "One unified system",
  },
  {
    icon: Eye,
    title: "Real-time Insights",
    description: "Make data-driven decisions with live dashboards and reports",
    stats: "Real-time updates",
  },
  {
    icon: TrendingUp,
    title: "Scalability",
    description:
      "Grow your business with multi-branch and multi-location support",
    stats: "Unlimited growth",
  },
];

const BenefitsSection = () => {
  const sectionRef = useRef(null);
  const benefitsRef = useRef([]);

  useEffect(() => {
    // Animate benefits items
    benefitsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -30 : 30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // Animate checklist
    gsap.fromTo(
      ".checklist-item",
      {
        opacity: 0,
        x: -20,
      },
      {
        opacity: 1,
        x: 0,
        stagger: 0.2,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  const addToRefs = (el) => {
    if (el && !benefitsRef.current.includes(el)) {
      benefitsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 rounded-full">
              <span className="text-primary text-sm font-semibold">
                Why Choose Us
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Transform Your </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Business Operations
              </span>
            </h2>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Our ERP system centralizes all your business processes, providing
              a single source of truth and eliminating data silos across
              departments.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Centralized database for all departments",
                "Automated workflows and processes",
                "Real-time reporting and analytics",
                "Scalable for business growth",
                "24/7 customer support",
                "Easy integration with existing tools",
              ].map((item, index) => (
                <div
                  key={index}
                  className="checklist-item flex items-start gap-3 group"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <CheckCircle className="text-primary" size={16} />
                  </div>
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              Get Started Today
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  ref={addToRefs}
                  className="bg-card/80 backdrop-blur-sm rounded-2xl p-7 border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-primary" size={26} />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {benefit.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {benefit.description}
                  </p>

                  <div className="inline-block px-3 py-1.5 bg-primary/10 rounded-lg">
                    <span className="text-primary font-bold text-sm">
                      {benefit.stats}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "99%", label: "Client Satisfaction" },
            { value: "50%", label: "Cost Reduction" },
            { value: "3x", label: "Faster Reporting" },
            { value: "24/7", label: "Support Available" },
          ].map((stat, index) => (
            <div
              key={index}
              className="opacity-0 stat-card text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              ref={(el) => {
                if (el) {
                  gsap.fromTo(
                    el,
                    { opacity: 0, y: 20 },
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.8,
                      delay: index * 0.1,
                      scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                      },
                    }
                  );
                }
              }}
            >
              <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-semibold text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
