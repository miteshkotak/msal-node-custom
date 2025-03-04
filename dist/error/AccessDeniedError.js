/*! @entropy/msal-node-custom v1.0.0-beta 2024-01-10 */
'use strict';
'use strict';

var msalNode = require('@azure/msal-node');

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Contains string constants used by error codes and messages.
 */
const AccessDeniedErrorMessage = {
    unauthorizedAccessError: {
        code: "401",
        desc: "Unauthorized"
    },
    forbiddenAccessError: {
        code: "403",
        desc: "Forbidden"
    }
};
/**
 * Error thrown when the user is not authorized to access a route
 */
class AccessDeniedError extends msalNode.AuthError {
    constructor(errorCode, errorMessage, route, account) {
        super(errorCode, errorMessage);
        this.name = "AccessDeniedError";
        this.route = route;
        this.account = account;
        Object.setPrototypeOf(this, AccessDeniedError.prototype);
    }
    /**
     * Creates an error when access is unauthorized
     *
     * @returns {AccessDeniedError} Empty issuer error
     */
    static createUnauthorizedAccessError(route, account) {
        return new AccessDeniedError(AccessDeniedErrorMessage.unauthorizedAccessError.code, AccessDeniedErrorMessage.unauthorizedAccessError.desc, route, account);
    }
    /**
     * Creates an error when the access is forbidden
     *
     * @returns {AccessDeniedError} Empty issuer error
     */
    static createForbiddenAccessError(route, account) {
        return new AccessDeniedError(AccessDeniedErrorMessage.forbiddenAccessError.code, AccessDeniedErrorMessage.forbiddenAccessError.desc, route, account);
    }
}

exports.AccessDeniedError = AccessDeniedError;
exports.AccessDeniedErrorMessage = AccessDeniedErrorMessage;
//# sourceMappingURL=AccessDeniedError.js.map
