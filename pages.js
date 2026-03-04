function renderHome(){
  const cal=formatCalDate();
  document.getElementById('app').innerHTML=`
    <section class="hero-section">
      <div class="container">
        <div class="hero-top">
          <div><div class="hero-greeting"></div><h1>Haraiya Secondary School</h1></div>
          <div class="cal-chip"><div class="cal-chip-date">${cal.date}</div><div class="cal-chip-day">${cal.day}</div></div>
        </div>
        <div class="section-label">📰 Latest News</div>
        <div class="news-slider" id="news-slider">
          ${NEWS_POSTS.slice(0,4).map((n,i)=>`
            <div class="news-card animate-fadeUp" style="animation-delay:${i*.1}s" onclick="openArticle(${n.id})">
              <div class="news-img" style="background:${n.color}"><span class="news-img-placeholder">${n.emoji}</span></div>
              <div class="news-body">
                <div class="news-meta">
                  <div class="news-source"><div class="news-school-icon">🏫</div><span class="news-source-name">Haraiya Sec. School</span></div>
                  <span class="badge badge-accent" style="margin-left:auto">${n.category}</span>
                </div>
                <div class="news-title">${n.title}</div>
                <div class="news-desc">${n.desc}</div>
                <div class="news-footer">
                  <span class="news-date">🕐 ${n.date}</span>
                  <button class="news-read-btn" onclick="event.stopPropagation();openArticle(${n.id})">Read more</button>
                </div>
              </div>
            </div>`).join('')}
        </div>
        <div class="slider-dots" id="slider-dots">
          ${NEWS_POSTS.slice(0,4).map((_,i)=>`<div class="dot${i===0?' active':''}" onclick="scrollToSlide(${i})"></div>`).join('')}
        </div>
      </div>
    </section>
    <section class="stats-section">
      <div class="container">
        <div class="section-label" style="margin-bottom:20px">📊 School Overview</div>
        <div class="stats-grid stagger">
          <div class="stat-card"><div class="stat-icon teal">👨‍🎓</div><div><div class="stat-num" id="cnt-s">0</div><div class="stat-label">Total Students</div></div></div>
          <div class="stat-card"><div class="stat-icon amber">👨‍🏫</div><div><div class="stat-num" id="cnt-st">0</div><div class="stat-label">Teaching Staff</div></div></div>
          <div class="stat-card"><div class="stat-icon blue">📚</div><div><div class="stat-num" id="cnt-c">0</div><div class="stat-label">Courses Offered</div></div></div>
          <div class="stat-card"><div class="stat-icon rose">🏫</div><div><div class="stat-num" id="cnt-cl">0</div><div class="stat-label">Active Classes</div></div></div>
        </div>
      </div>
    </section>
    <section class="section-sm">
      <div class="container">
        <div class="section-label" style="margin-bottom:20px">⚡ Quick Access</div>
        <div class="quick-links-grid stagger">
          ${[{icon:'📊',label:'Exam Results',bg:'rgba(42,124,111,.1)',page:'result'},{icon:'📝',label:'Notes',bg:'rgba(232,168,56,.12)',page:'notes'},{icon:'📚',label:'Courses',bg:'rgba(59,130,246,.1)',page:'courses'},{icon:'🏫',label:'About School',bg:'rgba(155,111,212,.1)',page:'about'},{icon:'📰',label:'News',bg:'rgba(82,168,117,.1)',page:'news'},{icon:'⚙️',label:'Settings',bg:'rgba(107,114,128,.1)',page:'more'}].map(q=>`
            <div class="quick-card" onclick="showPage('${q.page}')">
              <div class="quick-icon" style="background:${q.bg}">${q.icon}</div>
              <span class="quick-label">${q.label}</span>
            </div>`).join('')}
        </div>
      </div>
    </section>`;
  animateCounter('cnt-s',SCHOOL.stats.students);animateCounter('cnt-st',SCHOOL.stats.staff);
  animateCounter('cnt-c',SCHOOL.stats.courses);animateCounter('cnt-cl',SCHOOL.stats.classes);
  // Mobile-only manual scroll dot sync
  const slider=document.getElementById('news-slider');
  if(slider){slider.addEventListener('scroll',()=>{
    const cardW=(slider.querySelector('.news-card')?.offsetWidth||0)+16;
    const idx=Math.round(slider.scrollLeft/cardW);
    document.querySelectorAll('#slider-dots .dot').forEach((d,i)=>d.classList.toggle('active',i===idx));
  },{passive:true})}
}
function scrollToSlide(i){
  const s=document.getElementById('news-slider');
  s?.querySelectorAll('.news-card')[i]?.scrollIntoView({behavior:'smooth',inline:'start',block:'nearest'});
}
function animateCounter(id,target){
  const el=document.getElementById(id);if(!el)return;
  let v=0;const step=Math.ceil(target/40);
  const t=setInterval(()=>{v=Math.min(v+step,target);el.textContent=v.toLocaleString();if(v>=target)clearInterval(t)},30);
}

