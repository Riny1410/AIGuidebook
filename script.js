// script.js – felles logikk for AIGuidebook

(function () {
  /* ---------- SPRÅK-BYTTE (NO/EN) ---------- */
  const langBtn = document.getElementById('lang-toggle');
  const langImg = langBtn ? langBtn.querySelector('img') : null;

  // lagre original (norsk) tekst i data-no for alle elementer som har data-en
  document.querySelectorAll('[data-en]').forEach(el => {
    if (!el.dataset.no) {
      el.dataset.no = el.textContent;
    }
  });

  const savedLang = localStorage.getItem('aiguidebook-lang') || 'no';
  setLanguage(savedLang);

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const current = document.documentElement.dataset.lang || 'no';
      const next = current === 'no' ? 'en' : 'no';
      setLanguage(next);
      localStorage.setItem('aiguidebook-lang', next);
    });
  }

  function setLanguage(lang) {
    document.documentElement.dataset.lang = lang;

    // bytt tekst på alle data-en-elementer
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = (lang === 'en') ? el.dataset.en : el.dataset.no;
    });

    // oppdater flagg 
    if (langImg) {
      if (lang === 'no') {
        langImg.src = 'engelsk1.jpeg';  
        langImg.alt = 'Switch to English';
      } else {
        langImg.src = 'flag-of-Norway.jpg';    
        langImg.alt = 'Bytt til norsk';
      }
    }
  }

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;

      item.classList.toggle('open');

      const answer = item.querySelector('.faq-answer');
      if (!answer) return;

      const isOpen = item.classList.contains('open');
      answer.style.display = isOpen ? 'block' : 'none';
    });
  });

  /* ---------- FAQ-KATEGORI-FANER (om brukt) ---------- */
  const categoryTabs = document.querySelectorAll('.faq-category-tab');
  const faqSections = document.querySelectorAll('.faq-section');

  if (categoryTabs.length && faqSections.length) {
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.target;

        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        faqSections.forEach(sec => {
          sec.classList.toggle('active', sec.dataset.section === target);
        });
      });
    });
  }

  /* ---------- SJEKKLISTE – FANER ---------- */
  const roleTabs = document.querySelectorAll('.role-tab');
  const roleLists = document.querySelectorAll('[data-role-list]');

  if (roleTabs.length && roleLists.length) {
    roleTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const role = tab.dataset.role;

        roleTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        roleLists.forEach(list => {
          list.style.display = (list.dataset.roleList === role) ? 'block' : 'none';
        });
      });
    });
  }
})();