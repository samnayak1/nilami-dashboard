export enum ApiEndpoints {
    LOGIN = '/api/auth/v1/login',
    VALIDATE_SESSION = '/api/auth/v1/validate-token',
    SIGNUP = '/api/auth/v1/signup',
    REFRESH_TOKEN = '/api/auth/v1/refresh',
    DASHBOARD_ITEMS = '/api/auth/v1/items',
    IDEMPOTENT_KEY = '/api/auth/v1/bids/idempotent',
    CREATE_BID = '/api/auth/v1/bids/create',
    BID_HISTORY = '/api/auth/v1/bids/all/',
    GET_ITEMS= '/api/auth/v1/items',
    GET_CATEGORIES = '/api/auth/v1/categories',
    CREATE_ITEM = '/api/auth/v1/items',
    GET_PRESIGNED_URL = '/api/auth/v1/items/file/presigned-url',

    ADD_PICTURES = '/api/auth/v1/items/pictures',

    GET_USERS_BIDS = '/api/auth/v1/bids/all/user',

    SEARCH_ITEMS = '/api/auth/v1/items/search'



}