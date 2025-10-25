// Target where the quote will appear
const quoteValue = document.getElementById('quoteDisplay');

// Quote data
const quotes = [
  { quote: "Be yourself; everyone else is already taken.", category: "selflove" },
  { quote: "The most difficult thing is the decision to act, the rest is merely tenacity.", category: "inspiration" },
  { quote: "So many books, so little time.", category: "wisdom" }
];
function loadQuotes() {
      const stored = localStorage.getItem('quotes');
      if (stored) quotes = JSON.parse(stored);
    }

function saveQuotes() {
    localStorage.setitem('quotes', JSON.stringify(saveQuotes))

}


// Function: show a random quote
function showRandomQuote() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteValue.innerHTML = `"${randomQuote.quote}" - ${randomQuote.category}`;
}

// Function: dynamically create the Add Quote form
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

  // When Add button clicked → add new quote
  addButton.addEventListener('click', addQuote);

  // Append inputs and button to the form div
  formDiv.appendChild(quoteInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addButton);

  // Add form to page
  document.body.appendChild(formDiv);
}

// Function: add a new quote dynamically
function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (quoteText !== "" && quoteCategory !== "") {
    quotes.push({ quote: quoteText, category: quoteCategory });

    // Clear the input fields after adding
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";

    
    // Show a random quote after adding
    showRandomQuote();
    saveQuotes();
  } else {
    alert("Please fill in both fields before adding a quote.");
  }
}

function saveLastViewed (quote) {
    sessionStorage.setItem('lastquote', JSON.stringify(quote));
}
function getLastViewed() {
    const last =sessionStorage.getItem('lastQuote');
    return last? JSON.parse(last) : null;
}
function exportToJsonFile () {
    const data = JSON.stringify(quotes, null, 2);
    const blob = new blob([data], {type: "application/json"});
    const url = url.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = "quotes.json"
    link.click();

}
function importFromJsonFIle(event) {
    const fileReader= new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.results);
        quotes.push(...importedQuotes);
        saveQuotes();
    }
    fileReadert.readAsText(event.target.files[0]);
}
loadQuotes();

// Event listener for "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Create the add-quote form dynamically when the page loads
createAddQuoteForm();

// Display one quote on load
showRandomQuote();
