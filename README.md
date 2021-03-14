![purwadhika](https://dm2302files.storage.live.com/y4mXzhUZVMNL_p9tVgW1HqlEUJa6ppyVCfKnxxFC4x5nfuSs_-NnMTSOFdPq6MIGrxKEZW8uGWVreQ9awWZboO6NydIZpac87UZ48QL0Y40HZv-uJOAAqVADo9m_ZBZ5ThfKAaFnCabsFufrOnkmjwdWVsaFcPVmaha7sQOlW0jmQwbbEGmbVih8UC2ouXKKdRs?width=256&height=39&cropmode=none)

---
Sebelum anda mengerjakan soal ujian, pastikan anda memiliki akun **GitHub** dan ***software git*** sudah terinstall dilaptop. Anda dapat memastikan bahwa **git** sudah terinstall dilaptop anda dengan menjalankan perintah berikut ini diterminal atau ***cmd*** : ``` git --version ```. Jika muncul *versi git* maka komputer anda sudah terinstal *git*.

Soal ujian dapat diakses melalui link dibawah ini
- link : https://drive.google.com/file/d/1QeU-9M1qmWq_gP85lc3xk6jELcnA7y0n/view?usp=sharing

Sebelum mengerjakan ujian, bacalah dengan seksama aturan serta panduan dalam mengerjakan soal-soal ujian berikut ini.

## A. Term & Condition
- ujian akan dilaksanakan selama 6 jam 20 menit
    - 10 menit untuk *setup*
    - 6 jam mengerjakan soal
    - 10 menit *pull request*
- selama mengerjakan ujian, siswa wajib **men-share seluruh screen** di **zoom** (khusus untuk kelas online) sampai ujian selesai
- dilarang bekerjasama dalam mengerjakan soal ujian
- dilarang memberikan jawaban atau meminta jawaban dari teman atau pihak lain
- jika ada pertanyaan mengenai ujian dan soal, langsung tanyakan kepada operasional selaku pengawas ujian atau *lecturer* yang mengawasi
- siswa boleh membuka *website* dan referensi lainnya selama ujian sesuai ketentuan yang berlaku
- jawaban soal akan dikumpulkan di dalam repositori ini dengan sistem ***pull request*** dan siswa wajib mengirim ***link*** dari ***forked repositoy*** ke alamat email berikut ini :<br>

    to : operational_jkt@purwadhika.com <br>
    subject : FRONTEND-JCWM1604-JKT

## B. Exam Setup Guide
- sebelum mengerjakan soal, lakukan ***fork*** untuk repositori ini

    ![guide_1](https://dm2302files.storage.live.com/y4mPM_i6lwI5k82Ir4gCZ_iG2pyP67UhSVdVDnXxY7pavQzUXOFoRhblnD7tH4UyyvIdMs5jKUeX04maDpMg8lm2xVybajcR4oKSo13SyRlQoizTsMIaBj1oRcS1X3hOXahuJ0S9RM64NNzskC016XEiY8SVoAORMWYw9twz0MNgzgebD8G-fqIiwFdk4n8KSky?width=597&height=341&cropmode=none)

- *clone* repositori hasil *forked* ke komputer kalian dengan cara *copy link forked respository* anda

    ![guide_2](https://dm2302files.storage.live.com/y4mzT4HSyqpKbCUVhsB8KhMhzEWR5SIZ_A_dtPrbBiHa7biMZOL3jZKeAicOezFOJIMPkZBsBjEDSp_Hms7JT4uItEq_k8fCzJDxUEE5mtie2mbf7-bm0E1D3pX_MlHs_AXBvIhe0qcaLxOyuuJpRcazzwAxPPpNMWXcuM4abFazCFPuSSBPksXtRhjjxgzOVbh?width=515&height=339&cropmode=none)

- buka terminal atau *cmd* dari *folder* tempat anda akan menyimpan hasil *clone* dari repositori yang sudah anda *forked*, kemudian jalankan perintah ```git clone``` dan *paste link forked repository* anda

    ```C:\data\alee> git clone https://github.com/...```

- pindah ke direktori *folder* hasil ```git clone``` dengan cara

    ``` C:\data\alee> cd ujian-frontend-JCWM1604 ``` 

- buatlah sebuah *branch* baru untuk tempat anda mengerjakan soal ujian

    ``` C:\data\alee\ujian-frontend-JCWM1604> git checkout -b alee ```

- *install* semua *dependencies* yang ada di dalam *project* hasil *clone* dari GitHub
    
    ``` C:\data\alee\ujian-frontend-JCWM1604> npm install```

- bukalah *code editor* anda atau *vscode* : 

    ``` C:\data\alee\ujian-frontend-JCWM1604> code . ```

- pastikan anda berada di-*branch* yang baru anda buat dengan cara lihat dipojok kiri bawah *vscode* dan anda akan melihat nama *branch* yang baru anda buat atau anda bisa menggunakan perintah : ``` git branch ``` di terminal atau *cmd* untuk melihat semua daftar *branch* yang ada di *folder project* anda, *branch* yang dipakai saat ini ditandai dengan warna hijau dan *nama-*branch*

    ![guide_1](https://dm2302files.storage.live.com/y4mTorNOXI0WSTMrSSxOS3W8UVAiJWTfH8IRe-Lj2Ww019HFSWLxdr-vDZ4yLWCFvQ-Iv398wwWa-Yqycn6jZvnODx9p4rXcMEhCiyiXpWgHGvr-zqUx9bNMVDtWAJix6bckKeSJS5GUb3F5hBmSjYekhEWysT8ZLrQNQQmIzKvUMKhN27VRh-gQFo9HJa__k9C?width=556&height=52&cropmode=none)
    
    ![guide_2](https://dm2302files.storage.live.com/y4mnrahhV9vqrSD3voIbCSyXPICxKLlakBAuuVq7HHmKZxWLaN9rVSd7RSj0aJE78qgRbwTwWrdYbAztQdXX0izM6gosefVDbtqqs4VjaTOAdMBOt2rapuVOImKcoPXpy-MA-Pc495WT0qLpYDyGIY0a3oI1_eVShzOS4bw1hdvEsiwxBwriAH9haI2ACkbUiIH?width=502&height=280&cropmode=none)

- silahkan kerjakan soal yang telah diberikan, teknis pengumpulan soal akan menggunakan sistem *pull request*

## C. Pull Request Guide
- sebelum melakukan *pull request* ke repositori pusat (respositori asal), pastikan bahwa jawaban sudah sesuai dengan soal yang telah diberikan
- pastikan bahwa anda telah menyimpan semua perubahan/*history* di *git*, untuk memastikannya lakukan perintah berikut ini di terminal/*cmd*

    ```C:\data\alee\ujian-frontend-JCWM1604> git status ```

- jika *local repository* anda sudah bersih maka lanjut ke *step* berikutnya. jika masih ada file yang belum di *track* (*untrack files*) atau preubahan (*changes*) yang belum di *commit*, maka lakukan *commit* terlebih dahulu

    ``` C:\data\alee\ujian-frontend-JCWM1604> git add . ``` <br>
    ``` C:\data\alee\ujian-frontend-JCWM1604> git commit -m "masukan pesan commit anda" ```

- *push branch* yang berisi hasil ujian ke GitHub (*forked repository*)

    ``` C:\data\alee\ujian-frontend-JCWM1604> git push origin alee ```

- buka GitHub dan lihat repositori hasil *forked* anda. **PASTIKAN!** bahwa *branch* yang berisi hasil ujian anda sudah ada di GitHub
- jika sudah ada, maka akan muncul warning untuk melakukan *pull request*

    ![guide_3](https://dm2302files.storage.live.com/y4mGa9MZeTWjTugH7OccfcgOb2Oni0Gutykiq0tuews5srteWd0dNZIAM6knsq4f1BqjX1rz0PHR1bd7qWK7mYR5KwrCUe_Z3VoC4bkQyDaNjuHCCpSvAoIUuHfwg72xr9oU6kmH6dv5Pz9G1uJkFtQmWH4wDqV5xrlh6fDNv-O-oeZpLGnG4cSkJB0fulX_5m4?width=456&height=203&cropmode=none)

- lakukan *pull request* dan **PASTIKAN!** bahwa
    1. **HEAD repository** berasal dari repositori kalian dan **compare branch** berasal dari *branch* tempat anda mengerjakan soal (**branch yang baru di push**), **BASE respository** menuju repositori asal dan **compare branch** pilih sesuai nama kalian
    2. beri informasi *pull request* berupa : nama-program (**PENTING!**)
    <br>e.x. : ALEE-JCWM-1604
    3. jika semua informasi sudah sesuai lakukan *pull request* dengan menekan tombol *create pull request*
    
    ![guide_4](https://dm2302files.storage.live.com/y4mKybOAijDgpGP2j84PvSlei8brxPrTsI4Jf8P3BCXWOaPxEbnk5Q0-8bQ3SHGOqsZn3VLR8WkK9MgX8QB6pKSwHgbRRGqy2YOQjLm9BTbIJrdSwk3FerqDR7P3qYthjL1E0xhVgaU6L1Uwg6bSqvneK5rldYeLTIYLMKfkpD-49n4DRx_Jv-uP8ZqwexPw7lU?width=928&height=430&cropmode=none)

    ![guide_5](https://dm2302files.storage.live.com/y4mGP_Mm82i5exgGL4SR-ClTOcnzJ2D2Rmofi81ze9P_bK8Lpx2PiQAMBVNN5tO3LbrQo-3B41CPQUkwDoV24RvGzk1knFv3mysWCa4gL7P5hrq6u8SS4_FG-8S6bRn8GELKWt2pSH8-4-Mp4cyodlMevpCJMPtjpIw6msnkZOdYujrUeRbX0fgK4CSY3bD7Wyd?width=933&height=597&cropmode=none)

- jika *pull request* berhasil dan tidak terjadi konflik maka akan muncul info berikut ini
    ![gudie_6](https://dm2302files.storage.live.com/y4m6d20-8wJHrBabe5o3boRoyLEkWPCmcvaz6z2nMFp8Qu4gVx9DBkXabQhTI8kDRAiaVshkOKYW5hX67J2SJuzwkD10vvnMPEw36Hb0c4f-sKPyNlpes8wKlB0Rqp6_-Ky1HGsw-rwuxGs-EN0x_50XsI2_ypPTpoaIZiduU-g8LAQS5OeUCdg_xVas0Fen4GY?width=939&height=138&cropmode=none)

## Selamat Mengerjakan Ujian ☺
