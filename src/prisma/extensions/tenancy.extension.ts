import { Prisma } from '@prisma/client';
import { TENANCY_ID, SKIP_TENANCY } from '../../common/tenancy/tenancy.constants';
import { ClsServiceManager } from 'nestjs-cls';

/**
 * Modelos que requieren aislamiento multi-tenant obligatorio.
 */
const MODELS_WITH_TENANCY = ['User', 'Client', 'Order', 'OrderItem', 'Ticket'];

export const tenancyExtension = Prisma.defineExtension({
  name: 'tenancy',
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        const cls = ClsServiceManager.getClsService();
        const tenantId = cls.get<string>(TENANCY_ID);
        const skipTenancy = cls.get<boolean>(SKIP_TENANCY);

        // Si no hay tenantId o se pide bypass, ejecutamos normal
        if (!tenantId || skipTenancy || !MODELS_WITH_TENANCY.includes(model)) {
          return query(args);
        }

        const anyArgs = args as any;

        // Operaciones de lectura y modificación masiva
        if (
          [
            'findFirst',
            'findMany',
            'findUnique',
            'update',
            'updateMany',
            'delete',
            'deleteMany',
            'count',
            'aggregate',
            'groupBy',
          ].includes(operation)
        ) {
          anyArgs.where = { ...anyArgs.where, tenantId };
        }

        // Operaciones de creación
        if (operation === 'create') {
          anyArgs.data = { ...anyArgs.data, tenantId };
        }

        if (operation === 'createMany') {
          if (Array.isArray(anyArgs.data)) {
            anyArgs.data = anyArgs.data.map((item) => ({
              ...item,
              tenantId,
            }));
          } else {
            anyArgs.data = { ...anyArgs.data, tenantId };
          }
        }

        // Upsert requiere inyectar en create, update y where
        if (operation === 'upsert') {
          anyArgs.where = { ...anyArgs.where, tenantId };
          anyArgs.create = { ...anyArgs.create, tenantId };
          anyArgs.update = { ...anyArgs.update, tenantId };
        }

        return query(anyArgs);
      },
    },
  },
});
