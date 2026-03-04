const NAV_LINKS=[
  {id:'home',label:'Home',icon:'🏠'},{id:'result',label:'Results',icon:'📊'},
  {id:'notes',label:'Notes',icon:'📝'},{id:'courses',label:'Courses',icon:'📚'},
  {id:'about',label:'About',icon:'🏫'},{id:'news',label:'News',icon:'📰'},
  {id:'more',label:'More',icon:'⚙️'},
];
function renderNav(){
  const cu=getCurrentUser();
  const isDark=document.documentElement.getAttribute('data-theme')==='dark';
  document.getElementById('navbar').innerHTML=`
    <div class="nav-inner">
      <div class="nav-logo" onclick="showPage('home')">
        <div class="nav-logo-icon">🏫</div>
        <div class="nav-logo-text"><strong>Haraiya Secondary School</strong><span>Est. 2045 B.S.</span></div>
      </div>
      <nav class="nav-links">
        ${NAV_LINKS.map(l=>`<div class="nav-link" id="navlink-${l.id}" onclick="showPage('${l.id}')">${l.icon} ${l.label}</div>`).join('')}
      </nav>
      <div class="nav-right">
        <button class="theme-toggle" onclick="toggleTheme()" title="Toggle dark/light mode">${isDark?'☀️':'🌙'}</button>
        ${cu
          ? `<div style="display:flex;align-items:center;gap:8px;cursor:pointer" onclick="showPage('more')">
               <div class="nav-avatar" title="${cu.name}">${cu.name[0].toUpperCase()}</div>
               <span class="nav-avatar-label hide-mobile">${cu.name.split(' ')[0]}</span>
             </div>`
          : `<button class="nav-login-btn" onclick="openLogin()">Sign In</button>`}
        <div class="nav-hamburger" id="hamburger" onclick="toggleDrawer()"><span></span><span></span><span></span></div>
      </div>
    </div>
    <div class="nav-drawer" id="nav-drawer" onclick="if(event.target===this)toggleDrawer()">
      <div class="nav-drawer-inner">
        <div style="display:flex;align-items:center;gap:10px;padding:8px 16px 16px">
          <div class="nav-logo-icon" style="width:34px;height:34px;font-size:16px">🏫</div>
          <div class="nav-logo-text"><strong style="font-size:.84rem">Haraiya Secondary School</strong><span style="font-size:.68rem">Est. 2045 B.S.</span></div>
        </div>
        <div class="drawer-divider"></div>
        ${NAV_LINKS.map(l=>`<div class="drawer-link" id="drawer-${l.id}" onclick="showPage('${l.id}');toggleDrawer()">${l.icon} ${l.label}</div>`).join('')}
        <div class="drawer-divider"></div>
        ${cu
          ? `<div class="drawer-link" onclick="logoutUser();toggleDrawer()">🚪 Sign Out</div>`
          : `<div class="drawer-link" onclick="openLogin();toggleDrawer()">🔑 Sign In</div>`}
      </div>
    </div>`;
  window.removeEventListener('scroll',_scrollHandler);
  window.addEventListener('scroll',_scrollHandler);
}
function _scrollHandler(){document.getElementById('navbar')?.classList.toggle('scrolled',scrollY>10)}
function toggleDrawer(){
  const d=document.getElementById('nav-drawer'),h=document.getElementById('hamburger');
  const open=d.classList.toggle('open');h.classList.toggle('open',open);
  document.body.style.overflow=open?'hidden':'';
}
function setActiveNav(id){
  document.querySelectorAll('.nav-link,.drawer-link').forEach(e=>e.classList.remove('active'));
  document.getElementById('navlink-'+id)?.classList.add('active');
  document.getElementById('drawer-'+id)?.classList.add('active');
}
function toggleTheme(){
  const html=document.documentElement;
  const isDark=html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme',isDark?'light':'dark');
  localStorage.setItem('hss_theme',isDark?'light':'dark');
  renderNav();
}

