import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoaderService } from './../shared/services/loader/loader.service';
import { DocumentService } from '../shared/services/document/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  
  constructor(
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private documentService: DocumentService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.loaderService.setLoadingStatus(false);
    }, 500);
    const fileName = this.route.snapshot.paramMap.get('filename');

    // location.href = 'http://localhost:3000/upload/2.docx';
    this.documentService.getDocument(fileName)
    .subscribe(res => {
      console.log(res);
    })
    console.log(this.route.snapshot.paramMap.get('filename'));
  }

}
