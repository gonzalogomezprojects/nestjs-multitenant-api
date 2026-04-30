# 🏆 SAAS STARTER - PRODUCTION ROADMAP

Este roadmap centraliza la visión para convertir este template en un producto de nivel profesional, integrando las tareas de los módulos individuales con mejoras de infraestructura global.

---

## 🛡️ FASE 1: Blindaje y Seguridad (Prioridad Máxima)
*Objetivo: Asegurar que el aislamiento multi-tenant sea infranqueable y la API sea resiliente.*

- [ ] **Global Tenancy Enforcement**:
  - Implementar un mecanismo (ej. AsyncLocalStorage o Interceptor) para que el `tenantId` esté disponible globalmente sin pasarlo manualmente por cada capa.
- [ ] **Rate Limiting (Throttler)**:
  - Implementar `@nestjs/throttler` (Ref: AUTH_TODO #3).
- [ ] **Resource Ownership Guard**:
  - Crear un Guard genérico que valide `resource.tenantId === request.tenantId` para operaciones de ID (Ref: CLIENTS_TODO #30).

## 💎 FASE 2: Estandarización y DX (Developer Experience)
*Objetivo: Que el frontend reciba datos predecibles y limpios.*

- [ ] **Normalización de Respuestas**:
  - Crear un `TransformInterceptor` para envolver todas las respuestas en un formato estándar.
  - Implementar una interfaz de paginación consistente (Ref: CLIENTS_TODO #23).
- [ ] **Global Error Filter**:
  - Crear un `HttpExceptionFilter` para estandarizar errores (statusCode, message, path).
- [ ] **Security Serialization**:
  - Asegurar que `ClassSerializerInterceptor` esté activo globalmente para filtrar campos sensibles.

## 📈 FASE 3: Robustez de Datos y Observabilidad
*Objetivo: Trazabilidad y persistencia profesional.*

- [ ] **Prisma Soft Deletes**:
  - Implementar lógica de `deletedAt` vía Prisma Middleware o Extensions.
- [ ] **Audit Logging**:
  - Interceptor básico para loggear acciones críticas (CUD operations) con contexto de usuario y tenant.
- [ ] **Health Checks (Terminus)**:
  - Configurar `/health` con checks de base de datos y memoria.

## 🚀 FASE 4: Preparación para Distribución (Starter Kit)
*Objetivo: Que sea fácil de clonar, probar y desplegar.*

- [ ] **Production Seeding**:
  - Crear un seed robusto que genere un entorno de prueba multi-tenant completo.
- [ ] **Dockerization**:
  - Crear `Dockerfile` multi-stage y `docker-compose.yml` para dev/prod.
- [ ] **Testing Coverage**:
  - Alcanzar +80% de cobertura en flujos críticos (Auth y Tenancy).
- [ ] **GitHub Actions**:
  - Template de CI/CD para lint, test y build.

---

## 🔗 Dependencias de Módulos
- Ver [AUTH_TODO.md](./AUTH_TODO.md) para hardening de identidad.
- Ver [CLIENTS_TODO.md](./CLIENTS_TODO.md) para estandarización de CRUD.
- Ver [PLATFORM_TODO.md](./PLATFORM_TODO.md) para gestión administrativa.