/* ═══════════════════════════════════════════════
   AUTH MODALS
═══════════════════════════════════════════════ */
function openLogin(){
  document.getElementById('auth-modal-content').innerHTML=`
    <div class="modal-title">👋 Welcome back</div>
    <div class="modal-sub">Sign in to access results, games, feedback & more</div>
    <div class="form-group">
      <label class="form-label">Email Address</label>
      <input class="form-input" id="login-email" type="email" placeholder="you@gmail.com"/>
      <div class="form-error" id="login-email-err"></div>
    </div>
    <div class="form-group">
      <label class="form-label">Password</label>
      <input class="form-input" id="login-pw" type="password" placeholder="Your password"/>
      <div class="form-error" id="login-err"></div>
    </div>
    <button class="modal-btn" onclick="submitLogin()">Sign In</button>
    <div class="modal-switch">Don't have an account? <a onclick="openRegister()">Create one</a></div>`;
  openModal('auth-modal');
}
function openRegister(){
  document.getElementById('auth-modal-content').innerHTML=`
    <div class="modal-title">✨ Create Account</div>
    <div class="modal-sub">Join Haraiya School's digital platform</div>
    <div class="form-group">
      <label class="form-label">Full Name</label>
      <input class="form-input" id="reg-name" type="text" placeholder="Your full name"/>
      <div class="form-error" id="reg-name-err"></div>
    </div>
    <div class="form-group">
      <label class="form-label">Email Address</label>
      <input class="form-input" id="reg-email" type="email" placeholder="you@gmail.com"/>
      <div class="form-error" id="reg-email-err"></div>
    </div>
    <div class="form-group">
      <label class="form-label">Role</label>
      <select class="form-select" id="reg-role">
        <option value="student">👨‍🎓 Student</option>
        <option value="teacher">👨‍🏫 Teacher</option>
        <option value="admin">🛡️ Admin</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Password</label>
      <input class="form-input" id="reg-pw" type="password" placeholder="Min. 8 characters" oninput="checkPwStrength(this.value)"/>
      <div class="pw-strength" style="margin-top:6px"><div class="pw-strength-bar" id="pw-bar" style="width:0%"></div></div>
      <div class="form-error" id="reg-pw-err"></div>
    </div>
    <div class="form-group">
      <label class="form-label">Confirm Password</label>
      <input class="form-input" id="reg-pw2" type="password" placeholder="Repeat password"/>
      <div class="form-error" id="reg-pw2-err"></div>
    </div>
    <button class="modal-btn" onclick="submitRegister()">Create Account</button>
    <div class="modal-switch">Already have an account? <a onclick="openLogin()">Sign in</a></div>`;
  openModal('auth-modal');
}
function checkPwStrength(pw){
  const bar=document.getElementById('pw-bar');if(!bar)return;
  let score=0;
  if(pw.length>=8)score++;if(pw.length>=12)score++;
  if(/[A-Z]/.test(pw))score++;if(/[0-9]/.test(pw))score++;if(/[^A-Za-z0-9]/.test(pw))score++;
  const pct=score/5*100;
  const colors=['#ef4444','#f97316','#eab308','#22c55e','#16a34a'];
  bar.style.width=pct+'%';bar.style.background=colors[score-1]||'#ef4444';
}
function showErr(id,msg){const el=document.getElementById(id);if(el){el.textContent=msg;el.classList.toggle('show',!!msg)}}
async function submitLogin(){
  const email=document.getElementById('login-email')?.value||'';
  const pw=document.getElementById('login-pw')?.value||'';
  showErr('login-email-err','');showErr('login-err','');
  const emailErr=validateEmail(email);
  if(emailErr){showErr('login-email-err',emailErr);return}
  if(!pw){showErr('login-err','Password is required');return}
  const res=loginUser(email,pw);
  if(res.error){showErr('login-err',res.error);return}
  closeModal('auth-modal');renderNav();setActiveNav(_currentPage);
  showToast('✅',`Welcome back, ${res.user.name.split(' ')[0]}!`);
}
async function submitRegister(){
  const name=document.getElementById('reg-name')?.value||'';
  const email=document.getElementById('reg-email')?.value||'';
  const role=document.getElementById('reg-role')?.value||'student';
  const pw=document.getElementById('reg-pw')?.value||'';
  const pw2=document.getElementById('reg-pw2')?.value||'';
  showErr('reg-name-err','');showErr('reg-email-err','');showErr('reg-pw-err','');showErr('reg-pw2-err','');
  let ok=true;
  if(!name.trim()||name.trim().length<2){showErr('reg-name-err','Please enter your full name');ok=false}
  if(pw.length<8){showErr('reg-pw-err','Password must be at least 8 characters');ok=false}
  if(pw!==pw2){showErr('reg-pw2-err','Passwords do not match');ok=false}
  if(!ok)return;
  // Show loading state
  const btn=document.querySelector('#auth-modal .modal-btn');
  if(btn){btn.textContent='Verifying email…';btn.disabled=true}
  const emailErr=await validateEmailAsync(email);
  if(btn){btn.textContent='Create Account';btn.disabled=false}
  if(emailErr){showErr('reg-email-err',emailErr);return}
  const res=registerUser(name,email,pw,role);
  if(res.error){showErr('reg-email-err',res.error);return}
  closeModal('auth-modal');renderNav();setActiveNav(_currentPage);
  showToast('🎉',`Account created! Welcome, ${res.user.name.split(' ')[0]}!`);
}
function requireLogin(action){
  const cu=getCurrentUser();
  if(cu)return true;
  openLogin();
  showToast('🔑','Please sign in to '+action);
  return false;
}

/* ═══════════════════════════════════════════════
   MODALS / TOAST HELPERS
═══════════════════════════════════════════════ */
function openModal(id){document.getElementById(id)?.classList.add('open');document.body.style.overflow='hidden'}
function closeModal(id){document.getElementById(id)?.classList.remove('open');document.body.style.overflow=''}
let _toastTimer=null;
function showToast(icon,msg){
  document.getElementById('toast-icon').textContent=icon;
  document.getElementById('toast-msg').textContent=msg;
  const t=document.getElementById('toast');t.classList.add('show');
  clearTimeout(_toastTimer);_toastTimer=setTimeout(()=>t.classList.remove('show'),3200);
}

/* ═══════════════════════════════════════════════
   ROUTER
═══════════════════════════════════════════════ */