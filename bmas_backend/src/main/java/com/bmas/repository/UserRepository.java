package com.bmas.repository;

import com.bmas.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

<<<<<<< HEAD
=======
import java.util.List;
>>>>>>> v1_bharat
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
<<<<<<< HEAD
=======
    List<User> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String name, String email);
>>>>>>> v1_bharat
}
