import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'test-apis',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit { 

  private result: String;
  private errorResult: String;
  private callWithError: boolean;

  private testFormGroup: FormGroup;
  private control: FormControl;

  constructor(private formBuilder: FormBuilder, private testService: TestService) { }

  ngOnInit() {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.control = this.formBuilder.control('', Validators.required);
    
    this.testFormGroup = this.formBuilder.group({
      apiEndpoint: [null, [Validators.pattern(urlRegex), Validators.pattern(urlRegex)]]
    });
  }

  callAPI() {
    this.testService.getLicenses(this.testFormGroup.get('apiEndpoint').value)
    .subscribe(data => {
      "licenses" in data ? this.callWithError = false : this.callWithError = true;
      if(this.callWithError) {
        this.errorResult = JSON.stringify(data, undefined, 2);
      } else {
        this.result = JSON.stringify(data, undefined, 2);
      }    
    });
  }
}