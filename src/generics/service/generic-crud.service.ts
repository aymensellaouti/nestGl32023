import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { HasIdInterface } from "../interface/has-id.interface";

@Injectable()
export class GenericCrudService<Entity extends HasIdInterface> {
  constructor(private repository: Repository<Entity>) {}
  create(entity): Promise<Entity> {
    return this.repository.save(entity);
  }
  async update(id, entity): Promise<Entity> {
    const result = await this.repository.preload({id, ...entity});
    if (!result) {
      throw new NotFoundException('result innexistant');
    }
    return this.repository.save(result);
  }
  remove(id): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
  softDelete(id): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }
  restore(id): Promise<UpdateResult> {
    return this.repository.restore(id);
  }
  findAll(): Promise<Entity[]> {
    return this.repository.find();
  }
  async findOne(id): Promise<Entity>{
    const element = await this.repository.findOne({ where: {id: id}})
    if (!element) {
      throw new NotFoundException('Innexistant');
    }
    return element;
  }
}
