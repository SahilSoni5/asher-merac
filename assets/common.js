/* ============================================================
   ASHAR MERAC 2 — shared behaviour (requires GSAP + ScrollTrigger,
   optional Lenis). Exposes window.MUI.
   ============================================================ */
(function () {
  const D = window.MERAC;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const h = (tag, attrs = {}, html = "") => {
    const e = document.createElement(tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (html) e.innerHTML = html;
    return e;
  };
  const NS = "http://www.w3.org/2000/svg";
  const s = (tag, attrs = {}) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ICON = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7a11.4 11.4 0 01-4.4-3.9c-.3-.5-1.1-1.5-1.1-2.9s.7-2 1-2.3a1 1 0 01.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6a8 8 0 001.5 1.8 7 7 0 002.1 1.3c.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l2 .9c.3.2.5.2.5.4.1.1.1.7-.1 1.1z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 6h18v12H3z"/><path d="M3 7l9 6 9-6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h16M14 6l6 6-6 6"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'
  };

  /* ---------------- smooth scroll ---------------- */
  function smooth() {
    gsap.registerPlugin(ScrollTrigger);
    if (reduce || !window.Lenis) return null;
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach((a) =>
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const t = $(id);
        if (!t) return;
        e.preventDefault();
        lenis.scrollTo(t, { offset: 0, duration: 1.6 });
      })
    );
    window.__lenis = lenis;
    return lenis;
  }

  /* ---------------- text splitting ---------------- */
  function split(el, mode = "words") {
    if (el.dataset.split) return $$(".sw > i", el);
    el.dataset.split = 1;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          const parts = mode === "chars" ? [...n.textContent] : n.textContent.split(/(\s+)/);
          parts.forEach((p) => {
            if (/^\s+$/.test(p) || p === "") { frag.appendChild(document.createTextNode(p)); return; }
            const w = h("span", { class: "sw" });
            w.style.cssText = "display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em;margin-bottom:-.08em";
            const i = h("i");
            i.style.cssText = "display:inline-block;font-style:inherit;will-change:transform";
            i.textContent = p;
            w.appendChild(i);
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
      });
    };
    walk(el);
    return $$(".sw > i", el);
  }

  /* reveal any [data-reveal] headline when it scrolls in */
  function reveals(scope = document) {
    $$("[data-reveal]", scope).forEach((el) => {
      const parts = split(el, el.dataset.reveal === "chars" ? "chars" : "words");
      gsap.from(parts, {
        yPercent: 110, rotate: 4, duration: 1.3, ease: "expo.out", stagger: el.dataset.reveal === "chars" ? 0.025 : 0.06,
        scrollTrigger: { trigger: el, start: "top 88%" }
      });
    });
    $$("[data-fade]", scope).forEach((el) =>
      gsap.from(el, { y: 40, autoAlpha: 0, duration: 1.4, ease: "expo.out", delay: +el.dataset.fade || 0, scrollTrigger: { trigger: el, start: "top 90%" } })
    );
    $$("[data-stagger]", scope).forEach((el) =>
      gsap.from(el.children, { y: 30, autoAlpha: 0, duration: 1.1, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: el, start: "top 88%" } })
    );
    $$("[data-count]", scope).forEach((el) => {
      const end = parseFloat(el.dataset.count), dec = (el.dataset.count.split(".")[1] || "").length, suf = el.dataset.suffix || "";
      const o = { v: 0 };
      el.textContent = (0).toFixed(dec) + suf;
      gsap.to(o, {
        v: end, duration: 2.4, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => (el.textContent = (dec ? o.v.toFixed(dec) : Math.round(o.v).toLocaleString("en-IN")) + suf)
      });
    });
  }

  /* ---------------- chrome: modal, rail, switcher, film ---------------- */
  function chrome(variant) {
    const cfgOpts = D.configs.map((c) => `<option>${c.bhk}</option>`).join("");
    const modal = h("div", { class: "m-modal", role: "dialog", "aria-modal": "true", "aria-label": "Enquire" }, `
      <div class="m-modal__veil" data-close></div>
      <div class="m-modal__box">
        <button class="m-modal__close" data-close aria-label="Close">×</button>
        <div class="m-modal__art" style="background-image:url(../assets/img/tower.jpg);background-position:center 30%"><p>${D.tagline}<br>${D.taglineSub}</p></div>
        <div class="m-modal__form">
          <form novalidate>
            <h3 data-mtitle>Book a site visit</h3>
            <p class="sub" data-msub>Enter your details and our relationship manager will call you back.</p>
            <div class="m-field"><input name="name" required placeholder=" " autocomplete="name"><label>Full name</label></div>
            <div class="m-field"><input name="phone" required placeholder=" " inputmode="tel" pattern="[0-9+ ]{10,14}" autocomplete="tel"><label>Mobile number</label></div>
            <div class="m-field"><input name="email" type="email" placeholder=" " autocomplete="email"><label>Email (optional)</label></div>
            <div class="m-field"><select name="config">${cfgOpts}</select><label>Configuration</label></div>
            <label class="m-check"><input type="checkbox" checked name="wa"> Agree to receive WhatsApp messages</label>
            <button class="m-btn" type="submit" style="width:100%;justify-content:center">Submit ${ICON.arrow}</button>
            <p class="m-rera">MahaRERA No. ${D.rera.merac2} · ${D.rera.url.replace("https://", "")}</p>
          </form>
          <div class="m-modal__ok"><svg width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="28" r="27" fill="none" stroke="#b77e29"/><path d="M17 29l7 7 15-16" fill="none" stroke="#b77e29" stroke-width="2"/></svg>
            <h4>Thank you</h4><p>Our team will reach out to you shortly.<br>Or call <a href="tel:${D.phones.primary}">${D.phones.primary}</a></p></div>
        </div>
      </div>`);
    document.body.appendChild(modal);
    const box = $(".m-modal__box", modal), veil = $(".m-modal__veil", modal);
    const open = (title, sub) => {
      modal.classList.remove("sent");
      if (title) $("[data-mtitle]", modal).textContent = title;
      if (sub) $("[data-msub]", modal).textContent = sub;
      modal.classList.add("is-open");
      window.__lenis && window.__lenis.stop();
      gsap.to(veil, { opacity: 1, duration: 0.5 });
      gsap.to(box, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" });
    };
    const close = () => {
      gsap.to(box, { opacity: 0, y: 30, duration: 0.4 });
      gsap.to(veil, { opacity: 0, duration: 0.4, onComplete: () => modal.classList.remove("is-open") });
      window.__lenis && window.__lenis.start();
    };
    $$("[data-close]", modal).forEach((b) => b.addEventListener("click", close));
    addEventListener("keydown", (e) => e.key === "Escape" && close());
    $("form", modal).addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      if (!f.name.value.trim() || !/^[0-9+ ]{10,14}$/.test(f.phone.value.trim())) {
        (f.name.value.trim() ? f.phone : f.name).focus();
        return;
      }
      /* TODO: wire to CRM endpoint. Payload: */
      console.info("[Merac lead]", Object.fromEntries(new FormData(f)));
      modal.classList.add("sent");
    });
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-enquire]");
      if (t) { e.preventDefault(); open(t.dataset.enquire || null, t.dataset.sub || null); }
      const f = e.target.closest("[data-film]");
      if (f) { e.preventDefault(); film(f.dataset.film); }
    });

    const rail = h("div", { class: "m-rail" }, `
      <a href="tel:${D.phones.primary}" aria-label="Call">${ICON.phone}</a>
      <a href="https://wa.me/91${D.phones.primary}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.wa}</a>
      <button data-enquire="Enquire now" aria-label="Enquire">${ICON.mail}</button>`);
    document.body.appendChild(rail);

    const sw = h("nav", { class: "m-switch", "aria-label": "Design variants" },
      [1, 2, 3, 4].map((n) => `<a href="../v${n}/index.html" class="${n === variant ? "on" : ""}">V${n}</a>`).join(""));
    document.body.appendChild(sw);

    const fb = h("div", { class: "m-film" }, `<button aria-label="Close">×</button><div class="m-film__in"></div>`);
    document.body.appendChild(fb);
    const film = (id) => {
      $(".m-film__in", fb).innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
      fb.classList.add("is-open");
      window.__lenis && window.__lenis.stop();
    };
    $("button", fb).addEventListener("click", () => {
      fb.classList.remove("is-open");
      $(".m-film__in", fb).innerHTML = "";
      window.__lenis && window.__lenis.start();
    });
    return { open, close };
  }

  /* ---------------- radial location locator ---------------- */
  function locator(root) {
    const L = D.location, C = 400, R0 = 46, R1 = 352, MAX = 26;
    const rad = (km) => R0 + (R1 - R0) * (Math.log(1 + km * 1.6) / Math.log(1 + MAX * 1.6));
    const pt = (km, deg) => { const a = ((deg - 90) * Math.PI) / 180, r = rad(km); return [C + r * Math.cos(a), C + r * Math.sin(a)]; };

    root.classList.add("m-loc");
    root.innerHTML = `
      <div class="m-loc__stage"><svg viewBox="0 0 800 800" aria-label="Distance map from Ashar Merac 2"></svg>
        <div class="m-loc__mapwrap"></div></div>
      <div class="m-loc__side">
        <div class="m-loc__tabs" role="tablist"></div>
        <ul class="m-loc__list"></ul>
        <div class="m-loc__foot">
          <button class="m-btn m-btn--ghost" data-maptoggle>View live map</button>
          <a class="m-btn" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(L.mapQuery)}" target="_blank" rel="noopener">Directions ${ICON.arrow}</a>
        </div>
        <p class="m-note">Distances as per brochure; map positions are indicative. Timings may vary with traffic.</p>
      </div>`;
    const svg = $("svg", root), tabs = $(".m-loc__tabs", root), list = $(".m-loc__list", root);

    /* defs + base layers */
    const defs = s("defs");
    defs.innerHTML = `<radialGradient id="mlsw" cx="0" cy="0" r="1"><stop offset="0" stop-color="#b77e29" stop-opacity=".22"/><stop offset="1" stop-color="#b77e29" stop-opacity="0"/></radialGradient>`;
    svg.appendChild(defs);
    /* SGNP / Yogi hills wedge to the west */
    const wedge = s("path", { class: "m-loc__sgnp", d: `M${C} ${C} L${pt(MAX, 215)} A${R1} ${R1} 0 0 1 ${pt(MAX, 305)} Z` });
    svg.appendChild(wedge);
    const g0 = s("g"); svg.appendChild(g0);
    [[1, "1 km"], [2.5, "2.5"], [5, "5 km"], [10, "10"], [25, "25 km"]].forEach(([km, t]) => {
      g0.appendChild(s("circle", { class: "m-loc__ring", cx: C, cy: C, r: rad(km) }));
      const l = s("text", { class: "m-loc__ringlbl", x: C + 6, y: C - rad(km) - 6 }); l.textContent = t; g0.appendChild(l);
    });
    const sweep = s("path", { class: "m-loc__sweep", d: `M${C} ${C} L${C} ${C - R1} A${R1} ${R1} 0 0 1 ${C + R1 * Math.sin(0.6)} ${C - R1 * Math.cos(0.6)} Z`, fill: "url(#mlsw)" });
    svg.appendChild(sweep);
    [["N", 0], ["E", 90], ["S", 180], ["W", 270]].forEach(([t, d]) => {
      const a = ((d - 90) * Math.PI) / 180, e = s("text", { class: "m-loc__ringlbl", x: C + (R1 + 22) * Math.cos(a), y: C + (R1 + 22) * Math.sin(a) + 4, "text-anchor": "middle" });
      e.textContent = t; svg.appendChild(e);
    });
    [["Sanjay Gandhi National Park", 262, 16], ["Thane", 85, 9], ["Mulund", 185, 3.8], ["Powai · BKC · Airport", 210, 24]].forEach(([t, d, km]) => {
      const [x, y] = pt(km, d), e = s("text", { class: "m-loc__geo", x, y, "text-anchor": "middle" }); e.textContent = t; svg.appendChild(e);
    });
    const rays = s("g"); svg.appendChild(rays);
    const dots = s("g"); svg.appendChild(dots);
    const lbls = s("g"); svg.appendChild(lbls);
    const pulse = s("circle", { class: "m-loc__pulse", cx: C, cy: C, r: 14 }); svg.appendChild(pulse);
    svg.appendChild(s("circle", { class: "m-loc__core", cx: C, cy: C, r: 9 }));
    const cl = s("text", { class: "m-loc__corelbl", x: C, y: C + 38, "text-anchor": "middle" }); cl.textContent = "ASHAR MERAC 2"; svg.appendChild(cl);

    if (!reduce) {
      gsap.to(sweep, { rotate: 360, duration: 14, ease: "none", repeat: -1, svgOrigin: `${C} ${C}` });
      gsap.fromTo(pulse, { attr: { r: 10 }, opacity: 0.9 }, { attr: { r: 46 }, opacity: 0, duration: 2.4, repeat: -1, ease: "power2.out" });
    }

    const show = (cat) => {
      $$(".m-loc__tab", root).forEach((b) => b.classList.toggle("is-on", b.dataset.id === cat.id));
      rays.innerHTML = dots.innerHTML = lbls.innerHTML = list.innerHTML = "";
      const items = [...cat.items].sort((a, b) => a[1] - b[1]);
      items.forEach(([name, km, deg], i) => {
        const [x, y] = pt(km, deg);
        const ray = s("path", { class: "m-loc__ray", d: `M${C} ${C} L${x} ${y}` });
        rays.appendChild(ray);
        const dot = s("circle", { class: "m-loc__dot", cx: x, cy: y, r: 6 });
        dots.appendChild(dot);
        const right = x >= C;
        const lb = s("text", { class: "m-loc__lbl", x: x + (right ? 12 : -12), y: y + 4, "text-anchor": right ? "start" : "end" });
        lb.textContent = name; lbls.appendChild(lb);
        const dist = km < 1 ? Math.round(km * 1000) + " m" : km + " km";
        const li = h("li", {}, `<span>${name}</span><b>${dist}</b>`);
        list.appendChild(li);
        const on = (v) => { [dot, lb, li].forEach((e) => e.classList.toggle("is-hot", v)); };
        [dot, li].forEach((e) => { e.addEventListener("mouseenter", () => on(true)); e.addEventListener("mouseleave", () => on(false)); });
        dot.addEventListener("click", () => on(!dot.classList.contains("is-hot")));
        const len = Math.hypot(x - C, y - C);
        gsap.fromTo(ray, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.1, delay: i * 0.08, ease: "power3.out" });
        gsap.fromTo(dot, { attr: { r: 0 } }, { attr: { r: 6 }, duration: 0.6, delay: 0.5 + i * 0.08, ease: "back.out(3)" });
        gsap.fromTo(li, { x: 20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.7, delay: i * 0.05, ease: "expo.out" });
        if (i < 3) gsap.delayedCall(0.9 + i * 0.08, () => lb.classList.add("is-hot"));
      });
    };
    L.categories.forEach((cat, i) => {
      const b = h("button", { class: "m-loc__tab", role: "tab", "data-id": cat.id },
        `<svg viewBox="0 0 24 24"><path d="${cat.icon}"/></svg>${cat.name}`);
      b.addEventListener("click", () => show(cat));
      tabs.appendChild(b);
    });
    ScrollTrigger.create({ trigger: root, start: "top 75%", once: true, onEnter: () => show(L.categories[0]) });

    const tog = $("[data-maptoggle]", root), mw = $(".m-loc__mapwrap", root);
    tog.addEventListener("click", () => {
      if (!mw.firstChild) mw.innerHTML = `<iframe loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Ashar Merac 2 on Google Maps" src="https://maps.google.com/maps?q=${encodeURIComponent(L.mapQuery)}&z=14&output=embed"></iframe>`;
      const on = root.classList.toggle("show-map");
      tog.textContent = on ? "Back to locator" : "View live map";
    });
  }

  /* ---------------- floor plans (indicative line drawings) ---------------- */
  /* [x,y,w,h,label,isDeck] in a 400x300 frame. Indicative only. */
  const PLANS = {
    "1bhk": [[20, 20, 200, 150, "Living"], [220, 20, 160, 150, "Bedroom"], [20, 170, 120, 110, "Kitchen"], [140, 170, 80, 110, "Foyer"], [220, 170, 90, 110, "Bath"], [310, 170, 70, 110, "Deck", 1]],
    "2bhk": [[20, 20, 130, 130, "Bedroom 2"], [150, 20, 130, 160, "Living"], [280, 20, 100, 150, "Bedroom 1"], [20, 150, 130, 70, "Bath"], [20, 220, 130, 60, "Deck", 1], [150, 180, 130, 100, "Kitchen"], [280, 170, 100, 50, "Bath"], [280, 220, 100, 60, "Deck", 1]],
    "3bhk": [[20, 20, 110, 120, "Bedroom 3"], [130, 20, 150, 140, "Living"], [280, 20, 100, 120, "Bedroom 1"], [20, 140, 110, 60, "Bath"], [20, 200, 110, 80, "Bedroom 2"], [130, 160, 80, 120, "Kitchen"], [210, 160, 70, 120, "Dining"], [280, 140, 100, 60, "Bath"], [280, 200, 100, 80, "Deck", 1]],
    "4bhk": [[20, 20, 100, 110, "Bedroom 4"], [120, 20, 160, 130, "Living"], [280, 20, 100, 110, "Bedroom 1"], [20, 130, 100, 70, "Bedroom 3"], [20, 200, 100, 80, "Bedroom 2"], [120, 150, 80, 130, "Dining"], [200, 150, 80, 70, "Kitchen"], [200, 220, 80, 60, "Bath"], [280, 130, 100, 70, "Bath"], [280, 200, 100, 80, "Deck", 1]]
  };
  function floorplans(root) {
    root.classList.add("m-fp");
    root.innerHTML = `
      <div class="m-fp__info">
        <div class="m-fp__tabs" role="tablist">${D.configs.map((c) => `<button class="m-fp__tab" data-id="${c.id}">${c.bhk}</button>`).join("")}</div>
        <span class="m-fp__unit">Carpet area · sq.ft.</span>
        <p class="m-fp__big" data-big>—</p>
        <div class="m-fp__rooms" data-rooms></div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="m-btn" data-fpcta>Request floor plan ${ICON.arrow}</button>
          <button class="m-btn m-btn--ghost" data-fpprice>Get price</button>
        </div>
      </div>
      <div class="m-fp__stage"><span class="m-fp__badge">Indicative layout · not to scale</span><div class="m-fp__thumb" hidden></div><svg viewBox="0 0 400 300"></svg></div>`;
    const svg = $(".m-fp__stage svg", root), big = $("[data-big]", root), rooms = $("[data-rooms]", root), thumb = $(".m-fp__thumb", root);
    const cta = $("[data-fpcta]", root), pr = $("[data-fpprice]", root);
    const draw = (c) => {
      $$(".m-fp__tab", root).forEach((b) => b.classList.toggle("is-on", b.dataset.id === c.id));
      cta.dataset.enquire = `${c.bhk} floor plan`; cta.dataset.sub = "Detailed RERA floor plans are shared on request.";
      pr.dataset.enquire = `${c.bhk} pricing`; pr.dataset.sub = "Please enter your details to get the detailed pricing information.";
      const o = { v: 0 };
      gsap.to(o, { v: c.max, duration: 1.2, ease: "power3.out", onUpdate: () => {
        big.textContent = c.min === c.max ? Math.round(o.v) : `${Math.round((o.v / c.max) * c.min)}–${Math.round(o.v)}`;
      } });
      rooms.innerHTML = [...new Set(c.rooms)].map((r) => `<span>${r}</span>`).join("");
      gsap.from(rooms.children, { y: 10, autoAlpha: 0, stagger: 0.04, duration: 0.6, ease: "expo.out" });
      if (c.img) { thumb.hidden = false; thumb.style.backgroundImage = `url(${c.img})`; } else thumb.hidden = true;
      svg.innerHTML = "";
      const g = s("g"); svg.appendChild(g);
      PLANS[c.id].forEach(([x, y, w, hh, label, deck], i) => {
        const r = s("rect", { x, y, width: w, height: hh, class: deck ? "m-fp__deck" : "m-fp__wall" });
        g.appendChild(r);
        const t = s("text", { x: x + w / 2, y: y + hh / 2 + 3, class: "m-fp__lbl" }); t.textContent = label; g.appendChild(t);
        const per = 2 * (w + hh);
        gsap.fromTo(r, { strokeDasharray: per, strokeDashoffset: per }, { strokeDashoffset: 0, duration: 1.4, delay: i * 0.06, ease: "power2.inOut" });
        gsap.fromTo(t, { opacity: 0 }, { opacity: 1, delay: 0.6 + i * 0.06, duration: 0.6 });
        if (!deck && i % 2 === 0) { const d = s("path", { class: "m-fp__door", d: `M${x + 12} ${y + hh} a18 18 0 0 1 18 -18 v18` }); g.appendChild(d); }
      });
      const outer = s("rect", { x: 18, y: 18, width: 364, height: 264, fill: "none", stroke: "var(--fg)", "stroke-width": 4 });
      g.prepend(outer);
      gsap.fromTo(outer, { strokeDasharray: 1256, strokeDashoffset: 1256 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" });
    };
    $$(".m-fp__tab", root).forEach((b) => b.addEventListener("click", () => draw(D.configs.find((c) => c.id === b.dataset.id))));
    ScrollTrigger.create({ trigger: root, start: "top 75%", once: true, onEnter: () => draw(D.configs[1]) });
  }

  /* ---------------- magnetic buttons ---------------- */
  function magnetic(scope = document) {
    if (matchMedia("(hover:none)").matches) return;
    $$(".m-btn, [data-magnetic]", scope).forEach((b) => {
      b.addEventListener("mousemove", (e) => {
        const r = b.getBoundingClientRect();
        gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.6, ease: "power3.out" });
      });
      b.addEventListener("mouseleave", () => gsap.to(b, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,.4)" }));
    });
  }

  window.MUI = { D, $, $$, h, ICON, smooth, split, reveals, chrome, locator, floorplans, magnetic, reduce };
})();
