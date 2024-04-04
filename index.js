firebase.auth().onAuthStateChanged(user => {
    if (user) {
        document.getElementById("a").innerHTML=user.email;
        var link = document.getElementById("a");
        link.getAttribute("href");
        link.setAttribute("href",
            "pages/User/user.html");
        console.log(user)
    }else{
        document.getElementById("a").innerHTML="Iniciar Sessão";
    }
})
