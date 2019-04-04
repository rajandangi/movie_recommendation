package repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import models.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

	List<Movie> findByNameContaining(String name);
}
