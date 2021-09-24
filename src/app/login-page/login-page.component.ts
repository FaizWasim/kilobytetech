import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  title = 'assignment';
  showLoader = false;
  pageToShow = " ";
  errorMessage = ''
  clients = ''
  pageNo = 20;
  size = 1
  pageNoCount = [10, 20, 30, 40]
  sizeCount = [1, 2, 3]
  token;
  loginForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
  })
  constructor(private service: ServiceService, private router: Router) { }
  ngOnInit() {
    this.pageToShow = "loginPage"
  }
  changePageSize(event) {
    this.pageNo = event.target.value
    console.log(event)
    this.getAllExistingClients()
  }
  changeSize(event) {
    console.log(event)
    this.size = event.target.value
    this.getAllExistingClients()
  }
  submitLoginForm(form) {
    this.errorMessage = ''
    this.showLoader = true;
    console.log(form.value.userName)
    console.log(form.value.password)
    let postData = {
      "email": form.value.userName,
      "password": form.value.password
    }
    this.service.logIn(postData).subscribe(data => {
      console.log(data)
      sessionStorage.setItem("token", data.token)
      this.getAllExistingClients()
      this.showLoader = false;

    }, error => {
      this.showLoader = false;
      console.log(error)
      this.errorMessage = error.error.reason
    })

  }
  getAllExistingClients() {
    this.token = sessionStorage.getItem('token')
    this.service.getAllExistingClients(this.token, this.pageNo, this.size).subscribe(data => {
      console.log(data)
      this.clients = data.records
      this.pageToShow = "secondPage"
    }, error => {
      console.log(error)
    })
  }
  goToCompanyDetail(clientId, financialYear) {
    console.log(clientId)
    console.log(financialYear)
    this.router.navigate(['/', 'company'], { queryParams: { clientID: clientId } })
  }

}
