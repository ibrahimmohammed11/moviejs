/*-----------------------------API---------------------------------*/
var movies=[];
getMovie("now_playing");
links=document.getElementsByClassName("text-decoration-none");
for(var i=0;i<links.length;i++)
{
    links[i].addEventListener("click",function(e){
        var currentType=e.target.text;
        getMovie(currentType);
    })
}
async function getMovie(moveType)
{
    let apiResponse= await fetch(`https://api.themoviedb.org/3/movie/${moveType}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&page=1`)
    let neww=await apiResponse.json()
    movies=neww.results
    displayMovies()
}

function displayMovies()
{   cols=``;
    for(var i=0;i<movies.length;i++)
    {
        cols+=`
        <div class="col-lg-3 col-md-4 col-sm-6 col-12 my-3">
            <div class="original">
                <img src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path}" class="w-100">
                <div class="text-center p-2 movetitle py-3">
                    <h4 class="movieT">${movies[i].original_title}</h4>
                    <p class="movieO">${movies[i].overview.slice(0,130)}....</p>
                    <p><strong>Rate:</strong> <i class="fas fa-star"></i> ${movies[i].vote_average}</p>
                    <p><strong>Release Date:</strong> ${movies[i].release_date}</p>
                </div>
            </div>
        </div>
        `
    }
    $("#movies").html(cols);
}

$(".link4").click(function(){
    getTrending();
})
async function getTrending()
{
let apiResponse= await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
let neww=await apiResponse.json()
movies=neww.results
displayMovies()
}

/*-----------------------------API---------------------------------*/
/*-----------------------------search---------------------------------*/
$("#search").keyup(function()
{
    search(this.value)
});
function search(searchTxt){ 
    var trs="";
    for(var i=0;i<movies.length;i++)
    {
        if(movies[i].original_title.toLowerCase().includes(searchTxt.toLowerCase()))
        {
            trs+=`
            <div class="col-lg-3 col-md-4 col-sm-6 col-12 my-3">
            <div class="original">
                <img src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path}" class="w-100">
                <div class="text-center p-2 movetitle py-3">
                    <h4 class="mt-5">${movies[i].original_title}</h4>
                    <p>${movies[i].overview.slice(0,130)}....</p>
                    <p><strong>Rate:</strong> <i class="fas fa-star"></i> ${movies[i].vote_average}</p>
                    <p><strong>Release Date:</strong> ${movies[i].release_date}</p>
                </div>
            </div>
        </div>
        `
        }
    } 
    $("#movies").html(trs);     
}

/*-----------------------------search---------------------------------*/
let newMovies=[];

async function searchApi(searchText){ 
    let apiResponse= await fetch(`https://api.themoviedb.org/3/search/movie?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&query=${searchText}&page=1&include_adult=false`)
    let neww=await apiResponse.json()
    newMovies=neww.results
    var trs="";
    for(var i=0;i<newMovies.length;i++)
    {
        if(newMovies[i].original_title.toLowerCase().includes(searchText.toLowerCase()))
        {
            trs+=`
            <div class="col-lg-3 col-md-4 col-sm-6 col-12 my-3">
            <div class="original">
                <img src="https://image.tmdb.org/t/p/w500/${newMovies[i].poster_path}" class="w-100">
                <div class="text-center p-2 movetitle py-3">
                    <h4 class="mt-5">${newMovies[i].original_title}</h4>
                    <p>${newMovies[i].overview.slice(0,130)}....</p>
                    <p><strong>Rate:</strong> <i class="fas fa-star"></i> ${newMovies[i].vote_average}</p>
                    <p><strong>Release Date:</strong> ${newMovies[i].release_date}</p>
                </div>
            </div>
        </div>
        `
        }
    } 
    $("#movies").html(trs);     
}
$("#search11").keyup(function()
{
    if(this.value=="")
    {
        displayMovies()  
    }
    
    else
    {
        searchApi(this.value)
    }
});
function resetInputs()
{   
    $("#search").val("")
    $("#search11").val("")
};

