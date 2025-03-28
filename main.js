document.addEventListener("DOMContentLoaded", function () {
  //cursor
  
  var crsr = document.querySelector("#cursor");
    var blur = document.querySelector("#cursor-blur");

    document.addEventListener("mousemove", function (dets) {
        crsr.style.left = dets.x + "px";
        crsr.style.top = dets.y + "px";
        blur.style.left = dets.x - 250 + "px";
        blur.style.top = dets.y - 250 + "px";
    });
  // Pre-loader animation
  const digit1 = document.querySelector(".digit-1");
  const digit2 = document.querySelector(".digit-2");
  const digit3 = document.querySelector(".digit-3");

  function splitTextIntoSpans(selector) {
      var element = document.querySelector(selector);
      if (element) {
          var text = element.innerText;
          var splitText = text
              .split("")
              .map((char) => `<span>${char}</span>`)
              .join("");
          element.innerHTML = splitText;
      }
  }
  splitTextIntoSpans(".header h1");

  for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
          const div = document.createElement("div");
          div.className = "num";
          div.textContent = j;
          digit3.appendChild(div);
      }
  }
  const finalDigit = document.createElement("div");
  finalDigit.className = "num";
  finalDigit.textContent = "0";
  digit3.appendChild(finalDigit);

  function animate(digit, duration, delay = 1) {
      const numHeight = digit.querySelector(".num").clientHeight;
      const totalDistance = (digit.querySelectorAll(".num").length - 1) * numHeight;
      gsap.to(digit, {
          y: -totalDistance,
          duration: duration,
          delay: delay,
          ease: "power2.inOut",
      });
  }
  animate(digit3, 5);
  animate(digit2, 6);
  animate(digit1, 2, 5);

  gsap.to(".progress-bar", {
      width: "30%",
      duration: 2,
      ease: "power4.inOut",
      delay: 7,
  });

  gsap.to(".progress-bar", {
      width: "100%",
      opacity: 0,
      duration: 2,
      ease: "power3.inOut",
      delay: 8.5,
      onComplete: () => {
          gsap.set(".pre-loader", { display: "none" });
      },
  });

  gsap.to(".pre-loader", {
      opacity: 0,
      delay: 7,
      duration: 1,
      onComplete: () => {
          document.querySelector(".pre-loader").style.display = "none";
      },
  });
});

var controller = new ScrollMagic.Controller();

$(function () {
  //var tween = TweenMax.to(".block-list", 1, {className: "+=scrollend"});
  
  var $block_list = $('.block-list'),
      $block_item = $block_list.find('.block-list__item'),
      block_list_width = $block_list.outerWidth(),
      block_item_width = $block_item.outerWidth(),
      total_width = block_item_width * $block_item.length,
      travel_distance = total_width - block_list_width + 20;
  
  var scene = new ScrollMagic.Scene({
    triggerElement: "#second", 
    duration: '200%',
    triggerHook: 0
  })
  .setPin('.block-list')
  //.setTween(tween)
  .addTo(controller);
  
  scene.on('progress', function(e) {
    var progress = e.progress,
        move = -travel_distance * progress + "px";
    $block_list.css({
      transform: "translateX(" + move + ")"
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const eventsSection = document.getElementById('second');
    let lastScrollTop = 0;
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Check if events section is in viewport
        if (isInViewport(eventsSection)) {
            navbar.classList.add('hide');
        } else {
            navbar.classList.remove('hide');
        }
        
        lastScrollTop = scrollTop;
    });

    // Hacker effect for menu links
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    document.querySelectorAll('.menu-link').forEach(link => {
        const originalText = link.textContent;
        link.setAttribute('data-text', originalText);
        
        link.addEventListener('mouseenter', event => {
            let iterations = 0;
            const interval = setInterval(() => {
                event.target.textContent = event.target.textContent
                    .split("")
                    .map((letter, index) => {
                        if(index < iterations) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * 26)]
                    })
                    .join("");
                
                if(iterations >= originalText.length) {
                    clearInterval(interval);
                }
                
                iterations += 1/3;
            }, 30);
        });
        
        link.addEventListener('mouseleave', event => {
            event.target.textContent = originalText;
        });
    });
});

function checkPDFExists(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (response.ok) {
                    resolve(true);
                } else {
                    reject(false);
                }
            })
            .catch(() => reject(false));
    });
}

document.querySelectorAll('.rulebook-btn').forEach(button => {
    button.addEventListener('click', async function(e) {
        e.preventDefault();
        const pdfPath = this.getAttribute('href');
        
        try {
            const exists = await checkPDFExists(pdfPath);
            if (exists) {
                window.open(pdfPath, '_blank');
            } else {
                alert('PDF file not found. Please try again later.');
            }
        } catch (error) {
            console.error('Error checking PDF:', error);
            alert('Unable to access PDF. Please try again later.');
        }
    });
});