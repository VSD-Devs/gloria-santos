(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced) {
    const sections = document.querySelectorAll(
      ".story__inner, .journey__step, .author__portrait, .author__content, .details__card, .pullquote blockquote"
    );
    sections.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    sections.forEach((el) => observer.observe(el));
  }

  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = header ? header.offsetHeight + 8 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
    });
  });
})();
