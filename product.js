var url = window.location.href;
var numero = url.match(/\d+/g).pop();
console.log(numero);

function fetchProduct() {
    fetch(`https://fakestoreapi.com/products/${numero}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const productDetail = document.getElementById("product-detail");
        let html = `
        <div class="container p-4">
            <div class="row">
                <div class="col-lg-6">
                    <div class="card p-5">
                        <img src="${data.image}" class="card-img-top" alt="Imagem do Produto">
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h2 class="card-title">${data.title}</h2>
                            <div class="mb-2 d-flex flex-row">
                                ${handleRatingStars(data.rating.rate)}
                                <div class="m-2">(${data.rating.count})</div>
                            </div>
                            <h5 style="color: #2d3377" class="card-text">R$ ${data.price}</h5>
                            <div class="rating m-2">
                                ${data.description}
                            </div>
                            <div class="d-flex flex-col gap-2">
                                <a href="/" class="btn btn-primary">Buy</a>
                                <a href="/" class="btn btn-primary">Back To Home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        productDetail.innerHTML = html;
      })
      .catch(error => {
        console.error('Ocorreu um erro:', error);
      });
  }

  fetchProduct()

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