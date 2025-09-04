export class GenericRepository<T extends { id: string }> {
  private records: Map<string, T> = new Map();

  findAll(): T[] {
    return Array.from(this.records.values());
  }

  findById(id: string): T | undefined {
    return this.records.get(id);
  }

  create(entity: T): T {
    this.records.set(entity.id, entity);
    return entity;
  }

  update(id: string, updates: Partial<T>): T | undefined {
    const existing = this.records.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates } as T;
    this.records.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.records.delete(id);
  }
}
