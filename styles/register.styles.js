import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin: 0;
`;

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  width: 100%;
  height: calc(80vh - 40px);

  .formHeader {
    margin-bottom: 2%;
    display: flex;
    flex-direction: column;
    text-align: center;

    @media (max-width: 850px) {
      margin-bottom: 4%;
    }

    div {
      font-size: 1em;
    }

    h2 {
      margin-bottom: 7%;
    }
  }

  form {
    ${"" /* margin-top: 1%; */}
    padding: 1%;
    display: flex;
    flex-direction: column;
    ${"" /* top: 0; */}
    width: 90%;
    max-width: 350px;

    .input {
      .label {
        font-size: 0.75em;
      }

      input {
        margin-top: 1%;
        height: 2.75em;
        width: 100%;
        background-color: white;
      }
    }
  }

  .hotline {
    font-size: 0.85em;
    display: flex;
    text-align: center;
    margin: 0 2% 0 2%;
  }
`;

export const InputField = styled.input`
  margin-bottom: 1.5%;
  border-width: 1px;
  border-color: ${({ empty }) => (empty ? "red" : "black")};
  width: 100% !important;
`;

export const PasswordContainer = styled.div`
  margin-bottom: 1.5%;
  border-width: 1px;
  border-color: ${({ empty }) => (empty ? "red" : "black")};
  width: 100% !important;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PasswordInput = styled.input`
  border-style: none;
  height: 100%;
  width: 100%;
`;

export const EyeHolder = styled.div`
  cursor: pointer;
  padding-right: 2%;
  font-size: 20px;
  padding-top: 1%;
`;

export const RequiredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Required = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.75em;
  margin-bottom: 1%;
`;

export const RememberPW = styled.div`
  font-size: 0.75em;
  margin-bottom: 2.5%;
  display: flex;
  align-items: center;
  margin-top: 1.25%;

  .checkbox {
    align-items: flex-start;
    margin-left: -2%;
    width: auto;
  }
`;

export const SignInButton = styled.button`
  margin: 5% 0 5% 0;
  height: 35px;
  background-color: #53d337;
  border-style: none;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
`;

export const RegisterHere = styled.div`
  display: flex;
  font-size: 0.85em;
  flex-direction: row;
  align-items: center;
`;

export const SignUpFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  width: 100%;

  .formHeader {
    margin-bottom: 2%;
    display: flex;
    flex-direction: column;
    /* align-items: center;
    justify-content: center; */
    text-align: center;

    @media (max-width: 850px) {
      margin-bottom: 4%;
    }

    div {
      font-size: 1em;
    }

    h2 {
      margin-bottom: 7%;
    }
  }

  form {
    margin-top: 1%;
    padding: 1%;
    display: flex;
    flex-direction: column;
    top: 0;
    width: 90%;
    max-width: 350px;

    .input {
      ${
        "" /* display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 3.5%;
      border-style: none;
      border-color: ${({ empty }) => (empty ? "red" : "black")}; */
      }

      .label {
        font-size: 0.75em;
      }

      input {
        margin-top: 1%;
        height: 2.75em;
        width: 100%;
        background-color: white;
      }
    }
  }

  .hotline {
    font-size: 0.85em;
    display: flex;
    text-align: center;
    margin: 0 2% 0 2%;
  }
`;
