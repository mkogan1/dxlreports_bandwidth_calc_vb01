import { MebibyteConverter } from "@/components/MebibyteConverter";
import { DataSizeConverter } from "@/components/DataSizeConverter";
import { BandwidthConverter } from "@/components/BandwidthConverter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 relative w-full">
      <div className="absolute top-6 left-6">
        <img src="/logo.svg" alt="DXLReports Logo" className="w-32 h-8" />
      </div>
      <h1 className="text-4xl font-bold mb-8">DXLReports Bandwidth Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <MebibyteConverter />
        <DataSizeConverter />
        <BandwidthConverter />
      </div>
    </main>
  );
}
