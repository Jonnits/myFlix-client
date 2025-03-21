import React, { useState, useEffect } from "react"; 
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://movieminded-d764560749d0.herokuapp.com/movies")
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => ({
                id: movie._id,
                title: movie.Title,
                image: movie.ImagePath,
                description: movie.Description,
                genre: movie.Genre ? { 
                    Name: movie.Genre.Name, 
                    Description: movie.Genre.Description 
                } : { Name: "Unknown", Description: "" }, 
                director: movie.Director ? { Name: movie.Director.Name } : { Name: "Unknown" }
            }));
            setMovies(moviesFromApi);
        })
        .catch((error) => {
            console.error("Error fetching movies:", error);
        });    
    }, []);

    if (!user) {
        return (
            <div>
                <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }} />
                <h3>Or Sign Up</h3>
                <SignupView />
            </div>
        );
    }

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            <h1>MyFlix Movies</h1>
            <div>
                {movies.map((movie) => (
                    <MovieCard 
                        key={movie.id}
                        movie={movie} 
                        onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
                    />
                ))}
            </div>
            <button onClick={() => setUser(null)}>Logout</button>
        </div>
    );
};
