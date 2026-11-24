document.addEventListener("DOMContentLoaded",function(){
  var toggle=document.querySelector(".nav-toggle");
  var nav=document.querySelector(".nav-list");
  if(toggle&&nav){
    toggle.addEventListener("click",function(){
      var open=nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded",open?"true":"false");
      toggle.innerHTML=open?'&times;':'<i class="fa fa-bars" aria-hidden="true"></i>';
    });
    nav.querySelectorAll("a").forEach(function(link){
      link.addEventListener("click",function(){
        if(window.innerWidth<=991&&!link.parentElement.classList.contains("has-dropdown")){
          nav.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");
          toggle.innerHTML='<i class="fa fa-bars" aria-hidden="true"></i>';
        }
      });
    });
  }
  document.querySelectorAll("[data-current-year]").forEach(function(el){el.textContent=new Date().getFullYear();});
  if(new URLSearchParams(window.location.search).get("submitted")==="1"){
    var target=document.querySelector("[data-form-success]");
    if(target){target.hidden=false;target.scrollIntoView({behavior:"smooth",block:"center"});}
  }

  // Accessible homepage testimonial carousel: manual controls and gentle rotation.
  var slider=document.querySelector("[data-testimonial-slider]");
  if(slider){
    var slides=Array.from(slider.querySelectorAll(".testimonial-slide"));
    var dots=Array.from(slider.querySelectorAll("[data-testimonial-dot]"));
    var current=0,rotation=null;
    var reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function showSlide(index){
      current=(index+slides.length)%slides.length;
      slides.forEach(function(slide,i){
        var active=i===current;
        slide.classList.toggle("is-active",active);
        slide.setAttribute("aria-hidden",active?"false":"true");
        if(active){slide.removeAttribute("inert");}else{slide.setAttribute("inert","");}
      });
      dots.forEach(function(dot,i){
        var active=i===current;
        dot.classList.toggle("is-active",active);
        if(active){dot.setAttribute("aria-current","true");}else{dot.removeAttribute("aria-current");}
      });
    }
    function stopRotation(){if(rotation){window.clearInterval(rotation);rotation=null;}}
    function startRotation(){
      stopRotation();
      if(!reduced && !document.hidden){rotation=window.setInterval(function(){showSlide(current+1);},6000);}
    }
    var prev=slider.querySelector("[data-testimonial-prev]");
    var next=slider.querySelector("[data-testimonial-next]");
    if(prev)prev.addEventListener("click",function(){showSlide(current-1);startRotation();});
    if(next)next.addEventListener("click",function(){showSlide(current+1);startRotation();});
    dots.forEach(function(dot){dot.addEventListener("click",function(){showSlide(Number(dot.getAttribute("data-testimonial-dot")));startRotation();});});
    slider.addEventListener("mouseenter",stopRotation);
    slider.addEventListener("mouseleave",startRotation);
    slider.addEventListener("focusin",stopRotation);
    slider.addEventListener("focusout",startRotation);
    document.addEventListener("visibilitychange",function(){if(document.hidden){stopRotation();}else{startRotation();}});
    showSlide(0);startRotation();
  }

});
