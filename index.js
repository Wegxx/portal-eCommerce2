let test = []
fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=> json.forEach(element => {
            test.push(element)
        }))
        .then(console.log(test[0]))
