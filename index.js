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

var ndoc=0;
//Contador de Docs
db.collection('metadata').doc('stats').get().then(function (doc){
    if (doc.exists) {
        const dados=doc.data().document_count
        console.log(doc.data)
        console.log(dados);
        ndoc=dados;
    }
    var ii=0;
    var oc=1;
    for (var i; ii<ndoc ;i++) {
        ii++;
        var id = ii;
        console.log(ii);
        const produto = document.createElement("a");
        produto.classList.add('produto');
        produto.onclick = function() {
            pgproduto(oc++);
        };
        db.collection("Jogos").doc(""+id).get().then(function (doc){
            if (doc.exists) {
                console.log("Document data:", doc.data());
                const dados=doc.data();
                
                const div = document.getElementById("tt");

                const photoPath = `images/${dados.nome}.jpeg`;
                var photoRef = storage.ref(photoPath);
                photoRef.getDownloadURL(photoRef).then((url) => {
                    console.log(url);
                    const img = document.createElement("img");
                    img.src = url;
                    img.style.width="20rem";
                    img.style.height="10rem";
                    img.style.margin="5px";

                    produto.appendChild(img);
                }).catch((error)=>{
                    console.log(error)
                });
                const infor = document.createElement("div");
                infor.classList.add('infor');
                infor.innerHTML += `
                    <h3>${dados.nome}<h3>
                    <h3>R$${(parseFloat(dados.valor)).toFixed(2)}<h3>
                `;
                produto.appendChild(infor); 
                div.appendChild(produto);
            }else{
                alert("Esse documento não existe: "+ndoc);
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
});
var id_escolhido;
function pgproduto(id){
    id_escolhido=id;
    window.location.replace("pages/Produtos/produto.html");
}