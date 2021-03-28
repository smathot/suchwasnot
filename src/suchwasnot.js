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
