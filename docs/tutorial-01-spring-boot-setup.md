# Tutorial 01 — Crear el proyecto Spring Boot (Fase 1.1)

## ¿Qué hicimos?

Generamos el esqueleto del backend usando **Spring Initializr**, la herramienta
oficial de Spring para crear proyectos. Un "esqueleto" es un proyecto Java mínimo
pero funcional: con él ya podemos compilar, correr tests y ejecutar la app.

Es como `npm create vite@latest` pero para Spring Boot.

## Comando que generó el proyecto

```powershell
curl.exe -s -o starter.tgz https://start.spring.io/starter.tgz `
  -d type=maven-project -d language=java -d bootVersion=4.0.7 `
  -d baseDir=backend -d groupId=com.dennis -d artifactId=portfolio `
  -d name=portfolio -d description="Personal portfolio website" `
  -d packageName=com.dennis.portfolio -d packaging=jar `
  -d javaVersion=21 -d dependencies=web,actuator,validation,data-jpa,postgresql,flyway,data-redis
```

Cada parámetro significa:

| Parámetro | Valor | Qué define |
|---|---|---|
| `type` | `maven-project` | El gestor de builds (Maven) |
| `language` | `java` | Lenguaje |
| `bootVersion` | `4.0.7` | Versión de Spring Boot |
| `groupId` | `com.dennis` | Paquete base de tu organización/identidad |
| `artifactId` | `portfolio` | Nombre del artefacto/proyecto |
| `packageName` | `com.dennis.portfolio` | Paquete Java de tu código |
| `javaVersion` | `21` | Versión de Java objetivo |
| `dependencies` | `web,actuator,...` | Los starters (bibliotecas) que incluye |

## Qué es cada archivo generado

```
backend/
├── pom.xml                  ← Corazón del proyecto Maven (definición y dependencias)
├── mvnw / mvnw.cmd          ← "Maven Wrapper": instala Maven solo, sin necesidad de tenerlo en el PC
├── .mvn/wrapper/            ← Config del wrapper (versión de Maven a descargar)
├── .gitignore               ← Qué no subir a git (target/, etc.)
├── .gitattributes           ← Normaliza saltos de línea (Windows/Mac/Linux)
├── HELP.md                  ← Ayuda genérica (la borramos, no aporta)
└── src/
    ├── main/java/com/dennis/portfolio/PortfolioApplication.java  ← Punto de entrada de la app
    ├── main/resources/application.properties                     ← Configuración (puerto, BD, etc.)
    └── test/java/com/dennis/portfolio/PortfolioApplicationTests.java ← Test que verifica que la app arranca
```

## Los archivos más importantes

### 1. `pom.xml` — la receta del proyecto

Maven es el gestor de builds de Java. El `pom.xml` declara **qué** construye el
proyecto y **de qué depende**. Dos partes clave:

- `<parent>` → hereda toda la configuración de Spring Boot (versiones de librerías,
  plugins, defaults). Nosotros solo declaramos qué starters queremos.
- `<dependencies>` → los **starters**. Un starter es un paquete que ya trae todo
  configurado para una tarea.

Los starters que elegimos y **para qué sirven**:

| Starter | Sirve para |
|---|---|
| `spring-boot-starter-webmvc` | Crear API REST y aplicaciones web (MVC) |
| `spring-boot-starter-data-jpa` | Acceso a bases de datos relacionales (PostgreSQL) |
| `spring-boot-starter-flyway` | Migraciones de base de datos versionadas |
| `org.postgresql:postgresql` | Driver para conectarse a PostgreSQL |
| `spring-boot-starter-data-redis` | Caché con Redis |
| `spring-boot-starter-validation` | Validar datos de entrada (formularios, JSON) |
| `spring-boot-starter-actuator` | Endpoints de salud/monitoreo (`/actuator/health`) |
| `com.h2database:h2` (test) | Base en memoria para los tests, sin instalar nada |

### 2. `PortfolioApplication.java` — el punto de arranque

```java
@SpringBootApplication
public class PortfolioApplication {
    public static void main(String[] args) {
        SpringApplication.run(PortfolioApplication.class, args);
    }
}
```

- `@SpringBootApplication` = tres anotaciones en una: configuración automática,
  escaneo de componentes y configuración Spring.
- El `main` arranca un **servidor Tomcat embebido**: tu aplicación Java *es* el
  servidor web, no necesitas instalar Tomcat aparte.

### 3. `application.properties` — configuración

```
spring.application.name=portfolio
```

Aquí iremos añadiendo puerto, conexión a la BD, Redis, etc. en fases siguientes.

### 4. `PortfolioApplicationTests.java` — test de arranque

El test `contextLoads()` lanza la aplicación completa y verifica que **arranca sin
errores**. Es la prueba de humo básica de cualquier proyecto Spring.

## Ajustes que hicimos (y por qué)

1. **Versión corregida**: Initializr generó `4.0.7.RELEASE`, pero esa versión no
   existe en Maven Central → Maven no podía descargar el parent. La corregimos a
   `4.0.7` (formato actual de Spring Boot).
2. **Base de tests**: al incluir JPA/PostgreSQL, el test de arranque fallaba porque
   no hay base de datos. Añadimos **H2** (base en memoria, solo para tests) para que
   el proyecto compile y testee sin tener PostgreSQL instalado. En Fase 2 la app usará
   PostgreSQL de verdad y el test seguirá usando H2.

## Comandos que usamos (y para qué)

```powershell
.\mvnw.cmd -B compile   # Compila el código (debe terminar con BUILD SUCCESS)
.\mvnw.cmd -B test      # Compila y ejecuta los tests
.\mvnw.cmd -B package   # Genera el .jar listo para producción
```

> `mvnw` (Maven Wrapper) descarga Maven automáticamente la primera vez y lo usa
> localmente, sin instalarlo en el sistema. Por eso el proyecto es reproducible.

## Lo que sigue

En la Fase 1.2 añadiremos configuración (`application.yml`) y expondremos el
endpoint de salud `/actuator/health`; en la 1.3 crearemos nuestro primer endpoint
propio `/api/health`.
