package controller;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import models.Movie;
import models.User;
import models.Search;
import repository.MovieRepository;
import repository.SearchRepository;
import service.MovieService;


@RequestMapping("/api/movie")
@RestController
public class MovieController {
	
	@Autowired
	MovieService movieService;
	@Autowired
	MovieRepository movieRepository;
	@Autowired
	SearchRepository searchRepository;
	
	
	@RequestMapping(value="/", method=RequestMethod.GET)
	 public List<Movie> getMovies() {
        return movieService.getMovies();
	 }
	
	@RequestMapping(value="/search/{keyword}", method=RequestMethod.GET)
	 public List<Movie> search(@PathVariable String keyword) {
		Search sc = searchRepository.findByKeyword(keyword);
		if(sc == null) {
			
			Search search = new Search();
			search.setKeyword(keyword);
			searchRepository.save(search);
		}
		
		
       return movieRepository.findByNameContaining(keyword);
	 }
	
	

}
