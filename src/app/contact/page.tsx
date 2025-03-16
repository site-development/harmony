import { ContactForm } from "@/components/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our team of expert real estate agents is here to help you find your dream home. Get in touch with us today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-muted p-6 rounded-xl text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-accent/10 text-accent rounded-full p-4">
                <Phone className="h-6 w-6" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Call Us</h2>
            <p className="text-muted-foreground mb-4">
              Mon-Fri from 8am to 6pm
            </p>
            <a
              href="tel:+1234567890"
              className="text-accent hover:underline"
            >
              (123) 456-7890
            </a>
          </div>

          <div className="bg-muted p-6 rounded-xl text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-accent/10 text-accent rounded-full p-4">
                <Mail className="h-6 w-6" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Email Us</h2>
            <p className="text-muted-foreground mb-4">
              We'll respond within 24 hours
            </p>
            <a
              href="mailto:info@harmonyrealestate.com"
              className="text-accent hover:underline"
            >
              info@harmonyrealestate.com
            </a>
          </div>

          <div className="bg-muted p-6 rounded-xl text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-accent/10 text-accent rounded-full p-4">
                <MapPin className="h-6 w-6" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Visit Us</h2>
            <p className="text-muted-foreground mb-4">
              Come by our office
            </p>
            <address className="not-italic text-accent">
              123 Real Estate Blvd<br />
              Denver, CO 80000
            </address>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <p className="text-muted-foreground mb-8">
              Fill out the form below and we'll get back to you as soon as possible. We value your time and are committed to providing excellent service.
            </p>

            <div className="bg-muted p-8 rounded-xl">
              <ContactForm />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Office Location</h2>
            <p className="text-muted-foreground mb-8">
              Our centrally located office is easily accessible with plenty of parking available. We welcome you to visit us in person.
            </p>

            <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-muted">
              {/* Mock map for simplicity */}
              <div className="absolute inset-0 bg-zinc-200 flex items-center justify-center">
                <div className="p-6 bg-white rounded-lg shadow-md text-center">
                  <h3 className="font-semibold mb-2">Harmony Real Estate</h3>
                  <p className="text-sm text-muted-foreground">
                    123 Real Estate Blvd, Denver, CO 80000
                  </p>
                  <p className="text-xs mt-2 text-muted-foreground">
                    Interactive map would be displayed here
                  </p>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-500 rounded-full border-2 border-white"></div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Business Hours</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
