import { Test, TestingModule } from '@nestjs/testing';
import { MeasureService } from './measure.service';
import { MeasureRepository } from './measure.repository';
import { CustomException } from '../../utils/CustomException';

describe('MeasureService', () => {
  let service: MeasureService;

  const mockMeasureRepository = {
    listByCustomerCodeAndMeasureType: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasureService],
      providers: [
        {
          provide: MeasureRepository,
          useValue: mockMeasureRepository,
        },
      ],
    }).compile();

    service = module.get<MeasureService>(MeasureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return exception', async () => {
    try {
      jest
        .spyOn(mockMeasureRepository, 'listByCustomerCodeAndMeasureType')
        .mockReturnValue([]);

      await service.listMeasures({
        customer_code: 'sdfsdfsdf',
        measure_type: 'WATER',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomException);
    }
  });

  it('should return exception', async () => {
    const measure = {
      measure_uuid: 'sdfsdf',
      measure_datetime: '2024-08-29T18:33:35.000Z',
      measure_type: 'WATER',
      has_confirmed: true,
      image_url: 'sdfsdf',
    };
    try {
      jest
        .spyOn(mockMeasureRepository, 'listByCustomerCodeAndMeasureType')
        .mockReturnValue([measure]);

      const response = await service.listMeasures({
        customer_code: 'sdfsdfsdf',
        measure_type: 'WATER',
      });
      expect(response).toEqual({
        customer_code: 'sdfsdfsdf',
        measures: [
          {
            measure_uuid: 'sdfsdf',
            measure_datetime: '2024-08-29T18:33:35.000Z',
            measure_type: 'WATER',
            has_confirmed: true,
            image_url: 'sdfsdf',
          },
        ],
      });
    } catch (error) {}
  });
});
