import { Injectable, signal } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _keycloak: Keycloak | undefined;

  isLoggedIn = signal(false);
  userProfile = signal<Keycloak.KeycloakProfile | undefined>(undefined);

  get keycloakInstance() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8080',
        realm: 'delifhery',
        clientId: 'delifhery',
      });
    }
    return this._keycloak;
  }

  async init(): Promise<boolean> {
    const authenticated = await this.keycloakInstance.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      checkLoginIframe: false,
      enableLogging: true,
    });

    this.isLoggedIn.set(authenticated);

    if (authenticated) {
      try {
        const profile = await this.keycloakInstance.loadUserProfile();
        this.userProfile.set(profile);
      } catch (error) {
        console.error('Failed to load user profile:', error);
        // We are still logged in, even if profile fails
      }
    }

    return authenticated;
  }

  login() {
    return this.keycloakInstance.login();
  }

  logout() {
    return this.keycloakInstance.logout({ redirectUri: window.location.origin });
  }

  getToken() {
    return this.keycloakInstance.token;
  }
}
