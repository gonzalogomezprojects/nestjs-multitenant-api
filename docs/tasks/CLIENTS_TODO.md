# 🧩 CLIENTS MODULE -- TODO TRACKER

Estado actual: módulo básico funcional con creación multi-tenant.

------------------------------------------------------------------------

# ✅ COMPLETADO

-   [x] Crear Client
-   [x] Asociar automáticamente tenantId desde JWT
-   [x] Proteger endpoints con JwtAuthGuard
-   [x] Proteger endpoints con TenantMatchGuard
-   [x] Decorator @CurrentTenant()
-   [x] Validación con DTO (class-validator)
-   [x] Multi-tenant isolation funcionando
-   [x] Endpoint POST /clients operativo
-   [x] Endpoint GET /clients básico

------------------------------------------------------------------------

# 🟡 EN PROGRESO / MEJORAS INMEDIATAS

-   [ ] Paginación profesional (total, totalPages, meta)
-   [ ] Filtro por búsqueda (name/email)
-   [ ] Orden dinámico (createdAt, name)
-   [ ] Unique email por tenant (@@unique(\[tenantId, email\]))
-   [ ] Manejo elegante de error de duplicado
-   [ ] Endpoint GET /clients/:id
-   [ ] Endpoint PATCH /clients/:id
-   [ ] Validar que el cliente pertenezca al tenant

------------------------------------------------------------------------

# 🟠 MEJORAS NIVEL SAAS PROFESIONAL

-   [ ] Soft delete (isActive)
-   [ ] Endpoint DELETE lógico (soft delete)
-   [ ] Restaurar cliente eliminado
-   [ ] Auditoría (createdBy, updatedBy)
-   [ ] Logging estructurado de cambios
-   [ ] Validación de formato teléfono avanzada
-   [ ] Validación dominio email opcional

------------------------------------------------------------------------

# 🔵 MÉTRICAS Y NEGOCIO

-   [ ] Endpoint GET /clients/:id/stats
-   [ ] Total órdenes del cliente
-   [ ] Total facturado (sum totalCents)
-   [ ] Tickets abiertos
-   [ ] Última actividad
-   [ ] Endpoint GET /clients/stats (global tenant)

------------------------------------------------------------------------

# 🛡 SEGURIDAD

-   [ ] Rate limit en creación masiva
-   [ ] Validar SUPER_ADMIN no use endpoints tenant
-   [ ] Tests de aislamiento cross-tenant
-   [ ] Tests e2e clients

------------------------------------------------------------------------

# 🧪 TESTING

-   [ ] Unit test ClientsService
-   [ ] e2e create client
-   [ ] e2e isolation test
-   [ ] e2e validation errors

------------------------------------------------------------------------

# 🚀 FUTURO (ESCALABLE)

-   [ ] Tags para clientes
-   [ ] Segmentación
-   [ ] Historial de actividad
-   [ ] Export CSV
-   [ ] Import masivo CSV
-   [ ] Búsqueda full-text (Postgres)

------------------------------------------------------------------------

# 🏁 OBJETIVO FINAL

✔ Módulo Clients robusto\
✔ Multi-tenant seguro\
✔ Preparado para métricas y facturación\
✔ Escalable para dashboard SaaS\
✔ Listo para inversión
