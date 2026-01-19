"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"

// Custom hook for counting up numbers
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0)
  const countRef = useRef<number>(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  useEffect(() => {
    if (!inView) return
    
    const startTime = Date.now()
    const timer = setInterval(() => {
      const timePassed = Date.now() - startTime
      const progress = Math.min(timePassed / duration, 1)
      
      countRef.current = Math.floor(progress * end)
      setCount(countRef.current)
      
      if (progress === 1) clearInterval(timer)
    }, 50)
    
    return () => clearInterval(timer)
  }, [end, duration, inView])

  return { count, ref }
}

const stats = [
  { label: "Years of Excellence", value: 25 },
  { label: "Clients Served", value: 850 },
  { label: "Assets Managed", prefix: "$", value: 24, suffix: "B+" },
  { label: "Team Members", value: 120 }
]

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      setIsVisible(true)
    }
  }, [inView])

  return (
    <section id="about" className="relative py-20 md:py-28 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image Grid */}
          <div 
            className={cn(
              "relative grid grid-cols-2 gap-4 transition-all duration-1000 ease-out",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            )}
          >
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Wealth Management Team Meeting"
                  className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Financial Analysis"
                  className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://images.pexels.com/photos/5691698/pexels-photo-5691698.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Investment Planning"
                  className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Wealth Advisory"
                  className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div 
            className={cn(
              "transition-all duration-1000 ease-out delay-300",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            )}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold tracking-tight">
              Redefining Wealth Management for Discerning Clients
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Since our founding, Apex Wealth has been guided by a single mission: to provide sophisticated, bespoke wealth management solutions that address the complex needs of high-net-worth individuals and families.
            </p>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Our approach combines deep expertise in financial markets with a personalized understanding of each client's unique circumstances, goals, and values.
            </p>
            
            {/* Statistics */}
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10">
              {stats.map((stat, index) => {
                const { count, ref } = useCountUp(stat.value)
                return (
                  <div key={index} ref={ref} className="flex flex-col">
                    <div className="font-playfair text-3xl md:text-4xl font-bold text-primary">
                      {stat.prefix}{count}{stat.suffix}
                    </div>
                    <div className="mt-2 text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}