const cart_arr = JSON.parse(localStorage.getItem("cartProd")) || [];

const subtotal = document.getElementById("subtotal");
const cart_items_div = document.getElementById("cart_items_div");
const total_qty = document.getElementById("total_qty");
const checkoutBtn = document.getElementById("checkoutBtn");
checkoutBtn.addEventListener("click", checkOutOnClick());

const tbody = document.querySelector("tbody");


console.log(cart_arr.length);
const totalCartItemsCount = document.getElementById("totalCartItemsCount");
totalCartItemsCount.textContent = cart_arr.length;
// showCartTotal();
// function showCartTotal(){
//   totalCartItemsCount.textContent = cart_arr.length;
// }




let isAuth = localStorage.getItem("isAuth") || false;
if (isAuth) {
  loginBtnName.textContent = "Abhishek";
  logoutBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i>';
} else {
  loginBtnName.textContent = "Account";
  loginBtnName.addEventListener("click", () => {
    window.location.href = "loginPage.html";
  });
  loginBtnName.style.cursor = "pointer";
  logoutBtn.style.display = "none";
}
// console.log(cart_arr);

show_cart_items(cart_arr);
function show_cart_items(cart_arr) {
  tbody.innerHTML = null;
  cart_arr.forEach((element, index) => {
    console.log(element, index);
    const table_row = document.createElement("tr");
    const name_td = document.createElement("td");
    name_td.innerText = element.title;
    const imageDiv = document.createElement("div");
    imageDiv.setAttribute("id", "imageDiv");
    const image_td = document.createElement("img");
    image_td.src = element.image;
    const price_td = document.createElement("td");
    price_td.innerText = "$ " + element.price;
    const qtyDiv = document.createElement("div");
    qtyDiv.setAttribute("id", "quantityDiv");
    const qty_td = document.createElement("td");
    qty_td.innerText = element.count;
    const increaseBtn = document.createElement("button");
    increaseBtn.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
    increaseBtn.addEventListener("click", () => {
      increaseProdQty(element.id, element);
    });
    const decreaseBtn = document.createElement("button");
    decreaseBtn.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';

    decreaseBtn.addEventListener("click", () => {
      decreaseProdQty(element.id, element);
    });
    const total_td = document.createElement("td");
    total_td.innerText = "$ " + (+element.price * +element.count).toFixed(2);
    const remove_td = document.createElement("td");
    remove_td.innerHTML = '<i class="fa-sharp fa-solid fa-circle-xmark"></i>';

    remove_td.addEventListener("click", () => {
      remove_row(index, element.id);
    });

    qtyDiv.append(decreaseBtn, qty_td, increaseBtn);
    imageDiv.append(image_td);
    table_row.append(name_td, imageDiv, price_td, qtyDiv, total_td, remove_td);
    // console.log(table_row);
    tbody.append(table_row);
  });
  showSubTotal();
  total_qty.innerText = cart_arr.length + " items ";
}

function showSubTotal() {
  let total = 0;

  for (let i = 0; i < cart_arr.length; i++) {
    total += cart_arr[i].price * cart_arr[i].count;
  }
  subtotal.innerText = "₹" + total.toFixed(2);
}

function remove_row(index, id) {
  // console.log(index);

  for (let i = 0; i < cart_arr.length; i++) {
    if (cart_arr[i].id === id) {
      cart_arr.splice(i, 1);
    }
  }

  localStorage.setItem("cartProd", JSON.stringify(cart_arr));
  show_cart_items(cart_arr);
  // console.log(cart_arr);
}

async function  checkOutOnClick() {
  await fetch("https://63c64dbad307b76967365584.mockapi.io/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderDetails: cart_arr,
    }),
  })
  localStorage.setItem("cartProd", JSON.stringify([]));
  
}

// increase prod qty on click;

function increaseProdQty(id, element) {
  element.count++;
  show_cart_items(cart_arr);
  localStorage.setItem("cartProd", JSON.stringify(cart_arr));

  console.log(cart_arr, "cart arr");
  console.log(element.count, "element");
}

// decrease prod qty on click;

function decreaseProdQty(id, element) {
  if (element.count === 1) {
    return;
  }
  element.count--;

  localStorage.setItem("cartProd", JSON.stringify(cart_arr));

  show_cart_items(cart_arr);
  console.log(cart_arr, "cart arr");
  console.log(element.count, "element");
}
