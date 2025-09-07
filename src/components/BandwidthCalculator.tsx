"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const dataSizeUnits = ["Byte", "KB", "MB", "GB", "TB"];
const timeUnits = ["Second", "Minute", "Hour", "Day"];
const speedUnits = ["bps", "kbps", "Mbps", "Gbps", "B/s", "KB/s", "MB/s", "GB/s"];

export function BandwidthCalculator() {
  const [dataSize, setDataSize] = useState("");
  const [dataSizeUnit, setDataSizeUnit] = useState("MB");
  const [time, setTime] = useState("");
  const [timeUnit, setTimeUnit] = useState("Second");
  const [speed, setSpeed] = useState("");
  const [speedUnit, setSpeedUnit] = useState("Mbps");
  const [result, setResult] = useState("");

  const calculate = () => {
    const ds = parseFloat(dataSize);
    const t = parseFloat(time);
    const s = parseFloat(speed);

    const emptyFields = [dataSize, time, speed].filter(v => !v).length;

    if (emptyFields !== 1) {
      setResult("Please fill in exactly two fields.");
      return;
    }

    let dataSizeInBits = 0;
    if (!isNaN(ds)) {
      switch (dataSizeUnit) {
        case "Byte":
          dataSizeInBits = ds * 8;
          break;
        case "KB":
          dataSizeInBits = ds * 1024 * 8;
          break;
        case "MB":
          dataSizeInBits = ds * 1024 * 1024 * 8;
          break;
        case "GB":
          dataSizeInBits = ds * 1024 * 1024 * 1024 * 8;
          break;
        case "TB":
          dataSizeInBits = ds * 1024 * 1024 * 1024 * 1024 * 8;
          break;
      }
    }

    let timeInSeconds = 0;
    if (!isNaN(t)) {
      switch (timeUnit) {
        case "Second":
          timeInSeconds = t;
          break;
        case "Minute":
          timeInSeconds = t * 60;
          break;
        case "Hour":
          timeInSeconds = t * 60 * 60;
          break;
        case "Day":
          timeInSeconds = t * 60 * 60 * 24;
          break;
      }
    }

    let speedInBps = 0;
    if (!isNaN(s)) {
      switch (speedUnit) {
        case "bps":
          speedInBps = s;
          break;
        case "kbps":
          speedInBps = s * 1000;
          break;
        case "Mbps":
          speedInBps = s * 1000 * 1000;
          break;
        case "Gbps":
          speedInBps = s * 1000 * 1000 * 1000;
          break;
        case "B/s":
          speedInBps = s * 8;
          break;
        case "KB/s":
          speedInBps = s * 1024 * 8;
          break;
        case "MB/s":
          speedInBps = s * 1024 * 1024 * 8;
          break;
        case "GB/s":
          speedInBps = s * 1024 * 1024 * 1024 * 8;
          break;
      }
    }

    if (!dataSize) {
      const calculatedDataSizeInBits = speedInBps * timeInSeconds;
      const calculatedDataSizeInMB = calculatedDataSizeInBits / 8 / 1024 / 1024;
      setResult(`Data Size: ${calculatedDataSizeInMB.toFixed(2)} MB`);
    } else if (!time) {
      if (speedInBps === 0) {
        setResult("Speed must be greater than 0 to calculate time.");
        return;
      }
      const calculatedTimeInSeconds = dataSizeInBits / speedInBps;
      const minutes = Math.floor(calculatedTimeInSeconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      setResult(
        `Time: ${days}d ${hours % 24}h ${minutes % 60}m ${Math.floor(calculatedTimeInSeconds) % 60}s`
      );
    } else if (!speed) {
      if (timeInSeconds === 0) {
        setResult("Time must be greater than 0 to calculate speed.");
        return;
      }
      const calculatedSpeedInBps = dataSizeInBits / timeInSeconds;
      const calculatedSpeedInMbps = calculatedSpeedInBps / 1000 / 1000;
      setResult(`Speed: ${calculatedSpeedInMbps.toFixed(2)} Mbps`);
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Bandwidth Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Data Size Column */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Data Size</h3>
            <Input
              placeholder="e.g., 100"
              value={dataSize}
              onChange={(e) => setDataSize(e.target.value)}
            />
            <Select value={dataSizeUnit} onValueChange={setDataSizeUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dataSizeUnits.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Column */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Time</h3>
            <Input
              placeholder="e.g., 60"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <Select value={timeUnit} onValueChange={setTimeUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeUnits.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Speed Column */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Speed</h3>
            <Input
              placeholder="e.g., 10"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
            />
            <Select value={speedUnit} onValueChange={setSpeedUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {speedUnits.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button onClick={calculate}>Calculate</Button>
        </div>

        {result && (
          <div className="mt-6 text-center text-xl font-bold">
            {result}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
