import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Subject } from "rxjs";

@Injectable()
export class AppPaginatorIntl implements MatPaginatorIntl{
    changes = new Subject<void>()

    itemsPerPageLabel = ''
    nextPageLabel = 'Следующая страница' 
    previousPageLabel = 'Предыдущая страница' 
    firstPageLabel = 'Первая страница'
    lastPageLabel = 'Последняя страница'
    
    getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return 'Страница 1 из 1';
          }
          const amountPages = Math.ceil(length / pageSize);
          return `${page + 1} из ${amountPages}`;
    }




}