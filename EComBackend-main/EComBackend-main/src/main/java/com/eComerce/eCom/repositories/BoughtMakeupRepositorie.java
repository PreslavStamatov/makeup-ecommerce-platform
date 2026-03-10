package com.eComerce.eCom.repositories;

import com.eComerce.eCom.entities.BoughtMakeup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoughtMakeupRepositorie extends JpaRepository<BoughtMakeup, Integer> {
}
