// import React from "react";
// import { screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
// import App from "../App";

// describe("", () => {
//   jest.setTimeout(40000);

//   it("Verifica se o button esta desabilitado", async () => {
//     const { history } = renderWithRouterAndRedux(<App />);
//     const campoName = screen.getByTestId("input-player-name");
//     userEvent.type(campoName, "Ada Love");

//     const campoEmailGravatar = screen.getByTestId("input-gravatar-email");
//     userEvent.type(campoEmailGravatar, "adalove@email.com");

//     const botaoPlay = await screen.findByRole("button", { name: /play/i });
//     userEvent.click(botaoPlay);

//     await waitFor(() => expect(history.location.pathname).toBe("/game"));

//     const resposta = await screen.findByTestId("correct-answer", undefined, {
//       timeout: 32000,
//     });
//     expect(resposta).toBe(ex);
//     expect(resposta).toBeDisabled();
//   });
// });
