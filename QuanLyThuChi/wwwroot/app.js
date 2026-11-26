"use strict";
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const paths = {
  wallet: '<path d="M4 7V4h14v3M3 7h18v14H3z"/><path d="M16 12h5v5h-5z"/><path d="M18 14.5h.1"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  list: '<path d="M8 5h13M8 12h13M8 19h13M3 5h.1M3 12h.1M3 19h.1"/>',
  chart: '<path d="M4 3v18h18M8 16v-5M13 16V7M18 16V4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  income: '<path d="M6 17 18 5M7 5h11v11"/>',
  expense: '<path d="m6 5 12 12M7 17h11V6"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 11h18M7 15h2M13 15h2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  reset: '<path d="M3 10a9 9 0 1 1 1 8M3 4v6h6"/>',
  edit: '<path d="m15 4 5 5M4 20l1-5L17 3a2 2 0 0 1 3 3L8 18l-4 2Z"/>',
  trash: '<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  leaf: '<path d="M20 3C10 2 3 7 5 15c8 6 16-2 15-12ZM4 21 15 10"/>',
  coffee: '<path d="M4 8h12v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4ZM16 9h3a3 3 0 0 1 0 6h-3M3 23h15M7 3v2M12 2v3"/>',
  briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 12c6 4 12 4 18 0M12 12v4"/>',
  gift: '<path d="M4 11v10h16V11M3 7h18v4H3zM12 7v14"/><path d="M12 7C3 7 5 0 9 3l3 4Zm0 0c9 0 7-7 3-4l-3 4Z"/>',
  car: '<path d="m4 10 2-6h12l2 6M3 10h18v9H3zM6 19v2M18 19v2M6 14h2M16 14h2"/>',
  bag: '<path d="m4 7-1 14h18L20 7ZM8 8V6a4 4 0 0 1 8 0v2"/>',
  receipt: '<path d="m5 3 3 2 4-2 4 2 3-2v18l-3-2-4 2-4-2-3 2ZM9 9h6M9 13h6"/>',
  book: '<path d="M3 4h6a3 3 0 0 1 3 3v14a4 4 0 0 0-4-2H3ZM21 4h-6a3 3 0 0 0-3 3v14a4 4 0 0 1 4-2h5Z"/>',
  music: '<path d="M9 18V5l12-2v13M9 9l12-2"/><ellipse cx="6" cy="18" rx="3" ry="3"/><ellipse cx="18" cy="16" rx="3" ry="3"/>',
  dots: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'
};
const icon = (name) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.dots}</svg>`;
$$('[data-icon]').forEach((node) => { node.innerHTML = icon(node.dataset.icon); });
const h = (text) => String(text ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const amount = (value) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);
const dateText = (iso) => { const [year, month, day] = iso.split("-"); return `${day}/${month}/${year}`; };
const color = (value) => ["green","orange","blue","purple","pink","teal","gray"].includes(value) ? value : "gray";
const state = { token: "", today: "", categories: [], entries: [], statistics: null, edit: null, deleting: null, view: "overview", generation: 0, mutating: false };
let searchTimer, toastTimer;

async function request(path, options = {}) {
  const method = options.method || "GET";
  const response = await fetch(path, { ...options, credentials: "same-origin", headers: {
    Accept: "application/json", ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(method !== "GET" ? { "X-CSRF-TOKEN": state.token } : {}), ...options.headers
  }});
  if (!response.ok) {
    let data = {};
    try { data = await response.json(); } catch { /* Use a readable HTTP fallback for non-JSON errors. */ }
    const errors = Object.values(data.errors || {}).flat();
    const error = new Error(data.message || errors[0] || (response.status === 400 ? "Dữ liệu không hợp lệ hoặc phiên đã hết hạn. Hãy tải lại trang rồi thử lại." : "Không thể xử lý yêu cầu. Vui lòng thử lại."));
    error.status = response.status;
    throw error;
  }
  return response.status === 204 ? null : response.json();
}
function toast(message) {
  clearTimeout(toastTimer); $("#toast").textContent = message; $("#toast").hidden = false;
  toastTimer = setTimeout(() => { $("#toast").hidden = true; }, 4500);
}
function pageError(message) { $("#page-error-text").textContent = message; $("#page-error").hidden = !message; }
function selectedMonth() { return $("#month").value; }
function queryString() {
  const query = new URLSearchParams({ month: selectedMonth() });
  for (const [key, selector] of [["kind","#filter-kind"],["status","#filter-status"],["categoryId","#filter-category"],["search","#search"]]) {
    const value = $(selector).value.trim(); if (value) query.set(key, value);
  }
  return query;
}
async function refresh() {
  if (!selectedMonth()) { pageError("Vui lòng chọn tháng hợp lệ để xem dữ liệu."); return false; }
  const generation = ++state.generation;
  $("#summary").setAttribute("aria-busy", "true");
  $("#transactions").setAttribute("aria-busy", "true");
  try {
    const [entries, statistics] = await Promise.all([
      request(`/api/entries?${queryString()}`), request(`/api/statistics?month=${encodeURIComponent(selectedMonth())}`)
    ]);
    if (generation !== state.generation) return false;
    state.entries = entries; state.statistics = statistics; pageError(""); render(); return true;
  } catch (error) {
    if (generation !== state.generation) return false;
    pageError("Chưa tải được dữ liệu mới. " + error.message);
    return false;
  } finally {
    if (generation === state.generation) {
      $("#summary").setAttribute("aria-busy", "false"); $("#transactions").setAttribute("aria-busy", "false");
    }
  }
}
function render() {
  const stats = state.statistics;
  const [year, month] = selectedMonth().split("-");
  $("#period-heading").textContent = `Tháng ${Number(month)}, ${year}`;
  $("#total-income").textContent = amount(stats.income);
  $("#total-expense").textContent = amount(stats.expense);
  $("#total-balance").textContent = amount(stats.balance);
  for (const [selector,value] of [["#total-income",stats.income],["#total-expense",stats.expense],["#total-balance",stats.balance]]) {
    $(selector).classList.toggle("large",Math.abs(value)>=1e9);
  }
  $("#total-balance").classList.toggle("negative", stats.balance < 0);
  $("#pending-banner").hidden = !stats.pendingCount || state.view === "reports";
  $("#pending-title").textContent = `${stats.pendingCount} giao dịch đang chờ hoàn tất`;
  $("#pending-detail").textContent = `Chờ thu: ${amount(stats.pendingIncome)} · Chờ chi: ${amount(stats.pendingExpense)}`;
  renderEntries(); renderTrend(stats.monthly); renderCategories(stats);
}
function renderEntries() {
  $("#entry-count").textContent = state.entries.length;
  $("#entry-list").innerHTML = state.entries.map((entry) => {
    const isIncome = entry.kind === "income";
    const status = entry.status === "completed" ? (isIncome ? "Đã thu" : "Đã chi") : "Đang chờ";
    const next = entry.status === "completed" ? "Chuyển sang đang chờ" : (isIncome ? "Đánh dấu đã thu" : "Đánh dấu đã chi");
    return `<tr><td><div class="entry-name"><span class="entry-icon ${color(entry.color)}">${icon(entry.icon)}</span><div><strong title="${h(entry.title)}">${h(entry.title)}</strong><small title="${h(entry.notes)}">${entry.notes ? h(entry.notes) : (isIncome ? "Khoản thu" : "Khoản chi")}</small></div></div></td><td><span class="category-pill">${h(entry.categoryName)}</span></td><td>${dateText(entry.date)}</td><td><button class="status-button ${entry.status === "pending" ? "pending" : ""}" data-action="status" data-id="${entry.id}" aria-label="${h(next + ': ' + entry.title)}" title="${h(next)}">${icon(entry.status === "pending" ? "clock" : "check")}${status}</button></td><td class="money-column"><span class="amount ${isIncome ? "income" : ""}">${isIncome ? "+" : "−"}${amount(entry.amount)}</span></td><td><div class="row-actions"><button class="icon-button" data-action="edit" data-id="${entry.id}" aria-label="${h('Sửa ' + entry.title)}" title="Sửa giao dịch">${icon("edit")}</button><button class="icon-button delete" data-action="delete" data-id="${entry.id}" aria-label="${h('Xóa ' + entry.title)}" title="Xóa giao dịch">${icon("trash")}</button></div></td></tr>`;
  }).join("");
  $("#empty-state").hidden = state.entries.length > 0;
  $("#list-summary").textContent = `${state.entries.length} giao dịch phù hợp trong ${state.statistics.count} giao dịch của tháng`;
  $("#export-csv").disabled = state.entries.length === 0;
}
function svgNode(tag, attributes = {}, text) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, String(value)));
  if (text !== undefined) node.textContent = text;
  return node;
}
function renderTrend(months) {
  const root = $("#trend-chart"); root.replaceChildren();
  if (months.every((item)=>item.income===0 && item.expense===0)) {
    root.innerHTML='<div class="chart-empty">Chưa có giao dịch đã hoàn tất<br>trong 6 tháng này.</div>';
    return;
  }
  const svg = svgNode("svg", { viewBox: "0 0 560 215", class: "chart-svg", role: "img", "aria-label": "Tổng thu và tổng chi đã hoàn tất trong 6 tháng, đơn vị đồng" });
  const biggest = Math.max(1, ...months.flatMap((x) => [x.income, x.expense]));
  const magnitude = 10 ** Math.floor(Math.log10(biggest / 4));
  const step = Math.ceil(biggest / 4 / magnitude) * magnitude;
  const maximum = step * 4, left = 55, top = 12, height = 157, width = 490;
  for (let i = 0; i <= 4; i++) {
    const y = top + height - height * i / 4, value = maximum * i / 4;
    svg.append(svgNode("line", { x1: left, y1: y, x2: left + width, y2: y, class: "axis-grid" }));
    const label = value >= 1e9 ? `${+(value / 1e9).toFixed(1)}tỷ` : value >= 1e6 ? `${+(value / 1e6).toFixed(1)}tr` : value >= 1000 ? `${+(value / 1000).toFixed(1)}k` : String(Math.round(value));
    svg.append(svgNode("text", { x: left - 9, y: y + 4, "text-anchor": "end" }, label));
  }
  months.forEach((item, index) => {
    const x = left + (index + .5) * width / 6;
    for (const [kind, offset, label] of [["income", -18, "Thu"], ["expense", 3, "Chi"]]) {
      const barHeight = item[kind] / maximum * height;
      const rect = svgNode("rect", { x: x + offset, y: top + height - barHeight, width: 15, height: Math.max(item[kind] ? 2 : 0, barHeight), rx: 3, class: "bar-" + kind, tabindex: "0", "aria-label": `${item.month}: ${label} ${amount(item[kind])}` });
      rect.append(svgNode("title", {}, `Tháng ${item.month.slice(5)}/${item.month.slice(0,4)} · ${label}: ${amount(item[kind])}`));
      svg.append(rect);
    }
    svg.append(svgNode("text", { x, y: top + height + 27, "text-anchor": "middle" }, `T${Number(item.month.slice(5))}`));
  });
  root.append(svg);
}
function renderCategories(stats) {
  const root = $("#category-chart");
  if (!stats.byCategory.length) {
    root.innerHTML = '<div class="chart-empty">Chưa có khoản chi đã hoàn tất.<br>Giao dịch đang chờ chưa được tính vào biểu đồ.</div>';
    return;
  }
  root.innerHTML = `<div class="category-total">${amount(stats.expense)}<small>Tổng chi đã thanh toán</small></div>` + stats.byCategory.map((item) => `<div class="category-row"><div class="category-row-top"><span class="category-name"><i class="${color(item.color)}"></i>${h(item.name)}</span><span>${amount(item.amount)} · ${Math.round(item.amount / stats.expense * 100)}%</span></div><div class="progress-track"><div class="progress-fill ${color(item.color)}" data-progress="${item.amount / stats.expense * 100}"></div></div></div>`).join("");
  root.querySelectorAll("[data-progress]").forEach((node) => { node.style.width = `${node.dataset.progress}%`; });
}
function fillCategorySelects() {
  const kind = $("#filter-kind").value;
  const previous = $("#filter-category").value;
  const filtered = state.categories.filter((x) => !kind || x.kind === kind);
  $("#filter-category").innerHTML = '<option value="">Tất cả danh mục</option>' + filtered.map((x) => `<option value="${x.id}">${h(x.name)}</option>`).join("");
  if (filtered.some((x) => String(x.id) === previous)) $("#filter-category").value = previous;
}
function fillFormCategories(selected) {
  const kind = $('input[name="kind"]:checked').value;
  const categories = state.categories.filter((x) => x.kind === kind);
  $("#entry-category").innerHTML = categories.map((x) => `<option value="${x.id}">${h(x.name)}</option>`).join("");
  if (selected) $("#entry-category").value = selected;
}
function previewAmount() {
  const value = Number($("#entry-amount").value);
  $("#amount-preview").textContent = Number.isSafeInteger(value) && value > 0 ? amount(value) : "Nhập số tiền nguyên, lớn hơn 0.";
}
function openForm(entry = null) {
  if (!state.token || !state.categories.length) { pageError("Chưa kết nối được ứng dụng. Hãy bấm Thử lại."); return; }
  state.edit = entry;
  $("#entry-form").reset(); $("#form-error").hidden = true;
  $("#dialog-title").textContent = entry ? "Sửa giao dịch" : "Thêm giao dịch";
  $("#save-entry").textContent = entry ? "Lưu thay đổi" : "Lưu giao dịch";
  $(`input[name="kind"][value="${entry?.kind || "expense"}"]`).checked = true;
  fillFormCategories(entry?.categoryId);
  $("#entry-title").value = entry?.title || "";
  $("#entry-amount").value = entry?.amount || "";
  // New entries use today's date in the current month, otherwise the selected month's first day.
  $("#entry-date").value = entry?.date || (selectedMonth() === state.today.slice(0,7) ? state.today : selectedMonth() + "-01");
  $("#entry-status").value = entry?.status || "completed";
  $("#entry-notes").value = entry?.notes || "";
  previewAmount(); $("#entry-dialog").showModal(); $("#entry-title").focus();
}
async function saveEntry(event) {
  event.preventDefault();
  if (state.mutating) return;
  const title = $("#entry-title").value.trim();
  if (!title) { $("#form-error").textContent = "Vui lòng nhập nội dung giao dịch."; $("#form-error").hidden = false; $("#entry-title").focus(); return; }
  const payload = { title, amount: Number($("#entry-amount").value), date: $("#entry-date").value,
    categoryId: Number($("#entry-category").value), status: $("#entry-status").value,
    notes: $("#entry-notes").value.trim(), revision: state.edit?.revision || 1 };
  state.mutating = true; $("#save-entry").disabled = true; $("#form-error").hidden = true;
  try {
    await request(state.edit ? `/api/entries/${state.edit.id}` : "/api/entries", { method: state.edit ? "PUT" : "POST", body: JSON.stringify(payload) });
    const editing = !!state.edit;
    $("#entry-dialog").close(); $("#month").value = payload.date.slice(0,7);
    // Show a newly saved entry even if an older filter would exclude it.
    resetFilters(false); await refresh(); toast(editing ? "Đã cập nhật giao dịch." : "Đã thêm giao dịch.");
  } catch (error) {
    $("#form-error").textContent = error.message; $("#form-error").hidden = false;
  } finally { state.mutating = false; $("#save-entry").disabled = false; }
}
async function changeStatus(entry, button) {
  if (state.mutating) return;
  state.mutating = true; button.disabled = true;
  try {
    await request(`/api/entries/${entry.id}/status`, { method: "PATCH", body: JSON.stringify({ status: entry.status === "pending" ? "completed" : "pending", revision: entry.revision }) });
    await refresh(); toast("Đã cập nhật trạng thái và thống kê.");
  } catch (error) { pageError(error.message); button.disabled = false; }
  finally { state.mutating = false; }
}
function askDelete(entry) {
  state.deleting = entry; $("#delete-name").textContent = entry.title;
  $("#delete-error").hidden = true; $("#delete-dialog").showModal(); $("#cancel-delete").focus();
}
async function deleteEntry() {
  if (state.mutating || !state.deleting) return;
  state.mutating = true; $("#confirm-delete").disabled = true;
  try {
    await request(`/api/entries/${state.deleting.id}?revision=${state.deleting.revision}`, { method: "DELETE" });
    $("#delete-dialog").close(); state.deleting = null; await refresh(); toast("Đã xóa giao dịch.");
  } catch (error) { $("#delete-error").textContent = error.message; $("#delete-error").hidden = false; }
  finally { state.mutating = false; $("#confirm-delete").disabled = false; }
}
function resetFilters(reload = true) {
  clearTimeout(searchTimer);
  $("#search").value = ""; $("#filter-kind").value = ""; $("#filter-status").value = "";
  $("#filter-category").value = ""; fillCategorySelects();
  if (reload) refresh();
}
function switchView(view) {
  state.view = view;
  const titles = { overview: ["Tổng quan", "Tổng quan tài chính", "Theo dõi thu, chi và các khoản chờ thanh toán trong tháng."], transactions: ["Giao dịch", "Sổ giao dịch", "Ghi lại và quản lý từng khoản thu, chi của bạn."], reports: ["Thống kê", "Báo cáo thu chi", "Xem dòng tiền và cơ cấu chi tiêu theo tháng."] };
  const [crumb, title, subtitle] = titles[view];
  $("#breadcrumb").textContent = crumb; $("#page-title").textContent = title; $("#page-subtitle").textContent = subtitle;
  $$("[data-view]").forEach((node) => { const active = node.dataset.view === view; node.classList.toggle("active", active); if (active) node.setAttribute("aria-current", "page"); else node.removeAttribute("aria-current"); });
  $("#charts").hidden = view === "transactions"; $("#transactions").hidden = view === "reports";
  $("#pending-banner").hidden = view === "reports" || !state.statistics?.pendingCount;
  window.scrollTo({ top: 0, behavior: "auto" });
}
function exportCsv() {
  const safeCell = (value) => '"' + String(value).replace(/^[=+\-@\t\r]/, "'$&").replaceAll('"', '""') + '"';
  const rows = [["Ngày", "Nội dung", "Loại", "Danh mục", "Số tiền (VND)", "Trạng thái", "Ghi chú"], ...state.entries.map((x) => [x.date, x.title, x.kind === "income" ? "Thu" : "Chi", x.categoryName, x.amount, x.status === "completed" ? "Đã hoàn tất" : "Đang chờ", x.notes])];
  const url = URL.createObjectURL(new Blob(["\uFEFF" + rows.map((row) => row.map(safeCell).join(",")).join("\r\n")], {type:"text/csv;charset=utf-8"}));
  const link = document.createElement("a"); link.href = url; link.download = `SoThuChi-${selectedMonth()}.csv`; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000); toast("Đã xuất danh sách giao dịch đang lọc.");
}
async function initialize() {
  $("#add-entry").disabled = true;
  try {
    const [session, categories] = await Promise.all([request("/api/session"), request("/api/categories")]);
    state.token = session.token; state.today = session.today; state.categories = categories;
    if (!$("#month").value) $("#month").value = session.today.slice(0,7);
    const [year, month, day] = session.today.split("-");
    $("#today-label").textContent = `Hôm nay, ${day} tháng ${Number(month)}, ${year}`;
    fillCategorySelects(); await refresh();
  } catch (error) { pageError("Không thể kết nối với ứng dụng. " + error.message); }
  finally { $("#add-entry").disabled = !state.token; }
}
$("#add-entry").addEventListener("click", () => openForm());
$("#empty-add").addEventListener("click", () => openForm());
$("#entry-form").addEventListener("submit", saveEntry);
$("#entry-amount").addEventListener("input", previewAmount);
$$('input[name="kind"]').forEach((node) => node.addEventListener("change", () => fillFormCategories()));
$("#month").addEventListener("change", refresh);
$("#filter-kind").addEventListener("change", () => { fillCategorySelects(); refresh(); });
["#filter-category", "#filter-status"].forEach((selector) => $(selector).addEventListener("change", refresh));
$("#search").addEventListener("input", () => { clearTimeout(searchTimer); searchTimer = setTimeout(refresh, 220); });
$("#reset-filters").addEventListener("click", () => resetFilters());
$("#show-pending").addEventListener("click", () => { switchView("transactions"); resetFilters(false); $("#filter-status").value = "pending"; refresh(); });
$("#export-csv").addEventListener("click", exportCsv);
$("#retry").addEventListener("click", () => state.token ? refresh() : initialize());
$$('[data-view]').forEach((node) => node.addEventListener("click", () => switchView(node.dataset.view)));
$$('.close-dialog').forEach((node) => node.addEventListener("click", () => { if (!state.mutating) $("#entry-dialog").close(); }));
$("#cancel-delete").addEventListener("click", () => { if (!state.mutating) $("#delete-dialog").close(); });
$("#confirm-delete").addEventListener("click", deleteEntry);
$("#entry-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button || state.mutating) return;
  const entry = state.entries.find((x) => x.id === Number(button.dataset.id)); if (!entry) return;
  if (button.dataset.action === "edit") openForm(entry);
  else if (button.dataset.action === "delete") askDelete(entry);
  else changeStatus(entry, button);
});
for (const dialog of $$("dialog")) dialog.addEventListener("cancel", (event) => { if (state.mutating) event.preventDefault(); });
initialize();
