const DATA_URL = "./data/reviews.json";

const grid = document.querySelector("#generation-grid");
const methodGrid = document.querySelector("#method-grid");
const statusText = document.querySelector("#archive-status");
const recordCount = document.querySelector("#record-count");
const cardTemplate = document.querySelector("#generation-card-template");
const dialog = document.querySelector("#result-dialog");
const closeButton = document.querySelector("#dialog-close");
const dialogTitle = document.querySelector("#dialog-title");
const dialogKicker = document.querySelector("#dialog-kicker");
const dialogImage = document.querySelector("#dialog-image");
const dialogImageFallback = document.querySelector("#dialog-image-fallback");
const dialogMetadata = document.querySelector("#dialog-metadata");
const dialogConversation = document.querySelector("#dialog-conversation");
const dialogImplementation = document.querySelector("#dialog-implementation");
const dialogSystem = document.querySelector("#dialog-system");
const dialogActions = document.querySelector("#dialog-actions");
const compareButton = document.querySelector("#compare-button");
const compareHint = document.querySelector("#compare-hint");
const compareDialog = document.querySelector("#compare-dialog");
const compareClose = document.querySelector("#compare-close");
const compareBody = document.querySelector("#compare-body");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxClose = document.querySelector("#lightbox-close");
const dialogImageZoom = document.querySelector("#dialog-image-zoom");

let records = [];
let lastTrigger = null;
let lastLightboxTrigger = null;
let lightboxSrc = "";
const selectedIds = new Set();

const statusLabels = {
  completed: "已完成",
  refined: "已优化",
  rejected: "已否决",
};

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function setImageWithFallback(image, fallback, src, alt) {
  image.hidden = false;
  fallback.hidden = true;
  image.alt = alt;
  image.onerror = () => {
    image.hidden = true;
    fallback.hidden = false;
  };
  image.onload = () => {
    image.hidden = false;
    fallback.hidden = true;
  };
  image.src = src;
}

function renderState(className, message) {
  grid.replaceChildren(createElement("div", className, message));
  grid.setAttribute("aria-busy", "false");
}

function renderMethods(methods = []) {
  if (!methods.length) {
    methodGrid.replaceChildren(createElement("p", "empty-state", "暂无生成方式说明。"));
    return;
  }

  const fragment = document.createDocumentFragment();
  methods.forEach((method) => {
    const card = createElement("article", "method-card");
    card.append(
      createElement("strong", "", method.label),
      createElement("p", "", method.description),
    );
    fragment.appendChild(card);
  });
  methodGrid.replaceChildren(fragment);
}

function updateCompareState() {
  const count = selectedIds.size;
  compareButton.disabled = count !== 2;
  compareHint.textContent =
    count === 2
      ? "已选择 2 条记录，可打开并排对比。"
      : `最多选择 2 条记录进行并排对比。当前已选 ${count} 条。`;
}

function toggleCompare(record, checked, checkbox) {
  if (checked) {
    if (selectedIds.size >= 2 && !selectedIds.has(record.id)) {
      checkbox.checked = false;
      return;
    }
    selectedIds.add(record.id);
  } else {
    selectedIds.delete(record.id);
  }
  updateCompareState();
}

