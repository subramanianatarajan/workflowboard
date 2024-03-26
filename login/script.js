const firebaseConfig = {
    apiKey: "AIzaSyCERVMUoJm4qK109i62fMp2Ne0xii9XeUA",
    authDomain: "projectp3-62021.firebaseapp.com",
    projectId: "projectp3-62021",
    storageBucket: "projectp3-62021.appspot.com",
    messagingSenderId: "412026021806",
    appId: "1:412026021806:web:492668ead3cce518800a3f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const login = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Logged in successfully
            const user = userCredential.user;
            window.location.href = '/index.html'; 
        })
        .catch((error) => {
            const errorCode = error.code;
            alert('Invalid username or password. Please try again or sign up.');
        });
};

const signup = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Sign up successful
            const user = userCredential.user;
            alert('Sign up successful! Please login with your new credentials.');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('Username already exists. Please choose a different username.');
        });
};