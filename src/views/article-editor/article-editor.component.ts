import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractFormComponent } from '../../tools/abstract-form';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-article-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './article-editor.component.html',
  styleUrl: './article-editor.component.css'
})
export class ArticleEditorComponent extends AbstractFormComponent {
  form: FormGroup = new FormGroup<any>({
    id: new FormControl(0),
    src: new FormControl("", { validators: [Validators.required] }),
    titre: new FormControl("", { validators: [Validators.required] }),
    prix: new FormControl("", { validators: [Validators.required] }),
    description: new FormControl("", { validators: [Validators.required] }),
  });
  constructor(private service: ArticleService, private router: Router, route: ActivatedRoute) {
    super();
    route.paramMap.subscribe(param => {
      const id: number = +param.get('id')!;
      service.byId(id).subscribe({
        next: result => this.form.patchValue(result),
        complete: () => console.log("Fin des appels"),
        error: e => this.form.reset()
      });
    });
  }

  onSubmit$(): void {
    this.service[this.form.value.id ? 'update' : 'save'](this.form.value)
      .subscribe(() => this.router.navigate(['/home']))
  }
}
