import { AccountInfo, AuthenticationResult, AuthorizationCodeRequest } from "@azure/msal-node";
import { AuthContext } from "./middleware/context/AuthContext";
declare module "express-session" {
    interface SessionData {
        account: AccountInfo;
        isAuthenticated: boolean;
        protectedResources: Record<string, AuthenticationResult>;
        tokenRequestParams: AuthorizationCodeRequest;
        tokenCache?: string;
    }
}
declare global {
    namespace Express {
        interface Request {
            authContext: AuthContext;
        }
    }
}
export { InteractionRequiredAuthError, NodeSystemOptions, AuthError, Logger, AccountInfo } from "@azure/msal-node";
export { WebAppAuthProvider } from "./provider/WebAppAuthProvider";
export { AuthContext, RequestContext } from "./middleware/context/AuthContext";
export { WebAppAuthConfig, AuthConfig, AuthRoutes, ProtectedResourceParams, ProtectedResourcesMap, } from "./config/ConfigurationTypes";
export { RouteGuardOptions, AuthenticateMiddlewareOptions, LoginOptions, LogoutOptions, TokenRequestOptions, AppState, IdTokenClaims, } from "./middleware/MiddlewareOptions";
export { AccessDeniedError } from "./error/AccessDeniedError";
export { InteractionRequiredError } from "./error/InteractionRequiredError";
export { packageVersion } from "./packageMetadata";
//# sourceMappingURL=index.d.ts.map