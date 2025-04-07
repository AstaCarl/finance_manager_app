import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { AuthService } from '../src/authentication/auth.service';
import { UserEntity } from '../src/users/entities/user';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Auth controller (e2e)', () => {
  let app: INestApplication<App>;
  let authService: AuthService;
  let authRepository: Repository<UserEntity>;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    authService = moduleFixture.get(AuthService);
    authRepository = moduleFixture.get(getRepositoryToken(UserEntity));
    userRepository = moduleFixture.get(getRepositoryToken(UserEntity));
    authRepository.query('DELETE FROM user_entity');

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('Should sign up a new user (POST)', async () => {
    // Arrange
    const newUser = { username: 'test', password: 'test' };

    const { body } = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(newUser)
      .expect(201);

    expect(body.id).toBeDefined();
    expect(body.username).toEqual('test');
  });

  it('Should log in a user (POST)', async () => {
    // Arrange
    const user = { username: 'test', password: 'test' };
    await authService.signup(user);

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test', password: 'test' })
      .expect(201);

    expect(body.access_token).toBeDefined();
  });
});
