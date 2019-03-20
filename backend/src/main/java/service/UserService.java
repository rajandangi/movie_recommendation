package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import models.User;
import repository.UserRepository;

@Service
public class UserService {

		@Autowired
		UserRepository userRepository;
		
		
		public void addUser(User user) {
			userRepository.save(user);
		}
	
}
