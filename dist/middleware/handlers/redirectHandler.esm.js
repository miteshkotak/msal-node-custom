/*! @entropy/msal-node-custom v1.0.0-beta 2024-01-10 */
'use strict';
import { ErrorMessages } from '../../utils/Constants.esm.js';
import { StringUtils } from '../../node_modules/@azure/msal-common/dist/utils/StringUtils.esm.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function redirectHandler() {
    return async (req, res, next) => {
        this.getLogger().trace("redirectHandler called");
        if (!req.body || !req.body.code) {
            return next(new Error(ErrorMessages.AUTH_CODE_RESPONSE_NOT_FOUND));
        }
        const tokenRequest = {
            ...req.session.tokenRequestParams,
            code: req.body.code,
        };
        try {
            const msalInstance = this.getMsalClient();
            if (req.session.tokenCache) {
                msalInstance.getTokenCache().deserialize(req.session.tokenCache);
            }
            const tokenResponse = await msalInstance.acquireTokenByCode(tokenRequest, req.body);
            req.session.tokenCache = msalInstance.getTokenCache().serialize();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            req.session.account = tokenResponse.account; // account will never be null in this grant type
            req.session.isAuthenticated = true;
            console.log("TOKENRESPONSE:", tokenResponse);
            const { redirectTo } = req.body.state
                ? StringUtils.jsonParseHelper(this.getCryptoProvider().base64Decode(req.body.state))
                : { redirectTo: "/" };
            res.redirect(redirectTo);
        }
        catch (error) {
            next(error);
        }
    };
}

export { redirectHandler as default };
//# sourceMappingURL=redirectHandler.esm.js.map
