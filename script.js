/* ========== PAGE NAVIGATION ========== */
// The showPage function is no longer needed as navigation is handled by direct HTML links.
// The 'active' class for sections is now set directly in each HTML file.
// The 'active' class for nav-links is also set directly in each HTML file.
// The mobile menu toggle function is still needed.
// The scroll-to-top functionality is still needed.
// All other page-specific JavaScript will be conditionally executed based on element presence.
/* ========== MOBILE MENU ========== */
const mobileMenu = document.getElementById('mobileMenu');
document.getElementById('mobileMenuBtn').addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
function toggleMobile() { mobileMenu.classList.remove('open'); }

/* ========== DARK/LIGHT MODE ========== */
function setTheme(dark) {
  document.body.classList.toggle('dark', dark);
  document.body.classList.toggle('light', !dark);
  document.querySelectorAll('.toggle-switch').forEach(t => t.classList.toggle('on', dark));
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}
document.getElementById('themeToggle').addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark'));
});
document.getElementById('themeToggleMobile').addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark'));
});
// Load saved theme
if (localStorage.getItem('theme') === 'dark') setTheme(true);

/* ========== SLIDESHOW ========== */
const slideshowContainer = document.querySelector('.relative.h-\\[500px\\]'); // Check for slideshow container
if (slideshowContainer) {
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  function showSlide(n) {
    if (!slides.length) return;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
  }
  function changeSlide(n) { showSlide(slideIndex + n); }
  function goToSlide(n) { showSlide(n); }
  setInterval(() => changeSlide(1), 6000);
  showSlide(slideIndex); // Initialize first slide
}

/* ========== STAT COUNTER ANIMATION (Intersection Observer) ========== */
const counters = document.querySelectorAll('.stat-number');
if (counters.length > 0) {
  const observerOptions = { threshold: 0.5 };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const c = entry.target;
        const target = +c.dataset.target;
        let count = 0;
        const step = target / 60;
        const update = () => {
          count += step;
          if (count < target) {
            c.textContent = Math.ceil(count).toLocaleString();
            requestAnimationFrame(update);
          } else {
            c.textContent = target.toLocaleString() + '+';
          }
        };
        update();
        observer.unobserve(c);
      }
    });
  }, observerOptions);
  counters.forEach(c => counterObserver.observe(c));
}

