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

export async function ambilDaftarProduk() {
  const refDokumen = collection(db,"produk");
  const kuery = query(refDokumen,orderBy("nama"));
  const cuplikankuery = await getDocs(kuery);
  
  let hasil = [];
  cuplikankuery.forEach((dok) => {
      hasil.push({ 
     id:dok.id, 
      nama: dok.data().nama,
      harga:dok.data().harga,
      stok: dok.data().stok,
      });
  });
  
  return hasil;
}
export function formatangka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export async function tambahproduk(nama, harga, stok) {
  try {
    const dokRef = await addDoc(collection(db,'produk'),{
   nama: nama,
   harga: harga,
   stok: stok
    });
    console.log('berhasil menambah produk'+ dok )
  } catch (e) {
  console.log('Gagal menambah daftar produk' + e);
  }
}

export async function hapusproduk(docId) {
  await deleteDoc(doc(db,"produk",docId));
}

export async function ubahproduk(docId, nama, harga, stok) {
  await updateDoc(doc(db, "produk", docId), {
    nama: nama,
    harga: harga, 
    stok: stok
  });
}

export async function ambilproduk(docId) {
  const docRef = await doc(db, "produk", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}