/* ═══════════════════════════════════════════════
   NEWS PAGE
═══════════════════════════════════════════════ */
function renderNews(){
  if(_newsArticleId){renderArticle(_newsArticleId);return}
  document.getElementById('app').innerHTML=`
    <div class="container">
      <div class="page-header animate-fadeUp">
        <div class="page-header-icon">📰</div>
        <h1>School News</h1>
        <p>Latest updates from Haraiya Secondary School</p>
      </div>
      <div style="margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
        <div class="section-label">Recent Posts</div>
        <div style="font-size:.8rem;color:var(--text-muted);background:var(--surface2);border:1px solid var(--border);border-radius:50px;padding:6px 14px">
          📌 Facebook integration coming soon
        </div>
      </div>
      <div class="news-page-grid">
        ${NEWS_POSTS.map(n=>`
          <div class="news-page-card" onclick="openArticle(${n.id})">
            <div class="npc-img-ph" style="background:${n.color}"><span>${n.emoji}</span></div>
            <div class="npc-body">
              <div class="npc-date">${n.date} · <span class="badge badge-accent" style="font-size:.7rem">${n.category}</span></div>
              <div class="npc-title">${n.title}</div>
              <div class="npc-desc">${n.desc}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}
function openArticle(id){
  _newsArticleId=id;_currentPage='news';setActiveNav('news');renderArticle(id);scrollTo({top:0,behavior:'smooth'});
}
function renderArticle(id){
  const n=NEWS_POSTS.find(p=>p.id===id);if(!n)return;
  document.getElementById('app').innerHTML=`
    <div class="container" style="padding-top:40px">
      <div class="article-view">
        <button class="article-back" onclick="_newsArticleId=null;renderNews()">← Back to News</button>
        <div class="animate-fadeUp">
          <div style="margin-bottom:12px"><span class="badge badge-accent">${n.category}</span></div>
          <h1 class="article-title">${n.title}</h1>
          <div class="article-date">
            <span>📅 ${n.date}</span>
            <span>🏫 Haraiya Secondary School</span>
          </div>
          <div class="news-img" style="background:${n.color};height:260px;border-radius:var(--radius-lg);margin-bottom:28px;width:100%">
            <span style="font-size:5rem">${n.emoji}</span>
          </div>
          <div class="article-body">${n.body}</div>
          <div class="article-share">
            <button class="share-btn" onclick="showToast('📋','Link copied!')">📋 Copy Link</button>
            <button class="share-btn" onclick="showToast('📤','Sharing...')">📤 Share</button>
          </div>
        </div>
      </div>
    </div>`;
}

