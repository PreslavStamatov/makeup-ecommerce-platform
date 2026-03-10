package com.eComerce.eCom.services;

import com.eComerce.eCom.entities.Comment;
import com.eComerce.eCom.entities.Makeup;
import com.eComerce.eCom.entities.UserEntity;
import com.eComerce.eCom.entities.dtos.AddCommentDTO;
import com.eComerce.eCom.entities.dtos.GetSpecificProductDTO;
import com.eComerce.eCom.entities.dtos.MakeupExportDTO;
import com.eComerce.eCom.repositories.MakeupRepository;
import com.eComerce.eCom.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class MakeupService {

    private MakeupRepository makeupRepository;

    private UserRepository userRepository;

    @Autowired
    public MakeupService(MakeupRepository makeupRepository, UserRepository userRepository) {
        this.makeupRepository = makeupRepository;
        this.userRepository = userRepository;
    }

    public void addComment (AddCommentDTO addCommentDTO) {
        User authenticatedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserEntity user = userRepository.findByEmail(authenticatedUser.getUsername()).get();
        Makeup makeup = makeupRepository.findByNameLike(addCommentDTO.getMakeupName());
        Comment comment = new Comment(addCommentDTO.getCommentText(), addCommentDTO.getRating());
        comment.setUser(user);
        makeup.addComment(comment);
        makeupRepository.saveAndFlush(makeup);
    }

    public Makeup getSpecificProduct (GetSpecificProductDTO getSpecificProductDTO) {
        return this.makeupRepository.findByNameLike(getSpecificProductDTO.getProductName());
    }
}
