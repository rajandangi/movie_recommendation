package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import models.Search;

@Repository
public interface SearchRepository extends JpaRepository<Search, Integer> {
	
	public Search findByKeyword(String keyword);
}
