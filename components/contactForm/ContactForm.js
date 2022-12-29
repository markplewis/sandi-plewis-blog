import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaExclamationCircle } from "react-icons/fa";

import FriendlyCaptcha from "components/contactForm/FriendlyCaptcha";
import Spinner from "components/contactForm/Spinner";

import { emailRegex } from "utils/forms";
import useDebug from "utils/useDebug";

import styles from "components/contactForm/ContactForm.module.css";

// Lifecycle types (in order of occurance)
export const FORM_IDLE = "idle";
export const FORM_VERIFYING = "verifying";
export const FORM_ENABLED = "enabled";
export const FORM_SUBMITTING = "submitting";
export const FORM_SUBMITTED = "submitted";
export const FORM_ERROR = "error";

async function sendEmail(data) {
  try {
    // See: https://nextjs.org/blog/next-9-4#improved-built-in-fetch-support
    const response = await fetch("/api/send-email", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      return {
        error: true,
        body: `${response.status} (${response.statusText})`
      };
    }
    const json = await response.json();
    return {
      error: false,
      body: json
    };
  } catch (err) {
    return {
      error: true,
      body: err
    };
  }
}

// https://www.w3.org/WAI/tutorials/forms/notifications/
// https://react-hook-form.com/api/useform
// https://github.com/FriendlyCaptcha/friendly-challenge/issues/50

export default function ContactForm({ onStateChange }) {
  const [state, setState] = useState(FORM_IDLE);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const debug = useDebug();

  useEffect(() => {
    onStateChange(state);
  }, [onStateChange, state]);

  const onCaptchaStarted = () => {
    debug && console.log("Captcha started");
    setState(FORM_VERIFYING);
  };

  const onCaptchaReady = () => {
    debug && console.log("Captcha ready");
  };

  const onCaptchaSuccess = () => {
    debug && console.log("Captcha solved");
    setState(FORM_ENABLED);
  };

  const onCaptchaError = err => {
    debug && console.log("Captcha could not be solved");
    debug && console.error(err);
    // Enable the form regardless, in order to provide a better user experience
    setState(FORM_ENABLED);
  };

  const onSubmit = async data => {
    setState(FORM_SUBMITTING);

    try {
      const sanitizedData = JSON.stringify({
        ...data,
        name: DOMPurify.sanitize(data.name),
        message: DOMPurify.sanitize(data.message)
      });
      sendEmail(sanitizedData).then(response => {
        if (response.error) {
          debug && console.error("Form submission error:", response.body);
          setState(FORM_ERROR);
        } else {
          debug && console.log("Form submission success:", response.body);
          setState(FORM_SUBMITTED);
        }
      });
    } catch (err) {
      debug && console.error("Form submission error:", err);
      setState(FORM_ERROR);
    }
  };

  let captchaMessage;
  if (state === FORM_VERIFYING) {
    captchaMessage = "Verifying that you’re human…";
  } else if (state !== FORM_IDLE) {
    captchaMessage = "We’ve verified that you’re human so you may now submit this form.";
  }

  return (
    <div className={styles.formContainer}>
      {state === FORM_SUBMITTED && <p>Thanks for contacting Sandi!</p>}
      {state !== FORM_SUBMITTED && (
        <>
          {state === FORM_ERROR && (
            <p>An error occurred and your message could not be sent. Please try again.</p>
          )}
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.fieldGroup}>
              <label htmlFor="name">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                autoComplete="name"
                aria-required="true"
                aria-invalid={errors.name ? true : null}
                aria-describedby={errors.name ? "name-error" : null}
                id="name"
              />
              {errors.name && (
                <p className={styles.error} id="name-error" aria-live="polite">
                  <>
                    <FaExclamationCircle />
                    {errors.name.message}
                  </>
                </p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email">Email</label>
              <input
                {...register("email", {
                  required: "Email address is required",
                  pattern: { value: emailRegex, message: "Invalid email address" }
                })}
                type="email"
                autoComplete="email"
                aria-required="true"
                aria-invalid={errors.email ? true : null}
                aria-describedby={errors.email ? "email-error" : null}
                id="email"
              />
              {errors.email && (
                <p className={styles.error} id="email-error" aria-live="polite">
                  <>
                    <FaExclamationCircle />
                    {errors.email.message}
                  </>
                </p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                {...register("message", { required: "Message is required" })}
                aria-required="true"
                aria-invalid={errors.message ? true : null}
                aria-describedby={errors.message ? "message-error" : null}
                id="message"
                rows={8}></textarea>
              {errors.message && (
                <p className={styles.error} id="message-error" aria-live="polite">
                  <>
                    <FaExclamationCircle />
                    {errors.message.message}
                  </>
                </p>
              )}
            </div>

            {captchaMessage && <p aria-live="polite">{captchaMessage}</p>}

            <div className={styles.captcha} aria-hidden="true">
              <FriendlyCaptcha
                onStarted={onCaptchaStarted}
                onReady={onCaptchaReady}
                onSuccess={onCaptchaSuccess}
                onError={onCaptchaError}
              />
            </div>

            <button
              className={`u-button-appearance-none ${styles.submitButton}`}
              type="submit"
              disabled={
                state === FORM_IDLE ||
                state === FORM_VERIFYING ||
                state === FORM_SUBMITTING ||
                state === FORM_ERROR
              }>
              {state === FORM_SUBMITTING ? (
                <>
                  <span>Submitting</span>
                  <Spinner />
                </>
              ) : (
                <>
                  <span>Submit</span>
                  <svg
                    className={styles.submitButtonSVG}
                    role="img"
                    pointerEvents="none"
                    focusable={false}
                    aria-hidden={true}>
                    <use xlinkHref="#icon-arrow-right" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
