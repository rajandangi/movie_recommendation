package api;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import controller.HomeController;

@SpringBootApplication
//@ComponentScan(basePackageClasses = HomeController.class)
@ComponentScan("controller")
@EntityScan("models")
public class ApiApp  {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(ApiApp.class,  args);
	}
	
}
