package com.eComerce.eCom.repositories;

import com.eComerce.eCom.entities.Shade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShadeRepository extends JpaRepository<Shade, Integer> {

    public Shade getShadeByNameLike(String name);
}
