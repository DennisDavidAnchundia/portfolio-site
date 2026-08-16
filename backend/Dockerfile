# syntax=docker/dockerfile:1

# --- Stage 1: build ------------------------------------------------
# Imagen de Maven con JDK 21. Compila el jar aquí para que la imagen
# final no tenga que incluir Maven ni el código fuente.
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copia primero solo el pom para cachear las dependencias
COPY pom.xml .
RUN mvn -B -q dependency:go-offline

COPY src ./src
RUN mvn -B -q -DskipTests package

# --- Stage 2: runtime ----------------------------------------------
# Solo JRE, mucho más liviana que la imagen de build.
FROM eclipse-temurin:21-jre-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

COPY --from=build /app/target/portfolio-0.0.1-SNAPSHOT.jar app.jar

USER appuser
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
