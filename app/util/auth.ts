import { authkitLoader, authLoader } from "@workos-inc/authkit-remix";
import { AuthorizedData } from "@workos-inc/authkit-remix/dist/cjs/interfaces";

const getExpires = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1])).exp;
  } catch (e) {
    return null;
  }
};

const INTERNAL__getAuthKitResponse = async (request: Request) => {
  try {
    const authorizedData = await authkitLoader(
      {
        request,
        params: {},
        context: {},
      },
      // Will redirect users to AuthKit if they attempt to access the wrapped page without being authenticated.
      {
        ensureSignedIn: true,
        // bump up logging if not in production
        debug: true,
      },
    );

    const expiresAt = getExpires(authorizedData.data.accessToken) * 1000;
    const timeDifference = expiresAt - Date.now();

    // Calculate minutes and seconds
    const minutes = Math.floor(timeDifference / 60000);
    const seconds = Math.floor((timeDifference % 60000) / 1000);

    console.log(
      `Expires at: ${new Date(
        expiresAt,
      ).toISOString()}, Time remaining: ${minutes} minutes and ${seconds} seconds`,
    );

    return authorizedData;
  } catch (thrown: Response | unknown) {
    console.log(
      `Failed to authenticate with AuthKit at url ${request.url}. thrown error:`,
      thrown,
    );

    throw thrown;
  }
};

export const getAuthKitHeaders = async (request: Request) => {
  const authKitInit = (await INTERNAL__getAuthKitResponse(request)).init;

  return authKitInit?.headers ? Object.entries(authKitInit?.headers) : [];
};

export const getWorkOsData = async (request: Request) =>
  (await INTERNAL__getAuthKitResponse(request)).data as AuthorizedData;

export { authLoader };
