import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";



  const SliderSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slides = [
        {
          title: "Welcome to Our Support System",
          description: "Efficient, fast, and reliable customer support at your fingertips.",
          image: "./ticket1.png?height=600&width=1200",
        },
        {
          title: "24/7 Customer Support",
          description: "Our team is always ready to help you with any issues.",
          image: "/ticket2.jpeg?height=600&width=1200",
        },
        {
          title: "Track Your Tickets",
          description: "Stay updated with real-time status of your support requests.",
          image: "/ticket.webp?height=600&width=1200",
        },
      ]
    
      useEffect(() => {
        const timer = setInterval(() => {
          setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1))
        }, 5000) // Change slide every 5 seconds
    
        return () => clearInterval(timer)
      }, []) // Removed slides.length dependency
    
      const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1))
      }
    
      const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1))
      }
    // ...
    return (
        <section className="relative mx-auto max-w-screen-xl">
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="relative h-[300px] md:h-[500px] w-full">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/40 text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-2">{slide.title}</h2>
                    <p className="text-lg md:text-xl max-w-md">{slide.description}</p>
                  </div>
                  <img
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
  
        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    );
  };

  export default SliderSection