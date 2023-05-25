function fetchProducts() {
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(data => {
        const productList = document.getElementById("product-list");
        let html = '';
        data.forEach(item => {
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
        productList.innerHTML = html;
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

const handleHome = async () => {
  const html = await fetch("components/home.html").then((data) => data.text());
  document.getElementById("main-page").innerHTML = html
}

handleHome()

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