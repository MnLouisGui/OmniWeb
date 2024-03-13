function login() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(() => {
        hideLoading();
        window.location.href = "././index.html";
    }).catch(error => {
        hideLoading();
        alert('N');
    });
}

const form = {
    email: () => document.getElementById("email"),
    password: () => document.getElementById("password")
}