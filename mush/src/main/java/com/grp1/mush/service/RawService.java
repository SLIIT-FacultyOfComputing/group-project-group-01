package com.grp1.mush.service;

import com.grp1.mush.dto.RawDTO;
import com.grp1.mush.model.Raw;
import com.grp1.mush.repo.RawRepo;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;


import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.io.ByteArrayOutputStream;
import java.util.List;


@Service
@Transactional
public class RawService {
    @Autowired
    private RawRepo RawRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired 
    private StockService stockService;

    public List<RawDTO> getAllRaws() {
        List<Raw> RawList = RawRepo.findAll();
        return modelMapper.map(RawList,new TypeToken<List<RawDTO>>(){}.getType());
    }
    public RawDTO saveRaw(RawDTO RawDTO) {
        RawRepo.save(modelMapper.map(RawDTO, Raw.class));
        stockService.updateStock(RawDTO.getMaterial());
        return RawDTO;
    }
    public RawDTO updateRaw(RawDTO RawDTO){
        RawRepo.save(modelMapper.map(RawDTO, Raw.class));
        stockService.updateStock(RawDTO.getMaterial());
        return RawDTO;
    }
    public String deleteRaw(Long id){
        Raw Raw = RawRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Raw not found with id: " + id));
    RawRepo.delete(Raw);
    stockService.updateStock(Raw.getMaterial());
    return "Raw Deleted";
    }
    public RawDTO getRawById(Long id) {
        Raw Raw = RawRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Raw not found with id: " + id));
        return modelMapper.map(Raw, RawDTO.class);
    }

    public ResponseEntity<ByteArrayResource> downloadPdf() {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
            Paragraph title = new Paragraph("Material List", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph(" ")); 

            PdfPTable table = new PdfPTable(3); 
            table.setWidthPercentage(100); 

            Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
            PdfPCell idHeader = new PdfPCell(new Phrase("ID", headerFont));
            PdfPCell materialHeader = new PdfPCell(new Phrase("Material", headerFont));
            PdfPCell stockHeader = new PdfPCell(new Phrase("Stock", headerFont));
            table.addCell(idHeader);
            table.addCell(materialHeader);
            table.addCell(stockHeader);

            Font cellFont = new Font(Font.FontFamily.HELVETICA, 12);
            List<Raw> Raws = RawRepo.findAll();
            
            for (Raw Raw : Raws) {
                table.addCell(new PdfPCell(new Phrase(String.valueOf(Raw.getId()), cellFont)));
                table.addCell(new PdfPCell(new Phrase(Raw.getMaterial(), cellFont)));
                table.addCell(new PdfPCell(new Phrase(String.valueOf(Raw.getStock()), cellFont)));;
            }
            document.add(table);
            document.close();

            ByteArrayResource resource = new ByteArrayResource(out.toByteArray());
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=result.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }   
}