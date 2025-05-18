package com.fungiflow.backend1.service;

import com.fungiflow.backend1.model.Sale;
import com.fungiflow.backend1.model.DailyUpdate;
import com.fungiflow.backend1.model.Report;
import com.fungiflow.backend1.repo.DailyUpdateRepository;
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

    @Autowired
    private DailyUpdateRepository dailyUpdateRepo;

    private final String REPORT_PATH = "reports/";

    // ------------------------
    // SALES REPORT
    // ------------------------
    public byte[] generateSalesReport(String type, int year, int month, String generatedBy) throws IOException {
        List<Sale> sales = fetchSalesData(type, year, month);
        String fileName = generateSalesFileName(type, year, month);
        String filePath = REPORT_PATH + fileName;

        File reportDir = new File(REPORT_PATH);
        if (!reportDir.exists()) reportDir.mkdirs();

        try (PdfWriter writer = new PdfWriter(new FileOutputStream(filePath));
             PdfDocument pdf = new PdfDocument(writer);
             Document doc = new Document(pdf)) {

            doc.add(new Paragraph("Sales Performance Report")
                    .setBold()
                    .setFontSize(18)
                    .setTextAlignment(TextAlignment.CENTER));
            doc.add(new Paragraph("Type: " + type.toUpperCase() + " | Generated: " + LocalDateTime.now())
                    .setFontSize(10)
                    .setTextAlignment(TextAlignment.RIGHT));
            doc.add(new Paragraph("\n"));

            Table table = createSalesTable(sales);
            doc.add(table);

            double total = sales.stream().mapToDouble(Sale::getPrice).sum();
            doc.add(new Paragraph("\nTotal Sales: Rs. " + total).setBold());

            Image chartImage = new Image(ImageDataFactory.create(generateSalesChart(sales)));
            chartImage.setAutoScale(true);
            doc.add(new Paragraph("\nSales Chart").setBold());
            doc.add(chartImage);
        }

        reportRepo.save(new Report(
                type.toUpperCase(),
                fileName,
                filePath,
                LocalDateTime.now(),
                generatedBy
        ));

        return Files.readAllBytes(Paths.get(filePath));
    }

    private String generateSalesFileName(String type, int year, int month) {
        return "monthly".equalsIgnoreCase(type)
                ? "Sales_Report_" + year + "_" + month + ".pdf"
                : "Sales_Report_" + year + ".pdf";
    }

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

    private byte[] generateSalesChart(List<Sale> sales) throws IOException {
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

    // ------------------------
    // LAB SUCCESS REPORT
    // ------------------------
    @Autowired
    private DailyUpdateRepository dailyUpdateRepository;

    public byte[] generateLabReport(String type, int year, int month, String generatedBy) throws IOException {
        List<DailyUpdate> updates = fetchLabData(type, year, month);
        String fileName = generateLabFileName(type, year, month);
        String filePath = REPORT_PATH + fileName;

        File reportDir = new File(REPORT_PATH);
        if (!reportDir.exists()) {
            reportDir.mkdirs();
        }

        try (PdfWriter writer = new PdfWriter(new FileOutputStream(filePath));
             PdfDocument pdf = new PdfDocument(writer);
             Document doc = new Document(pdf)) {

            doc.add(new Paragraph("Lab Performance Report")
                    .setBold()
                    .setFontSize(18)
                    .setTextAlignment(TextAlignment.CENTER));
            doc.add(new Paragraph("Type: " + type.toUpperCase() + " | Generated: " + LocalDateTime.now())
                    .setFontSize(10)
                    .setTextAlignment(TextAlignment.RIGHT));
            doc.add(new Paragraph("\n"));

            Table table = new Table(UnitValue.createPercentArray(5)).useAllAvailableWidth();
            table.addHeaderCell("Date");
            table.addHeaderCell("Mushroom Type");
            table.addHeaderCell("Successful");
            table.addHeaderCell("Contaminated");
            table.addHeaderCell("Reason");

            for (DailyUpdate update : updates) {
                table.addCell(update.getDate().toString());
                table.addCell(update.getSeed().getType().toString());
                table.addCell(String.valueOf(update.getSuccessfulToday()));
                table.addCell(String.valueOf(update.getContaminatedToday()));
                table.addCell(update.getContaminationReason() != null ? update.getContaminationReason() : "N/A");
            }

            doc.add(table);

            int totalSuccess = updates.stream().mapToInt(DailyUpdate::getSuccessfulToday).sum();
            int totalContaminated = updates.stream().mapToInt(DailyUpdate::getContaminatedToday).sum();

            doc.add(new Paragraph("\nTotal Successful: " + totalSuccess).setBold());
            doc.add(new Paragraph("Total Contaminated: " + totalContaminated).setBold());

            Image chart = new Image(ImageDataFactory.create(generateLabChart(updates)));
            chart.setAutoScale(true);
            doc.add(new Paragraph("\nPerformance Chart").setBold());
            doc.add(chart);
        }

        reportRepo.save(new Report(
                type.toUpperCase(),
                fileName,
                filePath,
                LocalDateTime.now(),
                generatedBy
        ));

        return Files.readAllBytes(Paths.get(filePath));
    }

    private List<DailyUpdate> fetchLabData(String type, int year, int month) {
        if ("monthly".equalsIgnoreCase(type)) {
            YearMonth yearMonth = YearMonth.of(year, month);
            LocalDate start = yearMonth.atDay(1);
            LocalDate end = yearMonth.atEndOfMonth();
            return dailyUpdateRepo.findAll().stream()
                    .filter(d -> !d.getDate().isBefore(start) && !d.getDate().isAfter(end))
                    .collect(Collectors.toList());
        } else {
            return dailyUpdateRepo.findAll().stream()
                    .filter(d -> d.getDate().getYear() == year)
                    .collect(Collectors.toList());
        }
    }

    private String generateLabFileName(String type, int year, int month) {
        if ("monthly".equalsIgnoreCase(type)) {
            return "Lab_Report_" + year + "_" + month + ".pdf";
        } else {
            return "Lab_Report_" + year + ".pdf";
        }
    }

    private byte[] generateLabChart(List<DailyUpdate> updates) throws IOException {
        DefaultCategoryDataset dataset = new DefaultCategoryDataset();

        Map<String, List<DailyUpdate>> grouped = updates.stream()
                .collect(Collectors.groupingBy(u -> u.getSeed().getType().toString()));

        for (Map.Entry<String, List<DailyUpdate>> entry : grouped.entrySet()) {
            String mushroomType = entry.getKey();
            int success = entry.getValue().stream().mapToInt(DailyUpdate::getSuccessfulToday).sum();
            int contaminated = entry.getValue().stream().mapToInt(DailyUpdate::getContaminatedToday).sum();

            dataset.addValue(success, "Successful", mushroomType);
            dataset.addValue(contaminated, "Contaminated", mushroomType);
        }

        JFreeChart chart = ChartFactory.createBarChart(
                "Lab Results by Mushroom Type",
                "Mushroom Type",
                "Count",
                dataset
        );

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        ChartUtils.writeChartAsPNG(out, chart, 500, 400);
        return out.toByteArray();
    }

}