/*--------------------------Side Bar------------------------------*/
$("#open").click(function(){
    let left=$(".openbar").css("left");
    let move=$(".sidebar").innerWidth();
    resetInputs()
    if(left=="-250px")
    {
        $(".openbar").animate({"left":"0"},600)
        $("#open").addClass("fa-times")
        $(".link1").animate({"opacity":"1","top":"20px"},600)
        $(".link2").animate({"opacity":"1","top":"28px"},700)
        $(".link3").animate({"opacity":"1","top":"36px"},800)
        $(".link4").animate({"opacity":"1","top":"44px"},900)
        $(".link5").animate({"opacity":"1","top":"52px"},1000)
        $(".link6").animate({"opacity":"1","top":"60px"},1100)
    }
    else
    {
        $(".openbar").animate({"left":-move},600)
        $("#open").removeClass("fa-times")
        $(".link6").animate({"opacity":"0","top":"400px"},600)
        $(".link5").animate({"opacity":"0","top":"400px"},700)
        $(".link4").animate({"opacity":"0","top":"400px"},800)
        $(".link3").animate({"opacity":"0","top":"400px"},900)
        $(".link2").animate({"opacity":"0","top":"400px"},1000)
        $(".link1").animate({"opacity":"0","top":"400px"},1100)  
    }
})
$(".link6").click(function(){
    let secOffset=$("#contact").offset().top;
    $("body,html").animate({scrollTop:secOffset},1000)
})
/*--------------------------Side Bar------------------------------*/

/*--------------------------inputs validation------------------------------*/
let nameInput=document.getElementById("name");
let emailInput=document.getElementById("email");
let ageInput=document.getElementById("age");
let phoneInput=document.getElementById("phone");
let passInput=document.getElementById("pass");
let repassInput=document.getElementById("repass");
let submitBtn=document.getElementById("submitBtn");

nameInput.onkeyup=function()
{
    var nameRegex=/^[A-Z][a-z]{2,10}$/;
    if(!nameRegex.test(nameInput.value))
    {
        submitBtn.disabled="true";
        $("#error1").html("Your Name is Not Valid (it must start with a capital letter)")   
    }
    else
    {
        submitBtn.removeAttribute("disabled");
        $("#error1").html("")
    };
};

emailInput.onkeyup=function()
{
    var emailRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;  
    if (!emailRegex.test(emailInput.value)) 
    {
        submitBtn.disabled="true";
        $("#error2").html("Entre Valid Email") 
    }
    else 
    {
        submitBtn.removeAttribute("disabled");
        $("#error2").html("")
    }
};

phoneInput.onkeyup=function()
{
    var phoneRegex=/^(02)?(010|011|012|015)[0-9]{8}$/;
    if(!phoneRegex.test(phoneInput.value))
    {
        submitBtn.disabled="true";
        $("#error3").html("Entre Valid Phone Number (11 numbers)")
    }
    else
    {
        submitBtn.removeAttribute("disabled");
        $("#error3").html("")
    };
};

ageInput.onkeyup=function()
{
    var ageRegex=/^([2-7][0-9]|80)$/;
    if(!ageRegex.test(ageInput.value))
    {
        submitBtn.disabled="true";
        $("#error4").html("Entre Valid Age From 20 To 80")
    }
    else
    {
        submitBtn.removeAttribute("disabled");
        $("#error4").html("")
    };
};

passInput.onkeyup=function()
{
    var passRegex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passRegex.test(passInput.value)) 
    {
        submitBtn.disabled="true";
        $("#error5").html("entre valid password *Minimum eight characters, at least one letter and one number:*")
    }
    else 
    {
        submitBtn.removeAttribute("disabled");
        $("#error5").html("")
    }
};

repassInput.onkeyup=function()
{   
    if (repassInput.value != passInput.value) 
    {
        $("#error6").html("Entre Valid Repassword")
    }
    else
    {
        $("#error6").html("")
    }

};
/*--------------------------inputs validation------------------------------*/

/*--------------------------typing------------------------------*/
var typed = new Typed('.element', {
    strings: ['Amazing Movies Website', 'With Complete Search about Your Favourite Movie'],
    loop: true,
    typeSpeed: 100,
    backSpeed: 100,
    showCursor: false,
  });

/*--------------------------typing------------------------------*/
/* loading screen  */
$(document).ready(function(){
  $("#loading").fadeOut(2500,function(){
    $("body").css("overflow","visible")
  })
})
/* loading screen  */