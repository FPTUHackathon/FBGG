import { HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export function createCommonHeaders(contentType = 'application/json') {
    const headerObj = {};
    headerObj['X-Requested-With'] = 'XMLHttpRequest';

    if (contentType) {
        headerObj['Content-Type'] = contentType;
    }

    const headers = new HttpHeaders(headerObj);
    return { headers: headers };
}
