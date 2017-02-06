/*
    Default headers:
      - Generally, fetch requests will be sending a JSON payload (on POST / PUT)
      - Generally, we expect to get a JSON response from the server (data)
      - If we need to start sending files / formData to our server,
        we need to either modify this to accept custom headers,
        or just use a the low-level fetch directly in app
*/
//const accessToken = '34307f5a38564203433687b6d647b36'
const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    //'Authorization': 'Bearer ' + accessToken
}

/*
    Helpers / Utils
*/

// Add the server host to the URL
function addHost(path) {
    if (process.env.NODE_ENV === 'production') {
        return `https://femsnow.herokuapp.com/api${path}`
    } else {
        return `http://localhost:3001/api${path}`
    }

}

// Take the low-level HTTP response and grab the data / errors from it
const handleResponse = response => {
    if (response.ok) {
    /*
        If response is ok, we want to return the response data -
        app code won't usually care about headers etc.
    */ 
        const contentType = response.headers.get('Content-Type')

        if (contentType.startsWith('application/json')) {
            // Response content is JSON, get the json as a JS object
            // We should probably always be doing this
            return response.json()
        } else if (contentType.startsWith('text')) {
            // Response content is text, get the text
            return response.text()
        } else if (contentType.startsWith('application/pdf')) {
            var filename = new Blob([response], {type: 'application/pdf'});
            let url = URL.createObjectURL(filename);
            window.open(url)
            return response.blob()
        } else {
            // What is this response? Throw an error
            Promise.reject({ status: response.status, error: 'Unexpected content type' })
        }
    } else {
        /*
            If response is not ok, we want to figure out what the error is
            Then reject the promise with that error
        */ 
        let error
        const text = response.text()
        try {
            error = JSON.parse(text)
        } catch (e) {
            error = 'Not sure about this error'
        }
        return Promise.reject({ status: response.status, error })
    }
}

/*
    Export
    Call with client.get / client.post, etc.
*/
export default {
    get: (url) => {
        return fetch(addHost(url), {
            headers,
            method: 'get'
        }).then(handleResponse)
    },
    post: (url, data) => {
        return fetch(addHost(url), {
            headers,
            method: 'post',
            body: JSON.stringify(data)
        }).then(handleResponse)
    },
    put: (url, data) => {
        return fetch(addHost(url), {
            headers,
            method: 'put',
            body: JSON.stringify(data)
        }).then(handleResponse)
    },
    delete: (url, data) => {
        return fetch(addHost(url), {
            headers,
            method: 'delete',
        }).then(handleResponse)
    }
}