/* ═══════════════════════════════════════════════
   RESULTS (requires login)
═══════════════════════════════════════════════ */
function renderResult(){
  if(!requireLogin('view exam results'))return;
  document.getElementById('app').innerHTML=`
    <div class="container">
      <div class="page-header animate-fadeUp"><div class="page-header-icon">📊</div><h1>Exam Results</h1><p>Select your class to view detailed results</p></div>
      <div id="class-grid-view"><div class="class-grid stagger">
        ${CLASSES_RESULT.map(c=>`<div class="class-card ${c.color}" onclick="showResultTable('${c.id}','${c.name}')"><div class="class-num-badge">${c.num}</div><div class="class-name">${c.name}</div><div class="class-count">${c.students} students</div></div>`).join('')}
      </div></div>
      <div class="result-view" id="result-table-view">
        <div class="result-header">
          <button class="back-btn" onclick="backToClassGrid()">← Back</button>
          <h2 id="result-class-title" style="flex:1"></h2>
          <div class="result-search"><span>🔍</span><input type="text" placeholder="Search student…" oninput="filterResults(this.value)"/></div>
        </div>
        <div class="result-table-wrap">
          <table class="result-table"><thead><tr><th>#</th><th>Student Name</th><th>Nepali</th><th>English</th><th>Math</th><th>Science</th><th>Social</th><th>Optional</th><th>Total</th><th>%</th><th>Grade</th></tr></thead><tbody id="result-tbody"></tbody></table>
        </div>
      </div>
    </div>`;
}
function showResultTable(id,name){
  document.getElementById('class-grid-view').style.display='none';
  document.getElementById('result-table-view').classList.add('active');
  document.getElementById('result-class-title').textContent=name+' — Results';
  _currentResults=generateResults();renderResultRows(_currentResults);
}
function renderResultRows(data){
  const tb=document.getElementById('result-tbody');if(!tb)return;
  tb.innerHTML=data.map(s=>`<tr>
    <td>${s.rank<=3?`<span class="rank-badge rank-${s.rank}">${s.rank}</span>`:`<span class="rank">${s.rank}</span>`}</td>
    <td class="student-name">${s.name}</td>
    ${s.scores.map(sc=>`<td class="score ${sc>=75?'high':sc>=55?'mid':'low'}">${sc}</td>`).join('')}
    <td class="score ${s.pct>=75?'high':s.pct>=55?'mid':'low'}" style="font-weight:800">${s.total}</td>
    <td class="score ${s.pct>=75?'high':s.pct>=55?'mid':'low'}">${s.pct}%</td>
    <td><span class="badge ${s.pct>=80?'badge-primary':s.pct>=60?'badge-accent':'badge-red'}">${s.grade}</span></td>
  </tr>`).join('');
}
function filterResults(q){renderResultRows(q?_currentResults.filter(s=>s.name.toLowerCase().includes(q.toLowerCase())):_currentResults)}
function backToClassGrid(){document.getElementById('class-grid-view').style.display='';document.getElementById('result-table-view').classList.remove('active')}

/* NOTES */
function renderNotes(){
  document.getElementById('app').innerHTML=`
    <div class="container">
      <div class="page-header animate-fadeUp"><div class="page-header-icon">📝</div><h1>Study Notes</h1><p>Select your class to access notes</p></div>
      <div id="notes-class-view"><div class="class-grid stagger">
        ${CLASSES_NOTES.map(c=>`<div class="class-card ${c.color}" onclick="showNotesForClass('${c.id}','${c.name}')"><div class="class-num-badge">${c.num}</div><div class="class-name">${c.name}</div><div class="class-count">Tap to browse</div></div>`).join('')}
      </div></div>
      <div id="notes-list-view" style="display:none;padding-bottom:40px">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:28px;flex-wrap:wrap">
          <button class="back-btn" onclick="backToNotesClasses()">← Back</button>
          <h2 id="notes-class-title"></h2>
        </div>
        <div class="notes-grid stagger" id="notes-grid"></div>
      </div>
    </div>`;
}
function showNotesForClass(id,name){
  document.getElementById('notes-class-view').style.display='none';
  document.getElementById('notes-list-view').style.display='block';
  document.getElementById('notes-class-title').textContent=name+' Notes';
  document.getElementById('notes-grid').innerHTML=getNotesForClass(id).map(n=>`
    <div class="note-card">
      <div class="note-top"><div class="note-icon">${n.emoji}</div><div><div class="note-subject">${n.subject}</div><div class="note-teacher">👤 ${n.teacher}</div></div></div>
      <div class="note-desc">${n.desc}</div>
      <div class="note-footer"><span class="note-date">📅 ${n.date}</span><button class="note-download" onclick="showToast('📥','Download coming soon!')">⬇ Download</button></div>
    </div>`).join('');
  scrollTo({top:0,behavior:'smooth'});
}
function backToNotesClasses(){document.getElementById('notes-class-view').style.display='';document.getElementById('notes-list-view').style.display='none'}

