import { Module } from '@nestjs/common';
import { KanbanService } from './kanban.service';

@Module({
  providers: [KanbanService]
})
export class KanbanModule {}
