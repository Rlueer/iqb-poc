IQB Student Management POC
Spring Boot · PostgreSQL · React · Vite

Bu proje, IQB Solutions teknik değerlendirmesi kapsamında hazırlanan bir full-stack Proof-of-Concept (POC) uygulamasıdır.
Amaç; temiz backend mimarisi, modern frontend geliştirme ve gerçek bir veritabanı kullanarak öğrenci–ders–sınav yönetimini modelleyen bir sistem kurmaktır.

📁 Proje Yapısı
iqb/
 ├── backend/     → Spring Boot REST API
 └── frontend/    → React + Vite SPA

🏛 Backend (Spring Boot)
Kullanılan Teknolojiler

Java 23

Spring Boot 3.5.x

Spring Web

Spring Data JPA

Hibernate

PostgreSQL

Lombok

Validation API

Paket Yapısı
com.iqb.backend
 ├── controller        → REST endpoint’leri
 ├── service           
 │     └── impl        → İş mantığı implementasyonları
 ├── repository        → JPA repository interface’leri
 ├── model             → Entity sınıfları
 ├── dto               → Özel dönüş modelleri
 └── exception         → Global hata yönetimi

Domain Modelleri
Student
id
fullName
email
gsmNumber
number
examResults (OneToMany)

Course
id
name
examResults (OneToMany)

ExamResult
id
score
student (ManyToOne)
course (ManyToOne)

Tamamlanmış Kurs Mantığı

Bir kurs, bir öğrenci için en az 3 sınav sonucu varsa completed kabul edilir.

🌐 REST API Endpointleri
Students
GET    /api/students
GET    /api/students/search?q=
GET    /api/students/{id}
POST   /api/students
PUT    /api/students/{id}
DELETE /api/students/{id}

Exams
GET    /api/students/{id}/exams
POST   /api/exams

Completed Courses & Average
GET    /api/students/{id}/average

🗄 Veritabanı (PostgreSQL)
Gerekli Kurulum

PostgreSQL'de bir veritabanı oluştur:

CREATE DATABASE iqb_poc;

Spring Konfigürasyonu

backend/src/main/resources/application.properties

spring.datasource.url=jdbc:postgresql://localhost:5432/iqb_poc
spring.datasource.username=postgres
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true


Hibernate entity tanımlarına göre tabloları otomatik oluşturur.

⚛️ Frontend (React + Vite)
Kullanılan Teknolojiler

React 18

Vite 7

Axios

Bootstrap 5

React Router DOM

Klasör Yapısı
src/
 ├── api/
 │     └── axios.js
 ├── pages/
 │     ├── StudentList.jsx
 │     ├── StudentDetail.jsx
 │     └── StudentCreate.jsx
 ├── components/
 ├── App.jsx
 └── main.jsx

Axios Konfigürasyonu (src/api/axios.js)
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
});

🚀 Çalıştırma
Backend
cd backend
mvn clean install
mvn spring-boot:run


Backend → http://localhost:8080 üzerinde çalışır.

Frontend
cd frontend
npm install
npm run dev


Frontend → http://localhost:5173 üzerinde çalışır.

🧪 Test Senaryoları

Öğrenci ekleme / düzenleme / silme

Öğrenci arama (name, email, gsm, number)

Ders oluşturma

Öğrenciye exam ekleme

Exam listeleme

Completed courses hesaplama

Ortalama hesaplama

Detay sayfasında exam listeleri

🎯 Sonuç

Bu proje, Spring Boot backend, PostgreSQL veritabanı ve React frontend kullanılarak oluşturulmuş uçtan uca bir POC’tir.
Katmanlı mimari, REST API tasarımı, modern frontend geliştirme ve veri modellemesi gibi konuları uygulamalı şekilde göstermektedir.

POC; gerçek bir kurumsal uygulamanın sadeleştirilmiş ama profesyonel bir örneği olacak şekilde hazırlanmıştır.
