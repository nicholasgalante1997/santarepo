import { getPool, runQuery } from "./postgres-driver";

namespace postgres {
  export const createPool = getPool;
  export const query = runQuery;
}

export default postgres;
export { postgres };
