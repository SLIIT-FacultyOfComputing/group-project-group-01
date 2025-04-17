package com.example1.fungiflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class FungiflowApplication {
    public static void main(String[] args) {
        SpringApplication.run(FungiflowApplication.class, args);
    }
}
