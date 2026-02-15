export enum ApiEndpoints {
    LOGIN = '/api/v1/auth/login',
    VALIDATE_SESSION = '/api/v1/auth/validate-token',
    SIGNUP = '/api/v1/auth/signup',
    REFRESH_TOKEN = '/api/v1/auth/refresh',
    DASHBOARD_ITEMS = '/api/v1/items',
    IDEMPOTENT_KEY = '/api/v1/bids/idempotent',
    CREATE_BID = '/api/v1/bids/create',
    BID_HISTORY = '/api/v1/bids/all/',
    GET_ITEMS= '/api/v1/items',
    GET_CATEGORIES = '/api/v1/categories',
    CREATE_ITEM = '/api/v1/items',
    GET_PRESIGNED_URL = '/api/v1/items/file/presigned-url',

    ADD_PICTURES = '/api/v1/items/pictures',

    GET_USERS_BIDS = '/api/v1/bids/all/user',

    SEARCH_ITEMS = '/api/v1/items/search',



}