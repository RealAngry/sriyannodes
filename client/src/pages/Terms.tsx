
import { SectionHeading } from "@/components/shared/SectionHeading";

const Terms = () => {
  return (
    <>
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Terms of Service"
            description="Please read these terms carefully before using our services."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="prose prose-invert max-w-4xl mx-auto">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using SriyanNodes' services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

            <h2>2. Services Description</h2>
            <p>SriyanNodes provides game server hosting, VPS hosting, web hosting, and Discord bot hosting services. The specific features and limitations of each service are detailed in the respective service plans.</p>

            <h2>3. User Obligations</h2>
            <p>Users must:</p>
            <ul>
              <li>Provide accurate account information</li>
              <li>Maintain account security</li>
              <li>Comply with all applicable laws</li>
              <li>Not use services for illegal activities</li>
            </ul>

            <h2>4. Payment Terms</h2>
            <p>Users agree to pay all fees associated with their chosen service plan. All payments are non-refundable except as specified in our refund policy.</p>

            <h2>5. Service Availability</h2>
            <p>While we strive for 99.9% uptime, we do not guarantee uninterrupted service. Scheduled maintenance will be communicated in advance.</p>

            <h2>6. Termination</h2>
            <p>We reserve the right to suspend or terminate services for violations of these terms or for non-payment.</p>

            <h2>7. Privacy</h2>
            <p>Our use of your information is governed by our Privacy Policy. By using our services, you consent to our data practices.</p>

            <h2>8. Changes to Terms</h2>
            <p>We may modify these terms at any time. Continued use of our services constitutes acceptance of modified terms.</p>

            <h2>9. Contact</h2>
            <p>For questions about these terms, please contact our support team through Discord.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Terms;
