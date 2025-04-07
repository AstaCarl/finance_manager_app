import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { Category } from '../src/categories/entities/category.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../src/categories/categories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import { EntriesService } from '../src/entries/entries.service';
import { Entry } from '../src/entries/entities/entry.entity';
import { CreateCategoryDto } from '../src/categories/dto/create-category.dto';
import { UserEntity } from '../src/users/entities/user';
import { AuthService } from '../src/authentication/auth.service';

describe('EntriesService (e2e)', () => {
  let app: INestApplication;
  let categoriesService: CategoriesService;
  let entryRepository: Repository<Entry>;
  let entryService: EntriesService;
  let authRepository: Repository<UserEntity>;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    categoriesService = moduleFixture.get(CategoriesService);
    entryService = moduleFixture.get(EntriesService);
    entryRepository = moduleFixture.get(getRepositoryToken(Entry));
    authRepository = moduleFixture.get(getRepositoryToken(UserEntity));
    authService = moduleFixture.get(AuthService);
    entryRepository.query('DELETE FROM entry');
    authRepository.query('DELETE FROM user_entity');

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  // ************** Test the POST /entries endpoint ************** //

  it('/entries POST', async () => {
    // Arrange
    const user = await authService.signup({
      username: 'test',
      password: 'test',
    });

    const { access_token } = await authService.login(user);

    const category = { title: 'Food' };
    const createdCategory = await request(app.getHttpServer())
      .post('/categories')
      .set('Authorization', `Bearer ${access_token}`)
      .send(category)
      .expect(201);

    const categoryId = createdCategory.body.id;

    const entry = {
      description: 'test',
      amount: 20,
      date: '02/06/2024',
      category: categoryId,
    };
    const { body } = await request(app.getHttpServer())
      .post('/entries')
      .set('Authorization', `Bearer ${access_token}`)
      .send(entry)
      .expect(201);

    expect(body.id).toBeDefined();
    expect(body.description).toEqual('test');
    expect(body.amount).toEqual(20);
    expect(body.date).toEqual('02/06/2024');
    expect(body.category).toEqual(categoryId);
  });

  // ************** Test the GET /entries/user endpoint ************** //

  it('/entries/user (GET) gets all entries for the user', async () => {
    // Arrange
    // Setup first user and create a category to create an entry
    const user = await authService.signup({
      username: 'test',
      password: 'test',
    });

    const { access_token } = await authService.login(user);

    const category = { title: 'Food' };
    const createdCategory = await request(app.getHttpServer())
      .post('/categories')
      .set('Authorization', `Bearer ${access_token}`)
      .send(category)
      .expect(201);

    const categoryId = createdCategory.body.id;

    const entry = {
      description: 'Entry',
      amount: 20,
      date: '02/06/2024',
      category: categoryId,
    };

    const createdEntry = await request(app.getHttpServer())
      .post('/entries')
      .set('Authorization', `Bearer ${access_token}`)
      .send(entry)
      .expect(201);

    // Setup second user and create a category to create an entry
    const otherUser = await authService.signup({
      username: 'test2',
      password: 'test2',
    });

    const { access_token: other_access_token } =
      await authService.login(otherUser);

    const otherEntry = {
      description: 'Other Entry',
      amount: 20,
      date: '02/06/2024',
      category: categoryId,
    };
    const otherCreatedEntry = await request(app.getHttpServer())
      .post('/entries')
      .set('Authorization', `Bearer ${other_access_token}`)
      .send(otherEntry)
      .expect(201);

    // Act
    const { body } = await request(app.getHttpServer())
      .get('/entries/user')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);

    expect(body.length).toEqual(1);
    expect(body[0].description).toEqual('Entry');
  });

  // ************** Test the DELETE /entries/:id endpoint ************** //

  it('/entries DELETE', async () => {
    // Arrange - create a user, category and entry
    const user = await authService.signup({
      username: 'test',
      password: 'test',
    });

    const { access_token } = await authService.login(user);

    const category = { title: 'Food' };
    const createdCategory = await request(app.getHttpServer())
      .post('/categories')
      .set('Authorization', `Bearer ${access_token}`)
      .send(category)
      .expect(201);

    const categoryId = createdCategory.body.id;

    const entry = {
      description: 'entry',
      amount: 20,
      date: '02/06/2024',
      category: categoryId,
    };
    const createdEntry = await request(app.getHttpServer())
      .post('/entries')
      .set('Authorization', `Bearer ${access_token}`)
      .send(entry)
      .expect(201);

    // Act - delete the entry
    await request(app.getHttpServer())
      .delete(`/entries/${createdEntry.body.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);

     request(app.getHttpServer())
      .get('/entries/user')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);

      // Assert that the entry was deleted
    const response = await request(app.getHttpServer())
      .get('/entries/user')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);

    expect(response.body.length).toEqual(0);
  });
});
