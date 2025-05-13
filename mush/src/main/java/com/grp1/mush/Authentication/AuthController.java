package com.grp1.mush.Authentication;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> req, HttpServletRequest request) {
    try {
        request.login(req.get("username"), req.get("password"));
        return ResponseEntity.ok("Login successful");
    } catch (ServletException e) {
        return ResponseEntity.status(401).body("Login failed");
    }
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody Map<String, String> req) {
        User newUser = userService.register(req.get("username"), req.get("password"));
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) throws ServletException {
        request.logout();
        return ResponseEntity.ok("Logged out");
    }

    @GetMapping("/me")
    public ResponseEntity<String> getCurrentUser(Authentication auth) {
        return ResponseEntity.ok(auth.getName());
    }
}
