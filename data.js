const SCHOOL = {
  name:'Haraiya Secondary School', location:'Butwal, Lumbini Province, Nepal',
  founded:'2045 B.S.', phone:'+977-71-XXXXXX',
  email:'info@haraiya.edu.np', website:'www.haraiya.edu.np',
  stats:{students:1240,staff:68,courses:18,classes:24}
};
const NEWS_POSTS = [
  {id:1,date:'26 Feb 2026',rawDate:'2026-02-26',
   title:'कक्षा ११-१२ का विद्यार्थीहरूको अभ्यास परीक्षाको नतिजा प्रकाशन',
   desc:'विद्यालयले वार्षिक अभ्यास परीक्षाको नतिजा प्रकाशन गर्‍यो। सबै विद्यार्थीहरूलाई हार्दिक बधाई।',
   body:`<p><strong>Butwal, Nepal — 14 Falgun 2082</strong></p><p>Haraiya Secondary School is pleased to announce the publication of the Class 11–12 Practice Examination results. The examination was conducted as a preparatory test for the upcoming final board examinations.</p><p>Students are encouraged to review their results and discuss any concerns with their respective subject teachers. Result sheets are available at the school office.</p><p>We congratulate all students for their hard work and dedication throughout the academic year.</p>`,
   category:'Academic',emoji:'📋',color:'#2a7c6f'},
  {id:2,date:'20 Feb 2026',rawDate:'2026-02-20',
   title:'हरेरा बहुमुखी क्याम्पसको हाजिरीजवाफ प्रतियोगितामा विद्यालयले द्वितीय स्थान हासिल',
   desc:'विद्यालयका प्रतिभाशाली विद्यार्थीहरूले राष्ट्रिय हाजिरीजवाफ प्रतियोगितामा उत्कृष्ट प्रदर्शन गरे।',
   body:`<p><strong>Haraiya, Nepal — 8 Falgun 2082</strong></p><p>In a proud moment for Haraiya Secondary School, our students secured <strong>Second Position</strong> at the inter-school quiz competition organized by Haraiya Multiple Campus.</p><p>The competition saw participation from over 15 schools across the Lumbini Province. Our team demonstrated exceptional knowledge in Science, Mathematics, and General Knowledge.</p><p>The school management congratulates the participating students and their mentoring teachers for this outstanding achievement.</p>`,
   category:'Achievement',emoji:'🏆',color:'#e8a838'},
  {id:3,date:'16 Feb 2026',rawDate:'2026-02-16',
   title:'शुक्रबारीय अतिरिक्त क्रियाकलापमा कक्षा ११-१२ को संगीत वितरण कार्यक्रम',
   desc:'विद्यालयको वार्षिक सांस्कृतिक कार्यक्रममा विद्यार्थीहरूले संगीत र नृत्य प्रस्तुत गरे।',
   body:`<p><strong>Haraiya, Nepal — 4 Falgun 2082</strong></p><p>As part of the school's Friday extra-curricular program, Class 11 and 12 students organized a vibrant Music and Cultural Distribution Event at the school auditorium.</p><p>Students performed traditional Nepali folk songs, modern music, and cultural dances that highlighted the rich heritage of Lumbini Province. The event was attended by teachers, parents, and fellow students.</p><p>The school management appreciates the talent and effort shown by all participating students.</p>`,
   category:'Event',emoji:'🎵',color:'#9b6fd4'},
  {id:4,date:'10 Feb 2026',rawDate:'2026-02-10',
   title:'विद्यालयको वार्षिक खेलकुद महोत्सव सफलतापूर्वक सम्पन्न',
   desc:'विद्यालयको वार्षिक खेलकुद प्रतियोगिता उत्साहपूर्ण वातावरणमा सम्पन्न भयो। विद्यार्थीहरूले विभिन्न खेलहरूमा सहभागिता जनाए।',
   body:`<p><strong>Haraiya, Nepal — 28 Magh 2082</strong></p><p>The Annual Sports Festival of Haraiya Secondary School concluded successfully with enthusiastic participation from students of all classes.</p><p>Events included football, volleyball, badminton, 100m sprint, and long jump. Prizes were distributed to winners in a ceremony presided over by the school principal.</p>`,
   category:'Sports',emoji:'⚽',color:'#52a875'},
  {id:5,date:'05 Feb 2026',rawDate:'2026-02-05',
   title:'कक्षा १० का विद्यार्थीहरूलाई SEE परीक्षा तयारीका लागि विशेष कक्षाहरू सुरु',
   desc:'SEE परीक्षाको तयारीका लागि विद्यालयले कक्षा १० का विद्यार्थीहरूलाई विशेष अतिरिक्त कक्षाहरू प्रदान गर्न सुरु गरेको छ।',
   body:`<p><strong>Haraiya, Nepal — 23 Magh 2082</strong></p><p>In preparation for the upcoming SEE (Secondary Education Examination), Haraiya Secondary School has launched special extra classes for all Class 10 students.</p><p>Classes are conducted in the mornings before regular school hours, covering all major subjects including Mathematics, Science, English, and Nepali. Experienced teachers are providing targeted coaching to ensure students are well-prepared.</p>`,
   category:'Academic',emoji:'📚',color:'#5b9bd5'},
  {id:6,date:'28 Jan 2026',rawDate:'2026-01-28',
   title:'नयाँ कम्प्युटर ल्याब उद्घाटन — विद्यार्थीहरूका लागि थप सुविधा',
   desc:'विद्यालयमा नयाँ अत्याधुनिक कम्प्युटर ल्याब उद्घाटन गरियो। यसले विद्यार्थीहरूको डिजिटल शिक्षालाई थप प्रभावकारी बनाउनेछ।',
   body:`<p><strong>Haraiya, Nepal — 15 Magh 2082</strong></p><p>A new state-of-the-art Computer Laboratory was inaugurated at Haraiya Secondary School, equipped with 30 computers with high-speed internet access.</p><p>The lab will support students in digital literacy, programming fundamentals, and computer-based examinations. The school extends its gratitude to all donors and the School Management Committee for making this possible.</p>`,
   category:'Facility',emoji:'💻',color:'#3a7abf'},
];
const CLASSES_RESULT=[
  {id:'c9a',name:'Class 9 A',num:'9',color:'c6',students:42},{id:'c9b',name:'Class 9 B',num:'9',color:'c3',students:38},
  {id:'c9c',name:'Class 9 C',num:'9',color:'c2',students:40},{id:'c9t',name:'Class 9 Tech',num:'9',color:'c5',students:35},
  {id:'c8a',name:'Class 8 All',num:'8',color:'c1',students:44},{id:'c10a',name:'Class 10 A',num:'10',color:'c7',students:39},
  {id:'c10t',name:'Class 10 Tech',num:'10',color:'c4',students:33},{id:'c11',name:'Class 11',num:'11',color:'c8',students:48},
  {id:'c12',name:'Class 12',num:'12',color:'c2',students:45},
];
const CLASSES_NOTES=[
  {id:'n9',name:'Class 9',num:'9',color:'c3'},{id:'n10',name:'Class 10',num:'10',color:'c1'},
  {id:'n11',name:'Class 11',num:'11',color:'c6'},{id:'n12',name:'Class 12',num:'12',color:'c2'},
];
function generateResults(){
  const names=['Aarav Sharma','Bina Thapa','Chetan KC','Dipika Rai','Eshan Basnet','Fiona Karki','Gaurav Paudel','Hira Tamang','Ishan Bhattarai','Jyoti Ghimire','Kamal Oli','Laxmi Dhakal','Mohan Adhikari','Nisha Pokhrel','Om Yadav','Priya Shrestha','Rahul Chaudhary','Sita Joshi','Trilok Magar','Uma Devkota'];
  return names.map(name=>{
    const scores=[0,0,0,0,0,0].map(()=>Math.floor(Math.random()*35)+55);
    const total=scores.reduce((a,b)=>a+b,0);const pct=Math.round(total/600*100);
    return{name,scores,total,pct,grade:pct>=80?'A+':pct>=70?'A':pct>=60?'B+':pct>=50?'B':'C'};
  }).sort((a,b)=>b.total-a.total).map((s,i)=>({...s,rank:i+1}));
}
function getNotesForClass(id){
  const map={n9:['Nepali','English','Mathematics','Science','Social Studies','Computer'],n10:['Nepali','English','Mathematics','Science','Social Studies','Optional Math'],n11:['Nepali','English','Mathematics','Physics','Chemistry','Biology','Computer'],n12:['Nepali','English','Mathematics','Physics','Chemistry','Biology','Account']};
  const teachers=['Mr. Sharma','Ms. Thapa','Mr. KC','Ms. Rai','Mr. Basnet','Ms. Karki'];
  const emojiMap={Nepali:'📖',English:'🔤',Mathematics:'🔢',Science:'🔬',Physics:'⚛️',Chemistry:'🧪',Biology:'🌿','Social Studies':'🌍',Computer:'💻','Optional Math':'📐',Account:'📊'};
  return (map[id]||map['n9']).map(sub=>({subject:sub,teacher:teachers[Math.floor(Math.random()*6)],desc:`Complete notes for ${sub} — includes definitions, exercises, and practice questions.`,date:['Feb 2026','Jan 2026','Mar 2026'][Math.floor(Math.random()*3)],emoji:emojiMap[sub]||'📄'}));
}
const COURSES_DATA=[
  {id:1,name:'Science Stream',level:'Class 11–12',desc:'Physics, Chemistry, Biology & Mathematics for science-track students.',subjects:['Physics','Chemistry','Biology','Math'],emoji:'🔬',color:'linear-gradient(135deg,#2a7c6f,#3ab5a2)',tag:'science'},
  {id:2,name:'Management Stream',level:'Class 11–12',desc:'Accountancy, Economics, Business Studies for future business professionals.',subjects:['Account','Economics','Business','English'],emoji:'📊',color:'linear-gradient(135deg,#e8a838,#f5c96a)',tag:'management'},
  {id:3,name:'Humanities Stream',level:'Class 11–12',desc:'Nepali, English, Sociology, History and social science subjects.',subjects:['Sociology','History','English','Nepali'],emoji:'📚',color:'linear-gradient(135deg,#9b6fd4,#c09ee8)',tag:'humanities'},
  {id:4,name:'SEE Preparation',level:'Class 9–10',desc:'Comprehensive preparation for SEE across all core subjects.',subjects:['Math','Science','English','Nepali','Social'],emoji:'🎓',color:'linear-gradient(135deg,#5b9bd5,#7bb8f0)',tag:'see'},
  {id:5,name:'Computer Science',level:'All Classes',desc:'Basic to advanced computer education including programming and internet skills.',subjects:['Programming','MS Office','Web Basics'],emoji:'💻',color:'linear-gradient(135deg,#3a7abf,#5a9fd4)',tag:'computer'},
  {id:6,name:'Extra Curricular',level:'All Classes',desc:'Sports, music, art, debate club and activities for holistic development.',subjects:['Sports','Music','Art','Debate'],emoji:'🎨',color:'linear-gradient(135deg,#52a875,#7fcf9a)',tag:'extra'},
];
const TEAM_DATA=[
  {name:'Ram Prasad Sharma',role:'Principal',initial:'R'},{name:'Sunita Thapa',role:'Vice Principal',initial:'S'},
  {name:'Mohan KC',role:'Head of Science',initial:'M'},{name:'Laxmi Devi',role:'Head of Math',initial:'L'},
  {name:'Bikash Adhikari',role:'Head of English',initial:'B'},{name:'Sita Poudel',role:'Librarian',initial:'S'},
];
// Allowed email domains