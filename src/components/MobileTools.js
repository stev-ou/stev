import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

// Use the media query to determine if the viewing window is mobile
const media = true;
const media => (
<MediaQuery minDeviceWidth={700}>
  {(matches) => {
    if (matches) {
      console.log(matches)
    } else {
      console.log(matches)
    }
  }}
</MediaQuery>)

// Get the value of an em in pixels cause ChartJS cant take em argument 
var em;
function getValue(id){
    var div = document.getElementById(id);
    div.style.height = '1vw';
    em = div.offsetHeight;
}
getValue('div')

export default {'em':em, 'mobile':!media};