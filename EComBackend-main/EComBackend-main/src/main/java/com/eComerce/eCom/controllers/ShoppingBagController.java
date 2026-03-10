package com.eComerce.eCom.controllers;

import com.eComerce.eCom.entities.BoughtMakeup;
import com.eComerce.eCom.entities.Makeup;
import com.eComerce.eCom.entities.Shade;
import com.eComerce.eCom.entities.ShoppingBag;
import com.eComerce.eCom.entities.dtos.BoughtMakeupExportDTO;
import com.eComerce.eCom.entities.dtos.BoughtMakeupImportDTO;
import com.eComerce.eCom.entities.dtos.ShadeDTO;
import com.eComerce.eCom.repositories.BoughtMakeupRepositorie;
import com.eComerce.eCom.repositories.MakeupRepository;
import com.eComerce.eCom.repositories.ShadeRepository;
import com.eComerce.eCom.repositories.ShoppingBagRepository;
import com.eComerce.eCom.services.ShoppingBagService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/shoppingBag")
@CrossOrigin("http://localhost:3000/")
public class ShoppingBagController {

    ShoppingBagRepository shoppingBagRepositorie;
    ShadeRepository shadeRepositorie;

    BoughtMakeupRepositorie boughtMakeupRepositorie;

    MakeupRepository makeupRepositorie;

    ShoppingBagService shoppingBagService;

    @Autowired
    ModelMapper modelMapper;

    public ShoppingBagController(ShoppingBagRepository shoppingBagRepositorie, ShoppingBagService shoppingBagService, ShadeRepository shadeRepositorie, BoughtMakeupRepositorie boughtMakeupRepositorie, MakeupRepository makeupRepositorie) {
        this.shoppingBagRepositorie = shoppingBagRepositorie;
        this.shadeRepositorie = shadeRepositorie;
        this.boughtMakeupRepositorie = boughtMakeupRepositorie;
        this.modelMapper = new ModelMapper();
        this.modelMapper.createTypeMap(Shade.class, ShadeDTO.class);
        this.makeupRepositorie = makeupRepositorie;
        this.shoppingBagService = shoppingBagService;
    }

    @PostMapping("/addToBag")
    public ResponseEntity<String> addProductToBag(@RequestBody BoughtMakeupExportDTO boughtMakeupExportDTO) {
        User authenticatedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<ShoppingBag> optionalShoppingBag = shoppingBagRepositorie.findByUser_Email(authenticatedUser.getUsername());
        ShoppingBag shoppingBag = optionalShoppingBag.get();
        Makeup makeupFromDB = makeupRepositorie.findByNameLike(boughtMakeupExportDTO.getMakeup().getName());
        Shade shadeFromDB = shadeRepositorie.getShadeByNameLike(boughtMakeupExportDTO.getShade().getName());
        BoughtMakeup boughtMakeup = new BoughtMakeup(makeupFromDB, shadeFromDB);

        if(shoppingBag.getProducts().contains(boughtMakeup)) {
            boughtMakeup = shoppingBag.getProductFromBag(boughtMakeup);
            boughtMakeup.setQuantity(boughtMakeup.getQuantity() + 1);
        }
        else {
            shoppingBag.addToShoppingBag(boughtMakeup);
        }
        boughtMakeupRepositorie.saveAndFlush(boughtMakeup);
        shoppingBagRepositorie.saveAndFlush(shoppingBag);

        return ResponseEntity.status(HttpStatus.CREATED).body("Product added successfully");
    }

    @PostMapping("/removeFromBag")
    public ResponseEntity<String> removeProductFromBag(@RequestBody BoughtMakeupExportDTO boughtMakeupExportDTO) {
        shoppingBagService.removeProductFromBag(boughtMakeupExportDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body("Product removed successfully");
    }

    @GetMapping("/fetchFromBag")
    public ResponseEntity<List<BoughtMakeupExportDTO>> addProductToBag() {


        ShoppingBag shoppingBag = shoppingBagRepositorie.findById(1).get();
        List<BoughtMakeup> boughtMakeup = shoppingBag.getProducts();
        List<BoughtMakeupExportDTO> collect = boughtMakeup.stream().map(e -> modelMapper.map(e, BoughtMakeupExportDTO.class)).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.CREATED).body(collect);
    }

}
