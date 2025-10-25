const quotevalue = document.getElementById('quoteDisplay');

quotes = [
    {quote: "Be yourself; everyone else is already taken", category: "selflove"},
    {quote:"The most difficult thing is the decision to act, the rest is merely tenacity.", category:"inspiration"},
    {quote:"so many books, so little time", category:"wisdom"}
]
function newquote() {
    const randomquote = quotes[Math.floor(Math.random()* quotes.length)];
    quotevalue.textContent = `"${randomquote.quote}" - ${randomquote.category}`;;
}

button = document.getElementById('newQuote');

button.addEventListener("click", newquote);