/* COURSES */
function renderCourses(){
  document.getElementById('app').innerHTML=`
    <div class="container">
      <div class="page-header animate-fadeUp"><div class="page-header-icon">📚</div><h1>Courses</h1><p>Explore all academic programs at Haraiya</p></div>
      <div class="courses-filter">
        ${['all','science','management','humanities','see','computer','extra'].map(f=>`<button class="filter-pill ${_courseFilter===f?'active':''}" onclick="setCourseFilter('${f}')">${f==='all'?'All':f[0].toUpperCase()+f.slice(1)}</button>`).join('')}
      </div>
      <div class="courses-grid stagger" id="courses-grid"></div>
    </div>`;
  renderCourseCards();
}
function setCourseFilter(f){
  _courseFilter=f;
  document.querySelectorAll('.filter-pill').forEach(p=>p.classList.toggle('active',p.textContent.toLowerCase()===f||(f==='all'&&p.textContent==='All')));
  renderCourseCards();
}
function renderCourseCards(){
  const g=document.getElementById('courses-grid');if(!g)return;
  const data=_courseFilter==='all'?COURSES_DATA:COURSES_DATA.filter(c=>c.tag===_courseFilter);
  g.innerHTML=data.map(c=>`
    <div class="course-card">
      <div class="course-banner" style="background:${c.color}"><span>${c.emoji}</span></div>
      <div class="course-body">
        <div class="course-level">${c.level}</div>
        <div class="course-name">${c.name}</div>
        <div class="course-desc">${c.desc}</div>
        <div class="course-footer"><span class="course-meta-item">📖 ${c.subjects.length} subjects</span><button class="btn btn-primary btn-sm" onclick="showToast('📚','Details coming soon!')">Details</button></div>
      </div>
    </div>`).join('');
}

/* ABOUT */
function renderAbout(){
  document.getElementById('app').innerHTML=`
    <div class="container">
      <div style="padding-top:32px"></div>
      <div class="about-hero animate-fadeUp">
        <div class="about-hero-icon">🏫</div>
        <h1>${SCHOOL.name}</h1>
        <p>Nurturing young minds since ${SCHOOL.founded} — a centre of academic excellence in ${SCHOOL.location}</p>
      </div>
      <div class="section-label" style="margin-bottom:20px">🎯 Our Mission</div>
      <div class="about-grid stagger" style="margin-bottom:40px">
        ${[{icon:'🌱',title:'Our Vision',desc:'To become the leading educational institution producing well-rounded, globally competitive graduates rooted in Nepali values.'},{icon:'🎯',title:'Our Mission',desc:'To provide quality education through innovative teaching, modern infrastructure, and a supportive learning environment.'},{icon:'💡',title:'Our Values',desc:'Integrity, Excellence, Respect, Innovation, and Community Service form the core of everything we do.'},{icon:'🌍',title:'Community',desc:'Deeply embedded in the local community, we partner with families and organizations for holistic development.'}].map(a=>`
          <div class="about-card"><div class="about-card-icon">${a.icon}</div><h3>${a.title}</h3><p>${a.desc}</p></div>`).join('')}
      </div>
      <div class="section-label" style="margin-bottom:20px">👥 Our Team</div>
      <div class="team-grid stagger" style="margin-bottom:40px">
        ${TEAM_DATA.map(t=>`<div class="team-card"><div class="team-avatar">${t.initial}</div><div class="team-name">${t.name}</div><div class="team-role">${t.role}</div></div>`).join('')}
      </div>
      <div class="section-label" style="margin-bottom:20px">📍 Contact Us</div>
      <div class="card" style="margin-bottom:40px"><div class="card-body">
        ${[{icon:'📍',label:'Address',val:SCHOOL.location},{icon:'📞',label:'Phone',val:SCHOOL.phone},{icon:'📧',label:'Email',val:SCHOOL.email},{icon:'🌐',label:'Website',val:SCHOOL.website}].map(c=>`
          <div style="display:flex;gap:14px;padding:14px 0;border-bottom:1px solid var(--border);align-items:center">
            <div style="width:40px;height:40px;border-radius:12px;background:rgba(42,124,111,.1);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">${c.icon}</div>
            <div><div style="font-size:.72rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">${c.label}</div><div style="font-weight:600;color:var(--text);margin-top:2px">${c.val}</div></div>
          </div>`).join('')}
      </div></div>
    </div>`;
}