function renderCards() {
  if (!records.length) {
    renderState("empty-state", "还没有可对比的记录。");
    statusText.textContent = "暂无记录";
    recordCount.textContent = "0";
    return;
  }

  const fragment = document.createDocumentFragment();

  records.forEach((record, index) => {
    const card = cardTemplate.content.firstElementChild.cloneNode(true);
    const trigger = card.querySelector(".card-trigger");
    const previewZoom = card.querySelector(".preview-zoom");
    const image = card.querySelector(".card-image");
    const fallback = card.querySelector(".preview-fallback");
    const badge = card.querySelector(".status-badge");
    const checkbox = card.querySelector(".compare-toggle");

    card.querySelector(".card-index").textContent = String(index + 1).padStart(2, "0");
    card.querySelector(".card-title").textContent = record.title;
    card.querySelector(".card-time").textContent = formatDateTime(record.generatedAt);
    card.querySelector(".method-badge").textContent = record.method;
    badge.textContent = statusLabels[record.status] ?? record.status;
    badge.dataset.status = record.status;
    checkbox.checked = selectedIds.has(record.id);
    checkbox.addEventListener("change", (event) => {
      toggleCompare(record, event.target.checked, event.target);
    });

    setImageWithFallback(image, fallback, record.preview, `${record.title}的生成结果预览`);

    previewZoom.setAttribute("aria-label", `放大查看${record.title}`);
    previewZoom.addEventListener("click", () => openLightbox(record.preview, `${record.title}的完整预览`, previewZoom));
    trigger.setAttribute("aria-label", `查看${record.title}的生成详情`);
    trigger.addEventListener("click", () => openDialog(record, trigger));
    fragment.appendChild(card);
  });

  grid.replaceChildren(fragment);
  grid.setAttribute("aria-busy", "false");
  recordCount.textContent = String(records.length);
  statusText.textContent = `共 ${records.length} 条记录，按时间从新到旧排列`;
  updateCompareState();
}

function appendMetadata(target, label, value) {
  target.append(createElement("dt", "", label), createElement("dd", "", value));
}

function createList(items) {
  const list = createElement("ol", "detail-list");
  items.forEach((item) => list.appendChild(createElement("li", "", item)));
  return list;
}

function renderConversation(target, messages) {
  const fragment = document.createDocumentFragment();

  messages.forEach((message) => {
    const item = createElement("article", "message");
    item.dataset.role = message.role;
    item.append(
      createElement("span", "message-role", message.role === "user" ? "输入" : "生成说明"),
      createElement("p", "", message.content),
    );
    fragment.appendChild(item);
  });

  target.replaceChildren(fragment);
}

function renderImplementation(target, record) {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(createElement("p", "implementation-copy", record.implementation.summary));

  if (record.implementation.steps?.length) {
    fragment.append(createElement("p", "detail-label", "执行步骤"), createList(record.implementation.steps));
  }

  target.replaceChildren(fragment);
}

function renderSystem(target, record) {
  const fragment = document.createDocumentFragment();
  fragment.append(
    createElement("p", "detail-label", "生成约束"),
    createList(record.constraints ?? []),
    createElement("p", "detail-label", "自检结果"),
    createList(record.checks ?? []),
  );
  target.replaceChildren(fragment);
}

function renderActions(links = []) {
  const fragment = document.createDocumentFragment();

  links.forEach((link) => {
    const anchor = createElement("a", "result-link", link.label);
    anchor.href = link.url;
    fragment.appendChild(anchor);
  });

  dialogActions.replaceChildren(fragment);
  dialogActions.hidden = links.length === 0;
}

function openDialog(record, trigger) {
  lastTrigger = trigger;
  dialogTitle.textContent = record.title;
  dialogKicker.textContent = `${record.method} · ${statusLabels[record.status] ?? record.status}`;
  setImageWithFallback(
    dialogImage,
    dialogImageFallback,
    record.preview,
    `${record.title}的完整预览`,
  );

  dialogMetadata.replaceChildren();
  appendMetadata(dialogMetadata, "生成时间", formatDateTime(record.generatedAt));
  appendMetadata(dialogMetadata, "生成方式", record.method);
  appendMetadata(dialogMetadata, "输出类型", record.outputType);
  appendMetadata(dialogMetadata, "平台", record.platform);
  appendMetadata(dialogMetadata, "结果摘要", record.summary);

  renderConversation(dialogConversation, record.conversation);
  renderImplementation(dialogImplementation, record);
  renderSystem(dialogSystem, record);
  renderActions(record.links);

  dialog.showModal();
  closeButton.focus();
}

