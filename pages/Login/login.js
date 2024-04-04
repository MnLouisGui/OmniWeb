firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "../../index.html";
    }
})

function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordErrors();
}

function login() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(() => {
        hideLoading();
        window.location.href = "../../index.html";
    }).catch(error => {
        hideLoading();
        console.log(error)
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if (error.code == "auth/invalid-credential") {
        return "Usuário nao encontrado";
    }if (error.code == "auth/invalid-email") {
        return "Email Inválido";
    }if(error.code =="auth/missing-password"){
        return "Digite uma senha";
    }
    if (error.code == "auth/email-already-in-use") {
        return "Email já está em uso";
    }
    if (error.code == "auth/weak-password") {
        return "Senha precisa de 6 caracteres";
    }
    return error.message;
}

function register() {
    const email = form.emailReg().value;
    const password = form.passwordReg().value;
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then(() => {
        hideLoading();
        window.location.href = "../../index.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
}

function recoverPassword() {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.emailRec().value).then(() => {
        hideLoading();
        alert('Email enviado com sucesso');
    }).catch(error => {
        hideLoading();
        alert("Usuário não encontrado");
    });
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPasswordButton().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    return form.password().value ? true : false;
}

const form = {
    email: () => document.getElementById("email"),
    emailRec: () => document.getElementById("emailRec"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPasswordButton: () => document.getElementById("recover-password-button"),

    emailReg: () => document.getElementById('emailReg'),
    passwordReg: () => document.getElementById('passwordReg')
} 