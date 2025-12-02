/* ========== GLOBAL LAYOUT + BLUISH-GREEN BACKGROUND ========== */

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; height: 100%; }

body {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  /* darker bluish green */
  background-color: #0f3e3e;
  /* same scattered icons (white line drawings) but tuned for darker background */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg stroke='%23ffffff' stroke-width='1.1' fill='none' opacity='0.18'%3E%3C!-- clock --%3E%3Ccircle cx='18' cy='22' r='9'/%3E%3Cline x1='18' y1='22' x2='18' y2='17'/%3E%3Cline x1='18' y1='22' x2='23' y2='22'/%3E%3C!-- pencil --%3E%3Cpath d='M52 18 l14 14 l-6 6 l-14 -14 z'/%3E%3Cpath d='M50 28 l-2 6 l6 -2'/%3E%3C!-- phone --%3E%3Crect x='18' y='86' width='14' height='26' rx='3'/%3E%3Crect x='21' y='90' width='8' height='2' rx='1'/%3E%3Ccircle cx='25' cy='108' r='1.2'/%3E%3C!-- book --%3E%3Cpath d='M86 22 h10 a3 3 0 0 1 3 3 v16 h-13 z'/%3E%3Cpath d='M86 22 h-10 a3 3 0 0 0-3 3 v16 h13 z'/%3E%3Cline x1='86' y1='22' x2='86' y2='41'/%3E%3C!-- heart --%3E%3Cpath d='M122 28 c-2 -2.5 -5 -2.5 -7 0 c-2 2.5 0 6 4 8 c4 -2 6 -5.5 3 -8 z'/%3E%3C!-- star --%3E%3Cpath d='M132 66 l2 4 l4 1 l-3 3 l1 4 l-4 -2 l-4 2 l1 -4 l-3 -3 l4 -1 z'/%3E%3C!-- molecule --%3E%3Ccircle cx='110' cy='106' r='2.8'/%3E%3Ccircle cx='120' cy='98' r='2.1'/%3E%3Ccircle cx='100' cy='98' r='2.1'/%3E%3Ccircle cx='116' cy='116' r='2.1'/%3E%3Cline x1='112' y1='104' x2='118' y2='100'/%3E%3Cline x1='108' y1='104' x2='102' y2='100'/%3E%3Cline x1='111' y1='109' x2='115' y2='114'/%3E%3C!-- pipette --%3E%3Cpath d='M54 110 l12 -12 l4 4 l-12 12 l-5 1 z'/%3E%3Ccircle cx='70' cy='94' r='1.6'/%3E%3C!-- PCR tubes --%3E%3Cpath d='M146 28 l4 12 h-2 l-4 -12 z'/%3E%3Cpath d='M138 32 l4 12 h-2 l-4 -12 z'/%3E%3Cpath d='M150 32 l4 12 h-2 l-4 -12 z'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 170px 170px;
  color: #e8f6f2;
}

/* center card */
.app-root {
  min-height: 100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:18px;
}

/* card container */
.card {
  width: 420px;
  max-width: 100%;
  background: rgba(255,255,255,0.98);
  border-radius: 26px;
  padding: 18px;
  border: 1px solid rgba(255,255,255,0.9);
  box-shadow: 0 24px 60px rgba(0,0,0,0.28);
}

