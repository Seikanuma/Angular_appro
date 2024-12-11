import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  service = inject(ArticleService);
  private route = inject(ActivatedRoute);
  private http: HttpClient = inject(HttpClient)
  data = this.route.data.
    pipe(
      map(({ articles }) => articles));

  delete(id: any) {
    this.data = this.http.delete("/articles/" + id).pipe(switchMap(() => this.http.get("/articles")))
  }
}