import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBhVGqqWeq0FGyXH3qt8jmiv-tFWmJM6xw",
    authDomain: "react-crud-220d6.firebaseapp.com",
    databaseURL: "https://react-crud-220d6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-crud-220d6",
    storageBucket: "react-crud-220d6.appspot.com",
    messagingSenderId: "403669312774",
    appId: "1:403669312774:web:6a4fca7a2d5982affa6a87"
};
// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();