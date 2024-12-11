import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ArticleService } from '../services/article.service';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"  // Demande au router de s'assurer que l'URL "complete" dans le navigateur est exactement la même que le path de cette route 
    },
    {
        path: "home",
        loadComponent: () => import('../views/home/home.component')
            .then(m => m.HomeComponent),
        resolve: {
            articles: () => inject(ArticleService).all()
        }
    },
    {
        path: "register",
        loadComponent: () => import('../views/register/register.component')
            .then(m => m.RegisterComponent)
    },
    {
        path: "editor/:id",
        loadComponent: () => import('../views/article-editor/article-editor.component')
            .then(m => m.ArticleEditorComponent),
    },

    {
        path: "login",
        loadComponent: () => import('../views/login/login.component')
            .then(m => m.LoginComponent)
    },

    {
        path: "list",
        loadComponent: () => import('../views/list/list.component')
            .then(m => m.ListComponent),
        resolve: {
            articles: () => inject(ArticleService).all()
        }
    },
];