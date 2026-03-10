package com.eComerce.eCom.services;

import com.eComerce.eCom.entities.BoughtMakeup;
import com.eComerce.eCom.entities.Makeup;
import com.eComerce.eCom.entities.Shade;
import com.eComerce.eCom.entities.ShoppingBag;
import com.eComerce.eCom.entities.dtos.BoughtMakeupExportDTO;
import com.eComerce.eCom.repositories.MakeupRepository;
import com.eComerce.eCom.repositories.ShadeRepository;
import com.eComerce.eCom.repositories.ShoppingBagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ShoppingBagService {

    public ShoppingBagRepository shoppingBagRepository;
    public MakeupRepository makeupRepository;
    public ShadeRepository shadeRepository;

    @Autowired
    public ShoppingBagService(ShoppingBagRepository shoppingBagRepository, MakeupRepository makeupRepository, ShadeRepository shadeRepository) {
        this.shoppingBagRepository = shoppingBagRepository;
        this.makeupRepository = makeupRepository;
        this.shadeRepository = shadeRepository;
    }


    public void removeProductFromBag(BoughtMakeupExportDTO boughtMakeupExportDTO) {
        User authenticatedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<ShoppingBag> optionalShoppingBag = shoppingBagRepository.findByUser_Email(authenticatedUser.getUsername());
        ShoppingBag shoppingBag = optionalShoppingBag.get();
        Makeup makeupFromDB = makeupRepository.findByNameLike(boughtMakeupExportDTO.getMakeup().getName());
        Shade shadeFromDB = shadeRepository.getShadeByNameLike(boughtMakeupExportDTO.getShade().getName());
        BoughtMakeup boughtMakeup = new BoughtMakeup(makeupFromDB, shadeFromDB);

        if (shoppingBag.getProducts().contains(boughtMakeup)) {
            BoughtMakeup productFromBag = shoppingBag.getProductFromBag(boughtMakeup);

            if (productFromBag.getQuantity() > 1) {
                productFromBag.setQuantity(productFromBag.getQuantity() - 1);
            } else if (productFromBag.getQuantity() == 1) {
                shoppingBag.getProducts().remove(boughtMakeup);
            }
        }
    }
}
