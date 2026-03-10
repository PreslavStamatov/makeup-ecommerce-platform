package com.eComerce.eCom.controllers;

import com.eComerce.eCom.entities.Makeup;
import com.eComerce.eCom.entities.dtos.AddCommentDTO;
import com.eComerce.eCom.entities.dtos.GetSpecificProductDTO;
import com.eComerce.eCom.entities.dtos.MakeupExportDTO;
import com.eComerce.eCom.repositories.MakeupRepository;
import com.eComerce.eCom.services.MakeupService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/makeup")
@CrossOrigin("http://localhost:3000/")
public class MakeupController {

    private MakeupRepository makeupRepositorie;
    private ModelMapper modelMapper;
    private MakeupService makeupService;

    @Autowired
    public MakeupController(MakeupRepository makeupRepositorie, ModelMapper modelMapper, MakeupService makeupService) {
        this.makeupRepositorie = makeupRepositorie;
        this.modelMapper = modelMapper;
        this.makeupService = makeupService;
    }

    @GetMapping("/getAll")
    private ResponseEntity<List<MakeupExportDTO>> getAll() {
        List<Makeup> all = makeupRepositorie.findAll();
        List<MakeupExportDTO> collect = all.stream().map(e -> modelMapper.map(e, MakeupExportDTO.class)).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.CREATED).body(collect);
    }

    @PostMapping("/addComment")
    private ResponseEntity<String> addComment (@RequestBody AddCommentDTO addCommentDTO) {
        makeupService.addComment(addCommentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Comment added successfully");
    }

    @PostMapping("/getSpecificProduct")
    private ResponseEntity<MakeupExportDTO> getSpecificProduct(@RequestBody GetSpecificProductDTO getSpecificProductDTO) {
        Makeup makeup = makeupService.getSpecificProduct(getSpecificProductDTO);
        MakeupExportDTO exportMakeup = modelMapper.map(makeup, MakeupExportDTO.class);
        return ResponseEntity.status(HttpStatus.OK).body(exportMakeup);
    }
}
