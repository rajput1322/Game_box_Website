const text = "Welcome to our Project         ";

let index = 0;
function writeText() {
    document.getElementById("automatic").innerText=text.slice(0,index);
    index++;

    if(index>text.length){
        index = 0;
    }
}
setInterval(writeText,100);
// clearInterval(handle);
handle=0;