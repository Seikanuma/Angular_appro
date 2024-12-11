import { Component, inject } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ArticlesComponent } from "./articles/articles.component";
import { StepComponent, StepperComponent } from 'tw-stepper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, ArticlesComponent, StepperComponent, StepComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  protected service = inject(ArticleService);

  private route = inject(ActivatedRoute);

  data = this.route.data.
    pipe(
      map(({ articles }) => articles));
}