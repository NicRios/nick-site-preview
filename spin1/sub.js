// Shared behaviors for Nick-Rios.com subpages
(function(){
  // staggered reveal on scroll
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){
        var sibs=[].slice.call(e.target.parentNode.children).filter(function(n){return n.classList&&n.classList.contains('reveal');});
        e.target.style.transitionDelay=(Math.max(0,sibs.indexOf(e.target))*70)+'ms';
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  // nav shadow on scroll
  var nav=document.querySelector('nav');
  if(nav){var onScroll=function(){nav.classList.toggle('scrolled',window.scrollY>8);};onScroll();window.addEventListener('scroll',onScroll,{passive:true});}

  // copy-to-clipboard buttons
  document.querySelectorAll('[data-copy]').forEach(function(btn){
    btn.addEventListener('click',function(){
      var sel=btn.getAttribute('data-copy');
      var node=sel?document.querySelector(sel):btn;
      var text=(node&&node.innerText)||btn.getAttribute('data-text')||'';
      if(navigator.clipboard)navigator.clipboard.writeText(text.trim());
      var old=btn.textContent;btn.textContent='copied ✓';setTimeout(function(){btn.textContent=old;},1600);
    });
  });
})();
