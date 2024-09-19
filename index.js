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
        console.log(user.email)
        if (user.email == "admin@gmail.com"){
            document.getElementById("admin").innerHTML="Admin";
            var link = document.getElementById("admin");
            link.getAttribute("href");
            link.setAttribute("href",
                "pages/Cadastro/bc.html");
            console.log(user)
        }
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

//Contador de Docs
db.collection('metadata').doc('stats').set({
    count: 23
});
const nodocs = true;

for (let i = 23; nodocs==false; i++) {
    var id = i;
    console.log(id);

    db.collection("Jogos").doc(""+id).get().then(function (doc){
        if (doc.exists) {
            console.log("Document data:", doc.data());
            const dados=doc.data();
    
            const nome = document.getElementById("nome").innerHTML = dados.nome;
            console.log(dados.nome)
            const valor = document.getElementById("valor").innerHTML = `R$: ${dados.valor}`;
            document.getElementById("valor").style.fontSize="100%"
            document.getElementById("nome").style.fontSize="100%"
    
            const photoPath = `images/${dados.nome}.jpeg`;
            var photoRef = storage.ref(photoPath);
            photoRef.getDownloadURL(photoRef).then((url) => {
                console.log(url)
                const img = document.getElementById("produto_img");
                img.src = url;
                img.style.width="40%";
                img.style.height="20%";
                
            }).catch((error)=>{
                console.log(error)
            });
    
        }else{
            alert("Esse documento não existe");
            nodocs=false;
            return;
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}