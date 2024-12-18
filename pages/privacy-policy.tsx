import Layout from "~/components/Layout";
import PageBodyStatic from "~/components/PageBodyStatic";
import PageTitle from "~/components/PageTitle";

// Information:
// - https://www.gravityforms.com/privacy-policy-wordpress-website/
// - https://termly.io/resources/articles/blog-privacy-policy/

// For Facebook: "This policy must comply with applicable law and regulations and must accurately
// and clearly explain what data you are Processing, how you are Processing it, the purposes for
// which you are Processing it, and how Users may request deletion of that data."
// - https://developers.facebook.com/terms

export default function PrivacyPolicy() {
  return (
    <Layout title="Privacy policy" description="Privacy policy">
      <PageBodyStatic>
        <PageTitle>Privacy Policy</PageTitle>
        <p>Last updated: October 7, 2024</p>
        <p>
          The social media share buttons on this website are simple, direct links to their
          respective platforms. Consequently, no third-party tracking code is added to the page by
          these companies or their affiliates.
        </p>
        <p>
          This website’s contact form sends an email immediately upon submission and the submitted
          data is not retained thereafter. Its “anti-robot verification” feature is a
          spam-prevention service provided by{" "}
          <a href="https://friendlycaptcha.com/">Friendly Captcha</a>, which does not collect any
          information about its users.
        </p>
      </PageBodyStatic>
    </Layout>
  );
}
