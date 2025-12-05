📚 Student Management System – Full Stack Application

Öğrenci, ders ve sınav yönetimini tek bir çatı altında toplayan uçtan uca bir öğrenci yönetim sistemi geliştirdim.
Sistem; öğrenci bilgisi kaydı, ders yönetimi, sınav ekleme, tamamlanan derslerin hesaplanması ve çok kriterli öğrenci arama gibi temel işlemleri modern bir web arayüzü üzerinden sağlar.

Kullanıcı arayüzü hızlı ve akıcı bir deneyim sunarken; backend tarafı güvenilir veri işleme, doğrulama ve katmanlı mimariyle tasarlanmıştır.
Uygulama, hem yönetim paneli hem de öğrenci bazlı detay sayfalarıyla gerçek bir okul/kurum işleyişini modellemektedir.

⚙️ Teknik Yapı
student-management/
 ├── backend/      → Spring Boot REST API
 └── frontend/     → React + Vite (SPA)

🏛 Backend (Spring Boot)
Kullanılan Teknolojiler

Java 23

Spring Boot 3.5.x

Spring Web

Spring Data JPA & Hibernate

PostgreSQL

Lombok

Validation API

Domain Modelleri

✔ Student → id, fullName, email, gsmNumber, number, examResults
✔ Course → id, name, examResults
✔ ExamResult → id, student, course, score

Bir öğrenci, bir ders için en az 3 sınav notuna sahipse o dersi tamamlamış kabul edilir .

Paket Yapısı
com.app.backend
 ├── controller     → REST endpoint'leri
 ├── service        → iş mantığı
 │     └── impl     → service implementasyonları
 ├── repository     → JPA repository interface'leri
 ├── model          → entity sınıfları
 ├── dto            → veri transfer modelleri
 └── exception      → global hata yönetimi

🌐 REST API Örnek Endpoint’ler
Students

GET /api/students

GET /api/students/search?q=

GET /api/students/{id}

POST /api/students

PUT /api/students/{id}

DELETE /api/students/{id}

Exams

GET /api/students/{id}/exams

POST /api/exams

Completed Courses & Averages

GET /api/students/{id}/average

🗄 PostgreSQL

Veritabanı oluşturma:

CREATE DATABASE sms_db;


Spring config:

spring.datasource.url=jdbc:postgresql://localhost:5432/sms_db
spring.datasource.username=postgres
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

⚛️ Frontend (React + Vite)
Teknolojiler

React 18

Vite 7

Axios

Bootstrap 5

React Router DOM

Proje Yapısı
src/
 ├── api/            → axios config
 ├── pages/          → StudentList, Detail, Create
 ├── components/
 ├── App.jsx
 └── main.jsx


Örnek axios ayarı:

export default axios.create({
  baseURL: "http://localhost:8080/api",
});

🚀 Çalıştırma
Backend:
cd backend
mvn clean install
mvn spring-boot:run


Backend → http://localhost:8080

Frontend:
cd frontend
npm install
npm run dev


Frontend → http://localhost:5173

🧪 Test Senaryoları

Öğrenci ekleme/düzenleme/silme

Öğrenci arama (name, email, gsm, number)

Ders oluşturma

Öğrenciye sınav ekleme

Sınav listeleme

Ortalama hesaplama

Tamamlanan derslerin tespiti

Detay sayfasında exam listeleri

🎯 Sonuç

Bu proje, modern bir full-stack yapıyı (Spring Boot + PostgreSQL + React) kullanarak öğrenci yönetimi, ders işlemleri ve sınav sonuçlarının işlendiği gerçekçi bir sistem oluşturur.
Katmanlı mimari, veri bütünlüğü, domain modelleme ve kullanıcı deneyimi açısından profesyonel bir örnek teşkil eder.
