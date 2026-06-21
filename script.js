const sections = Array.from(document.querySelectorAll(".section[id]"));
const navLinks = Array.from(document.querySelectorAll(".contents-nav a"));
const progressLabel = document.querySelector("[data-progress-label]");
const progressBar = document.querySelector("[data-progress-bar]");
const railTitle = document.querySelector("[data-rail-title]");
const railBody = document.querySelector("[data-rail-body]");
const railKicker = document.querySelector("[data-rail-kicker]");
const currentExample = document.querySelector("[data-current-example]");
const currentCopy = document.querySelector("[data-current-copy]");
const themeToggle = document.querySelector(".kt-ai-theme-toggle");
const toast = document.querySelector(".copy-toast");

const railData = {
  story: {
    title: "Зачем БА нужна OS",
    body: "Главная задача: перестать заново объяснять ИИ проект и держать контекст, решения, задачи и знания в одном рабочем контуре.",
    copy: `Role: workspace OS architect.
Task: turn my voice-mode briefing and document folder into a starter OS structure.
Goal: remove repeated context-setting in every new AI chat.
Context: I will first describe who I am, where I work, what the organization does, what I own, which projects I run, who I work with, and which systems matter. Then I will provide a folder with materials.
Steps:
1. Extract my role, organizational context, and responsibility areas.
2. Identify active projects, task types, documents, and workstreams.
3. Propose a folder structure for personal context, projects, knowledge base, skills, and automations.
4. Show which first \`КОНТЕКСТ.md\` files should be created.
Output format: proposed OS structure, folder roles, first 3 actions.
Constraints: do not invent facts; mark gaps as "не найдено"; do not create files without confirmation.`,
  },
  map: {
    title: "Путь сигнала",
    body: "БА работает с сигналами: обновлениями от бизнеса, решениями, блокерами, вопросами и изменениями scope.",
    copy: `Role: operating model designer.
Task: describe my Codex OS as a simple workflow.
Goal: show how incoming signals become useful work output.
Context: if the folder is empty, propose a minimal map. If it already exists, inspect the current sections first.
Steps:
1. Identify inputs: chats, emails, tasks, meetings, files.
2. Identify system rules and the task router.
3. Connect project context, knowledge base, skills, automations, tools, Telegram, and review points.
4. Show the path of one new signal through the system.
Output format: Mermaid diagram and one short explanation for each layer.
Constraints: do not change files; write for someone seeing Codex for the first time.`,
  },
  system: {
    title: "Правила работы",
    body: "Правила защищают от выдуманных владельцев, сроков, эффектов и статусов. Сначала источник, потом действие.",
    copy: `Role: system folder architect.
Task: design a minimal system layer for my Codex OS.
Goal: Codex should know what to read first, where it must not guess, and where human review is required.
Context: I may be migrating from Claude, where the main file was \`CLAUDE.md\`; in Codex the equivalent entry point is \`AGENTS.md\`.
Steps:
1. Propose a short \`AGENTS.md\`.
2. Propose \`START_HERE.md\`.
3. Propose a task router.
4. Add source-of-truth rules, data checks, and failure diagnostics.
Output format: file list, role of each file, draft content structure.
Constraints: show the plan before writing; keep rules short; do not create an encyclopedia.`,
  },
  projects: {
    title: "Проектная память",
    body: "КОНТЕКСТ.md должен показывать пользователя, процесс, боль, scope, решения, вопросы и следующий артефакт.",
    copy: `Role: project context builder.
Task: turn my raw notes into \`КОНТЕКСТ.md\`.
Goal: make the project understandable without another spoken briefing.
Context: I will provide a voice transcript or rough notes. If PROJECT_PATH already exists, inspect the folder first. If not, ask only for the minimum missing inputs.
Steps:
1. Extract the goal, users, participants, and status.
2. Extract decisions, blockers, next actions, and open questions.
3. Link materials and sources.
4. Separate confirmed facts from gaps.
Output format: draft \`КОНТЕКСТ.md\` and missing facts.
Constraints: write "не найдено" for gaps; do not invent owners, dates, status, or impact.`,
  },
  skills: {
    title: "Скиллы БА",
    body: "Скилл появляется там, где БА повторяет один и тот же рабочий процесс: intake, PRD, project update, статус или отчёт.",
    copy: `Role: workflow and skills analyst.
Task: choose the first 3 Codex skills.
Goal: turn repeated real work into procedures that can be run again.
Context: if the folder is empty, use my role and repeated pain points. If the folder exists, inspect current projects and system files. For PRD work, use \`prd\` as the reference pattern.
Steps: find repeated tasks such as project updates, briefings, reporting, document checks, and regular communication. Check frequency, risk, source of truth, and review point. Separate prompt, template, skill, and automation. For each skill, describe trigger, sources, steps, output, review, and likely failure mode.
Output format: top 3 skills by priority and 2 candidates to postpone.
Constraints: do not create skills without my confirmation.`,
  },
  automations: {
    title: "Daily sync",
    body: "Daily sync отвечает на вопрос: что изменилось за 24 часа и куда должен попасть каждый новый сигнал.",
    copy: `Role: Codex OS automation designer.
Task: design the first daily sync.
Goal: understand what changed in the last 24 hours and where each signal should go.
Context: I may have one project and no automations yet. If the folder exists, inspect \`AGENTS.md\`, \`START_HERE.md\`, project contexts, task sources, Telegram notes, and recent files.
Steps: list signal sources; define the source of truth for project facts, tasks, management status, and reusable insights; add health check, change plan, propagation, readback, and digest structure; mark human review points; separately state what should not be automated yet.
Output format: first safe cycle, sources, output, review point, risks, and a 3-day trial checklist.
Constraints: do not send messages, write to task systems, or update management records without confirmation. Do not invent tools I do not have.`,
  },
  tools: {
    title: "Инструменты",
    body: "Перед новым агентом БА должен проверить, что уже можно переиспользовать: API, шаблон, данные, процесс или интеграцию.",
    copy: `Role: solution reuse analyst.
Task: before proposing a new AI agent, check what can already be reused.
Context: there is an AI project idea, but no development decision yet.
Steps:
1. Describe the current user process.
2. Find existing data, APIs, templates, directories, integrations, and regulations.
3. Separate what can be solved without a new agent.
4. State where AI is actually needed.
Output format: short table with need, existing asset, gap, solution, next question.
Constraints: do not propose development until existing assets are checked.`,
  },
  knowledge: {
    title: "База знаний",
    body: "База знаний хранит повторно используемые инсайты, а не текущий статус проекта.",
    example: "Пример структуры:\n03_База знаний/\n  AI Knowledge Base.md\n  YouTube/notes/\n  YouTube/digests/\n  Внешние материалы/",
    copy: `Role: knowledge base curator.
Task: define simple rules for my AI knowledge base.
Goal: make external ideas reusable across projects.
Context: if the knowledge base does not exist, propose a minimal structure. If it exists, inspect current notes and examples.
Steps: decide what goes to the knowledge base, what goes to project context, what becomes a template, what becomes a skill, and what should not be saved.
Output format: draft README and 5 routing examples.
Constraints: do not store current project status in the knowledge base; do not edit files without confirmation.`,
  },
  youtube: {
    title: "С чего начать",
    body: "Начните с одного проекта: контекст, ручной daily sync, один повторяемый БА-сценарий и проверка другим аналитиком.",
    copy: `Role: KT OS onboarding coach.
Task: help me build a minimal OS for one project.
Goal: another analyst should understand the project without my spoken briefing.
Context: I will provide a project path or a short project description.
Steps:
1. Check whether project context exists.
2. Draft the \`КОНТЕКСТ.md\` structure: user, process, pain, scope, decisions, questions, next actions.
3. Propose a manual daily sync for the last 24 hours.
4. Identify one repeated analyst task that can become a skill or prompt.
5. Create a short checklist for another analyst to validate the project.
Output format: start plan and missing facts.
Constraints: do not invent owners, deadlines, impact, or project status.`,
  },
};

