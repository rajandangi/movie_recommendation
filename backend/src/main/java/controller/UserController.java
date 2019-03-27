package controller;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import models.User;
import service.UserService;
import service.TokenService;

//@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/api/user")
@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	@Autowired
	TokenService tokenService;
	
	@RequestMapping(value="/register", method=RequestMethod.POST)
	public void addUser(@RequestBody User user) {
		userService.addUser(user);
	}
	
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public HashMap<String, Object> login(@RequestBody User user) {
		HashMap<String, Object> map = new HashMap<>();
	    
		User u = userService.findByUsername(user.getUsername());
		String token = tokenService.createToken(u.getId());
		map.put("id", u.getId());
		map.put("token", token);
		
	    return map;
	    
	}
	
	@RequestMapping(value="/{userId}", method=RequestMethod.GET)
	 public Optional<User> getUser(@PathVariable Integer userId) {
        return userService.getUser(userId);
	 }

}
