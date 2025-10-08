import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  // No need to validate locale here, as this is handled by the middleware
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