/* ========== COURSE SEARCH ========== */
const courseSearch = document.getElementById('courseSearch');
const courseCards = document.querySelectorAll('.course-card');
const noResults = document.getElementById('noResults');
if (courseSearch) {
  courseSearch.addEventListener('input', e => {
      const q = e.target.value.toLowerCase().trim();
      let visible = 0;
      courseCards.forEach(c => {
        const match = c.dataset.name.includes(q) || c.textContent.toLowerCase().includes(q);
        c.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      if (noResults) noResults.classList.toggle('hidden', visible > 0);
  });
}

/* ========== RESOURCES TABLE ========== */
const resources = [
  { title: 'WASSCE Mathematics Past Questions 2020-2024', subject: 'Mathematics', type: 'PDF', size: '4.2 MB' },
  { title: 'Algebra Complete Notes - SSS 1-3', subject: 'Mathematics', type: 'PDF', size: '2.8 MB' },
  { title: 'English Language Essay Writing Guide', subject: 'English', type: 'PDF', size: '1.5 MB' },
  { title: 'WASSCE English Comprehension Past Papers', subject: 'English', type: 'PDF', size: '3.1 MB' },
  { title: 'ICT Introduction to Computers - Full Notes', subject: 'ICT', type: 'PDF', size: '5.4 MB' },
  { title: 'Microsoft Office Tutorial Videos', subject: 'ICT', type: 'Video', size: '8 videos' },
  { title: 'Biology Practical Workbook', subject: 'Science', type: 'PDF', size: '6.2 MB' },
  { title: 'Chemistry WASSCE Objective Questions', subject: 'Science', type: 'PDF', size: '2.1 MB' },
  { title: 'Physics Formulas and Definitions', subject: 'Science', type: 'PDF', size: '1.9 MB' },
  { title: 'Commerce Notes for SSS 3', subject: 'Business', type: 'PDF', size: '3.3 MB' },
  { title: 'Financial Accounting Past Questions', subject: 'Business', type: 'PDF', size: '2.7 MB' },
  { title: 'West African History Summary', subject: 'Social Studies', type: 'PDF', size: '2.5 MB' },
];
const typeColors = { PDF: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300', Video: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' };
const resBody = document.getElementById('resourcesBody');
if (resBody) {
  resources.forEach(r => {
      const tr = document.createElement('tr');
      tr.className = 'border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800';
      tr.innerHTML = `
        <td class="p-4 font-medium"><i class="fas ${r.type === 'Video' ? 'fa-video text-green-600' : 'fa-file-pdf text-red-600'} mr-2"></i>${r.title}</td>
        <td class="p-4 hidden md:table-cell">${r.subject}</td>
        <td class="p-4 hidden md:table-cell"><span class="text-xs px-2 py-1 rounded ${typeColors[r.type] || 'bg-gray-100'}">${r.type}</span></td>
        <td class="p-4 hidden md:table-cell opacity-70 text-sm">${r.size}</td>
        <td class="p-4"><button onclick="downloadResource('${r.title}')" class="btn-primary text-sm py-2 px-3"><i class="fas fa-download mr-1"></i><span class="hidden md:inline">Download</span></button></td>`;
      resBody.appendChild(tr);
  });
}
function downloadResource(name) { alert('Download started: ' + name + '\n(In a real deployment, this would download the file.)'); }

/* ========== QUIZ ========== */
const quizData = [
  { q: 'What is the value of x if 2x + 5 = 15?', opts: ['3', '5', '7', '10'], ans: 1 },
  { q: 'Which part of speech describes a noun?', opts: ['Verb', 'Adverb', 'Adjective', 'Pronoun'], ans: 2 },
  { q: 'What does CPU stand for?', opts: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Central Processor User'], ans: 0 },
  { q: 'What is the chemical symbol for gold?', opts: ['Go', 'Gd', 'Au', 'Ag'], ans: 2 },
  { q: 'The capital city of Sierra Leone is:', opts: ['Bo', 'Kenema', 'Makeni', 'Freetown'], ans: 3 }
];
let qCurrent = 0, qScore = 0, qAnswered = false;
function renderQuestion() {
  qAnswered = false;
  const q = quizData[qCurrent];
  if (!q) return;
  document.getElementById('qNum').textContent = qCurrent + 1;
  document.getElementById('qTotal').textContent = quizData.length;
  document.getElementById('qScore').textContent = qScore;
  document.getElementById('qProgress').style.width = ((qCurrent) / quizData.length * 100) + '%';
  document.getElementById('qQuestion').textContent = q.q;
  const optsDiv = document.getElementById('qOptions');
  optsDiv.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('div');
    btn.className = 'quiz-option';
    btn.innerHTML = `<strong class="mr-2">${String.fromCharCode(65+i)}.</strong> ${opt}`;
    btn.onclick = () => selectAnswer(i, btn);
    optsDiv.appendChild(btn);
  });
  document.getElementById('qNext').textContent = qCurrent === quizData.length - 1 ? 'See Results' : 'Next Question';
}
function selectAnswer(idx, el) {
  if (qAnswered) return;
  qAnswered = true;
  const correct = quizData[qCurrent].ans;
  const options = document.querySelectorAll('.quiz-option');
  options[correct].classList.add('correct');
  if (idx === correct) { qScore++; } else { el.classList.add('wrong'); }
  document.getElementById('qScore').textContent = qScore;
}
function nextQuestion() {
  if (!qAnswered) { alert('Please select an answer first!'); return; }
  qCurrent++;
  if (qCurrent < quizData.length) { renderQuestion(); }
  else { showQuizResult(); }
}
function showQuizResult() {
  document.getElementById('quizContainer').classList.add('hidden');
  document.getElementById('quizResult').classList.remove('hidden');
  document.getElementById('finalScore').textContent = qScore + ' / ' + quizData.length;
  const pct = qScore / quizData.length;
  let msg = '';
  if (pct >= 0.8) msg = 'Excellent work! Ready for exams! 🌟';
  else if (pct >= 0.6) msg = 'Good job! A little more study and you will be top of your class! 👍';
  else if (pct >= 0.4) msg = 'Keep practicing — browse our resources for more study materials. 📚';
  else msg = 'Do not give up! Review our courses and try again. 💪';
  document.getElementById('resultMsg').textContent = msg;
}
function restartQuiz() {
  qCurrent = 0; qScore = 0;
  document.getElementById('quizContainer').classList.remove('hidden');
  document.getElementById('quizResult').classList.add('hidden');
  document.getElementById('qProgress').style.width = '20%';
  renderQuestion();
}

// Only render quiz if quiz section exists and is active
if (document.getElementById('quizContainer') && document.getElementById('page-quiz')?.classList.contains('active')) {
  renderQuestion();
}

/* ========== GRADE CALCULATOR ========== */
const gradeScale = [
  { min: 75, grade: 'A1', points: 1 },
  { min: 70, grade: 'B2', points: 2 },
  { min: 65, grade: 'B3', points: 3 },
  { min: 60, grade: 'C4', points: 4 },
  { min: 55, grade: 'C5', points: 5 },
  { min: 50, grade: 'C6', points: 6 },
  { min: 45, grade: 'D7', points: 7 },
  { min: 40, grade: 'E8', points: 8 },
  { min: 0,  grade: 'F9', points: 9 }
];
const defaultSubjects = ['Mathematics', 'English Language', 'ICT', 'Science', 'Social Studies', 'Business Studies'];
const subjectInputs = document.getElementById('subjectInputs');
function renderSubjectFields() {
  if (!subjectInputs) return;
  subjectInputs.innerHTML = '';
  defaultSubjects.forEach((sub, i) => {
    const div = document.createElement('div');
    div.className = 'flex gap-2 items-center';
    div.innerHTML = `
      <input type="text" value="${sub}" class="subj-name flex-1 px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 outline-none" placeholder="Subject name">
      <input type="number" min="0" max="100" class="subj-score w-24 px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 outline-none text-center" placeholder="Score">
      ${i >= 6 ? '<button type="button" onclick="this.parentElement.remove()" class="text-red-500 px-2"><i class="fas fa-trash"></i></button>' : ''}`;
    subjectInputs.appendChild(div);
  });
}
function addSubject() {
  const div = document.createElement('div');
  div.className = 'flex gap-2 items-center';
  div.innerHTML = `
    <input type="text" class="subj-name flex-1 px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 outline-none" placeholder="Subject name">
    <input type="number" min="0" max="100" class="subj-score w-24 px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 outline-none text-center" placeholder="Score">
    <button type="button" onclick="this.parentElement.remove()" class="text-red-500 px-2"><i class="fas fa-trash"></i></button>`;
  subjectInputs.appendChild(div);
}
// Only render subject fields if the grade calculator section is active
if (document.getElementById('page-calculator')?.classList.contains('active')) {
  renderSubjectFields();
}

const gradeForm = document.getElementById('gradeForm');
if (gradeForm) {
  gradeForm.addEventListener('submit', e => {
    e.preventDefault();
    const rows = subjectInputs.querySelectorAll('div');
    const results = [];
    let totalPoints = 0, valid = 0;
    rows.forEach(r => {
      const name = r.querySelector('.subj-name').value.trim() || 'Subject';
      const scoreVal = r.querySelector('.subj-score').value;
      const score = parseFloat(scoreVal);
      if (!isNaN(score) && score >= 0 && score <= 100) {
        const g = gradeScale.find(gs => score >= gs.min);
        results.push({ name, score, grade: g.grade, points: g.points });
        totalPoints += g.points;
        valid++;
      }
    });
    if (valid === 0) { alert('Please enter at least one valid score (0-100).'); return; }
    let tableHtml = '<table class="w-full border-collapse"><thead><tr style="background: var(--secondary); color: white;"><th class="p-2 text-left">Subject</th><th class="p-2 text-center">Score</th><th class="p-2 text-center">Grade</th><th class="p-2 text-center">Points</th></tr></thead><tbody>';
    results.forEach(r => {
      const fail = r.grade === 'F9' || r.grade === 'E8' || r.grade === 'D7';
      tableHtml += `<tr class="border-b border-gray-200 dark:border-gray-700">
        <td class="p-2">${r.name}</td>
        <td class="p-2 text-center">${r.score}</td>
        <td class="p-2 text-center font-bold ${fail ? 'text-red-500' : 'text-green-600'}">${r.grade}</td>
        <td class="p-2 text-center">${r.points}</td>
      </tr>`;
    });
    tableHtml += '</tbody></table>';
    document.getElementById('gradeTable').innerHTML = tableHtml;
    const avg = (totalPoints / valid).toFixed(2);
    let verdict = '';
    if (avg <= 3) verdict = '🎉 Excellent! You qualify for most university programmes.';
    else if (avg <= 5) verdict = '👍 Good performance. University admission possible.';
    else if (avg <= 6) verdict = '📘 Fair — focus on improving your weaker subjects.';
    else verdict = '⚠️ Needs improvement — we recommend visiting our Resources page.';
    document.getElementById('gradeSummary').innerHTML = `
      <p class="text-lg"><strong>Total Points:</strong> ${totalPoints} (best of ${valid} subjects)</p>
      <p class="text-lg"><strong>Average Point:</strong> ${avg}</p>
      <p class="text-lg mt-2"><strong>Assessment:</strong> ${verdict}</p>
    `;
    document.getElementById('gradeResult').classList.remove('hidden');
  });
}

/* ========== FORM VALIDATION ========== */
function validateField(input, condition) {
  const errDiv = input.parentElement.querySelector('.error');
  if (condition) {
    input.classList.remove('invalid');
    if (errDiv) errDiv.classList.remove('show');
    return true;
  } else {
    input.classList.add('invalid');
    if (errDiv) errDiv.classList.add('show');
    return false;
  }
}
function emailRegex(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

// Register form
document.getElementById('registerForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  let valid = true;
  valid &= validateField(f.fullname, f.fullname.value.trim().length >= 2);
  valid &= validateField(f.email, emailRegex(f.email.value.trim()));
  valid &= validateField(f.school, f.school.value.trim().length >= 2);
  valid &= validateField(f.course, f.course.value !== '');
  const termsErr = document.getElementById('termsError');
  if (!f.terms.checked) { termsErr.classList.add('show'); valid = false; }
  else termsErr.classList.remove('show');
  if (valid) {
    document.getElementById('registerSuccess').classList.remove('hidden');
    f.reset();
    setTimeout(() => document.getElementById('registerSuccess').classList.add('hidden'), 6000);
  }
});

// Contact form
document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  let valid = true;
  valid &= validateField(f.name, f.name.value.trim().length >= 2);
  valid &= validateField(f.email, emailRegex(f.email.value.trim()));
  valid &= validateField(f.subject, f.subject.value.trim().length >= 2);
  valid &= validateField(f.message, f.message.value.trim().length >= 10);
  if (valid) {
    document.getElementById('contactSuccess').classList.remove('hidden');
    f.reset();
    setTimeout(() => document.getElementById('contactSuccess').classList.add('hidden'), 6000);
  }
});

// Newsletter
document.getElementById('newsletterForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const input = e.target.querySelector('input');
  if (emailRegex(input.value.trim())) {
    alert('Thank you for subscribing! You will receive our newsletter at ' + input.value);
    input.value = '';
  } else { alert('Please enter a valid email address.'); }
});

/* ========== SCROLL TO TOP ========== */
window.addEventListener('scroll', () => {
  document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);
});