const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');

const projectDetails = {
  'smart-file-organizer': {
    title: 'Smart File Organizer',
    tags: ['Python', 'SQLite', 'Automation', 'File Management'],
    description:
      'A modular Python-based file management system that automatically organizes files by type while maintaining searchable metadata in a SQLite database.',
    points: [
      'Extension-based file organization with rules-driven classification',
      'SQLite metadata indexing for fast file search and structured queries',
      'File size and type tracking for better inventory visibility',
      'Configurable organization rules and recursive scanning',
      'Logging, dry-run support, and safety-focused file operations',
      'Analytics for organized files and file lifecycle tracking'
    ]
  },
  'medi-reach': {
    title: 'MediReach',
    subtitle: 'Last-Mile Medicine Access',
    tagline: "Don't search harder. Know before you go.",
    tags: ['Python', 'SQLite', 'HTML', 'Healthcare Availability'],
    description:
      'A lightweight medicine availability and coordination concept designed to help users identify medicine availability before travelling to pharmacies.',
    points: [
      'Medicine availability and pharmacy coordination model',
      'Distance-aware lookup for last-mile access',
      'Availability freshness and confidence indicators',
      'Confirmation status for better decision-making',
      'Prototype focused on Paracetamol 500mg, Amoxicillin 500mg, and ORS Sachets',
      'Developed in the context of a VIT hackathon / problem-solving project'
    ]
  },
  'studyflow-ai': {
    title: 'StudyFlow AI',
    subtitle: 'Single-page AI study assistant',
    tagline: 'Turn study material into a smarter revision plan.',
    tags: ['FastAPI', 'Gemini', 'PDF', 'Quiz Generation'],
    description:
      'StudyFlow AI is a polished single-page study assistant that lets students upload notes or documents, extract text, generate structured revision notes, and create a 5-question quiz grounded in the same source.',
    points: [
      'Upload PDF, DOCX, PPTX, PNG, or JPG study material',
      'Automatic text extraction for supported file types',
      'Optional subject and course input for better context',
      'Structured revision notes and exam-focused summaries',
      '5-question quiz generation with scoring and explanations',
      'Fallback generation flow when Gemini is unavailable or rate-limited'
    ]
  }
};

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const setActiveLink = () => {
  const scrollPosition = window.scrollY + 130;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const match = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (!match) return;

    if (scrollPosition >= top && scrollPosition < bottom) {
      navLinks.forEach((link) => link.classList.remove('active'));
      match.classList.add('active');
    }
  });
};

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

const renderModalContent = (key) => {
  const project = projectDetails[key];
  if (!project) return;

  const titleHtml = project.subtitle
    ? `<h4>${project.title}</h4><p class="project-subtitle">${project.subtitle}</p>`
    : `<h4>${project.title}</h4>`;

  const taglineHtml = project.tagline ? `<p class="project-tagline">${project.tagline}</p>` : '';

  modalContent.innerHTML = `
    <div class="modal-body">
      ${titleHtml}
      ${taglineHtml}
      <div class="tag-row">
        ${project.tags.map((tag) => `<span>${tag}</span>`).join('')}
      </div>
      <p>${project.description}</p>
      <ul>
        ${project.points.map((point) => `<li>${point}</li>`).join('')}
      </ul>
    </div>
  `;
};

const openModal = (key) => {
  renderModalContent(key);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

document.querySelectorAll('[data-project]').forEach((button) => {
  button.addEventListener('click', (event) => {
    const key = event.currentTarget.getAttribute('data-project');
    if (key) {
      openModal(key);
    }
  });
});

document.querySelectorAll('[data-close-modal]').forEach((element) => {
  element.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) {
    closeModal();
  }
});
