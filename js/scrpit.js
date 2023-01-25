// saisie de users dans LS
function signup() {
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  // get inputs + controle de saisie
  var firstName = document.getElementById("firstNameId").value;
  verification(
    "firstNameError",
    "First name must have at least 3 chars",
    firstName.length < 3
  );
  //   if (firstName.length < 3) {
  //     document.getElementById("firstNameError").innerHTML =
  //       "First name must have at least 3 chars";
  //   } else {
  //     document.getElementById("firstNameError").innerHTML = "";
  //   }
  var lastName = document.getElementById("lastNameId").value;
  if (lastName.length < 5) {
    document.getElementById("LastNameError").innerHTML =
      "Last name must have at least 5 chars";
  } else {
    document.getElementById("LastNameError").innerHTML = "";
  }
  var email = document.getElementById("emailId").value;
  verification("emailError", "Email exists", checkEmail(users, email));
  var pwd = document.getElementById("pwdId").value;
  if (pwd.length < 6 || pwd.length > 12) {
    document.getElementById("pwdError").innerHTML = "Password between 6and 12";
  } else {
    document.getElementById("pwdError").innerHTML = "";
  }
  var tel = document.getElementById("telId").value;
  if (tel.length != 8) {
    document.getElementById("telError").innerHTML = "tel must have 8 chars";
  } else {
    document.getElementById("telError").innerHTML = "";
  }

  if (
    firstName.length >= 3 &&
    lastName.length >= 5 &&
    pwd.length >= 6 &&
    pwd.length <= 12 &&
    tel.length == 8 &&
    !checkEmail(users, email)
  ) {
    //create JSON Object
    var user = {
      id: maxId(users) + 1,
      firstName: firstName,
      lastName: lastName,
      email: email,
      pwd: pwd,
      tel: tel,
    };
    //Save object into DB
    //localStorage.setItem("users", JSON.stringify(user));
    //return all objects into users key from LS
    // users =[{},{},{}]
    // insert user object into array
    users.push(user);
    //users = [{},{},{},{}]
    localStorage.setItem("users", JSON.stringify(users));
    location.replace("Signup.html");
  }
}

// verification des conditions
function verification(spanID, msg, condition) {
  if (condition) {
    document.getElementById(spanID).innerHTML = msg;
  } else {
    document.getElementById(spanID).innerHTML = "";
  }
}

// get product +conditions + add products in LS
function addProduct() {
  // get inputs + controle de saisie
  var productName = document.getElementById("nameId").value;
  verification("nameError", "Name must have at least 3 chars", name.length < 3);
  var price = document.getElementById("priceId").value;
  verification("priceError", "Price must be over 0", Number(price) <= 0);
  var category = document.getElementById("categoryId").value;
  verification(
    "categoryError",
    "Must have at least 5 chars",
    category.length < 5
  );
  var stock = document.getElementById("stockId").value;
  verification("stockError", "Stock must be over 10", Number(stock) <= 10);

  // local storage push
  if (
    productName.length >= 3 &&
    Number(price) > 0 &&
    category.length >= 5 &&
    Number(stock) > 10
  ) {
    //create JSON Object
    var productsTab = JSON.parse(localStorage.getItem("products") || "[]");
    var product = {
      id: maxId(productsTab) + 1,
      productName: productName,
      price: price,
      category: category,
      stock: stock,
    };

    productsTab.push(product);

    localStorage.setItem("products", JSON.stringify(productsTab));

    // go to another page
    location.replace("showProducts.html");
  }
}

