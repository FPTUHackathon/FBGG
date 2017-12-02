import { BACKEND_PATH } from './../constants/constants';

export const USER = {
    login: BACKEND_PATH + '/api/login',
    register: BACKEND_PATH + '/api/register'
}

export const TOPIC = {
    getAll: BACKEND_PATH + '/api/topic'
}

export const POST = {
    add: BACKEND_PATH + '/api/post'
}
