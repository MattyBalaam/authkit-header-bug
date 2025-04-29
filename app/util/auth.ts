
import {
  authkitLoader,
  authLoader,
  configure,
} from '@workos-inc/authkit-remix';


const getWorkOSVar = async (name: string) =>  {
  // simulates a delay in loading the variable
  await new Promise(resolve => setTimeout(resolve, Math.random() * 100)) 

  return process.env[`DEV_${name}`] 

}
  
// this iife is used to ensure that the workOS config is set up only once
// to avoid any race conditions
export const workOSConfig = (async () => {
  const startTime = Date.now();

  console.log('~~~~~~~~~~ Configuring Work OS ~~~~~~~~~~');

  const [clientId, apiKey, cookiePassword] = await Promise.all([
    getWorkOSVar('WORKOS_CLIENT_ID'),
    getWorkOSVar('WORKOS_API_KEY'),
    getWorkOSVar('WORKOS_COOKIE_PASSWORD'),
  ]);

  configure({
    clientId,
    apiKey,
    redirectUri: process.env.WORKOS_REDIRECT_URI,
    cookiePassword,
  });

  console.log(
    `~~~~~~~~~~ Configured Work OS in ${Date.now() - startTime}ms ~~~~~~~~~~`,
  );
})();

export const getWorkOsSession = async (request: Request) => {
  try {
    await workOSConfig;

  

    const { data } = await authkitLoader(
      {
        request,
        params: {},
        context: {},
      },
      // Will redirect users to AuthKit if they attempt to access the wrapped page without being authenticated.
      { ensureSignedIn: true, debug: true },
    );

    console.log('current accessToken ends in', data.accessToken.slice(-10));

    return data
  } catch (thrown: Response | unknown) {
    console.log(
      `Failed to authenticate with AuthKit at url ${request.url}. thrown error:`,
      thrown,
    );

    throw thrown;
  }
};

export { authLoader };