/* ═══════════════════════════════════════════════
   MORE / PROFILE
═══════════════════════════════════════════════ */
function renderMore(){
  const cu=getCurrentUser();
  document.getElementById('app').innerHTML=`
    ${cu?`
    <div class="profile-header animate-fadeIn">
      <div class="profile-avatar-lg">${cu.name[0].toUpperCase()}</div>
      <div class="profile-name">${cu.name}</div>
      <div class="profile-email">${cu.email}</div>
      <div class="profile-role-badge">${cu.role==='admin'?'🛡️ Admin':cu.role==='teacher'?'👨‍🏫 Teacher':'👨‍🎓 Student'}</div>
    </div>` : `
    <div class="profile-header animate-fadeIn">
      <div class="profile-avatar-lg">?</div>
      <div class="profile-name">Guest</div>
      <div class="profile-email">Not signed in</div>
      <button class="nav-login-btn" style="margin-top:14px;padding:10px 24px;font-size:.92rem" onclick="openLogin()">Sign In / Register</button>
    </div>`}
    <div class="container" style="padding-top:28px">
      <div class="menu-list stagger">
        <div class="menu-item" onclick="${cu?'showPage(\'news\')':"requireLogin('access News')"}">
          <div class="menu-item-icon" style="background:rgba(42,124,111,.12)">📰</div>
          <div class="menu-item-text"><div class="menu-item-label">News</div><div class="menu-item-sub">Latest school posts</div></div>
          <span class="menu-item-chevron">›</span>
        </div>
        <div class="menu-item" onclick="${cu?'showChangePw()':"requireLogin('change password')"}">
          <div class="menu-item-icon" style="background:rgba(232,168,56,.12)">🔑</div>
          <div class="menu-item-text"><div class="menu-item-label">Change Password</div><div class="menu-item-sub">Update your credentials</div></div>
          <span class="menu-item-chevron">›</span>
        </div>
        <div class="menu-item" onclick="${cu?'showFeedbackForm()':"requireLogin('submit feedback')"}">
          <div class="menu-item-icon" style="background:rgba(155,111,212,.12)">📢</div>
          <div class="menu-item-text"><div class="menu-item-label">Feedback</div><div class="menu-item-sub">Share your thoughts${cu&&(cu.role==='admin'||cu.role==='teacher')?' · View submitted':''}</div></div>
          <span class="menu-item-chevron">›</span>
        </div>
        <div class="menu-item" onclick="${cu?'showVote()':"requireLogin('participate in voting')"}">
          <div class="menu-item-icon" style="background:rgba(220,80,80,.1)">🗳️</div>
          <div class="menu-item-text"><div class="menu-item-label">Vote / Poll</div><div class="menu-item-sub">Participate in school polls</div></div>
          <span class="menu-item-chevron">›</span>
        </div>
        <div class="menu-item" onclick="showPage('about')">
          <div class="menu-item-icon" style="background:rgba(42,124,111,.12)">🏫</div>
          <div class="menu-item-text"><div class="menu-item-label">School Info</div><div class="menu-item-sub">About Haraiya Secondary School</div></div>
          <span class="menu-item-chevron">›</span>
        </div>
        <div class="menu-item" onclick="showToast('ℹ️','Haraiya School Web App v1.0')">
          <div class="menu-item-icon" style="background:rgba(59,130,246,.1)">ℹ️</div>
          <div class="menu-item-text"><div class="menu-item-label">About App</div><div class="menu-item-sub">Version 1.0 — Haraiya School</div></div>
          <span class="menu-item-chevron">›</span>
        </div>
      </div>
      <div class="menu-list" style="margin-top:0">
        <div class="menu-item">
          <div class="menu-item-icon" style="background:rgba(42,124,111,.12)">🌙</div>
          <div class="menu-item-text"><div class="menu-item-label">Dark Mode</div><div class="menu-item-sub">Switch theme</div></div>
          <div class="toggle-switch ${document.documentElement.getAttribute('data-theme')==='dark'?'on':''}" id="dark-mode-toggle" onclick="toggleTheme();this.classList.toggle('on')"></div>
        </div>
        <div class="menu-item">
          <div class="menu-item-icon" style="background:rgba(232,168,56,.12)">🔔</div>
          <div class="menu-item-text"><div class="menu-item-label">Notifications</div><div class="menu-item-sub">Push alerts (coming soon)</div></div>
          <div class="toggle-switch" onclick="this.classList.toggle('on')"></div>
        </div>
      </div>
      ${cu?`<div style="padding:8px 0 4px"><button class="btn btn-danger" style="width:100%;border-radius:var(--radius-md)" onclick="logoutUser()">🚪 Sign Out</button></div>`:''}
      <div style="text-align:center;padding:28px 0 48px"><div style="font-size:.78rem;color:var(--text-muted)">Haraiya Secondary School Web App</div><div style="font-size:.72rem;color:var(--text-muted);margin-top:4px">Version 1.0 • Made with ❤️</div></div>
    </div>`;
}

