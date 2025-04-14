const memories = [
    {
        image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80",
        message: "The day we first met changed my life forever.",
        date: "First Meet"
    },
    {
        image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&q=80",
        message: "Every moment with you feels like a beautiful dream.",
        date: "Our First School Pic"
    },
    {
        image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80",
        message: "The day we first met changed my life forever.",
        date: "First Date"
    },
    {
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80",
        message: "Here's to many more years of love and happiness together.",
        date: "1st Anniversary Day"
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

let currentIndex = 0;

function randomizeBalloonPositions() {
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach(balloon => {
        const randomOffset = Math.random() * 100 - 1; // Random offset between -10px and 10px
        balloon.style.marginTop = `${randomOffset}px`;
    });
}
function handleCakeClick() {
    const candle = document.getElementById('candle');
    const cakeSection = document.getElementById('cakeSection');
    const messageSection = document.getElementById('messageSection');
    const balloonContainer = document.getElementById('balloonContainer');

    if (candle && cakeSection && messageSection && balloonContainer) {
        candle.style.display = 'none';
        setTimeout(() => {
            cakeSection.style.display = 'none';
            balloonContainer.classList.remove('hidden');
            randomizeBalloonPositions(); // Randomize positions before showing
            setTimeout(() => {
                balloonContainer.classList.add('visible');
                setTimeout(() => {
                    balloonContainer.style.display = 'none';
                    messageSection.classList.remove('hidden');
                    setTimeout(() => {
                        messageSection.classList.add('visible');
                    }, 50);
                }, 2000); // Duration for balloons to rise
            }, 50);
        }, 500);
    } else {
        console.error('One or more elements are missing.');
    }
}

// Ensure other functions are correctly accessing elements and updating the DOM
function showMemories() {
    const messageSection = document.getElementById('messageSection');
    const gallerySection = document.getElementById('gallerySection');

    if (messageSection && gallerySection) {
        messageSection.classList.remove('visible');
        setTimeout(() => {
            messageSection.classList.add('hidden');
            gallerySection.classList.remove('hidden');
            setTimeout(() => {
                gallerySection.classList.add('visible');
                updateGallery();
                createDots();
            }, 50);
        }, 500);
    } else {
        console.error('Message or gallery section is missing.');
    }
}

function updateGallery() {
    const currentImage = document.getElementById('currentImage');
    const imageDate = document.getElementById('imageDate');
    const imageMessage = document.getElementById('imageMessage');

    currentImage.style.opacity = '0';

    setTimeout(() => {
        currentImage.src = memories[currentIndex].image;
        imageDate.textContent = memories[currentIndex].date;
        imageMessage.textContent = memories[currentIndex].message;
        currentImage.style.opacity = '1';
        updateDots();
    }, 300);
}

function createDots() {
    const dotsContainer = document.getElementById('dotsContainer');
    dotsContainer.innerHTML = '';

    memories.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === currentIndex ? 'active' : ''}`;
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.className = `dot ${index === currentIndex ? 'active' : ''}`;
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % memories.length;
    updateGallery();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + memories.length) % memories.length;
    updateGallery();
}