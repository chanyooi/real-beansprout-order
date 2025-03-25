// Firebase 설정 및 초기화
const firebaseConfig = {
  apiKey: "AIzaSyA32Y4SLuV7HjEbHchvwbQFLGwKAT5xL74",
  authDomain: "beansprouts-order-prod.firebaseapp.com",
  projectId: "beansprouts-order-prod",
  storageBucket: "beansprouts-order-prod.firebasestorage.app",
  messagingSenderId: "824344900469",
  appId: "1:824344900469:web:82da5fe097001e7432593c"
};

// Firebase 앱 초기화
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
