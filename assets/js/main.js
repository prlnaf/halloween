const spider = document.querySelector('.place__spider');
const place = document.querySelector('.place');

if (spider && place) {
  const showSpider = () => {
    spider.classList.add('is-active');
  };

  const isPlaceInView = () => {
    const placeRect = place.getBoundingClientRect();

    return placeRect.top < window.innerHeight * 0.7 && placeRect.bottom > 0;
  };

  if ('IntersectionObserver' in window) {
    const spiderObserver = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        showSpider();
        observer.unobserve(place);
      }
    }, {
      rootMargin: '0px 0px -30% 0px',
    });

    spiderObserver.observe(place);

    requestAnimationFrame(() => {
      if (isPlaceInView()) {
        showSpider();
        spiderObserver.unobserve(place);
      }
    });
  } else {
    const onScroll = () => {
      if (isPlaceInView()) {
        showSpider();
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll);
    onScroll();
  }
} else if (spider) {
  spider.classList.add('is-active');
}

if ('matchMedia' in window && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  spider?.classList.add('is-active');
}

const qaButtons = document.querySelectorAll('.qa__item');

qaButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const answerId = button.getAttribute('aria-controls');
    const answer = document.getElementById(answerId);

    if (!answer) {
      return;
    }

    const isOpen = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', String(!isOpen));
    answer.hidden = isOpen;
  });
});
