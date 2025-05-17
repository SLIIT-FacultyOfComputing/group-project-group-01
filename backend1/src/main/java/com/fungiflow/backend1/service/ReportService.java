package com.fungiflow.backend1.service;

import com.fungiflow.backend1.model.Sale;
import com.fungiflow.backend1.model.Report;
import com.fungiflow.backend1.repo.SaleRepo;
import com.fungiflow.backend1.repo.ReportRepo;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtils;
import org.jfree.chart.JFreeChart;
import org.jfree.data.category.DefaultCategoryDataset;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    private SaleRepo saleRepo;

    @Autowired
    private ReportRepo reportRepo;

    private final String REPORT_PATH = "reports/";

    public byte[] generateSalesReport(String type, int year, int month, String generatedBy) throws IOException {
        List<Sale> sales;

        // Generate file name based on report type (monthly or yearly)
        String fileName = generateFileName(type, year, month);

        // Fetch sales data based on report type
        sales = fetchSalesData(type, year, month);

        // Ensure report directory exists
        File reportDir = new File(REPORT_PATH);
        if (!reportDir.exists()) {
            reportDir.mkdirs();  // Create the directory if it doesn't exist
        }

        // Define file path for the report
        String filePath = REPORT_PATH + fileName;

        try (PdfWriter writer = new PdfWriter(new FileOutputStream(filePath));
             PdfDocument pdf = new PdfDocument(writer);
             Document doc = new Document(pdf)) {

            // Title and Header
            doc.add(new Paragraph("Sales Performance Report")
                    .setBold()
                    .setFontSize(18)
                    .setTextAlignment(TextAlignment.CENTER));
            doc.add(new Paragraph("Type: " + type.toUpperCase() + " | Generated: " + LocalDateTime.now())
                    .setFontSize(10)
                    .setTextAlignment(TextAlignment.RIGHT));
            doc.add(new Paragraph("\n"));

            // Table for sales data
            Table table = createSalesTable(sales);
            doc.add(table);

            // Total Sales
            double total = sales.stream().mapToDouble(Sale::getPrice).sum();
            doc.add(new Paragraph("\nTotal Sales: Rs. " + total).setBold());

            // Chart for sales data
            Image chartImage = new Image(ImageDataFactory.create(generateChart(sales)));
            chartImage.setAutoScale(true);
            doc.add(new Paragraph("\nSales Chart").setBold());
            doc.add(chartImage);
        }

        // Save report metadata to the database
        reportRepo.save(new Report(
                type.toUpperCase(),
                fileName,
                filePath,
                LocalDateTime.now(),
                generatedBy
        ));

        // Return the generated PDF as byte array
        return Files.readAllBytes(Paths.get(filePath));
    }

    // Helper method to generate file name based on type, year, and month
    private String generateFileName(String type, int year, int month) {
        if ("monthly".equalsIgnoreCase(type)) {
            return "Sales_Report_" + year + "_" + month + ".pdf";
        } else {
            return "Sales_Report_" + year + ".pdf";
        }
    }

    // Helper method to fetch sales data based on report type
    private List<Sale> fetchSalesData(String type, int year, int month) {
        if ("monthly".equalsIgnoreCase(type)) {
            YearMonth yearMonth = YearMonth.of(year, month);
            LocalDate start = yearMonth.atDay(1);
            LocalDate end = yearMonth.atEndOfMonth();
            return saleRepo.findAll().stream()
                    .filter(s -> !s.getDate().isBefore(start) && !s.getDate().isAfter(end))
                    .collect(Collectors.toList());
        } else {
            return saleRepo.findAll().stream()
                    .filter(s -> s.getDate().getYear() == year)
                    .collect(Collectors.toList());
        }
    }

    // Helper method to create the sales data table for the PDF
    private Table createSalesTable(List<Sale> sales) {
        Table table = new Table(UnitValue.createPercentArray(5)).useAllAvailableWidth();
        table.addHeaderCell("Customer");
        table.addHeaderCell("Product");
        table.addHeaderCell("Unit Price");
        table.addHeaderCell("Quantity");
        table.addHeaderCell("Total Price");

        for (Sale s : sales) {
            table.addCell(s.getCustomerName());
            table.addCell(s.getProductName());
            table.addCell(String.valueOf(s.getUnitPrice()));
            table.addCell(String.valueOf(s.getQuantity()));
            table.addCell(String.valueOf(s.getPrice()));
        }

        return table;
    }

    // Helper method to generate chart for the sales report
    private byte[] generateChart(List<Sale> sales) throws IOException {
        DefaultCategoryDataset dataset = new DefaultCategoryDataset();
        Map<String, Double> grouped = sales.stream()
                .collect(Collectors.groupingBy(
                        Sale::getProductName,
                        Collectors.summingDouble(Sale::getPrice)
                ));

        for (Map.Entry<String, Double> entry : grouped.entrySet()) {
            dataset.addValue(entry.getValue(), "Sales", entry.getKey());
        }

        JFreeChart chart = ChartFactory.createBarChart(
                "Sales by Product",
                "Product",
                "Amount (Rs.)",
                dataset
        );

        ByteArrayOutputStream chartOut = new ByteArrayOutputStream();
        ChartUtils.writeChartAsPNG(chartOut, chart, 500, 400);
        return chartOut.toByteArray();
    }
}
