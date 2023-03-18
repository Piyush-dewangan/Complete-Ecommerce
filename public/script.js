//display area
let da=document.getElementById("container");

takeProductData();
function takeProductData()
{
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/productData", true);
    xhttp.send();
    xhttp.addEventListener("load",function(){
        let resp=xhttp.response;
        let products=JSON.parse(resp);
        console.log(products);
        console.log(typeof products);
        displayProducts(products);
    })
}
function displayProducts(products){
   
    for(let i=0;i<5;i++)
    {
        let card=document.createElement('div');
        let image=document.createElement('img');
        let pn=document.createElement('h5');
        let btn=document.createElement('button');
        //putting css
        card.style.width="18rem";
        card.setAttribute("style","border:1px solid grey;");
        card.style.margin="2rem 2rem 2rem 2rem";
        card.style.borderRadius = "25px";
        image.src="/img.jpg";
        pn.innerText=products[i].name;
        btn.setAttribute('class','btn btn-warning');
        btn.innerText="Details"
        btn.addEventListener("click",()=>{
            console.log("detail are :",products[i]);
            showdetail(products[i]);
        });
        //adding to dom
        card.appendChild(image);
        card.appendChild(pn);
        card.appendChild(btn);
        da.appendChild(card);
        
    }
}
function showdetail(product)
{
    console.log(product);
    let descriptionBox=document.createElement('div');
    let cbtn=document.createElement('button');
    descriptionBox.innerHTML=product.description;
    // descriptionBox.setAttribute("position","absolute");
    cbtn.addEventListener('click',()=>{
        descriptionBox.remove();
    })
    cbtn.innerHTML="close";
    cbtn.setAttribute('class','btn btn-danger');
    
    descriptionBox.style.backgroundColor="blue";
    descriptionBox.style.position="absolute";
    descriptionBox.style.left="20%";
    descriptionBox.style.right="20%";
    descriptionBox.style.top="20%";
    descriptionBox.style.bottom="20%";
    descriptionBox.appendChild(cbtn);
    da.appendChild(descriptionBox);
}