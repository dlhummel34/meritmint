"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const categories = ["All", "Market Analysis", "Wealth Planning", "Investment Strategies", "Tax Insights"]

const articles = [
  {
    id: 1,
    title: "The Future of Sustainable Investing",
    excerpt: "How ESG considerations are reshaping portfolio management strategies for long-term growth.",
    category: "Investment Strategies",
    date: "May 15, 2025",
    image: "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    title: "Navigating Market Volatility",
    excerpt: "Strategic approaches to maintaining portfolio stability during uncertain economic conditions.",
    category: "Market Analysis",
    date: "May 8, 2025",
    image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    title: "Estate Planning for the Next Generation",
    excerpt: "Modern approaches to wealth transfer that align with your family values and goals.",
    category: "Wealth Planning",
    date: "April 22, 2025",
    image: "https://images.pexels.com/photos/5836/yellow-metal-design-decoration.jpg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 4,
    title: "Tax Optimization Strategies for High-Net-Worth Individuals",
    excerpt: "Innovative approaches to minimize tax liabilities while ensuring compliance.",
    category: "Tax Insights",
    date: "April 15, 2025",
    image: "https://images.pexels.com/photos/210574/pexels-photo-210574.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 5,
    title: "The Role of Alternative Investments",
    excerpt: "Exploring private equity, real estate, and other alternative asset classes in a diversified portfolio.",
    category: "Investment Strategies",
    date: "April 8, 2025",
    image: "https://images.pexels.com/photos/9660/business-money-pink-coins.jpg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 6,
    title: "Global Market Trends to Watch",
    excerpt: "Key economic indicators and market developments shaping investment opportunities worldwide.",
    category: "Market Analysis",
    date: "March 30, 2025",
    image: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
]

export function InsightsSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const filteredArticles = activeCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === activeCategory)
  
  const displayedArticles = filteredArticles.slice(currentIndex, currentIndex + 3)
  
  const nextSlide = () => {
    if (currentIndex < filteredArticles.length - 3) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }
  
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(Math.max(0, filteredArticles.length - 3))
    }
  }

  return (
    <section id="insights" className="relative py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold tracking-tight">
              Latest Insights
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Stay informed with our latest perspectives on markets, wealth planning, and investment strategies.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0 flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={filteredArticles.length <= 3}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={filteredArticles.length <= 3}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setActiveCategory(category)
                setCurrentIndex(0)
              }}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Articles carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex + activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {displayedArticles.map((article) => (
                <Card
                  key={article.id}
                  className="group overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-md hover:border-primary/20"
                >
                  <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex items-center text-xs text-muted-foreground">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium mr-2">
                        {article.category}
                      </span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="font-playfair text-xl font-semibold line-clamp-2 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                    <Button variant="ghost" className="px-0 text-primary hover:text-primary/80 hover:bg-transparent">
                      Read more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="mt-12 text-center">
          <Button>View All Insights</Button>
        </div>
      </div>
    </section>
  )
}