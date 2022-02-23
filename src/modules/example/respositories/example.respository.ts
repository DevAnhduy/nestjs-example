import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import {
//   DeepPartial,
//   DeleteResult,
//   EntityManager,
//   EntitySchema,
//   FindConditions,
//   FindManyOptions,
//   FindOneOptions,
//   InsertResult,
//   ObjectID,
//   QueryRunner,
//   RemoveOptions,
//   Repository,
//   SaveOptions,
//   UpdateResult,
// } from 'typeorm';
// import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ExampleEntity } from '../entity/example.entity';

import { BaseRepository } from 'src/common/respositories/base.respository';

@Injectable()
export class ExampleRepository implements BaseRepository<ExampleEntity> {}
