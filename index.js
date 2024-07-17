firebase.auth().onAuthStateChanged(user => {
    if (user) {
        var name=user.email;
        name = name.toString();
        name = name.replace("@gmail.com", "");
        document.getElementById("a").innerHTML=name;
        var link = document.getElementById("a");
        link.getAttribute("href");
        link.setAttribute("href",
            "pages/User/user.html");
        console.log(user)
    }else{
        document.getElementById("a").innerHTML="Iniciar Sessão";
    }
})
