import * as fbApp from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAvQQq1-QO5zPut6_Xy0o4tE5zkRlqZhmw",
    authDomain: "dacn-fastfoodapp.firebaseapp.com",
    projectId: "dacn-fastfoodapp",
    storageBucket: "dacn-fastfoodapp.appspot.com",
    databaseURL:'https://dacn-fastfoodapp-default-rtdb.firebaseio.com',
    messagingSenderId: "318228861718",
    appId: "1:318228861718:web:bb69028cf1daa01649b637",
    measurementId: "G-4YZN294F3Y"
  };
  // Initialize Firebase
  export const firebaseApp =  fbApp.initializeApp(firebaseConfig);
