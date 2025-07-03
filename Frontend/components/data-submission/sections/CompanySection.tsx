import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";

interface CompanySectionProps {
  companyName: string;
  setCompanyName: (value: string) => void;
  reportingYear: string;
  setReportingYear: (value: string) => void;
  totalRevenue: string;
  setTotalRevenue: (value: string) => void;
}

export const CompanySection = ({
  companyName,
  setCompanyName,
  reportingYear,
  setReportingYear,
  totalRevenue,
  setTotalRevenue,
}: CompanySectionProps) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Company Name Field */}
      <div className="space-y-2">
        <Label htmlFor="company-name">
          <div className="flex items-center gap-2">
            Company Name
            <span className="text-red-500">*</span>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </div>
        </Label>
        <Input
          id="company-name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter company name"
          className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
          required
        />
      </div>

      {/* Reporting Year Field */}
      <div className="space-y-2">
        <Label htmlFor="reporting-year">
          <div className="flex items-center gap-2">
            Reporting Year
            <span className="text-red-500">*</span>
          </div>
        </Label>
        <Input
          id="reporting-year"
          type="number"
          value={reportingYear}
          onChange={(e) => setReportingYear(e.target.value)}
          placeholder="2023"
          min="2000"
          max="2099"
          className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
          required
        />
      </div>

      {/* Total Revenue Field */}
      <div className="space-y-2">
        <Label htmlFor="total-revenue">Total Revenue (USD)</Label>
        <Input
          id="total-revenue"
          type="number"
          value={totalRevenue}
          onChange={(e) => setTotalRevenue(e.target.value)}
          placeholder="Amount in USD"
          min="0"
          step="0.01"
          className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
        />
      </div>
    </div>
  );
};