/*! @entropy/msal-node-custom v1.0.0-beta 2024-01-10 */
'use strict';
import { InteractionRequiredError } from '../error/InteractionRequiredError.esm.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function errorMiddleware() {
    return (err, req, res, next) => {
        if (err instanceof InteractionRequiredError) {
            return req.authContext.login({
                postLoginRedirectUri: err.requestOptions.postLoginRedirectUri || req.originalUrl,
                ...err.requestOptions
            })(req, res, next);
        }
        next(err);
    };
}

export { errorMiddleware as default };
//# sourceMappingURL=errorMiddleware.esm.js.map
