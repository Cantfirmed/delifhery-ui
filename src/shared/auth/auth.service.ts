import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
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
  private router = inject(Router);
  private readonly postLoginRedirectKey = 'post_login_redirect';

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
      this.handlePostLoginRedirect();
    } else {
      this.userProfile.set(undefined);
    }
  }

  login(targetPath?: string) {
    if (targetPath) {
      this.storePostLoginRedirect(targetPath);
    }
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  private storePostLoginRedirect(targetPath: string) {
    const normalizedPath = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
    sessionStorage.setItem(this.postLoginRedirectKey, normalizedPath);
  }

  private handlePostLoginRedirect() {
    const target = sessionStorage.getItem(this.postLoginRedirectKey);
    if (target && this.router.url !== target) {
      this.router.navigateByUrl(target);
    }
    if (target) {
      sessionStorage.removeItem(this.postLoginRedirectKey);
    }
  }

  getAccessToken(): string | null {
    if (!this.oauthService.hasValidAccessToken()) {
      return null;
    }
    return this.oauthService.getAccessToken();
  }
}
