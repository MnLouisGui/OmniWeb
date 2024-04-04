firebase.auth().onAuthStateChanged(user => {
    if (user) {
        document.getElementById("a").innerHTML="Logado";
        var link = document.getElementById("a");
        link.getAttribute("href");
        link.setAttribute("href",
            "pages/User/user.html");
    }else{
        document.getElementById("a").innerHTML="Iniciar Secção";
        var link = document.querySelector("a");
        link.getAttribute("href");
        link.setAttribute("href",
            "pages/Login/login.html");
    }
})
