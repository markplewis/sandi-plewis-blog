declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_VERCEL_ENV: string;
    NEXT_PUBLIC_SANITY_PROJECT_ID: string;
    NEXT_PUBLIC_SANITY_DATASET: string;
    NEXT_PUBLIC_SANITY_API_VERSION: string;
    NEXT_PUBLIC_CAPTCHA_SITE_KEY: string;
    MAILGUN_PRIVATE_API_KEY: string;
    CONTACT_EMAIL_DOMAIN: string;
    CONTACT_EMAIL_FROM: string;
    CONTACT_EMAIL_RECIPIENTS: string;
    AUTH_EMAIL_SERVER: string;
    AUTH_EMAIL_FROM: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    MONGODB_DB: string;
    MONGODB_URI: string;
    SANITY_API_PREVIEW_READ_TOKEN: string;
  }
}
