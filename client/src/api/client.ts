const BASE_URL = "http://localhost:8080/api";

export async function http<T>(url: string, options: RequestInit = {}): Promise<T |  void> {
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {})
            }
        });

        if(!response.ok){
            const errText  = await response.text();
            throw new Error(`HTTP Error! ${response.status} - ${errText}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }

        return;
    }
    catch (error) {
        console.error("HTTP request failed:", error);
        throw error; // rethrow to handle it in the calling code
    }
}