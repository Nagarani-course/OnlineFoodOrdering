let cart = [];
let foodDetailsInformation = [];

function loadFoodDetails(){

        getUserName();
        showLogout();
        getCartCount();

        fetch("https://dummyjson.com/recipes?limit=100").
        then(result=>result.json()).
        then(result=>{
        let foodDetails = result.recipes;
        foodDetailsInformation = foodDetails;
       
        let item = 0;
        
        let foodItem = document.getElementById('foodlist');
        let totalFooditem = foodDetails.length < 3 ?  foodDetails.length : foodDetails.length/4;
      
        for(let row=1;row<=totalFooditem+1;row++){
            let rowDiv =  document.createElement('div');
            rowDiv.classList.add('row');
            rowDiv.classList.add('mb-5');
            rowDiv.id="foodRow"+row;

            for(let column=0;column<4;column++){
                if(item == foodDetails.length) break;
                const colDiv = document.createElement('div');
                rowDiv.id="foodRowCol"+row+column;
                colDiv.classList.add('col-3');
                colDiv.classList.add('text-center');
                colDiv.innerHTML = `<h6 class="text-primary" id="foodName${row}${column}">${foodDetails[item].name}</h6>
                <p class="text-danger" style="font-size: 14px;" id="rating${row}${column}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="1em" style=" fill:orange">
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                <span>${foodDetails[item].rating}</span>
                </p>
                <div class="text-center mb-2">      
                <img id="image${row}${column}" class="rounded" src="${foodDetails[item].image}" width="100px" height="100px"/><br/>
                <span class="text-danger" id="cost${row}${column}" style="font-size: 14px;" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="0.7em" style="fill: blue">
                <path d="M308 96c6.6 0 12-5.4 12-12V44c0-6.6-5.4-12-12-12H12C5.4 32 0 37.4 0 44v44.7c0 6.6 5.4 12 12 12h85.3c27.3 0 48.3 10 61 27.3H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h158.8c-6.2 36.1-33 58.6-74.8 58.6H12c-6.6 0-12 5.4-12 12v53c0 3.3 1.4 6.5 3.9 8.8l165.1 152.4a12 12 0 0 0 8.1 3.2h82.6c10.9 0 16.2-13.4 8.1-20.8L116.9 319.9c76.5-2.3 131.1-53.4 138.3-127.9H308c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-58.7c-3.5-11.5-8.3-22.2-14.3-32H308z"/></svg>
                ${foodDetails[item].caloriesPerServing}</span>
                </div>
                <p class="text-info" id="msg${foodDetails[item].id}" style="font-size: 12px;"></p>
                <button type="button" class="btn btn-primary btn-sm" onclick="addToCart(\'${foodDetails[item].id - 1}\')">Add to Cart</button>
                             `;
                rowDiv.appendChild(colDiv);
                item++;
            }
            foodItem.appendChild(rowDiv);
        }
        }).
        catch(error=>console.error("Error fetching food details:", error));
}


function searchFoodDetails(searchFoodName){
    fetch("https://dummyjson.com/recipes/search?q="+searchFoodName).
    then(result=>result.json()).
    then(result=>{
    let foodDetails = result.recipes;
    let item = 0;
    
    let foodItem = document.getElementById('foodlist');
    foodItem.innerHTML = "";
    let totalFooditem = foodDetails.length < 3 ?  foodDetails.length : foodDetails.length/4;

    for(let row=1;row<=totalFooditem+1;row++){
        let rowDiv =  document.createElement('div');
        rowDiv.classList.add('row');
        rowDiv.classList.add('mb-5');
        rowDiv.id="foodRow"+row;

        for(let column=0;column<4;column++){
            if(item == foodDetails.length) break;
            const colDiv = document.createElement('div');
            rowDiv.id="foodRowCol"+row+column;
            colDiv.classList.add('col-3');
            colDiv.classList.add('text-center');
            colDiv.innerHTML = `<h6 class="text-primary" id="foodName${row}${column}">${foodDetails[item].name}</h6>
            <p class="mt-0 text-danger" id="rating${row}${column}">${foodDetails[item].rating}</p>
            <div class="text-center mb-2">       
            <img id="image${row}${column}" class="rounded" src="${foodDetails[item].image}" width="100px" height="100px"/></br>
            <span class="text-danger" id="cost${row}${column}" style="font-size: 14px;" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="0.7em" style="fill: blue">
                <path d="M308 96c6.6 0 12-5.4 12-12V44c0-6.6-5.4-12-12-12H12C5.4 32 0 37.4 0 44v44.7c0 6.6 5.4 12 12 12h85.3c27.3 0 48.3 10 61 27.3H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h158.8c-6.2 36.1-33 58.6-74.8 58.6H12c-6.6 0-12 5.4-12 12v53c0 3.3 1.4 6.5 3.9 8.8l165.1 152.4a12 12 0 0 0 8.1 3.2h82.6c10.9 0 16.2-13.4 8.1-20.8L116.9 319.9c76.5-2.3 131.1-53.4 138.3-127.9H308c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-58.7c-3.5-11.5-8.3-22.2-14.3-32H308z"/></svg>
                ${foodDetails[item].caloriesPerServing}</span>
            </div> 
            <p class="text-info" id="msg${foodDetails[item].id}" style="font-size: 12px;"></p>
            <button type="button" class="btn btn-primary btn-sm" onclick="addToCart(\'${foodDetails[item].id - 1}\')">Add to Cart</button>
                         `;
            rowDiv.appendChild(colDiv);
            item++;
        }
        foodItem.appendChild(rowDiv);
    }
    }).
    catch(error=>console.error("Error fetching food details:", error));
}

function addToCart(foodid) {
    cart = [];
    if(window.localStorage.getItem('cartItems') != null){
        let items = JSON.parse(window.localStorage.getItem('cartItems'));
        for(i=0;i<items.length;i++){
            cart.push(items[i]);
        }
    }
    cart.push(foodDetailsInformation[foodid]);
    document.getElementById("cartCount").setAttribute("value",cart.length);
    document.getElementById(`msg${parseInt(foodid)+1}`).innerHTML = "Added To Cart";
    window.localStorage.setItem('cartCount', cart.length);
    window.localStorage.setItem('cartItems', JSON.stringify(cart));

}