(() => {
  "use strict";

  const app = document.getElementById("app");
  const MIX_SIZE = 15;
  const TYPE_LABEL = {
    single: "Eine Antwort ist richtig",
    multi: "Mehrere Antworten möglich",
    tf: "Wahr oder falsch?",
    match: "Zuordnen",
    order: "Reihenfolge",
    number: "Eingabe"
  };

  const state = { name: "", quizTitle: "", questions: [], index: 0, results: [], active: false };

  // ---------- Hilfsfunktionen ----------
  const el = (tag, attrs = {}, ...children) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    }
    for (const c of children.flat()) {
      if (c == null) continue;
      node.append(c instanceof Node ? c : document.createTextNode(c));
    }
    return node;
  };
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const plain = (html) => {
    const d = document.createElement("div");
    d.innerHTML = html;
    return d.textContent;
  };
  const store = {
    get(k) { try { return localStorage.getItem(k) || ""; } catch { return ""; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* egal */ } }
  };
  const normalize = (s) => String(s).trim().replace(/\s+/g, "").replace(",", ".").toLowerCase();

  window.addEventListener("beforeunload", (e) => {
    if (state.active) { e.preventDefault(); e.returnValue = ""; }
  });

  // ---------- Startseite ----------
  function renderStart() {
    state.active = false;
    app.replaceChildren();
    window.scrollTo(0, 0);

    const nameInput = el("input", { type: "text", id: "name", autocomplete: "off", placeholder: "Vor- und Nachname", value: store.get("quiz-name") });
    const err = el("p", { class: "error", role: "alert" });

    const start = (title, questions) => {
      const name = nameInput.value.trim();
      if (name.length < 2) {
        err.textContent = "Bitte gib zuerst deinen Namen ein.";
        nameInput.focus();
        return;
      }
      store.set("quiz-name", name);
      state.name = name;
      state.quizTitle = title;
      state.questions = questions.map((q) => ({ ...q }));
      state.index = 0;
      state.results = [];
      state.active = true;
      renderQuestion();
    };

    const episodeCards = EPISODES.map((ep) => el("div", { class: "episode" },
      el("div", { class: "episode-head" },
        el("div", {},
          el("div", { class: "episode-title" }, ep.title),
          el("div", { class: "episode-orig" }, `„${ep.original}“ · ${ep.questions.length} Fragen`)
        ),
        el("button", { class: "btn small", onclick: () => start(ep.title, ep.questions) }, "Quiz starten")
      ),
      el("details", {},
        el("summary", {}, "Wichtige Begriffe aus dem Video"),
        el("table", { class: "glossary" },
          el("tbody", {}, ep.glossary.map(([en, de]) => el("tr", {}, el("td", {}, en), el("td", {}, de))))
        ),
        el("div", { class: "links" }, el("a", { href: ep.youtube, target: "_blank", rel: "noopener" }, "Video auf YouTube öffnen ↗"))
      )
    ));

    const mixCard = el("div", { class: "episode" },
      el("div", { class: "episode-head" },
        el("div", {},
          el("div", { class: "episode-title" }, "Gemischter Test: Folgen 5–8"),
          el("div", { class: "episode-orig" }, `${MIX_SIZE} zufällige Fragen aus allen vier Folgen`)
        ),
        el("button", { class: "btn small secondary", onclick: () => {
          const pool = EPISODES.flatMap((ep) => ep.questions.filter((q) => !q.noMix));
          start("Gemischter Test (Folgen 5–8)", shuffle(pool).slice(0, MIX_SIZE));
        } }, "Quiz starten")
      )
    );

    app.append(
      el("section", { class: "card" },
        el("label", { class: "field", for: "name" }, "Dein Name"),
        nameInput,
        el("p", { class: "hint" }, "Dein Name erscheint am Ende auf der Auswertung. Er wird nirgendwohin gesendet."),
        err
      ),
      el("section", { class: "card" },
        el("h2", {}, "Wähle ein Quiz"),
        el("div", { class: "episodes" }, episodeCards, mixCard)
      )
    );
  }

  // ---------- Frage ----------
  function renderQuestion() {
    const q = state.questions[state.index];
    const total = state.questions.length;
    app.replaceChildren();
    window.scrollTo(0, 0);

    const body = el("div", {});
    const feedback = el("div", {});
    const checkBtn = el("button", { class: "btn" }, "Antwort prüfen");
    const ui = buildInput(q, body, () => { checkBtn.disabled = !ui.ready(); });
    checkBtn.disabled = !ui.ready();

    checkBtn.addEventListener("click", () => {
      if (checkBtn.dataset.done) return next();
      const ok = ui.check();
      body.classList.add("locked");
      state.results.push({ q, ok });
      feedback.replaceChildren(el("div", { class: `feedback ${ok ? "good" : "bad"}` },
        el("strong", {}, ok ? "Richtig!" : "Leider nicht richtig."),
        ui.solution && !ok ? el("p", { html: ui.solution, style: "margin:0 0 6px" }) : null,
        el("div", { html: q.explain })
      ));
      checkBtn.dataset.done = "1";
      checkBtn.textContent = state.index + 1 < total ? "Nächste Frage →" : "Zur Auswertung →";
      checkBtn.focus();
    });

    const points = state.results.filter((r) => r.ok).length;
    app.append(
      el("div", { class: "progress" },
        el("span", {}, `Frage ${state.index + 1} von ${total}`),
        el("div", { class: "bar", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": String(total), "aria-valuenow": String(state.index) },
          el("span", { style: `width:${(state.index / total) * 100}%` })),
        el("span", {}, `${points} Punkte`)
      ),
      el("section", { class: "card" },
        el("div", { class: "qtype" }, TYPE_LABEL[q.type]),
        el("p", { class: "question", html: q.q }),
        body,
        feedback,
        el("div", { class: "actions" }, checkBtn)
      )
    );
  }

  function next() {
    state.index++;
    if (state.index < state.questions.length) renderQuestion();
    else renderResult();
  }

  // Baut die Eingabe für eine Frage und liefert { ready(), check(), solution }
  function buildInput(q, body, onChange) {
    switch (q.type) {
      case "single":
      case "tf": {
        const opts = q.type === "tf"
          ? [{ html: "Wahr", correct: q.answer === true }, { html: "Falsch", correct: q.answer === false }]
          : shuffle(q.options.map((html, i) => ({ html, correct: i === q.answer })));
        const name = "q" + state.index;
        const rows = opts.map((o) => {
          const input = el("input", { type: "radio", name, onchange: onChange });
          const row = el("label", { class: "option" }, input, el("span", { html: o.html }));
          return { o, input, row };
        });
        body.append(el("div", { class: "options" }, rows.map((r) => r.row)));
        return {
          ready: () => rows.some((r) => r.input.checked),
          check: () => {
            rows.forEach((r) => {
              r.input.disabled = true;
              if (r.o.correct) r.row.classList.add("correct");
              else if (r.input.checked) r.row.classList.add("wrong");
            });
            return rows.find((r) => r.input.checked).o.correct;
          }
        };
      }

      case "multi": {
        const opts = shuffle(q.options.map((html, i) => ({ html, correct: q.answer.includes(i) })));
        const rows = opts.map((o) => {
          const input = el("input", { type: "checkbox", onchange: onChange });
          const row = el("label", { class: "option" }, input, el("span", { html: o.html }));
          return { o, input, row };
        });
        body.append(el("div", { class: "options" }, rows.map((r) => r.row)));
        return {
          ready: () => rows.some((r) => r.input.checked),
          check: () => {
            let ok = true;
            rows.forEach((r) => {
              r.input.disabled = true;
              if (r.o.correct) r.row.classList.add("correct");
              else if (r.input.checked) r.row.classList.add("wrong");
              if (r.o.correct !== r.input.checked) ok = false;
            });
            return ok;
          },
          solution: "Grün markiert sind alle richtigen Antworten."
        };
      }

      case "match": {
        const rights = shuffle(q.pairs.map((p) => p[1]));
        const rows = q.pairs.map(([left, right]) => {
          const select = el("select", { onchange: onChange, "aria-label": plain(left) },
            el("option", { value: "" }, "– bitte wählen –"),
            rights.map((r) => el("option", { value: r }, r))
          );
          const row = el("div", { class: "match-row" }, el("div", { html: left }), select);
          return { right, select, row };
        });
        body.append(el("div", {}, rows.map((r) => r.row)));
        return {
          ready: () => rows.every((r) => r.select.value),
          check: () => {
            let ok = true;
            rows.forEach((r) => {
              r.select.disabled = true;
              const good = r.select.value === r.right;
              r.row.classList.add(good ? "correct" : "wrong");
              if (!good) { ok = false; r.row.append(el("div", { class: "match-solution" }, "✓ " + r.right)); }
            });
            return ok;
          }
        };
      }

      case "order": {
        let pool = shuffle(q.items);
        // Nie zufällig schon in richtiger Reihenfolge anzeigen
        while (pool.length > 1 && pool.every((x, i) => x === q.items[i])) pool = shuffle(q.items);
        const chosen = [];
        let locked = false;
        const poolBox = el("div", { class: "order-pool" });
        const listBox = el("div", { class: "order-list" });
        const draw = () => {
          poolBox.replaceChildren(...pool.map((item) => el("button", { class: "chip", type: "button", disabled: locked ? "" : null,
            onclick: () => { if (locked) return; pool = pool.filter((x) => x !== item); chosen.push(item); draw(); onChange(); } }, item)));
          if (!pool.length) poolBox.append(el("div", { class: "empty-slot" }, "Alle Schritte eingeordnet."));
          listBox.replaceChildren(...chosen.map((item, i) => el("button", { class: "chip", type: "button",
            onclick: () => { if (locked) return; chosen.splice(i, 1); pool.push(item); draw(); onChange(); } },
            el("span", { class: "num" }, `${i + 1}.`), el("span", {}, item))));
          if (!chosen.length) listBox.append(el("div", { class: "empty-slot" }, "Tippe oben die Schritte in der richtigen Reihenfolge an."));
        };
        draw();
        body.append(
          el("p", { class: "order-label" }, "Noch einzuordnen:"), poolBox,
          el("p", { class: "order-label" }, "Deine Reihenfolge (zum Entfernen antippen):"), listBox
        );
        return {
          ready: () => pool.length === 0,
          check: () => {
            locked = true;
            const ok = chosen.every((x, i) => x === q.items[i]);
            [...listBox.children].forEach((c, i) => c.classList.add(chosen[i] === q.items[i] ? "correct" : "wrong"));
            return ok;
          },
          solution: "Richtige Reihenfolge:<br>" + q.items.map((x, i) => `${i + 1}. ${x}`).join("<br>")
        };
      }

      case "number": {
        const input = el("input", { type: "text", class: "number-input", inputmode: q.binary ? "numeric" : "decimal", autocomplete: "off",
          placeholder: q.binary ? "z. B. 0101" : "Zahl eingeben", oninput: onChange });
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && input.value.trim()) app.querySelector(".actions .btn").click();
        });
        body.append(input);
        setTimeout(() => input.focus(), 0);
        return {
          ready: () => input.value.trim() !== "",
          check: () => {
            input.disabled = true;
            const given = normalize(input.value);
            const ok = q.answer.some((a) => {
              const want = normalize(a);
              if (given === want) return true;
              return !q.binary && given !== "" && !isNaN(given) && Number(given) === Number(want);
            });
            input.style.borderColor = ok ? "var(--good)" : "var(--bad)";
            return ok;
          },
          solution: `Richtige Antwort: <b>${q.answer[0]}</b>`
        };
      }
    }
    throw new Error("Unbekannter Fragetyp: " + q.type);
  }

  // ---------- Auswertung ----------
  function renderResult() {
    state.active = false;
    app.replaceChildren();
    window.scrollTo(0, 0);

    const total = state.results.length;
    const points = state.results.filter((r) => r.ok).length;
    const pct = Math.round((points / total) * 100);
    const now = new Date();
    const stamp = now.toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" })
      + ", " + now.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) + " Uhr";

    const verdict = pct >= 90 ? "Hervorragend!" : pct >= 70 ? "Gut gemacht!" : pct >= 50 ? "Solide, da geht noch was." : "Schau dir das Video am besten noch einmal an.";

    app.append(
      el("section", { class: "card" },
        el("p", { class: "result-meta" }, state.quizTitle),
        el("div", { class: "result-score" }, `${points} / ${total}`),
        el("p", { class: "result-meta" }, `${pct} % · ${verdict}`),
        el("div", { class: "stamp" }, el("b", {}, state.name), ` · ${stamp}`)
      ),
      el("section", { class: "card" },
        el("h2", {}, "Deine Antworten im Überblick"),
        el("ol", { class: "result-list" }, state.results.map((r, i) => el("li", {},
          el("span", { class: "mark " + (r.ok ? "ok" : "no"), "aria-label": r.ok ? "richtig" : "falsch" }, r.ok ? "✓" : "✗"),
          el("span", {}, `${i + 1}. ${plain(r.q.q)}`)
        )))
      ),
      el("div", { class: "actions" },
        el("button", { class: "btn", onclick: renderStart }, "Zurück zur Übersicht"),
        el("button", { class: "btn secondary", onclick: () => window.print() }, "Drucken / als PDF speichern")
      )
    );
  }

  renderStart();
})();
