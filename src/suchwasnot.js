let images = [
    "background1.jpg",
    "background2.jpg",
    "background3.jpg",
    "background4.jpg",
    "background5.jpg",
    "background6.jpg",
    "background7.jpg",
    "background11.jpg",
    "background12.jpg",
    "background13.jpg",
    "background14.jpg",
    "background15.jpg"
]
$(function () {
    if (document.getElementById("photo") == null) return
    let i = Math.floor(Math.random() * images.length);
    $("#photo").css("background-image", "url(" + images[i] + ")");
    setInterval(function () {
        i++;
        if (i == images.length) {
            i = 0;
        }
        $("#photo").fadeOut("slow", function () {
            $(this).css("background-image", "url(" + images[i] + ")");
            $(this).fadeIn("slow");
        });
    }, 30000);
});


function show_order(id) {
    document.getElementById('order-section').style.display = "block";
    document.getElementById('order-suchwasnot-eu').style.display = "none";
    document.getElementById('order-botanist-eu').style.display = "none";
    document.getElementById('order-collection-eu').style.display = "none";
    document.getElementById(id).style.display = "block";
    document.getElementById('top-title').scrollIntoView();
}

function paypalButtons(amount, description) {
    return paypal.Buttons({
      style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'paypal',
          
      },
      createOrder: function(data, actions) {
          return actions.order.create({
              purchase_units: [{
                  amount: {
                      value: amount
                  },
                  description: description
              }]
          });
      },
      onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
              alert('Transaction completed by ' + details.payer.name.given_name + '!');
          });
      }
    })
}


// Add this to your suchwasnot.js file

let currentLang = 'en';

// Function to render content based on selected language
function renderContent(lang) {
    const data = content[lang];

    // Update page title and subtitle
    document.getElementById('top-title').textContent = data.title;
    document.getElementById('subtitle').textContent = data.subtitle;
    document.getElementById('handmade-text').textContent = data.handmade;

    // Update pricing text
    document.getElementById('pricing-text').innerHTML =
        data.pricing + ' <a href="mailto:sebastiaan@suchwasnot.com">sebastiaan@suchwasnot.com</a>.';

    // Render books
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = '';

    const bookOrder = ['griffinfly', 'botanist', 'suchwasnot'];

    bookOrder.forEach((bookKey, index) => {
        const book = data.books[bookKey];

        let bookHTML = `
            <div class='full-title'>
                <span class='title' id='${bookKey}'>${book.title}</span>
                ${book.subtitle ? `<br />${book.subtitle}` : ''}<br />
            </div>

            <div class='cover-image'><img src="${bookKey}-cover.jpg" /></div>

            <div class='book-summary'>
                <div class='description'>
                    ${book.stories.join('<br>')}
                </div>

                <div class='details link-buttons'>
                    ${book.details}
                </div>
            </div>
        `;

        if (index < bookOrder.length - 1) {
            bookHTML += '<hr>';
        }

        booksContainer.innerHTML += bookHTML;
    });
}

// Language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language based on browser settings or default to English
    const browserLang = navigator.language.substring(0, 2);
    currentLang = (browserLang === 'nl') ? 'nl' : 'en';

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    // Render initial content
    renderContent(currentLang);

    // Add click handlers for language buttons
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', function() {
            currentLang = this.dataset.lang;

            // Update active state
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('active', btn === this);
            });

            // Update page language attribute
            document.documentElement.lang = currentLang;

            // Re-render content
            renderContent(currentLang);

            // Save preference
            localStorage.setItem('preferredLanguage', currentLang);
        });
    });

    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'en' || savedLang === 'nl')) {
        currentLang = savedLang;
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLang);
        });
        renderContent(currentLang);
    }
});