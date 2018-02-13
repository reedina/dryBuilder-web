
// AWS Auth

export class AwsAuthClass implements AwsAuth {
  constructor(public id = 0,
    public account_name = '',
    public access_type = '',
    public access_key_id = '',
    public secret_key = '') {}

}


export interface AwsAuth {
  id: number;
  account_name: string;
  access_type: string;
  access_key_id: string;
  secret_key: string;
}
