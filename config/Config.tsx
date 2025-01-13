import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDUFcXTYyNdKPaLUUGHzhZgrQIqZ8tnAdo",
  authDomain: "app-login-11295.firebaseapp.com",
  projectId: "app-login-11295",
  storageBucket: "app-login-11295.firebasestorage.app",
  messagingSenderId: "705452157138",
  appId: "1:705452157138:web:b8a78ff34e48ec1151250b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth( app )