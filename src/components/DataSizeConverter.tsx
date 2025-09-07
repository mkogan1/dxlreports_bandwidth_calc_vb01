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

const dataSizeUnits = ["Byte", "KB", "MB", "GB", "TB"];

interface ConversionResult {
  unit: string;
  value: string;
}

export function DataSizeConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("MB");
  const [results, setResults] = useState<ConversionResult[]>([]);

  const convert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResults([]);
      return;
    }

    let valueInBytes = 0;
    switch (fromUnit) {
      case "Byte":
        valueInBytes = numValue;
        break;
      case "KB":
        valueInBytes = numValue * 1000;
        break;
      case "MB":
        valueInBytes = numValue * 1000 * 1000;
        break;
      case "GB":
        valueInBytes = numValue * 1000 * 1000 * 1000;
        break;
      case "TB":
        valueInBytes = numValue * 1000 * 1000 * 1000 * 1000;
        break;
    }

    const newResults = dataSizeUnits.map((unit) => {
      let convertedValue = 0;
      switch (unit) {
        case "Byte":
          convertedValue = valueInBytes;
          break;
        case "KB":
          convertedValue = valueInBytes / 1000;
          break;
        case "MB":
          convertedValue = valueInBytes / 1000 / 1000;
          break;
        case "GB":
          convertedValue = valueInBytes / 1000 / 1000 / 1000;
          break;
        case "TB":
          convertedValue = valueInBytes / 1000 / 1000 / 1000 / 1000;
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
        <CardTitle>Data Size Converter (Decimal)</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="e.g., 1000"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Select value={fromUnit} onValueChange={setFromUnit}>
            <SelectTrigger>
              <SelectValue placeholder="From" />
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
