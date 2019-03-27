package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@Controller
public class HomeController {
	@RequestMapping(value= {"/", "/home", "/login"})
	public String home() {
		return "index";
	}
}
