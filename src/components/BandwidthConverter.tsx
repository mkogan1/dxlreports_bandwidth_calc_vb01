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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const speedUnits = ["bps", "kbps", "Mbps", "Gbps", "B/s", "KB/s", "MB/s", "GB/s"];

interface ConversionResult {
  unit: string;
  value: string;
}

export function BandwidthConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("Mbps");
  const [results, setResults] = useState<ConversionResult[]>([]);

  const convert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResults([]);
      return;
    }

    let valueInBps = 0;
    switch (fromUnit) {
      case "bps":
        valueInBps = numValue;
        break;
      case "kbps":
        valueInBps = numValue * 1000;
        break;
      case "Mbps":
        valueInBps = numValue * 1000 * 1000;
        break;
      case "Gbps":
        valueInBps = numValue * 1000 * 1000 * 1000;
        break;
      case "B/s":
        valueInBps = numValue * 8;
        break;
      case "KB/s":
        valueInBps = numValue * 1024 * 8;
        break;
      case "MB/s":
        valueInBps = numValue * 1024 * 1024 * 8;
        break;
      case "GB/s":
        valueInBps = numValue * 1024 * 1024 * 1024 * 8;
        break;
    }

    const newResults = speedUnits.map((unit) => {
      let convertedValue = 0;
      switch (unit) {
        case "bps":
          convertedValue = valueInBps;
          break;
        case "kbps":
          convertedValue = valueInBps / 1000;
          break;
        case "Mbps":
          convertedValue = valueInBps / 1000 / 1000;
          break;
        case "Gbps":
          convertedValue = valueInBps / 1000 / 1000 / 1000;
          break;
        case "B/s":
          convertedValue = valueInBps / 8;
          break;
        case "KB/s":
          convertedValue = valueInBps / (1024 * 8);
          break;
        case "MB/s":
          convertedValue = valueInBps / (1024 * 1024 * 8);
          break;
        case "GB/s":
          convertedValue = valueInBps / (1024 * 1024 * 1024 * 8);
          break;
      }
      let formattedValue;
      if (convertedValue > 0 && convertedValue < 0.01) {
        formattedValue = convertedValue.toFixed(6);
      } else {
        formattedValue = convertedValue.toFixed(2);
      }
      return { unit, value: formattedValue };
    });

    setResults(newResults);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bandwidth Converter</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="e.g., 100"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Select value={fromUnit} onValueChange={setFromUnit}>
            <SelectTrigger>
              <SelectValue placeholder="From" />
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
        <Button onClick={convert}>Convert</Button>
        {results.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.unit}>
                  <TableCell>{result.unit}</TableCell>
                  <TableCell className="text-right">{result.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
