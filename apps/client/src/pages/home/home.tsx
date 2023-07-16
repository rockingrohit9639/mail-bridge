import { PlusCircleOutlined, SendOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import Page from '~/components/page'
import Navbar from '~/components/navbar'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Navbar Start */}
      <Navbar />
      {/* Navbar End */}

      {/* Hero Section Start */}
      <Page className="mt-16 grid grid-cols-2">
        <div className="p-8 flex flex-col justify-center space-y-4">
          <div className="text-5xl">Effortless Email Communication for Seamless Customer Connections</div>
          <div className="">
            Elevate your customer communication with Mail Bridge. Integrate our API route into your frontend and
            effortlessly send personalized emails. Simplify your processes, maximize engagement, all without the need
            for a dedicated backend.
          </div>
          <div>
            <Link
              to="/signup"
              className="flex items-center space-x-4 bg-primary w-max text-white py-2 px-4 rounded-full"
            >
              <div>Create Account</div>
              <div>
                <PlusCircleOutlined />
              </div>
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img src="/images/hero.svg" alt="hero.svg" />
        </div>
      </Page>
      {/* Hero Section End */}

      <div className="bg-gray-100 p-10">
        <div className="text-center text-2xl mb-4 font-bold">Features</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-white p-8 flex items-center flex-col text-center space-y-6 hover:ring-2 hover:ring-primary rounded-lg cursor-pointer">
            <img src="/images/bar-chart.svg" alt="bar-chart.svg" className="w-24" />
            <div className="text-xl font-bold text-primary">API Route Integration</div>
            <div className="text-gray-500">
              Send emails directly from your frontend without a backend using integrated API routes.
            </div>
          </div>
          <div className="bg-white p-8 flex items-center flex-col justify-center text-center space-y-6 hover:ring-2 hover:ring-primary rounded-lg cursor-pointer">
            <img src="/images/bar-chart.svg" alt="bar-chart.svg" className="w-24" />
            <div className="text-xl font-bold text-primary">Effortless Email Sending</div>
            <div className="text-gray-500">
              Send personalized emails directly from your frontend without a dedicated backend. Simplify communication
              and connect with customers effortlessly.
            </div>
          </div>
          <div className="bg-white p-8 flex items-center flex-col justify-center text-center space-y-6 hover:ring-2 hover:ring-primary rounded-lg cursor-pointer">
            <img src="/images/bar-chart.svg" alt="bar-chart.svg" className="w-24" />
            <div className="text-xl font-bold text-primary">Convenient Email Scheduling</div>
            <div className="text-gray-500">
              Automate email campaigns with ease. Schedule delivery dates and times to reach customers at the perfect
              moment, maximizing impact.
            </div>
          </div>
          <div className="bg-white p-8 flex items-center flex-col justify-center text-center space-y-6 hover:ring-2 hover:ring-primary rounded-lg cursor-pointer">
            <img src="/images/bar-chart.svg" alt="bar-chart.svg" className="w-24" />
            <div className="text-xl font-bold text-primary">Intuitive User Interface</div>
            <div className="text-gray-500">
              Enjoy a user-friendly interface for seamless email sending. Focus on crafting engaging messages and
              enhancing customer relationships.
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Start */}

      <Page className="flex items-center justify-center flex-col space-y-8">
        <div className="space-y-2 text-center">
          <div className="text-2xl font-bold uppercase">
            Get in <span className="text-primary">Touch</span>
          </div>
          <div className="text-sm text-gray-500">
            We&lsquo;re here to assist you. Reach out to us for any inquiries, feedback, or support.
          </div>
        </div>

        <Form
          layout="vertical"
          className="grid grid-cols-2 gap-4 shadow-md rounded-lg border border-primary/30 shadow-primary/20 p-8 w-2/3"
        >
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Name is required!' }]}>
            <Input className="rounded px-4 py-2 border-gray-300" placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Name is required!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input className="rounded px-4 py-2 border-gray-300" placeholder="Enter your email address." />
          </Form.Item>
          <Form.Item name="companyName" label="Company Name">
            <Input className="rounded px-4 py-2 border-gray-300" placeholder="Enter your company name" />
          </Form.Item>
          <Form.Item name="country" label="Country" rules={[{ required: true, message: 'Country is required!' }]}>
            <Input className="rounded px-4 py-2 border-gray-300" placeholder="Enter your country name" />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: 'Message is required!' }]}
            className="col-span-full"
          >
            <Input.TextArea className="rounded border-gray-300" placeholder="Enter your message" rows={5} />
          </Form.Item>

          <div className="col-span-full flex items-center justify-center">
            <Button type="primary" htmlType="submit" className="w-max" icon={<SendOutlined />}>
              Send
            </Button>
          </div>
        </Form>
      </Page>
      {/* Contact Us End */}

      <div className="h-16 border-t flex items-center justify-center">
        <div>© 2023 Mail Bridge. All rights reserved.</div>
      </div>
    </div>
  )
}
