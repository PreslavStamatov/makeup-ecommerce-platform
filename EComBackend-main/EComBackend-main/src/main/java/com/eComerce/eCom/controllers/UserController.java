package com.eComerce.eCom.controllers;

import com.eComerce.eCom.entities.*;
import com.eComerce.eCom.entities.dtos.BoughtMakeupExportDTO;
import com.eComerce.eCom.entities.BoughtMakeup;
import com.eComerce.eCom.entities.dtos.ShadeDTO;
import com.eComerce.eCom.entities.dtos.ShoppingBagExportDto;
import com.eComerce.eCom.entities.dtos.UserDataDto;
import com.eComerce.eCom.repositories.RoleRepository;
import com.eComerce.eCom.repositories.ShoppingBagRepository;
import com.eComerce.eCom.repositories.UserRepository;
import com.eComerce.eCom.security.JwtGenerator;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final JwtGenerator jwtGenerator;

    private RoleRepository roleRepository;

    private ShoppingBagRepository shoppingBagRepository;

    private UserRepository userRepository;

    private ModelMapper modelMapper;

    private List<BoughtMakeupExportDTO> mapProducts(List<BoughtMakeup> products) {
        return products.stream()
                .map(product -> {
                    // Map the Product to its DTO
                    BoughtMakeupExportDTO productDto = this.modelMapper.map(product, BoughtMakeupExportDTO.class);

                    // Handle null shade by setting an empty Shade DTO
                    if (product.getShade() == null) {
                        productDto.setShade(new ShadeDTO());
                    }
                    return productDto;
                })
                .collect(Collectors.toList());
    }

    @Autowired
    public UserController(JwtGenerator jwtGenerator, RoleRepository roleRepository, ShoppingBagRepository shoppingBagRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.jwtGenerator = jwtGenerator;
        this.roleRepository = roleRepository;
        this.shoppingBagRepository = shoppingBagRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;

        TypeMap<BoughtMakeup, BoughtMakeupExportDTO> exportMakeupMap = this.modelMapper.createTypeMap(BoughtMakeup.class, BoughtMakeupExportDTO.class);
        exportMakeupMap.addMapping(source -> {
            return source.getMakeup().getName();
        }, BoughtMakeupExportDTO::setMakeupShades);

        exportMakeupMap.addMappings(mapper -> {
            mapper.map(src -> src.getShade().getName(), BoughtMakeupExportDTO::setMakeupShades);
        });






        // Create a TypeMap for ShoppingBag -> ShoppingBagExportDto
        TypeMap<ShoppingBag, ShoppingBagExportDto> shoppingBagTypeMap =
                this.modelMapper.createTypeMap(ShoppingBag.class, ShoppingBagExportDto.class);

// Map products using the helper method
        shoppingBagTypeMap.addMappings(mapper -> {
            mapper.using(context -> mapProducts((List<BoughtMakeup>) context.getSource()))
                    .map(ShoppingBag::getProducts, ShoppingBagExportDto::setProducts);
        });

    }


    // Secured endpoint to get user data based on JWT token
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/data")
    public ResponseEntity<UserDataDto> getUserData() {
        // Get the current authenticated user (from SecurityContext)
        User authenticatedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Role> roles = authenticatedUser.getAuthorities().stream()
                .map(grantedAuthority -> {
                    String roleName = grantedAuthority.getAuthority(); // Extract role name
                    return roleRepository.findByName(roleName).orElseThrow(() ->
                            new RuntimeException("Role not found: " + roleName));
                })
                .collect(Collectors.toList());

        // You can use the username to fetch more detailed user info from the database
        String email = authenticatedUser.getUsername();
        UserEntity userEntity = userRepository.findByEmail(email).get();
        // For the sake of example, let's just return a mock user entity with the username

        // You can fetch additional data here from the database if needed
        UserDataDto userDataDto = new UserDataDto();
        Optional<ShoppingBag> optionalShoppingBag = shoppingBagRepository.findByUser_Email(email);
        if(optionalShoppingBag.isEmpty()) {
            userEntity.setShoppingBag(new ShoppingBag());
            userRepository.saveAndFlush(userEntity);
        }
        ShoppingBag shoppingBag = optionalShoppingBag.get();
        userDataDto.setUsername(userEntity.getUsername());
        userDataDto.setEmail(userEntity.getEmail());
        userDataDto.setShoppingBag(modelMapper.map(shoppingBag, ShoppingBagExportDto.class));

        return new ResponseEntity<>(userDataDto, HttpStatus.OK);
    }
}
