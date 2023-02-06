const rightSection = document.getElementById("rightSection");
const productsData = JSON.parse(localStorage.getItem("productsData"));
const paginationWrapper = document.getElementById("paginationWrapper");
const baseUrl =
  "https://63c59ffce1292e5bea27a4a8.mockapi.io/products?limit=10&page=1";


  const loginBtnName = document.getElementById("loginBtnName");
const logoutBtn = document.getElementById("logoutBtn");
  const cart_arr = JSON.parse(localStorage.getItem("cartProd")) || [];
console.log(cart_arr.length);


const totalCartItemsCount = document.getElementById("totalCartItemsCount");
totalCartItemsCount.textContent = cart_arr.length;


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
const cartProductsArr = JSON.parse(localStorage.getItem("cartProd")) || [];
const filterBtn = document.getElementById("filter");

const filterPriceBtn = document.getElementById("filterPrice");
const sortPriceBtn = document.getElementById("sortPrice");

const totalCount = productsData.length;
showProducts(productsData);
console.log(productsData);
function showProducts(productsData) {
  rightSection.innerHTML = null;
  productsData.forEach((item) => {
    const container = document.createElement("div");
    container.setAttribute("id", "_container");
    const imgDiv = document.createElement("div");
    imgDiv.setAttribute("id", "_imgDiv");
    const image = document.createElement("img");
    image.src = item.image;
    image.addEventListener("click", () => {
      showProductDetails(item.id, item);
    });
    const price = document.createElement("p");
    price.textContent = "$" + item.price;
    const brandName = document.createElement("h3");
    brandName.textContent = item.title;
    const description = document.createElement("p");
    description.textContent =
      "Engine Air Filter: Removes up to 95% of Dirt & Debris";
    const message = document.createElement("span");
    message.setAttribute("id", "messageCart");
    const cartBtn = document.createElement("button");
    cartBtn.textContent = "Add To Cart";
    cartBtn.addEventListener("click", () => {
      addToCart(item.id, item, message);
    });
    
    imgDiv.append(image);
    container.append(imgDiv, price, brandName, description, message, cartBtn);
    rightSection.append(container);
  });
}


// add to cart

function addToCart(id, item, message) {
  if (!isAuth) {
    message.textContent = "Please Login First!";
  } else {
    let flag = false;
    for (let i = 0; i < cartProductsArr.length; i++) {
      if (cartProductsArr[i].id === id) {
        flag = true;
        message.textContent = "Product Already Added To Cart!";
        setTimeout(() => (message.style.display = "none"), 3000);
        console.log(flag);
        // cartProductsArr[i].count++;
      }
    }
    if (!flag) {
      message.textContent = "Product Added To Cart";
      setTimeout(() => (message.style.display = "none"), 3000);
      console.log(flag);
      cartProductsArr.push({ ...item, count: 1 });
      setTimeout(()=>{
        location.reload()
      },2000)
    
    }
    localStorage.setItem("cartProd", JSON.stringify(cartProductsArr));
  }
  message.style.display = "block";
  console.log(cartProductsArr);

}


// filter

filterBtn.addEventListener("change", (e) => {
  if (e.target.value === "") {
    showProducts(productsData);
  } else {
    const filteredData = productsData.filter((el) => {
      return e.target.value === el.title;
    });

    showProducts(filteredData);
  }
});

// filterPriceBtn

filterPriceBtn.addEventListener("change", (e) => {
  if (e.target.value === "10-24") {
    const filterData = productsData.filter((el) => {
      return el.price >= 10 && el.price <= 24;
    });
    showProducts(filterData);
  } else if (e.target.value === "25-49") {
    const filterData = productsData.filter((el) => {
      return el.price >= 25 && el.price <= 49;
    });
    showProducts(filterData);
  } else if (e.target.value === "50-99") {
    const filterData = productsData.filter((el) => {
      return el.price >= 50 && el.price <= 99;
    });
    showProducts(filterData);
  } else if (e.target.value === "100Above") {
    const filterData = productsData.filter((el) => {
      return el.price >= 100;
    });
    showProducts(filterData);
  } else {
    showProducts(productsData);
  }
});

// sort Price

sortPriceBtn.addEventListener("change", (e) => {
  if (e.target.value === "htl") {
    const sortedData = productsData.sort((a, b) => b.price - a.price);
    showProducts(sortedData);
  } else if (e.target.value === "lth") {
    const sortedData = productsData.sort((a, b) => a.price - b.price);
    showProducts(sortedData);
  } else {
    showProducts(productsData);
  }
});

// show product details

function showProductDetails(id, item) {
  let flag = false;
  for (let i = 0; i < productsData.length; i++) {
    if (productsData[i].id === id) {
      localStorage.setItem("viewDetail", JSON.stringify(item));
      flag = true;
      break;
    }
  }
  window.location.href = "prodPage.html";
}
logoutBtn.addEventListener("click", () => {
  localStorage.clear("isAuth");
  loginBtnName.textContent = "Account";
  logoutBtn.style.display = "none";
  console.log(isAuth, localStorage.getItem("isAuth"));
  window.location.href = "loginPage.html";
});