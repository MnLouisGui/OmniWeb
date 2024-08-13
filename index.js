const firebaseConfig = {
  apiKey: "AIzaSyDJPY2liWzFfGVHa-KFDTQVlLX0bB2sciA",
  authDomain: "login-ce4de.firebaseapp.com",
  projectId: "login-ce4de",
  storageBucket: "login-ce4de.appspot.com",
  messagingSenderId: "1079447080702",
  appId: "1:1079447080702:web:11c63936eb02a4fc105faf"
};
firebase.initializeApp(firebaseConfig);

//Tabelas
const db = firebase.firestore();
const storage = firebase.storage();

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
