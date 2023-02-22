interface BaseDao<T, K> {
  loadAll: () => Promise<Array<T>>;
  get: (id: K) => Promise<T>;
  save: (entity: T) => Promise<T>;
  update: (entity: T) => Promise<T>;
  delete: (entity: T) => Promise<T>;
}

export default BaseDao;
