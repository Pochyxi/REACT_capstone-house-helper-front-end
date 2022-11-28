import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SignUpComponent() {
  const navigate = useNavigate();

  const [formObj, setFormObj] = useState({
    // oggetto per la compilazione del form
    nomeCompleto: "",
    username: "",
    email: "",
    password: "",
  });

  const handleForm = (key, value) => {
    // setta l'oggetto del form
    setFormObj((form) => {
      return {
        ...form,
        [key]: value,
      };
    });
  };

  const signUp = async (obj) => {
    const baseEndpoint = "http://localhost:8080/api/users/new-raw";

    const header = {
      "Content-type": "application/json",
    };

    try {
      const response = await fetch(baseEndpoint, {
        method: "POST",
        headers: header,
        body: JSON.stringify(obj),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/login");
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={
      {
        color: "royalblue",
        borderRadius: "5px",
        padding: "20px",
        backgroundColor: "aliceblue",
        fontSize: "1.5em"
      }
    }>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          signUp(formObj);
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicNomeCompleto">
          <Form.Label>Nome e cognome</Form.Label>
          <Form.Control
            value={formObj.nomeCompleto}
            onChange={(e) => handleForm("nomeCompleto", e.target.value)}
            type="text"
            placeholder="Inserisci nome"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={formObj.username}
            autoComplete="current-password"
            onChange={(e) => handleForm("username", e.target.value)}
            type="text"
            placeholder="Inserisci username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Indirizzo email</Form.Label>
          <Form.Control
            value={formObj.email}
            onChange={(e) => handleForm("email", e.target.value)}
            type="email"
            placeholder="Inserisci la tua email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={formObj.password}
            onChange={(e) => handleForm("password", e.target.value)}
            type="password"
            placeholder="Inserisci Password"
            autoComplete="current-password"
          />
        </Form.Group>
        <Button className={"w-25 d-block mx-auto my-2"} variant="primary" type="submit">
          REGISTRATI
        </Button>
      </Form>
    </div>
  );
}

export default SignUpComponent;
