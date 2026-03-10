package com.eComerce.eCom.repositories;

import com.eComerce.eCom.entities.Comment;
import com.eComerce.eCom.entities.Makeup;
import com.eComerce.eCom.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByUser (UserEntity user);
}
