
// Get the value of an em in pixels cause ChartJS cant take em argument 
var em;
function getValue(id){
    var div = document.getElementById(id);
    div.style.height = '1vw';
    em = div.offsetHeight;
}
getValue('div')
// Determine if the screen is mobile, based on the viewport width
var mobile=false
if (em <=8){
	mobile=true
}

export default {'em':em, 'mobile':mobile};