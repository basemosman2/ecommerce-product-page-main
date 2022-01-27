
// Big Product image 
const bigProductImg = document.querySelector('.imgProductContainer img');
const overlayBigProductImg = document.querySelector('.bigImagSelected img');

// over layer Container
const overlayer = document.querySelector('.overlayer-img');

// close icon for over layer container
const closeOverlayer = document.querySelector('.closeIcon img');

// thumbnail img group
const nailImgs = document.querySelectorAll('.thumbnailImg-box img');
const overlayNailImgs = document.querySelectorAll('.overlayThumbnailImg-box img');

// slide previous and next icon 
const previousIcon = document.querySelector('.previousIcon');
const nextIcon = document.querySelector('.nextIcon');

const mainPreviousIcon = document.querySelector('#mainPreviousIcon img');
const mainNextIcon = document.querySelector('#mainNextIcon img');


// decrease and increase a product item 
const decItem = document.querySelector('.decreaseItem');
const incItem = document.querySelector('.increaseItem');

// number of items add to cart 
const itemNo = document.querySelector('.itemNo');

// add to cart
const addToCart = document.querySelector('.addToCart');

// number of items in cart 
const cartItemNum = document.querySelector('.cartItemNum');

const cartItems = document.querySelector('.cartItems-box');

// cart icon 
const cartIconBox = document.querySelector('.cartIcon-box');

// cart container 
const cartBox = document.querySelector('.cart-box');

const menuClose = document.querySelector('.menuClose');

const navbar = document.querySelector('.navbar');

const menuIcon = document.querySelector('.menuIcon');




bigProductImg.addEventListener('click',(e)=>{
    overlayer.classList.add('active');
    
    let selectedImg = e.target.getAttribute('src');
    overlayBigProductImg.setAttribute('src', selectedImg);

    let selectedThumbnail = selectedImg.slice(0,selectedImg.indexOf('.jpg'))+'-thumbnail.jpg';

    overlayNailImgs.forEach(img => {
        img.parentElement.classList.remove('active');
        let src = img.getAttribute('src');

        if (src == selectedThumbnail) {
            img.parentElement.classList.add('active');
        }
    });

    activethumbnailImg(overlayNailImgs,overlayBigProductImg);

});

closeOverlayer.addEventListener('click',()=>{
    overlayer.classList.remove('active');
});

activethumbnailImg(nailImgs,bigProductImg);


function activethumbnailImg(thumbnailImgs,mainProductImg){

    thumbnailImgs.forEach((img)=>{
        img.addEventListener('click',(e)=>{
            thumbnailImgs.forEach((img)=>{
                img.parentElement.classList.remove('active');
            });
            let imgName = `images/image-${e.target.dataset.name}.jpg`;
            mainProductImg.setAttribute('src',imgName);
            e.target.parentElement.classList.add('active');
        });
    });
}

let bigImgsArr = ['images/image-product-1.jpg','images/image-product-2.jpg','images/image-product-3.jpg','images/image-product-4.jpg']


mainPreviousIcon.addEventListener('click',()=>{
    mainSlideShow(-1);
});

mainNextIcon.addEventListener('click',()=>{
    mainSlideShow(1);
});

function mainSlideShow(dir){
    let src = bigProductImg.getAttribute('src');
    let imgNum = bigImgsArr.indexOf(src) + dir;
    if (imgNum <= -1) imgNum = 3;
    if (imgNum >= 4) imgNum = 0;
    bigProductImg.setAttribute('src',bigImgsArr[imgNum]);
}


previousIcon.addEventListener('click',()=>{
    slideshow(-1);
});

nextIcon.addEventListener('click',()=>{
    slideshow(1);
});

function slideshow(dir){
    let src = overlayBigProductImg.getAttribute('src');
    let imgNum = bigImgsArr.indexOf(src) + dir;
    if (imgNum <= -1) imgNum = 3;
    if (imgNum >= 4) imgNum = 0;
    overlayBigProductImg.setAttribute('src',bigImgsArr[imgNum]);
    for (let i = 0; i < overlayNailImgs.length; i++) {
        let element = overlayNailImgs[i];
        element.parentElement.classList.remove('active');
        if (i == imgNum) {
            element.parentElement.classList.add('active');
        }
    }
}

decItem.addEventListener('click',()=>{
    if(+itemNo.innerHTML >=2) return itemNo.innerHTML = +itemNo.innerHTML - 1; 
});

incItem.addEventListener('click',()=>{
    itemNo.innerHTML = +itemNo.innerHTML + 1; 
});


addToCart.addEventListener('click',()=>{
    let numOfItem = parseInt(itemNo.innerHTML);
    let itemName = 'Fall Limited Edition Sneakers';
    let itemPrice = 125;
    cartItemComponent(itemName,itemPrice,numOfItem);

    addToCart.classList.add('active');

    let timeend = setTimeout(()=>{
        addToCart.classList.remove('active');
    },2500);

});

function cartItemComponent(name,price,qty){
    cartItems.innerHTML = "";

    const checkOutBtn = document.createElement('button');
    checkOutBtn.innerText = 'Checkout';

    const productItemBox = document.createElement('div');
    productItemBox.classList.add('productItemBox');

    const itemImg = document.createElement('img');
    itemImg.src = 'images/image-product-1-thumbnail.jpg';

    const itemDeleteIcon = document.createElement('img');
    itemDeleteIcon.classList.add('deleteItem');
    itemDeleteIcon.src = 'images/icon-delete.svg';
    if (itemDeleteIcon) {
        itemDeleteIcon.addEventListener('click',()=>{
            cartItems.innerHTML = "";
            const emptyCartSpan = document.createElement('span');
            emptyCartSpan.innerHTML ='Your Cart is empty';
            emptyCartSpan.classList.add('emptyCart');
            cartItems.append(emptyCartSpan);
            cartItemNum.innerText = '';
        });
    }

    const itemContent = document.createElement('div');
    itemContent.classList.add('cartItemContent');

    const itemName = document.createElement('h2');
    itemName.innerText = name;
    const itemPrice = document.createElement('span');
    itemPrice.innerText = `$${price}.00`;
    const itemX = document.createElement('span');
    itemX.innerText = 'x';
    const itemCount = document.createElement('span');
    itemCount.innerText = qty;
    const itemTotalPrice = document.createElement('span');
    itemTotalPrice.innerText = `$${price * qty}.00`;

    cartItemNum.innerText = qty;

    itemContent.append(itemName,itemPrice,itemX,itemCount,itemTotalPrice);

    productItemBox.append(itemImg,itemContent,itemDeleteIcon);

    cartItems.append(productItemBox,checkOutBtn);
    
}

cartIconBox.addEventListener('click',()=>{
    cartBox.classList.toggle('active');
});

menuClose.addEventListener('click',()=>{
    navbar.style.display = 'none';
});

menuIcon.addEventListener('click',()=>{
    navbar.style.display = 'block';
});





