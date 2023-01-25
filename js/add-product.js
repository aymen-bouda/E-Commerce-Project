// get product +conditions
function addProduct() {
  // get inputs + controle de saisie
  var name = document.getElementById("nameId").value;
  verification("nameError", "Name must have at least 3 chars", name.length < 3);
  var price = document.getElementById("priceId").value;
  verification("priceError", "Price must be over 0", Number(price) <= 0);
  var category = document.getElementById("categoryId").value;
  verification("categoryError","Must have at least 5 chars",category.length < 5);
  var stock = document.getElementById("stockId").value;
  verification("stockError", "Stock must be over 10", Number(stock) <= 10);

// local storage push
if (
    name.length >= 3 &&
    Number(price) > 0 &&
    category.length >= 5 &&
    Number(stock) >  10
  ) {
    //create JSON Object
    var product = {
        name: name,
        price: price,
        category: category,
        stock: stock,
      };
    
    var products = JSON.parse(localStorage.getItem("products") || "[]");
   
    products.push(product);
  
    localStorage.setItem("products", JSON.stringify(products));
  }

}

// conditions function shortcut
function verification(spanID, msg, condition) {
  if (condition) {
    document.getElementById(spanID).innerHTML = msg;
  } else {
    document.getElementById(spanID).innerHTML = "";
  }
}
