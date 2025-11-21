# ============ 1) Build Stage ================
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

# Backend kodunu içeri kopyala
COPY backend/pom.xml .
COPY backend/src ./src
COPY backend/mvnw .
COPY backend/.mvn .mvn

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# ============ 2) Run Stage ==================
FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
