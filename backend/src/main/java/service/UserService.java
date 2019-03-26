package service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import models.User;
import repository.UserRepository;

@Service
public class UserService {
	
	private UserRepository userRepository;
    private TokenService tokenService;

    @Autowired
    UserService(UserRepository userRepository, TokenService tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    public Optional<User> getUser(Integer userId) {
        return userRepository.findById(userId);
    }
    
    

    public String addUser(User user) {
        User savedUser = userRepository.save(user);
        return tokenService.createToken(savedUser.getId());
    }

	public User findByUsername(String username) {
		User user = userRepository.findByUsername(username);
		return user;
	}

//		@Autowired
//		UserRepository userRepository;
//		
//		
//		public void addUser(User user) {
//			userRepository.save(user);
//		}
	
}
