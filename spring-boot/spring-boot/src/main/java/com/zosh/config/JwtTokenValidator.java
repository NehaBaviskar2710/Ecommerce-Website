package com.zosh.config;

import java.awt.RenderingHints.Key;
import java.io.IOException;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.GrantedAuthoritiesContainer;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtTokenValidator extends OncePerRequestFilter {

	

	
//	@Override
//	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//			throws ServletException, IOException {
//		
//		String jwt = request.getHeader(JwtConstant.JWT_HEADER);
//		System.out.println("jwt ------ "+jwt);
//		if(jwt!=null) {
//			jwt=jwt.substring(7);
//			System.out.println("jwt ------ "+jwt);
//			try {
//				
//				SecretKey key= Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
//				System.out.println("Key   "+key);
//				
//				Claims claims=Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
//				System.out.println("Claims   "+claims);
//				
//				String email=String.valueOf(claims.get("email"));
//				
//				String authorities=String.valueOf(claims.get("authorities"));
//				
//				System.out.println("EEEEEEEEEEEMail "+email);
//				System.out.println("AAAAAAAAAAAuthorities "+authorities);
//				List<GrantedAuthority> auths=AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
//				Authentication athentication=new UsernamePasswordAuthenticationToken(email,null, auths);
//				
//				SecurityContextHolder.getContext().setAuthentication(athentication);
//				
//			} catch (Exception e) {
//				// TODO: handle exception
//				throw new BadCredentialsException("invalid token...");
//			}
//		}
//		filterChain.doFilter(request, response);
//		
//	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
	        throws ServletException, IOException {

	    String jwt = request.getHeader(JwtConstant.JWT_HEADER);
	    if (jwt != null && jwt.startsWith("Bearer ")) {
	        jwt = jwt.substring(7);
	        
	        try {
	            SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

	            Claims claims = Jwts.parserBuilder()
	                                .setSigningKey(key)
	                                .build()
	                                .parseClaimsJws(jwt)
	                                .getBody();
	            
	            String email = claims.get("email", String.class);
	            String authorities = claims.get("authorities", String.class);

	            if (email == null || authorities == null) {
	                throw new BadCredentialsException("Invalid token: missing email or authorities...");
	            }

	            List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
	            Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auths);
	            
	            SecurityContextHolder.getContext().setAuthentication(authentication);

	        } catch (ExpiredJwtException e) {
	            throw new BadCredentialsException("Token has expired...");
	        } catch (MalformedJwtException e) {
	            throw new BadCredentialsException("Invalid JWT token...");
	        } catch (SignatureException e) {
	            throw new BadCredentialsException("JWT signature does not match...");
	        } catch (IllegalArgumentException e) {
	            throw new BadCredentialsException("JWT claims string is empty...");
	        }
	    } else {
	        // Token not provided or invalid format
	        throw new BadCredentialsException("Invalid token format...");
	    }

	    filterChain.doFilter(request, response);
	}


}


