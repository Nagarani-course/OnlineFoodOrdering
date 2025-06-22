let cartCount ;
let cartItems = [];

function getCartCount() {
   cartCount = window.localStorage.getItem('cartCount');
    cartCount != null
    ? document.getElementById('cartCount').setAttribute('value',cartCount)
    : 0;
}

function cartDetails(){
    getUserName();
    showLogout();
    getCartCount();
   
    let foodDetails = window.localStorage.getItem('cartItems') ?
    JSON.parse(window.localStorage.getItem('cartItems')) : null;
    cartItems = foodDetails;
    getCartCount();
    let item = 0;
    
    let foodItem = document.getElementById('foodlist');
    
    foodItem.innerHTML =`
    <div class="row"> 
        <div class="col-1"> 
        <h6>FOOD</h6>
        </div>
        <div class="col-4"> 
        <h6>NAME</h6>
        </div>
        <div class="col-2"> 
        <h6 >RATE</h6>
        </div>
        <div class="col-2"> 
        <h6>No. Of Items</h6>
        </div>
    </div>
    <hr/>
    `;

    for(let row=0;row<cartCount;row++){
        let rowDiv =  document.createElement('div');
        rowDiv.classList.add('row');
        rowDiv.id="foodRow"+row;
       
        for(let column=0;column<1;column++){
            if(item == cartItems.length) break;
            const colDiv = document.createElement('div');
            rowDiv.id="foodRowCol"+row+column;
            colDiv.classList.add('col-12');
            colDiv.classList.add('text-left');
            colDiv.innerHTML = `
            <div class="row">
            <div class="col-1">      
            <img id="image${row}${column}" class="rounded" src="${cartItems[item].image}" width="25px" height="25px"/>
            </div><div class="col-4">
            <h6 class="text-primary" id="foodName${row}${column}">${cartItems[item].name}
            <span class="text-danger" style="font-size: 14px;" id="rating${row}${column}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="1em" style=" fill:orange">
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
            <span>${cartItems[item].rating}</span>
            </span></h6></div>
            <div class="col-2">
                <h6>1  </h6>
            </div>
            <div class="col-2">    
            <span class="text-danger" id="cost${row}${column}" style="font-size: 14px;" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="0.7em" style="fill: blue">
            <path d="M308 96c6.6 0 12-5.4 12-12V44c0-6.6-5.4-12-12-12H12C5.4 32 0 37.4 0 44v44.7c0 6.6 5.4 12 12 12h85.3c27.3 0 48.3 10 61 27.3H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h158.8c-6.2 36.1-33 58.6-74.8 58.6H12c-6.6 0-12 5.4-12 12v53c0 3.3 1.4 6.5 3.9 8.8l165.1 152.4a12 12 0 0 0 8.1 3.2h82.6c10.9 0 16.2-13.4 8.1-20.8L116.9 319.9c76.5-2.3 131.1-53.4 138.3-127.9H308c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-58.7c-3.5-11.5-8.3-22.2-14.3-32H308z"/></svg>
                ${cartItems[item].caloriesPerServing}</span>
            </div> 
            <div class="col-2" title="Delete item">  
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="0.75em" id="delete"  onclick="deleteItem(${cartItems[item].id})">
            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            </div>
            </div> <hr/> 
                         `;
            rowDiv.appendChild(colDiv);
            item++;
        }
    
       foodItem.appendChild(rowDiv);
    }
        const totalRow = document.createElement('div');
        let totalAmount = cartAmount();
        totalRow.innerHTML = `
        <div class="row"> 
        <div class="col-1"> 
        </div>
        <div class="col-4"> 
        <p class="text-danger" id="nocartmessage">No Items in the Cart</p>
        </div>
       <div class="col-2"> 
       <h6>Total</h6>
       </div>
       <div class="col-2">
       <span class="text-danger" style="font-size: 14px;" >
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="0.7em" style="fill: blue">
            <path d="M308 96c6.6 0 12-5.4 12-12V44c0-6.6-5.4-12-12-12H12C5.4 32 0 37.4 0 44v44.7c0 6.6 5.4 12 12 12h85.3c27.3 0 48.3 10 61 27.3H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h158.8c-6.2 36.1-33 58.6-74.8 58.6H12c-6.6 0-12 5.4-12 12v53c0 3.3 1.4 6.5 3.9 8.8l165.1 152.4a12 12 0 0 0 8.1 3.2h82.6c10.9 0 16.2-13.4 8.1-20.8L116.9 319.9c76.5-2.3 131.1-53.4 138.3-127.9H308c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-58.7c-3.5-11.5-8.3-22.2-14.3-32H308z"/></svg>
        ${totalAmount}</span>
       </div>
       </div>
       <hr/>
       <div class="d-grid gap-2 d-md-flex justify-content-center">
       <p id="paymentMsg">Make payment to complete the order</p>
       <button id="checkoutbtn" class="btn btn-primary" type="button" onclick="checkOut()">CheckOut</button>
     </div>
           `;
           
     foodItem.appendChild(totalRow);
     if(totalAmount != 0) {
        document.getElementById('nocartmessage').style.display = 'none';
     } else {
        document.getElementById('checkoutbtn').style.display = 'none';
        document.getElementById('paymentMsg').style.display = 'none';
     }
    
}

function cartAmount() {
    let amount = 0;
    if(cartItems != null){
            cartItems.map(item => {
            amount += item.caloriesPerServing;
        });
    }
    return amount;
}

function deleteItem(foodId){
    alert('Food Item Deleted');
    cartItems = cartItems.filter(item => item.id !== foodId);
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.localStorage.setItem('cartCount', cartItems.length);
    cartDetails();
} 

function checkOut(){
    alert('Payment Success and your food will be delevered as soon as');
    cartItems = [];
    window.localStorage.removeItem('cartItems');
    window.localStorage.setItem('cartCount', 0);
    window.location.href ='index.html';
}