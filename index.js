
function img(anything) {
    document.querySelector('.slide').src = anything;
  }

  function change(change) {
    const line = document.querySelector('.home');
    line.style.background = change;
  }

  document.addEventListener("DOMContentLoaded",getProductDetails)




function getProductDetails(){
    const apiData = fetch(`https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json`)
    .then((response) => response.json())
    .then((data) =>{
        
        console.log(data)
        const productDetails = document.querySelector('.right');

        let num = data.product.price;
        let str = Number(num.substring(1,6))   
        
        let num1 = (data.product.compare_at_price)
        let str1 = Number(num1.substring(1,6))   
        

        const perfectCal = parseInt(((str1-str)/str1)*100);

        productDetails.innerHTML = `

        <p>${data.product.vendor}</p>
        <h3>${data.product.title}</h3>
        <hr>
        <div>
           <span class="discount">
            <h2>${num}.00</h2>
            <p id="dis">${perfectCal + "%" + " Off"}</p>
           </span>
           <p><s>${num1}.00</s></p>
        </div>
        <hr>

        <p>Choose a color</p>
        <div class="color flex1">
            <span id="cy"><input type ="radio" name = "size" value ="yellow"/></span>
            <span id="cg"><input type ="radio" name = "size" value ="blue"/></span>
            <span id="cb"><input type ="radio" name = "size" value ="orange"/></span>
            <span id="cp"><input type ="radio" name = "size" value ="gray"/></span>
          </div>
          <hr/>
          <p>Choose a size</p>
          <div class="size">
          <div class="ia">
          <input type="radio" value="small" name="small" onchange ="handleVariantChange()" class="small"/>${data.product.options[1].values[0]}
          </div>
          <div class="ia">
          <input type="radio" value="medium" name="small" onchange ="handleVariantChange()" class="medium"/>${data.product.options[1].values[1]}
          </div>
          <div class="ia">
          <input type="radio" value="large" name="small" onchange ="handleVariantChange()" class="large"/>${data.product.options[1].values[2]}
          </div>
          <div class="ia">
          <input type="radio" value="exlarge" name="small" onchange ="handleVariantChange()" class="exlarge"/>${data.product.options[1].values[3]}
          </div>
          <div class="ia">
          <input type="radio" value="xxl" name="small" onchange ="handleVariantChange()" class="xxl"/>${data.product.options[1].values[4]}
          </div>
          </div>

        <div class="cart-wrapper">
        <div class="counter">
          <span>-</span>
          <span>1</span>
          <span>+</span>
        </div>

        <button class = "cartBtn" onclick = "cartHandle()"> Add To Cart</button>
          </div>

          <div class ="cart-message"></div>

        <hr>  
          ${data.product.description}   

        `

        
       
    })
    .catch((err) => console.log(err))
}

function handleVariantChange() {
  console.log("change")
  // Capture selected variant data
  const selectedVariant = {
      size: document.querySelector('input[name="small"]:checked').value,
      color: document.querySelector('input[name="size"]:checked').value,
      quantity: parseInt(document.querySelector('.counter span:nth-child(2)').textContent)
  };

  // Store selected variant data (for example, you can use localStorage)
  localStorage.setItem('selectedVariant', JSON.stringify(selectedVariant));
  console.log(selectedVariant,"selectedVariant")
}


// Event listeners
document.querySelectorAll('input[name="small"], input[name="size"]').forEach(input => {
  input.addEventListener('change', handleVariantChange);
});

function cartHandle(){
  // console.log("click")
  const selectedVariant = JSON.parse(localStorage.getItem('selectedVariant'));

  let div = document.querySelector('.cart-message');
  div.style.display="block";

  // Display added product details
  if (selectedVariant) {
      const addedProductDetails = `
          Color: ${selectedVariant.color}
          Size: ${selectedVariant.size}
          Quantity: ${selectedVariant.quantity}
      `;
      
      document.querySelector('.cart-message').innerHTML = addedProductDetails + "added to cart";
  } else {
      document.querySelector('.cart-message').textContent = "Please select a variant before adding to cart.";
  }

}