import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AbstractService } from '../tools/abstract-service';
import { Article } from '../views/home/articles/article';

@Injectable({ // comme le @Bean en java 
    providedIn: 'root'
})
export class ArticleService extends AbstractService<Article> {
    protected readonly ENDPOINT: string = 'http://localhost:3000/articles'
}