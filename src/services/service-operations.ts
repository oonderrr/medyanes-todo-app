/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/lib/prisma';
import { tryCatch } from '@/utils/try-catch';

// GET ALL
export async function getAllData(tableName: string) {
  const { data, error } = await tryCatch((prisma as any)[tableName].findMany());
  return { data, error };
}

// POST
export async function createData(tableName: string, newData: unknown) {
  const { data, error } = await tryCatch(
    (prisma as any)[tableName].create({ data: newData }),
  );
  return { data, error };
}

// PUT
export async function updateData(
  tableName: string,
  where: unknown,
  newData: unknown,
) {
  const { data, error } = await tryCatch(
    (prisma as any)[tableName].update({ where, data: newData }),
  );
  return { data, error };
}

// DELETE
export async function deleteData(tableName: string, id: string) {
  const { data, error } = await tryCatch(
    (prisma as any)[tableName].delete({ where: { id } }),
  );
  return { data, error };
}
