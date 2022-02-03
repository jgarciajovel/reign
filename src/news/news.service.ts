import { Injectable } from '@nestjs/common';
import { map, firstValueFrom } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewsCollection, NewsDocument } from './news.schema';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class NewsService {
    constructor(
        @InjectModel(NewsCollection.name)
        private newsModel: Model<NewsDocument>,
        private httpService: HttpService
    ) {}

    async getNews() {
        let news = 
        firstValueFrom(this.httpService
            .get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
            .pipe(map((response) => response.data)));

        return news;
    }

    async findAll(): Promise<NewsCollection[]> {
        return this.newsModel.find().exec();
    }

    async pagination(page, search): Promise<NewsCollection[]> {
        let skip;

        (page == 1 || page == 0 || page == null) ? skip = page * 0 : skip = page * 10 - 10;

        type Query = {
            author: Object,
            title: Object,
            tags: Object,
        }

        let query = {} as Query;

        if (search.author) {
            query.author = { $regex: `.*${search.author}.*` };
        }

        if (search.title) {
            query.title = { $regex: `.*${search.title}.*` };;
        }

        if (search.tags) {
            let tags = search.tags.split(',');
            query.tags = { $all : tags};
        }

        console.log(query);

        return this.newsModel.find(query).skip(skip).limit(5).exec();
    }

    async create(article: any) {
        const news = new this.newsModel(article);
        return news.save();
    }

    async remove(id: string) {
        return await this.newsModel.deleteOne({_id: id});
    }

    async forcePopulate() {
        let response = await this.getNews();

        let news = response.hits;

        let new_articles = [];

        for (let index = 0; index < news.length; index++) {
            const article = news[index];

            const new_article = await this.create({
                title: article.story_title,
                created_at: article.created_at,
                url: article.url,
                author: article.author,
                points: article.points,
                story_text: article.story_text,
                comment_text: article.comment_text,
                story_id: article.story_id,
                parent_id: article.parent_id,
                highlightResult: article._highlightResult,
                tags: article._tags,
            });

            new_articles.push(new_article);
        }

        return new_articles;
    }

}
