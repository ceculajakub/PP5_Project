import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  config = {
    authority: 'https://accounts.spotify.com/authorize',
    redirectUrl: globalThis.location?.origin + '/callback',
    postLogoutRedirectUri: globalThis.location?.origin,
    clientId: 'dcf9f8fcc51140048bec7a474e0fe966',
    scope: 'user-read-private user-read-email',
    responseType: 'token',
  };

  token: string | null ='';

  login(){
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      response_type: this.config.responseType,
      redirect_uri: this.config.redirectUrl,
      scope: this.config.scope
    });

    if(typeof window !== undefined)
      window.location.href = this.config.authority + '?' + params;
  }

  checkLogin()
  {
    if (typeof window == 'undefined') return;

    if (window.location.hash) {
      const params = new URLSearchParams(window.location.hash);
      this.token = params.get('#access_token')
    }

    if (this.token)
    {
      window.sessionStorage.setItem('token', this.token);
      window.location.hash = '';
    } else {
      this.token = window.sessionStorage.getItem('token');
    }
  }

  logout() {

  }

  getToken(){
    return this.token;
  }
}
