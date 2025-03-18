import React from "react";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://movieminded-d764560749d0.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          onLoggedIn(data.user, data.token);
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input 
        type="text"
        minlength="3"
        maxlength="20"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
            required
         />
      </label>
      <label>
        Password:
        <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
            required
         />
      </label>
      <button type="submit">
        Submit
      </button>
    </form>
  );
};
}