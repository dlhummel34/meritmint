"use client"

import { useEffect } from "react"
import { ArrowUpRight, LineChart, Shield, Building, Users, Briefcase, BadgeDollarSign } from "lucide-react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const services = [
  {
    title: "Investment Advisory",
    description: "Customized investment strategies designed to preserve and grow your wealth across market cycles.",
    icon: LineChart,
  },
  {
    title: "Wealth Protection",
    description: "Comprehensive risk management solutions to safeguard your assets for generations to come.",
    icon: Shield,
  },
  {
    title: "Estate Planning",
    description: "Sophisticated strategies for efficient wealth transfer aligned with your legacy goals.",
    icon: Building,
  },
  {
    title: "Family Office",
    description: "Integrated management of your family's financial, personal, and legacy needs.",
    icon: Users,
  },
  {
    title: "Business Advisory",
    description: "Expert guidance for entrepreneurs and business owners at every stage of the business lifecycle.",
    icon: Briefcase,
  },
  {
    title: "Tax Optimization",
    description: "Strategic tax planning to minimize liabilities while maintaining compliance.",
    icon: BadgeDollarSign,
  },
]

export function ServicesSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="services" className="relative py-20 md:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold tracking-tight">
            Comprehensive Solutions
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our tailored services address the complex financial needs of high-net-worth individuals, families, and institutions.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="font-playfair text-xl font-semibold tracking-tight mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              <div className="mt-6 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Learn more
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}