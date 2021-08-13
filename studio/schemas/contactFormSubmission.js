const ContactFormSubmissionSchema = {
  name: "contactFormSubmission",
  title: "Contact form submission",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "message",
      title: "Message",
      type: "text",
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      name: "name",
      email: "email"
    },
    prepare({ name, email }) {
      return {
        title: name,
        subtitle: email
      };
    }
  }
};
export default ContactFormSubmissionSchema;