/* Change Password */
function showChangePw(){
  const cu=getCurrentUser();if(!cu){openLogin();return}
  document.getElementById('app').innerHTML=`
    <div class="container">
      <div class="pw-change-wrap">
        <button class="back-btn" style="margin-bottom:24px" onclick="showPage('more')">← Back</button>
        <div class="page-header" style="padding-top:0;text-align:left">
          <div class="page-header-icon" style="margin:0 0 16px">🔑</div>
          <h2>Change Password</h2>
          <p>Update your account password below</p>
        </div>
        <div style="margin-top:28px">
          <div class="form-group"><label class="form-label">Current Password</label><input class="form-input" id="cp-current" type="password" placeholder="Your current password"/><div class="form-error" id="cp-err"></div></div>
          <div class="form-group"><label class="form-label">New Password</label><input class="form-input" id="cp-new" type="password" placeholder="New password (min. 8 chars)" oninput="checkPwStrength(this.value)"/><div class="pw-strength" style="margin-top:6px"><div class="pw-strength-bar" id="pw-bar" style="width:0%"></div></div></div>
          <div class="form-group"><label class="form-label">Confirm New Password</label><input class="form-input" id="cp-new2" type="password" placeholder="Repeat new password"/><div class="form-error" id="cp-match-err"></div></div>
          <button class="btn btn-primary" style="width:100%;margin-top:8px;border-radius:var(--radius-md);padding:14px;font-size:1rem" onclick="submitChangePw()">Update Password</button>
        </div>
      </div>
    </div>`;
}
function submitChangePw(){
  const cur=document.getElementById('cp-current')?.value||'';
  const nw=document.getElementById('cp-new')?.value||'';
  const nw2=document.getElementById('cp-new2')?.value||'';
  showErr('cp-err','');showErr('cp-match-err','');
  if(nw.length<8){showErr('cp-err','New password must be at least 8 characters');return}
  if(nw!==nw2){showErr('cp-match-err','Passwords do not match');return}
  const res=changePassword(cur,nw);
  if(res.error){showErr('cp-err',res.error);return}
  showToast('✅','Password changed successfully!');showPage('more');
}

/* Feedback */
function showFeedbackForm(){
  const cu=getCurrentUser();if(!cu){openLogin();return}
  const canView=cu.role==='admin'||cu.role==='teacher';
  const feedbacks=getFeedbacks();
  document.getElementById('feedback-view-content').innerHTML=`
    <div class="modal-title">📢 Feedback</div>
    <div class="modal-sub">Submit feedback — ${canView?'you can also view all submitted feedback below':cu.role==='student'?'your identity is hidden from teachers; only admin can see who submitted':'your identity is visible only to admin'}</div>
    <div class="form-group"><label class="form-label">Your Feedback</label><textarea class="form-input" id="fb-text" rows="4" placeholder="Write your feedback or suggestion here…" style="resize:vertical"></textarea><div class="form-error" id="fb-err"></div></div>
    <button class="modal-btn" onclick="submitFeedback()">Submit Feedback</button>
    ${canView?`
    <div style="margin-top:28px"><div class="section-label" style="margin-bottom:16px">Submitted Feedback (${feedbacks.length})</div>
    ${feedbacks.length===0?'<p style="color:var(--text-muted);font-size:.9rem">No feedback submitted yet.</p>':
      feedbacks.map(f=>`
        <div class="feedback-item">
          <div class="feedback-meta">
            <span class="feedback-role ${f.role}">${f.role==='student'?'👨‍🎓 Student':'👨‍🏫 Teacher'}</span>
            <span style="font-size:.72rem;color:var(--text-muted)">${new Date(f.createdAt).toLocaleDateString()}</span>
          </div>
          <div class="feedback-text">${f.text}</div>
          ${cu.role==='admin'?`<div class="feedback-author">From: ${f.name} (${f.email})</div>`:''}
        </div>`).join('')}
    </div>`:``}`;
  openModal('feedback-view-modal');
}
function submitFeedback(){
  const cu=getCurrentUser();if(!cu)return;
  const text=document.getElementById('fb-text')?.value?.trim()||'';
  showErr('fb-err','');
  if(text.length<10){showErr('fb-err','Please write at least 10 characters');return}
  const feedbacks=getFeedbacks();
  feedbacks.push({id:'f'+Date.now(),text,name:cu.name,email:cu.email,role:cu.role,createdAt:new Date().toISOString()});
  saveFeedbacks(feedbacks);
  closeModal('feedback-view-modal');showToast('✅','Feedback submitted! Thank you.');
}
function showVote(){
  if(!requireLogin('participate in voting'))return;
  showToast('🗳️','Voting feature coming soon!');
}

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
// Restore theme
const savedTheme=localStorage.getItem('hss_theme')||'light';
document.documentElement.setAttribute('data-theme',savedTheme);
// Init
renderNav();
showPage('home');