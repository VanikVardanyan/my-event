'use client'

import { Container } from '../styles'
import useStyles from './styles'

const Privacy = () => {
  const { classes } = useStyles()

  return (
    <Container>
      <div className={classes.title}>
        <h2 className={classes.mainTitle}>Privacy Policy</h2>

        <h2 className={classes.title}>1. Introduction</h2>
        <p className={classes.description}>
          Welcome to <strong>evnEasy</strong>. We are committed to protecting your privacy and ensuring that your
          personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect,
          use, and protect your personal data when you use our website and services.
        </p>

        <h2 className={classes.title}>2. Information We Collect</h2>
        <p className={classes.description}>
          When you visit <strong>evnEasy</strong>, we may collect the following types of information:
        </p>
        <ul>
          <li className={classes.description}>
            <strong>Personal Information:</strong> This includes your name, email address, phone number, payment
            information, and any other information you provide when creating an account or making a booking.
          </li>
          <li className={classes.description}>
            <strong>Usage Data:</strong> We may collect information about your interactions with our website, such as
            your IP address, browser type, pages viewed, and the date and time of your visit.
          </li>
          <li className={classes.description}>
            <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to
            enhance your experience on our site and to analyze usage patterns.
          </li>
        </ul>

        <h2 className={classes.title}>3. How We Use Your Information</h2>
        <p className={classes.description}>We may use your information for the following purposes:</p>
        <ul>
          <li className={classes.description}>
            To provide and manage our services, including processing bookings and payments.
          </li>
          <li className={classes.description}>
            To communicate with you regarding your account, bookings, and inquiries.
          </li>
          <li className={classes.description}>
            To personalize your experience and improve our website's functionality.
          </li>
          <li className={classes.description}>To comply with legal obligations and protect our rights.</li>
        </ul>

        <h2 className={classes.title}>4. Sharing Your Information</h2>
        <p className={classes.description}>
          We do not sell your personal information to third parties. However, we may share your information with:
        </p>
        <ul>
          <li className={classes.description}>
            <strong>Service Providers:</strong> Third-party vendors who assist us in providing our services, such as
            payment processors and hosting providers.
          </li>
          <li className={classes.description}>
            <strong>Legal Requirements:</strong> Authorities if required by law or to protect our rights and safety.
          </li>
          <li className={classes.description}>
            <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your
            information may be transferred as part of the transaction.
          </li>
        </ul>

        <h2 className={classes.title}>5. Data Security</h2>
        <p className={classes.description}>
          We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.
          However, no method of transmission over the Internet or electronic storage is completely secure, so we cannot
          guarantee absolute security.
        </p>

        <h2 className={classes.title}>6. Your Rights</h2>
        <p className={classes.description}>You have the following rights regarding your personal information:</p>
        <ul>
          <li className={classes.description}>
            <strong>Access:</strong> You can request a copy of the personal information we hold about you.
          </li>
          <li className={classes.description}>
            <strong>Correction:</strong> You can request that we correct or update your personal information.
          </li>
          <li className={classes.description}>
            <strong>Deletion:</strong> You can request that we delete your personal information, subject to certain
            legal obligations.
          </li>
          <li className={classes.description}>
            <strong>Opt-Out:</strong> You can opt-out of receiving marketing communications from us at any time.
          </li>
        </ul>

        <h2 className={classes.title}>7. Cookies</h2>
        <p className={classes.description}>
          We use cookies to enhance your experience on our site. Cookies are small data files that are placed on your
          device when you visit our website. You can manage your cookie preferences through your browser settings.
        </p>

        <h2 className={classes.title}>8. Changes to This Privacy Policy</h2>
        <p className={classes.description}>
          We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons.
          We will notify you of any significant changes by posting the new policy on our website.
        </p>

        <h2 className={classes.title}>9. Contact Us</h2>
        <p className={classes.description}>
          If you have any questions or concerns about this Privacy Policy, please contact us at [Your Contact
          Information].
        </p>
      </div>
    </Container>
  )
}

export default Privacy