let toastTimer;
let activeSectionId = "story";
let scrollSpyFrame;

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 1500);
}

async function copyText(value) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    showToast("Скопировано");
  } catch {
    showToast("Не скопировано");
  }
}

function setActiveSection(id) {
  if (!railData[id]) return;
  activeSectionId = id;
  const index = sections.findIndex((section) => section.id === id);
  const sectionNumber = Math.max(index + 1, 1);
  const data = railData[id];

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);
  });

  if (data) {
    railKicker.textContent = `Раздел ${sectionNumber}`;
    railTitle.textContent = data.title;
    railBody.textContent = data.body;
    currentExample.textContent = data.copy;
    currentCopy.dataset.copySection = id;
    currentCopy.textContent = data.copyLabel || "Скопировать промпт";
  }

  progressLabel.textContent = `${sectionNumber} / ${sections.length}`;
  progressBar.style.width = `${(sectionNumber / sections.length) * 100}%`;
}

function createMobilePrompt(section, id, sectionNumber) {
  const data = railData[id];
  if (!data || section.querySelector(".mobile-rail-note")) return;

  const note = document.createElement("div");
  note.className = "mobile-rail-note";
  note.innerHTML = `
    <details>
      <summary>Промпт ${sectionNumber} / ${sections.length}</summary>
    <h3></h3>
    <p></p>
    <pre class="rail-example"><code></code></pre>
    <button class="primary-copy" type="button">Скопировать промпт</button>
    </details>
  `;

  note.querySelector("h3").textContent = data.title;
  note.querySelector("p").textContent = data.body;
  note.querySelector("code").textContent = data.copy;
  note.querySelector("button").textContent = data.copyLabel || "Скопировать промпт";
  note.querySelector("button").addEventListener("click", () => copyText(data.copy));
  section.appendChild(note);
}

sections.forEach((section, index) => createMobilePrompt(section, section.id, index + 1));

function updateSectionFromScroll() {
  const anchor = window.scrollY + 120;
  let nextId = sections[0]?.id || "story";

  for (const section of sections) {
    if (section.offsetTop <= anchor) nextId = section.id;
    else break;
  }

  if (nextId !== activeSectionId) setActiveSection(nextId);
}

function scheduleScrollSpy() {
  cancelAnimationFrame(scrollSpyFrame);
  scrollSpyFrame = requestAnimationFrame(updateSectionFromScroll);
}

window.addEventListener("scroll", scheduleScrollSpy, { passive: true });
window.addEventListener("resize", scheduleScrollSpy);
setActiveSection("story");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.getAttribute("href")?.slice(1);
    if (!id) return;
    setActiveSection(id);
  });
});

document.querySelectorAll(".prompt-block").forEach((block) => {
  const button = block.querySelector("button");
  button.addEventListener("click", () => copyText(block.dataset.prompt));
});

currentCopy.addEventListener("click", () => {
  const id = currentCopy.dataset.copySection || activeSectionId;
  copyText(railData[id].copy);
});

function syncThemeLabel() {
  const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  themeToggle.dataset.mode = current;
}

const savedTheme = localStorage.getItem("kt-os-guide-theme");
if (savedTheme === "light") document.documentElement.setAttribute("data-theme", "light");
syncThemeLabel();

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("kt-os-guide-theme", next);
  syncThemeLabel();
});
