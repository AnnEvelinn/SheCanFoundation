// Mobile toggle (slide-in nav)
const mobileToggle = document.getElementById('mobileToggle');
mobileToggle?.addEventListener('click', () => {
  const nav = document.querySelector('.main-nav');
  if (!nav) return;
  nav.classList.toggle('open');
  mobileToggle.classList.toggle('open');
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold: 0.12});
reveals.forEach(r => io.observe(r));

// Simple counter (animated when in view)
const nums = document.querySelectorAll('.num[data-target]');
const counterIo = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target; const target = +el.dataset.target;
    let cur = 0; const step = Math.max(1, Math.floor(target/80));
    const t = setInterval(() => { cur += step; if (cur >= target) { el.textContent = target.toLocaleString(); clearInterval(t); } else el.textContent = cur.toLocaleString(); }, 20);
    counterIo.unobserve(el);
  });
}, {threshold:0.5});
nums.forEach(n => counterIo.observe(n));

// Modal volunteer form (opened from hero CTA)
const openVolunteer = document.getElementById('openVolunteer');
const openVolunteer2 = document.getElementById('openVolunteer2');
let modal;
function createModalIfNeeded(){
  if (modal) return modal;
  modal = document.createElement('div'); modal.className = 'modal';
  modal.innerHTML = `<div class="modal-panel">
    <button id="closeModal" class="btn btn-ghost" style="float:right">Close</button>
    <h3>Volunteer — Join Us</h3>
    <form id="modalForm" class="volunteer-form">
      <div class="form-row"><input name="name" placeholder="Full name" required><input name="email" type="email" placeholder="Email" required></div>
      <select name="interest"><option>Mentorship</option><option>Teaching / Training</option><option>Event Support</option><option>Fundraising</option><option>Digital / Remote</option></select>
      <textarea name="message" placeholder="Tell us about your experience (optional)"></textarea>
      <button class="btn btn-primary" type="submit">Sign Up</button>
    </form>
  </div>`;
  document.body.appendChild(modal);
  document.getElementById('closeModal')?.addEventListener('click', () => modal.classList.remove('open'));
  document.getElementById('modalForm')?.addEventListener('submit', e => {
    e.preventDefault();
    modal.classList.remove('open');
    alert('Thanks for signing up! We will contact you soon.');
    e.target.reset();
  });
  return modal;
}
openVolunteer?.addEventListener('click', ()=>{ createModalIfNeeded().classList.add('open'); });
openVolunteer2?.addEventListener('click', ()=>{ createModalIfNeeded().classList.add('open'); });

// Join button in nav opens join page or modal on small screens
document.getElementById('joinBtn')?.addEventListener('click', (e)=>{
  // let link behave normally on desktop
  if (window.innerWidth < 900){ e.preventDefault(); createModalIfNeeded().classList.add('open'); }
});

// Testimonials slider
const slides = Array.from(document.querySelectorAll('.slide'));
let slideIndex = 0;
function showSlide(i){ slides.forEach((s,idx)=> s.classList.toggle('active', idx===i)); }
if (slides.length){ showSlide(0); setInterval(()=>{ slideIndex = (slideIndex+1)%slides.length; showSlide(slideIndex); }, 4200); }

// Volunteer form on join page: show inline thank-you
document.getElementById('volunteerForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const container = document.getElementById('thankyouMsg');
  if (container){ container.hidden = false; e.target.reset(); e.target.style.display = 'none'; window.scrollTo({top: container.offsetTop-60, behavior:'smooth'}); }
});

// smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a=> a.addEventListener('click', e=>{ e.preventDefault(); const id = a.getAttribute('href').slice(1); const el = document.getElementById(id); if (el) el.scrollIntoView({behavior:'smooth'}); }));
