import axiosConfig from "@/utils/api.config";

import Http from "./htttp.service";

class BaseApiService {
    protected httpClient: Http;

    constructor() {
        this.httpClient = new Http();
        this.httpClient.setHttpConfigs(axiosConfig);
    }
}

export default BaseApiService;
