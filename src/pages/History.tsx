import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

// Mock data for history reports
const mockReports = [
  {
    id: 1,
    childName: "Emma Johnson",
    parentName: "Robert Johnson",
    date: "2024-12-15",
    day: "Monday",
    time: "14:30",
    summary: "Healthy weight for age, normal height percentile"
  },
  {
    id: 2,
    childName: "Emma Johnson",
    parentName: "Robert Johnson",
    date: "2024-12-01",
    day: "Monday",
    time: "10:15",
    summary: "Slight underweight, height within normal range"
  },
  {
    id: 3,
    childName: "Michael Chen",
    parentName: "Jennifer Chen",
    date: "2024-11-28",
    day: "Friday",
    time: "16:45",
    summary: "Normal growth patterns, good nutrition indicators"
  },
  {
    id: 4,
    childName: "Sophia Williams",
    parentName: "David Williams",
    date: "2024-11-20",
    day: "Wednesday",
    time: "09:30",
    summary: "Above average height, healthy weight gain"
  }
];

const History = () => {
  const [reports] = useState(mockReports);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">History</h1>
            <p className="text-xl text-muted-foreground">
              View past analyzed reports and growth assessments
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Analysis Reports</h2>
                <p className="text-sm text-muted-foreground">Historical data and growth assessments</p>
              </div>
            </div>

            <div className="space-y-6">
              {reports.map((report) => (
                <div key={report.id} className="p-6 bg-muted/50 rounded-lg border border-border hover:bg-muted/70 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-foreground">{report.childName}</h3>
                        <span className="text-muted-foreground">•</span>
                        <p className="text-sm text-muted-foreground">Parent: {report.parentName}</p>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{report.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{report.day}, {report.time}</span>
                        </div>
                      </div>
                      
                      {report.summary && (
                        <p className="mt-3 text-muted-foreground">
                          {report.summary}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {reports.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No reports found</h3>
                <p className="text-muted-foreground">
                  Growth assessment reports will appear here after analysis.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;