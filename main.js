 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
 import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcym1i4oAyM2rFmBU_Ipa0vcC7Pdz0dws",
  authDomain: "insan-cemerlang-2e18f.firebaseapp.com",
  projectId: "insan-cemerlang-2e18f",
  storageBucket: "insan-cemerlang-2e18f.appspot.com",
  messagingSenderId: "1096016420480",
  appId: "1:1096016420480:web:87611389fc765e7ddbd065",
  measurementId: "G-DW23S2DXCR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarabsensi() {
  const refDokumen = collection(db,"absensi");
  const kuery = query(refDokumen,orderBy("nama"));
  const cuplikankuery = await getDocs(kuery);
  
  let hasil = [];
  cuplikankuery.forEach((dok) => {
      hasil.push({ 
     id:dok.id, 
      tanggal: dok.data().tanggal,
      nis:dok.data().nis,
      nama: dok.data().nama,
      alamat:dok.data().alamat,
      noTlpon:dok.data(). noTlpon,
      kelas:dok.data().kelas,
      keterangan:dok.data(). keterangan

      });
  });
  
  return hasil;
}
export function formatangka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export async function tambahdatasiswa(tanggal, nis, nama,alamat, noTlpon,kelas, keterangan) {
  try {
    const dokRef = await addDoc(collection(db,'absensi'),{
   tanggal: tanggal,
   nis: nis,
   nama: nama,
   alamat: alamat,
   notlpon: noTlpon, 
   kelas: kelas,
   keterangan: keterangan
    });
    console.log('berhasil menambah data siswa'+ dok )
  } catch (e) {
  console.log('Gagal menambah daftar data siswa' + e);
  }
}

export async function hapusabsensi (docId) {
  await deleteDoc(doc(db,"absensi-siswa",docId));
}

export async function ubahdatasiswa(docId, nama, harga, stok) {
  await updateDoc(doc(db, "absensi-siswa", docId), {
    nama: nama,
    harga: harga, 
    stok: stok
  });
}

export async function ambildatasiswa(docId) {
  const docRef = await doc(db, "absensi-siswa", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}
