import MS from 'jm-ms-core';
import msHttp from 'jm-ms-http/lib/browser';
import msWS from 'jm-ms-ws/lib/browser';

export default function (opts) {
    let ms = new MS(opts);
    ms
        .use(msHttp.moduleClient)
        .use(msWS.moduleClient)
    ;
    return ms;
};
