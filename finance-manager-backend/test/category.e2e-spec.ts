import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { CategoriesModule } from '../src/categories/categories.module';
import { Category } from '../src/categories/entities/category.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../src/categories/categories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';

describe('CategoriesService (e2e)', () => {
  let app: INestApplication<App>;
  let service: CategoriesService;
  let repository: jest.Mocked<Partial<Repository<Category>>>;

  beforeEach(async () => {
    repository = {
      find: jest.fn().mockResolvedValue([
        { id: 1, title: 'test1' },
        { id: 2, title: 'test2' },
      ]),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Category),
          useValue: repository,
        },
        CategoriesService,
      ],
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should create a new category', async () => {
    const category = { title: 'test' };
    const { body } = await request(app.getHttpServer())
      .post('/categories')
      .send(category)
      .expect(201);

      expect(body.title).toEqual('test');
  });

    it('/categories (GET)', () => {
      return request(app.getHttpServer()).get('/categories').expect(200);
    });
});
