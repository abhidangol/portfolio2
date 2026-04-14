
/* ═══════════════════════════════════════════
   EmailJS Configuration
   ─────────────────────────────────────────
   1. Sign up at https://www.emailjs.com
   2. Account → API Keys → copy your Public Key
   3. Email Services → create service, copy Service ID
   4. Email Templates → create template using these
      variables: {{from_name}} {{reply_to}} {{subject}} {{message}}
      then copy Template ID
   ═══════════════════════════════════════════ */

const EMAILJS_PUBLIC_KEY  = "YOUR_EMAILJS_PUBLIC_KEY";   // ← replace
const EMAILJS_SERVICE_ID  = "YOUR_EMAILJS_SERVICE_ID";   // ← replace
const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";  // ← replace
emailjs.init(EMAILJS_PUBLIC_KEY);

/* ── Loader ─────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('gone');
  }, 1400);
});

/* ── Custom Cursor ──────────────────────── */
const cur  = document.getElementById('cur');
const curR = document.getElementById('curR');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function tick() {
  rx += (mx - rx) * .11;
  ry += (my - ry) * .11;
  curR.style.left = rx + 'px';
  curR.style.top  = ry + 'px';
  requestAnimationFrame(tick);
})();

document.querySelectorAll('.project-card, .skill-card, .process-step, .edu-card, .stat-cell').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.classList.add('hov'); curR.classList.add('hov') });
  el.addEventListener('mouseleave', () => { cur.classList.remove('hov'); curR.classList.remove('hov') });
});
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.classList.add('link'); curR.classList.add('link') });
  el.addEventListener('mouseleave', () => { cur.classList.remove('link'); curR.classList.remove('link') });
});

/* ── Nav compact + active ───────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('compact', window.scrollY > 40);
  // Active section highlighting
  const sections = ['hero','about','work','experience','process','contact'];
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  });
  document.querySelectorAll('.nav-a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* ── Scroll Reveal ──────────────────────── */
function reveal() {
  const classes = ['.rv', '.rv-l', '.rv-r'];
  classes.forEach(cls => {
    document.querySelectorAll(cls).forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * .91) {
        el.classList.add('in');
      }
    });
  });
}
window.addEventListener('scroll', reveal, { passive: true });
reveal();

/* ── Contact Form ───────────────────────── */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const sb   = document.getElementById('sb');
  const sbl  = document.getElementById('sbl');
  const fmsg = document.getElementById('fmsg');

  sb.disabled = true;
  sbl.textContent = 'Sending…';
  fmsg.textContent = '';
  fmsg.className = '';

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
    .then(() => {
      fmsg.textContent = "Sent — I'll be in touch soon.";
      fmsg.className = 'ok';
      this.reset();
      sbl.textContent = 'Send Message';
      sb.disabled = false;
    })
    .catch(err => {
      fmsg.textContent = 'Failed to send. Please try again.';
      fmsg.className = 'err';
      console.error('EmailJS error:', err);
      sbl.textContent = 'Send Message';
      sb.disabled = false;
    });
});

