// Target where the quote will appear
const quoteValue = document.getElementById('quoteDisplay');

// Use 'let' because we modify this array
let quotes = [
  { quote: "Be yourself; everyone else is already taken.", category: "selflove" },
  { quote: "The most difficult thing is the decision to act, the rest is merely tenacity.", category: "inspiration" },
  { quote: "So many books, so little time.", category: "wisdom" }
];

// Load quotes from localStorage
function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  if (stored) quotes = JSON.parse(stored);
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Show a random quote
function showRandomQuote() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteValue.innerHTML = `"${randomQuote.quote}" - ${randomQuote.category}`;
  saveLastViewed(randomQuote);
}

// Create Add Quote form dynamically
function createAddQuoteForm() {
  const formDiv = document.createElement('div');

  const quoteInput = document.createElement('input');
  quoteInput.id = 'newQuoteText';
  quoteInput.type = 'text';
  quoteInput.placeholder = 'Enter a new quote';

  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter quote category';

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.addEventListener('click', addQuote);

  formDiv.appendChild(quoteInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addButton);

  document.body.appendChild(formDiv);
}

// Add a new quote
function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (quoteText && quoteCategory) {
    quotes.push({ quote: quoteText, category: quoteCategory });
    saveQuotes();
    showRandomQuote();
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
  } else {
    alert("Please fill in both fields before adding a quote.");
  }
}

// Save and retrieve last viewed quote using sessionStorage
function saveLastViewed(quote) {
  sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}
function getLastViewed() {
  const last = sessionStorage.getItem('lastQuote');
  return last ? JSON.parse(last) : null;
}

// Export quotes to JSON file
function exportToJsonFile() {
  const data = JSON.stringify(quotes, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = "quotes.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// Initialize
loadQuotes();
createAddQuoteForm();
showRandomQuote();

// Event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);
document.getElementById('exportBtn').addEventListener('click', exportToJsonFile);
