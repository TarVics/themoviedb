import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

import {movieDb} from "../configs";

export type AsyncAxiosResponse<T> = Promise<AxiosResponse<T>>

const axiosService = axios.create(movieDb.config as AxiosRequestConfig);

export {
    axiosService
}
