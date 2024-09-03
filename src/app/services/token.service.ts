import { Injectable } from '@angular/core';
import { Buffer } from 'buffer/';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public storeToken(token: string) {
    localStorage.setItem('auth_token', token);
}
public getToken() {
    return localStorage.getItem('auth_token')!
}
public removeToken() {
    localStorage.removeItem('auth_token');
}
public extractUsername() {
    let tokenString = this.getToken();
    if (tokenString) {
        const [headerEncoded, payloadEncoded, signatureEncoded] = tokenString.split('.');
        const header = JSON.parse(Buffer.from(headerEncoded, 'base64').toString());
        const payload = JSON.parse(Buffer.from(payloadEncoded, 'base64').toString());
        const signature = Buffer.from(signatureEncoded, 'base64');
        return payload.sub;
    }
    return;
}

extractUserId(): number | null {
    let tokenString = this.getToken();
    if (tokenString) {
        const payloadEncoded = tokenString.split('.')[1]; // Récupère uniquement le payload
        const payload = JSON.parse(atob(payloadEncoded)); // Décode le payload
        return payload.sub || null; // Retourne l'ID utilisateur (généralement dans 'sub')
    }
    return null;
  }
}
