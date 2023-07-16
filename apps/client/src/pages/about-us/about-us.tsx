import Navbar from '~/components/navbar'
import Page from '~/components/page'

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <Page className="space-y-4 mt-20">
        <div className="space-y-2">
          <div className="text-2xl font-bold">Introduction</div>
          <div>
            Welcome to **Mail Bridge**, a powerful and user-friendly email-sending solution designed to streamline your
            communication with customers. With Mail Bridge, you can effortlessly integrate an API route into your form,
            enabling you to send personalized emails directly from your frontend, without the need for a dedicated
            backend. This documentation will guide you through the core features of Mail Bridge, including its API key
            authentication system and convenient email scheduling functionality.
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-2xl font-bold">Problem Statement</div>
          <div>
            Many individuals and businesses seek a hassle-free method to send emails without the complexities of
            managing their own backend infrastructure. These users desire a minimalistic system that can seamlessly
            integrate with their frontend, allowing them to communicate with their customers effectively. Traditional
            email-sending solutions often require the setup and maintenance of backend servers, making the process
            cumbersome and time-consuming.
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-2xl font-bold">Solution</div>
          <div>
            Mail Bridge addresses this challenge by providing a simple yet powerful solution for sending emails directly
            from the frontend of your application. By utilizing the **API key authentication** mechanism, Mail Bridge
            ensures secure and reliable email delivery while maintaining the utmost privacy and data protection. With
            Mail Bridge, you can focus on engaging with your customers and building meaningful connections, rather than
            worrying about technical email infrastructure.
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-2xl font-bold">Key Features</div>
          <ol className="space-y-2">
            <li>
              <span className="text-lg font-medium">API Route Integration</span> Mail Bridge enables you to seamlessly
              hook an API route into your form, allowing you to send emails directly from your frontend application.
              This integration eliminates the need for a dedicated backend and simplifies the email-sending process.
            </li>
            <li>
              <span className="text-lg font-medium">Custom Templates</span> With Mail Bridge, you can create and utilize
              custom email templates, ensuring consistent branding and personalized messaging for your customers. Tailor
              your emails to match your unique style and deliver a memorable experience.
            </li>
            <li>
              <span className="text-lg font-medium">Effortless Authentication</span> Mail Bridge employs API key
              authentication, offering a secure method to authenticate user requests. This ensures that only authorized
              users can send emails through the system, protecting sensitive customer information.
            </li>
            <li>
              <span className="text-lg font-medium">Email Scheduling</span> Take advantage of Mail Bridge&lsquo;s
              additional feature: email scheduling. Plan and automate your email delivery to customers at specific dates
              and times, enhancing your communication strategy and maximizing engagement.
            </li>
          </ol>
        </div>
      </Page>
    </>
  )
}
