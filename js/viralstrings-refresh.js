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
});