let product = JSON.parse(localStorage.getItem("viewDetail"));
console.log(product);
const container = document.getElementById("floating_div");
const name_tag = document.getElementById("product_name");
const price_tag = document.getElementById("product_price");
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


showData(product);
function showData(product) {
  console.log(product, "prod");
  name_tag.innerText = product.title;
  price_tag.innerText = "$ " + product.price;
  let sub_div = document.createElement("div");
  sub_div.setAttribute("id", "sub_div");
  let image_div = document.createElement("div");
  image_div.setAttribute("id", "product_image_div");

  let image = document.createElement("img");

  const description = document.createElement("div");
  description.setAttribute("id", "descriptionprodpage");
  description.innerText = product.description;

  const subCategory = document.createElement("div");
  subCategory.setAttribute("id", "subCategory");
  subCategory.textContent = product.sub_category;

  const reviews = document.createElement("p");
  reviews.textContent = "Review : "+ product.review;
  

  const rating = document.createElement("p");
  rating.textContent = "Rating : "+product.rating;

  const category = document.createElement("p");
  category.textContent = "Category : " + product.category;

  image.src = product.image;
  image_div.append(image);
  sub_div.append(
    image_div,
    subCategory,
    category,
    description,
    reviews,
    rating,
  
  );
  container.append(sub_div);
}
