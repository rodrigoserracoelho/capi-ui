import { KeycloakService, KeycloakConfig } from 'keycloak-angular';
 
export function initializer(keycloak: KeycloakService): () => Promise<any> {
  
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      let keycloakConfig: KeycloakConfig = {
        url: 'http://localhost:8081/auth',
        realm: 'master',
        clientId: 'capi-rest'
      };
      try {
        await keycloak.init({
          config: keycloakConfig,
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
          },
          enableBearerInterceptor: true,
          bearerExcludedUrls: []
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}