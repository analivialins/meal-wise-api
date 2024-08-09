import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../../database/user/user.entity';


describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            updateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
        const createUserDto: CreateUserDto = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            informations: {
              weight: '70kg',
              height: '175cm',
              currentWeight: '70kg',
              goalWeight: '65kg'
            }
          };
          

      const result: UserEntity = {
        id: 'uuid',
        ...createUserDto,
      } as UserEntity;

      jest.spyOn(userService, 'createUser').mockResolvedValue(result);

      expect(await userController.createUser(createUserDto)).toEqual(result);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const updateData: Partial<CreateUserDto> = {
        informations: {
          weight: '75kg',
          height: '180cm',
          currentWeight: '72kg',
          goalWeight: '70kg',
        },
      };

      const result: UserEntity = {
        id: 'uuid',
        name: 'John Doe',
        password: 'hashedpassword',
        ...updateData,
      } as UserEntity;

      jest.spyOn(userService, 'updateUser').mockResolvedValue(result);

      expect(await userController.updateUser('uuid', updateData)).toEqual(result);
    });
  });
});