// check if email exists into Array
function checkEmail(T, ch) {
  var emailExist = false;
  for (let i = 0; i < T.length; i++) {
    if (ch == T[i].email) {
      emailExist = true;
      break;
    }
  }

  // afficher un message d'erreur dans l'historique
  // console.log("emailExist variable", emailExist);
  return emailExist;
}
//fonction pour get item from LS
function getFromLS(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}
// display all products in a table
function displayAllProducts() {
  var productsTab = getFromLS("products");
  var result = "";
  for (let i = 0; i < productsTab.length; i++) {
    result += `<tr>
                <td>${productsTab[i].productName}</td>
                <td>${productsTab[i].price}</td>
                <td>${productsTab[i].stock}</td>
                <td>${productsTab[i].category}</td>
                <td>
                   <button class="btn btn-success">Display</button>
                   <button class="btn btn-warning">Edit</button>
                   <button class="btn btn-danger">Delete</button>
                </td>
               </tr>`;
    document.getElementById("productsTable").innerHTML = result;
    // x = productsTab[i];
    // L += <tr> x</tr>;
  }
  console.log("here result", result);
}

// display all products in blocs

function displayBlocks() {
  var productsTab = getFromLS("products");
  var result = "";
  for (let i = 0; i < productsTab.length; i++) {
    result += `<div class="col-lg-3 col-md-6 align-items-center">
    <div class="single-product" >
      <img class="img-fluid" src="img/product/p1.jpg" alt="">
      <div class="product-details" id="productsBlock">
        <h6>${productsTab[i].productName}</h6>
        <div class="price">
          <h6>$${productsTab[i].price}</h6>
        </div>
        <div class="stock">
          <h6>${productsTab[i].stock} pièces</h6>
        </div>
        <div class="prd-bottom ">
          <button class="btn btn-warning" onclick="goToProductInfo(${productsTab[i].id})">Order</button>
        </div>
      </div>
    </div>
  </div>`;
    document.getElementById("productsBloc").innerHTML = result;
    // x = productsTab[i];
    // L += <tr> x</tr>;
  }
  console.log("here result", result);
}

// vers la page productDetails.html
function goToProductInfo(productId) {
  localStorage.setItem("prId", productId);
  location.replace("productDetails.html");
}

// création de l'id pour chaque produit
function maxId(T) {
  if (T.length == 0) {
    max = 0;
  } else {
    var max = T[0].id;
    for (let i = 1; i < T.length; i++) {
      if (T[i].id > max) {
        max = T[i].id;
      }
    }
  }
  return max;
}

// display all users
function displayAllUsers() {
  var usersTab = getFromLS("users");
  var result = "";
  for (let i = 0; i < usersTab.length; i++) {
    result += `<tr>
                <td>${usersTab[i].id}</td>
                <td>${usersTab[i].firstName}</td>
                <td>${usersTab[i].lastName}</td>
                <td>${usersTab[i].email}</td>
                <td>
                   <button class="btn btn-success">Display</button>
                   <button class="btn btn-warning">Edit</button>
                   <button class="btn btn-danger">Delete</button>
                </td>
               </tr>`;
    document.getElementById("usersTab").innerHTML = result;
    // x = productsTab[i];
    // L += <tr> x</tr>;
  }
  console.log("here result", result);
}

// single product function (product details.html)
function displayProductDetails() {
  var productsTab = getFromLS("products");
  var idP = getFromLS("prId");
  var product = {};
  for (let i = 0; i < productsTab.length; i++) {
    if (idP == productsTab[i].id) {
      product = productsTab[i];
      break;
    }
  }
  console.log("here finded product", product);
  document.getElementById("prName").innerHTML = product.productName;
  document.getElementById("prPrice").innerHTML = product.price;
  document.getElementById("prCategory").innerHTML = product.category;
}

// check availability +ADD TO CART

