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
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> req) {
        String username = req.get("username");
        String password = req.get("password");

        // Validate input
        if (username == null || username.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username is required"));
        }
        if (password == null || password.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Password is required"));
        }
        if (password.length() < 6) {
            return ResponseEntity.badRequest().body(Map.of("message", "Password must be at least 6 characters long"));
        }

        try {
            User newUser = userService.register(username, password);
            return ResponseEntity.ok(Map.of(
                "message", "Registration successful",
                "username", newUser.getUsername()
            ));
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username already exists"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "An error occurred during registration"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        try {
            request.logout();
            if (request.getSession(false) != null) {
                request.getSession(false).invalidate();
            }
            return ResponseEntity.ok("Logged out successfully");
        } catch (ServletException e) {
            return ResponseEntity.status(500).body("Logout failed");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<String> getCurrentUser(Authentication auth) {
        return ResponseEntity.ok(auth.getName());
    }
}
