# 🧪 Test Platform Login -- Postman

## 📌 Endpoint probado

POST http://localhost:3002/api/v1/platform/auth/login

------------------------------------------------------------------------

## 📤 Request

### Body (JSON)

{ "email": "root@platform.com", "password": "admiRoot123!" }

------------------------------------------------------------------------

## 📥 Response

### Status Code

401 Unauthorized

### Response Body

{ "message": "Invalid platform credentials", "error": "Unauthorized",
"statusCode": 401 }

------------------------------------------------------------------------

# 🔍 Qué significa el error

El backend:

-   ✔ Recibió correctamente la request
-   ✔ Entró al endpoint `/platform/auth/login`
-   ✔ Ejecutó `AuthService.loginPlatform()`
-   ❌ No encontró un usuario SUPER_ADMIN válido o
-   ❌ La contraseña no coincide con el hash almacenado

------------------------------------------------------------------------

# 🧠 Posibles causas

1.  La contraseña enviada no coincide con la del seed.
2.  El usuario SUPER_ADMIN no existe en la base.
3.  El role del usuario no es `SUPER_ADMIN`.
4.  `isActive` está en `false`.

------------------------------------------------------------------------

# ✅ Cómo verificar

## Confirmar usuario en DB

SELECT email, role, "tenantId", "isActive" FROM "User" WHERE email =
'root@platform.com';

Debe devolver:

-   role = SUPER_ADMIN
-   tenantId = NULL
-   isActive = true

------------------------------------------------------------------------

## Confirmar contraseña correcta

Probar con la password exacta usada en el seed, por ejemplo:

{ "email": "root@platform.com", "password": "Root123!" }

------------------------------------------------------------------------

# 🎯 Resultado esperado (si todo está correcto)

Status:

200 OK

Body:

{ "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }

Y se debería setear la cookie de refresh automáticamente.

------------------------------------------------------------------------

# 🏁 Conclusión

El 401 indica que el endpoint funciona correctamente, pero las
credenciales no coinciden con lo almacenado en la base de datos.
