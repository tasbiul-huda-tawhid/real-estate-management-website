"use strict";

const listings = [
  { id: "P101", title: "Courtyard Apartment", district: "Fern Quarter", type: "Apartment", beds: 2, price: 575000, status: "Available", description: "A two-bedroom layout around a shared courtyard. The dining and living spaces open onto a covered balcony." },
  { id: "P102", title: "Longlight House", district: "Morrow Hills", type: "House", beds: 4, price: 835000, status: "Under offer", description: "A single-level house with a separate study and a north-facing fictional garden." },
  { id: "P103", title: "Westbank Townhouse", district: "Westbank Walk", type: "Townhouse", beds: 3, price: 695000, status: "Available", description: "A three-bedroom townhouse with a flexible landing that doubles as a work nook." },
  { id: "P104", title: "Top-floor Studio", district: "Fern Quarter", type: "Apartment", beds: 0, price: 395000, status: "Sold", description: "An open-plan studio. The fictional sale has closed and the listing is kept for reference." },
  { id: "P105", title: "Twin Gable House", district: "Morrow Hills", type: "House", beds: 3, price: 750000, status: "Available", description: "A compact house with two gabled wings and a sheltered entry." },
  { id: "P106", title: "Arcade Townhouse", district: "Willow Steps", type: "Townhouse", beds: 2, price: 625000, status: "Under offer", description: "A two-bedroom home on a fictional pedestrian lane with its own front patio." }
];
const statuses = new Set(["Available", "Under offer", "Sold"]);
const storeKey = "property-desk-demo-v1";
const get = id => document.getElementById(id);
const money = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
const dialog = get("detail");
let selected = null;
let edits = {};
let persisted = true;
try {
  const saved = JSON.parse(localStorage.getItem(storeKey) || "{}");
  if (saved && typeof saved === "object") {
    for (const item of listings) if (statuses.has(saved[item.id])) edits[item.id] = saved[item.id];
  }
} catch {
  // A blocked store or invalid saved value must not prevent use of the demo.
  persisted = false;
}

function storageNote() {
  get("storage-note").textContent = persisted
    ? "Fictional listings. Status edits stay in this browser."
    : "Fictional listings. Browser storage is unavailable or unreadable. Unsaved edits may reset on reload.";
}

function currentStatus(item) {
  return edits[item.id] || item.status;
}

function add(parent, element, text, className) {
  const node = document.createElement(element);
  node.textContent = text;
  if (className) node.className = className;
  parent.append(node);
  return node;
}

function summary(item) {
  return [item.district, item.beds ? item.beds + " bed" : "Studio", money.format(item.price)].join(" · ");
}

function render() {
  const query = get("search").value.trim().toLowerCase();
  const type = get("type").value;
  const status = get("status").value;
  const matches = listings.filter(item =>
    (item.title + " " + item.district).toLowerCase().includes(query)
    && (!type || item.type === type) && (!status || currentStatus(item) === status));
  const cards = get("cards");
  cards.replaceChildren();
  get("count").textContent = matches.length + (matches.length === 1 ? " listing" : " listings");
  if (!matches.length) add(cards, "p", "No listings match. Try a different search or filter.", "empty");
  matches.forEach(item => {
    const card = add(cards, "article", "", "card");
    const art = add(card, "img", "", "art");
    art.alt = "";
    art.src = "property.svg";
    const body = add(card, "div", "", "card-body");
    add(body, "span", currentStatus(item), "badge");
    add(body, "h3", item.title);
    add(body, "p", item.type + " · " + summary(item));
    const button = add(body, "button", "View details", "secondary");
    button.setAttribute("aria-label", "View details for " + item.title);
    button.addEventListener("click", () => openDetails(item));
  });
}

function openDetails(item) {
  selected = item;
  get("detail-title").textContent = item.title;
  get("detail-info").textContent = item.id + " · " + item.type + " · " + summary(item);
  get("description").textContent = item.description;
  get("new-status").value = currentStatus(item);
  dialog.showModal();
}

get("search").addEventListener("input", render);
for (const id of ["type", "status"]) get(id).addEventListener("change", render);
get("close").addEventListener("click", () => dialog.close());
get("save").addEventListener("click", () => {
  const value = get("new-status").value;
  if (!selected || !statuses.has(value)) return;
  edits[selected.id] = value;
  try {
    localStorage.setItem(storeKey, JSON.stringify(edits));
    persisted = true;
  } catch {
    persisted = false;
  }
  storageNote();
  const title = selected.title;
  dialog.close();
  render();
  get("search").focus();
  get("notice").textContent = title + (persisted ? " saved as " : " updated for this visit to ") + value + ".";
});
get("reset").addEventListener("click", () => {
  edits = {};
  try {
    localStorage.removeItem(storeKey);
    persisted = true;
  } catch {
    persisted = false;
  }
  for (const id of ["search", "type", "status"]) get(id).value = "";
  storageNote();
  render();
  get("notice").textContent = "Demo data and filters reset.";
});

storageNote();
render();
