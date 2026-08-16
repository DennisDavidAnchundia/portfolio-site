# AGENTS.md

Contexto de trabajo para el asistente. Léelo al inicio de cada sesión.

## Proyecto
Sitio de portafolio personal (ES/EN) para reclutadores.
- Backend: Java 21 + Spring Boot 4.0.7 + Maven Wrapper (`backend/`)
- Frontend (planificado): React + TypeScript + Vite + Tailwind (`frontend/`)
- Datos: PostgreSQL 16 + Redis 7 + Flyway
- Infra: Docker, Kubernetes (Kustomize), GitHub Actions
- Repo público: https://github.com/DennisDavidAnchundia/portfolio-site

## Punto de control
Para saber dónde quedamos y qué sigue, leer:
- `docs/estado.md` (checkpoint de sesión, se actualiza al cerrar)
- `docs/plan-fases.md` (todas las fases/subfases con estado)

`docs/` está en `.gitignore`: son notas de estudio del usuario, nunca commitear.

## Comandos
- Tests backend: `cd backend` → `.\mvnw.cmd -B test`
- Compilar backend: `.\mvnw.cmd -B compile`
- Empaquetar: `.\mvnw.cmd -B -DskipTests package`
- Correr sin BD (smoke, usa H2 de test): `.\mvnw.cmd -B spring-boot:test-run "-Dspring-boot.run.arguments=..."`
- Push: `git push` (gh autenticado, git protocol https)
- Windows: usar `npm.cmd` (no `npm`), `.\mvnw.cmd` (no mvn)

## Convenciones
- Commits: Conventional Commits en inglés, un tema por commit, mensaje corto.
- Subfase = 1 commit. Trabajar al ritmo que pida el usuario (espaciado en el tiempo).
- Solo commitear/pushear cuando el usuario lo solicite (avanzar en una fase = sí).
- Spring Boot versión correcta: `4.0.7` (jamás `4.0.7.RELEASE`, no existe en Central).
- Tests usan H2 (config en `backend/src/test/resources/application.yml`).
- Datasource/Redis vía variables de entorno con defaults locales.

## Entorno (Windows, PowerShell 5.1)
- CWD por defecto es `C:\Users\hedes`: usar `workdir` o rutas absolutas.
- No hay Maven global → usar el wrapper. Docker Desktop apagado por petición del
  usuario; no iniciarlo salvo que se pida. PostgreSQL nativo detenido; no reactivar
  sin preguntar.
- gh CLI: refrescar PATH al inicio con:
  `$env:Path = [Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [Environment]::GetEnvironmentVariable("Path","User")`
