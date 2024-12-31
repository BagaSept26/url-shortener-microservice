# URL Shortener Microservice

This is the boilerplate code for the URL Shortener Microservice project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice.

# URL Shortener Microservice

Microservice ini menyediakan fungsionalitas untuk mempersingkat URL panjang menjadi URL pendek yang lebih mudah dibagikan.

## Fitur Utama

*   **Mempersingkat URL:** Menerima URL panjang dan menghasilkan URL pendek yang unik.
*   **Validasi URL:** Memastikan format URL valid dan domainnya dapat dijangkau.
*   **Redirect:** Mengarahkan URL pendek ke URL panjang aslinya.

## Cara Penggunaan

### Endpoint

*   **POST `/api/shorturl`:**
    *   Menerima: JSON body dengan field `url` (URL panjang).
    *   Mengembalikan: JSON dengan field `original_url` (URL panjang yang diberikan) dan `short_url` (URL pendek yang dihasilkan).
    *   Contoh request body:
        ```json
        {
            "url": "https://www.example.com/this-is-a-very-long-url"
        }
        ```
    *   Contoh response:
        ```json
        {
          "original_url": "https://www.example.com/this-is-a-very-long-url",
          "short_url": "aBcDeFg"
        }
        ```
*   **GET `/api/shorturl/:short_url`:**
    *   Menerima: `short_url` sebagai parameter URL.
    *   Melakukan redirect ke URL panjang yang terkait.

### Konfigurasi

Microservice ini menggunakan variabel lingkungan:

*   `PORT`: Port server (default: 3000). (Dapat dikonfigurasi melalui file `.env` atau variabel lingkungan sistem).

### Cara Menjalankan

1.  Clone repositori.
2.  Instal dependensi:
    ```bash
    npm install
    ```
3.  (Opsional) Buat file `.env` jika ingin mengubah port.
4.  Jalankan microservice:
    ```bash
    npm start
    ```

### Database (in-memory)

*   Saat ini, URL dan `short_url` disimpan dalam memory `urlDatabase`. Data akan hilang ketika server berhenti. Untuk implementasi persisten, pertimbangkan menggunakan database seperti MongoDB atau PostgreSQL.

## Teknologi yang Digunakan

*   Node.js
*   Express.js
*   `shortid`: Untuk menghasilkan kode unik
*   `dns`: Untuk memvalidasi domain

## Kontribusi

Kontribusi dipersilakan. Silakan ajukan *pull request* dengan perubahan yang sudah diuji.

## Lisensi

MIT License