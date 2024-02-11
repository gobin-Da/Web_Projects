document.querySelectorAll(".msc")[0].addEventListener("click" , function(){
    var text = this.innerHTML;
    console.log(text);

    var audio = new Audio('r1.aac');
    audio.play();

}); 



