
        function fetchProducts() {
            axios.get('https://dummyjson.com/products')
                .then(function (response) {
                    const products = response.data.products;
                    displayProducts(products);
                })
                .catch(function (error) {
                    console.error('Error fetching products:', error);
                });
        }

        function displayProducts(products) {
            const productsContainer = document.getElementById('products');
            productsContainer.innerHTML = '';

            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.innerHTML = `
                    <h2>${product.title}</h2>
                    <img src="${product.thumbnail}" alt="${product.title}" style="width:100px; height:auto;">
                    <p>${product.description}</p>
                    <button data-product-id="${product.id}">Details</button>
                `;
                productsContainer.appendChild(productElement);
            });

            // Attach click event listeners to all buttons
            const detailsButtons = document.querySelectorAll('[data-product-id]');
            detailsButtons.forEach(button => {
                button.addEventListener('click', function(event) {
                    const productId = button.getAttribute('data-product-id');
                    viewProductDetails(productId);
                });
            });
        }

        function viewProductDetails(productId) {
            axios.get(`https://dummyjson.com/products/${productId}`)
                .then(function (response) {
                    const productDetails = response.data;
                    displayProductDetails(productDetails);
                })
                .catch(function (error) {
                    console.error('Error fetching product details:', error);
                });
        }

        function displayProductDetails(productDetails) {
            const detailsContainer = document.getElementById('details');
            detailsContainer.innerHTML = `
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <h2>${productDetails.title}</h2>
                        <img src="${productDetails.thumbnail}" alt="${productDetails.title}" style="width:100px; height:auto;">
                        <p>${productDetails.description}</p>
                        <p>Price: ${productDetails.price}</p>
                        <p>Rating: ${productDetails.rating}</p>
                    </div>
                    <!-- Add more slides as needed -->
                </div>
            `;
            const swiper = new Swiper('.swiper-container', {
                slidesPerView: 1,
                spaceBetween: 10,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }

        fetchProducts();