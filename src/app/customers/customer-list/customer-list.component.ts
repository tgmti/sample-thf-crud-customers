import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { ThfTableColumn } from '@totvs/thf-ui/components/thf-table';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  private readonly url: string = 'https://sample-customers-api.herokuapp.com/api/thf-samples/v1/people';
  private customersSub: Subscription;

  public readonly columns: ThfTableColumn = [
    { property: 'name' },
    { property: 'nickname' },
    { property: 'email', type: 'link', action: this.sendMail.bind(this) },
    { property: 'birthdate', type: 'date', format: 'dd/MM/yyyy', width: '100px' },
    { property: 'genre', type: 'subtitle', width: '80px', subtitles: [
      { value: 'Female', color: 'color-05', content: 'F', label: 'Feminino' },
      { value: 'Male', color: 'color-02', content: 'M', label: 'Masculino' },
      { value: 'Other', color: 'color-08', content: 'O', label: 'Outros' },
    ]},
    { property: 'city' },
    { property: 'status', type: 'label', labels: [
      { value: 'Active', color: 'success', label: 'Ativo' },
      { value: 'Inactive', color: 'danger', label: 'Inativo' }
    ]}
  ];

  public customers: Array<any> = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.customersSub = this.httpClient.get(this.url)
      .subscribe((response: { hasNext: boolean, items: Array<any>}) => {
        this.customers = response.items;
      });
  }

  ngOnDestroy() {
    this.customersSub.unsubscribe();
  }

  private sendMail(email, customer) {
    const body = `Olá ${customer.name}, gostariamos de agradecer seu contato.`;
    const subject = 'Contato';

    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_self');
  }

}
