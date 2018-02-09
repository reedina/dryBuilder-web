
// AWS Regions

export class FormStatusClass implements FormStatus {
  constructor(public submitted = false,
    public success = false,
    public failed = false) {}
}


export interface FormStatus {
  submitted: boolean;
  success: boolean;
  failed: boolean;
}

