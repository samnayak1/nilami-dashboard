export enum ApiEndpoints {
    // Auth Service
    LOGIN = '/api/auth/v1/login',
    VALIDATE_SESSION = '/api/auth/v1/validate-token',
    SIGNUP = '/api/auth/v1/signup',
    REFRESH_TOKEN = '/api/auth/v1/refresh',

    // Catalog Service - Items
    DASHBOARD_ITEMS = '/api/items/v1',
    GET_ITEMS = '/api/items/v1',
    CREATE_ITEM = '/api/items/v1',
    GET_PRESIGNED_URL = '/api/items/v1/file/presigned-url',
    ADD_PICTURES = '/api/items/v1/pictures',
    SEARCH_ITEMS = '/api/items/v1/search',

    // Catalog Service - Categories
    GET_CATEGORIES = '/api/categories/v1',

    // Bid Service
    IDEMPOTENT_KEY = '/api/bids/v1/idempotent',
    CREATE_BID = '/api/bids/v1/create',
    BID_HISTORY = '/api/bids/v1/all/',
    GET_USERS_BIDS = '/api/bids/v1/all/user',
}