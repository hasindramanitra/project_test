import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArticlesDto } from './dto/articles.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticlesService {

    constructor(
        private prisma: PrismaService
    ) { }

    async create(dto: ArticlesDto) {

        try {

            await this.prisma.articles.create({
                data: {
                    id_article: dto.id_article,
                    name: dto.name,
                    quantity: dto.quantity
                }
            });

            return {
                "message": "Article created successfully."
            }
        } catch (error) {

            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Article already exist.');
                }
            }

            throw error;
        }
    }

    async read() {

        const articles = this.prisma.articles.findMany();

        if ((await articles).length === 0) {
            return { "message": "No article found in the database." }
        }

        return articles;
    }

    async find(
        id_article: number,
    ) {
        const article = await this.prisma.articles.findFirst({
            where: { id_article },
        });

        if (!article) {
            throw new Error('Article not found'); // You can throw a custom error if the article does not exist
        }

        return article;


    }

    async update(
        id_article: number,
        updateArticleDto: ArticlesDto
    ) {

        const article = await this.prisma.articles.findUnique({
            where: { id_article },
        });

        if (!article) {
            throw new Error('Article not found'); // You can throw a custom error if the article does not exist
        }

        await this.prisma.articles.update({
            where: { id_article },
            data: updateArticleDto,
        });

        return { message: 'Article updated successfully' };
    }

    async delete(id_article: number) {

        const article = await this.prisma.articles.findUnique({
            where: { id_article },
        });

        if (!article) {
            throw new Error('Article not found'); // You can throw a custom error if the article does not exist
        }

        await this.prisma.articles.delete({
            where: { id_article },
        });

        return { "message": "Article deleted successfully." }
    }
}
