const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('nav');
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
document.querySelectorAll('[data-event]').forEach(link=>link.addEventListener('click',()=>{document.querySelector('select[name="event"]').value=link.dataset.event;}));
const today=new Date();document.getElementById('year').textContent=today.getFullYear();
const dateInput=document.getElementById('event-date');
function updateDateMinimum(){
 const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
 const part=type=>parts.find(value=>value.type===type).value;
 dateInput.min=part('year')+'-'+part('month')+'-'+part('day');
}
function validateEventDate(){
 updateDateMinimum();dateInput.setCustomValidity('');if(!dateInput.value)return;
 const match=/^(\d{4})-(\d{2})-(\d{2})$/.exec(dateInput.value);
 if(!match){dateInput.setCustomValidity('Choose a valid event date using the calendar.');return;}
 const [,year,month,day]=match.map(Number),chosen=new Date(Date.UTC(year,month-1,day));
 if(chosen.getUTCFullYear()!==year||chosen.getUTCMonth()!==month-1||chosen.getUTCDate()!==day){dateInput.setCustomValidity('Choose a valid calendar date.');return;}
 if(dateInput.value<dateInput.min)dateInput.setCustomValidity('Choose today or a future event date.');
}
updateDateMinimum();
dateInput.addEventListener('input',validateEventDate);
dateInput.addEventListener('change',validateEventDate);
dateInput.addEventListener('click',()=>{if(typeof dateInput.showPicker==='function'){try{dateInput.showPicker();}catch{}}});
document.getElementById('inquiry-form').addEventListener('reset',()=>dateInput.setCustomValidity(''));
// Pause automatic photo rotation for reduced motion, keyboard focus, or a hidden tab.
const slideshow=document.querySelector('.hero-photo');
const slides=Array.from(slideshow.querySelectorAll('.hero-slide'));
const slideCount=document.getElementById('slide-count');
const pauseButton=document.getElementById('slide-pause');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let currentSlide=0,rotationTimer=null,userPaused=reducedMotion.matches,focusWithin=false;
function showSlide(index){
 currentSlide=(index+slides.length)%slides.length;
 slides.forEach((slide,i)=>{slide.classList.toggle('is-active',i===currentSlide);slide.setAttribute('aria-hidden',String(i!==currentSlide));});
 slideCount.textContent=(currentSlide+1)+' / '+slides.length;
}
function updateRotation(){
 if(rotationTimer!==null){clearInterval(rotationTimer);rotationTimer=null;}
 pauseButton.textContent=userPaused?'Play':'Pause';
 pauseButton.setAttribute('aria-label',userPaused?'Start photo rotation':'Pause photo rotation');
 if(!userPaused&&!focusWithin&&!document.hidden)rotationTimer=setInterval(()=>showSlide(currentSlide+1),2000);
}
document.getElementById('slide-previous').addEventListener('click',()=>{showSlide(currentSlide-1);updateRotation();});
document.getElementById('slide-next').addEventListener('click',()=>{showSlide(currentSlide+1);updateRotation();});
pauseButton.addEventListener('click',()=>{userPaused=!userPaused;updateRotation();});
slideshow.addEventListener('focusin',()=>{focusWithin=true;updateRotation();});
slideshow.addEventListener('focusout',e=>{if(!slideshow.contains(e.relatedTarget)){focusWithin=false;updateRotation();}});
document.addEventListener('visibilitychange',updateRotation);
reducedMotion.addEventListener('change',e=>{userPaused=e.matches;updateRotation();});
showSlide(0);updateRotation();

// Rotate feature photos together every two seconds, respecting reduced motion.
(()=>{
 const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
 const groups=[['.frame-showcase','.frame-design'],['.prints-showcase','.print-photo'],['.qr-showcase','.qr-photo'],['.extras-showcase','.extras-photo']].map(([selector,photoSelector])=>({element:document.querySelector(selector),photoSelector,index:0})).filter(group=>group.element).map(group=>({...group,photos:Array.from(group.element.querySelectorAll(group.photoSelector))}));
 let timer=null;
 function update(){if(timer!==null)clearInterval(timer);timer=null;if(!motion.matches&&!document.hidden)timer=setInterval(()=>{groups.forEach(group=>{group.index=(group.index+1)%group.photos.length;group.photos.forEach((photo,i)=>{photo.classList.toggle('is-current',i===group.index);photo.setAttribute('aria-hidden',String(i!==group.index));});});},2000);}
 document.addEventListener('visibilitychange',update);motion.addEventListener('change',update);update();
})();

// The complete original event gallery scrolls manually, independently of feature rotation.
(()=>{
 const gallery=document.querySelector('.event-gallery');if(!gallery)return;
 const prev=document.querySelector('[data-gallery-prev]'),next=document.querySelector('[data-gallery-next]');
 const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
 function move(direction){const photo=gallery.querySelector('figure');const gap=parseFloat(getComputedStyle(gallery).gap)||0;gallery.scrollBy({left:direction*(photo.getBoundingClientRect().width+gap),behavior:motion.matches?'instant':'smooth'});}
 function update(){prev.disabled=gallery.scrollLeft<=2;next.disabled=gallery.scrollLeft+gallery.clientWidth>=gallery.scrollWidth-2;}
 prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
 gallery.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(event.key==='ArrowLeft'?-1:1);}});
 gallery.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();
})();
