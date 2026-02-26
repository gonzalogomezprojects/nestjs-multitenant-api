# 🔐 AUTH MODULE – Production Hardening TODO

Estado actual:
✔ JWT access + refresh
✔ Refresh rotation
✔ Refresh reuse detection
✔ Hashing con argon2
✔ Multi-tenant payload
✔ Cookie httpOnly scoped

Objetivo:
Elevar el módulo de autenticación a nivel **production-grade SaaS multi-tenant**.

---

# 🔴 PRIORIDAD CRÍTICA (Seguridad)

## 1️⃣ Separar login Platform (SUPER_ADMIN)

- [X ] Crear endpoint `POST /platform/auth/login`
- [X] Permitir login sin `tenantId`
- [X ] Validar `role === SUPER_ADMIN`
- [X ] Mantener `/auth/login` exclusivo para tenant login

---

## 2️⃣ Validar expiración real en DB del refresh

En `AuthService.refresh()` agregar:

- [ ] Verificar `row.expiresAt < new Date()`
- [ ] Si expirado → revocar y lanzar error

---

## 3️⃣ Rate limiting en login

- [ ] Instalar `@nestjs/throttler`
- [ ] Limitar intentos de login (ej: 5 por minuto)
- [ ] Aplicar `@UseGuards(ThrottlerGuard)` en login

---

## 4️⃣ Validar usuario activo en refresh

- [ ] Buscar usuario por `payload.sub`
- [ ] Verificar `user.isActive === true`
- [ ] Bloquear si está deshabilitado

---

# 🟡 PRIORIDAD MEDIA (Nivel SaaS Profesional)

## 5️⃣ Token Versioning (Invalidación global)

En Prisma:

- [ ] Agregar `tokenVersion Int @default(0)` en `User`

En JWT:

- [ ] Incluir `tokenVersion` en payload
- [ ] Validar coincidencia en cada request

Permite:
- Logout global
- Invalidar sesiones tras cambio de contraseña
- Mitigar robo de token

---

## 6️⃣ Limpieza de refresh expirados

- [ ] Crear cron job diario
  o
- [ ] Limpiar en login / refresh

Ejemplo:

deleteMany where expiresAt < now


---

## 7️⃣ Logging estructurado de seguridad

Registrar eventos:

- [ ] Login fallido
- [ ] Refresh reuse detectado
- [ ] Revocación masiva
- [ ] Logout

---

# 🟢 PRIORIDAD ESTRATÉGICA (Nivel SaaS Avanzado)

## 8️⃣ Impersonation (SUPER_ADMIN → Tenant)

- [ ] Endpoint para impersonar usuario
- [ ] Emitir JWT especial con flag `impersonated: true`
- [ ] Loggear acción

---

## 9️⃣ Suspensión global de tenant

En Prisma:

- [ ] `isActive Boolean @default(true)` en Tenant

En TenantMatchGuard:

- [ ] Bloquear si `tenant.isActive === false`

---

## 🔟 Logout global

- [ ] Endpoint `POST /auth/logout-all`
- [ ] Revocar todos los refresh tokens del usuario

---

# 🧪 Testing

- [ ] Unit tests AuthService
- [ ] e2e login
- [ ] e2e refresh
- [ ] Test reuse detection
- [ ] Test tenant isolation

---

# 🏁 Resultado esperado

Al completar todo:

✔ Autenticación multi-tenant aislada
✔ Protección contra token reuse
✔ Protección contra brute force
✔ Invalidación global de sesiones
✔ Seguridad nivel SaaS enterprise
✔ Arquitectura lista para inversión

---

# 🧠 Futuro (Opcional)

- OAuth multi-tenant
- 2FA
- Gestión de sesiones activas por usuario
- Device binding
- IP binding opcional