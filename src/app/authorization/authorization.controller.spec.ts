import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { AuthorizationDto } from './dto/authorization.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthorizationController', () => {
  let controller: AuthorizationController;
  let service: AuthorizationService;

  const mockAuthorizationService = {
    authorization: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorizationController],
      providers: [
        {
          provide: AuthorizationService,
          useValue: mockAuthorizationService,
        },
      ],
    }).compile();

    controller = module.get<AuthorizationController>(AuthorizationController);
    service = module.get<AuthorizationService>(AuthorizationService);
  });

  describe('authorization', () => {
    it('should return a token and user name on successful authorization', async () => {
      const authorizationDto: AuthorizationDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const result = {
        access_token: 'token',
        name: 'Test User',
      };

      mockAuthorizationService.authorization.mockResolvedValue(result);

      expect(await controller.authorization(authorizationDto)).toBe(result);
    });

    it('should throw an Unauthorized exception if authorization fails', async () => {
      const authorizationDto: AuthorizationDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      mockAuthorizationService.authorization.mockRejectedValue(
        new HttpException('Unauthorization', HttpStatus.UNAUTHORIZED),
      );

      await expect(controller.authorization(authorizationDto)).rejects.toThrow(HttpException);
    });
  });
});
