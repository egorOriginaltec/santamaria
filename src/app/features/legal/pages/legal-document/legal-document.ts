import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CONTACT_FORM_EMAIL, LEGAL_NAV } from '@core/index';
import { map } from 'rxjs';
import { legalDocument } from '../../data/legal.documents';

@Component({
  selector: 'app-legal-document',
  imports: [RouterLink],
  templateUrl: './legal-document.html',
  styleUrl: './legal-document.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalDocumentPage {
  private readonly route = inject(ActivatedRoute);

  readonly email = CONTACT_FORM_EMAIL;

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug'))),
    { initialValue: this.route.snapshot.paramMap.get('slug') },
  );

  readonly doc = computed(() => legalDocument(this.slug()));

  readonly otherDocs = computed(() => {
    const current = this.slug();
    return LEGAL_NAV.filter((item) => item.slug !== current);
  });
}
