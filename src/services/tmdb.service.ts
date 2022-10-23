import {tmDb} from "../configs";

const tmDbService = {
    getPoster: (uri: string, width: number = 500): string => tmDb.config.baseURL + '/w' + width + uri
}

export { tmDbService }