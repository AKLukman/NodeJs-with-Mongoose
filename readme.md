<!--Onek gulu data ekshate update korle data patanur format -->

{

"ids":[ "638798626e5cc210ec6d02c5","63879ac79e77cd229c5a406e"],
"data":{"price":120}

}

<!-- Onek data update korbo but different different value dia -->

{
"ids":[
{
"id":"638798626e5cc210ec6d02c5",
"data":{
"price":300
}
},
{
"id":"63879ac79e77cd229c5a406e",
"data":{
"price":295
}
}
]
}

<!-- Advanced filtering -->
<!-- - dia dile oita bad dia baki sob dekhabe -->

http://localhost:5000/api/v1/product?sort=-price,quantity&fields=name,price,-\_id

<!-- Mongodb operator handle from client side -->

http://localhost:5000/api/v1/product?price[gt]=100
