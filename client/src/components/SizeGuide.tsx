import { Button } from "@/components/ui/button";
import { useState } from "react";
import { saveAs } from 'file-saver';

const SizeGuide = () => {
  const [sizeUnit, setSizeUnit] = useState<'cm' | 'inch'>('cm');

  const sizeData = {
    cm: [
      { age: '2-3 Years', height: '92-98', chest: '53-55', waist: '51-52', size: '2-3' },
      { age: '4-5 Years', height: '104-110', chest: '56-58', waist: '53-54', size: '4-5' },
      { age: '6-7 Years', height: '116-122', chest: '59-61', waist: '56-57', size: '6-7' },
      { age: '8-9 Years', height: '128-134', chest: '62-65', waist: '59-61', size: '8-9' },
      { age: '10-11 Years', height: '140-146', chest: '66-69', waist: '63-65', size: '10-11' },
    ],
    inch: [
      { age: '2-3 Years', height: '36-38', chest: '20-21', waist: '20-20.5', size: '2-3' },
      { age: '4-5 Years', height: '41-43', chest: '22-23', waist: '21-21.5', size: '4-5' },
      { age: '6-7 Years', height: '45-48', chest: '23-24', waist: '22-22.5', size: '6-7' },
      { age: '8-9 Years', height: '50-53', chest: '24-25', waist: '23-24', size: '8-9' },
      { age: '10-11 Years', height: '55-57', chest: '26-27', waist: '25-25.5', size: '10-11' },
    ]
  };

  const displaySizeData = sizeData[sizeUnit];

  const handleDownloadChart = () => {
    // In a real app, this would download a PDF file
    // For demo purposes, we'll create a simple text file
    const content = `
      FourKids Size Chart (${sizeUnit})
      
      Age | Height | Chest | Waist | Size
      ----|--------|-------|-------|-----
      ${displaySizeData.map(row => 
        `${row.age} | ${row.height} | ${row.chest} | ${row.waist} | ${row.size}`
      ).join('\n')}
      
      How to Measure:
      - Height: Measure from the top of the head to the sole of the foot while standing straight.
      - Chest: Measure around the fullest part of the chest, keeping the tape measure horizontal.
      - Waist: Measure around the natural waistline, keeping the tape measure snug but not tight.
    `;
    
    const blob = new Blob([content], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "fourkids-size-chart.txt");
  };

  return (
    <section className="container mx-auto px-4 py-8 bg-white rounded-xl shadow-sm">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4">Kids Size Guide</h2>
          <p className="text-gray-600 mb-6">
            Not sure which size to choose? Use our easy size guide to find the perfect fit for your child.
          </p>
          
          <div className="flex mb-4">
            <Button
              variant={sizeUnit === 'cm' ? 'default' : 'outline'}
              onClick={() => setSizeUnit('cm')}
              className="mr-2"
            >
              Centimeters (cm)
            </Button>
            <Button
              variant={sizeUnit === 'inch' ? 'default' : 'outline'}
              onClick={() => setSizeUnit('inch')}
            >
              Inches (in)
            </Button>
          </div>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="py-2 px-4 text-left">Age</th>
                  <th className="py-2 px-4 text-left">Height ({sizeUnit})</th>
                  <th className="py-2 px-4 text-left">Chest ({sizeUnit})</th>
                  <th className="py-2 px-4 text-left">Waist ({sizeUnit})</th>
                  <th className="py-2 px-4 text-left">Size</th>
                </tr>
              </thead>
              <tbody>
                {displaySizeData.map((row, index) => (
                  <tr key={index} className="border-b border-muted">
                    <td className="py-2 px-4">{row.age}</td>
                    <td className="py-2 px-4">{row.height}</td>
                    <td className="py-2 px-4">{row.chest}</td>
                    <td className="py-2 px-4">{row.waist}</td>
                    <td className="py-2 px-4 font-semibold">{row.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button
              variant="default"
              onClick={() => window.open('/size-guide', '_blank')}
              className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition"
            >
              View Complete Guide
            </Button>
            <Button
              variant="outline"
              onClick={handleDownloadChart}
              className="border border-primary text-primary font-bold py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition"
            >
              Download Size Chart
            </Button>
          </div>
        </div>
        
        <div className="md:w-1/2 p-6">
          <img 
            src="https://images.unsplash.com/photo-1551966775-a4ddc8df052b" 
            alt="Child measuring guide" 
            className="rounded-xl shadow-md w-full max-w-md mx-auto" 
          />
          
          <div className="mt-6 bg-muted p-4 rounded-lg">
            <h4 className="font-bold mb-2">How to Measure</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>Height: Measure from the top of the head to the sole of the foot while standing straight.</li>
              <li>Chest: Measure around the fullest part of the chest, keeping the tape measure horizontal.</li>
              <li>Waist: Measure around the natural waistline, keeping the tape measure snug but not tight.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SizeGuide;
