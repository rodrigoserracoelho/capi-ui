import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from './api.service';
import { SwaggerUIBundle, HideTopbarPlugin } from "swagger-ui-dist";

@Component({
  selector: 'app-apis',
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.css']
})
export class ApisComponent implements OnInit {

  showThrottlingPolicies: boolean = false;
  showBlockIfInError: boolean = false;
  showSwaggerDefinition: boolean = false;
  swaggerEndpointToLoad: string;
  apiFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.apiFormGroup = this.formBuilder.group({
      apiName: [null, [Validators.required]],
      apiContext: [null, [Validators.required]],
      endpointType: [null, [Validators.required]],
      secured: [null, [Validators.required]],
      swaggerEndpoint: [null, [Validators.required]],
      throttlingPolicies: [null, [Validators.required]],
      maxCallsAllowed: [null],
      applyPerPath: [null],
      periodForMaxCalls: [null],
      blockIfInError: [null],
      maxAllowedFailedCalls: [null],
      unblockAfter: [null],
      unblockAfterMinutes: [null]
    });
    this.onChanges();
  }

  onChanges(): void {
    this.apiFormGroup.valueChanges.subscribe(val => {

      if (val.throttlingPolicies) {
        this.showThrottlingPolicies = true;
      } else {
        this.showThrottlingPolicies = false;
      }

      if (val.blockIfInError) {
        this.showBlockIfInError = true;
      } else {
        this.showBlockIfInError = false;
      }

      if (val.swaggerEndpoint != null) {
        this.swaggerEndpointToLoad = val.swaggerEndpoint;
      }
    });
  }

  previewSwagger(): void {
    this.showSwaggerDefinition = true;
    const ui = SwaggerUIBundle({
      url: this.swaggerEndpointToLoad,
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset
      ],
      plugins: [
        HideTopbarPlugin
      ]
    });

  }

  onSubmit() {
    this.apiService.getApis()
      .subscribe(data => {
        console.log(data);
      });


    console.log(this.apiFormGroup.value);
  }

}