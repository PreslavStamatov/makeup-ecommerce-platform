package com.eComerce.eCom.repositories;

import com.eComerce.eCom.entities.ShoppingBag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShoppingBagRepository extends JpaRepository<ShoppingBag, Integer> {

    Optional<ShoppingBag> findByUser_Email(String email);
}
