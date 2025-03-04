import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArticlesDto } from './dto/articles.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticlesService {

    // Inject the prisma service as dependency
    constructor(
        private prisma: PrismaService
    ) { }

    /**
     * method to create a new article
     * @param dto 
     * @returns string
     */
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

    /**
     * method to return all articles 
     * @returns string | articles
     */
    async read() {

        const articles = this.prisma.articles.findMany();

        if ((await articles).length === 0) {
            return { "message": "No article found in the database." }
        }

        return articles;
    }

    /**
     * method to return one article
     * @param id_article 
     * @returns string | article
     */
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

    /**
     * method to update one article
     * @param id_article 
     * @param updateArticleDto 
     * @returns string
     */
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


    /**
     * method to delete one article
     * @param id_article 
     * @returns string
     */
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
