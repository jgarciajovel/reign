import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsModule } from './news/news.module';
import { NewsController } from './news/news.controller';

@Module({
  imports: [
    NewsModule,
    MongooseModule.forRoot('mongodb+srv://reign:reign09@cluster0.69zj6.mongodb.net/reign?retryWrites=true&w=majority'),
  ],
  controllers: [AppController, NewsController],
  providers: [AppService],
})
export class AppModule {}
