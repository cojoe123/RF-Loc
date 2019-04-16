import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private httpOptions: any;

  public token: string;

  public username: string;

  public errors: any = [];

  readonly TEST_URL = 'http://127.0.0.1:8000';
  readonly ROOT_URL = '';

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  /**
   * loginUser(): handles the request to get api token needed for login verification
   * 
   * @param userData: credentials to be verified
   */
  public async loginUser(userData) {
    const result = await this.http.post(this.ROOT_URL + '/api-token-auth/', JSON.stringify(userData), this.httpOptions)
    .toPromise();
    
    this.updateData(result['token']);
  }

   /**
    * refreshToken(): Refreshes the JWT token, to extend the time the user is logged in
    */
   public refreshToken() {
    this.http.post(this.ROOT_URL + '/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  /**
   * logout(): logout user and clear token
   */
  public logout() {
    this.token = null;
    // this.token_expires = null;
    this.username = null;
  }

  /**
   * listRequest(): makes api call to get all probe request picked up
   */
  public async listRequest() {
    let headers = new HttpHeaders().set('Authorization', 'JWT ' + this.token);
    const data = await this.http.get(this.ROOT_URL + '/probeRequests/', { headers }).toPromise();

    return data;
  }

  /**
   * listRequestByDetector(): makes api call returning data associated with specific detector 
   * 
   * @param detector: detector name
   */
  public listRequestByDetector(detector) {
    let headers = new HttpHeaders().set('Authorization', 'JWT ' + this.token);
    return this.http.get(this.ROOT_URL + '/probeRequests?detector=' + detector, { headers });
  }

  /**
   * sendWhitelistRequest(): send post request with following parameters to the api
   * 
   * @param user: username of the person opting in
   * @param mac : mac address of their device
   */
  public sendWhitelistRequest(user, mac) {
    return this.http.post(this.ROOT_URL + '/whitelist/', {'user': user, 'mac_address': mac}).toPromise();
  }

  /**
   * updateData(): updates class value such as username of person logging in and adding the api token
   * 
   * @param token: token from the api
   */
  private updateData(token) {
    this.token = token;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    // this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }

}
