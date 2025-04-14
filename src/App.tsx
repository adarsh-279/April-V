import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight, Cake } from 'lucide-react';

const memories = [
  {
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80",
    message: "The day we first met changed my life forever.",
    date: "First Date"
  },
  {
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&q=80",
    message: "Every moment with you feels like a beautiful dream.",
    date: "Our First Trip"
  },
  {
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80",
    message: "Here's to many more years of love and happiness together.",
    date: "Anniversary Day"
  },
  {
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80",
    message: "Your smile brightens up even my darkest days.",
    date: "Special Moments"
  },
  {
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80",
    message: "Thank you for being my rock and my inspiration.",
    date: "Together Forever"
  }
];

const message = {
  title: "My Dearest Love",
  content: `Every moment with you feels like a beautiful dream come true. Your love has filled my life with joy, 
  laughter, and endless happiness. As we celebrate another year together, I want you to know that my heart beats 
  stronger each day with love for you. You're not just my partner, you're my best friend, my soulmate, and my 
  everything. Here's to many more years of creating beautiful memories together. I love you more than words can express.

  Happy Anniversary, my love! ❤️`
};

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showCake, setShowCake] = useState(true);
  const [candleLit, setCandleLit] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [currentIndex]);

  const nextSlide = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % memories.length);
    }, 300);
  };

  const prevSlide = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + memories.length) % memories.length);
    }, 300);
  };

  const handleCakeClick = () => {
    if (candleLit) {
      setCandleLit(false);
      setShowMessage(true);
      setShowCake(false);
    }
  };

  const handleViewMemories = () => {
    setShowGallery(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-8">
            <Heart className="text-red-500 w-8 h-8 animate-pulse" />
            <h1 className="text-4xl font-bold text-gray-800 mx-4">Happy Anniversary</h1>
            <Heart className="text-red-500 w-8 h-8 animate-pulse" />
          </div>

          {showCake && (
            <div className="relative mb-8 flex flex-col items-center">
              <div 
                className="cursor-pointer transform hover:scale-105 transition-transform"
                onClick={handleCakeClick}
              >
                <div className="relative">
                  <Cake className="w-24 h-24 text-pink-400" />
                  {candleLit && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                      <div className="w-2 h-6 bg-yellow-300 rounded-full animate-flicker" />
                      <div className="w-4 h-4 bg-orange-400 rounded-full blur-sm absolute -top-2 left-1/2 -translate-x-1/2 animate-flicker" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {showMessage && !showGallery && (
            <div className="animate-fadeIn">
              <div className="max-w-2xl mx-auto bg-pink-50 rounded-xl p-8 shadow-inner">
                <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">{message.title}</h2>
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {message.content}
                </p>
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleViewMemories}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold 
                    shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    View Our Memories
                  </button>
                </div>
              </div>
            </div>
          )}

          {showGallery && (
            <div className="relative transition-opacity duration-500 opacity-100">
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <img
                  src={memories[currentIndex].image}
                  alt="Memory"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white text-xl font-medium mb-2">
                    {memories[currentIndex].date}
                  </p>
                  <p className="text-white text-lg">
                    {memories[currentIndex].message}
                  </p>
                </div>
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="flex justify-center mt-4 gap-2">
                {memories.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? 'bg-pink-500 w-4' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;