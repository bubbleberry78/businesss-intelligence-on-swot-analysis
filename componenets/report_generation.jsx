import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "./report_generation.css";

const ReportGenerator = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const sessionId = sessionStorage.getItem("sessionId");
      const response = await fetch(
        `http://localhost:5000/api/data/${sessionId}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const fetchedData = await response.json();
      setData(fetchedData);
      console.log(fetchedData); // Update the 'data' state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateGrowth = (fieldData) => {
    if (fieldData.length < 2) {
      return null; // If there are less than 2 data points, return null
    }

    const numericFieldData = fieldData.map(Number);

    const initialValue = numericFieldData[0];
    const finalValue = numericFieldData[numericFieldData.length - 1];
    const growthPercentage = ((finalValue - initialValue) / initialValue) * 100;

    return growthPercentage;
  };

  const categorizeField = (growthPercentage) => {
    if (growthPercentage >= 80) {
      return "Strengths";
    } else if (growthPercentage >= 70) {
      return "Opportunities";
    } else if (growthPercentage >= 45 && growthPercentage <= 69) {
      return "Weaknesses";
    } else {
      return "Threats";
    }
  };

  const generateFieldDescription = (fieldName, category) => {
    switch (category) {
      case "Strengths":
        return wrapText(
          `${fieldName} is considered to be a strength as it is growing at a rapid pace every day. 
          This indicates a strong and positive trend for the ${fieldName} aspect of the business.`
        );
      case "Weaknesses":
        return wrapText(
          `${fieldName} is facing challenges in growth. 
          Strategies need to be devised to overcome these weaknesses. 
          Identifying and addressing these weaknesses is crucial for improving the overall performance of the ${fieldName} aspect.`
        );
      case "Opportunities":
        return wrapText(
          `${fieldName} presents opportunities for growth.
           There is potential to enhance and strengthen this field further. 
           Exploring and capitalizing on these opportunities can lead to significant growth in the ${fieldName} area.`
        );
      case "Threats":
        return wrapText(
          `${fieldName} is facing obstacles in growth.
           Efforts should be made to address these threats and improve the field's performance. 
           Identifying and mitigating these threats is essential to protect the ${fieldName} aspect from potential harm.`
        );
      default:
        return `No specific description available for ${fieldName}.`;
    }
  };

  const wrapText = (text) => {
    const maxWidth = 500; // Max width before wrapping
    const lineHeight = 20; // Line height for each line
    let words = text.split(" ");
    let lines = [];
    let currentLine = "";

    words.forEach((word) => {
      let width =
        currentLine.length === 0
          ? word.length
          : currentLine.length + word.length + 1;
      if (width <= maxWidth) {
        if (currentLine.length === 0) {
          currentLine = word;
        } else {
          currentLine += " " + word;
        }
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    return lines.join("\n");
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Strengths":
        return [0, 255, 0]; // Green color for Strengths
      case "Opportunities":
        return [255, 255, 0]; // Yellow color for Opportunities
      case "Weaknesses":
        return [0, 0, 255]; // Red color for Weaknesses
      case "Threats":
        return [255, 0, 0]; // Blue color for Threats
      default:
        return [0, 0, 0]; // Default color (black) for unknown categories
    }
  };

  const handleGeneratePDF = () => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: [1000, 600],
    });

    let y = 60;
    let maxWidth = 0;

    const fieldsToConsider = [
      "profit",
      "sales",
      "production",
      "marketSize",
      "customer",
      "costing",
      "operatingExpenses",
    ];

    fieldsToConsider.forEach((fieldName) => {
      const fieldData = data
        .map((entry) => entry[fieldName])
        .filter((value) => value !== undefined);
      const growthPercentage = calculateGrowth(fieldData);
      maxWidth = Math.max(maxWidth, growthPercentage);
    });

    pdf.setFont("helvetica", "normal");
    pdf.text(
      `REPORT : SWOT ANALYSIS`,
      pdf.internal.pageSize.width / 2,
      y + 30,
      {
        align: "center",
      }
    );
    y += 30;

    const addFooter = (pageNum, pageCount) => {
      const date = new Date().toLocaleDateString();
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text(
        `Generated on :${date} |  Page ${pageNum} of ${pageCount} |  BI_ANALYTICS`,
        40,
        pdf.internal.pageSize.height - 20
      );
    };

    fieldsToConsider.forEach((fieldName) => {
      const fieldData = data
        .map((entry) => entry[fieldName])
        .filter((value) => value !== undefined);
      const growthPercentage = calculateGrowth(fieldData);
      const category = categorizeField(growthPercentage);
      const color = getCategoryColor(category);

      if (y + 150 > pdf.internal.pageSize.height) {
        const pageCount = pdf.internal.getNumberOfPages();
        if (pageCount > 1) {
          pdf.setPage(pageCount - 1);
        }
        addFooter(pageCount, pageCount);
        pdf.addPage();
        y = 50; // Reset y-coordinate for the new page
      }

      pdf.setFont("helvetica", "bold");
      pdf.text(`Category: ${category}`, 60, y + 35);
      pdf.text(`${fieldName}:`, 60, y + 15);
      pdf.setFont("helvetica", "normal");
      pdf.text(generateFieldDescription(fieldName, category), 60, y + 55);

      pdf.text(
        `Growth Percentage: ${growthPercentage.toFixed(2)}%`,
        120,
        y + 120
      );

      y += 140;
    });

    
    const barSpacing = 10; // Spacing between bars
    const chartX = 50; // X-coordinate of the chart
    let chartY = 250; // Y-coordinate of the chart

    const maxGrowthPercentage = Math.max(
      ...fieldsToConsider.map((fieldName) => {
        const fieldData = data
          .map((entry) => entry[fieldName])
          .filter((value) => value !== undefined);
        return calculateGrowth(fieldData);
      })
    );

    const scaleFactor = 200 / maxGrowthPercentage;

    fieldsToConsider.forEach((fieldName, index) => {
      // Calculate growth percentage and category for the field
      const fieldData = data
        .map((entry) => entry[fieldName])
        .filter((value) => value !== undefined);
      const growthPercentage = calculateGrowth(fieldData);
      const category = categorizeField(growthPercentage);

      const barWidth = 80; // Fixed width for each bar
      const barHeight = growthPercentage * scaleFactor;

      const barX = chartX + index * (barWidth + barSpacing);
      const barY = chartY + (200 - barHeight);

      const color = getCategoryColor(category);
      pdf.setFillColor(color[0], color[1], color[2]);

      pdf.rect(barX, barY, barWidth, barHeight, "F");

      pdf.text(
        `${growthPercentage.toFixed(2)}%`,
        barX + barWidth / 2,
        barY - 10,
        "center"
      );
      pdf.text(fieldName, barX + barWidth / 2, barY + 20, "center");
    });
    
    chartY += maxGrowthPercentage * scaleFactor + 50;
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.rect(
        40,
        40,
        pdf.internal.pageSize.width - 80,
        pdf.internal.pageSize.height - 80,
        "S"
      );
      addFooter(i, pageCount);
    }

    pdf.save("report.pdf");
  };

  

  return (
    <div>
      <button className="reportbtn" onClick={handleGeneratePDF}>
        Generate report
      </button>
    </div>
  );
};

export default ReportGenerator;
