const quotevalue = document.getElementById('quoteDisplay');

const quotes = [
    {quote: "Be yourself; everyone else is already taken", category: "selflove"},
    {quote:"The most difficult thing is the decision to act, the rest is merely tenacity.", category:"inspiration"},
    {quote:"so many books, so little time", category:"wisdom"}
]
function showRandomQuote() {
    const randomquote = quotes[Math.floor(Math.random()* quotes.length)];
    quotevalue.innerHTML = `"${randomquote.quote}" - ${randomquote.category}`;
}

function addQuote () {
    let newQuoteText = document.getElementById('newQuoteText');
const quoteText = newQuoteText.value.trim();

let newQuoteCategory = document.getElementById('newQuoteCategory');
const quoteCategory = newQuoteCategory.value.trim();

    if (quoteText !== "" && quoteCategory !== "") {
            quotes.push ({quote: quoteText, category: quoteCategory});

            console.log(quotes);
            showRandomQuote();
          
}

}


const button = document.getElementById('newQuote');


button.addEventListener("click", function() {
    addQuote();
    showRandomQuote();
});
