const ALLOWED_DOMAINS=['gmail.com','outlook.com','yahoo.com','hotmail.com','live.com','haraiya.edu.np'];
const BLOCKED_DOMAINS=['mailinator.com','tempmail.com','guerrillamail.com','10minutemail.com','throwam.com','yopmail.com','trashmail.com','sharklasers.com','guerrillamailblock.com','grr.la','spam4.me','maildrop.cc','dispostable.com','fakeinbox.com','tempr.email','disposablemail.com'];

/* ═══════════════════════════════════════════════
   AUTH — localStorage-based "database"
═══════════════════════════════════════════════ */
function getUsers(){try{return JSON.parse(localStorage.getItem('hss_users')||'[]')}catch{return[]}}
function saveUsers(u){localStorage.setItem('hss_users',JSON.stringify(u))}
function getCurrentUser(){try{return JSON.parse(localStorage.getItem('hss_current_user')||'null')}catch{return null}}
function setCurrentUser(u){localStorage.setItem('hss_current_user',u?JSON.stringify(u):'null')}
function getFeedbacks(){try{return JSON.parse(localStorage.getItem('hss_feedbacks')||'[]')}catch{return[]}}
function saveFeedbacks(f){localStorage.setItem('hss_feedbacks',JSON.stringify(f))}

function validateEmail(email){
  const e=email.toLowerCase().trim();
  if(!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(e))return'Invalid email format';
  const domain=e.split('@')[1];
  if(BLOCKED_DOMAINS.some(d=>domain===d||domain.endsWith('.'+d)))return'Temporary/disposable email addresses are not allowed';
  if(!ALLOWED_DOMAINS.some(d=>domain===d))return`Only ${ALLOWED_DOMAINS.filter(d=>!d.includes('haraiya')).join(', ')} are accepted`;
  // Check local part isn't obviously fake (no repeated chars like aaa@, xyz@)
  const local=e.split('@')[0];
  if(local.length<3)return'Email username is too short';
  if(/^(.){3,}$/.test(local))return'Please enter a real email address';
  return null;
}
// Async version that checks if email actually exists via AbstractAPI (free tier)
// Falls back to sync check if offline or API unavailable
async function validateEmailAsync(email){
  const syncErr=validateEmail(email);
  if(syncErr)return syncErr;
  // AbstractAPI email validation — free tier, 100 req/month
  // To enable: replace YOUR_KEY with your key from abstractapi.com/email-verification-validation-api
  const API_KEY=''; // Leave empty to skip remote check
  if(!API_KEY)return null;
  try{
    const res=await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${API_KEY}&email=${encodeURIComponent(email)}`);
    const data=await res.json();
    if(data.deliverability==='UNDELIVERABLE')return'This email address does not appear to exist';
    if(data.is_disposable_email?.value)return'Temporary/disposable email addresses are not allowed';
    if(!data.is_valid_format?.value)return'Invalid email format';
  }catch(e){/* offline or API error — allow through */}
  return null;
}
function hashPw(pw){
  // Simple hash for demo — in production use bcrypt on server
  let h=0;for(let i=0;i<pw.length;i++){h=((h<<5)-h)+pw.charCodeAt(i);h|=0}return'h'+Math.abs(h).toString(36)+pw.length;
}
function registerUser(name,email,password,role){
  const users=getUsers();
  const e=email.toLowerCase().trim();
  if(users.find(u=>u.email===e))return{error:'An account with this email already exists'};
  const user={id:'u'+Date.now(),name:name.trim(),email:e,password:hashPw(password),role,createdAt:new Date().toISOString()};
  users.push(user);saveUsers(users);
  const safe={id:user.id,name:user.name,email:user.email,role:user.role};
  setCurrentUser(safe);return{user:safe};
}
function loginUser(email,password){
  const users=getUsers();
  const u=users.find(u=>u.email===email.toLowerCase().trim());
  if(!u)return{error:'No account found with this email'};
  if(u.password!==hashPw(password))return{error:'Incorrect password'};
  const safe={id:u.id,name:u.name,email:u.email,role:u.role};
  setCurrentUser(safe);return{user:safe};
}
function logoutUser(){setCurrentUser(null);renderNav();showPage(_currentPage)}
function changePassword(currentPw,newPw){
  const cu=getCurrentUser();if(!cu)return{error:'Not logged in'};
  const users=getUsers();const idx=users.findIndex(u=>u.id===cu.id);
  if(idx===-1)return{error:'User not found'};
  if(users[idx].password!==hashPw(currentPw))return{error:'Current password is incorrect'};
  users[idx].password=hashPw(newPw);saveUsers(users);return{success:true};
}

/* ═══════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════ */