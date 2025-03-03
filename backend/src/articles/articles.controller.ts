import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesDto } from './dto/articles.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('articles')
export class ArticlesController {

    constructor(private articlesService: ArticlesService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() dto: ArticlesDto) {
        return this.articlesService.create(dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    read() {
        return this.articlesService.read();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id_article')
    async find(
        @Param('id_article') id_article: string
    ) {

        const result = await this.articlesService.find(+id_article);
        return result;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id_article')
    async update(
        @Param('id_article') id_article: string,
        @Body() dto: ArticlesDto
    ) {

        const result = await this.articlesService.update(+id_article, dto);
        return result;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id_article')
    async delete(@Param('id_article') id_article: string) {

        const result = await this.articlesService.delete(+id_article);
        return result;
    }
}
