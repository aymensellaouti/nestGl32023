import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";

export function paginate<Entity>(qb: SelectQueryBuilder<Entity>,
                                 page: number = 1,
                                 nb: number = 10) {
  if (nb) {
    if (!page) page = 1;
    qb.skip((page - 1) * nb);
    qb.take(nb);
  }
}
