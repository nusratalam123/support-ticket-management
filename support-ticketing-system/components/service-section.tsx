import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { MessageSquare, LifeBuoy, Clock, CheckCircle } from "lucide-react";

const Services = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <section id="services" className="py-12 md:py-30 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Quick Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get answers to your queries in record time with our efficient support system.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LifeBuoy className="w-5 h-5 mr-2" />
                  24/7 Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our support team is available round the clock to assist you with any issues.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Real-time Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Stay informed with real-time updates on your support ticket status.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Issue Resolution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We're committed to resolving your issues quickly and effectively.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
