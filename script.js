(function(){

/* ── Cursor ── */
const cur=document.getElementById('cursor'),crr=document.getElementById('cr');
let mx=-200,my=-200,rx=-200,ry=-200;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function r(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;crr.style.left=rx+'px';crr.style.top=ry+'px';requestAnimationFrame(r)})();
document.querySelectorAll('a,button,input').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.classList.add('h');crr.classList.add('h')});
  el.addEventListener('mouseleave',()=>{cur.classList.remove('h');crr.classList.remove('h')});
});

/* ── Nav ── */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('sc',window.scrollY>50),{passive:true});

/* ── GSAP ── */
gsap.registerPlugin(ScrollTrigger);
gsap.set('#htag',{y:24,opacity:0});
gsap.set('#h1',{y:52,opacity:0});
gsap.set('#hsub',{y:32,opacity:0});
gsap.set('#fw',{y:26,opacity:0});
gsap.set('#trust',{y:20,opacity:0});
gsap.set('#shint',{opacity:0});
gsap.set('#pcard',{x:44,opacity:0});

const tl=gsap.timeline({defaults:{ease:'power3.out'}});
tl.to('#htag',{opacity:1,y:0,duration:.7,delay:.25})
  .to('#h1',{opacity:1,y:0,duration:1},'-=.4')
  .to('#hsub',{opacity:1,y:0,duration:.75},'-=.55')
  .to('#fw',{opacity:1,y:0,duration:.65},'-=.5')
  .to('#trust',{opacity:1,y:0,duration:.55},'-=.35')
  .to('#shint',{opacity:1,duration:.7},'-=.15')
  .to('#pcard',{opacity:1,x:0,duration:1.1,ease:'power2.out'},'-=.9');

/* Hero card bars */
setTimeout(()=>{[['#hb1',93],['#hb2',88],['#hb3',91],['#hb4',79]].forEach(([id,w],i)=>{gsap.to(id,{width:w+'%',duration:1.2,delay:i*.11,ease:'power2.out'});});},1200);
gsap.to('#ld',{opacity:.25,duration:.85,repeat:-1,yoyo:true,ease:'sine.inOut'});

/* Waveform */
document.querySelectorAll('.wb').forEach((b,i)=>{
  gsap.to(b,{scaleY:gsap.utils.random(.3,1.9),duration:gsap.utils.random(.3,.9),repeat:-1,yoyo:true,ease:'sine.inOut',delay:i*.065});
});

/* Mouse parallax */
document.addEventListener('mousemove',e=>{
  const px=(e.clientX/window.innerWidth-.5)*26,py=(e.clientY/window.innerHeight-.5)*26;
  document.querySelectorAll('.blob').forEach((b,i)=>{const f=i===0?1:-.5;gsap.to(b,{x:px*f,y:py*f,duration:1.6,ease:'power1.out',overwrite:true});});
});

/* ── Scroll reveals helper ── */
function rev(trigger,ids,opts){
  const els=Array.isArray(ids)?ids:[ids];
  ScrollTrigger.create({trigger,start:'top 82%',onEnter:()=>{
    gsap.set(els,{y:opts.y||34,opacity:0});
    gsap.to(els,{opacity:1,y:0,duration:opts.d||.7,stagger:opts.s||0,ease:'power2.out',delay:opts.dl||0});
  }});
}

/* Problem */
rev('#problem','#pey',{y:18,d:.6});
rev('#problem',['#pr1','#pr2','#pr3'],{s:.2,dl:.1});
rev('#problem','#pres',{y:16,d:.6,dl:.65});

/* How it works */
rev('#how','#hey',{y:18,d:.6});
rev('#how',['#st1','#st2','#st3'],{s:.22,dl:.1});

/* Preview */
rev('#preview','#pvey',{y:16,d:.6});
rev('#preview',['#pvh','#pvb','#pvf'],{s:.15,dl:.1});
ScrollTrigger.create({trigger:'#pvmk',start:'top 78%',onEnter:()=>{
  gsap.set('#pvmk',{y:55,opacity:0});
  gsap.to('#pvmk',{opacity:1,y:0,duration:1,ease:'power2.out',delay:.2,onComplete:()=>{
    [['#rs1',93],['#rs2',88],['#rs3',91],['#rs4',79],['#rs5',90],['#rs6',76]].forEach(([id,w],i)=>{gsap.to(id,{width:w+'%',duration:1.1,delay:.15+i*.1,ease:'power2.out'});});
    const ring=document.getElementById('ring');
    if(ring){const c=2*Math.PI*30,off=c-(87.9/100)*c;gsap.to(ring,{strokeDashoffset:off,duration:1.4,delay:.3,ease:'power2.out'});}
  }});
}});

/* Social */
rev('#social','#sey',{y:16,d:.6});
rev('#social','#qf',{y:30,d:.75,dl:.1});
rev('#social',['#q1','#q2','#q3'],{s:.14,dl:.25});

/* Final CTA */
rev('#finalcta',['#fc1','#fc2','#fc3','#fc4','#form2','#fc5'],{s:.12,dl:.05});

/* ── Form logic ── */
function mkForm(fid,eid,bid,btid,spid,arrid,errid,sucid,cntid,isFinal){
  const form=document.getElementById(fid);if(!form)return;
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const em=(document.getElementById(eid)||{}).value||'';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.trim())){
      if(errid){const er=document.getElementById(errid);er.textContent='Enter a valid email.';er.style.display='block';gsap.from(er,{x:-10,duration:.3});}
      return;
    }
    const btn=document.getElementById(bid),spin=document.getElementById(spid);
    const arr=arrid?document.getElementById(arrid):null,btxt=document.getElementById(btid);
    btn.disabled=true;
    if(spin)spin.style.display='block';
    if(arr)arr.style.display='none';
    if(btxt)btxt.style.display='none';
    await new Promise(r=>setTimeout(r,1100)); /* ← replace with fetch('/api/waitlist',{method:'POST',body:JSON.stringify({email:em.trim()})}) */
    if(isFinal){
      form.style.display='none';
      const suc=document.getElementById(sucid);suc.classList.add('show');
      gsap.from(suc,{opacity:0,y:16,duration:.6,ease:'power2.out'});
    } else if(sucid==='sc1'){
      if(errid)document.getElementById(errid).style.display='none';
      form.style.display='none';
      const suc=document.getElementById(sucid);suc.classList.add('show');
      gsap.from(suc,{opacity:0,y:12,duration:.5,ease:'power2.out'});
      if(cntid){const el=document.getElementById(cntid),c=parseInt(el.textContent)||340;gsap.to({v:c},{v:c+1,duration:1,ease:'power1.out',onUpdate:function(){el.textContent=Math.round(this.targets()[0].v)}});}
    } else {
      btn.style.background='#5CB87A';btn.style.color='var(--ink)';btn.style.pointerEvents='none';
      if(btxt){btxt.textContent='✓ You\'re in';btxt.style.display='block';}
      if(spin)spin.style.display='none';
    }
  });
}
mkForm('form1','em1','btn1','bt1','sp1','ba1','er1','sc1','wc',false);
mkForm('form2','em2','btn2','bt2','sp2',null,null,'fcsuc',null,true);

})();
