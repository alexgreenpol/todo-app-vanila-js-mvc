import { firebaseConfig } from '../config/firebaseConfig';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import { EventEmitter } from './event-emmiter';

class DataBase extends EventEmitter {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.firebase = firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();
  }

	async getData(name_db) {
		const cityRef = this.db.collection(name_db);
    const docs = await cityRef.get();
    
		const result = [];
		docs.forEach(doc => {
      const data = doc.data();
      data.id = doc.id;
			result.push(data);
		});
		return result;
  }
  
  setData(name_db, name_doc, value) {
    this.db.collection(name_db).doc(name_doc).set(value);
    this.emit('New data was added', value);
  }

  updateData(name_db, name_doc, value) {
    this.db.collection(name_db).doc(name_doc).update(value)
    this.db.collection(name_db).onSnapshot((querySnapshot) => {
      this.emit('Data was changed');
    });
  }

  deleteData(name_db, name_doc) {
    this.db.collection(name_db).doc(name_doc).delete();
    this.db.collection(name_db).onSnapshot((querySnapshot) => {
      this.emit('Data was changed');
    });
  }
}

export default new DataBase();