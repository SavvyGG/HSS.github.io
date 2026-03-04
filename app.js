let _currentPage='home';
let _currentResults=[];
let _courseFilter='all';
let _newsArticleId=null;
const PAGES={home:renderHome,result:renderResult,notes:renderNotes,courses:renderCourses,about:renderAbout,news:renderNews,more:renderMore};
function showPage(id){
  if(!PAGES[id])return;
  _currentPage=id;
  const d=document.getElementById('nav-drawer'),h=document.getElementById('hamburger');
  if(d?.classList.contains('open')){d.classList.remove('open');h?.classList.remove('open');document.body.style.overflow=''}
  scrollTo({top:0,behavior:'smooth'});
  setActiveNav(id);PAGES[id]();
}

/* ═══════════════════════════════════════════════
   HOME
═══════════════════════════════════════════════ */
function formatCalDate(){
  const d=new Date();
  const m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return{date:`${m[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`,day:days[d.getDay()]};
}