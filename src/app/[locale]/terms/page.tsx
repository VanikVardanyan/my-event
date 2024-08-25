'use client'

import { Container } from '../styles'
import useStyles from './styles'

const TermsAndConditions = () => {
  const { classes } = useStyles()
  return (
    <Container>
      <div className={classes.root}>
        <h2 className={classes.mainTitle}>Terms and Conditions</h2>

        <h2 className={classes.title}>1. Introduction</h2>
        <p className={classes.description}>
          Welcome to <strong>evnEasy</strong>! By accessing or using our website, you agree to comply with and be bound
          by the following terms and conditions of use. Please read these terms carefully before using our services. If
          you do not agree to these terms, you may not use our site or services.
        </p>

        <h2 className={classes.title}>2. Services</h2>
        <p className={classes.description}>
          <strong>evnEasy</strong> provides a platform for users to find and book event-related services such as
          entertainment, photography, venue rentals, and more. We facilitate the connection between service providers
          and clients but are not directly involved in any contracts or agreements made between the parties.
        </p>

        <h2 className={classes.title}>3. User Accounts</h2>
        <p className={classes.description}>
          To use certain features of our website, you may be required to create an account. You agree to provide
          accurate, current, and complete information during the registration process. You are responsible for
          maintaining the confidentiality of your account credentials and for all activities that occur under your
          account.
        </p>

        <h2 className={classes.title}>4. Booking and Payments</h2>
        <p className={classes.description}>
          All bookings made through <strong>evnEasy</strong> are subject to the terms and conditions set by the
          individual service providers. Payments for services are handled according to the payment methods specified by
          the providers. <strong>evnEasy</strong> may charge a service fee for transactions conducted on our platform.
        </p>

        <h2 className={classes.title}>5. Cancellations and Refunds</h2>
        <p className={classes.description}>
          Cancellation policies are determined by the individual service providers. Please review the specific
          cancellation and refund policies before making a booking. <strong>evnEasy</strong> is not responsible for any
          refunds or disputes related to cancellations.
        </p>

        <h2 className={classes.title}>6. Content and Intellectual Property</h2>
        <p className={classes.description}>
          All content on <strong>evnEasy</strong>, including text, graphics, logos, and images, is the property of{' '}
          <strong>evnEasy</strong> or its licensors and is protected by intellectual property laws. You may not use,
          reproduce, or distribute any content from our website without our express written permission.
        </p>

        <h2 className={classes.title}>7. User Conduct</h2>
        <p className={classes.description}>
          You agree not to use <strong>evnEasy</strong> for any unlawful purposes or to engage in any activity that
          could harm the website, its users, or service providers. This includes but is not limited to, posting
          defamatory, offensive, or misleading content, or attempting to interfere with the operation of the website.
        </p>

        <h2 className={classes.title}>8. Disclaimers and Limitation of Liability</h2>
        <p className={classes.description}>
          <strong>evnEasy</strong> provides its services on an "as is" basis and makes no warranties or representations
          regarding the accuracy, reliability, or availability of the website or its content. We are not liable for any
          damages resulting from your use of the website or the services provided by third parties.
        </p>

        <h2 className={classes.title}>9. Indemnification</h2>
        <p className={classes.description}>
          You agree to indemnify and hold <strong>evnEasy</strong> harmless from any claims, damages, or expenses
          arising out of your use of the website or your breach of these terms and conditions.
        </p>

        <h2 className={classes.title}>10. Changes to Terms and Conditions</h2>
        <p className={classes.description}>
          <strong>evnEasy</strong> reserves the right to modify these terms and conditions at any time. Any changes will
          be posted on this page, and your continued use of the website following the posting of changes constitutes
          your acceptance of the revised terms.
        </p>

        <h2 className={classes.title}>11. Governing Law</h2>
        <p className={classes.description}>
          These terms and conditions are governed by and construed in accordance with the laws of Armenia. Any disputes
          arising from or relating to these terms shall be resolved in the courts of Armenia.
        </p>

        <h2 className={classes.title}>12. Contact Information</h2>
        <p className={classes.description}>
          If you have any questions about these terms and conditions, please contact us at vanikvardanyandev@gmail.com .
        </p>
      </div>
    </Container>
  )
}

export default TermsAndConditions
