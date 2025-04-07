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
import { UserEntity } from '../src/users/entities/user';
import { AuthService } from '../src/authentication/auth.service';

let app: INestApplication;
let categoriesService: CategoriesService;
let categoriesRepository: Repository<Category>;
let authRepository: Repository<UserEntity>;
let authService: AuthService;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  categoriesService = moduleFixture.get(CategoriesService);
  authRepository = moduleFixture.get(getRepositoryToken(UserEntity));
  categoriesRepository = moduleFixture.get(getRepositoryToken(Category));
  authService = moduleFixture.get(AuthService);
  await categoriesRepository.query('DELETE FROM category');
  await authRepository.query('DELETE FROM user_entity');

  await app.init();
});

afterEach(async () => {
  await app.close();
});

it('/categories POST', async () => {
  // Arrange create a user and log in
  const user = await authService.signup({
    username: 'test',
    password: 'test',
  });

  const { access_token } = await authService.login(user);

  // Create a category
  const category = { title: 'test' };
  const { body } = await request(app.getHttpServer())
    .post('/categories')
    .set('Authorization', `Bearer ${access_token}`)
    .send(category)
    .expect(201);

  // Assert the category was created
  expect(body.title).toEqual('test');
  expect(body.user.id).toEqual(user.id);
  expect(body.id).toBeDefined();
});

it('/categories/user (GET)', async () => {
  // Arrange create a user and log in and create a category
  const user = await authService.signup({
    username: 'test',
    password: 'test',
  });

  const { access_token } = await authService.login(user);

  const category = { title: 'test' };
  const createdCategory = await request(app.getHttpServer())
    .post('/categories')
    .set('Authorization', `Bearer ${access_token}`)
    .send(category)
    .expect(201);

  // Create a second user and log in and create a category

  const otherUser = await authService.signup({
    username: 'test2',
    password: 'test2',
  });

  const { access_token: other_access_token } =
    await authService.login(otherUser);

  const otherCategory = { title: 'test2' };
  const otherCreatedCategory = await request(app.getHttpServer())
    .post('/categories')
    .set('Authorization', `Bearer ${other_access_token}`)
    .send(otherCategory)
    .expect(201);

  const { body } = await request(app.getHttpServer())
      .get('/categories/user')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);

      expect(body.length).toEqual(1);
      expect(body[0].title).toEqual('test');
});
