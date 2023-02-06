const categoriesDiv = document.getElementById("categoriesDiv");
const multipleServicesDiv = document.getElementById("multipleServicesDiv");
const searchProduct = document.getElementById("searchProduct");
const searchBtn = document.getElementById("searchBtn");
const loginBtnName = document.getElementById("loginBtnName");
const logoutBtn = document.getElementById("logoutBtn");
const cart_arr = JSON.parse(localStorage.getItem("cartProd")) || [];
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
const categoriesArr = [
  {
    imageUrl:
      "https://shop.advanceautoparts.com/wcsstore/CVWEB/Attachment/staticbusinesscontent/image/landing/battery/diehard/HP-Category-Grid-DieHard-Gold-95x95.jpg",
    name: "Batteries",
    category: "Battery",
  },
  {
    imageUrl:
      "https://shop.advanceautoparts.com/wcsstore/CVWEB/Attachment/staticbusinesscontent/image/home/TC-Brakes.jpg",
    name: "Brake Pads & Shoes",
    category: "Brake Pads & Shoes",
  },
  {
    imageUrl:
      "https://shop.advanceautoparts.com/wcsstore/CVWEB/Attachment/staticbusinesscontent/image/2018/07/air-filter.jpg",
    name: "Engine Air Filters",
    category: "Engine Air Filters",
  },
  {
    imageUrl:
      "https://shop.advanceautoparts.com/wcsstore/CVWEB/Attachment/staticbusinesscontent/image/home/hm-topcat-wipers.jpg",
    name: "Wipers",
    category: "Wiper Blades",
  },
  {
    imageUrl:
      "https://shop.advanceautoparts.com/wcsstore/CVWEB/Attachment/staticbusinesscontent/image/home/flyer-lg.jpg",
    name: "Sales Flyer",
  },
  {
    imageUrl:
      "https://shop.advanceautoparts.com/wcsstore/CVWEB/Attachment/staticbusinesscontent/image/home/18-Driveworks-Fuel-Filter.jpg",
    name: "Small Engine",
  },

  {
    imageUrl:
      "https://shop.advanceautoparts.com/wcsstore/CVWEB/Attachment/staticbusinesscontent/image/home/TC-FRAM-Oil-and-Filter.jpg",
    name: "Oil Change Bundles",
  },

  {
    imageUrl:
      "https://shop.advanceautoparts.com/wcsstore/CVWEB/Attachment/staticbusinesscontent/image/2018/07/brake-rotors.jpg",
    name: "Rotors & Drums",
  },
  {
    imageUrl:
      "https://shop.advanceautoparts.com/wcsstore/CVWEB/Attachment/staticbusinesscontent/image/home/04-CQ-Radiator.jpg",
    name: "Radiators",
  },

  {
    imageUrl:
      "https://shop.advanceautoparts.com/wcsstore/CVWEB/Attachment/staticbusinesscontent/image/home/TC-ShocksStruts.jpg",
    name: "Shocks & Struts",
  },

  {
    imageUrl:
      "	https://shop.advanceautoparts.com/wcsstore/CVWEB/Attachment/staticbusinesscontent/image/2018/07/spark-plugs.jpg",
    name: "Spark Plugs",
  },
  {
    imageUrl:
      "https://shop.advanceautoparts.com/wcsstore/CVWEB/Attachment/staticbusinesscontent/image/home/06-Spectre-Air-Intake-Kit.jpg",
    name: "Performance Parts",
  },
];
const multipleServicesArr = [
  {
    logo: '<i class="fa-solid fa-house"></i>',
    heading: "Free In Store Services",
    para: "Personalized care including battery testing and installation, oil recycling, wiper installation and more!",
  },
  {
    logo: '<i class="fa-solid fa-car-side"></i>',
    heading: "Advance Same Day",
    para: "Free in store or curbside pickup.  Plus delivery available in select markets.",
  },
  {
    logo: '<i class="fa-solid fa-gauge-simple-high"></i>',
    heading: "Speed Perks",
    para: "Get points for every purchase.  Redeem points for rewards.",
  },
  {
    logo: '<i class="fa-solid fa-users"></i>',
    heading: "Hiring Now: In Store &amp; Corporate",
    para: "Be seen, heard &amp; valued. Careers start &amp; thrive here. Apply now.",
  },
  {
    logo: '<i class="fa-solid fa-dollar-sign"></i>',
    heading: "Rebates and Sweepstakes",
    para: "Find out about rebate and sweepstake offers, submit your rebate online and more!",
  },
  {
    logo: '<i class="fa-solid fa-user"></i>',
    heading: "Need a Certified Technician?",
    para: "We have approved professionals to repair any problem you have.",
  },
];

showCategories();
function showCategories() {
  categoriesArr.forEach((el) => {
    const card = document.createElement("div");
    card.setAttribute("class", "categoryDivCard");
    const imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "categoryDivImgDiv");
    const image = document.createElement("img");
    image.src = el.imageUrl;
    const name = document.createElement("h3");
    name.textContent = el.name;

    imgDiv.append(image, name);
    card.append(imgDiv);
    card.addEventListener("click", () => {
      showProducts(el.category);
    });
    categoriesDiv.append(card);
  });

  multipleServicesArr.forEach((el) => {
    const outerDiv = document.createElement("div");
    outerDiv.setAttribute("class", "outerDiv");
    const mainDivServices = document.createElement("div");
    mainDivServices.setAttribute("class", "mainDivServices");
    const iconDiv = document.createElement("div");
    iconDiv.innerHTML = el.logo;

    iconDiv.setAttribute("class", "iconDiv");
    const head = document.createElement("h3");
    head.textContent = el.heading;
    const desc = document.createElement("p");
    desc.textContent = el.para;

    mainDivServices.append(iconDiv, head, desc);
    outerDiv.append(mainDivServices);
    multipleServicesDiv.append(outerDiv);
  });
}

// onclicking the category products should be shown on the product page

function showProducts(category) {
  // console.log(category);
  fetch("https://63c59ffce1292e5bea27a4a8.mockapi.io/products")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.category);
      // console.log(data);
      const filteredData = data.filter((el) => el.category === category);
      console.log(filteredData);
      localStorage.setItem("productsData", JSON.stringify(filteredData));
      window.location.href = "products.html";
    });
}

// search functionality(deboucing)

// const debounce = (func, delay) => {
//   let debounceTimer;

//   return function (...args) {
//     clearInterval(debounceTimer);
//     debounceTimer = setTimeout(() => func(...args), delay);
//   };
// };
// function find(item) {
//   console.log(`${item}`);
// }

// logout user

logoutBtn.addEventListener("click", () => {
  localStorage.clear("isAuth");
  loginBtnName.textContent = "Account";
  logoutBtn.style.display = "none";
  console.log(isAuth, localStorage.getItem("isAuth"));
  window.location.href = "loginPage.html";
});
