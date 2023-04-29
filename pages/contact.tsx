import { useState } from "react";
import ContactForm, { FORM_ERROR, FORM_SUBMITTED } from "~/components/contactForm/ContactForm";
import Layout from "~/components/Layout";
import PageTitle from "~/components/PageTitle";
import { useApp } from "~/utils/useApp";

export default function Contact() {
  const { app } = useApp();
  const skipLinkTargetRef = app.skipLinkTargetRef;
  const [pageTitle, setPageTitle] = useState("Contact Sandi");

  const onFormChange = state => {
    switch (state) {
      case FORM_ERROR:
        setPageTitle("An error occurred");
        skipLinkTargetRef?.current?.focus();
        break;
      case FORM_SUBMITTED:
        setPageTitle("Your message has been sent");
        skipLinkTargetRef?.current?.focus();
        break;
    }
  };

  return (
    <Layout title={pageTitle} description="Contact Sandi Plewis">
      <div>
        <PageTitle centered={true}>{pageTitle}</PageTitle>
        <div>
          <ContactForm onStateChange={onFormChange} />
        </div>
      </div>
    </Layout>
  );
}
