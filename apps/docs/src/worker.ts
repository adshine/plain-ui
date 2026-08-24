interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Try fetching the asset directly
    let response = await env.ASSETS.fetch(request);
    if (response.status < 400) {
      return response;
    }

    // Handle clean URLs / trailing slashes for static pages
    if (!url.pathname.includes('.')) {
      const cleanUrl = new URL(url.toString());
      if (cleanUrl.pathname.endsWith('/')) {
        cleanUrl.pathname = cleanUrl.pathname.slice(0, -1);
      } else {
        cleanUrl.pathname = cleanUrl.pathname + '/';
      }
      const cleanResponse = await env.ASSETS.fetch(new Request(cleanUrl.toString(), request));
      if (cleanResponse.status < 400) {
        return cleanResponse;
      }
    }

    return response;
  },
};
