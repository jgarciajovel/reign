import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { NewsCollection, NewsCollectionSchema } from "./news.schema";
import { NewsService } from "./news.service";
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([
            {
                name: NewsCollection.name,
                schema: NewsCollectionSchema,
                collection: 'news_collection'
            },
        ]),
    ],
    providers: [NewsService],
    exports: [NewsService],
})

export class NewsModule {}