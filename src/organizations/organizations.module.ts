import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { OrganizationSchema } from '../schemas/organization.schema';
import { UsersModule } from 'src/users/users.module';
import { UserSchema } from 'src/schemas/users.schemas';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Organization', schema: OrganizationSchema}, {name: 'User', schema: UserSchema}])],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, UsersModule],
  exports: [OrganizationsService],
})

export class OrganizationsModule {}