function addToCart() {
  var qty = document.getElementById("qtyId").value;
  var productsTab = getFromLS("products");
  var idP = getFromLS("prId");
  var product = {};
  console.log("votre quantité est", qty);
  for (let i = 0; i < productsTab.length; i++) {
    if (productsTab[i].id == idP) {
      product = productsTab[i];
      break;
    }
  }

  if (Number(product.stock) >= Number(qty) && Number(qty) > 0) {
    var orders = getFromLS("orders");
    var connectedUser = localStorage.getItem("connectedUser");
    console.log("connectedUser", connectedUser);
    var productId = localStorage.getItem("prId");
    console.log("productId", productId);
    var order = {
      id: maxId(orders) + 1,
      idProduct: productId,
      idUser: connectedUser,
      qty: qty,
    };
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // update stock qty
    // get all products from LS
    var products = getFromLS("products");
    console.log("products", products);
    for (let i = 0; i < productsTab.length; i++) {
      console.log("products[i].id", products[i].id);
      if (products[i].id == productId) {
        products[i].stock = Number(products[i].stock) - Number(qty);
        break;
      }
    }

    // send new value to tab
    localStorage.setItem("products", JSON.stringify(products));
    // location.replace("basket2.html");
  } else {
    document.getElementById("qtyError").innerHTML = "Not Available";
  }
}

// check login
function login() {
  var usersTab = getFromLS("users");
  var email = document.getElementById("userEmail").value;
  var pwd = document.getElementById("userPwd").value;

  console.log("votre email est", email);
  console.log("votre pwd est", pwd);
  console.log("votre usersTab est", usersTab);
  var isLoggedIn = false;
  for (let i = 0; i < usersTab.length; i++) {
    if (usersTab[i].email == email && usersTab[i].pwd == pwd) {
      isLoggedIn = true;
      localStorage.setItem("connectedUser", usersTab[i].id);
      break;
    }
  }

  if (isLoggedIn) {
    location.replace("showProducts.html");
  } else {
    document.getElementById("userError").innerHTML = "Please check Email/Pwd";
  }
}

// show cart in a new page
function displayBasket() {
  var ordersTab = getFromLS("orders");
  var products = getFromLS("products");
  var result = "";
  var ordersName = JSON.parse("[]");
  var ordersNames = {};

  // get product name and price
  for (let i = 0; i < ordersTab.length; i++) {
    for (let j = 0; j < products.length; j++) {
      if (products[j].id == ordersTab[i].idProduct) {
        ordersNames = {
          productName: products[j].productName,
          price: products[j].price,
        };
      }
    }
    ordersName.push(ordersNames);
  }

  localStorage.setItem("ordersName", JSON.stringify(ordersName));
  console.log("ordersName", ordersName);

  for (let i = 0; i < ordersTab.length; i++) {
    result += `<tr>
                <td>${ordersName[i].productName}</td>
                <td>${ordersName[i].price}</td>
                <td>${ordersName[i].price * ordersTab[i].qty}</td>
                <td>${ordersTab[i].id}</td>
                <td>${ordersTab[i].qty}</td>
                <td>${ordersTab[i].idProduct}</td>
                <td>
                   <button class="btn btn-warning">Edit</button>
                   <button class="btn btn-danger">Delete</button>
                </td>
               </tr>`;
    document.getElementById("ordersTable").innerHTML = result;
    // x = productsTab[i];
    // L += <tr> x</tr>;
  }
  console.log("here result for orders", result);
}

function myOrders() {
  var orders = getFromLS("orders");
  var connectedUser = localStorage.getItem("connectedUser");
  var myOrdersTab = [];
  var result = "";

  // get product name and price
  // for (let i = 0; i < ordersTab.length; i++) {
  //   for (let j = 0; j < products.length; j++) {
  //     if (products[j].id == ordersTab[i].idProduct) {
  //       ordersNames = {
  //         productName: products[j].productName,
  //         price: products[j].price,
  //       };
  //     }
  //   }
  //   ordersName.push(ordersNames);
  // }
  // localStorage.setItem("ordersName", JSON.stringify(ordersName));
  // console.log("ordersName", ordersName);

  // display
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].idUser == connectedUser) {
      myOrdersTab.push(orders[i]);
    }
  }
  console.log(myOrdersTab);

  for (let i = 0; i < myOrdersTab.length; i++) {
    result += `<tr>
    <td>
        <div class="media">
            <div class="d-flex">
                <img src="img/cart.jpg" alt="">
            </div>
            <div class="media-body">
                <h4>${
                  searchProductById(myOrdersTab[i].idProduct).productName
                }</h4>
            </div>
        </div>
    </td>
    <td>
        <h5> ${searchProductById(myOrdersTab[i].idProduct).price}</h5>
    </td>
    <td>
        <div class="product_count">
            <input type="number" name="qty" id="sst" maxlength="12" value="1" title="Quantity:"
                class="input-text qty">
        </div>
    </td>
    <td>
        <h5>${
          searchProductById(myOrdersTab[i].idProduct).price *
          Number(myOrdersTab[i].qty)
        }</h5>
    </td>
    <td>
    <button class="btn btn-danger" onclick="deleteOrder(${
      myOrdersTab[i].idProduct
    })">Delete</button>
    </td>
</tr>`;
  }
  document.getElementById("myOrdersId").innerHTML = result;
}

