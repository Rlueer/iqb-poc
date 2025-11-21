# ============================
# 1) BACKEND BUILD STAGE
# ============================
FROM eclipse-temurin:17-jdk AS backend-build
WORKDIR /app

COPY backend/pom.xml .
COPY backend/mvnw .
COPY backend/.mvn .mvn
COPY backend/src ./src

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests


# ============================
# 2) FRONTEND BUILD STAGE
# ============================
FROM node:18-alpine AS frontend-build
WORKDIR /frontend

COPY frontend/package.json .
COPY frontend/package-lock.json .
RUN npm install

COPY frontend .
RUN npm run build


# ============================
# 3) RUNTIME STAGE
# ============================
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Backend jar
COPY --from=backend-build /app/target/*.jar app.jar

# Frontend dist -> Spring'in statik klasörü
RUN mkdir -p /app/static
COPY --from=frontend-build /frontend/dist /app/static

# Spring Boot’un statik serve etmesi için env
ENV SPRING_WEB_RESOURCES_STATIC_LOCATIONS=classpath:/static/,file:/app/static/

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
