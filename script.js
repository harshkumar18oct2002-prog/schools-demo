document.addEventListener('DOMContentLoaded', function () {

  /* Navbar scroll shadow */
  var nav = document.querySelector('.site-nav');
  function onScroll(){
    if(!nav) return;
    if(window.scrollY > 12){ nav.classList.add('scrolled'); }
    else { nav.classList.remove('scrolled'); }
    toggleBackToTop();
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* Back to top */
  var backToTop = document.querySelector('.back-to-top');
  function toggleBackToTop(){
    if(!backToTop) return;
    if(window.scrollY > 500){ backToTop.classList.add('show'); }
    else { backToTop.classList.remove('show'); }
  }
  if(backToTop){
    backToTop.addEventListener('click', function(){
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.12});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* Bootstrap form validation */
  var forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add('was-validated');
      if (form.checkValidity()) {
        var successBox = form.parentElement.querySelector('.form-success');
        if(successBox){
          form.classList.add('d-none');
          successBox.classList.remove('d-none');
        }
      }
    }, false);
  });

  /* Gallery lightbox (Bootstrap modal driven) */
  var galleryItems = document.querySelectorAll('[data-gallery-src]');
  var lightboxImg = document.getElementById('lightboxImage');
  var lightboxCaption = document.getElementById('lightboxCaption');
  galleryItems.forEach(function(item){
    item.addEventListener('click', function(){
      if(lightboxImg){
        lightboxImg.src = item.getAttribute('data-gallery-src');
        lightboxCaption.textContent = item.getAttribute('data-gallery-caption') || '';
      }
    });
  });

  /* Set active nav link based on current page */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav .nav-link').forEach(function(link){
    var href = link.getAttribute('href');
    if(href === path){ link.classList.add('active'); }
  });

  /* Testimonial carousel autoplay is handled by Bootstrap's data attributes */
});
