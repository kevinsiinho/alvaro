import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Anteproyecto, AnteproyectoRelations} from '../models';

export class AnteproyectoRepository extends DefaultCrudRepository<
  Anteproyecto,
  typeof Anteproyecto.prototype.id,
  AnteproyectoRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Anteproyecto, dataSource);
  }
}
