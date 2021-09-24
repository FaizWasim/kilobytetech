import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  token = ''
  queryClientId = ''
  document = ''
  fileToUpload;
  financialYear = "2020-2021"
  financialYearList = ["2020-2021", "2021-2022", "2022-2023"]
  financialMonthList = ["Jan", "Feb", "March", "April", "May", "June", "Aug", "July", "Oct", "Nov", "Dec"]

  constructor(private activeRoute: ActivatedRoute,
    private service: ServiceService) { }

  ngOnInit(): void {
    this.queryClientId = this.activeRoute.snapshot.queryParams.clientID
    this.token = sessionStorage.getItem("token");
    console.log(this.token)
    console.log(this.queryClientId)
    this.viewComapanyDetail()
  }
  viewComapanyDetail() {
    this.service.viewCompanyDetail(this.token, this.queryClientId, this.financialYear).subscribe(data => {
      console.log(data)
      this.document = data.records
    }, error => {
      console.log(error)
    })
  }
  handleFileInput(files: FileList, documentId) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
    console.log(this.fileToUpload.name);
    console.log(documentId);
    this.service.uploadFile(this.token, this.fileToUpload.name, documentId).subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error)
    })
  }
  selectFinancialYear(event) {
    this.financialYear = event.target.value
    this.viewComapanyDetail()
  }
}
