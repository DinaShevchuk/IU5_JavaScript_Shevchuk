class FetchApi {
    async _request(url, options = {}) {
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (response.status === 204) {
                return null;
            }

            const data = await response.json();
            return { data, status: response.status };
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    async get(url) {
        return this._request(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async post(url, data) {
        return this._request(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    async patch(url, data) {
        return this._request(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    async delete(url) {
        return this._request(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export const fetchApi = new FetchApi();
