interface BaseDao<T> {
  loadAll: () => Array<T>;
  get: (id: string | number) => T;
  save: (entity: T) => T;
  update: (entity: T) => T;
  delete: (entity: T) => T;
}
