/*! @entropy/msal-node-custom v1.0.0-beta 2024-01-10 */
'use strict';
import { UrlUtils } from '../../utils/UrlUtils.esm.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function logoutHandler(options) {
    return async (req, res) => {
        this.getLogger().trace("logoutHandler called");
        const shouldLogoutFromIdp = options.idpLogout ? options.idpLogout : true;
        let logoutUri = options.postLogoutRedirectUri || "/";
        const account = req.authContext.getAccount();
        if (account) {
            try {
                const tokenCache = this.getMsalClient().getTokenCache();
                const cachedAccount = await tokenCache.getAccountByHomeId(account.homeAccountId);
                if (cachedAccount) {
                    await tokenCache.removeAccount(cachedAccount);
                }
            }
            catch (error) {
                this.logger.error(`Error occurred while clearing cache for user: ${JSON.stringify(error)}`);
            }
        }
        if (shouldLogoutFromIdp) {
            /**
             * Construct a logout URI and redirect the user to end the
             * session with Azure AD. For more information, visit:
             * (AAD) https://docs.microsoft.com/azure/active-directory/develop/v2-protocols-oidc#send-a-sign-out-request
             * (B2C) https://docs.microsoft.com/azure/active-directory-b2c/openid-connect#send-a-sign-out-request
             */
            const postLogoutRedirectUri = UrlUtils.ensureAbsoluteUrl(options.postLogoutRedirectUri || "/", req.protocol, req.get("host") || req.hostname);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            logoutUri = `${UrlUtils.enforceTrailingSlash(this.getMsalConfig().auth.authority)}/oauth2/v2.0/logout?post_logout_redirect_uri=${postLogoutRedirectUri}`;
        }
        req.session.destroy(() => {
            res.redirect(logoutUri);
        });
    };
}

export { logoutHandler as default };
//# sourceMappingURL=logoutHandler.esm.js.map
