# Handling user session
  -When user logs in, we set the user object to the state, and that will be used to identify if the user is logged in.
  *
  -When the user logs out, we clear the user state to null.
  *
  -If the cookie expires, we use axios interceptor to handle 401 error and clear the user state, meaning the user is logged out.  

# Handling cookies

- **Method 1**:

```
const fetchProtectedData = async () => {
  const router = useRouter();
  try {
    const response = await axios.get('/api/protected', { withCredentials: true });
    // Use the response data...
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      // Handle unauthenticated state
      toast.error('Your session has expired. Please log in again.');
      router.push('/user/login');
    } else {
      toast.error('An unexpected error occurred.');
    }
  }
};

```

- **Method 2:**
  **Use library like Cookie.js:**

  ```
      import Cookies from 'js-cookie';
      import { useRouter } from 'next/navigation';
      import { useEffect } from 'react';

      const ProtectedComponent = () => {
      const router = useRouter();

      useEffect(() => {
          const token = Cookies.get("access_token");
          if (!token) {
          // No token means user is not logged in
          router.push('/user/login');
          }
      }, [router]);

      return (
          <div>
          {/* Protected content here */}
          </div>
      );
      };

  ```

  - **NOTE:** -Since we are using httpOnly in our cookie options, accessing the cookies in the frontend via javaScript js.cookie and document.cookie won't return the token.
  - ** Using httpOnly is a secure way and should be encouraged, as it protects the site from corss-site scripting (XXS) attacks. If a malicious script were to run on your page, it wouldn't be able to access httpOnly cookies.

##

## Handling login redirect

### Allow user to go back to the page they were before being redirected to login

- **On Login:**
  ```
   if (response.data.success) {
        toast.success(response.data.message);
        const redirectUrl =
          new URLSearchParams(window.location.search).get("redirect") || "/";
        router.push(redirectUrl);
   }
  ```

- **In the redirect page:**
  ```
     const redirectToLogin = () => {
            const loginUrl = window.location.origin + "/user/login";
            router.push(`${loginUrl}?redirect=${encodeURIComponent(window.location.href)}`);
      };
  ```
---
   -This should happen if cookies are not present in the response, meaning user is not logged in.
   **.**
   -By following these steps, when a user is redirected to the login page, the current URL will be included as a query parameter. After a successful login, the user will be redirected back to the original page they were trying to access.
