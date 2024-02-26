$(function () {
  let images = [
    "https://lh3.google.com/u/0/d/1xSs-pUpYua95YwrX1goyREpPB-J6C-2W=w2560-h1316-iv1",
    "https://lh3.google.com/u/0/d/10NAMBirnR7GJFfbb75csr220I_EtYHoI=w2560-h1316-iv1",
    "https://lh3.google.com/u/0/d/1hFRnHF68OK6AI3V_bG9VUVBkBLjU5tnt=w2560-h1316-iv1",
    "https://lh3.google.com/u/0/d/1NJyd0NniXhjuJe8nwbkrsY725SW0pOYk=w2560-h1316-iv1",
    "https://lh3.google.com/u/0/d/15vEbOVv7HmsLPsIIy3BJ5mposvj3gosI=w2560-h1316-iv1"
  ]

  class gsapSlider {
    constructor(images, slides, container) {
      this.images = images;
      this.slides = slides;
      this.imageContainer = $('.slider-images');
      this.container = container;
      this.imageSlides;
      this.pagination;
      this.cur = slides.length - 1;
      this.playing = false;

      this.setupImages();
      this.setupGsap();
      this.setPagination();
      this.setButtons();
      this.moveSlide(0);
    }

    setupImages() {
      let backgrounds = $('<div />', {
        class: 'backgrounds'
      });

      this.images.forEach((image, i) => {
        let imageSlide = $('<div />', {
          class: 'slide-image'
        })
        imageSlide.append($('<img />', {
          src: image
        }));
        this.imageContainer.append(imageSlide);

        backgrounds.append(this.setupBackground(image, i));
      })

      this.imageSlides = $('.slide-image');
      this.imageContainer.prepend(backgrounds);
    }

    setupBackground(image, i) {
      let bgslide = $('<div />', {
        class: 'bg-pieces bg-' + i.toString()
      });

      let bgpiece = $('<div />').css({
        backgroundImage: 'url("' + image + '")',
      })

      bgpiece.clone().addClass('bgpiece one').appendTo(bgslide);
      bgpiece.clone().addClass('bgpiece two').appendTo(bgslide);
      bgpiece.clone().addClass('bgpiece three').appendTo(bgslide);
      bgpiece.clone().addClass('bgpiece four').appendTo(bgslide);

      return bgslide;
    }

    setupGsap() {
      gsap.set(this.slides, { y: 40, opacity: 0 })
      gsap.set('.one', { left: '110vw' });
      gsap.set('.two', { left: '100vw' });
      gsap.set('.three', { left: '-100vw' });
      gsap.set('.four', { left: '-100vw' });
      gsap.set('.slide-image', { y: -600 });
    }

    setButtons() {
      $('.nav-next').click(() => {
        this.moveSlide((this.cur < this.slides.length - 1) ? this.cur + 1 : 0);
      })

      $('.nav-prev').click(() => {
        this.moveSlide((this.cur == 0) ? this.slides.length - 1 : this.cur - 1);
      })

      $('.page-trigger').click((event) => {
        this.moveSlide($(event.target).data('page') - 1);
      })
    }

    moveSlide(next) {
      if (this.playing) {
        return;
      }

      let text = this.slides[this.cur];
      let inner = this.imageSlides[this.cur];
      let bgPieces = $('.bg-pieces')[this.cur];

      let tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: 'power2.in',
        }
      });

      tl
        .to('.four',
          { left: -1200, opacity: 0, duration: .5 })
        .to(inner,
          { opacity: 0, duration: .6 }, .2)
        .to(inner,
          { y: -400, duration: .5 }, .4)
        .to('.two',
          { left: -1100, opacity: 0, duration: .5 }, .3)
        .to('.three',
          { left: 1400, opacity: 0, duration: .5 }, .2)
        .to('.one',
          { left: 1400, opacity: 0, duration: .5 }, .4)
        .to(text,
          { opacity: '0', duration: .4 }, .1)
        .to(text,
          { y: 40, duration: .6 }, '<');

      this.cur = next;

      $('.current').removeClass('current');
      this.pagination.find('.page-' + (this.cur + 1)).addClass('current');
      text = this.slides[this.cur];
      inner = this.imageSlides[this.cur];
      bgPieces = $('.bg-pieces')[this.cur];

      tl
        .to(text,
          { y: 0, opacity: '1', duration: .8 }, .5)
        .to(bgPieces.querySelector('.one'),
          { left: 0, opacity: 0.9, duration: .5, ease: 'power1.out' }, .4)
        .to(bgPieces.querySelector('.three'),
          { left: '-50px', opacity: 0.9, duration: .5 }, '<.1')
        .to(bgPieces.querySelector('.two'),
          { left: '-100px', opacity: 0.9, duration: .6 }, '<.1')
        .to(bgPieces.querySelector('.four'),
          { left: '40px', opacity: 0.9, duration: .6, ease: 'power1.out' }, '<.2')
        .fromTo(inner,
          { y: 400, immediateRender: false }, { y: 0, duration: .4, ease: 'power1.out' }, '<.2')
        .to(inner,
          { opacity: 1, duration: .4 }, '<')
        .to(inner.querySelector('img'), .2,
          { scale: 1.08, ease: "power1.out" }, '<')
        .to(inner.querySelector('img'), .5,
          { scale: 1, ease: "power1.out" }, '<+.2')
        .then(() => {
          this.playing = false;
        })

      tl.play();
      this.playing = true;

    }

    setPagination() {
      let pagination = $('<div />', {
        class: 'pagination'
      });

      let len = this.slides.length;

      for (let i = 1; i <= len; i++) {
        pagination.append($('<div/>', {
          class: "page-trigger page-" + i,
          'data-page': i,
        }).append(i))
      }

      this.pagination = pagination;
      this.pagination.insertAfter(this.container);

    }

  }

  let slider = new gsapSlider(images, $('.slide'), $('.container'))

});