/* header */
.header { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:12px; }
.logo-wrap { display:flex; gap:12px; align-items:center; }
.logo-svg { width:44px; height:44px; border-radius:999px; border:1px solid rgba(255,255,255,0.12); display:flex; align-items:center; justify-content:center; color:#e8f6f2; background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)); }
.logo-svg svg { width:28px; height:28px; stroke:currentColor; fill:none; stroke-width:1.6; stroke-linecap:round; stroke-linejoin:round; }

.title { margin:0; font-size:18px; color:#073b3b; }
.subtitle { margin:0; margin-top:2px; font-size:12px; color:#27524f; }

.right-meta { display:flex; flex-direction:column; align-items:flex-end; gap:6px; }
.date-line { font-size:12px; color:#27524f; background: linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.9)); padding:6px 10px; border-radius:10px; color:#093b3b; box-shadow:0 2px 6px rgba(0,0,0,0.06); }

/* remaining badge */
.remaining { display:flex; flex-direction:column; align-items:flex-end; gap:4px; }
.label { font-size:9px; letter-spacing:0.12em; text-transform:uppercase; color:#2b544f; }
.badge { display:inline-flex; align-items:baseline; gap:6px; padding:4px 8px; border-radius:999px; background: linear-gradient(135deg,#d6efe8,#c6e6dc); color:#063630; font-size:12px; font-weight:600; border:1px solid rgba(5,59,53,0.12); }

/* input row */
.input-row { display:flex; align-items:center; gap:8px; margin:12px 0; padding:8px 10px; border-radius:18px; border:1px solid rgba(0,0,0,0.05); background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,250,250,0.98)); }
.search-icon { width:22px; height:22px; color:#2e5450; flex-shrink:0; }
.search-icon svg { width:100%; height:100%; stroke:currentColor; fill:none; stroke-width:1.6; stroke-linecap:round; stroke-linejoin:round; }

#task-input { flex:1; border:none; outline:none; font-size:14px; background:transparent; color:#073b3b; }
#task-input::placeholder { color:#7aa299; }

/* category select */
.category-select, .category-select:focus { border-radius:10px; padding:6px 8px; font-size:13px; border:1px solid rgba(0,0,0,0.06); background: linear-gradient(180deg,#f8fdfc,#eef9f6); color:#073b3b; }

/* add button */
#add-btn { border:1px solid #7bb8a6; background: linear-gradient(135deg,#8ccfaa,#66b68f); color:#042e2a; border-radius:999px; padding:6px 12px; font-size:13px; cursor:pointer; box-shadow:0 3px 10px rgba(0,0,0,0.12); transition: transform .08s ease, box-shadow .12s ease;}
#add-btn:hover { transform: translateY(-1px); box-shadow:0 6px 16px rgba(0,0,0,0.18); }

/* sections layout */
.sections { display:flex; flex-direction:column; gap:14px; margin-top:6px; }

/* each section */
.section { background: rgba(255,255,255,0.98); border-radius:14px; padding:8px; border:1px solid rgba(0,0,0,0.03); }
.section-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
.section-header h2 { margin:0; font-size:15px; color:#063a3a; }
.section-sub { font-size:12px; color:#2f665f; }

/* list */
.list { max-height:220px; overflow-y:auto; padding-right:6px; display:flex; flex-direction:column; gap:6px; }
.list::-webkit-scrollbar { width:6px; }
.list::-webkit-scrollbar-thumb { background: rgba(8,60,57,0.18); border-radius:999px; }

/* task item */
.task { display:flex; align-items:center; gap:8px; padding:8px; border-radius:12px; background:#ffffff; border:1px solid rgba(0,0,0,0.04); transition: transform .12s ease, box-shadow .12s ease; }
.task:hover { transform: translateY(-2px); box-shadow:0 6px 18px rgba(0,0,0,0.09); }
.task.done { background: linear-gradient(135deg,#eef7f2,#e0f0ea); color:#2a544a; text-decoration:line-through; border-color: rgba(3,59,52,0.06); }

/* check */
.check { width:22px; height:22px; border-radius:999px; border:1px solid #9dbf9f; background: linear-gradient(180deg,#ffffff,#f3fbf8); display:flex; align-items:center; justify-content:center; cursor:pointer; }
.task.done .check { background: linear-gradient(180deg,#cde8d8,#9fcfb0); border-color:#6aa488; }

/* text and delete */
.task-text { flex:1; font-size:13px; color:#093b3b; word-wrap:break-word; }
.delete { background:transparent; border:none; font-size:16px; color:#5b7a71; cursor:pointer; }
.delete:hover { color:#103a36; }

/* footer + personalized quote */
.footer { margin-top:10px; font-size:12px; color:#2f6a60; display:flex; flex-direction:column; gap:4px; }
.footer::after { content: "Your future self will thank you for even 10 minutes."; display:block; font-size:12px; color:#0b3b3b; opacity:0.95; font-style:italic; }

/* small screens */
@media (max-width:440px) {
  .card { width: 96%; padding:14px; }
  .sections { gap:10px; }
  .list { max-height:160px; }
}
