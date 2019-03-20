package api;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;


@SpringBootApplication
@ComponentScan({"controller", "service"})
@EnableJpaRepositories("repository")
@EntityScan("models")
public class ApiApp  {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(ApiApp.class,  args);
	}
	
}
