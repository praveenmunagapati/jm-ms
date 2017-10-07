import MS from 'jm-ms-core';
import msHttp from 'jm-ms-http';
import msWS from 'jm-ms-ws';
import log from 'jm-log4js';

export default function (opts) {
    let ms = new MS(opts);
    ms
        .use(log)
        .use(msHttp.moduleServer)
        .use(msHttp.moduleClient)
        .use(msWS.moduleServer)
        .use(msWS.moduleClient)
    ;
    return ms;
};
