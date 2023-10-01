<div style="display: flex; align-items: center; justify-content: center; background: white;">
<img src=".github/logo.png">
</div>

# 🌉 Mail Bridge

Welcome to **Mail Bridge**! ✉️ A powerful and user-friendly email-sending solution designed to streamline your communication with customers. With Mail Bridge, you can effortlessly integrate an API route into your form, enabling you to send personalized emails directly from your frontend, without the need for a dedicated backend. This documentation will guide you through the core features of Mail Bridge, including its API key authentication system 🔑 and convenient email scheduling functionality 📅.

## Problem Statement

Many individuals and businesses seek a hassle-free method to send emails without the complexities of managing their own backend infrastructure. These users desire a minimalistic system that can seamlessly integrate with their frontend, allowing them to communicate with their customers effectively. Traditional email-sending solutions often require the setup and maintenance of backend servers, making the process cumbersome and time-consuming. ⏳

## Solution

Mail Bridge addresses this challenge by providing a simple yet powerful solution for sending emails directly from the frontend of your application. By utilizing the **API key authentication** mechanism, Mail Bridge ensures secure and reliable email delivery while maintaining the utmost privacy and data protection. With Mail Bridge, you can focus on engaging with your customers and building meaningful connections, rather than worrying about technical email infrastructure. 🚀

## Key Features

1. **API Route Integration**: Mail Bridge enables you to seamlessly hook an API route into your form, allowing you to send personalized emails directly from your frontend application. This integration eliminates the need for a dedicated backend and simplifies the email-sending process. 💻

2. **Custom Templates**: With Mail Bridge, you can create and utilize custom email templates, ensuring consistent branding and personalized messaging for your customers. Tailor your emails to match your unique style and deliver a memorable experience. 🎨✉️

3. **Effortless Authentication**: Mail Bridge employs API key authentication, offering a secure method to authenticate user requests. This ensures that only authorized users can send emails through the system, protecting sensitive customer information. 🔒

4. **Email Scheduling**: Take advantage of Mail Bridge's additional feature: email scheduling. Plan and automate your email delivery to customers at specific dates and times, enhancing your communication strategy and maximizing engagement. ⏰📆

## Tech Stack

- ReactJS
- NestJS
- MongoDB
- Prisma
- Turbo

# Documentation

For detailed information on how to use Mail Bridge, please refer to our [documentation](https://mail-bridge.vercel.app/).

# Contributing

We welcome contributions from the community! If you'd like to contribute to Mail Bridge, please follow our contribution guidelines.

## Getting Started

Follow these steps to get Mail Bridge up and running on your local machine:

This project is a monorepo and makes use of `turbo` and `pnpm`

- ### Fork and create branch repository
  Fork this repo
- ### Clone into your local machine

```bash
git clone https://github.com/yourusername/mail-bridge.git
cd mail-bridge
# Install dependencies using pnpm
pnpm install
```

- ### Environment configuration
  Update the the env files with your configuration values
  Client side

```bash
VITE_API_BASE_URL="http://localhost:4000"
VITE_BEARER_TOKEN_KEY=
VITE_TINY_MCE_KEY=
VITE_GOOGLE_CLIENT_ID=

```

Server side

```bash
PORT=
DATABASE_URL="mongodb://127.0.0.1:27017/mail-bridge"
JWT_SECRET=
JWT_EXPIRATION=
EMAIL= #Your email
EMAIL_PASSWORD= #Your email's password
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

- ### Generate prisma client

```bash
pnpm prisma generate
```

- ### Running in development mode
  This will run `client` and `server` in development mode

```bash
pnpm dev

```

## Commit Guidelines

This project is using `commitizen` for making the commit messages better, so please make sure when you make a commit then make use of commitizen using the command

```bash
npx cz
```

#### Commit types

- `feat`: A new feature
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

---

Happy Contributing ❤️
