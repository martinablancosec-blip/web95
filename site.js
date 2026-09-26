(function(){
 const nav=document.querySelector('.site-nav');
 const progress=document.querySelector('.progress');
 const menu=document.querySelector('.mobile-menu');
 const toggle=document.querySelector('.menu-toggle');
 const cursor=document.querySelector('.cursor');
 const onScroll=()=>{
   if(nav) nav.classList.toggle('scrolled',scrollY>70);
   if(progress){const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h?scrollY/h*100:0)+'%';}
 };
 addEventListener('scroll',onScroll,{passive:true}); onScroll();
 if(toggle&&menu) toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});
 document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>{if(menu){menu.classList.remove('open');if(toggle){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú')}}}));
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
 document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
 document.querySelectorAll('[data-tilt]').forEach(card=>{
   card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg) translateY(-5px)`});
   card.addEventListener('pointerleave',()=>card.style.transform='');
 });
 const projects=document.querySelector('.projects');
 if(projects){let down=false,start=0,left=0;projects.addEventListener('pointerdown',e=>{if(e.target.closest('a')) return;down=true;start=e.clientX;left=projects.scrollLeft;projects.setPointerCapture(e.pointerId)});projects.addEventListener('pointermove',e=>{if(down)projects.scrollLeft=left-(e.clientX-start)*1.1});['pointerup','pointercancel'].forEach(x=>projects.addEventListener(x,()=>down=false));}
 if(cursor && matchMedia('(pointer:fine)').matches){cursor.style.display='block';addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});document.querySelectorAll('a,button,.project-card,.level-card').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('big'));el.addEventListener('mouseleave',()=>cursor.classList.remove('big'))})}
 document.querySelectorAll('[data-count]').forEach(el=>{const target=Number(el.dataset.count);const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){let n=0;const step=Math.max(1,Math.ceil(target/40));const timer=setInterval(()=>{n=Math.min(target,n+step);el.textContent=n.toLocaleString('es-AR');if(n>=target)clearInterval(timer)},30);io2.unobserve(el)}}),{threshold:.7});io2.observe(el)});
 const parallax=document.querySelector('[data-parallax]');if(parallax&&!matchMedia('(prefers-reduced-motion:reduce)').matches)addEventListener('scroll',()=>{const y=scrollY;parallax.style.transform=`translate3d(0,${y*.025}px,0) scale(1.03)`},{passive:true});
})();
