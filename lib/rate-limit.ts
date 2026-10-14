/**
 * Límite de solicitudes en memoria (ventana fija por clave).
 *
 * En Vercel cada instancia tiene su propia memoria: frena envíos repetidos desde
 * una misma IP, pero no es un límite global. Para uno global hace falta un almacén
 * compartido (p. ej. Redis).
 */

interface Bucket {
  count: number;
  resetAt: number;
}

export function createRateLimiter({ limit, windowMs, maxKeys = 5_000 }: { limit: number; windowMs: number; maxKeys?: number }) {
  const buckets = new Map<string, Bucket>();

  /** Registra un intento y devuelve false si la clave superó el límite. */
  return function allow(key: string, now = Date.now()) {
    const bucket = buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      if (buckets.size >= maxKeys) {
        for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
        if (buckets.size >= maxKeys) buckets.clear();
      }
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }
    bucket.count += 1;
    return bucket.count <= limit;
  };
}
