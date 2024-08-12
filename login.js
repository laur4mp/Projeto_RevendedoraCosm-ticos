const firebaseConfig = {
    apiKey: "AIzaSyDakfOgFCtkRgLmirEJOkE9f6iIx8y82vU",
     authDomain: "controleestoque-13c2c.firebaseapp.com",
     projectId: "controleestoque-13c2c",
     storageBucket: "controleestoque-13c2c.appspot.com",
     messagingSenderId: "349534800522",
     appId: "1:349534800522:web:7e1d28ecc508d59417bb73",
  measurementId: "G-Y9QJZ1BDB4"
 };
 firebase.initializeApp(firebaseConfig);
 const auth = firebase.auth();
 const db = firebase.firestore();

 document.getElementById('loginUserComum').addEventListener('click', ()=>{
    window.location.href = 'userComum/userComum.html';
 })

 document.getElementById('entrarConta').addEventListener('click', () => {
     let email = document.getElementById('email').value;
     let senha = document.getElementById('senha').value;

     auth.signInWithEmailAndPassword(email, senha)
         .then((userCredential) => {
            window.alert('Login realizado com sucesso! Você será redirecionado.');
             window.location.href = 'admin/admin.html';   
         })
         .catch((error) => {
             alert('Erro ao logar: ' + error.message);
         });
 });
