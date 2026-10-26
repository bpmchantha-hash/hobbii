
      (function () {
        var GOALS = [
          { k: "water", t: "ផឹកទឹក 2.2 លីត្រ", auto: 1 },
          { k: "jog", t: "រត់ពេលព្រឹក 25 នាទី" },
          { k: "workout", t: "ហាត់ប្រាណដោយទម្ងន់ខ្លួន" },
          { k: "chin", t: "Chin tucks និង Ceiling kiss" },
          { k: "breakfast", t: "ញ៉ាំអាហារពេលព្រឹក" },
          { k: "lunch", t: "ញ៉ាំអាហារពេលថ្ងៃត្រង់" },
          { k: "dinner", t: "ញ៉ាំអាហារពេលល្ងាច" },
          { k: "nofast", t: "មិនញ៉ាំ Fast food" },
          { k: "nosugar", t: "មិនផឹកភេសជ្ជៈផ្អែម" },
          { k: "posture", t: "សម្រាកកែឥរិយាបថពេលសរសេរកូដ" },
        ];
        var GOAL = 2200,
          XP = 10,
          KEY = "tha-quest-v1";
        var PLAN = [
          [
            "ថ្ងៃអាទិត្យ",
            "ដើរលេង ឬរត់ស្រាល 25 នាទី",
            "សម្រាក និងលាតសន្ធឹងស្រាលៗ",
            "ស្តារសុខភាព",
          ],
          [
            "ថ្ងៃច័ន្ទ",
            "រត់ 25 នាទី",
            "Push-ups 3×10 · Squats 3×15 · Plank 3×30 វិនាទី · Chin tucks 3×10 · Ceiling kiss 3×10",
            "ហាត់ពេញលេញ",
          ],
          [
            "ថ្ងៃអង្គារ",
            "រត់ 25 នាទី",
            "Squats 3×15 · Plank 3×40 វិនាទី · Chin tucks 3×12 · Ceiling kiss 3×12",
            "ជើង ស្នូលរាងកាយ និងកញ្ចឹងក",
          ],
          [
            "ថ្ងៃពុធ",
            "រត់ 25 នាទី",
            "Push-ups 3×12 · Squats 3×15 · Plank 3×30 វិនាទី · Chin tucks 3×10 · Ceiling kiss 3×10",
            "ហាត់ពេញលេញ",
          ],
          [
            "ថ្ងៃព្រហស្បតិ៍",
            "រត់ 25 នាទី",
            "Plank 3×45 វិនាទី · Chin tucks 3×12 · Ceiling kiss 3×12",
            "ស្នូលរាងកាយ និងកញ្ចឹងក",
          ],
          [
            "ថ្ងៃសុក្រ",
            "រត់ 25 នាទី",
            "Push-ups 3×12 · Squats 3×20 · Plank 3×40 វិនាទី · Chin tucks 3×12 · Ceiling kiss 3×12",
            "ហាត់ពេញលេញ",
          ],
          [
            "ថ្ងៃសៅរ៍",
            "រត់ 25 នាទី",
            "Push-ups 2×អតិបរមា · Squats 3×15 · Plank 2×អតិបរមា · Chin tucks 3×10",
            "ថ្ងៃស្រាល",
          ],
        ];
        var $ = function (s) {
          return document.querySelector(s);
        };
        var now = new Date(),
          dayKey =
            now.getFullYear() +
            "-" +
            (now.getMonth() + 1) +
            "-" +
            now.getDate();
        var state = { date: dayKey, water: 0, done: {}, xp: 0 };
        try {
          var raw = localStorage.getItem(KEY);
          if (raw) {
            var s = JSON.parse(raw);
            if (s) {
              state.xp = s.xp || 0;
              if (s.date === dayKey) state = s;
            }
          }
        } catch (e) {}
        function save() {
          try {
            localStorage.setItem(KEY, JSON.stringify(state));
          } catch (e) {}
        }
        var h = now.getHours();
        $("#greet").textContent =
          (h < 12 ? "អរុណសួស្តី" : h < 18 ? "ទិវាសួស្តី" : "សាយ័ណ្ហសួស្តី") +
          ", Tha";
        $("#dateLine").textContent = now.toLocaleDateString("km-KH", {
          weekday: "long",
          day: "numeric",
          month: "long",
        });

        var body = $("#planBody");
        PLAN.forEach(function (r, i) {
          var tr = document.createElement("tr");
          if (i === now.getDay()) tr.className = "today";
          r.forEach(function (c, j) {
            var td = document.createElement("td");
            td.textContent = c;
            if (j === 0 && i === now.getDay()) {
              var t = document.createElement("span");
              t.className = "tag";
              t.textContent = "ថ្ងៃនេះ";
              td.appendChild(t);
            }
            tr.appendChild(td);
          });
          body.appendChild(tr);
        });
        var todo = $("#todo");
        GOALS.forEach(function (g) {
          var li = document.createElement("li"),
            lb = document.createElement("label"),
            inp = document.createElement("input"),
            sp = document.createElement("span"),
            em = document.createElement("em");
          inp.type = "checkbox";
          inp.setAttribute("data-key", g.k);
          if (g.auto) inp.disabled = true;
          sp.textContent = g.t;
          em.textContent = "+" + XP + " XP";
          lb.appendChild(inp);
          lb.appendChild(sp);
          lb.appendChild(em);
          li.appendChild(lb);
          todo.appendChild(li);
        });
        $("#totalCount").textContent = GOALS.length;
        var seg = $("#seg");
        for (var i = 0; i < 9; i++) {
          (function (i) {
            var b = document.createElement("button");
            b.type = "button";
            b.setAttribute("aria-label", (i + 1) * 250 + " មល");
            b.onclick = function (ev) {
              var v = (i + 1) * 250;
              setWater(state.water === v ? i * 250 : v, ev.currentTarget);
            };
            seg.appendChild(b);
          })(i);
        }

        function toast(m) {
          var t = $("#toast");
          t.textContent = m;
          t.classList.add("show");
          clearTimeout(toast.id);
          toast.id = setTimeout(function () {
            t.classList.remove("show");
          }, 4000);
        }
        function pop(el, txt) {
          if (!el) return;
          var r = el.getBoundingClientRect(),
            p = document.createElement("span");
          p.className = "pop";
          p.textContent = txt;
          p.style.left = r.left + r.width / 2 - 30 + "px";
          p.style.top = r.top + "px";
          document.body.appendChild(p);
          setTimeout(function () {
            p.remove();
          }, 950);
        }
        function lvl(x) {
          return Math.floor(x / 100) + 1;
        }
        function giveXP(d, el) {
          var before = lvl(state.xp);
          state.xp = Math.max(0, state.xp + d);
          if (d > 0) pop(el, "+" + d + " XP");
          if (lvl(state.xp) > before)
            toast("ឡើងកម្រិត! ឥឡូវនេះ LV " + lvl(state.xp));
        }
        function render() {
          state.done.water = state.water >= GOAL;
          document.querySelectorAll("input[data-key]").forEach(function (el) {
            el.checked = !!state.done[el.getAttribute("data-key")];
          });
          var n = GOALS.filter(function (g) {
            return state.done[g.k];
          }).length;
          $("#doneCount").textContent = n;
          $("#lv").textContent = "LV " + lvl(state.xp);
          $("#xpt").textContent = (state.xp % 100) + "/100";
          $("#xpf").style.width = (state.xp % 100) + "%";
          $("#wv").textContent = (state.water / 1000).toFixed(2);
          seg.querySelectorAll("button").forEach(function (b, i) {
            b.classList.toggle("on", state.water >= (i + 1) * 250);
          });
          save();
        }
        function setWater(v, el) {
          var was = state.water >= GOAL;
          state.water = Math.max(0, Math.min(3000, v));
          var is = state.water >= GOAL;
          if (!was && is) {
            giveXP(XP, el);
            toast("ឈានដល់គោលដៅទឹកហើយ។ ពូកែណាស់ Tha។");
          }
          if (was && !is) giveXP(-XP);
          render();
        }
        $("#addWater").onclick = function (e) {
          setWater(state.water + 250, e.currentTarget);
        };
        $("#subWater").onclick = function (e) {
          setWater(state.water - 250, e.currentTarget);
        };
        document.addEventListener("change", function (e) {
          var k = e.target.getAttribute && e.target.getAttribute("data-key");
          if (!k || e.target.disabled) return;
          state.done[k] = e.target.checked;
          giveXP(e.target.checked ? XP : -XP, e.target);
          render();
          if (
            GOALS.every(function (g) {
              return state.done[g.k];
            })
          )
            toast("បានបញ្ចប់បេសកកម្មទាំងអស់ថ្ងៃនេះ។ សម្រាកឱ្យបានល្អ។");
        });
        $("#resetBtn").onclick = function () {
          state = { date: dayKey, water: 0, done: {}, xp: state.xp };
          render();
          toast("បានកំណត់ថ្ងៃនេះឡើងវិញ។");
        };
        var timer = null;
        $("#postureBtn").onclick = function () {
          if (timer) {
            clearInterval(timer);
            timer = null;
            this.textContent = "ចាប់ផ្តើមការរំលឹក 30 នាទី";
            $("#postureState").textContent = "ការរំលឹកបិទ";
            return;
          }
          timer = setInterval(function () {
            toast(
              "ពិនិត្យឥរិយាបថ៖ ជើងដាក់ដី ស្មាត្រឡប់ក្រោយ Chin tuck រួចក្រោកលាតសន្ធឹង។",
            );
          }, 1800000);
          this.textContent = "បញ្ឈប់ការរំលឹក";
          $("#postureState").textContent =
            "រំលឹករៀងរាល់ 30 នាទី (សូមបើកផ្ទាំងនេះទុក)";
          toast("បានចាប់ផ្តើមការរំលឹក។");
        };
        render();
      })();
 