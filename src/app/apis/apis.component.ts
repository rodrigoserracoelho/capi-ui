import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-apis',
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.css']
})
export class ApisComponent implements OnInit {
  
  myFormGroup:FormGroup;
  formTemplate = [
    {
      "type":"textBox",
      "label":"API Name"
    },
    {
      "type":"textBox",
      "label":"API Context"
    },
    {
      "type":"number",
      "label":"Age"
    },
    {
      "type":"select",
      "label":"Endpoint Type",
      "options":["", "HTTP","HTTPS"]
    
    }
  ];
  
  constructor(private formBuilder: FormBuilder) { 
      console.log("HOME...............................................");
  }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      apiName: [null, [Validators.required]],
      apiContext: [null, [Validators.required]],
      endpointType: [null, [Validators.required]],
      secured: [null, [Validators.required]],
      swaggerEndpoint: [null, [Validators.required]]

    });


    /*let group={}    
    this.formTemplate.forEach(input_template=> {
    
      group[input_template.label] = new FormControl('', [Validators.required]);
    })
    console.log(group);
    this.myFormGroup = new FormGroup(group);*/
  }

  onSubmit(){
    console.log('SUB---------------------------');
    console.log(this.myFormGroup.value);
  }

}