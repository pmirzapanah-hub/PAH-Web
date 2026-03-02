async function checkLogin() {
  const r = await fetch("/api/me");
  const j = await r.json();
  const el = document.getElementById("loginState");
  if (!el) return;
  el.textContent = j.loggedIn
    ? "✅ Connected to OneDrive"
    : "⚠️ Not connected. Click “Connect OneDrive”.";
}

document.getElementById("btnConnect")?.addEventListener("click", () => {
  location.href = "/auth/login";
});

document.getElementById("btnProjectSearch")?.addEventListener("click", async () => {
  const q = document.getElementById("qProjects").value.trim();
  const out = document.getElementById("projectResults");
  out.textContent = "Searching…";

  const r = await fetch(`/api/search/projects?q=${encodeURIComponent(q)}`);
  const j = await r.json();

  if (!r.ok) { out.textContent = j.error || "Error"; return; }

  if (!j.items.length) { out.textContent = "No projects found."; return; }
  out.innerHTML = j.items.map(x => `<a target="_blank" href="${x.webUrl}">${x.name}</a>`).join("");
});

document.getElementById("btnCrmSearch")?.addEventListener("click", async () => {
  const q = document.getElementById("qCrm").value.trim();
  const out = document.getElementById("crmResults");
  out.textContent = "Searching…";

  const r = await fetch(`/api/search/crm?q=${encodeURIComponent(q)}`);
  const j = await r.json();

  if (!r.ok) { out.textContent = j.error || "Error"; return; }

  if (!j.rows.length) { out.textContent = "No CRM matches."; return; }

  const headers = j.headers || [];
  const rows = j.rows || [];

  out.innerHTML = `
    <div class="small">Showing ${rows.length} rows</div>
    <div style="overflow:auto; max-height: 360px; border:1px solid #222; border-radius:10px;">
      <table>
        <thead><tr>${headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows.map(row => `<tr>${headers.map(h=>`<td>${(row[h] ?? "")}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
});

checkLogin();