function pressKey(x, y) {
  return x * y;
}




// search product by id
function searchProductById(id) {
  var products = getFromLS("products");
  var findedProduct;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      findedProduct = products[i];
      break;
    }
  }
  return findedProduct;
}





// supprimer une commande du panier
function deleteOrder(id) {
  var ordersTab = getFromLS("orders");
  var obj;
  for (let i = 0; i < ordersTab.length; i++) {
    if (ordersTab[i].id == id) {
      obj=ordersTab[i];
      ordersTab.splice(i, 1);
      break;
    }
  }

  // MAJ product stock
  var productsTab=getFromLS("products");
  for (let i = 0; i < productsTab.length; i++) {
    if (productsTab[i].id == obj.idProduct) {
      productsTab[i].stock += Number(obj.qty);
      break;
    }
    
  }

  localStorage.setItem("orders", JSON.stringify(ordersTab));
  localStorage.setItem("products", JSON.stringify(productsTab));
  location.reload();
}




// navbar dynamique
function generateHeader() {
  var connectedUser = localStorage.getItem("connectedUser");
  // var usersTab = getFromLS("users");
  // var findedUser;
  var result;
  findedUser=searchObjectById("users",connectedUser);
  if (connectedUser) {
    result = `<ul class="nav navbar-nav menu_nav ml-auto">
    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
    <li class="nav-item submenu dropdown active">
      <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
       aria-expanded="false">Product</a>
    </li>
    <li class="nav-item submenu dropdown">
      <a href="#" class="nav-link dropdown-toggle" role="button" aria-haspopup="true"
       aria-expanded="false">Basket</a>

    </li>
                  <li class="nav-item submenu dropdown">
      <a href="#" class="nav-link dropdown-toggle" role="button" aria-haspopup="true"
       aria-expanded="false">Welcom ${findedUser.firstName}</a>

    </li>
                  <li class="nav-item submenu dropdown">
      <a href="#" class="nav-link dropdown-toggle" role="button" aria-haspopup="true"
       aria-expanded="false">Logout</a>
       </li>
    </li>
  </ul>`;
  } else {
    result= `<ul class="nav navbar-nav menu_nav ml-auto">
    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
    <li class="nav-item submenu dropdown active">
      <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
       aria-expanded="false">Product</a>
    </li>
    <li class="nav-item submenu dropdown">
      <a href="#" class="nav-link dropdown-toggle" role="button" aria-haspopup="true"
       aria-expanded="false">Login</a>

    </li>
                  <li class="nav-item submenu dropdown">
      <a href="#" class="nav-link dropdown-toggle" role="button" aria-haspopup="true"
       aria-expanded="false">Signup</a>
       </li>
    </li>
  </ul>`;
  }
  document.getElementById("headerId").innerHTML=result;
}




function logout() {
  localStorage.removeItem(connectedUser);
  location.reload();
}



// search object by id
function searchObjectById(key,id) {
  var Tab = getFromLS(key);
  var findedObj;
  for (let i = 0; i < Tab.length; i++) {
    if (Tab[i].id == id) {
      findedObj = Tab[i];
      break;
    }
}
return findedObj;
}


