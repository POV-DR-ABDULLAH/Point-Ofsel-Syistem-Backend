const mysql = require('mysql2');

// Konfigurasi koneksi database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Ganti sesuai dengan password MySQL-mu
  database: 'pos_app' // Nama database yang sudah dibuat
});

// Membuka koneksi
connection.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal:', err);
    return;
  }
  console.log('Koneksi ke database MySQL berhasil');
});

module.exports = connection; // Ekspor koneksi agar bisa digunakan di file lain
