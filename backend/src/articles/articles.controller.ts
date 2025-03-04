import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesDto } from './dto/articles.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('articles')
export class ArticlesController {

    // inject the article service into the controller as a dependency
    constructor(private articlesService: ArticlesService) { }


    // endpoints for create a new article
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() dto: ArticlesDto) {
        return this.articlesService.create(dto);
    }


    // endpoints for get all articles
    @UseGuards(AuthGuard('jwt'))
    @Get()
    read() {
        return this.articlesService.read();
    }


    // endpoints for get one article with id_article
    @UseGuards(AuthGuard('jwt'))
    @Get(':id_article')
    async find(
        @Param('id_article') id_article: string
    ) {

        const result = await this.articlesService.find(+id_article);
        return result;
    }


    // endpoints for update article 
    @UseGuards(AuthGuard('jwt'))
    @Put(':id_article')
    async update(
        @Param('id_article') id_article: string,
        @Body() dto: ArticlesDto
    ) {

        const result = await this.articlesService.update(+id_article, dto);
        return result;
    }


    // endpoints for delete one article
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id_article')
    async delete(@Param('id_article') id_article: string) {

        const result = await this.articlesService.delete(+id_article);
        return result;
    }
}
