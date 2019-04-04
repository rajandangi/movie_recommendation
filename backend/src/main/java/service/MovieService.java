package service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import models.Movie;
import repository.MovieRepository;

@Service
public class MovieService {
	
	private MovieRepository movieRepository;

    @Autowired
    MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
        
    }

    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }
    
    
}

