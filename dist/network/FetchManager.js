/*! @entropy/msal-node-custom v1.0.0-beta 2024-01-10 */
'use strict';
'use strict';

var axios = require('axios');
var Constants = require('../utils/Constants.js');
var StringUtils = require('../node_modules/@azure/msal-common/dist/utils/StringUtils.js');

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class FetchManager {
    static async fetchCloudDiscoveryMetadata(tenantId) {
        const endpoint = "https://login.microsoftonline.com/common/discovery/instance";
        try {
            const response = await FetchManager.callApiEndpoint(endpoint, {
                params: {
                    "api-version": "1.1",
                    authorization_endpoint: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`,
                },
            });
            const cloudDiscoveryMetadata = JSON.stringify(response.data);
            return cloudDiscoveryMetadata;
        }
        catch (error) {
            throw error;
        }
    }
    static async fetchAuthorityMetadata(tenantId) {
        const endpoint = `https://login.microsoftonline.com/${tenantId}/v2.0/.well-known/openid-configuration`;
        try {
            const response = await FetchManager.callApiEndpoint(endpoint);
            const authorityMetadata = JSON.stringify(response.data);
            return authorityMetadata;
        }
        catch (error) {
            throw error;
        }
    }
}
/**
 * Calls a resource endpoint
 * @param {string} endpoint: URL of the endpoint to be called
 * @returns {Promise<any>}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
FetchManager.callApiEndpoint = async (endpoint, options) => {
    try {
        const response = await axios.get(endpoint, options);
        return response;
    }
    catch (error) {
        throw error;
    }
};
/**
 * Calls a resource endpoint with a raw access token
 * using the authorization bearer token scheme
 * @param {string} endpoint: URL of the endpoint to be called
 * @param {string} accessToken: Raw access token
 * @returns {Promise<any>}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
FetchManager.callApiEndpointWithToken = async (endpoint, accessToken) => {
    if (StringUtils.StringUtils.isEmpty(accessToken)) {
        throw new Error(Constants.ErrorMessages.TOKEN_NOT_FOUND);
    }
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const response = await FetchManager.callApiEndpoint(endpoint, options);
        return response.data;
    }
    catch (error) {
        throw error;
    }
};
/**
 * Handles queries against Microsoft Graph that return multiple pages of data
 * @param {string} accessToken: access token required by endpoint
 * @param {string} nextPage: next page link
 * @param {Array} data: stores data from each page
 * @returns {Promise<string[]>}
 */
FetchManager.handlePagination = async (accessToken, nextPage, data = []) => {
    try {
        const graphResponse = await (await FetchManager.callApiEndpointWithToken(nextPage, accessToken)).data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        graphResponse["value"].map((v) => data.push(v.id));
        if (graphResponse[Constants.AccessControlConstants.PAGINATION_LINK]) {
            return await FetchManager.handlePagination(accessToken, graphResponse[Constants.AccessControlConstants.PAGINATION_LINK], data);
        }
        else {
            return data;
        }
    }
    catch (error) {
        throw error;
    }
};

exports.FetchManager = FetchManager;
//# sourceMappingURL=FetchManager.js.map
