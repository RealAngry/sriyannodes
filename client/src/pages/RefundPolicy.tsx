
import { SectionHeading } from "@/components/shared/SectionHeading";

const RefundPolicy = () => {
  return (
    <>
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Refund Policy"
            description="At SRIYAN NODES, we're committed to providing exceptional hosting services. Below you'll find our refund policy details."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="prose prose-invert max-w-4xl mx-auto">
            <h2>Refund Eligibility</h2>
            <ul>
              <li><strong>Technical Issues:</strong> Unresolved technical issues within 72 hours of reported incident.</li>
              <li><strong>Server Not As Described:</strong> Major issues or discrepancies between advertised and actual server performance.</li>
            </ul>

            <h2>Important Exclusions</h2>
            <p>No refunds will be issued for server setups, mods, plugins, or server misconfigurations.</p>

            <h2>Refund Request Process</h2>
            <p>To initiate a refund, please contact our support team at our <a href="https://discord.com/channels/1355107161033805834/1356960181438906428" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Discord Server</a> with:</p>
            <ol>
              <li>A payment screenshot</li>
              <li>A clear reason for your refund request</li>
            </ol>

            <h2>Refund Timeline</h2>
            <p>Refunds are typically processed within 7-10 business days and credited back to your original payment method.</p>

            <h2>Non-Refundable Scenarios</h2>
            <ul>
              <li>Change of mind after 24 hours</li>
              <li>Downgrades after billing starts</li>
              <li>Downtime caused by external issues</li>
              <li>If you purchase from any offers / rewards</li>
              <li>Of any plugin / setup</li>
            </ul>

            <h2>Need Assistance?</h2>
            <p>If you have any questions or concerns about our refund policy, don't hesitate to reach out. Our support team is here to help.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default RefundPolicy;
