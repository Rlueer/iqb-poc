IQB Student Management POC – Full Stack Application

Spring Boot + PostgreSQL + React + Vite

Bu proje, IQB Solutions tarafından verilen teknik değerlendirme kapsamında hazırlanmış bir Proof-of-Concept (POC) full-stack uygulamasıdır. Amaç; temiz mimaride Spring Boot backend, PostgreSQL veritabanı ve React tabanlı bir frontend kullanarak öğrenci–ders–sınav yönetim sistemi geliştirmektir.

Bu POC, özellikle şu alanlarda mühendislik yetkinliğini göstermeyi hedefler:

Backend domain model tasarımı

JPA / Hibernate ilişkisel veri yönetimi

Katmanlı mimari (Controller → Service → Repository)

REST API tasarımı

React ile modern frontend geliştirme

Axios ile backend entegrasyonu

Component-based UI yaklaşımı

Arama, listeleme, detay görüntüleme ve iş kuralı uygulamaları

📦 Proje İçeriği

Proje 3 temel bölümden oluşmaktadır:

backend/   → Spring Boot REST API
frontend/  → React + Vite SPA
database/  → PostgreSQL 16 (otomatik migration)

🧩 Backend – Spring Boot

Backend, Spring Boot 3.5.x üzerinde geliştirilmiştir ve klasik layered architecture yapısını takip eder.

📁 Paket Yapısı
com.iqb.backend
 ├── controller      → REST endpoint’leri
 ├── service         → İş mantığı arayüzleri
 │    └── impl       → Service implementasyonları
 ├── repository      → JPA repository’leri
 ├── model           → Entity sınıfları (Student, Course, ExamResult)
 ├── dto             → Dışarı dönecek özel veri modelleri
 └── exception       → Global hata yönetimi

🧭 Domain Modeli

Sistem üç temel varlıktan oluşur:

🧑 Student

id

fullName

email

gsmNumber

number

examResults (OneToMany)

📘 Course

id

name

examResults (OneToMany)

📝 ExamResult

id

score

course (ManyToOne)

student (ManyToOne)

Bir öğrencinin tamamladığı kurs:
→ Aynı ders için en az 3 sınav sonucu varsa completed olarak sayılır.

🛠 Service Katmanı

İş kuralları burada uygulanır.

StudentService

add / update / delete

search by name/email/number/gsm

get student exams

calculate completed courses

calculate average

CourseService

basic CRUD

ExamService

add exam result

list exams

🌐 REST API Endpointleri
Öğrenciler
GET    /api/students
GET    /api/students/search?q=
GET    /api/students/{id}
POST   /api/students
PUT    /api/students/{id}
DELETE /api/students/{id}

Sınavlar
GET    /api/students/{id}/exams
POST   /api/exams

Tamamlanmış dersler & ortalama
GET    /api/students/{id}/average

🗄 Veritabanı – PostgreSQL

Hibernate, entity sınıflarına göre tabloları otomatik oluşturur.

students
courses
exam_results


Foreign key ilişkileri:

exam_results.student_id → students.id

exam_results.course_id → courses.id

Konfigürasyon:
application.properties

spring.datasource.url=jdbc:postgresql://localhost:5432/iqb_poc
spring.datasource.username=postgres
spring.datasource.password=******
spring.jpa.hibernate.ddl-auto=update

⚛️ Frontend – React + Vite

Modern, hızlı ve sade SPA (Single Page Application) yapısı tercih edilmiştir.

🌟 Kullanılan Teknolojiler

React 18

Vite 7

Axios

Bootstrap 5

React Router DOM

📁 Klasör Yapısı
src/
 ├── api/
 │     └── axios.js      → backend bağlantısı
 ├── pages/
 │     ├── StudentList.jsx
 │     ├── StudentDetail.jsx
 │     └── StudentCreate.jsx
 ├── components/
 │     └── (UI parçaları)
 ├── App.jsx             → router yapısı
 └── main.jsx            → bootstrap + render

🔗 API Bağlantısı (axios instance)

src/api/axios.js

import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api"
});

🖥 Frontend Sayfaları
📋 1) StudentList

tüm öğrencileri listeler

arama kutusu

search by name/email/number/gsm

detaya gitme

öğrenci ekleme butonu

📄 2) StudentDetail

öğrencinin tüm exam result’ları

completed courses listesi

genel ortalama

yeni sınav sonucu ekleme

➕ 3) StudentCreate

form ile öğrenci ekleme

🚀 Projenin Çalıştırılması
✔ Backend
cd backend
mvn clean install
mvn spring-boot:run


Backend 8080 portunda açılır.

✔ PostgreSQL

Veritabanı oluştur:

CREATE DATABASE iqb_poc;

✔ Frontend
cd frontend
npm install
npm run dev


Ardından:
http://localhost:5173

🧪 Test Senaryoları

Öğrenci ekleme

Öğrenci güncelleme

Öğrenci silme

Arama yapma

Ders ekleme

Sınav ekleme

Öğrenciye ait sınav sonuçlarını görüntüleme

Completed course listesi

Ortalama hesaplama doğruluğu

🎯 POC’in Amacı ve Sonuç

Bu proje ile:

Katmanlı backend mimarisi

React tabanlı modern UI

REST API tasarımı

Veri modelleme

JPA ilişkileri

Axios ile communication

Kod okunabilirliği

Basit ama gerçekçi iş mantığı

konularında tam kapsamlı bir POC hazırlanmıştır.

Proje, gerçek bir üretim uygulamasının sadeleştirilmiş ama profesyonel bir temsili olacak şekilde tasarlanmıştır.
