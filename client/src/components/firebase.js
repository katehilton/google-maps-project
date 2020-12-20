import firebase from 'firebase';
import firebaseConfig from './firebaseConfig.json';

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export default database;