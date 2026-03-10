package com.eComerce.eCom.repositories;

import com.eComerce.eCom.entities.Makeup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MakeupRepository extends JpaRepository<Makeup, Integer> {

    Makeup findByNameLike(String name);
}
