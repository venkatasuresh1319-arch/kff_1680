// INITIAL QUANTITY VALUES

let quantities = {
poori:1,
chapathi:1,
ragi:1,
jonna:1,
paratha:1
}


// INCREASE QUANTITY

function increaseQty(id){

if(quantities[id] < 5){

quantities[id]++

document.getElementById(id+"-qty").innerText = quantities[id]

}

else{

alert("Maximum 5 packets allowed")

}

}


// DECREASE QUANTITY

function decreaseQty(id){

if(quantities[id] > 1){

quantities[id]--

document.getElementById(id+"-qty").innerText = quantities[id]

}

}


// ADD PRODUCT TO CART

function addToCart(name,price,id){

let qty = quantities[id]

let cart = JSON.parse(localStorage.getItem("cart") || "[]")

cart.push({
name:name,
price:price,
qty:qty
})

localStorage.setItem("cart",JSON.stringify(cart))

alert(qty + " packets added to cart")

}


// LOAD CART PAGE

function loadCart(){

let cart = JSON.parse(localStorage.getItem("cart") || "[]")

let div = document.getElementById("cartItems")

let total = 0

if(!div) return

div.innerHTML = ""

cart.forEach((item,index)=>{

let itemTotal = item.price * item.qty

div.innerHTML +=
item.name+" x "+item.qty+" = ₹"+itemTotal+
" <button onclick='removeItem("+index+")'>Remove</button><br><br>"

total += itemTotal

})

document.getElementById("total").innerText = total

}


// REMOVE SINGLE ITEM

function removeItem(index){

let cart = JSON.parse(localStorage.getItem("cart") || "[]")

cart.splice(index,1)

localStorage.setItem("cart",JSON.stringify(cart))

loadCart()

}


// CLEAR CART

function clearCart(){

localStorage.removeItem("cart")

alert("Cart cleared")

location.reload()

}


// PLACE ORDER → WHATSAPP

function placeOrder(){

let cart = JSON.parse(localStorage.getItem("cart") || "[]")

if(cart.length==0){

alert("Cart is empty")

return

}

let name = document.getElementById("name").value
let mobile = document.getElementById("mobile").value
let village = document.getElementById("village").value

if(name=="" || mobile=="" || village==""){

alert("Please fill customer details")

return

}

let items = ""
let total = 0

cart.forEach(item=>{

let itemTotal = item.price * item.qty

items += item.name+" x "+item.qty+" = ₹"+itemTotal+"%0A"

total += itemTotal

})

let message =
"Order from Karthik Fresh Foods%0A%0A"+
"Customer Name: "+name+"%0A"+
"Mobile: "+mobile+"%0A"+
"Village: "+village+"%0A%0A"+
"Items:%0A"+items+
"%0ATotal: ₹"+total

let phone = "9390206546"

let url = "https://wa.me/91"+phone+"?text="+message

window.open(url,"_blank")

}