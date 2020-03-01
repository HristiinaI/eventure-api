import { Test, TestingModule } from '@nestjs/testing';
import { KanbanController } from './kanban.controller';

describe('Kanban Controller', () => {
  let controller: KanbanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KanbanController],
    }).compile();

    controller = module.get<KanbanController>(KanbanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
