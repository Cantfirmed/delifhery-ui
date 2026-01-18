import { Injectable, inject, signal } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/delifhery',
  redirectUri: window.location.origin,
  clientId: 'delifhery',
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-check-sso.html',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private oauthService = inject(OAuthService);

  isLoggedIn = signal(false);
  userProfile = signal<Record<string, unknown> | undefined>(undefined);

  async init(): Promise<boolean> {
    this.oauthService.configure(authConfig);
    this.oauthService.setupAutomaticSilentRefresh();

    const loggedIn = await this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this.updateState();

    // Subscribe to events to update state
    this.oauthService.events.subscribe(() => {
      this.updateState();
    });

    return loggedIn;
  }

  private updateState() {
    const hasToken = this.oauthService.hasValidAccessToken();
    this.isLoggedIn.set(hasToken);
    if (hasToken) {
      this.userProfile.set(this.oauthService.getIdentityClaims() as Record<string, unknown>);
    } else {
      this.userProfile.set(undefined);
    }
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  getAccessToken(): string | null {
    if (!this.oauthService.hasValidAccessToken()) {
      return null;
    }
    return this.oauthService.getAccessToken();
  }
}
