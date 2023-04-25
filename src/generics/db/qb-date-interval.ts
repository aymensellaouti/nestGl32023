import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";

export function qbDatenterval<Entity>(qb: SelectQueryBuilder<Entity>, dateName, dateMin?: Date, dateMax?: Date) {
  if (dateMin) {
    qb.andWhere(`${dateName} >= :dateMin`,{dateMin});
  }
  if (dateMax) {
    qb.andWhere(`${dateName} <= :dateMax`,{dateMax});
  }
}
