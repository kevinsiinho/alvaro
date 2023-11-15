import {Entity, model, property} from '@loopback/repository';

@model()
export class Anteproyecto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  items?: object[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  comentarios?: string[];

  @property({
    type: 'string',
    required: true,
  })
  iduser?: string;

  @property({
    type: 'string',
    required: true,
  })
  estado?: string;

  constructor(data?: Partial<Anteproyecto>) {
    super(data);
  }
}

export interface AnteproyectoRelations {
  // describe navigational properties here
}

export type AnteproyectoWithRelations = Anteproyecto & AnteproyectoRelations;
