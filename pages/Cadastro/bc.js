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

function cadastrar(){
    const nome = document.getElementById("nome").value;
    const id = document.getElementById("id").value;
    const valor = document.getElementById("valor").value;
    const desc = document.getElementById("desc").value;
    const foto = document.getElementById("foto").files[0];

    //upload da foto
    const storageref=firebase.storage().ref();
    const fotoref = storageref.child(`images/${nome}`)

    fotoref.put(foto).then(snapshot => {
        return snapshot.ref.getDownloadURL();
    }).then(fotoURL =>{
        db.collection("Jogos").doc(id).set({
            desc: desc,
            valor: valor,
            foto: nome,
            nome: nome,
            id: id
        })
    })
    alert("Produto cadastrado")
}