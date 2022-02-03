import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get('?')
    async findAll(
        @Query('page') page: number,
        @Query('title') title: string,
        @Query('author') author: string,
        @Query('tags') tags: string,
    ) {
        try {
            var search = {
                title: title,
                author: author,
                tags: tags,
            }
            const articles = await this.newsService.pagination(page, search);

            return {
                status: 'success',
                articles: articles,
                title: title,
                author: author,
                tags: tags,
            };
        } catch (error) {
            return {
                status: 'error',
                error: error,
            }
        }
    }

    @Get('populate')
    async forcePopulate() {
        try {
            let articles = await this.newsService.forcePopulate();

            return {
                status: 'success',
                articles: articles,
            };

        } catch (error) {
            return {
                status: 'error',
                error: error
            }
        }
    }

    @Delete('/:id')
    async remove(@Param() params) {
        try {
            let id = params.id;

            let article = await this.newsService.remove(id);

            return {
                status: 'success',
                article: article,
            }
        } catch (error) {
            return {
                status: 'error',
                error: error,
            }
        }
    }
}
