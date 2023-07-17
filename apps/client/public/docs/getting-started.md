# Getting Started with Mail Bridge

- **✉️ Sign up on Mail Bridge**: Create an account on Mail Bridge by providing your name, email, and password. 📝 This will grant you access to the platform's features and functionality. 🚀

- **📊 Navigate to the Dashboard**: Upon signing up, you will be directed to the dashboard. Here, you can view all the relevant statistics related to your account usage and access other account-related information. 📈

- **🔒 Verify Your Account**: It is essential to verify your account with Google. To do this, just click on the _Google_ icon on the sidebar. This step is necessary to enable email sending. ✔️

- **🔑 Create APIs Keys**: Generate API keys to authenticate your requests. Each API key allows for up to 500 emails to be sent. Use the provided API creation functionality to generate the necessary keys for your application. 🔐

- **📧 Create Email Templates**: Design and create customized email templates using the [Handlebars](https://handlebarsjs.com/) format. These templates will determine the structure and content of the emails you send. The first template you create will serve as the default template for your emails. ✉️🎨

- **🚀 Send Emails**: Utilize the POST route to send requests with the required data. The Mail Bridge system will handle the email delivery to both your customers and yourself. Ensure that the necessary data is included in the request for successful email transmission. 📤✉️

After following the above steps, you will need an API Endpoint to post your requests. Given below is that API Endpoint

```
https://mail-bridge.onrender.com/emails/send
```

## Guide to make requests with different clients

**Fetch API** and **Axios** are powerful options for making requests in web development. Fetch API is a built-in browser API with a versatile interface, while Axios is a popular third-party library with a user-friendly API and additional features. Both enable effective communication with servers and data retrieval.
You can use either of these to make your form working with mail bridge. Below is the code snippets explaining about both of the clients.

### Using Fetch API

```js
fetch('MAIL_BRIDGE_URL', {
  method: 'post',
  headers: new Headers({
    'x-api-key': 'YOUR_API_KEY',
  }),
  body: {
    data: YOUR_DATA_AS_OBJECT,
  },
})
```

### Using Axios

```js
const response = await axios.post('MAIL_BRIDGE_URL', YOUR_DATA_AS_OBJECT, {
  headers: {
    'x-api-key': 'YOUR_API_KEY',
  },
})
```

### Example Payload

```js
{
    data: {
        "email": "mail@gmail.com", // Email is required field
        ...
    }
}
```

## Example Response

```js
{
    "status: "SUCCESS" | "FAILED"
}
```
