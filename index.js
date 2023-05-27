function fetchProducts() {
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(data => {
        showProducts(data)
      })
      .catch(error => {
        console.error('Ocorreu um erro:', error);
      });
  }

fetchProducts();

const handleNavbar = async () => {
  const html = await fetch("components/navbar.html").then((data) => data.text());
  document.getElementById("navbar").innerHTML = html
}

handleNavbar()

const handleQuickFind = async () => {
  const html = await fetch("components/quickFind.html").then((data) => data.text());
  document.getElementById("quick-find").innerHTML = html
}

handleQuickFind()

const handleFooter = async () => {
  const html = await fetch("components/footer.html").then((data) => data.text());
  document.getElementById("footer").innerHTML = html
}

handleFooter()

const mostReviewedItems = async () => {
  const html = await fetch("components/mostReviewed.html").then((data) => data.text());
  document.getElementById("most-reviewed-items").innerHTML = html
}

mostReviewedItems()

function handleRatingStars(rating) {
  const starFill = '<img src="resources/starFill.svg" alt="StarFill">'
  const starHalf = '<img src="resources/starHalf.svg" alt="StarHalf">'
  const starEmpty = '<img src="resources/star.svg" alt="StarEmpty">'
  const convertRating = Math.round(rating * 2) / 2
  const fullStarsCount = Math.floor(convertRating)
  const hasHalfStar = convertRating % 1 !== 0

  let starsHTML = ''

  for (let i = 0; i < fullStarsCount; i++) {
    starsHTML += starFill
  }

  if (hasHalfStar) {
    starsHTML += starHalf
  }

  const emptyStarsCount = 5 - Math.ceil(convertRating)

  for (let i = 0; i < emptyStarsCount; i++) {
    starsHTML += starEmpty
  }

  return starsHTML
}

// Função para exibir os produtos na página
function showProducts(products) {
  var productsList = document.getElementById("product-list")
  productsList.innerHTML = "" // Limpa a lista de produtos antes de exibir os resultados

  let html = ''

  products.forEach((item) => {
    html += `
          <div class="col">
              <div class="card h-100">
                    <img style="background-color: #f2f2f2; padding: 1rem" height="238px" src="${item.image}" class="card-img-top" alt="Product Card">
                    <div class="card-body">
                      <h5 class="card-title">${item.title}</h5>
                      <div class="mb-2 d-flex flex-row">
                        ${handleRatingStars(item.rating.rate)}
                        <div class="m-2">(${item.rating.count})</div>
                      </div>
                      <h5 style="color: #2d3377" class="card-text">R$ ${item.price}</h5>
                      <p class="card-text">${item.description}</p>
                      <a href="/product.html?${item.id}" class="btn btn-primary">See More</a>
                    </div>
              </div>
          </div>`;
  });
  productsList.innerHTML += html 
}

// Pesquisa de produtos 

function pesquisarProdutos() {
  var termo = document.getElementById("searchBar").value.toLowerCase();

  fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(produtos => {
      var filteredProducts = produtos.filter((product) => {
        var name = product.title.toLowerCase();
        return name.includes(termo)
      })
      console.log("filtrando produtos")
      showProducts(filteredProducts)
    }).catch(error => {
        console.error("Ocorreu um erro ao obter a lista de produtos:", error);
      });
}

// Filtragem de produtos 

function getAllCategories() {
  fetch("https://fakestoreapi.com/products/categories")
    .then(response => response.json())
    .then(json => console.log(json))
}

getAllCategories()

function filterCategories(){
  var categoryOne = document.getElementById("category-1").value
  if(categoryOne !== "-Select Category 1-"){
    fetch(`https://fakestoreapi.com/products/category/${categoryOne}`)
    .then(res=>res.json())
    .then(data=>showProducts(data))
  }
}