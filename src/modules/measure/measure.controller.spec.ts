import { Test, TestingModule } from '@nestjs/testing';
import { MeasureController } from './measure.controller';
import { MeasureService } from './measure.service';

describe('MeasureController', () => {
  let controller: MeasureController;

  const mockMeasureService = {
    listMeasures: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasureController],
      providers: [
        {
          provide: MeasureService,
          useValue: mockMeasureService,
        },
      ],
    }).compile();

    controller = module.get<MeasureController>(MeasureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an empty array', async () => {
    jest.spyOn(mockMeasureService, 'listMeasures').mockReturnValue([]);

    const result = await controller.listMeasures('dfdf', {
      measure_type: 'WATER',
    });

    expect(mockMeasureService.listMeasures).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('should retrun an array containing a water measure', async () => {
    const measure = {
      measure_uuid: 'sdfsdf',
      measure_datetime: '2024-08-29T18:33:35.000Z',
      measure_type: 'WATER',
      has_confirmed: true,
      image_url: 'sdfsdf',
    };

    jest.spyOn(mockMeasureService, 'listMeasures').mockReturnValue([measure]);

    const result = await controller.listMeasures('sdfsdfsdf', {
      measure_type: 'WATER',
    });

    expect(mockMeasureService.listMeasures).toHaveBeenCalled();
    expect(result).toEqual([measure]);
  });
});