function openLightbox(src, alt, trigger) {
  if (!src) return;
  lastLightboxTrigger = trigger ?? null;
  lightboxSrc = src;
  lightboxImage.alt = alt;
  lightboxImage.src = src;
  const host = trigger?.closest("dialog[open]") ?? document.body;
  host.appendChild(lightbox);
  lightbox.hidden = false;
  lightboxClose.focus();
}

function closeLightbox() {
  if (lightbox.hidden) return;
  lightbox.hidden = true;
  document.body.appendChild(lightbox);
}

function renderComparePane(record) {
  const pane = createElement("section", "compare-pane");
  const preview = createElement("div", "compare-preview");
  const zoom = createElement("button", "image-zoom");
  zoom.type = "button";
  zoom.setAttribute("aria-label", `放大查看${record.title}`);
  const image = createElement("img");
  const fallback = createElement("div", "image-fallback", "暂无可用预览");
  fallback.hidden = true;
  setImageWithFallback(image, fallback, record.preview, `${record.title}的对比预览`);
  zoom.addEventListener("click", () => openLightbox(record.preview, `${record.title}的完整预览`, zoom));
  zoom.appendChild(image);
  preview.append(zoom, fallback);

  const meta = createElement("dl", "metadata-list");
  appendMetadata(meta, "标题", record.title);
  appendMetadata(meta, "生成方式", record.method);
  appendMetadata(meta, "摘要", record.summary);

  const methodBlock = createElement("section", "detail-section");
  const implementation = createElement("div");
  renderImplementation(implementation, record);
  methodBlock.append(createElement("h3", "", "生成方式说明"), implementation);

  pane.append(preview, meta, methodBlock);
  return pane;
}

function openCompare() {
  const selected = records.filter((record) => selectedIds.has(record.id));
  if (selected.length !== 2) return;

  compareBody.replaceChildren(...selected.map(renderComparePane));
  compareDialog.showModal();
  compareClose.focus();
}

function closeDialog() {
  dialog.close();
}

function closeCompare() {
  compareDialog.close();
}

closeButton.addEventListener("click", closeDialog);
compareClose.addEventListener("click", closeCompare);
compareButton.addEventListener("click", openCompare);
function setDialogZoom(zoomed) {
  dialog.classList.toggle("is-zoomed", zoomed);
  dialogImageZoom.setAttribute("aria-label", zoomed ? "还原预览" : "点击放大");
  const hint = dialogImageZoom.querySelector(".zoom-hint");
  if (hint) hint.textContent = zoomed ? "点击还原" : "点击放大";
}

dialogImageZoom.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  setDialogZoom(!dialog.classList.contains("is-zoomed"));
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});

compareDialog.addEventListener("click", (event) => {
  if (event.target === compareDialog) closeCompare();
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target === lightboxImage) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!lightbox.hidden) {
    event.preventDefault();
    closeLightbox();
    lastLightboxTrigger?.focus();
    return;
  }
  if (compareDialog.open) {
    event.preventDefault();
    closeCompare();
    return;
  }
  if (dialog.open) {
    event.preventDefault();
    closeDialog();
  }
});

dialog.addEventListener("close", () => {
  setDialogZoom(false);
  closeLightbox();
  lastTrigger?.focus();
});

compareDialog.addEventListener("close", () => {
  closeLightbox();
});

lightboxClose.addEventListener("click", (event) => {
  event.stopPropagation();
  closeLightbox();
  lastLightboxTrigger?.focus();
});

async function loadRecords() {
  try {
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data.records)) throw new Error("记录数据格式不正确");

    renderMethods(data.methods);
    records = data.records.sort(
      (left, right) => new Date(right.generatedAt) - new Date(left.generatedAt),
    );
    renderCards();
  } catch (error) {
    console.error("记录加载失败：", error);
    recordCount.textContent = "0";
    statusText.textContent = "记录加载失败";
    renderState(
      "error-state",
      "无法读取记录。请通过本地 HTTP 服务打开此页面，并检查 data/reviews.json。",
    );
  }
}

loadRecords();
